var menubar = require('menubar');

var mb = menubar({
  width: 432,
  height: 420,
  icon: __dirname + '/resources/images/icons/icon.png',
  preloadWindow: true
});

// Fixed ERR_INSUFFICIENT_RESOURCES

process.setFdLimit(8192);

// todo: need remove
mb.on('ready', function ready(){
  console.log(__dirname + '/resources/images/icon.png');
});

mb.on('after-create-window', function (){
  mb.window.openDevTools();
  mb.window.loadURL('file://' + __dirname + '/app/index.html');
});
