var clickOn = false;
var mousemoveStart;
var continuousTable = {
  '0000_Aspirin': false,
  '0390_Aspirin' : true
}

document.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });
document.addEventListener('contextmenu', function(e){
    e.preventDefault();
});

var canvas = document.getElementById('canvas');
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player = new WebAudioFontPlayer();
var loadedInstruments = [];
var currentInstrument = {};
var currentPlay = new Array;
var noteRecord, rectRecord;

var myCanvas = new MyCanvas();

var browser = new Browser();

window.onload = function() {
  myCanvas.init();
  /*loading*/;
  importScript('../sound/0000_Aspirin_sf2_file.js', function() {
    player.loader.decodeAfterLoading(audioContext, '_tone_0000_Aspirin_sf2_file');
    loadedInstruments[loadedInstruments.length] = '0000_Aspirin';
    currentInstrument.tag = '0000_Aspirin';
    currentInstrument.isContinuous = false;
    /*loaded*/;
  });
  var i, ele;
  for (i = 0; i < 10 ; i++) {
    ele = document.createElement('br');
    document.getElementsByTagName('body')[0].appendChild(ele);
  }
}

function importScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.onload = function(){callback();};
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function startNote(note) {
  if (clickOn && note) {
    currentPlay[note] = player.queueWaveTable(audioContext, audioContext.destination,
      window['_tone_' + currentInstrument.tag + '_sf2_file'], 0/*currentTime*/,
      note, currentInstrument.isContinuous?999:1.5, 0.5);
  }
}

function stopNote(note) {
  if (currentPlay[note]&&currentInstrument.isContinuous) {
    currentPlay[note].cancel();
  }
}

function change(tag) {
  if(loadedInstruments.indexOf(tag) < 0) {
    /*loading*/;
    importScript('../sound/'+ tag + '_sf2_file.js', function() {
      player.loader.decodeAfterLoading(audioContext, '_tone_' + tag + '_sf2_file');
      loadedInstruments[loadedInstruments.length] = tag;
      /*loaded*/;
    });
  }
  currentInstrument.tag = tag;
  currentInstrument.isContinuous = continuousTable[tag];
}

var mouseDown = function (event) {
  var pos;
  if(event.clientX) pos = getPos(event);
  else if(event.touches[0]) pos = getPos(event.touches[0]);
  noteRecord = myCanvas.positionToNote(pos.x, pos.y),
  rectRecord = myCanvas.positionToRect(pos.x, pos.y);
  if(noteRecord && rectRecord) {
    clickOn = true;
    mousemoveStart = 0;
    startNote(noteRecord);
    myCanvas.paintKey(rectRecord, 'click');
  }
}
if(browser.versions.mobile)canvas.ontouchstart = mouseDown;
else canvas.onmousedown = mouseDown;

var mouseMove = function(event) {
  if(clickOn) {
    var pos;
    if(event.clientX) pos = getPos(event);
    else if(event.touches[0]) pos = getPos(event.touches[0]);
    if(myCanvas.ifPositionChanged(pos.x, pos.y, mousemoveStart++)) {
      stopNote(noteRecord);
      myCanvas.paintKey(rectRecord, 'release');
      noteRecord = myCanvas.positionToNote(pos.x, pos.y),
      rectRecord = myCanvas.positionToRect(pos.x, pos.y);
      startNote(noteRecord);
      myCanvas.paintKey(rectRecord, 'click');
    }
  }
}
if(browser.versions.mobile)canvas.ontouchmove = mouseMove;
else canvas.onmousemove = mouseMove;

var mouseUp = function() {
  stopNote(noteRecord);
  console.log('there');
  myCanvas.paintKey(rectRecord, 'release');
  clickOn = false;
}
if(browser.versions.mobile) document.getElementsByTagName('body')[0].ontouchend = mouseUp;
else document.getElementsByTagName('body')[0].onmouseup = mouseUp;

function getPos(e) {
  var bbox = canvas.getBoundingClientRect(),
    x = e.clientX - bbox.left * (canvas.width / bbox.width),
    y = e.clientY - bbox.top * (canvas.height / bbox.height);
    return {x : x, y : y};
}
