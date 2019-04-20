const fs = require('fs');
const {app, BrowserWindow} = require('electron');

let browserWindow;

function readConfig() {
    return JSON.parse(fs.readFileSync(process.env.HOME + '/.kiosk.config', 'utf8'));
}

function createWindow() {
    let config = readConfig();

    browserWindow = new BrowserWindow({kiosk: true});
    browserWindow.on('closed', () => browserWindow = null);
    browserWindow.loadURL(config.url);
}

app.on('ready', createWindow);

app.on('window-all-closed', app.quit);

app.on('activate', () => {
    if (browserWindow === null) createWindow();
});
