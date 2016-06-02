
// JQuery
var $ = require("jquery");

// Copy
var Clipboard = require(`${__dirname}/node_modules/clipboard/dist/clipboard.js`);

var clipboard = new Clipboard(".emoji-cell", {
  text: function(trigger){
    return trigger.getAttribute('alt');
  }
});

clipboard.on('success', function(e){

  // Toast copy success
  statusTips('Copied!');
  e.clearSelection();
});

clipboard.on('error', function(e){

  // Toast copy failed
  statusTips('Copy Failed');
});

function statusTips(text){
  var CopyStatus = $('#emoji-copy-status');
  CopyStatus.html(text);
  CopyStatus.stop().fadeIn(400).delay(2000).fadeOut(400);
}

// Tab
var emojiTabs = $('#emoji-tab>li');
var emojiLists = $('#emoji-view>div');
$('#emoji-tab li').on('click', function(){
  emojiTabs.removeClass('tab-selected');
  emojiLists.hide();
  $(this).addClass('tab-selected');
  for (var i = 0; i < emojiLists.length; i++) {
    if ($(this).text().toLowerCase() === emojiLists[i].id) {
      $('#'+$(this).text().toLowerCase()).show();
    }
  }
})

// Lists Number
var peopleSections = $('#people>section');
var peopleListNumber = $('#people-list-number>li');
var natureSections = $('#nature>section');
var natureListNumber = $('#nature-list-number>li');
var objectsSections = $('#objects>section');
var objectsListNumber = $('#objects-list-number>li');
var placesSections = $('#places>section');
var placesListNumber = $('#places-list-number>li');
var symbolsSections = $('#symbols>section');
var symbolsListNumber = $('#symbols-list-number>li');

function hoverChangeSection(tab, div){
  for (var i = 0; i < tab.length; i++) {
    $(tab).eq(i).attr('data-text', i);
    $(tab).eq(i).on('mouseover', function(){
      $(tab).removeClass('pagination-selected');
      $(div).hide();
      $(this).addClass('pagination-selected');
      $(div).eq($(this).attr('data-text')).show();
    })
  }
}

hoverChangeSection(peopleListNumber, peopleSections);
hoverChangeSection(natureListNumber, natureSections);
hoverChangeSection(objectsListNumber, objectsSections);
hoverChangeSection(placesListNumber, placesSections);
hoverChangeSection(symbolsListNumber, symbolsSections);