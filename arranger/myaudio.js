/*var bpm = 120;
var N = 4 * 60 / bpm;
var pieceLen = 4 * N;
var beatLen=1/16 * N;

for(var i=0;i<_tone_......_sf2_file.zones.length;i++){
  _tone_......_sf2_file.zones[i].ahdsr=false;
}
*/
var trans = {
  'bass' : '0390_Aspirin',
  'piano' : '0000_Aspirin'
}

function importScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.onload = function(){callback();};
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

var C2 = 0+12*2, c2 = 1+12*2, D2 = 2+12*2, d2 = 3+12*2, E2 = 4+12*2, F2 = 5+12*2, f2 = 6+12*2, G2 = 7+12*2, g2 = 8+12*2, A2 = 9+12*2, a2 = 10+12*2, B2 = 11+12*2;
var C3 = 0+12*3, c3 = 1+12*3, D3 = 2+12*3, d3 = 3+12*3, E3 = 4+12*3, F3 = 5+12*3, f3 = 6+12*3, G3 = 7+12*3, g3 = 8+12*3, A3 = 9+12*3, a3 = 10+12*3, B3 = 11+12*3;
var C4 = 0+12*4, c4 = 1+12*4, D4 = 2+12*4, d4 = 3+12*4, E4 = 4+12*4, F4 = 5+12*4, f4 = 6+12*4, G4 = 7+12*4, g4 = 8+12*4, A4 = 9+12*4, a4 = 10+12*4, B4 = 11+12*4;
var C5 = 0+12*5, c5 = 1+12*5, D5 = 2+12*5, d5 = 3+12*5, E5 = 4+12*5, F5 = 5+12*5, f5 = 6+12*5, G5 = 7+12*5, g5 = 8+12*5, A5 = 9+12*5, a5 = 10+12*5, B5 = 11+12*5;
var C6 = 0+12*6, c6 = 1+12*6, D6 = 2+12*6, d6 = 3+12*6, E6 = 4+12*6, F6 = 5+12*6, f6 = 6+12*6, G6 = 7+12*6, g6 = 8+12*6, A6 = 9+12*6, a6 = 10+12*6, B6 = 11+12*6;

var bass, piano;
bass = function(pitch, duration, volume) {
  return {timbre:'bass',pitch:pitch||C4,duration:duration||1,volume:volume||0.5};
}
piano = function(pitch, duration, volume) {
  return {timbre:'piano',pitch:pitch||C4,duration:duration||1,volume:volume||0.5};
}

function MyAudio() {
  var started = false, loaded = false;
  var musicArray, musicInfo;
  var timer1, timer2;
  var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContextFunc();
  var player = new WebAudioFontPlayer();
  loadedInstruments = [];

  this.set = function(_musicArray, _musicInfo) {
    if(!started) {
      musicArray = _musicArray;
      musicInfo = _musicInfo;
    }
  }

  //chain: this.start()->load()->play()->handleMusic()->autostop
  this.start = function() {
    load();//to the next function
  }

  function load() {//load() = importScript() + decodeNewInstruments()
    var num = 0;
    (function importNewScript() {
      if(num == musicInfo.allInstruments.length) decodeNewInstruments();
      else if(loadedInstruments.indexOf(musicInfo.allInstruments[num]) < 0) {
        importScript('../sound/' + trans[musicInfo.allInstruments[num]] + '_sf2_file.js', function() {
          num++;
          importNewScript();
        });
      }
      else {
        num++;
        importNewScript();
      }
    })();
    function decodeNewInstruments() {
      for (var i = 0; i < musicInfo.allInstruments.length; i++) {
        if(!loadedInstruments || loadedInstruments.indexOf(musicInfo.allInstruments[i]) < 0) {
          var label = trans[musicInfo.allInstruments[i]];
          player.loader.decodeAfterLoading(audioContext, '_tone_' + label + '_sf2_file');
          loadedInstruments[loadedInstruments.length] = musicInfo.allInstruments[i];
        }
      }
      loaded = true;
      play();//to the next function
    }
  }

  function play() {
    if (started) {
      console.log('started already');
    } else {
      started = true;
      console.log('started');
      window.setTimeout(function() {
        handleMusic();
      },100);//to the next function
      timer1 = window.setTimeout(function() {
        started = false;
        console.log('stopped');
        window.clearInterval(timer2);
      }, 1000*(musicInfo.pieceTime+0.2));//autostop
    }
  }

  function handleMusic() {
    var n = 0, i = 0, beat;
    function playEveryBeat() {
      beat = musicArray[n];
      if (beat) {
        for (i = 0; i < beat.length; i++) {
          player.queueWaveTable(audioContext, audioContext.destination,
            window['_tone_' + trans[beat[i].timbre] + '_sf2_file'], 0/*currentTime*/,
            beat[i].pitch, beat[i].duration*musicInfo.beatTime, beat[i].volume);
        }
      }
      n++;
    }
    playEveryBeat();
    timer2 = window.setInterval(function() {
      playEveryBeat();
    }, musicInfo.beatTime*1000);
  }

  this.stop = function() {
    if(!started) {
      console.log('stopped already');
    } else {
      started = false;
      console.log('stopped');
      window.clearTimeout(timer1);
      window.clearInterval(timer2);
    }
  }

  //timbre, pitch, volume, duration
}
