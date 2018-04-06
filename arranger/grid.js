function Grid() {
  var that = this, ctx,
    instrument,
    noteRecord = new Array(30);
  for(var i = 0; i < noteRecord.length; i++) noteRecord[i] = -1;

  this.set = function(canvas, a, _instrument) {
    ctx = canvas.getContext('2d'); instrument = _instrument;
    that.left = a.left + 5; that.top = a.top + 7;
    that.width = a.width * 0.8 - 5; that.height = a.height - 16;
    that.initLine();
  }
//初始化可以调用gridWhenplay///////////////////////////////
  this.initLine = function() {
    that.singleH = that.height / 21,
    that.singleW = that.width / 30;
    that.lineHorizontal();
    that.lineVertical();
  }

  this.lineHorizontal = function() {
    var c = ctx, h = that.singleH;
    c.beginPath(); c.strokeStyle = '#aaa';
    for (var i = 0; i < 22; i++) {
      c.moveTo(that.left, that.top + i * h);
      c.lineTo(that.left + that.width, that.top + i * h);
    }
    c.stroke();
    c.beginPath(); c.strokeStyle = '#eee';
    for (var i = 0; i < 4; i++) {
      c.moveTo(that.left, that.top + i * h * 7);
      c.lineTo(that.left + that.width, that.top + i * h * 7);
    }
    c.stroke();
  }

  this.lineVertical = function() {
    var c = ctx, w = that.singleW;
    c.beginPath(); c.strokeStyle = '#aaa';
    for (var i = 0; i < 31; i++) {
      c.moveTo(that.left + i * w, that.top);
      c.lineTo(that.left + i * w, that.top + that.height);
    }
    c.stroke();
  }

  this.gridChange = function(x, number, y) {
    var intX = parseInt(x / that.singleW),
      intY = parseInt(y / that.singleH);
    if(noteRecord[intX] == -2) {//有连续音
      that.paintBack(intX, noteRecord[intY]);
    }
    else if(noteRecord[intX] == -1) {//无音调选中
      noteRecord[intX] = intY;
      that.paint(intX, number, noteRecord[intX]);
    }
    else if(noteRecord[intX] != intY) {//有不同的音调选中
      that.paintBack(intX, noteRecord[intX]);
      noteRecord[intX] = intY;
      that.paint(intX, number, noteRecord[intX]);
    }
    else {//有相同的音调选中
      that.paintBack(intX, noteRecord[intX]);
      noteRecord[intX] = -1;
    }
  }

  this.paint = function(x, number, y) {
    ctx.beginPath();
    ctx.fillStyle = '#f00';
    ctx.rect(that.left + that.singleW * x + 1, that.top + that.singleH * y + 1, that.singleW - 2, that.singleH - 2);
    ctx.fill();
    for( ; number > 0; number--) {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.rect(that.left + that.singleW * (x + number) + 1, that.top + that.singleH * y + 1, that.singleW - 2, that.singleH - 2);
      ctx.fill();
    }
  }

  this.paintBack = function(x, y) {
    do {
      ctx.beginPath(); ctx.fillStyle = '#000';
      ctx.rect(that.left + that.singleW * x + 1, that.top + that.singleH * y + 1, that.singleW - 2, that.singleH - 2);
      ctx.fill();
      if(parseInt(y) != y) {
        ctx.beginPath(); ctx.strokeStyle = '#aaa';
        ctx.moveTo(that.left + that.singleW * x, that.top + that.singleH * y * 0.5);
        ctx.lineTo(that.left + that.singleW * (1 + x), that.top + that.singleH * y * 0.5);
        ctx.stroke();
      }
      x++;
      y = noteRecord[x];
    } while(y == -2);
  }

  this.addElementsToMusicArray = function() {
    for (var i = 0; i < noteRecord.length;) {
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
    while(noteRecord[i] == -1) {i--;}
    if(i + 2 > musicInfo.pieceLength) musicInfo.pieceLength = i + 2;
  }

  this.addInstrumentsInMusicInfo = function() {
    if(noteRecord.length == 0) return;
    if(instrument == 'drums') {
      for(d in drumContent)
        if(musicInfo.allInstruments.indexOf(drumContent[d]) < 0)musicInfo.allInstruments.push(drumContent[d]);
    } else if(musicInfo.allInstruments.indexOf(instrument) < 0)
      musicInfo.allInstruments.push(instrument);
  }

}
[
  [ [], [] ]
]
