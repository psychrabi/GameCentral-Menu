import { shell, dialog, ipcMain } from 'electron'

const si = require('systeminformation')
const fs = require('fs')
const spawn = require('child_process').spawn
const systemInfo = {
  cpu: 'manufacturer, brand',
  graphics: 'controllers',
  mem: 'total',
  networkInterfaces: 'ip4, default',
  osInfo: 'distro, build'
}

//Getting client system info
ipcMain.handle('request-system-info', async () => {
  const info = await si.get(systemInfo)
  return info
})

ipcMain.handle('launch:executable', async (event, gamePath, parameters) => {
  const child = spawn(gamePath, parameters.split(' '));

  child.on('spawn', () => {
    console.log(`Game started with PID: ${child.pid}`);
    event.sender.send('game-process-started', { pid: child.pid, status: 'game-running' });
  });

  child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    event.sender.send('game-process-exited', { pid: child.pid, status: 'game-exited', exitCode: code });
  });

  return child.pid;
});




ipcMain.handle('check:executable', async (event, gamePath) => {
  // console.log(gamePath)
  return new Promise((resolve) => {
    fs.access(gamePath, fs.constants.F_OK, (err) => {
      if (!err) {
        resolve({ status: 'file-exists' })
      } else {
        resolve({ status: 'file-does-not-exist' })
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
