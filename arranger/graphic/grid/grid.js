function Grid() {
  var that = this;

  this.set = function(label, musicScore, position) {
    that.label = label;
    that.musicScore = musicScore;
    that.position = position;
    that.singleH = position.height / gRows[label],
    that.singleW = that.singleH * 1.62;//gold ratio

    that.colorPart = new ColorPart();
    that.colorPart.set(position, gRows[label], gColumns, that.singleW, that.singleH, that.musicScore);
    that.logicPart = new LogicPart();
    that.logicPart.set(gRows[label], gColumns, that.musicScore);
    that.paint();
  }

  this.alter = function(part, newDetail) {
    that[part] = newDetail;//console.log('b', that.position.height);
    if(part == 'position') {
      that.singleH = that.position.height / gRows[that.label],
      that.singleW = that.singleH * 1.62;//gold ratio
      that.paint();
    }
  }

  this.paint = function() {
    that.drawGrid(that.position, gRows[that.label], gColumns, that.singleW, that.singleH);
    var alternative = new Array(gRows[this.label] * gColumns);
    for(var ppp = 0; ppp < alternative.length; ppp++) alternative[ppp] = 0;
    var i = 0, j = 0, temp;
    that.colorPart.set(that.position, gRows[that.label], gColumns, that.singleW, that.singleH, alternative);
    for(; i < that.musicScore.length; i++) if(that.musicScore[i] == 1) {
      j = i; i += 1;
      for(; that.musicScore[i] == 2; i++); i -= 1;
      that.colorPart.execute(j % 32, i % 32, parseInt(i / 32), 'start');
    }
    that.colorPart.set(that.position, gRows[that.label], gColumns, that.singleW, that.singleH, that.musicScore);
  }

  this.drawGrid = function(pos, rows, cols, sW, sH) {
    cav.beginPath();
    cav.fillStyle = 'rgb(25, 25, 25)';
    var lightColors = new Array();
    for(var g = 0; g <= parseInt((rows-1) / 12); g++)
      [1, 3, 6, 8, 10].forEach(function(num){if(rows-1-num-g*12>=0)lightColors=lightColors.concat(rows-1-num-g*12);});
    for(h in lightColors)
      cav.rect(pos.left, pos.top + lightColors[h] * sH, sW * cols, sH);
    cav.fill();

    cav.beginPath();
    var opa = sH > 6 ? 1 - 1 / (sH - 4) : 0.5;
    cav.strokeStyle = 'rgba(100, 100, 100, ' + opa + ')';
    for (var i = 0; i < rows + 1; i++) {
      cav.moveTo(pos.left, pos.top + sH * i);
      cav.lineTo(pos.left + sW * cols, pos.top + sH * i);
    }
    for (var j = 0; j < cols + 1; j++) {
      cav.moveTo(pos.left + j * sW, pos.top);
      cav.lineTo(pos.left + j * sW, pos.top + pos.height);
    }
    cav.stroke();

    cav.beginPath();
    cav.strokeStyle = 'rgb(200, 200, 200)';
    cav.moveTo(pos.left, pos.top);
    cav.lineTo(pos.left + sW * cols, pos.top);
    cav.lineTo(pos.left + sW * cols, pos.top + pos.height);
    cav.lineTo(pos.left, pos.top + pos.height);
    cav.closePath();
    cav.stroke();

    cav.beginPath();
    cav.strokeStyle = 'rgb(150, 150, 150)';
    for (var k = 4; k < cols + 1 - 4; k+=4) {
      cav.moveTo(pos.left + k * sW, pos.top);
      cav.lineTo(pos.left + k * sW, pos.top + pos.height);
    }
    for (var l = rows - 12; l >= 0; l-=12) {
      cav.moveTo(pos.left, pos.top + sH * l);
      cav.lineTo(pos.left + sW * cols, pos.top + sH * l);
    }
    cav.stroke();
  }

  this.paintColor = function(y, x1, x2, state) {
    var intY = parseInt(y/that.singleH),
      intX1 = parseInt(x1/that.singleW),
      intX2 = parseInt(x2/that.singleW);
    if(state == 'start' || (state == 'move' && intX2 >= intX1))
      that.colorPart.execute(intX1, intX2, intY, state);
  }

  this.gridLogic = function(y, x1, x2) {
    that.logicPart.execute(parseInt(x1/that.singleW), parseInt(x2/that.singleW), parseInt(y/that.singleH));
  }
}
