//Copy

var Clipboard = require(`${__dirname}/node_modules/clipboard/dist/clipboard.js`)

var clipboard = new Clipboard(".emoji", {
  text: function(trigger){
    return trigger.getAttribute('alt');
  }
});

clipboard.on('success', function(e){
  // toast copy success
  console.info('Action:', e.action);
  tipsMessage('Copy Success');
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);
  e.clearSelection();
});

clipboard.on('error', function(e){
  // toast copy failed
  tipsMessage('Copy Failed');

  console.error('Action:', e.action);
  console.error('Trigger:', e.trigger);
});

function tipsMessage(text){
  var tips = document.getElementById('emoji-tips');
  tips.innerHTML = text;
  tips.style.display = 'block';
  var tipsDisappear = setTimeout(function(){
    tips.style.display = 'none';
  },2000);
}


//Tab

var emojiTabs = document.getElementById('emoji-tab').getElementsByTagName('li');
var emojiLists = document.getElementById('emoji-lists').getElementsByTagName('div');
for (var i = 0; i < emojiTabs.length; i++) {
  emojiTabs[i].id = i;
  emojiTabs[i].onclick = function(){
    for (var j = 0; j < emojiTabs.length; j++) {
      emojiTabs[j].className = '';
      emojiLists[j].style.display = 'none';
    }
    this.className='select-tab';
    emojiLists[this.id].style.display = 'block';
  }
}

//Lists Number

var peoplesSections = document.getElementById('peoples').getElementsByTagName('section');
var peoplesListNumber = document.getElementById('peoples-list-number').getElementsByTagName('li');
var naturesSections = document.getElementById('natures').getElementsByTagName('section');
var naturesListNumber = document.getElementById('natures-list-number').getElementsByTagName('li');
var objectsSections = document.getElementById('objects').getElementsByTagName('section');
var objectsListNumber = document.getElementById('objects-list-number').getElementsByTagName('li');
var placesSections = document.getElementById('places').getElementsByTagName('section');
var placesListNumber = document.getElementById('places-list-number').getElementsByTagName('li');
var symbolsSections = document.getElementById('symbols').getElementsByTagName('section');
var symbolsListNumber = document.getElementById('symbols-list-number').getElementsByTagName('li');

function changeSection(tab,div){
  for (var i = 0; i < tab.length; i++) {
    tab[i].id = i;
    tab[i].onmouseover = function(){
      for (var j = 0; j < tab.length; j++) {
        tab[j].className = '';
        div[j].style.display = 'none';
      }
      this.className='select';
      div[this.id].style.display = 'block';
    }
  }
}

changeSection(peoplesListNumber,peoplesSections);
changeSection(naturesListNumber,naturesSections);
changeSection(objectsListNumber,objectsSections);
changeSection(placesListNumber,placesSections);
changeSection(symbolsListNumber,symbolsSections);


