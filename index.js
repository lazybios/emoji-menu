var menubar = require('menubar')

var mb = menubar({
  width: 450,
  height: 420,
  icon: 'icon.png'
})

// fixed ERR_INSUFFICIENT_RESOURCES

process.setFdLimit(8192);

mb.on('ready', function ready(){
  console.log('app is ready!!');
})

mb.on('after-create-window', function (){

  mb.window.openDevTools()
  mb.window.loadURL(`file://${__dirname}/index.html`)

})
