const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')

const url = require("url");
const path = require("path");
const fs = require('fs');
const glob = require('glob');

let files = [];
directory = 'C:\\Users\\mpsan\\OneDrive\\Desktop\\Career\\H&R block'


ipcMain.on('file', (event, arg) => {
  
  saveFile(arg)

})

function saveFile(arg){

  fs.access('D:\\jsons\\'+arg[0].file, (err) => {
    if (err) {

       
        fs.writeFile('D:\\jsons\\'+arg[0].file, JSON.stringify(arg), function(err) {
          if(err) {
              return console.log(err);
          }
          
      }); 
      } 
      
      
      else {
      
        fs.writeFile('D:\\jsons\\'+arg[0].file, JSON.stringify(arg), function(err) {
          if(err) {
              return console.log(err);
          }
         
      }); 
      }
  })
}

ipcMain.on('selectedNode', (event, arg) => {
  
  checkFile(arg,event)

})

function checkFile(arg,event){

  fs.access('D:\\jsons\\'+arg.slice(0, -3) + 'json', (err) => {
    if (err) {

      
      event.sender.send('data','No')
      
        
      } 
      
      
      else {
      
        fs.readFile('D:\\jsons\\'+arg.slice(0, -3) + 'json', function(err,data) {
          if(err) {
              return console.log(err);
          }
          else{
            if(data.length!=0){
            event.sender.send('data',JSON.parse(data))
            console.log(JSON.parse(data))
            }
          }
         
      }); 
       
      }
  })
}

let mainWindow

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
