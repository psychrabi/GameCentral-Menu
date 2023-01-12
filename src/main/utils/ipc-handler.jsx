const IGDB = require('./igdb.jsx')
const store = require('./store.jsx')
const SpawnedProcess = require('./process-handler.jsx')
// const os = require("os");
const si = require('systeminformation')

let igdb = new IGDB('sz4fdut3dwthuoryprilvj8ce5fvg8', 'l56dya21c4u40vkjnvrvol1rttxfj3')
const fs = require('fs')
const systemInfo = {
  baseboard: 'manufacturer, model',
  cpu: 'manufacturer, brand',
  graphics: 'controllers, displays',
  mem: 'total',
  networkInterfaces: 'ip4, mac, speed, default',
  osInfo: 'distro, build, uefi, hostname',
  uuid: 'hardware'
}

module.exports = (ipcMain, dialog) => {
  ipcMain.handle('request-system-info', (event, data) => {
    return si.get(systemInfo)
  })

  ipcMain.handle('request-init-data', (event, data) => {
    var returnValue = {
      username: store.getUser().username,
      games: store.getGames(),
      favoriteGames: store.getFavoriteGames()
    }
    return returnValue
  })

  // ipcMain.on("request-game-data", (event, id) => {
  //   event.reply("game-data", store.getGame(id));
  // });

  // ======== add game ======== //

  // ipcMain.on("request-game-covers", async (event, query) => {
  //   let data = await igdb.getGameCovers(query);
  //   event.reply("game-covers", data);
  // });

  // ipcMain.on("request-game-info", async (event, game) => {
  //   let data = await igdb.getGameInfo(game);
  //   event.reply("add-game-info", data);
  // });

  // ipcMain.on("request-file-path", async (event) => {
  //   let res = await dialog.showOpenDialog({ properties: ["openFile"] });
  //   if (res.canceled === true)
  //     return event.reply("file-path", {
  //       code: 400,
  //       message: "File picker was canceled",
  //     });
  //   event.reply("file-path", { code: 200, filePath: res.filePaths[0] });
  // });

  // ipcMain.on("add-game", async (event, game) => {
  //   if (store.contains(game.name))
  //     event.reply("error", `${game.name} already exists`);
  //   let id = store.addGame(game);

  //   // Add game to installed list
  //   event.reply("add-installed-game", { id, game });

  //   // Sync localStorage
  // });

  // ======== remove game  ======== //

  // ipcMain.on("remove-game", async (event, id) => {
  //   if (store.isGameRunning(id)) return console.log("Game is running");
  //   store.removeGame(id);
  //   event.reply("game-removed", id);
  //   // Sync localStorage
  // });

  // ======== control game ======== //

  ipcMain.on('start-game', async (event, filepath) => {
    // let filepath = store.getFilepath(id);

    fs.access(filepath, (err) => {
      var id = 12
      if (err) {
        event.reply('game-exe-error', `${filepath} not found.`)
      } else {
        if (new SpawnedProcess(filepath, id, event)) {
          event.reply('game-started', `${filepath} started.`)
        } else {
          event.reply('game-started', `${filepath} couldnot be started.`)
        }
      }
    })
  })
}
