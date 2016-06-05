
// JQuery
var $ = require("jquery");
var emojis = require("./emoji.js");

// Render Emoji
var peopleHtml="",
    natureHtml="", 
    objectsHtml="", 
    placesHtml="", 
    symbolsHtml="";

emojis.people.map(function(element){
  peopleHtml += "<img class='emoji-cell' data-clipboard-action='copy' src='graphics/emojis/"+element.name+".png' alt=':"+element.text+":' data-alternative-name='"+element.alternative_name+"'>"
});

emojis.nature.map(function(element){
  natureHtml += "<img class='emoji-cell' data-clipboard-action='copy' src='graphics/emojis/"+element.name+".png' alt=':"+element.text+":' data-alternative-name='"+element.alternative_name+"'>"
});

emojis.objects.map(function(element){
  objectsHtml += "<img class='emoji-cell' data-clipboard-action='copy' src='graphics/emojis/"+element.name+".png' alt=':"+element.text+":' data-alternative-name='"+element.alternative_name+"'>"
});

emojis.places.map(function(element){
  placesHtml += "<img class='emoji-cell' data-clipboard-action='copy' src='graphics/emojis/"+element.name+".png' alt=':"+element.text+":' data-alternative-name='"+element.alternative_name+"'>"
});

emojis.symbols.map(function(element){
  symbolsHtml += "<img class='emoji-cell' data-clipboard-action='copy' src='graphics/emojis/"+element.name+".png' alt=':"+element.text+":' data-alternative-name='"+element.alternative_name+"'>"
});

$('#people').html(peopleHtml);
$('#nature').html(natureHtml);
$('#objects').html(objectsHtml);
$('#places').html(placesHtml);
$('#symbols').html(symbolsHtml);

// Copy
var Clipboard = require(`${__dirname}/node_modules/clipboard/dist/clipboard.js`);

var clipboard = new Clipboard('.emoji-cell', {
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
  for(var i = 0; i < emojiLists.length; i++){
    if($(this).data('title').toLowerCase() === emojiLists[i].id){
      $('#'+$(this).data('title').toLowerCase()).show();
    }
  }
})

// Search
function isElementMatching(element, needle){
  var alternative = element.attr('data-alternative-name');
  var name = element.attr('alt');
  return (name.toLowerCase().indexOf(needle) >= 0) ||
    (alternative != null && alternative.toLowerCase().indexOf(needle) >= 0);
}

function highlightAll(){
  $('.emoji-cell').show();
}

function highlightElements(needle){
  if(needle.length == 0){
    highlightAll();
    $('#emoji-search-delete').hide();
    return;
  }

  needle = needle.toLowerCase();
  $('#emoji-view img').each(function(index, el){
    if(isElementMatching($(el), needle)){
      $(el).show();
    }else{
      $(el).hide();
    }
  });
}

$('#emoji-search>input').keyup(function(e){
  if(e.keyCode == 27){
    $(this).val('').blur();
    highlightAll();
    $('#emoji-search-delete').hide();
  }
});

$('#emoji-search>input').on('change paste keyup', function(){
  $('#emoji-search-delete').show();
  highlightElements($('#emoji-search>input').val());
});

$('#emoji-search>input').focus();

$('#emoji-search-delete').on('click', function(){
  $('#emoji-search>input').val('');
  $('#emoji-search-delete').hide();
  highlightAll();
});
