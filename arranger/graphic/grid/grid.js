function Grid() {
  var that = this;

  this.set = function(label, position) {
    that.label = label;
    that.sinMusicScore = musicScore[label];
    that.position = position;
    that.singleH = position.height / graphicInfo.gRows[label],
    that.singleW = that.singleH * 1.62;//gold ratio

    that.colorPart = new ColorPart();
    that.colorPart.set(position, graphicInfo.gRows[label], graphicInfo.gColumns, that.singleW, that.singleH, that.sinMusicScore);
    that.logicPart = new LogicPart();
    that.logicPart.set(graphicInfo.gRows[label], graphicInfo.gColumns, that.sinMusicScore);

    that.paint();
  }

  this.alter = function(part, newDetail) {
    that[part] = newDetail;//console.log('b', that.position.height);
    if(part == 'position') {
      that.singleH = that.position.height / graphicInfo.gRows[that.label],
      that.singleW = that.singleH * 1.62;//gold ratio
      that.paint();
    }
  }

  this.paint = function() {
    var alternative = new Array(graphicInfo.gRows[that.label]);
    for(var y = 0; y < graphicInfo.gRows[that.label]; y++) {
      alternative[y] = new Array(graphicInfo.gColumns);
      for(var x = 0; x < graphicInfo.gColumns; x++)
        alternative[y][x] = 0;
    }
    that.drawGrid(that.position, graphicInfo.gRows[that.label], graphicInfo.gColumns, that.singleW, that.singleH);
    var i, j, temp;
    that.colorPart.set(that.position, graphicInfo.gRows[that.label], graphicInfo.gColumns, that.singleW, that.singleH, alternative);
    for(i = 0; i < that.sinMusicScore.length; i++)
    for(j = 0; j < that.sinMusicScore[i].length; j++)
    if(that.sinMusicScore[i][j] == 1) {
      temp = j; j += 1;
      for(; that.sinMusicScore[i][j] == 2 && j < that.sinMusicScore[i].length; j++); j -= 1;
      that.colorPart.execute(temp, j, i, 'start');
    }
    that.colorPart.set(that.position, graphicInfo.gRows[that.label], graphicInfo.gColumns, that.singleW, that.singleH, that.sinMusicScore);
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
    for (var k = 4; k < cols + 1; k+=4) {
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
    if(state == 'start' || (state == 'move' && intX2 >= intX1)){
      that.colorPart.set(that.position, graphicInfo.gRows[that.label], graphicInfo.gColumns, that.singleW, that.singleH, that.sinMusicScore);
      that.colorPart.execute(intX1, intX2, intY, state);
    }
  }

  this.gridLogic = function(y, x1, x2) {
    that.logicPart.set(graphicInfo.gRows[that.label], graphicInfo.gColumns, that.sinMusicScore);
    that.logicPart.execute(parseInt(x1/that.singleW), parseInt(x2/that.singleW), parseInt(y/that.singleH));
  }
}
