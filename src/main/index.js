import { app, shell, BrowserWindow, dialog } from 'electron'
import * as path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    x: 0,
    y: 0,
    fullscreen: false,
    frame: false,
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

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.alt && input.shift && input.key.toLowerCase() === 'x') {
      event.preventDefault()
      app.quit()
    }
    if (!is.dev && input.control && input.key.toLowerCase() === 'r') {
      event.preventDefault()
    }
    if (input.alt && input.code === 'F4') {
      event.preventDefault()
    }
    if (input.code === 'F11') {
      event.preventDefault()
    }
    if (input.code === 'F12') {
      event.preventDefault()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

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
