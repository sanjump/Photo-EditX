const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const fs = require('fs');
const read = require('fs-readdir-recursive')
const { ConnectionBuilder } = require('electron-cgi');

let files = [];
let folderFiles = [];
let imgfiles = [];
let settings = 
  {
    'theme':'dark'
  }
let recent=[]
let mainWindow
let overlayData
let types = [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png'] }]
directory = app.getPath('documents') + "\\editor";
settingsDirectory = app.getPath('userData') + "\\settings";


if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

if (!fs.existsSync(settingsDirectory)) {
  fs.mkdirSync(settingsDirectory, { recursive: true });
}

let connection = new ConnectionBuilder()
  .connectTo('dotnet', 'run', '--project', './EditorService/EditorWebApi').build();


connection.onDisconnect = () => {
  console.log('Lost connection to the .Net process');
};

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

  mainWindow.on('closed', function () {
 
    mainWindow = null
  })

  mainWindow.maximize();

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  //Menu.setApplicationMenu(mainMenu);

  mainWindow.setMenu(mainMenu)
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.webContents.on('did-finish-load', ()=>{

    fs.access(settingsDirectory + "\\"  + "preferences.json", (err) => {
      if (err) {
        mainWindow.webContents.send('preferences', settings);
      }
  
      else {
        fs.readFile(settingsDirectory + "\\"  + "preferences.json", function (err, data) {
          if (err) {
            return console.log(err);
          }
          else {
              mainWindow.webContents.send('preferences', JSON.parse(data));
          }
        });
      }
    })

    fs.access(settingsDirectory + "\\"  + "recent.json", (err) => {
      if (err) {
        mainWindow.webContents.send('recent', recent);
      }
  
      else {
        fs.readFile(settingsDirectory + "\\"  + "recent.json", function (err, data) {
          if (err) {
            return console.log(err);
          }
          else {
              mainWindow.webContents.send('recent', JSON.parse(data));
          }
        });
      }
    })

 
  })

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
                imgfiles=[]
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
        label: 'Export',
        click() {
          createExportWindow();
        }

      },
      ,
      {
        label: 'Quit',
        click() {
          app.quit();
        }
      }
    ]
   
  },
  {
  label: 'Settings',
  submenu: [
    {
      label: 'Preferences',
      click() {
        createPreferencesWindow();
      }
    }
  ]
  }
];

function createFullScreenWindow() {

  fullScreen = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    frame: true,
    transparent: false,


    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  fullScreen.setMenu(null)

  fullScreen.loadURL( url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true,
    hash: 'editor'
  }));

  fullScreen.maximize();

}


function createExportWindow() {

  ExportScreen = new BrowserWindow({
    width: 1000,
    height: 400,
    center: true,
    frame: true,
    transparent: false,
    resizable:false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  ExportScreen.setMenu(null)
  
  ExportScreen.loadURL( url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true,
    hash: 'export'
  }));

}

function createPreferencesWindow(){
  PreferencesScreen = new BrowserWindow({
    width: 700,
    height: 300,
    center: true,
    frame: true,
    transparent: false,
    resizable:false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  PreferencesScreen.setMenu(null)
  
  PreferencesScreen.loadURL( url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true,
    hash: 'preferences'
  }));
}


ipcMain.on('export', (event, arg) => {
 
  createExportWindow()
 
})


ipcMain.on('fullScreen', (event, arg) => {
 
 
  createFullScreenWindow()
  checkFile(arg,event)
  fullScreen.webContents.on('did-finish-load', ()=>{
    fullScreen.webContents.send('loadScreen', overlayData);
  })

})


ipcMain.on('file', (event, arg) => {
  saveFile(arg)
})



ipcMain.on('selectedRecent', (event, arg) => {

  
  mainWindow.webContents.send('selectedRecent', arg)
  
})

ipcMain.on('preferences', (event, arg) => {

 
  fs.access(settingsDirectory + "\\"  + "preferences.json", (err) => {
    if (err) {
      fs.writeFile(settingsDirectory + "\\"  + "preferences.json", JSON.stringify(arg), function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }

    else {
      fs.writeFile(settingsDirectory + "\\"  + "preferences.json", JSON.stringify(arg), function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }
  })
  mainWindow.webContents.send("preferences",arg)
})


ipcMain.on('recent', (event, arg) => {

 
  fs.access(settingsDirectory + "\\"  + "recent.json", (err) => {
    if (err) {
      fs.writeFile(settingsDirectory + "\\"  + "recent.json", JSON.stringify(arg), function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }

    else {
      fs.writeFile(settingsDirectory + "\\"  + "recent.json", JSON.stringify(arg), function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }
  })
  mainWindow.webContents.send("recent",arg)
})






function saveFile(arg) {

  fs.access(directory + "\\" + arg[0].file.substring(0, arg[0].file.lastIndexOf(".") + 1) + "json", (err) => {
    if (err) {
      fs.writeFile(directory + "\\" + arg[0].file.substring(0, arg[0].file.lastIndexOf(".") + 1) + "json", JSON.stringify(arg), function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }

    else {
      fs.writeFile(directory + "\\" + arg[0].file.substring(0, arg[0].file.lastIndexOf(".") + 1) + "json", JSON.stringify(arg), function (err) {
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

  fs.access(directory + "\\" + arg.substring(0, arg.lastIndexOf(".") + 1) + "json", (err) => {
    if (err) {
      overlayData = 'No file'
      event.sender.send('data', 'No file')
    }

    else {
      fs.readFile(directory + "\\" + arg.substring(0, arg.lastIndexOf(".") + 1) + "json", function (err, data) {
        if (err) {
          return console.log(err);
        }
        else {
          if (data.length != 0) {
            overlayData = JSON.parse(data)
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



