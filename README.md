# Helldivers 2 VIA Macrolizer

A web application that allows Helldivers 2 players to create VIA keyboard macros for stratagems and integrate them into their keyboard layouts.

## Overview

This application enables users to:

1. Upload their VIA keyboard layout JSON file
2. Select Helldivers 2 stratagems for specific macro slots (M121, M122, M123, M124)
3. Automatically generate the correct VIA macro strings based on stratagem input codes
4. Download the updated VIA JSON file to use with their keyboard

## Features

- **Complete Stratagem Library**: Contains all stratagems from Helldivers 2 with their respective icons and input codes
- **Visual Selection Interface**: Select stratagems by clicking on their icons
- **Automatic Macro Generation**: Generates VIA-compatible macro strings following the standard format
- **Custom Slot Assignment**: Assigns stratagems to specific macro slots (M121-M124)
- **Preserves Other Settings**: Only modifies the specified macro slots, leaving the rest of your keyboard configuration intact

## How to Use

1. **Start the application**:
   - Open `index.html` in your web browser, or
   - Start a local web server (e.g., `python -m http.server 8000`) and navigate to it

2. **Upload Your VIA JSON**:
   - Click "Choose File" in the upload section
   - Select your keyboard's VIA JSON file (typically exported from the VIA configurator)

3. **Select Stratagems**:
   - Browse the stratagem library and click on stratagems to assign them
   - Stratagems will fill slots M121 through M124 in order
   - Use the "Clear" buttons to remove selections from specific slots
   - If slots M12x isn't avaliable, use the dropdown menu to select the preferred slot only after uploading your JSON file
   - Note: If a slot is not null, it will warn (not empty) next to the M# 

4. **Download Updated JSON**:
   - Click "Update and Download VIA JSON" to receive your updated configuration file
   - The file will be named with "_updated" appended to the original filename

5. **Use with VIA**:
   - Open the VIA configurator
   - Load your updated JSON file
   - Test your macros!

## Linux Setup (WebHID)

If you're using the WebHID "Connect to Keyboard" feature on Linux, you'll need to create a udev rule to grant your user permission to access the HID device. Without this, the browser can see the device but will fail to open it.

1. Find your keyboard's vendor and product ID:
   ```bash
   lsusb
   ```
   Look for your keyboard in the output (e.g., `ID f35b:fab6 customMK EVO70 R2`).

2. Create a udev rule (replace `XXXX` with your vendor ID and `YYYY` with your product ID):
   ```bash
   sudo tee /etc/udev/rules.d/99-via-keyboards.rules << 'EOF'
   KERNEL=="hidraw*", ATTRS{idVendor}=="XXXX", ATTRS{idProduct}=="YYYY", MODE="0660", GROUP="input"
   SUBSYSTEM=="usb", ATTR{idVendor}=="XXXX", ATTR{idProduct}=="YYYY", MODE="0660", GROUP="input"
   EOF
   ```

3. Reload rules and replug the keyboard:
   ```bash
   sudo udevadm control --reload-rules && sudo udevadm trigger
   ```
   Then unplug and replug your keyboard.

> Note: Make sure your user is in the `input` group (`groups` to check, `sudo usermod -aG input $USER` to add).
> WebHID requires Chrome, Chromium, or Edge. Firefox does not support WebHID.

## Technical Details

- The application generates VIA macro strings that follow this pattern:
  - Start with pressing 'I' key: `{+KC_I}{30}{-KC_I}{15}`
  - For each direction in the stratagem code:
    - Up: `{+KC_UP}{15}{-KC_UP}{15}`
    - Down: `{+KC_DOWN}{15}{-KC_DOWN}{15}`
    - Left: `{+KC_LEFT}{15}{-KC_LEFT}{15}`
    - Right: `{+KC_RGHT}{15}{-KC_RGHT}{15}`

- Macro slots are assigned as follows:
  - M121: Index 120 in the macros array
  - M122: Index 121 in the macros array
  - M123: Index 122 in the macros array
  - M124: Index 123 in the macros array

## Credits

- Stratagem data sourced from [Helldivers Fandom Wiki](https://helldivers.fandom.com/wiki/Stratagem_Codes)
- Icons are property of Arrowhead Game Studios and Sony Interactive Entertainment

## License

Open source for the Helldivers community. Feel free to modify and improve!
