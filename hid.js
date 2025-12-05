// WebHID module for VIA keyboard communication
// Based on the-via/app WebHID implementation

// VIA Protocol Constants
const VIA_USAGE_PAGE = 0xFF60;
const VIA_USAGE = 0x61;

const APICommand = {
  GET_PROTOCOL_VERSION: 0x01,
  GET_KEYBOARD_VALUE: 0x02,
  SET_KEYBOARD_VALUE: 0x03,
  DYNAMIC_KEYMAP_MACRO_GET_COUNT: 0x0C,
  DYNAMIC_KEYMAP_MACRO_GET_BUFFER_SIZE: 0x0D,
  DYNAMIC_KEYMAP_MACRO_GET_BUFFER: 0x0E,
  DYNAMIC_KEYMAP_MACRO_SET_BUFFER: 0x0F,
  DYNAMIC_KEYMAP_MACRO_RESET: 0x10,
};

// Macro byte constants
const KeyActionPrefix = 0x01;
const KeyAction = {
  Tap: 0x01,
  Down: 0x02,
  Up: 0x03,
  Delay: 0x04,
};
const DelayTerminator = 0x7C; // '|'
const MacroTerminator = 0x00;

// Protocol versions
const PROTOCOL_BETA = 8; // Added GET_BUFFER commands
const PROTOCOL_V11 = 11; // Added delay support with prefix

// Global state
let connectedDevice = null;
let protocolVersion = -1;

/**
 * Check if WebHID is supported
 */
function isWebHIDSupported() {
  return 'hid' in navigator;
}

/**
 * Request and connect to a VIA-compatible keyboard
 */
async function requestDevice() {
  if (!isWebHIDSupported()) {
    throw new Error('WebHID is not supported in this browser. Please use Chrome or Edge.');
  }

  try {
    const devices = await navigator.hid.requestDevice({
      filters: [{
        usagePage: VIA_USAGE_PAGE,
        usage: VIA_USAGE,
      }],
    });

    if (devices.length === 0) {
      throw new Error('No device selected');
    }

    return devices[0];
  } catch (err) {
    if (err.name === 'NotAllowedError') {
      throw new Error('Device selection was cancelled');
    }
    throw err;
  }
}

/**
 * Connect to a HID device
 */
async function connectDevice(device) {
  if (!device.opened) {
    await device.open();
  }
  
  connectedDevice = device;
  
  // Set up input report listener
  device.addEventListener('inputreport', handleInputReport);
  
  // Get protocol version
  protocolVersion = await getProtocolVersion();
  console.log('Connected to keyboard, protocol version:', protocolVersion);
  
  return {
    productName: device.productName,
    vendorId: device.vendorId,
    productId: device.productId,
    protocolVersion,
  };
}

/**
 * Disconnect from the current device
 */
async function disconnectDevice() {
  if (connectedDevice) {
    connectedDevice.removeEventListener('inputreport', handleInputReport);
    await connectedDevice.close();
    connectedDevice = null;
    protocolVersion = -1;
  }
}

/**
 * Get list of already authorized devices
 */
async function getAuthorizedDevices() {
  if (!isWebHIDSupported()) {
    return [];
  }
  
  const devices = await navigator.hid.getDevices();
  return devices.filter(device => 
    device.collections?.some(c => 
      c.usagePage === VIA_USAGE_PAGE && c.usage === VIA_USAGE
    )
  );
}

// Response handling
let pendingResponse = null;
let responseBuffer = null;

function handleInputReport(event) {
  responseBuffer = new Uint8Array(event.data.buffer);
  if (pendingResponse) {
    pendingResponse(responseBuffer);
    pendingResponse = null;
  }
}

/**
 * Send a HID command and wait for response
 */
async function sendCommand(command, data = []) {
  if (!connectedDevice || !connectedDevice.opened) {
    throw new Error('No device connected');
  }

  // Create command buffer (32 bytes, command ID first)
  const buffer = new Uint8Array(32);
  buffer[0] = command;
  for (let i = 0; i < data.length && i < 31; i++) {
    buffer[i + 1] = data[i];
  }

  // Send report with ID 0
  await connectedDevice.sendReport(0, buffer);

  // Wait for response
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingResponse = null;
      reject(new Error('Command timeout'));
    }, 5000);

    pendingResponse = (response) => {
      clearTimeout(timeout);
      
      // Verify response matches command
      if (response[0] !== command) {
        console.warn('Unexpected response command:', response[0], 'expected:', command);
      }
      
      resolve(Array.from(response));
    };
  });
}

/**
 * Helper to convert 16-bit value to bytes
 */
function to16Bit(value) {
  return [(value >> 8) & 0xFF, value & 0xFF];
}

/**
 * Helper to convert bytes to 16-bit value
 */
function from16Bit(hi, lo) {
  return (hi << 8) | lo;
}

/**
 * Get VIA protocol version
 */
async function getProtocolVersion() {
  try {
    const response = await sendCommand(APICommand.GET_PROTOCOL_VERSION);
    return from16Bit(response[1], response[2]);
  } catch (e) {
    console.error('Failed to get protocol version:', e);
    return -1;
  }
}

/**
 * Get the number of macros supported by the keyboard
 */
async function getMacroCount() {
  const response = await sendCommand(APICommand.DYNAMIC_KEYMAP_MACRO_GET_COUNT);
  return response[1];
}

/**
 * Get the macro buffer size
 */
async function getMacroBufferSize() {
  const response = await sendCommand(APICommand.DYNAMIC_KEYMAP_MACRO_GET_BUFFER_SIZE);
  return from16Bit(response[1], response[2]);
}

/**
 * Reset all macros
 */
async function resetMacros() {
  await sendCommand(APICommand.DYNAMIC_KEYMAP_MACRO_RESET);
}

/**
 * Write macro bytes to the keyboard
 */
async function setMacroBytes(data) {
  const bufferSize = await getMacroBufferSize();
  
  if (data.length > bufferSize) {
    throw new Error(`Macro size (${data.length}) exceeds buffer size (${bufferSize})`);
  }

  // Clear macros first
  await resetMacros();
  
  // Set last byte to 0xFF to indicate write in progress
  const lastOffset = bufferSize - 1;
  await sendCommand(APICommand.DYNAMIC_KEYMAP_MACRO_SET_BUFFER, [
    ...to16Bit(lastOffset),
    1,
    0xFF,
  ]);

  // Write in 28-byte chunks
  const chunkSize = 28;
  for (let offset = 0; offset < data.length; offset += chunkSize) {
    const chunk = data.slice(offset, Math.min(offset + chunkSize, data.length));
    await sendCommand(APICommand.DYNAMIC_KEYMAP_MACRO_SET_BUFFER, [
      ...to16Bit(offset),
      chunk.length,
      ...chunk,
    ]);
  }

  // Clear the write-in-progress flag
  await sendCommand(APICommand.DYNAMIC_KEYMAP_MACRO_SET_BUFFER, [
    ...to16Bit(lastOffset),
    1,
    0x00,
  ]);
}

/**
 * Get current macro bytes from the keyboard
 */
async function getMacroBytes() {
  const bufferSize = await getMacroBufferSize();
  const chunkSize = 28;
  const bytes = [];
  
  for (let offset = 0; offset < bufferSize; offset += chunkSize) {
    const response = await sendCommand(APICommand.DYNAMIC_KEYMAP_MACRO_GET_BUFFER, [
      ...to16Bit(offset),
      chunkSize,
    ]);
    bytes.push(...response.slice(4, 4 + chunkSize));
  }
  
  return bytes;
}

/**
 * Parse a VIA macro string expression into raw sequence actions
 * Example: "{+KC_I}{30}{-KC_I}" -> [[Down, KC_I], [Delay, 30], [Up, KC_I]]
 */
function parseMacroExpression(expression) {
  const sequence = [];
  
  // Split expression by {} blocks, keeping delimiters
  const regex = /\{([^}]+)\}/g;
  let match;
  let lastIndex = 0;
  
  while ((match = regex.exec(expression)) !== null) {
    // Handle any text before this match (character stream)
    if (match.index > lastIndex) {
      const text = expression.slice(lastIndex, match.index);
      if (text) {
        sequence.push({ type: 'CharacterStream', value: text });
      }
    }
    
    const content = match[1].trim();
    
    // Check if it's a delay (pure number)
    if (/^\d+$/.test(content)) {
      sequence.push({ type: 'Delay', value: parseInt(content, 10) });
    }
    // Check for key down (+KC_XXX)
    else if (content.startsWith('+')) {
      const keycode = content.slice(1).trim().toUpperCase();
      sequence.push({ type: 'Down', value: keycode });
    }
    // Check for key up (-KC_XXX)
    else if (content.startsWith('-')) {
      const keycode = content.slice(1).trim().toUpperCase();
      sequence.push({ type: 'Up', value: keycode });
    }
    // Otherwise it's a tap or chord
    else {
      const keycodes = content.split(',').map(k => k.trim().toUpperCase());
      if (keycodes.length === 1) {
        sequence.push({ type: 'Tap', value: keycodes[0] });
      } else {
        // Chord: press all keys, then release in reverse
        keycodes.forEach(kc => sequence.push({ type: 'Down', value: kc }));
        [...keycodes].reverse().forEach(kc => sequence.push({ type: 'Up', value: kc }));
      }
    }
    
    lastIndex = regex.lastIndex;
  }
  
  // Handle any remaining text after last match
  if (lastIndex < expression.length) {
    const text = expression.slice(lastIndex);
    if (text) {
      sequence.push({ type: 'CharacterStream', value: text });
    }
  }
  
  return sequence;
}

/**
 * Convert a parsed macro sequence to bytes
 * Uses protocol v11+ format with KeyActionPrefix for delays
 */
function sequenceToBytes(sequence, useV11 = true) {
  const bytes = [];
  
  sequence.forEach(action => {
    const keyByte = basicKeyToByte[action.value];
    
    switch (action.type) {
      case 'Tap':
        if (keyByte === undefined) {
          console.warn('Unknown keycode:', action.value);
          return;
        }
        if (useV11) {
          bytes.push(KeyActionPrefix, KeyAction.Tap, keyByte);
        } else {
          bytes.push(KeyAction.Tap, keyByte);
        }
        break;
        
      case 'Down':
        if (keyByte === undefined) {
          console.warn('Unknown keycode:', action.value);
          return;
        }
        if (useV11) {
          bytes.push(KeyActionPrefix, KeyAction.Down, keyByte);
        } else {
          bytes.push(KeyAction.Down, keyByte);
        }
        break;
        
      case 'Up':
        if (keyByte === undefined) {
          console.warn('Unknown keycode:', action.value);
          return;
        }
        if (useV11) {
          bytes.push(KeyActionPrefix, KeyAction.Up, keyByte);
        } else {
          bytes.push(KeyAction.Up, keyByte);
        }
        break;
        
      case 'Delay':
        if (useV11) {
          const delayStr = action.value.toString();
          bytes.push(KeyActionPrefix, KeyAction.Delay);
          for (const char of delayStr) {
            bytes.push(char.charCodeAt(0));
          }
          bytes.push(DelayTerminator);
        }
        // Pre-v11 doesn't support delays
        break;
        
      case 'CharacterStream':
        for (const char of action.value) {
          bytes.push(char.charCodeAt(0));
        }
        break;
    }
  });
  
  return bytes;
}

/**
 * Convert a VIA macro string to bytes
 */
function macroStringToBytes(macroString, useV11 = true) {
  const sequence = parseMacroExpression(macroString);
  const bytes = sequenceToBytes(sequence, useV11);
  bytes.push(MacroTerminator);
  return bytes;
}

/**
 * Convert multiple macro strings to the full macro buffer
 * Macro indices that don't have a corresponding string will be empty (just terminator)
 */
function macrosToBuffer(macroStrings, macroCount, useV11 = true) {
  const allBytes = [];
  
  for (let i = 0; i < macroCount; i++) {
    if (macroStrings[i]) {
      const macroBytes = macroStringToBytes(macroStrings[i], useV11);
      // Remove the terminator since we'll add it separately
      allBytes.push(...macroBytes.slice(0, -1));
    }
    allBytes.push(MacroTerminator);
  }
  
  return allBytes;
}

/**
 * Upload macros to the connected keyboard
 * @param {Object} macroMap - Object mapping macro index to macro string
 */
async function uploadMacros(macroMap) {
  if (!connectedDevice) {
    throw new Error('No device connected');
  }
  
  const macroCount = await getMacroCount();
  if (macroCount === 0) {
    throw new Error('Keyboard does not support macros');
  }
  
  console.log('Keyboard supports', macroCount, 'macros');
  
  // Get current macros first
  const currentBytes = await getMacroBytes();
  
  // Parse current macros to preserve ones we're not changing
  const currentMacros = [];
  let currentMacroBytes = [];
  
  for (const byte of currentBytes) {
    if (byte === MacroTerminator) {
      currentMacros.push(currentMacroBytes);
      currentMacroBytes = [];
      if (currentMacros.length >= macroCount) break;
    } else {
      currentMacroBytes.push(byte);
    }
  }
  
  // Use v11 format if protocol supports it
  const useV11 = protocolVersion >= PROTOCOL_V11;
  console.log('Using protocol v11 format:', useV11);
  
  // Build new macro buffer
  const allBytes = [];
  
  for (let i = 0; i < macroCount; i++) {
    if (macroMap[i] !== undefined) {
      // New macro provided
      const sequence = parseMacroExpression(macroMap[i]);
      const bytes = sequenceToBytes(sequence, useV11);
      allBytes.push(...bytes);
      console.log(`Macro ${i}: ${macroMap[i]} -> ${bytes.length} bytes`);
    } else if (currentMacros[i] && currentMacros[i].length > 0) {
      // Preserve existing macro
      allBytes.push(...currentMacros[i]);
    }
    allBytes.push(MacroTerminator);
  }
  
  console.log('Total macro buffer size:', allBytes.length, 'bytes');
  
  // Write to keyboard
  await setMacroBytes(allBytes);
  
  return {
    success: true,
    bytesWritten: allBytes.length,
    macroCount,
  };
}

/**
 * Get device info for display
 */
function getDeviceInfo() {
  if (!connectedDevice) {
    return null;
  }
  
  return {
    productName: connectedDevice.productName,
    vendorId: connectedDevice.vendorId.toString(16).padStart(4, '0').toUpperCase(),
    productId: connectedDevice.productId.toString(16).padStart(4, '0').toUpperCase(),
    protocolVersion,
  };
}
