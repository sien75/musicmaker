function Audio() {
  var that = this;

  var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContextFunc();
  var wafplayer = new WebAudioFontPlayer();
  var _allInstruments = (function() {
      var ma = musicInfo.allInstruments, dr = ma.indexOf('drums');
      return dr >= 0 ? ma.slice(0, dr).concat(ma.slice(dr + 1, ma.length)).concat(drumContent) : ma;
    })();
  loadedInstruments = [];

  this.load = function(num, t) {
    var drumOrTone;
    if(num == _allInstruments.length) {
      that.decodeNewInstruments(t);
    } else if(loadedInstruments.indexOf(_allInstruments[num]) < 0) {
      drumOrTone = drumContent.indexOf(_allInstruments[num]) >= 0 ? '128' : '';
      that.importScript('../sound/' + drumOrTone + trans[_allInstruments[num]] + '_sf2_file.js', function() {
        num++; that.load(num, t);
      });
    } else {
      num++; that.load(num, t);
    }
  }

  this.importScript = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function(){callback();};
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  this.decodeNewInstruments = function(t) {
    for (var i = 0; i < _allInstruments.length; i++) {
      if(!loadedInstruments || loadedInstruments.indexOf(_allInstruments[i]) < 0) {
        var label = trans[_allInstruments[i]];
        var drumOrTone = drumContent.indexOf(_allInstruments[i]) >=0 ? '_drum_' : '_tone_';
        wafplayer.loader.decodeAfterLoading(audioContext, drumOrTone + label + '_sf2_file');
        loadedInstruments[loadedInstruments.length] = _allInstruments[i];
      }
    }
    t.content = true;
  }

  this.handleMusic = function(n) {
    that.cancelBeat(n[1]);
    that.playBeat(n[0]);
  }

  this.playBeat = function(beat) {
    var drumOrTone;
    if(beat) for (i = 0; i < beat.length; i++) {
      if(!beat[i]) continue;
      drumOrTone = drumContent.indexOf(beat[i].timbre) >= 0 ? '_drum_' : '_tone_';
      window['currentPlay_' + beat[i].timbre][beat[i].pitch] = wafplayer.queueWaveTable(audioContext, audioContext.destination, window[drumOrTone + trans[beat[i].timbre] + '_sf2_file'], 0/*currentTime*/, beat[i].pitch, 100*musicInfo.beatTime, beat[i].volume);
      //if(drumOrTone == '_drum_') area.drum.hitDrum(beat[i].timbre);
      //else if(area[beat[i].timbre]) area[beat[i].timbre].paintKey(beat[i].pitch, 'click');
    }
  }

  this.cancelBeat = function(beat) {
    if(beat) for (var i = 0; i < beat.length; i++) {
      if(!beat[i]) continue;
      window['currentPlay_' + beat[i].timbre][beat[i].pitch].cancel();
    //  if(drumContent.indexOf(beat[i].timbre) < 0 && area[beat[i].timbre]) area[beat[i].timbre].paintKey(beat[i].pitch, 'release');
    }
  }

  //timbre, pitch, volume, duration
}
