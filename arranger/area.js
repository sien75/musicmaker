function Area() {
  var that = this;
  this.grids = {};

  this.addAreaForTone = function(name, instrument, type, musicScore, a) {
    if(type == 'grid') {
      that.grids[name] = that[name] = new Grid();
      that[name].set(instrument, musicScore, a);
    } else {
      that[name] = new Keyboard();
      that[name].set(a, 5);
    }
  }

  this.addAreaForDrum = function(name, type, musicScore, a) {
    if(type == 'grid') {
      that.grids[name] = that[name] = new Grid();
      that[name].set('drums', musicScore, a);
    } else {
      that[name] = new Drums();
      that[name].set(a);
    }
  }

  this.alterArea = function() {

  }

  this.operateGrid = function(s, e, state) {
    for(grid in that.grids) {
      var x1 = (s.x - that.grids[grid].position.left),
        y1 = (s.y - that.grids[grid].position.top),
        x2 = (e.x - that.grids[grid].position.left);
      if((x1 > 0 && x1 < that.grids[grid].position.width)
      && (y1 > 0 && y1 < that.grids[grid].position.height)
      && (x2 > 0 && x2 < that.grids[grid].position.width)) {
        if(state == 'move' || state == 'start') that.grids[grid].paintColor(y1, x1, x2, state);
        else if(state == 'stop') that.grids[grid].gridLogic(y1, x1, x2);
        return;
      }
    }
  }

  /*this.operateHeader = function(p, s) {
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
  }*/
}
