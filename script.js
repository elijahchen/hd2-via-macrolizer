// Global variables to store state
let uploadedJsonData = null;
let selectedStratagems = {
  m121: null,
  m122: null,
  m123: null,
  m124: null
};
// Store the macro indices
let macroIndices = {
  m121: 120,
  m122: 121,
  m123: 122,
  m124: 123
};
// HID device state
let isDeviceConnected = false;

// Function to get local icon paths for a stratagem
function getLocalIconPaths(stratagem) {
  if (!stratagem) return [];
  
  // 1. Create snake case path (original format)
  const snakeSlug = stratagem.name.toLowerCase()
    .replace(/[\s\/\-]+/g, '_')
    .replace(/[^\w]/g, '');
  
  // 2. Wiki format with special case handling
  let wikiName = stratagem.name;
  
  // Special case handling for sentries and other prefixed names
  if (stratagem.name.includes('Guard Dog')) {
    if (stratagem.name.includes('Rover')) {
      wikiName = 'Guard_Dog_Rover';
    } else if (stratagem.name.includes('Breath')) {
      wikiName = 'Guard_Dog_Dog_Breath';
    } else {
      wikiName = 'Guard_Dog';
    }
  } else if (stratagem.name.startsWith('A/')) {
    // Handle sentry naming formats like A/MG-43 -> Machine_Gun_Sentry
    if (stratagem.name.includes('Tesla')) {
      wikiName = 'Tesla_Tower';
    } else if (stratagem.name.includes('EMS')) {
      wikiName = 'AM-23_EMS_Mortar_Sentry';
    } else if (stratagem.name.includes('AC-8')) {
      wikiName = 'Autocannon_Sentry';
    } else if (stratagem.name.includes('G-16')) {
      wikiName = 'Gatling_Sentry';
    } else if (stratagem.name.includes('M-12')) {
      wikiName = 'Mortar_Sentry';
    } else if (stratagem.name.includes('MG-43')) {
      wikiName = 'Machine_Gun_Sentry';
    } else if (stratagem.name.includes('MLS-4X')) {
      wikiName = 'Rocket_Sentry';
    }
  } else if (stratagem.name.startsWith('E/')) {
    // Handle emplacement naming
    if (stratagem.name.includes('MG-101')) {
      wikiName = 'HMG_Emplacement';
    } else if (stratagem.name.includes('GL-21')) {
      wikiName = 'GL-21_Grenadier_Battlement';
    } else if (stratagem.name.includes('AT-12')) {
      wikiName = 'E_AT-12_Anti-Tank_Emplacement';
    } else if (stratagem.name.includes('FLAM-40')) {
      wikiName = 'A_FLAM-40_Flame_Sentry';
    }
  } else if (stratagem.name === 'EAT-17 Expendable Anti-Tank') {
    wikiName = 'Expendable_Anti-Tank';
  } else if (stratagem.name === 'APW-1 Anti-Material Rifle') {
    wikiName = 'Anti-Materiel_Rifle';
  } else if (stratagem.name === 'B-1 Supply Pack') {
    wikiName = 'Supply_Pack';
  } else if (stratagem.name === 'MD-6 Anti-Personnel Minefield') {
    wikiName = 'Anti-Personnel_Minefield';
  } else if (stratagem.name === 'MD-17 Anti-Tank Mines') {
    wikiName = 'MD-17_Anti-Tank_Mines';
  } else if (stratagem.name === 'NUX-223 Hellbomb') {
    wikiName = 'Hellbomb';
  } else if (stratagem.name === 'SH-20 Ballistic Shield') {
    wikiName = 'Ballistic_Shield_Backpack';
  } else if (stratagem.name === 'SH-32 Shield Generator Pack') {
    wikiName = 'Shield_Generator_Pack';
  } else if (stratagem.name === 'SH-51 Directional Shield Backpack') {
    wikiName = 'SH-51_Directional_Shield';
  } else if (stratagem.name === 'FAF-14 Spear Launcher') {
    wikiName = 'Spear';
  } else if (stratagem.name === 'LIFT-850 Jump Pack') {
    wikiName = 'Jump_Pack';
  } else if (stratagem.name === 'LIFT-860 Hover Pack') {
    wikiName = 'Hover_Pack';
  } else if (stratagem.name === 'Hive Breaker Drill') {
    wikiName = 'Prospecting_Drill';
} else if (stratagem.name === 'TX-41 Sterilizer') {
    wikiName = 'Sterilizer';
  } else if (stratagem.name === 'FX-12 Shield Generator Relay') {
    wikiName = 'Shield_Generator_Relay';
  } else if (stratagem.name === 'Eagle 110mm Rockets') {
    wikiName = 'Eagle_110mm_Rocket_Pods';
  } else if (stratagem.name === 'MLS-4X Commando') {
    wikiName = 'Commando';
  } else if (stratagem.name === 'MD-8 Gas Mines') {
    wikiName = 'Gas_Minefield';
  } else if (stratagem.name === 'B-100 Portable Hellbomb') {
    wikiName = 'Portable_Hellbomb';
  } else if (stratagem.name === 'MD-I4 Incendiary Mines') {
    wikiName = 'Incendiary_Mines';
  } else if (stratagem.name === 'ARC-3 Arc Thrower') {
    wikiName = 'Arc_Thrower';
  } else if (stratagem.name === 'AC-8 Autocannon') {
    wikiName = 'Autocannon';
  } else if (stratagem.name === 'Illumination Flare') {
    wikiName = 'Orbital_Illumination_Flare';
  } else if (stratagem.name === 'Super Earth Flag') {
    wikiName = 'Super_Earth_Flag';
  } else if (stratagem.name === 'SSSD Delivery') {
    wikiName = 'Dark_Fluid_Vessel';
  } else if (stratagem.name === 'Upload Data') {
    wikiName = 'Upload_Data';
  } else {
    // For other stratagems, format the name
    wikiName = stratagem.name
      .replace(/(\w)(\w*)/g, (g, first, rest) => first.toUpperCase() + rest.toLowerCase())
      .replace(/[\s\/\-]+/g, '_')
      .replace(/[^\w]/g, '');
  }
  
  // Format the wiki name and add suffix
  const wikiSlug = wikiName + '_Stratagem_Icon';
  
  // Create direct file name variant as is (for exact matches without transformation)
  const directFileName = stratagem.name.replace(/[\s\/]/g, '_');
  
  // Create additional variations that might match
  // 1. Try direct name with Stratagem_Icon suffix
  const directWithSuffix = directFileName + '_Stratagem_Icon';
  
  // 2. Try with replaced hyphen
  const noHyphenSlug = stratagem.name.replace(/\-/g, '_').replace(/\s+/g, '_') + '_Stratagem_Icon';
  
  // Special case for Upload Data which uses SVG format
  if (stratagem.name === 'Upload Data') {
    return [
      `icons/stratagems/Upload_Data_Stratagem_Icon.svg`,
      `icons/stratagems/${snakeSlug}.png`,
      `icons/stratagems/${directFileName}_Icon.png`,
      `icons/stratagems/${wikiSlug}.png`
    ];
  }
  
  // Return all formats to try in order of likelihood
  return [
    `icons/stratagems/${snakeSlug}.png`,
    `icons/stratagems/${wikiSlug}.png`,
    `icons/stratagems/${directWithSuffix}.png`,
    `icons/stratagems/${directFileName}_Icon.png`,
    `icons/stratagems/${noHyphenSlug}.png`,
    `icons/stratagems/${directFileName}.png`
  ];
}

// Helper function to log information about icon load failures
function logIconError(stratagem, iconPath) {
  // Only log the first time for this stratagem to avoid console spam
  if (!stratagem._loggedError) {
    console.warn(`Icon failed to load for: "${stratagem.name}"`);
    console.warn(`  Attempted path: ${iconPath}`);
    console.warn(`  All paths to try:`, getLocalIconPaths(stratagem));
    console.warn(`  Stratagem type: ${stratagem.type}`);
    console.warn(`  Stratagem code: ${stratagem.code}`);
    
    // Mark that we've logged an error for this stratagem
    stratagem._loggedError = true;
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Set up file input listener
  const fileInput = document.getElementById('jsonFileInput');
  fileInput.addEventListener('change', handleFileUpload);
  
  // Set up clear buttons
  document.getElementById('clear-m121').addEventListener('click', () => clearSlot('m121'));
  document.getElementById('clear-m122').addEventListener('click', () => clearSlot('m122'));
  document.getElementById('clear-m123').addEventListener('click', () => clearSlot('m123'));
  document.getElementById('clear-m124').addEventListener('click', () => clearSlot('m124'));
  document.getElementById('clear-all').addEventListener('click', clearAllSlots);
  
  // Set up download button
  document.getElementById('download-button').addEventListener('click', handleDownload);
  
  // Set up HID device buttons
  document.getElementById('connect-button').addEventListener('click', handleConnect);
  document.getElementById('disconnect-button').addEventListener('click', handleDisconnect);
  document.getElementById('upload-to-keyboard-button').addEventListener('click', handleUploadToKeyboard);
  
  // Check WebHID support
  checkWebHIDSupport();
  
  // Load stratagem grid
  populateStratagemGrid();
  
  // Add utility keypress to show icon paths for debugging
  document.addEventListener('keydown', function(event) {
    // Press Alt+D to debug icons
    if (event.altKey && event.key === 'd') {
      console.log("=== STRATAGEM ICON DEBUG ===");
      stratagemData.forEach(strat => {
        const paths = getLocalIconPaths(strat);
        console.log(`${strat.name} (${strat.type}):`);
        console.log(`  Snake case: ${paths[0]}`);
        console.log(`  Wiki format: ${paths[1]}`);
      });
    }
  });
});

// Populate the stratagem grid with data from data.js
function populateStratagemGrid() {
  const grid = document.getElementById('stratagem-grid');
  
  // Debug - log all stratagems to make sure we have the Gas Mines
  console.log("Total stratagems:", stratagemData.length);
  const gasMines = stratagemData.find(s => s.name.includes("Incendiary") && s.name.includes("Gas"));
  console.log("Gas Mines found:", gasMines ? "Yes" : "No");
  if (gasMines) {
    console.log("Gas Mines details:", gasMines.name, gasMines.code, gasMines.type);
  }
  
  // Group stratagems by type
  const stratagemsByType = {};
  stratagemData.forEach(stratagem => {
    if (!stratagemsByType[stratagem.type]) {
      stratagemsByType[stratagem.type] = [];
    }
    stratagemsByType[stratagem.type].push(stratagem);
  });
  
  // Create stratagem items by type
  Object.keys(stratagemsByType).forEach(type => {
    // Add type header
    const typeHeader = document.createElement('div');
    typeHeader.className = 'stratagem-type-header';
    typeHeader.textContent = type;
    typeHeader.style.gridColumn = '1 / -1';
    grid.appendChild(typeHeader);
    
    // Add stratagems for this type
    stratagemsByType[type].forEach(stratagem => {
      const stratagemItem = document.createElement('div');
      stratagemItem.className = 'stratagem-item';
      stratagemItem.setAttribute('data-name', stratagem.name);
      stratagemItem.setAttribute('data-code', stratagem.code);
      
      // Create container for the stratagem icon
      const iconContainer = document.createElement('div');
      iconContainer.className = 'stratagem-icon';
      
      // Try to use local icons first, fall back to wiki icon if available, then text as last resort
      const iconPaths = getLocalIconPaths(stratagem);
      
      // Create an image element for the stratagem icon
      const iconImg = document.createElement('img');
      // Start with the first format (snake_case)
      iconImg.src = iconPaths[0];
      iconImg.alt = stratagem.name;
      iconImg.title = `${stratagem.name} (${stratagem.code})`;
      iconImg.className = 'icon-image';
      
      // Recursive function to try each icon path in order
      function tryNextIcon(index) {
        if (index < iconPaths.length) {
          // Try the next path
          iconImg.src = iconPaths[index];
          iconImg.onerror = function() {
            // If this path fails, try the next one
            logIconError(stratagem, iconPaths[index]);
            tryNextIcon(index + 1);
          };
        } else {
          // If all local paths fail, try the wiki URL if available
          if (stratagem.iconUrl) {
            iconImg.src = stratagem.iconUrl;
            
            // If wiki image also fails, fall back to text representation
            iconImg.onerror = function() {
              this.style.display = 'none';
              
              // Create fallback text representation
              const textIcon = document.createElement('div');
              textIcon.className = 'text-icon';
              textIcon.textContent = stratagem.code;
              textIcon.title = `${stratagem.name} (${stratagem.code})`;
              iconContainer.appendChild(textIcon);
            };
          } else {
            // No wiki URL, go straight to text representation
            iconImg.style.display = 'none';
            
            // Create fallback text representation
            const textIcon = document.createElement('div');
            textIcon.className = 'text-icon';
            textIcon.textContent = stratagem.code;
            textIcon.title = `${stratagem.name} (${stratagem.code})`;
            iconContainer.appendChild(textIcon);
          }
        }
      }
      
      // Start the icon loading process with the first error handler
      iconImg.onerror = function() {
        logIconError(stratagem, iconPaths[0]);
        tryNextIcon(1); // Start with the second path (index 1)
      };
      
      iconContainer.appendChild(iconImg);
      
      // Add the stratagem name
      const nameEl = document.createElement('div');
      nameEl.className = 'stratagem-name';
      nameEl.textContent = stratagem.name;
      
      // Add code indicator below name for easier identification
      const codeEl = document.createElement('div');
      codeEl.className = 'stratagem-code';
      codeEl.textContent = stratagem.code;
      
      stratagemItem.appendChild(iconContainer);
      stratagemItem.appendChild(nameEl);
      stratagemItem.appendChild(codeEl);
      
      // Add click event listener
      stratagemItem.addEventListener('click', () => handleStratagemSelection(stratagem));
      
      grid.appendChild(stratagemItem);
    });
  });
}

// Find available macro slots in the uploaded JSON
function findAvailableMacroSlots(jsonData) {
  const availableSlots = [];
  
  // Check if there are explicit macro names in the JSON
  // Macro names would typically be in format "M123: Some description"
  for (let i = 0; i < jsonData.macros.length; i++) {
    if (typeof jsonData.macros[i] === 'string' && /^M\d+/.test(jsonData.macros[i])) {
      const macroName = jsonData.macros[i].split(/[:\s]/)[0].trim();
      
      // Check if macro is empty using better detection
      const isEmpty = !jsonData.macros[i] || 
                      jsonData.macros[i] === "" || 
                      jsonData.macros[i].includes("empty") ||
                      jsonData.macros[i].trim() === macroName;  // Just the macro name with no content
      
      availableSlots.push({
        index: i,
        name: macroName,
        isEmpty: isEmpty
      });
    }
  }
  
  // If no explicit macro names found or if we need more options, add all possible macro slots
  if (availableSlots.length === 0) {
    // Add all possible macro slots (M0 to the end of the array)
    for (let i = 0; i < jsonData.macros.length; i++) {
      const isEmpty = !jsonData.macros[i] || 
                     jsonData.macros[i] === "" || 
                     (typeof jsonData.macros[i] === 'string' && 
                       (jsonData.macros[i].includes("empty") || 
                        jsonData.macros[i].trim() === ""));
      
      availableSlots.push({
        index: i,
        name: `M${i}`,
        isEmpty: isEmpty
      });
    }
  }
  
  // Sort slots by name (M0, M1, M2, etc.)
  availableSlots.sort((a, b) => {
    const numA = parseInt(a.name.substring(1));
    const numB = parseInt(b.name.substring(1));
    return numA - numB;
  });
  
  return availableSlots;
}

// Create and show the macro slot dropdown
function createMacroSlotsDropdown(availableSlots) {
  // Create dropdown container
  const dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'macro-slots-dropdown-container';
  dropdownContainer.innerHTML = `
    <h3>Select Macro Slots</h3>
    <div class="dropdown-description">
      Choose which macro slots in your VIA JSON file to use:
    </div>
  `;
  
  // Create dropdown for each of our 4 slots
  const slots = ['m121', 'm122', 'm123', 'm124'];
  slots.forEach((slot, idx) => {
    const slotContainer = document.createElement('div');
    slotContainer.className = 'slot-dropdown-row';
    
    const label = document.createElement('label');
    label.setAttribute('for', `${slot}-select`);
    label.textContent = `Slot ${idx+1}: `;
    
    const select = document.createElement('select');
    select.id = `${slot}-select`;
    select.className = 'macro-slot-select';
    
    // Add an option for each available macro slot
    availableSlots.forEach(availableMacro => {
      const option = document.createElement('option');
      option.value = availableMacro.index;
      option.textContent = `${availableMacro.name} ${!availableMacro.isEmpty ? '(not empty)' : ''}`;
      select.appendChild(option);
      
      // Set default selections based on our slot names but allow any M-number to be selected
      const defaultMappings = {
        'm121': 'M121',
        'm122': 'M122',
        'm123': 'M123',
        'm124': 'M124'
      };
      
      // Select the options that match our conventional mapping, or use first available slots
      if (availableMacro.name === defaultMappings[slot]) {
        select.value = availableMacro.index;
      }
    });
    
    // If no default selection was made, select the first empty slot if possible
    if (!select.value && availableSlots.length > 0) {
      // Try to find an empty slot first
      const emptySlot = availableSlots.find(slot => slot.isEmpty);
      if (emptySlot) {
        select.value = emptySlot.index;
      } else {
        // If no empty slot, use the first one
        select.value = availableSlots[0].index;
      }
    }
    
    // Add event listener to update macroIndices when selection changes
    select.addEventListener('change', function() {
      macroIndices[slot] = parseInt(this.value);
      
      // Update the slot label to reflect the selected macro
      const macroName = availableSlots.find(macro => macro.index === parseInt(this.value))?.name || '';
      
      // Update slot label
      const slotLabel = document.querySelector(`#slot${idx+1} .slot-label`);
      if (slotLabel) {
        slotLabel.textContent = macroName;
      }
      
      // Update preview label
      const previewLabel = document.querySelector(`.slot-${idx+1}-label`);
      if (previewLabel) {
        previewLabel.textContent = `${macroName}:`;
      }
      
      // Update clear button text
      const clearButton = document.getElementById(`clear-${slot}`);
      if (clearButton) {
        clearButton.textContent = `Clear ${macroName}`;
      }
    });
    
    slotContainer.appendChild(label);
    slotContainer.appendChild(select);
    dropdownContainer.appendChild(slotContainer);
  });
  
  // Insert the dropdown before the macro slots section
  const macroSlots = document.querySelector('.macro-slots');
  macroSlots.parentNode.insertBefore(dropdownContainer, macroSlots);
  
  // Trigger change events to update slot labels with initial selections
  slots.forEach((slot, idx) => {
    const select = document.getElementById(`${slot}-select`);
    if (select) {
      macroIndices[slot] = parseInt(select.value);
      
      // Update the slot label to reflect the selected macro
      const macroName = availableSlots.find(macro => macro.index === parseInt(select.value))?.name || '';
      
      // Update slot label
      const slotLabel = document.querySelector(`#slot${idx+1} .slot-label`);
      if (slotLabel) {
        slotLabel.textContent = macroName;
      }
      
      // Update preview label
      const previewLabel = document.querySelector(`.slot-${idx+1}-label`);
      if (previewLabel) {
        previewLabel.textContent = `${macroName}:`;
      }
      
      // Update clear button text
      const clearButton = document.getElementById(`clear-${slot}`);
      if (clearButton) {
        clearButton.textContent = `Clear ${macroName}`;
      }
    }
  });
}

// Handle file upload
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Update file name display
  document.getElementById('file-name').textContent = file.name;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      // Parse JSON
      const jsonData = JSON.parse(e.target.result);
      
      // Validate that it's a VIA JSON file with macros
      if (!jsonData.macros) {
        throw new Error('Invalid VIA JSON file: Missing macros array');
      }
      
      // Store uploaded data
      uploadedJsonData = jsonData;
      
      // Find available macro slots
      const availableSlots = findAvailableMacroSlots(jsonData);
      
      // Remove any existing dropdown
      const existingDropdown = document.querySelector('.macro-slots-dropdown-container');
      if (existingDropdown) existingDropdown.remove();
      
      // Create new dropdown
      createMacroSlotsDropdown(availableSlots);
      
      // Update macroIndices with the initial selected values
      const slots = ['m121', 'm122', 'm123', 'm124'];
      slots.forEach(slot => {
        const select = document.getElementById(`${slot}-select`);
        if (select) {
          macroIndices[slot] = parseInt(select.value);
        }
      });
      
      // Show success message
      const uploadStatus = document.getElementById('upload-status');
      uploadStatus.textContent = 'VIA JSON file successfully loaded!';
      uploadStatus.className = 'success';
      
      // Enable the download button
      document.getElementById('download-button').disabled = false;
      
      // Reset any previous selections
      resetSelections();
      
    } catch (error) {
      console.error('Error parsing JSON file:', error);
      
      // Show error message
      const uploadStatus = document.getElementById('upload-status');
      uploadStatus.textContent = 'Error: Invalid VIA JSON file';
      uploadStatus.className = 'error';
      
      // Reset state
      uploadedJsonData = null;
      document.getElementById('download-button').disabled = true;
      
      // Remove any existing dropdown
      const existingDropdown = document.querySelector('.macro-slots-dropdown-container');
      if (existingDropdown) existingDropdown.remove();
    }
  };
  
  reader.readAsText(file);
}

// Handle stratagem selection
function handleStratagemSelection(stratagem) {
  // Find next empty slot or use the first slot if all are filled
  let targetSlot = null;
  
  if (!selectedStratagems.m121) {
    targetSlot = 'm121';
  } else if (!selectedStratagems.m122) {
    targetSlot = 'm122';
  } else if (!selectedStratagems.m123) {
    targetSlot = 'm123';
  } else if (!selectedStratagems.m124) {
    targetSlot = 'm124';
  } else {
    // All slots filled, replace the first one
    targetSlot = 'm121';
  }
  
  // Update selected slot
  selectedStratagems[targetSlot] = stratagem;
  updateSlotDisplay(targetSlot, stratagem);
  updatePreview();
}

// Update the visual display of a slot
function updateSlotDisplay(slot, stratagem) {
  const slotElement = document.getElementById(`selected-${slot}`);
  
  if (stratagem) {
    slotElement.innerHTML = '';
    
    // Create container for the stratagem display
    const container = document.createElement('div');
    container.className = 'slot-content';
    container.setAttribute('data-type', stratagem.type);
    
    // Add the icon using the same fallback pattern as the grid
    const iconPaths = getLocalIconPaths(stratagem);
    const iconImg = document.createElement('img');
    iconImg.src = iconPaths[0]; // Start with the first format (snake_case)
    iconImg.alt = stratagem.name;
    iconImg.className = 'slot-icon';
    
    // Recursive function to try each icon path in order
    function tryNextSlotIcon(index) {
      if (index < iconPaths.length) {
        // Try the next path
        iconImg.src = iconPaths[index];
        iconImg.onerror = function() {
          // If this path fails, try the next one
          tryNextSlotIcon(index + 1);
        };
      } else {
        // If all local paths fail, try the wiki URL if available
        if (stratagem.iconUrl) {
          iconImg.src = stratagem.iconUrl;
          
          // If wiki image also fails, hide the image
          iconImg.onerror = function() {
            this.style.display = 'none';
          };
        } else {
          // No wiki URL, just hide the image
          iconImg.style.display = 'none';
        }
      }
    }
    
    // Start the icon loading process with the first error handler
    iconImg.onerror = function() {
      tryNextSlotIcon(1); // Start with the second path (index 1)
    };
    
    container.appendChild(iconImg);
    
    // Always show the code for quick reference
    const codeDiv = document.createElement('div');
    codeDiv.className = 'slot-code';
    codeDiv.textContent = stratagem.code;
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'slot-name';
    nameDiv.textContent = stratagem.name;
    
    container.appendChild(codeDiv);
    container.appendChild(nameDiv);
    
    slotElement.appendChild(container);
    slotElement.title = `${stratagem.name} (${stratagem.code})`;
  } else {
    slotElement.innerHTML = '<div class="empty-slot">(Empty)</div>';
  }
}

// Clear a specific slot
function clearSlot(slot) {
  selectedStratagems[slot] = null;
  updateSlotDisplay(slot, null);
  updatePreview();
}

// Clear all slots
function clearAllSlots() {
  Object.keys(selectedStratagems).forEach(slot => {
    selectedStratagems[slot] = null;
    updateSlotDisplay(slot, null);
  });
  updatePreview();
}

// Reset all selections
function resetSelections() {
  selectedStratagems = {
    m121: null,
    m122: null,
    m123: null,
    m124: null
  };
  
  // Check if macro slots are not empty in the uploaded JSON
  if (uploadedJsonData && uploadedJsonData.macros) {
    const slots = ['m121', 'm122', 'm123', 'm124'];
    
    slots.forEach(slot => {
      const index = macroIndices[slot];
      const macroContent = uploadedJsonData.macros[index];
      
      // Display "(not empty)" if the macro has content
      if (macroContent && macroContent !== "" && !macroContent.includes("empty")) {
        // Update the displayed text to show "not empty"
        const slotElement = document.getElementById(`selected-${slot}`);
        if (slotElement) {
          slotElement.innerHTML = '<div class="empty-slot">(not empty)</div>';
        }
      } else {
        updateSlotDisplay(slot, null);
      }
    });
  } else {
    // If no JSON is uploaded, or it doesn't have macros, just display as empty
    updateSlotDisplay('m121', null);
    updateSlotDisplay('m122', null);
    updateSlotDisplay('m123', null);
    updateSlotDisplay('m124', null);
  }
  
  updatePreview();
}

// Update the preview section
function updatePreview() {
  const previewM121 = document.getElementById('preview-m121');
  const previewM122 = document.getElementById('preview-m122');
  const previewM123 = document.getElementById('preview-m123');
  const previewM124 = document.getElementById('preview-m124');
  
  // Check if the uploaded JSON has non-empty macros
  if (uploadedJsonData && uploadedJsonData.macros) {
    const slots = ['m121', 'm122', 'm123', 'm124'];
    const previewElements = [previewM121, previewM122, previewM123, previewM124];
    
    slots.forEach((slot, index) => {
      const macroIndex = macroIndices[slot];
      const macroContent = uploadedJsonData.macros[macroIndex];
      const previewElement = previewElements[index];
      
      if (selectedStratagems[slot]) {
        // If a stratagem is selected, show its macro string
        previewElement.textContent = selectedStratagems[slot].macroString;
      } else if (macroContent && macroContent !== "" && !macroContent.includes("empty")) {
        // If no stratagem is selected but the macro is not empty, show "(not empty)"
        previewElement.textContent = '(not empty)';
      } else {
        // Otherwise, show "(Empty)"
        previewElement.textContent = '(Empty)';
      }
    });
  } else {
    // If no JSON is uploaded, or it doesn't have macros, just display as empty
    previewM121.textContent = selectedStratagems.m121 ? selectedStratagems.m121.macroString : '(Empty)';
    previewM122.textContent = selectedStratagems.m122 ? selectedStratagems.m122.macroString : '(Empty)';
    previewM123.textContent = selectedStratagems.m123 ? selectedStratagems.m123.macroString : '(Empty)';
    previewM124.textContent = selectedStratagems.m124 ? selectedStratagems.m124.macroString : '(Empty)';
  }
}

// Handle the download button click
function handleDownload() {
  if (!uploadedJsonData) {
    alert('Please upload a VIA JSON file first.');
    return;
  }
  
  // Check if any selected slots contain existing content
  const slotsWithContent = [];
  Object.keys(macroIndices).forEach(slot => {
    const index = macroIndices[slot];
    if (uploadedJsonData.macros[index] && 
        uploadedJsonData.macros[index] !== "" && 
        !uploadedJsonData.macros[index].includes("empty") &&
        selectedStratagems[slot]) { // Only warn if we're going to write to this slot
      
      // Get the display name of the macro for user-friendly messages
      const slotIdx = ['m121', 'm122', 'm123', 'm124'].indexOf(slot);
      const slotLabel = document.querySelector(`#slot${slotIdx+1} .slot-label`);
      const macroName = slotLabel ? slotLabel.textContent : `Slot ${slotIdx+1}`;
      
      slotsWithContent.push(macroName);
    }
  });
  
  // Confirm overwrite if needed
  if (slotsWithContent.length > 0) {
    const confirmMessage = `Warning: You are about to overwrite existing content in the following macro slots: ${slotsWithContent.join(', ')}. Continue?`;
    if (!confirm(confirmMessage)) {
      return;
    }
  }
  
  // Create a copy of the JSON data
  const updatedJsonData = JSON.parse(JSON.stringify(uploadedJsonData));
  
  // Helper to safely update macro while preserving structure
  function updateMacro(index, macroString) {
    const currentMacro = updatedJsonData.macros[index];
    
    // If the current macro is an object, preserve its structure
    if (typeof currentMacro === 'object' && currentMacro !== null) {
      // Only update the contents property where the macro string is stored
      currentMacro.contents = macroString;
      return currentMacro;
    } else {
      // If it's a string or doesn't exist, just use the macro string directly
      return macroString;
    }
  }
  
  // Update the macros array for the selected slots using the macroIndices map
  // Preserve the macro structure (object with properties) if it exists
  if (selectedStratagems.m121) {
    updatedJsonData.macros[macroIndices.m121] = updateMacro(macroIndices.m121, selectedStratagems.m121.macroString);
  }
  
  if (selectedStratagems.m122) {
    updatedJsonData.macros[macroIndices.m122] = updateMacro(macroIndices.m122, selectedStratagems.m122.macroString);
  }
  
  if (selectedStratagems.m123) {
    updatedJsonData.macros[macroIndices.m123] = updateMacro(macroIndices.m123, selectedStratagems.m123.macroString);
  }
  
  if (selectedStratagems.m124) {
    updatedJsonData.macros[macroIndices.m124] = updateMacro(macroIndices.m124, selectedStratagems.m124.macroString);
  }
  
  // Convert JSON back to string
  const jsonString = JSON.stringify(updatedJsonData, null, 2);
  
  // Create a blob and download link
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Get original filename and create updated filename
  const filename = document.getElementById('file-name').textContent;
  let updatedFilename = filename;
  
  // Add '_updated' before the .json extension if it doesn't already contain it
  if (!updatedFilename.includes('_updated') && updatedFilename.endsWith('.json')) {
    updatedFilename = updatedFilename.replace('.json', '_updated.json');
  } else if (!updatedFilename.includes('_updated')) {
    updatedFilename += '_updated.json';
  }
  
  // Create download link and trigger click
  const a = document.createElement('a');
  a.href = url;
  a.download = updatedFilename;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

// ============================================
// WebHID Device Handling Functions
// ============================================

// Check if WebHID is supported
function checkWebHIDSupport() {
  const warning = document.getElementById('webhid-warning');
  const connectButton = document.getElementById('connect-button');
  
  if (!isWebHIDSupported()) {
    warning.style.display = 'block';
    connectButton.disabled = true;
  }
}

// Update device status UI
function updateDeviceStatus(status, message) {
  const statusIndicator = document.querySelector('.status-indicator');
  const statusText = document.querySelector('.status-text');
  const deviceInfo = document.getElementById('device-info');
  const connectButton = document.getElementById('connect-button');
  const disconnectButton = document.getElementById('disconnect-button');
  const uploadButton = document.getElementById('upload-to-keyboard-button');
  
  statusIndicator.className = 'status-indicator ' + status;
  statusText.textContent = message;
  
  if (status === 'connected') {
    isDeviceConnected = true;
    deviceInfo.style.display = 'block';
    connectButton.disabled = true;
    disconnectButton.disabled = false;
    uploadButton.disabled = !hasSelectedStratagems();
  } else {
    isDeviceConnected = false;
    deviceInfo.style.display = 'none';
    connectButton.disabled = false;
    disconnectButton.disabled = true;
    uploadButton.disabled = true;
  }
}

// Check if any stratagems are selected
function hasSelectedStratagems() {
  return Object.values(selectedStratagems).some(s => s !== null);
}

// Handle connect button click
async function handleConnect() {
  updateDeviceStatus('connecting', 'Connecting...');
  
  try {
    const device = await requestDevice();
    const info = await connectDevice(device);
    
    document.getElementById('device-name').textContent = info.productName;
    document.getElementById('device-vid-pid').textContent = 
      `${info.vendorId.toString(16).padStart(4, '0').toUpperCase()}:${info.productId.toString(16).padStart(4, '0').toUpperCase()}`;
    document.getElementById('device-protocol').textContent = `v${info.protocolVersion}`;
    
    // Get macro count and populate slot selector
    const macroCount = await getMacroCount();
    document.getElementById('device-macro-count').textContent = macroCount;
    
    // Populate the HID macro slot selector
    populateHIDMacroSlotSelector(macroCount);
    
    updateDeviceStatus('connected', `Connected to ${info.productName}`);
  } catch (err) {
    console.error('Connection failed:', err);
    updateDeviceStatus('disconnected', `Connection failed: ${err.message}`);
  }
}

// Populate HID macro slot selector dropdowns
function populateHIDMacroSlotSelector(macroCount) {
  const configDiv = document.getElementById('hid-macro-slots-config');
  const slots = ['hid-slot1', 'hid-slot2', 'hid-slot3', 'hid-slot4'];
  const defaultIndices = [121, 122, 123, 124]; // M121-M124 defaults (indices 121-124)
  
  slots.forEach((slotId, idx) => {
    const select = document.getElementById(slotId);
    select.innerHTML = ''; // Clear existing options
    
    // Add options for each available macro slot
    for (let i = 0; i < macroCount; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `M${i} (index ${i})`;
      select.appendChild(option);
    }
    
    // Set default value - use M121-M124 if available, otherwise use first 4 slots
    const defaultIndex = defaultIndices[idx];
    if (defaultIndex < macroCount) {
      select.value = defaultIndex;
      macroIndices[`m12${idx + 1}`] = defaultIndex;
    } else {
      select.value = idx;
      macroIndices[`m12${idx + 1}`] = idx;
    }
    
    // Update macroIndices when selection changes
    select.addEventListener('change', function() {
      const slotKey = `m12${idx + 1}`;
      macroIndices[slotKey] = parseInt(this.value);
      console.log(`Updated ${slotKey} to index ${this.value}`);
      
      // Also update the slot labels in the UI
      const slotLabel = document.querySelector(`#slot${idx + 1} .slot-label`);
      if (slotLabel) {
        slotLabel.textContent = `M${this.value}`;
      }
    });
    
    // Initialize slot labels
    const slotLabel = document.querySelector(`#slot${idx + 1} .slot-label`);
    if (slotLabel) {
      slotLabel.textContent = `M${select.value}`;
    }
  });
  
  // Show the config section
  configDiv.style.display = 'block';
}

// Handle disconnect button click
async function handleDisconnect() {
  try {
    await disconnectDevice();
    updateDeviceStatus('disconnected', 'Disconnected');
    
    // Hide the HID macro slots config
    document.getElementById('hid-macro-slots-config').style.display = 'none';
  } catch (err) {
    console.error('Disconnect failed:', err);
    updateDeviceStatus('disconnected', 'Disconnected');
  }
}

// Handle upload to keyboard button click
async function handleUploadToKeyboard() {
  if (!isDeviceConnected) {
    alert('Please connect to a keyboard first.');
    return;
  }
  
  if (!hasSelectedStratagems()) {
    alert('Please select at least one stratagem.');
    return;
  }
  
  const uploadProgress = document.getElementById('upload-progress');
  const progressText = uploadProgress.querySelector('.progress-text');
  const uploadButton = document.getElementById('upload-to-keyboard-button');
  
  // Show progress
  uploadProgress.style.display = 'block';
  uploadButton.disabled = true;
  progressText.textContent = 'Uploading macros to keyboard...';
  
  try {
    // Build macro map: macro index -> macro string
    const macroMap = {};
    
    if (selectedStratagems.m121) {
      macroMap[macroIndices.m121] = selectedStratagems.m121.macroString;
    }
    if (selectedStratagems.m122) {
      macroMap[macroIndices.m122] = selectedStratagems.m122.macroString;
    }
    if (selectedStratagems.m123) {
      macroMap[macroIndices.m123] = selectedStratagems.m123.macroString;
    }
    if (selectedStratagems.m124) {
      macroMap[macroIndices.m124] = selectedStratagems.m124.macroString;
    }
    
    console.log('Uploading macros:', macroMap);
    
    // Upload to keyboard
    const result = await uploadMacros(macroMap);
    
    progressText.textContent = `Success! Uploaded ${result.bytesWritten} bytes to ${result.macroCount} macro slots.`;
    progressText.style.color = 'var(--success-color)';
    
    setTimeout(() => {
      uploadProgress.style.display = 'none';
      uploadButton.disabled = false;
    }, 3000);
    
  } catch (err) {
    console.error('Upload failed:', err);
    progressText.textContent = `Upload failed: ${err.message}`;
    progressText.style.color = 'var(--hover-color)';
    uploadButton.disabled = false;
    
    setTimeout(() => {
      uploadProgress.style.display = 'none';
    }, 5000);
  }
}

// Override updatePreview to also update upload button state
const originalUpdatePreview = updatePreview;
updatePreview = function() {
  originalUpdatePreview();
  
  // Update upload button state based on device connection and stratagem selection
  const uploadButton = document.getElementById('upload-to-keyboard-button');
  if (uploadButton && isDeviceConnected) {
    uploadButton.disabled = !hasSelectedStratagems();
  }
};
