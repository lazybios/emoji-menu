
var $ = require('jquery');
var path = require('path');
var Emojis = require('./emoji.js');
var clipboard = require('electron').clipboard;

var $emojiTabs = $('#emoji-tab>li');
var $emojiLists = $('#emoji-view>div');
var $emojiSearchDelete = $('#emoji-search-delete');
var $emojiSearchInput = $('#emoji-search>input');


// Nedb
var Datastore = require('nedb');
var db = new Datastore({
                        filename: path.resolve(__dirname, '../' +
                                  'resources/recently.db'),
                        autoload: true
                      });

var TEXT_RE = /:(.*):/;
var NAME_RE = /.*\/(.*)\.png$/;


// Render Emoji
var peopleHtml = '',
    natureHtml = '',
    objectsHtml = '',
    placesHtml = '',
    symbolsHtml = '';

function renderGroup(group) {
  var groupHtml = '';
  group.forEach(function (element) {
    groupHtml += '<img class="emoji-cell" data-clipboard-action="copy" ' +
                 'src="../resources/images/graphics/emojis/' + element.name +
                 '.png" alt=":' + element.text +
                 ':" data-alternative-name="' + element.alternative_name + '">';  // jshint ignore:line
  });
  return groupHtml;
}

peopleHtml = renderGroup(Emojis.people);
natureHtml = renderGroup(Emojis.nature);
objectsHtml = renderGroup(Emojis.objects);
placesHtml = renderGroup(Emojis.places);
symbolsHtml = renderGroup(Emojis.symbols);

function initCommonTab() {
  db.find({}).sort({count: -1}).limit(30).exec(function(err, docs){
    var commonHtml = '';
    commonHtml = renderGroup(docs);
    $('#common').html(commonHtml);
  });
}

$('#people').html(peopleHtml);
$('#nature').html(natureHtml);
$('#objects').html(objectsHtml);
$('#places').html(placesHtml);
$('#symbols').html(symbolsHtml);
initCommonTab();

$('#common-tab').on('click', function () {
  var inputText = $emojiSearchInput.val();
  if (!inputText) {
    initCommonTab();
  }
});


// Copy
function statusTips(text) {
  var CopyStatus = $('#emoji-copy-status');
  CopyStatus.html(text);
  CopyStatus.stop().fadeIn(400).delay(2000).fadeOut(400);
}

function emojiMetas(el) {
  var name = $(el).attr('src').match(NAME_RE)[1];
  var alternative = $(el).data('alternative-name');
  var text = $(el).attr('alt').match(TEXT_RE)[1];

  var obj = { 
    name: name,
    alternative_name: alternative, 
    text: text,
    count: 0 
  };
  return obj;
}

$(document).on('click', '.emoji-cell', function () {
   var that = this;
   var emojiText = $(that).attr('alt');
   var text = emojiText.match(TEXT_RE)[1];
   clipboard.writeText(emojiText);
   statusTips('Copied ' + emojiText);
   db.find({ text:  text}, function (err, docs) {
     if (docs.length === 0) {
       db.insert(emojiMetas(that), function (err) {
         if (err !== null) {
           console.log(err);
         }
       });
     } else {
       db.update({ text: text }, {$inc: {count: 1}}, function (err) {
         if (err !== null) {
           console.log('error');
         }
       });
     }
   });
});


// Tab
$('#emoji-tab li').on('click', function () {
  $emojiTabs.removeClass('tab-selected');
  $emojiLists.hide();
  $(this).addClass('tab-selected');
  for (var i = 0; i < $emojiLists.length; i++) {
    if ($(this).data('title').toLowerCase() === $emojiLists[i].id) {
      $('#' + $(this).data('title').toLowerCase()).show();
    }
  }
});


// Search
function isElementMatching(element, needle) {
  var alternative = element.attr('data-alternative-name');
  var name = element.attr('alt');
  return (name.toLowerCase().indexOf(needle) >= 0) ||
    (alternative !== null && alternative.toLowerCase().indexOf(needle) >= 0);
}

function highlightAll() {
  $('.emoji-cell').show();
}

function highlightElements(needle) {
  if (needle.length === 0) {
    highlightAll();
    $emojiSearchDelete.hide();
    return;
  }

  needle = needle.toLowerCase();
  $('#emoji-view img').each(function (index, el) {
    if (isElementMatching($(el), needle)) {
      $(el).show();
    } else {
      $(el).hide();
    }
  });
}

$emojiSearchInput.keyup(function (e) {
  if (e.keyCode === 27) {
    $(this).val('').blur();
    highlightAll();
    $emojiSearchDelete.hide();
  }
});

$emojiSearchInput.on('change paste keyup', function () {
  $emojiSearchDelete.show();
  highlightElements($emojiSearchInput.val());
});

$emojiSearchInput.focus();

$emojiSearchDelete.on('click', function () {
  $emojiSearchInput.val('');
  $emojiSearchDelete.hide();
  highlightAll();
});
