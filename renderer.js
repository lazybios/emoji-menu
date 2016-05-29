var Clipboard = require(`${__dirname}/node_modules/clipboard/dist/clipboard.js`)

var clipboard = new Clipboard(".emoji", {
  text: function(trigger){
    return trigger.getAttribute('alt');
  }
});

clipboard.on('success', function(e){
  // toast copy success
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);

  e.clearSelection();
});

clipboard.on('error', function(e){
  // toast copy failed
  console.error('Action:', e.action);
  console.error('Trigger:', e.trigger);
});

var tabs=document.getElementById('emoji-tab').getElementsByTagName('li');
var divs=document.getElementById('emoji-lists').getElementsByTagName('div');
for (var i = 0; i < tabs.length; i++) {
  tabs[i].id=i;
  tabs[i].onclick=function(){
    for (var j = 0; j < tabs.length; j++) {
      tabs[j].className='';
      divs[j].style.display='none';
    }
    this.className='select';
    divs[this.id].style.display='block';
  }
}
