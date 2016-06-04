
// JQuery
var $ = require("jquery");

// Pagination
function pagination(group, i){
  var imgs = $(group+' img');
  imgs.each(function(index, el){
    if(index >= i * 70 && index < ((+i + 1) * 70)){
      $(el).show();
    }else{
      $(el).hide();
    }
  });
}

function highlightAll(){
  pagination('#people', 0);
  pagination('#nature', 0);
  pagination('#objects', 0);
  pagination('#places', 0);
  pagination('#symbols', 0);
  $('.emoji-group>ul').show();
}

highlightAll();

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
    if($(this).text().toLowerCase() === emojiLists[i].id){
      $('#'+$(this).text().toLowerCase()).show();
    }
  }
})

// Lists Number
var peopleListNumber = $('#people-list-number>li');
var natureListNumber = $('#nature-list-number>li');
var objectsListNumber = $('#objects-list-number>li');
var placesListNumber = $('#places-list-number>li');
var symbolsListNumber = $('#symbols-list-number>li');

function hoverChangeSection(tab){
  for(var i = 0; i < tab.length; i++){
    $(tab).eq(i).attr('data-text', i);
    $(tab).eq(i).on('mouseover', function(){
      $(tab).removeClass('pagination-selected');
      $(this).addClass('pagination-selected');
      var selectedGroup = '#'+$('.tab-selected').text().toLowerCase();
      var n = $(this).attr('data-text');
      pagination(selectedGroup, n);
    })
  }
}

function initPages(tab){
  $(tab).removeClass('pagination-selected');
  $(tab).eq(0).addClass('pagination-selected');
}

hoverChangeSection(peopleListNumber);
hoverChangeSection(natureListNumber);
hoverChangeSection(objectsListNumber);
hoverChangeSection(placesListNumber);
hoverChangeSection(symbolsListNumber);

// Search
function isElementMatching(element, needle){
  var alternative = element.attr('data-alternative-name');
  var name = element.attr('alt');
  return (name.toLowerCase().indexOf(needle) >= 0) ||
    (alternative != null && alternative.toLowerCase().indexOf(needle) >= 0);
}

function highlightElements(needle){
  if(needle.length == 0){
    highlightAll();
    $('#emoji-search-delete').hide();
    return;
  }

  $('.emoji-group>ul').hide();
  initPages(peopleListNumber);
  initPages(natureListNumber);
  initPages(objectsListNumber);
  initPages(placesListNumber);
  initPages(symbolsListNumber);

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
})
