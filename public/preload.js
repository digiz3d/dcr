const { contextBridge, ipcRenderer } = require('electron')

let screenSize = {}
ipcRenderer.send('get-screen-size-request')
ipcRenderer.once('get-screen-size-reply', (evt, arg) => {
  screenSize = arg
})

contextBridge.exposeInMainWorld('ipc', {
  getScreenSize: () => screenSize,
})
