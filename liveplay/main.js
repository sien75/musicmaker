var clickOn = false;
var mousemoveStart;
var continuousTable = {
  '0000_Aspirin': false,
  '0390_Aspirin' : true
}

var canvas = document.getElementById('canvas');
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player = new WebAudioFontPlayer();
var loadedInstruments = [];
var currentInstrument = {};
var currentPlay;

var myCanvas = new MyCanvas();

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
    currentPlay = player.queueWaveTable(audioContext, audioContext.destination,
      window['_tone_' + currentInstrument.tag + '_sf2_file'], 0/*currentTime*/,
      note, currentInstrument.isContinuous?999:1.5, 0.5);
  }
}

function stopNote() {
  if (currentPlay&&currentInstrument.isContinuous) {
    currentPlay.cancel();
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

canvas.onmousedown = function (event) {
  var pos = getPos(event),
    n = myCanvas.positionToNote(pos.x, pos.y);
  if(n) {
    clickOn = true;
    mousemoveStart = 0;
  }
  if (pos.x && pos.y) {
    startNote(n);
  }
}

canvas.onmousemove = function(event) {
  if(clickOn) {
    var pos = getPos(event);
    if(myCanvas.ifPositionChanged(pos.x, pos.y, mousemoveStart++)) {
      stopNote(currentPlay);
      startNote(myCanvas.positionToNote(pos.x, pos.y));
    }
    //if(mousemoveStart >=)
  }
}

function getPos(e) {
  var bbox = canvas.getBoundingClientRect(),
    x = e.clientX - bbox.left * (canvas.width / bbox.width),
    y = e.clientY - bbox.top * (canvas.height / bbox.height);
    return {x : x, y : y};
}

document.getElementsByTagName('body')[0].onmouseup = function() {
  stopNote();
  clickOn = false;
}
