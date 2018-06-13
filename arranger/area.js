function Area() {
  var that = this;
  this.grids = {};

  this.addAreaForTone = function(name, instrument, type, musicScore, a) {
    if(type == 'grid') {
      that.addGrids(name, instrument, musicScore, a);
    } else {
      that[name] = new Keyboard();
      that[name].set(a, 5);
    }
    that.drawOutline(a);
  }

  this.addAreaForDrum = function(type, musicScore, a) {
    if(type == 'grid') {
      that.addGrids('drums', 'drums', musicScore, a);
    } else {
      that.drums = new Drums();
      that.drums.set(a);
    }
    that.drawOutline(a);
  }

  this.addGrids = function(name, instrument, musicScore, a) {
    that.grids[name] = that[name] = new Grid();
    that[name].set(instrument, musicScore, a);
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

  this.operateGrid = function(p, s) {
    for(grid in that.grids) {
      var m = (p.x - that.grids[grid].left),
        n = (p.y - that.grids[grid].top);
      if((m > 0 && m < that.grids[grid].width) && (n > 0 && n < that.grids[grid].height)) {
        if(s == 'click') that.grids[grid].gridChange(m, n);
        else if(s == 'move') that.grids[grid].gridChangeExtend(m, n);
        return;
      }
    }
  }

  this.operateHeader = function(p, s) {
    for(grid in that.grids) {
      var m = (p.x - that.grids[grid].left),
        n = (p.y - that.grids[grid].top);
      if (n < 0 && n > (-0.8 * that.grids[grid].header) && (m > 0 && m < that.grids[grid].width)) {
        that.grids[grid].attrChange.click(m);
      }
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
