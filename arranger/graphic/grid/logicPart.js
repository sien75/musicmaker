function LogicPart() {
  var that = this;
  var ms, r, c;

  this.set = function(rows, columns, musicScore) {
    r = rows, c = columns;
    ms = musicScore;
  }

  this.execute = function(x1, x2, y) {
    if(ms[y*c + x1] == 0) {
      ms[y*c + x1] = 1;
      var ii = 1;
      while(ms[y*c + x1 + ii] != 1 && ii <= x2 - x1) {
        ms[y*c + x1 + ii] = 2;
        ii++;
      }
    }
    else {
      ms[y*c + x1] = 0;
      var jj = 1;
      while(ms[y*c + x1 + jj] == 2) {
        ms[y*c + x1 + jj] = 0;
        jj++;
      }
    }
  }

}
