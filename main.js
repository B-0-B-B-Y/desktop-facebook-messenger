const electron = require('electron')
const {app, BrowserWindow, ipcMain, Menu, Tray} = require('electron')
const {autoUpdater} = require("electron-updater")
const path = require('path')
const url = require('url')
const fs = require('fs')

let messengerWindow = null;

app.on('ready', function() {

  const {width, height} = electron.screen.getPrimaryDisplay().size

    messengerWindow = new BrowserWindow({
        height: height * 0.6,
        width: width * 0.5,
        frame: false,
        transparent: false,
        icon: path.join(__dirname, 'app/build/icon.png'),
        alwaysOnTop: false
    })

    appIcon = new Tray(path.join(__dirname, 'app/build/icon.png'))
    const contextMenu = Menu.buildFromTemplate([
      {label: 'Desktop Messenger', type: 'normal', enabled: 'false'},
      {label: 'Close to Tray', type: 'normal', role: 'hide', click:  function(){
        messengerWindow.hide()}},
      {label: 'Show from Tray', type: 'normal', click:  function(){
        messengerWindow.show()}},
      {label: 'Quit', type: 'normal', role: 'quit'}
    ])

    // Call this again for Linux because we modified the context menu
    appIcon.setContextMenu(contextMenu)

    appIcon.on('click', function() {
      messengerWindow.show()
    })

    messengerWindow.loadURL('file://' + __dirname + '/app/index.html');

    autoUpdater.checkForUpdates()

})

function sendStatusToWindow(text) {
  messengerWindow.webContents.send('message', text);
}
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});

ipcMain.on('button-press-hide', (event, arg) => {
  messengerWindow.minimize()
})

ipcMain.on('button-press-close', (event, arg) => {
  app.quit()
})
