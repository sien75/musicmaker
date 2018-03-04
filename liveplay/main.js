var clickOn = false;
var continuousTable = {
  '0000_Aspirin': false,
  '0390_Aspirin' : true
}

var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player = new WebAudioFontPlayer();
var loadedInstruments = [];
var currentInstrument = {};
var currentPlay;

window.onload = function() {
  /*loading*/;
  importScript('../sound/0000_Aspirin_sf2_file.js', function() {
    player.loader.decodeAfterLoading(audioContext, '_tone_0000_Aspirin_sf2_file');
    loadedInstruments[loadedInstruments.length] = '0000_Aspirin';
    currentInstrument.tag = '0000_Aspirin';
    currentInstrument.isContinuous = false;
    /*loaded*/;
  });
  var i, ele;
  for (i = 0; i < 35 ; i++) {
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
  if (clickOn) {
    currentPlay = player.queueWaveTable(audioContext, audioContext.destination,
      window['_tone_' + currentInstrument.tag + '_sf2_file'], 0/*currentTime*/,
      46+note*2, currentInstrument.isContinuous?999:1.5, 0.5);
  }
}

function stopNote(note) {
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
