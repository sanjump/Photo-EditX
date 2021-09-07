const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const fs = require('fs');
const glob = require('glob');

let files = [];
directory = 'C:\\Users\\mpsan\\OneDrive\\Desktop\\Career\\H&R block'
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})


let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      plugins: true,
      enableRemoteModule: true,
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);

  var getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
  };
  getDirectories(directory, function (err, res) {
    if (err) {
      console.log('Error', err);
    }
    else {
      console.log(res);
    }
  });


}

app.on('ready', createWindow)

let types = [
  { name: 'PDF', extensions: ['pdf'] }
]

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open file',
        click(mainWindow) {
          dialog.showOpenDialog({ filters: types, properties: ['openFile', 'multiSelections'] })
            .then(function (fileObj) {

              if (!fileObj.canceled) {
                console.log(fileObj)
                // mainWindow.webContents.send('printfile', fileObj.filePaths[0].toString())

              }

            }).catch(function (err) {
              console.error(err)
            })
        }
      }
      ,
      {
        label: 'Open folder',
        click() {
          dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] })
            .then(function (fileObj) {

              if (!fileObj.canceled) {
                console.log(fileObj)
                // mainWindow.webContents.send('printfile', fileObj.filePaths[0].toString())

              }

            }).catch(function (err) {
              console.error(err)
            })
        }
      },
      {
        label: 'Quit',
        click() {
          app.quit();
        }
      }
    ]
  }
];


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
