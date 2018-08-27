function Graphic() {
  var that = this;
  this.grids = [];
  this.others = [];

  this.addGraphicForTone = function(label, instrument, type, musicScore, position) {
    if(type == 'grid') {
      that.grids[label]= new Grid();
      that.grids[label].set(instrument, musicScore, position);
    } else {
      that.others[label] = new Keyboard();
      that.others[label].set(position, 5);
    }
  }

  this.addGraphicForDrum = function(label, type, musicScore, position) {
    if(type == 'grid') {
      that.grids[label] = new Grid();
      that.grids[label].set('drums', musicScore, position);
    } else {
      that.others[label] = new Drums();
      that.others[label].set(position);
    }
  }

  this.alterGraphic = function(label, part, newDetail) {
    if(that.grids[label] != null && (part == 'instrument' || part == 'musicScore' || part == 'position'))
      that.grids[label].alter(part, newDetail);
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
  }*/
}
