import menubar from 'menubar';
import AutoLaunch from 'auto-launch';
import { Menu, app, shell } from 'electron';
import path from 'path';

import pkg from './package.json';

require('fix-path')(); // resolve user $PATH env variable

export const mb = menubar({
  dir: __dirname + '/../',
  icon: path.join(app.getAppPath(), 'icons/Template.png'),
  preloadWindow: true,
  height: 450,
  width: 350,
  resizable: false,
  alwaysOnTop: process.env.NODE_ENV === 'development'
});

let appLauncher = new AutoLaunch({ name: pkg.buildDetails.appSlug });

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
    label: 'Made with <3 by Alex Torres',
    click: () => shell.openExternal('http://alextorres.me')
  },
  {
    label: `Quit ${pkg.buildDetails.appName}`,
    click: () => mb.app.quit()
  }
]);

const installDevTools = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Installing devtools');
    const installer = require('electron-devtools-installer');

    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    return Promise.all(
      extensions.map(name => installer.default(installer[name], forceDownload)),
    ).catch(console.log);
  }
}

mb.on('ready', async () => {
  await installDevTools();
  console.log(`${pkg.buildDetails.appName} is Ready!!`);
  mb.tray.on('right-click', () => {
    mb.tray.popUpContextMenu(contextMenu);
  });
});

mb.on('after-create-window', () => {
  if (process.env.NODE_ENV === 'development') {
    mb.window.openDevTools({ mode: 'detach' })
  }
});
