function ColorPart() {
  var that = this;
  var p, r, c, sw, sh, ms;
  var lightColors = [1,3,5,8,10,13,15,17,20,22,25,27,29,32,34];
  var recordX2 = -1;

  this.set = function(position, rows, columns, singleW, singleH, sinMusicScore) {
    p = position; r = rows; c = columns;
    sw = singleW; sh = singleH; ms = sinMusicScore;
  }

  this.execute = function(x1, x2, y, state) {
    if(recordX2 > x2 && state == 'move') {
      cav.fillStyle = lightColors.indexOf(y) >= 0 ? 'rgb(25, 25, 25)' : 'black';
      cav.fillRect(p.left + (x2 + 1) * sw - 2, p.top + y * sh + 1, sw + 1, sh - 2);

      var opa1 = sh > 6 ? 1 - 1 / (sh - 4) : 0.5;
      cav.strokeStyle = (x2 + 1) % 4 == 0 ? 'rgb(150, 150, 150)' : 'rgba(100, 100, 100, ' + opa1 + ')';
      cav.beginPath();
      cav.moveTo(p.left + (x2 + 1) * sw, p.top + y * sh);
      cav.lineTo(p.left + (x2 + 1) * sw, p.top + (y + 1) * sh);
      cav.stroke();

      that.drawEnding(x2, y);
    }

    else {
      if(ms[y][x1] == 0) {
        for(var vv = x1; vv <= x2; vv++) if(ms[y][vv] != 0) return;
        cav.fillStyle = 'red';
        cav.fillRect(p.left + x1 * sw + 2, p.top + y * sh + 2, sw * (x2-x1+1) - 4, sh - 4);
        that.drawBeginning(x1, y);
        that.drawEnding(x2, y);
      }
      else {
        cav.fillStyle = lightColors.indexOf(y) >= 0 ? 'rgb(25, 25, 25)' : 'black';
        var opa = sh > 6 ? 1 - 1 / (sh - 4) : 0.5;
        var i = 0;
        do {
          cav.fillRect(p.left + (x1 + i) * sw - 2, p.top + y * sh + 1, sw + 1, sh - 2);
          cav.strokeStyle = (x1 + i) % 4 == 0 ? 'rgb(150, 150, 150)' : 'rgba(100, 100, 100, ' + opa + ')';
          cav.beginPath();
          cav.moveTo(p.left + (x1 + i) * sw, p.top + y * sh);
          cav.lineTo(p.left + (x1 + i) * sw, p.top + (y + 1) * sh);
          cav.stroke();
          i++;
        } while(ms[y][x1 + i] == 2);
        if(ms[y][x1] == 2) that.drawEnding(x1 - 1, y);
      }
    }

    recordX1 = x1, recordX2 = x2, recordY = y;
  }

  this.drawBeginning = function(x, y) {
    cav.fillStyle = lightColors.indexOf(y) >= 0 ? 'rgb(25,25,25)' : 'black';

    cav.beginPath();
    cav.moveTo(p.left + x * sw + 1, p.top + y * sh + 1);
    cav.lineTo(p.left + (x + 0.25) * sw + 1, p.top + y * sh + 1);
    cav.arc(p.left+(x+0.25)*sw+1, p.top+y*sh+0.25*sw+1, 0.25*sw, 1.5*Math.PI, Math.PI, true);
    cav.closePath();cav.fill();

    cav.beginPath();
    cav.moveTo(p.left + x * sw + 1, p.top + (y + 1) * sh - 1);
    cav.lineTo(p.left + (x + 0.25) * sw + 1, p.top + (y + 1) * sh - 1);
    cav.arc(p.left+(x+0.25)*sw+1, p.top+(y+1)*sh-0.25*sw-1, 0.25*sw, 0.5*Math.PI, Math.PI, false);
    cav.closePath();cav.fill();
  }

  this.drawEnding = function(x, y) {
    cav.fillStyle = lightColors.indexOf(y) >= 0 ? 'rgb(25,25,25)' : 'black';

    cav.beginPath();
    cav.moveTo(p.left + (x + 1) * sw - 1, p.top + y * sh + 1);
    cav.lineTo(p.left + (x + 1 - 0.25) * sw - 1, p.top + y * sh + 1);
    cav.arc(p.left+(x+1-0.25)*sw-1, p.top+y*sh+0.25*sw+1, 0.25*sw, 1.5*Math.PI, 0, false);
    cav.closePath();cav.fill();

    cav.beginPath();
    cav.moveTo(p.left + (x + 1) * sw - 1, p.top + (y + 1) * sh - 1);
    cav.lineTo(p.left + (x + 1 - 0.25) * sw - 1, p.top + (y + 1) * sh - 1);
    cav.arc(p.left+(x+1-0.25)*sw-1, p.top+(y+1)*sh-0.25*sw-1, 0.25*sw, 0.5*Math.PI, 0, true);
    cav.closePath();cav.fill();
  }
}
