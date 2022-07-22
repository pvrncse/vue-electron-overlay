const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openLauncher: () => {ipcRenderer.send('openLauncher')},
    toggleApp: (t) => { ipcRenderer.send('toggleApp',t)}
})