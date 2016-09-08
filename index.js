var menubar = require('menubar');
var Menu = require('electron').Menu;

var mb = menubar({
  width: 432,
  height: 420,
  icon: __dirname + '/resources/images/icons/icon.png',
  preloadWindow: true
});

// Fixed ERR_INSUFFICIENT_RESOURCES

process.setFdLimit(8192);


var template = [
  {
    label: 'emoji-menu',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      },
      {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      },
      {
        label: 'Quit App',
        accelerator: 'Command+Q',
        selector: 'terminate:'
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: function(){ mb.window.toggleDevTools(); }
      }
    ]
  }
];

// todo: need remove
mb.on('ready', function ready(){
  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

mb.on('after-create-window', function (){
  mb.window.loadURL('file://' + __dirname + '/app/index.html');
});

