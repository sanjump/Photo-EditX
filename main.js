const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const fs = require('fs');
const read = require('fs-readdir-recursive')


let files = [];
let folderFiles = [];
let imgfiles = [];
let mainWindow
let types = [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png'] }]
directory = app.getPath('documents') + "\\";


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      plugins: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

}



const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open file',
        click() {
          dialog.showOpenDialog({ filters: types, properties: ['openFile', 'multiSelections'] })
            .then(function (fileObj) {
              if (!fileObj.canceled) {
                files = []
                for (var i = 0; i < fileObj.filePaths.length; i++) {
                  files.push(fileObj.filePaths[i].toString())
                }
                mainWindow.webContents.send("getfile", files)
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
          dialog.showOpenDialog({ filters: types, properties: ['openDirectory'] })
            .then(function (fileObj) {
              if (!fileObj.canceled) {
                folderFiles = []
                folderFiles.push(fileObj.filePaths[0].toString())
                for (var i = 0; i < types[0].extensions.length; i++) {
                  var foundFiles = read(fileObj.filePaths[0].toString()).filter(item => item.endsWith("." + types[0].extensions[i]));
                  imgfiles.push(foundFiles)
                }
                folderFiles.push(imgfiles)
                mainWindow.webContents.send('getfolder', folderFiles)
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


ipcMain.on('file', (event, arg) => {
  saveFile(arg)
})

function saveFile(arg) {

  fs.access(directory + arg[0].file.substring(0, arg[0].file.lastIndexOf(".") + 1) + "json", (err) => {
    if (err) {
      fs.writeFile(directory + arg[0].file.substring(0, arg[0].file.lastIndexOf(".") + 1) + "json", JSON.stringify(arg), function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }

    else {
      fs.writeFile(directory + arg[0].file.substring(0, arg[0].file.lastIndexOf(".") + 1) + "json", JSON.stringify(arg), function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }
  })
}

ipcMain.on('selectedNode', (event, arg) => {
  checkFile(arg, event)
})

function checkFile(arg, event) {

  fs.access(directory + arg.substring(0, arg.lastIndexOf(".") + 1) + "json", (err) => {
    if (err) {
      event.sender.send('data', 'No file')
    }

    else {
      fs.readFile(directory + arg.substring(0, arg.lastIndexOf(".") + 1) + "json", function (err, data) {
        if (err) {
          return console.log(err);
        }
        else {
          if (data.length != 0) {
            event.sender.send('data', JSON.parse(data))
          }
        }

      });

    }
  })
}



app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
