function MyAudio(area) {
  var that = this;

  var started = false, loaded = false;
  var musicArray, musicInfo, area;
  var timer;
  var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContextFunc();
  var player = new WebAudioFontPlayer();
  loadedInstruments = [];

  this.set = function(_musicArray, _musicInfo, _area) {
    if(!started) {
      musicArray = _musicArray;
      musicInfo = _musicInfo;
      area = _area;
    }
  }

  this.start = function() {
    this.load(0);
  }

  this.load = function(num) {
      if(num == musicInfo.allInstruments.length) {
        that.decodeNewInstruments();
      } else if(loadedInstruments.indexOf(musicInfo.allInstruments[num]) < 0) {
        var forDrum = drums.indexOf(musicInfo.allInstruments[num]) >= 0 ? '128' : '';
        that.importScript('../sound/' + forDrum + trans[musicInfo.allInstruments[num]] + '_sf2_file.js', function() {
          num++; that.load(num);
        });
      } else {
        num++; that.load(num);
      }
  }

  this.decodeNewInstruments = function() {
    for (var i = 0; i < musicInfo.allInstruments.length; i++) {
      if(!loadedInstruments || loadedInstruments.indexOf(musicInfo.allInstruments[i]) < 0) {
        var label = trans[musicInfo.allInstruments[i]];
        var drumOrTone = drums.indexOf(musicInfo.allInstruments[i]) >=0 ? '_drum_' : '_tone_';
        player.loader.decodeAfterLoading(audioContext, drumOrTone + label + '_sf2_file');
        loadedInstruments[loadedInstruments.length] = musicInfo.allInstruments[i];
      }
    }
    loaded = true;
    this.play();
  }

  this.importScript = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function(){callback();};
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  this.play = function() {
    if (started) {
      console.log('started already');
    } else {
      started = true;
      console.log('started');
      window.setTimeout(function() {
        that.handleMusic();
      },100);
    }
  }

  this.handleMusic = function() {
    var n = 0, i = 0, beat = musicArray[n++];
    that.cancelBeat(beat[1]);
    that.playBeat(beat[0]);
    timer = window.setInterval(function() {
      beat = musicArray[n++];
      that.cancelBeat(beat[1]);
      that.playBeat(beat[0]);
      if(n >= musicArray.length) {//autostop
        window.clearInterval(timer);
        started = false;
        console.log('stopped');
      }
    }, musicInfo.beatTime*1000);
  }

  this.playBeat = function(beat) {
    var drumOrTone;
    if (beat) for (i = 0; i < beat.length; i++) {
      drumOrTone = drums.indexOf(beat[i].timbre) >= 0 ? '_drum_' : '_tone_';
      window['currentPlay_' + beat[i].timbre][beat[i].pitch] = player.queueWaveTable(audioContext, audioContext.destination, window[drumOrTone + trans[beat[i].timbre] + '_sf2_file'], 0/*currentTime*/, beat[i].pitch, 100*musicInfo.beatTime, beat[i].volume);
      if(drumOrTone == '_drum_') area.drum.hitDrum(beat[i].timbre);
      else area[beat[i].timbre].paintKey(beat[i].pitch, 'click');
    }
  }

  this.cancelBeat = function(beat) {
    if(beat) for (var i = 0; i < beat.length; i++) {
      window['currentPlay_' + beat[i].timbre][beat[i].pitch].cancel();
      if(drums.indexOf(beat[i].timbre) >= 0) area.drum.releaseDrum(beat[i].timbre);
      else area[beat[i].timbre].paintKey(beat[i].pitch, 'release');
    }
  }

  this.stop = function() {
    if(!started) {
      console.log('stopped already');
    } else {
      started = false;
      console.log('stopped');
      window.clearTimeout(timer);
    }
  }

  //timbre, pitch, volume, duration
}
