function Grid() {
  var that = this, ctx = canvas.getContext('2d'),
    instrument,
    drumToFillFull,
    noteRecord,
    attrArray = new Array();
  this.dg = new DrawGrid();
  this.timeBar = new TimeBar();
  this.attrChange = new AttrChange();

  this.set = function(_instrument, musicScore, a) {
    noteRecord = musicScore;
    instrument = _instrument;

    if(instrument == 'drums') {
      drumToFillFull = [0, 1];
      for(var i = 0; i < noteRecord.length; i++) noteRecord[i] = new Array();
      this.attrChange.set('isDrum', that.singleW, attrArray);
    } else {
      drumToFillFull = [0.25, 0.5];
      for(var i = 0; i < noteRecord.length; i++) noteRecord[i] = -1;
      this.attrChange.set('isNotDrum', that.singleW, attrArray);
    }

    that.header = a.height * 0.07;
    that.left = a.left + 5; that.top = a.top + that.header;
    that.width = a.width * 0.8 - 5; that.height = a.height * 0.97 - that.header;
    that.singleH = that.height / 21,
    that.singleW = that.width / 32;

    this.dg.set(ctx, that.left, that.top, that.width, that.height, that.singleH, that.singleW);
    this.timeBar.set(that.left, that.top, that.width, that.height);
  }

  this.gridChange = function(x, y) {
    that.intX = parseInt(x / that.singleW);
    that.intY = parseInt(y / that.singleH);

    if(instrument == 'drums') {
      if(noteRecord[that.intX].indexOf(that.intY) < 0) {
        noteRecord[that.intX].push(that.intY);
        that.paint(that.intX, that.intY, 'deep');
      } else {
        for(var i = 0; i < noteRecord[that.intX].length; i++) if(noteRecord[that.intX][i] == that.intY)
            noteRecord[that.intX].splice(i, 1);
        that.paintBack(that.intX, that.intY);
      }
      return;
    }

    if(noteRecord[that.intX] == -2) {//有连续音
      var t, s = that.intX, r = that.intX;
      do {s--;} while(noteRecord[s] == -2);
      that.paintBack(that.intX, noteRecord[s]);
      while(noteRecord[r] == -2) {noteRecord[r++] = -1;}
    }
    else if(noteRecord[that.intX] == -1) {//无音调选中
      noteRecord[that.intX] = that.intY;
      that.paint(that.intX, noteRecord[that.intX], 'deep');
    }
    else if(noteRecord[that.intX] != that.intY) {//有不同的音调选中
      that.paintBack(that.intX, noteRecord[that.intX]);
      noteRecord[that.intX] = that.intY;
      that.paint(that.intX, noteRecord[that.intX], 'deep');
    }
    else {//有相同的音调选中
      that.paintBack(that.intX, noteRecord[that.intX]);
      noteRecord[that.intX] = -1;
    }
  }

  this.gridChangeExtend = function(x, y) {
    var intX = parseInt(x / that.singleW),
      numY = y / that.singleH;
    if((that.intY%7==0 || that.intY%7==4) && numY < that.intY) return;
    if((that.intY%7==3 || that.intY%7==6) && numY > that.intY + 1) return;
    if(that.intX == 31) return;
    if(intX < that.intX) return;
    if(instrument == 'drums') return;

    if((numY < that.intY || numY > that.intY + 1) && (intX < that.intX + 1)) {
      that.paintBack(that.intX, noteRecord[that.intX]);
      noteRecord[intX] = that.intY + (numY < that.intY ? -0.5 : 0.5);
      that.paint(intX, noteRecord[intX], 'deep');
    }
    else {
      var diff = intX - that.intX, i = 0;
      if(noteRecord[that.intX] >= 0) that.paintBack(that.intX, noteRecord[that.intX]);
      if(intX == that.intX) noteRecord[that.intX] = that.intY;
      that.paint(that.intX, noteRecord[that.intX], 'deep');
      while(++i <= diff) {
        if(noteRecord[that.intX + i] > 0) return;
        noteRecord[that.intX + i] = -2;
        that.paint(that.intX + i, noteRecord[that.intX], 'light');
      }
      if(noteRecord[intX + 1] == -2) {
        that.paintBack(intX + 1, noteRecord[that.intX]);
        noteRecord[intX + 1] = -1;
      }
    }
  }

  this.paint = function(x, y, depth) {
    if(depth == 'deep') {
      ctx.beginPath();
      ctx.fillStyle = '#f00';
      ctx.rect(that.left + that.singleW * x + 1, that.top + that.singleH * (y + drumToFillFull[0]) + 1, that.singleW - 2, that.singleH * drumToFillFull[1] - 2);
      ctx.fill();
    } else if(depth == 'light') {
      ctx.beginPath();
      ctx.fillStyle = '#f88';
      ctx.rect(that.left + that.singleW * x + 2, that.top + that.singleH * (y + drumToFillFull[0]) + 2, that.singleW - 4, that.singleH * drumToFillFull[1] - 4);
      ctx.fill();
    }
  }

  this.paintBack = function(x, y) {
    do {
      ctx.beginPath(); ctx.fillStyle = '#246';
      ctx.rect(that.left + that.singleW * x + 1, that.top + that.singleH * (y + drumToFillFull[0]) + 1, that.singleW - 2, that.singleH * drumToFillFull[1] - 2);
      ctx.fill();
      if(parseInt(y) != y) {
        ctx.beginPath(); ctx.strokeStyle = '#aaa';
        ctx.moveTo(that.left + that.singleW * x, that.top + that.singleH * (y + 0.5));
        ctx.lineTo(that.left + that.singleW * (1 + x), that.top + that.singleH * (y + 0.5));
        ctx.stroke();
      }
      x++;
    } while(noteRecord[x] == -2);
  }

  this.addElementsToMusicArray = function() {
    var oct, vol;

    if(instrument == 'drums') {
      for (var i = 0; i < noteRecord.length; i++) {
        oct = that.attrChange.get('octive'),
        vol = that.attrChange.get('volume');
        for (var j = 0; j < noteRecord[i].length; j++) {
          musicArray[i][0].push(window[instrument]( transfer(noteRecord[i][j]) + 12 * oct, vol ));
          musicArray[i + 1][1].push(window[instrument]( transfer(noteRecord[i][j]) + 12 * oct, vol ));
        }
      }
    }

    else for (var i = 0; i < noteRecord.length;) {
      if(noteRecord[i] >= 0) {
        musicArray[i][0].push(window[instrument]( transfer(noteRecord[i]) ));
        var temp = noteRecord[i];
        do {i++;} while(noteRecord[i] == -2);
        musicArray[i][1].push(window[instrument]( transfer(temp) ));
      } else
        i++;
    }
  }

  this.changeNoteLengthInMusicInfo = function() {
    var i = noteRecord.length - 1;
    if(instrument == 'drums') while(noteRecord[i].length == 0) {i--;}
    else while(noteRecord[i] == -1) {i--;}
    if(i + 2 > musicInfo.pieceLength) musicInfo.pieceLength = i + 2;
  }

  this.addInstrumentsInMusicInfo = function() {
    if(instrument == 'drums') {
      for(d in drumContent)
        if(musicInfo.allInstruments.indexOf(drumContent[d]) < 0)
          musicInfo.allInstruments.push(drumContent[d]);
    }
    else if(musicInfo.allInstruments.indexOf(instrument) < 0)
      musicInfo.allInstruments.push(instrument);
  }

}
