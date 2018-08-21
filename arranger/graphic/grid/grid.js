function Grid() {
  var that = this;

  this.set = function(instrument, musicScore, position) {
    that.musicScore = musicScore;
    that.position = position;
    that.instrument = instrument;

    that.baseNote = 36;

    that.rows = 36;
    that.columns = 32;
    that.singleH = position.height / that.rows,
    that.singleW = that.singleH * 1.62;//gold ratio
    this.drawGrid(position, that.rows, that.columns, that.singleW, that.singleH);

    that.musicScore = new Array(that.columns * that.rows);
    for(var mu=0; mu<that.columns * that.rows; mu++) that.musicScore[mu] = 0;

    that.colorPart = new ColorPart();
    that.colorPart.set(position, that.rows, that.columns, that.singleW, that.singleH, that.musicScore);

    that.logicPart = new LogicPart();
    that.logicPart.set(that.rows, that.columns, that.musicScore);
  }

  this.drawGrid = function(pos, rows, cols, sW, sH) {
    cav.beginPath();
    cav.fillStyle = 'rgb(25, 25, 25)';
    var lightColors = [1,3,5,8,10,13,15,17,20,22,25,27,29,32,34];
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
    for (var j = 4; j < cols + 1 - 4; j+=4) {
      cav.moveTo(pos.left + j * sW, pos.top);
      cav.lineTo(pos.left + j * sW, pos.top + pos.height);
    }
    for (var i = 12; i < rows; i+=12) {
      cav.moveTo(pos.left, pos.top + sH * i);
      cav.lineTo(pos.left + sW * cols, pos.top + sH * i);
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
