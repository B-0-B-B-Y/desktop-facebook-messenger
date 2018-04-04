const electron = require('electron')
const {app, BrowserWindow, ipcMain, Menu, Tray} = require('electron')
const {autoUpdater} = require("electron-updater")
const path = require('path')
const url = require('url')
const fs = require('fs')

let messengerWindow = null;

app.on('ready', function() {

  autoUpdater.checkForUpdatesAndNotify()

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

})

ipcMain.on('button-press-hide', (event, arg) => {
  messengerWindow.minimize()
})

ipcMain.on('button-press-close', (event, arg) => {
  app.quit()
})
