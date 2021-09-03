const {app, BrowserWindow, Menu, dialog,ipcMain} = require('electron')

ipcMain.on("msg",(event,data)=>{
  console.log(data)
  event.reply("r","dasdasd")
})


    const url = require("url");
    const path = require("path");

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          plugins: true
        }
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `/dist/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
      // Open the DevTools.
      mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      })

      const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

      Menu.setApplicationMenu(mainMenu);

    }

    app.on('ready', createWindow)

    let types = [
     {name: 'PDF', extensions: ['pdf']}
    ]

    const mainMenuTemplate = [
      {
        label:'File',
        submenu:[
          {
            label:'Open file',
            click (mainWindow) {
              dialog.showOpenDialog({ filters:types, properties:['openFile', 'multiSelections'] })
              .then(function(fileObj) {
                
                if (!fileObj.canceled) {
                  console.log(fileObj)
                  // mainWindow.webContents.send('printfile', fileObj.filePaths[0].toString())
                  
                }
                
             }).catch(function(err) {
              console.error(err)  
           })
              }
            }
          ,
          {
            label:'Open folder',
            click () {
              dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] })
              }
          },
          {
            label:'Quit',
            click(){
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
