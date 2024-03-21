import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getSystemInfo: () => ipcRenderer.invoke('request-system-info'),
  checkExecutable: async (gamePath) => ipcRenderer.invoke('check:executable', gamePath),
  launchExecutable: (gamePath, parameters) => ipcRenderer.invoke('launch:executable', gamePath, parameters),
  selectExecutable: () => ipcRenderer.invoke('dialog:openDirectory'),

}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
