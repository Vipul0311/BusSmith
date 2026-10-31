const { app, BrowserWindow, Menu, shell, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1500, height: 900, minWidth: 1000, minHeight: 600,
    title: 'BusSmith', backgroundColor: '#ffffff',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadFile(path.join(__dirname, 'BusSmith.html'));
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

function allowUsb() {
  const ses = session.defaultSession;
  // let BusSmith use the KNX USB interface (WebHID) without a browser permission prompt
  ses.setPermissionCheckHandler((wc, perm) => perm === 'hid' || perm === 'clipboard-sanitized-write');
  ses.setPermissionRequestHandler((wc, perm, cb) => cb(perm === 'hid' || perm === 'clipboard-sanitized-write'));
  ses.setDevicePermissionHandler(d => d.deviceType === 'hid');
  ses.on('select-hid-device', (event, details, callback) => {
    event.preventDefault();
    const knx = details.deviceList.find(d => (d.collections || []).some(c => c.usagePage === 0xFF01) || /knx|interra/i.test(d.name || d.productName || '')) || details.deviceList[0];
    callback(knx ? knx.deviceId : '');
  });
}

app.whenReady().then(() => {
  allowUsb();
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'File', submenu: [{ role: 'quit' }] },
    { label: 'Edit', submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }] },
    { label: 'View', submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }, { type: 'separator' }, { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'togglefullscreen' }] }
  ]));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
