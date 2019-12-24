const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    electron.protocol.interceptFileProtocol(
      'file',
      (request, callback) => {
        const filePath = request.url.replace('file://', '');
        const url = request.url.includes('./static/media/')
          ? path.normalize(`${__dirname}/${filePath}`)
          : filePath;

        console.log({ filePath, url, __dirname });

        callback({ path: url });
      },
      err => {
        if (err) console.error('Failed to register protocol');
      }
    );
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('web-contents-created', (e, contents) => {
  // Prevent creating more than one window
  contents.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });

  // Prevent loading something else than the UI
  contents.on('will-navigate', (e, url) => {
    if (url !== contents.getURL()) e.preventDefault();
  });
});