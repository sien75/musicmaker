function LogicPart() {
  var that = this;
  var ms, r, c;

  this.set = function (rows, columns, sinMusicScore) {
    r = rows, c = columns;
    ms = sinMusicScore;
  }

  this.execute = function (x1, x2, y) {
    if(ms[y][x1] == 0) {
      ms[y][x1] = 1;
      var ii = 1;
      while(ms[y][x1 + ii] != 1 && ii <= x2 - x1) {
        ms[y][x1 + ii] = 2;
        ii++;
      }
    }
    else {
      ms[y][x1] = 0;
      var jj = 1;
      while(ms[y][x1 + jj] == 2) {
        ms[y][x1 + jj] = 0;
        jj++;
      }
    }
  }

}
