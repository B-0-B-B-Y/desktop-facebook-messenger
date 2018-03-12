const electron = require('electron')
const {app, BrowserWindow, ipcMain} = require('electron')
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

    messengerWindow.loadURL('file://' + __dirname + '/app/index.html');

    const options = {
      verbose: false,
      logger: console,
    }

    //messengerWindow.webContents.openDevTools()

})

ipcMain.on('button-press-hide', (event, arg) => {
  messengerWindow.minimize()
})

ipcMain.on('button-press-close', (event, arg) => {
  app.quit()
})
