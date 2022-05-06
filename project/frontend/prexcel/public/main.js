const { app, BrowserWindow } = require('electron')

// function createWindow () {
//     const windowOne = new BrowserWindow()
//     // load HTML file via url
//     windowOne.loadURL('https://www.electronjs.org/')
//     const windowTwo = new BrowserWindow()
//     // load HTML file locally
//     windowTwo.loadFile('index.html')
//
// }

// todo by using child-window, presentation mode could be implemented
function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Prexcel",
        show: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule:true
        },
        autoHideMenuBar: true
        // icon:'../public/prexcel_logo.png'

    })

    // todo
    win.maximize();
    win.show();

    // remote-URL: https://burakyuslu.github.io/prexcel-react-app-server

    // TODO You may change the URL of the server here, if you want to connect to localhost and host the react server locally
    win.loadURL('https://burakyuslu.github.io/prexcel-react-app-server');
    // win.loadURL('http://localhost:3000');

    // Open the DevTools.
    // comment the following line when deploying for the demo.
    // win.webContents.openDevTools();
    // win.removeMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.