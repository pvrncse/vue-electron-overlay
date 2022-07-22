'use strict'
import { app, protocol, BrowserWindow, screen, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
let winTop;
async function createTopWindow() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
   winTop = new BrowserWindow({
    width: width,
    height: 80,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js'),
      devTools: false,
    },
    titleBarStyle: 'hidden',
    frame:false,
    transparent: true,
    alwaysOnTop: true,
  });
  // winTop.setAlwaysOnTop(true, 'screen');
  winTop.setSkipTaskbar(true);
  winTop.removeMenu();
  winTop.setPosition(0, 0);
  console.log(process.env.WEBPACK_DEV_SERVER_URL);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await winTop.loadURL(process.env.WEBPACK_DEV_SERVER_URL+'#/top')
      if (!process.env.IS_TEST) winTop.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    winTop.loadURL('app://./index.html/#/top')
  }
  console.log(process.env.WEBPACK_DEV_SERVER_URL+'#/top');
}

let winBottom;
async function createBottomWindow() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  winBottom = new BrowserWindow({
    width: width,
    height: 80,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js'),
      devTools: false,
    },
    titleBarStyle: 'hidden',
    frame:false,
    transparent: true,
    alwaysOnTop: true,
  });
  // winBottom.setAlwaysOnTop(true, 'screen');
  winBottom.setSkipTaskbar(true);
  winBottom.removeMenu();
  winBottom.setPosition(0, height-80);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await winBottom.loadURL(process.env.WEBPACK_DEV_SERVER_URL+'#/')
    if (!process.env.IS_TEST) winBottom.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    winBottom.loadURL('app://./index.html')
  }
}

ipcMain.on("openLauncher", (event, arg) => {
  // createChildWindow();
  const os = require('os');
  const url = "C:\\Users\\"+os.userInfo().username+"\\AppData\\Local\\Programs\\banshee\\Banshee.exe";
  var childProcess = require('child_process');
    childProcess.exec(url, function (err, stdout, stderr) {
            if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
        //process.exit(0);// exit process once it is opened
    });
});

ipcMain.on('toggleApp',(event, arg)=>{
console.log(arg);
// arg ? win.hide() : win.show();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0){
    console.log('activate');
    createBottomWindow()
    createTopWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  console.log('ready');
  createBottomWindow()
  createTopWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
