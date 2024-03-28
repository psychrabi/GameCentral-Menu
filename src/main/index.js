import { app, shell, BrowserWindow, dialog } from 'electron'
import * as path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import './utils/ipc-handler'

function createWindow() {
  // Improved performance by minimizing reflows and resource-intensive operations.

  const windowOptions = {
    width: 1280,
    height: 696,
    x: 1281,
    y: 0,
    fullscreen: app.isPackaged,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      devTools: !app.isPackaged
    }
  };

  if (process.platform === 'linux') {
    windowOptions.icon = path.join(__dirname, '../../build/icon.png');
  }

  const mainWindow = new BrowserWindow(windowOptions);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  const quitApp = () => {
    const response = dialog.showMessageBoxSync(mainWindow, {
      type: 'warning',
      buttons: ['Yes', 'No'],
      message: 'Do you really want to quit?'
    });
    if (response === 0) {
      mainWindow.destroy()
    }
  };

  mainWindow.on('close', (event) => {
    event.preventDefault();
    quitApp();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  const applyCorsHeaders = (details, callback) => {
    const headers = {
      'Access-Control-Allow-Origin': ['*'],
      ...details.responseHeaders
    };
    callback({ responseHeaders: headers });
  };

  mainWindow.webContents.session.webRequest.onHeadersReceived(applyCorsHeaders);

  mainWindow.setMenu(null);

  const handleInputEvent = (event, input) => {
    const key = input.key.toLowerCase();
    const isPackagedAndCtrlR = app.isPackaged && input.control && key === 'r';
    const isCtrlShiftI = input.control && input.shift && key === 'i';
    const isAltF4 = input.alt && input.code === 'F4';
    const isF11 = input.code === 'F11';

    if (isPackagedAndCtrlR || isCtrlShiftI || isAltF4 || isF11) {
      event.preventDefault();
    } else if (input.control && input.alt && input.shift) {
      if (key === 'x') {
        quitApp();
      } else if (key === 'm') {
        mainWindow.webContents.executeJavaScript('window.showButton()');
        console.log('gamemodal shown');
      }
    }
  };

  mainWindow.webContents.on('before-input-event', handleInputEvent);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.gamecentral')

  // TO DO: Get read dev tools working
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err))

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

// // Handle connection events
// ws.on('open', () => {
//   console.log('connected to server')
//   si.get(systemInfo).then((data) => ws.send(JSON.stringify(data)))
// })

// // Handle incoming messages
// ws.on('message', (message) => {
//   console.log(`received message: ${JSON.parse(message.string())}`)
// })

// ws.on('error', console.error)
