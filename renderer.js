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
