function Area() {
  var that = this;
  this.grids = {};

  this.addAreaForTone = function(instrument, type, a) {
    if(type == 'grid') {
      that.addGrids(instrument, a);
    } else {
      that[instrument] = new Keyboard();
      that[instrument].set(a, 5);
    }
    that.drawOutline(a);
  }

  this.addAreaForDrum = function(type, a) {
    if(type == 'grid') {
      that.addGrids('drums', a);
    } else {
      that.drums = new Drums();
      that.drums.set(a);
    }
    that.drawOutline(a);
  }

  this.addGrids = function(instrument, a) {
    that.grids[instrument] = that[instrument] = new Grid();
    that[instrument].set(canvas, a, instrument);
  }

  this.drawOutline = function(a) {
    var cav = canvas.getContext('2d');
    cav.strokeStyle = 'rgb(200, 200, 200)';
    cav.beginPath();
    cav.moveTo(a.left + 2, a.top + 2);
    cav.lineTo(a.left + a.width - 4, a.top + 2);
    cav.lineTo(a.left + a.width - 4, a.top + a.height - 4);
    cav.lineTo(a.left + 2, a.top + a.height - 4);
    cav.closePath();
    cav.stroke();
  }

  this.operateGrid = function(p) {
    for(grid in that.grids) {
      var m = (p.x - that.grids[grid].left),
        n = (p.y - that.grids[grid].top);
      if((m > 0 && m < that.grids[grid].width) && (n > 0 && n < that.grids[grid].height))
        that.grids[grid].gridChange(m, 0, n);
    }
  }

  this.operateMusicArrayAndMusicInfo = function() {
    for(grid in that.grids) {
      that.grids[grid].addElementsToMusicArray();
      that.grids[grid].changeNoteLengthInMusicInfo();
      that.grids[grid].addInstrumentsInMusicInfo();
    }
  }
}
