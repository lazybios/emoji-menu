var menubar = require('menubar')

var mb = menubar({
  width: 390,
  height: 360,
  icon: 'icon.png'
})

mb.on('ready', function ready(){
  console.log('app is ready!!');
})

mb.on('after-create-window', function (){

  mb.window.openDevTools()
  mb.window.loadURL(`file://${__dirname}/index.html`)

})
