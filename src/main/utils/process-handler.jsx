const spawn = require('child_process').spawn

class SpawnedProcess {
  constructor(path, id, event, args = [], openFunctions = [], exitFunctions = []) {
    if (path === undefined) throw new Error('Path must be specified')
    if (id === undefined) throw new Error('Game ID must be specified')
    if (event === undefined) throw new Error('Event must be specified')
    this.id = id
    this.event = event
    this.process = spawn(path, args)
    this.openFunctions = openFunctions
    this.exitFunctions = exitFunctions
    this.startDate = Date.now()
    this.initListeners()
  }

  addExitFunction(func) {
    exitFunctions.push(func)
  }

  initListeners() {
    this.openFunctions.forEach((f) => f())
    this.process.on('exit', async () => {
      // Execute exit functions
      this.exitFunctions.forEach((f) => f())
    })
  }
}

export default SpawnedProcess
