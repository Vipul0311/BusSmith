# BusSmith

An unofficial, ETS-style engineering and diagnostics tool for KNX, built as a single HTML file.
It runs in Chrome/Edge and talks to a KNX USB interface directly over WebHID.

> **Disclaimer:** BusSmith is an independent hobby/learning project. It is **not** affiliated with,
> endorsed by, or a replacement for ETS or the KNX Association. "KNX" and "ETS" are trademarks of
> the KNX Association. No ETS code, product data or proprietary files are included in this repository.

## Features
- ETS-style workspace: Buildings, Group Addresses, Topology, Diagnostics
- Live bus monitor over a KNX USB interface (WebHID), with raw/hex view
- Group read / write, bus scan, device info (descriptor), device restart
- Read group-link tables from a device (point-to-point sessions)
- Control tab: switch, dimming %, colour temperature (DPT 7.600, Kelvin), brighter/darker
- Right-click device menu (cut/copy/paste, etc.)
- Offline DALI-gateway and Parameters page layouts (editors only)
- Import of ETS project/product data (basic), project save/open as `.bussmith.json`
- Optional Electron wrapper for a Windows desktop app (`desktop/`)

## Known limitations (honest list)
- DALI scan/commissioning and **programming/downloading devices are not implemented** (buttons are disabled).
- `.knxproj` import is basic; product data may be incomplete (device/object names can be generic).
- Manufacturer-specific gateways (e.g. DALI/KNX) need their vendor's configuration tool.
- Tested against a mock HID device and one real USB interface; use on a test setup, not live installations.

## Usage
1. Open `index.html` in Chrome or Edge (WebHID requires a secure context: `https://` or `file://`/localhost).
2. Create the first user, then click **Connect** and pick your KNX USB interface.
3. Close ETS before connecting - only one program can hold the USB interface.

Desktop app: see `desktop/` (needs Node.js; run `INSTALL-BusSmith.bat`, then `RUN-BusSmith.bat`).

## Privacy
Everything runs locally in your browser. Projects are stored in browser storage or exported as files.
Do not commit your own `.knxproj` files - they can contain private building data.
