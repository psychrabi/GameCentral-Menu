import { app, shell, BrowserWindow, dialog, ipcMain } from 'electron'
import * as path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
const si = require('systeminformation')
const fs = require('fs')
const os = require('os')
const spawn = require('child_process').spawn
const systemInfo = {
  baseboard: 'manufacturer, model',
  cpu: 'manufacturer, brand',
  graphics: 'controllers, displays',
  mem: 'total',
  networkInterfaces: 'ip4, mac, speed, default',
  osInfo: 'distro, build, uefi, hostname',
  uuid: 'hardware'
}
const WebSocket = require('ws')
const ws = new WebSocket('ws://localhost:9000')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    x: 0,
    y: 0,
    fullscreen: false,
    frame: false,
    kiosk: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png')
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      devTools: !app.isPackaged
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.on('will-prevent-unload', (event) => {
    const options = {
      type: 'question',
      buttons: ['Cancel', 'Exit'],
      message: 'Exit the program?',
      detail: 'Changes that you made may not be saved.'
    }
    const response = dialog.showMessageBoxSync(null, options)
    if (response === 1) event.preventDefault()
  })
  mainWindow.setMenu(null)

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.alt && input.shift && input.key.toLowerCase() === 'x') {
      event.preventDefault()
      app.quit()
    }
    if (input.control && input.alt && input.shift && input.key.toLowerCase() === 'm') {
      mainWindow.webContents.executeJavaScript('window.showButton()')
      console.log('gamemodal shown')
    }
    if (!is.dev && input.control && input.key.toLowerCase() === 'r') {
      event.preventDefault()
    }
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      event.preventDefault()
    }
    if (input.alt && input.code === 'F4') {
      event.preventDefault()
    }
    if (input.code === 'F11') {
      event.preventDefault()
    }
    // if (input.code === 'F12') {
    //   event.preventDefault()
    // }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.gamecentral')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

//Getting client system info
ipcMain.handle('request-system-info', async () => {
  const info = await si.get(systemInfo)
  return info
})

let processRunning = false
let processRef
ipcMain.handle('launch:executable', (event, gamePath) => {
  const process = spawn(gamePath)
  if (process) processRunning = true

  processRef.on('exit', (code, signal) => {
    console.log(`Process exited with code ${code} and signal ${signal}`)
    processRunning = false
    event.sender.send('process-exited', processRunning)
  })

  return processRunning
})

ipcMain.handle('check:executable', async (event, gamePath) => {
  return new Promise((resolve, reject) => {
    fs.access(gamePath, fs.constants.F_OK, (err) => {
      if (!err) {
        resolve({ status: 'file-exists', processRunning })
      } else {
        resolve({ status: 'file-does-not-exist', processRunning })
      }
    })
  })
})

ipcMain.handle('dialog:openDirectory', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Executable Files', extensions: ['exe'] },
      { name: 'Shortcut Files', extensions: ['lnk'] }
    ]
  })

  if (!result.canceled && result.filePaths.length > 0) {
    const selectedFilePath = result.filePaths[0]
    const fileExtension = selectedFilePath.split('.').pop()

    if (fileExtension === 'lnk') {
      // console.log('Selected file is a shortcut:', selectedFilePath);
      const lnkTarget = shell.readShortcutLink(selectedFilePath).target
      const lnkArgs = shell.readShortcutLink(selectedFilePath).args
      // console.log('Shortcut target:', lnkTarget);
      // console.log('Shortcut arguments:', lnkArgs);
      return { executable: lnkTarget, parameters: lnkArgs }
    } else if (fileExtension === 'exe') {
      console.log('Selected file is an executable:', selectedFilePath)
      return { executable: selectedFilePath, parameters: '' }
    } else {
      console.log('Selected file is neither an executable nor a shortcut.')
      return null
    }
  } else {
    console.log('No file selected.')
    return null
  }
})

// Handle connection events
ws.on('open', () => {
  console.log('connected to server')
  si.get(systemInfo).then((data) => ws.send(JSON.stringify(data)))
})

// Handle incoming messages
ws.on('message', (message) => {
  console.log(`received message: ${JSON.parse(message.string())}`)
})

ws.on('error', console.error)
