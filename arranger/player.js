function Player() {
  var that = this;
  window.started = false;
  var timer, progress = 0;
  var musicDetail;

  this.play = function() {
    t = {content: false};
    that.prepare(t);
    console.log('loading');
    var tm = window.setInterval(function() {
      if(t.content == true) {
        window.clearInterval(tm);
        console.log('loaded');
        that.start();
      }
    }, 100);
  }

  this.prepare = function(t) {
    musicInfo.pieceLength = 0;
    var label, i, j, k = 0;
    for(label = 0; label < numOfGraphics; label++) {
      for(i = gColumns - 1; i >= 0 && k == 0;i--)
      for(j = 0; j < gRows[label] && k == 0; j++)
        if(musicScore[label][j * gColumns + i] != 0) k = i + 1;
      if(k > musicInfo.pieceLength) musicInfo.pieceLength = k;
      k = 0;
    }

    musicDetail = new Array();
    for(var n = 0; n < musicInfo.pieceLength + 1; n++) {
      musicDetail.push(that.transfer(n));
    }
console.log(musicDetail);
//console.log(musicScore);
    audio.getAllInstruments();
    audio.load(0, t);
  }

  this.transfer = function(n) {
    var baseNote;
    var retValue = new Array(2);
    retValue[0] = new Array(), retValue[1] = new Array();
    var a, b;
    for(var label = 0; label < numOfGraphics; label++) {
      baseNote = gRows[label] > 24 ? C3 : C4;
      for(var i = 0; i < gRows[label]; i++) {
        a = n == musicInfo.pieceLength ? 0 : musicScore[label][i * gColumns + n];
        b = n == 0 ? 0 : musicScore[label][i * gColumns + n - 1];
        if(a == 1) retValue[0].push(window[musicInfo.allInstruments[label]](baseNote + gRows[label] - i - 1));
        if((a == 0 || a == 1) && (b == 2 || b == 1))
          retValue[1].push(window[musicInfo.allInstruments[label]](baseNote + gRows[label] - i - 1));
      }
    }//console.log(retValue);
    return retValue;
  }

  this.start = function() {document.getElementById('settingOutline').style.display
    if (window.started) {
      console.log('started already');
    } else if(musicInfo.pieceLength > 0) {
      window.started = true;
      console.log('started');
      if(document.getElementById('settingOutline').style.display == 'block')
        document.getElementById('settingOutline').style.display = 'none';
      timer = window.setInterval(function() {
        if(!(progress < musicInfo.pieceLength)) {
          window.clearInterval(timer);
          audio.handleMusic(musicDetail[musicInfo.pieceLength]);
          progress = 0;
          window.started = false;
          console.log('stopped');
        }
        else {
          audio.handleMusic(musicDetail[progress]);
          progress++;
        }
      }, 1000 * musicInfo.beatTime);
    }
  }

  this.stop = function() {
    if(!window.started) {
      console.log('stopped already');
    } else {
      window.started = false;
      console.log('stopped');
      window.clearInterval(timer);
      progress = 0;
    }
  }

}
