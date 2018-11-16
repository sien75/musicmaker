function Player() {
  var that = this;
  var prograssBar = new PrograssBar();
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
    musicLength = 0;
    var label, i, j, k = 0;
    for(label = 0; label < graphicInfo.numOfGraphics; label++) {
      for(i = graphicInfo.gColumns - 1; i >= 0 && k == 0;i--)
      for(j = 0; j < graphicInfo.gRows[label] && k == 0; j++)
        if(musicScore[label][j][i] != 0) k = i + 1;
      if(k > musicLength) musicLength = k;
      k = 0;
    }

    musicDetail = new Array();
    for(var n = 0; n < musicLength + 1; n++) {
      musicDetail.push(that.transfer(n));
    }
    //console.log(musicDetail);
    //console.log(musicScore);
    audio.getAllInstruments();
    audio.load(0, t);
  }

  this.transfer = function(n) {
    var baseNote;
    var retValue = new Array(2);
    retValue[0] = new Array(), retValue[1] = new Array();
    var a, b;
    for(var label = 0; label < graphicInfo.numOfGraphics; label++) {
      baseNote = graphicInfo.gRows[label] > 24 ? C3 : C4;
      for(var i = 0; i < graphicInfo.gRows[label]; i++) {
        a = n == musicLength ? 0 : musicScore[label][i][n];
        b = n == 0 ? 0 : musicScore[label][i][n - 1];
        if(a == 1) retValue[0].push(window[musicInfo.allInstruments[label]](baseNote + graphicInfo.gRows[label] - i - 1));
        if((a == 0 || a == 1) && (b == 2 || b == 1))
          retValue[1].push(window[musicInfo.allInstruments[label]](baseNote + graphicInfo.gRows[label] - i - 1));
      }
    }//console.log(retValue);
    return retValue;
  }

  this.start = function() {
    if (window.started)
      console.log('started already');
    else if(musicLength > 0) {
      window.started = true; console.log('started');
      if(document.getElementById('settingOutline').style.display == 'block')
        document.getElementById('settingOutline').style.display = 'none';
      window.setTimeout(function () {
        prograssBar.startPB();
        audio.handleMusic(musicDetail[progress]);
        progress++;
        timer = window.setInterval(function() {
          if(!(progress < musicLength)) {
            audio.handleMusic(musicDetail[musicLength]);
            that.stop();
          }
          else {
            audio.handleMusic(musicDetail[progress]);
            progress++;
          }
        }, 1000 * musicInfo.beatTime);
      }, 500);
    }
  }

  this.stop = function() {
    if(!window.started) {
      console.log('stopped already');
    } else {
      window.started = false;
      console.log('stopped');
      prograssBar.stopPB();
      window.clearInterval(timer);
      progress = 0;
    }
  }

}
