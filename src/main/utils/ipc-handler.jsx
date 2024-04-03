import { shell, dialog, ipcMain } from 'electron'
const regedit = require('regedit')
const glob = require('glob')
const si = require('systeminformation')
const path = require('path')
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
  const child = spawn(gamePath, parameters.split(' '))

  child.on('spawn', () => {
    console.log(`Game started with PID: ${child.pid}`)
    event.sender.send('game-process-started', { pid: child.pid, status: 'game-running' })
  })

  child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`)
    event.sender.send('game-process-exited', {
      pid: child.pid,
      status: 'game-exited',
      exitCode: code
    })
  })

  return child.pid
})

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

// ipcMain.handle('dialog:openDirectory', async () => {
//   const result = await dialog.showOpenDialog({
//     properties: ['openFile'],
//     filters: [
//       { name: 'Executable Files', extensions: ['exe'] },
//       { name: 'Shortcut Files', extensions: ['lnk'] }
//     ]
//   })

//   if (!result.canceled && result.filePaths.length > 0) {
//     const selectedFilePath = result.filePaths[0]
//     const fileExtension = selectedFilePath.split('.').pop()

//     if (fileExtension === 'lnk') {
//       // console.log('Selected file is a shortcut:', selectedFilePath);
//       const lnkTarget = shell.readShortcutLink(selectedFilePath).target
//       const lnkArgs = shell.readShortcutLink(selectedFilePath).args
//       // console.log('Shortcut target:', lnkTarget);
//       // console.log('Shortcut arguments:', lnkArgs);
//       return { executable: lnkTarget, parameters: lnkArgs }
//     } else if (fileExtension === 'exe') {
//       console.log('Selected file is an executable:', selectedFilePath)
//       return { executable: selectedFilePath, parameters: '' }
//     } else {
//       console.log('Selected file is neither an executable nor a shortcut.')
//       return null
//     }
//   } else {
//     console.log('No file selected.')
//     return null
//   }
// })

// ipcMain.handle('getEpicGamesInstallPath', async (event) => {
//   const epicGamesRegistryPath = 'HKLM\\SOFTWARE\\WOW6432Node\\Epic Games\\EpicGamesLauncher'
//   try {
//     return await new Promise((resolve, reject) => {
//       regedit.list(epicGamesRegistryPath, async (err, result) => {
//         if (err) {
//           console.error('Error fetching Epic Games install path:', err)
//           return reject(new Error('Error fetching Epic Games install path'))
//         }

//         const installLocation = result[epicGamesRegistryPath].values.AppDataPath.value
//         const installedGamesPath = path.join(installLocation, 'Manifests')

//         try {
//           const installedGames = await fs.promises.readdir(installedGamesPath)
//           const itemFiles = installedGames.filter((file) => path.extname(file) === '.item')
//           const gameDetails = await Promise.all(
//             itemFiles.map(async (fileName) => {
//               const filePath = path.join(installedGamesPath, fileName)
//               const fileContent = await fs.promises.readFile(filePath, 'utf8')
//               return JSON.parse(fileContent)
//             })
//           )

//           const gameData = gameDetails.map((game) => ({
//             name: game.DisplayName,
//             installLocation: game.InstallLocation,
//             executable: game.LaunchExecutable,
//             app_name: game.AppName
//           }))
//           resolve(gameData)
//         } catch (readDirError) {
//           console.error('Error reading installed games directory:', readDirError)
//           reject(new Error('Error reading installed games directory'))
//         }
//       })
//     })
//   } catch (error) {
//     console.error('Error fetching Epic Games install path and installed games:', error)
//     throw error // Rethrow the error to be handled by ipcMain's caller
//   }
// })

// ipcMain.handle('getUbisoftInstallPath', async (event) => {
//   const epicGamesRegistryPath = 'HKLM\\SOFTWARE\\WOW6432Node\\Ubisoft\\Launcher'

//   const ubisoftInstallsRegistryPath = 'HKLM\\SOFTWARE\\WOW6432Node\\Ubisoft\\Launcher\\Installs'

//   try {
//     const launcherData = await regedit.promisified.list(epicGamesRegistryPath)
//     if (
//       !launcherData ||
//       !launcherData[epicGamesRegistryPath].values ||
//       !launcherData[epicGamesRegistryPath].values.InstallDir
//     ) {
//       throw new Error('Ubisoft Launcher installation path not found in registry')
//     }
//     const launcherPath = launcherData[epicGamesRegistryPath].values.InstallDir.value

//     const installsData = await regedit.promisified.list(ubisoftInstallsRegistryPath)
//     if (!installsData || !installsData[ubisoftInstallsRegistryPath].keys) {
//       throw new Error('Ubisoft installed games registry keys not found')
//     }
//     const gameIds = installsData[ubisoftInstallsRegistryPath].keys

//     const installedGames = await Promise.all(
//       gameIds.map(async (gameId) => {
//         const gameReg = `${ubisoftInstallsRegistryPath}\\${gameId}`
//         const gameData = await regedit.promisified.list(gameReg)
//         if (!gameData || !gameData[gameReg].values || !gameData[gameReg].values.InstallDir) {
//           console.warn(`Installation path not found for game ID ${gameId}`)
//           return null
//         }

//         const gamePath = gameData[gameReg].values.InstallDir.value

//         return { gameId, gamePath }
//       })
//     )
//     console.log(installedGames)
//     return installedGames.filter(Boolean) // Remove null values from the array
//   } catch (error) {
//     console.error('Error fetching Ubisoft install paths:', error)
//     throw error
//   }
// })

// ipcMain.handle('getSteamInstallPath', async (event) => {
//   const steamRegistrySystemPath = 'HKLM\\SOFTWARE\\WOW6432Node\\Valve\\Steam'

//   try {
//     const steamData = await regedit.promisified.list(steamRegistrySystemPath)
//     if (
//       !steamData ||
//       !steamData[steamRegistrySystemPath].values ||
//       !steamData[steamRegistrySystemPath].values.InstallPath
//     ) {
//       throw new Error('Steam installation path not found in registry')
//     }
//     const steamInstallPath = steamData[steamRegistrySystemPath].values.InstallPath.value

//     const steamAppsPath = path.join(steamInstallPath, 'steamapps')
//     const acfFiles = await getFilesInDirectory(steamAppsPath, '.acf')

//     const installedGames = []

//     for (const acfFile of acfFiles) {
//       const acfContent = await fs.promises.readFile(acfFile, 'utf8')
//       const acfLines = acfContent.split('\n')
//       const acfData = {}

//       acfLines.forEach((line) => {
//         const trimmedLine = line.trim()
//         const match = trimmedLine.match(/^"([^"]+)"\s+"([^"]+)"$/)
//         if (match) {
//           const key = match[1]
//           const value = match[2]
//           acfData[key] = value.replace(/\\\\/g, '/')
//         }
//       })
//       console.log(acfData)

//       return acfData
//     }

//     return { steamInstallPath, installedGames }
//   } catch (error) {
//     console.error('Error fetching Steam install paths:', error)
//     throw error
//   }
// })

// ... (getFilesInDirectory function remains the same)

const getFilesInDirectory = async (dirPath) => {
  const dirFiles = await fs.promises.readdir(dirPath, { withFileTypes: true })
  const files = await Promise.all(
    dirFiles.map(async (file) => {
      const filePath = path.join(dirPath, file.name)
      if (file.isDirectory()) {
        return getFilesInDirectory(filePath)
      } else {
        const stats = await fs.promises.stat(filePath)
        if (stats.isFile()) {
          return filePath
        }
      }
    })
  )
  return files.flat()
}
