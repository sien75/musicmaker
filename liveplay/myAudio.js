function MyAudio() {
  var loadedInstruments = [],
    currentInstrument = {},
    currentPlay = new Array(),
    octive = 0;
  continuousTable = {
    '0000_Aspirin': false
  };
  var AudioContextFunc = window.AudioContext || window.webkitAudioContext,
  audioContext = new AudioContextFunc(),
  player = new WebAudioFontPlayer();

  this.init = function() {
    this.importScript('0000_Aspirin:n');
  }

  this.importScript = function(accept) {
    var a = accept.split(':'),
      tag = a[0];
    continuousTable[tag] = a[1] == 'y' ? true : false;
    if(loadedInstruments.indexOf(tag) < 0) {
      document.getElementById('loading').style.display = 'inline-block';
      this.loadScript('../sound/'+ tag + '_sf2_file.js', function() {
        player.loader.decodeAfterLoading(audioContext, '_tone_' + tag + '_sf2_file');
        loadedInstruments[loadedInstruments.length] = tag;
        document.getElementById('loading').style.display = 'none';
      });
    }
    currentInstrument.tag = tag;
    currentInstrument.isContinuous = continuousTable[tag];
  }

  this.loadScript = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function(){callback();};
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  this.setOrGetOctive = function(num) {
    if(num == undefined) return octive;
    octive = num;
  }

  this.startNote = function(note) {
    if (note && !currentPlay[note]) {
      currentPlay[note] = player.queueWaveTable(audioContext, audioContext.destination,
        window['_tone_' + currentInstrument.tag + '_sf2_file'], 0/*currentTime*/,
        note + 12 * octive, currentInstrument.isContinuous?999:1.5, 0.5);
    }
  }

  this.stopNote = function(note) {
    if (currentPlay[note]&&currentInstrument.isContinuous) {
      currentPlay[note].cancel();
    }
    currentPlay[note] = 0;
  }
}
