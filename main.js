import menubar from 'menubar';
import AutoLaunch from 'auto-launch';
import { Menu } from 'electron';
import dotenv from 'dotenv';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

require('electron-reload')(__dirname);

dotenv.config();

export const mb = menubar({
  dir: __dirname + '/../',
  preloadWindow: true,
  height: 200,
  width: 350,
  alwaysOnTop: process.env.ENVIRONMENT === 'develop'
});

let appLauncher = new AutoLaunch({ name: process.env.APP_SLUG });

const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Launch on Login',
    type: 'checkbox',
    checked: false,
    click: item => {
      appLauncher.isEnabled().then(enabled => {
        if (enabled) {
          return appLauncher.disable().then(() => {
            item.checked = false;
          });
        } else {
          return appLauncher.enable().then(() => {
            item.checked = true;
          });
        }
      });
    }
  },
  {
    label: `Quit ${process.env.APP_NAME}`,
    click: () => mb.app.quit(),
  }
]);

mb.on('ready', async () => {
  await installExtension(REACT_DEVELOPER_TOOLS);
  console.log('Added react extensions');
  console.log(`${process.env.APP_NAME} is Ready!!`);
  mb.tray.on('right-click', () => {
    mb.tray.popUpContextMenu(contextMenu);
  });
});

mb.on('after-create-window', () => mb.window.openDevTools({ mode: 'detach' }))
