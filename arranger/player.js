function Player() {
  var that = this;
  var started = false, timer, progress = 0;
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
      for(i = 32 - 1; i >= 0 && k == 0;i--)
      for(j = 0; j < 36 && k == 0; j++)
        if(musicScore[label][j * 32 + i] != 0) k = i + 1 ;
      if( k > musicInfo.pieceLength) musicInfo.pieceLength = k;
      k = 0;
    }

    musicDetail = new Array();
    for(var n = 0; n < musicInfo.pieceLength + 1; n++) {
      musicDetail.push(that.transfer(n));
    }
console.log(musicDetail);
//console.log(musicScore);
    audio.load(0, t);
  }

  this.transfer = function(n) {
    var retValue = new Array(2);
    retValue[0] = new Array(), retValue[1] = new Array();
    var a, b;
    for(var label = 0; label < numOfGraphics; label++) {
      for(var i = 0; i < gRows; i++) {
        a = n == musicInfo.pieceLength ? 0 : musicScore[label][i * gColumns + n];
        b = n == 0 ? 0 : musicScore[label][i * gColumns + n - 1];
        if(a == 1) retValue[0].push(window[musicInfo.allInstruments[label]](C3 + gRows - i - 1));
        if((a == 0 || a == 1) && (b == 2 || b == 1))
          retValue[1].push(window[musicInfo.allInstruments[label]](C3 + gRows - i - 1));
      }
    }//console.log(retValue);
    return retValue;
  }

  this.start = function() {
    if (started) {
      console.log('started already');
    } else if(musicInfo.pieceLength > 0) {
      started = true;
      console.log('started');
      timer = window.setInterval(function() {
        if(!(progress < musicInfo.pieceLength)) {
          window.clearInterval(timer);
          audio.handleMusic(musicDetail[musicInfo.pieceLength]);
          progress = 0;
          started = false;
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
    if(!started) {
      console.log('stopped already');
    } else {
      started = false;
      console.log('stopped');
      window.clearInterval(timer);
      progress = 0;
    }
  }

}
