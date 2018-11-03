function Graphic() {
  var that = this;
  this.grids = [];
  this.others = [];

  this.addGraphic = function(label, type, musicScore, position) {
    if(type == 'grid') {
      that.grids[label]= new Grid();
      that.grids[label].set(label, musicScore, position);
    } else if(type == 'keyboard') {
      that.others[label] = new Keyboard();
      that.others[label].set(position, 5);
    } else if(type == 'drums') {
      that.others[label] = new Drums();
      that.others[label].set(position);
    }
  }

  this.alterGraphic = function(label, part, newDetail) {
    if(that.grids[label] != null && (part == 'musicScore' || part == 'position'))
      that.grids[label].alter(part, newDetail);
  }

  this.operateGrid = function(s, e, state) {
    for(grid in that.grids) {
      var x1 = (s.x - that.grids[grid].position.left),
        y1 = (s.y - that.grids[grid].position.top),
        x2 = (e.x - that.grids[grid].position.left);
      if((x1 > 0 && x1 < that.grids[grid].position.height/gRows[grid]*1.62*gColumns)
      && (y1 > 0 && y1 < that.grids[grid].position.height)
      && (x2 > 0 && x2 < that.grids[grid].position.height/gRows[grid]*1.62*gColumns)) {
        if(state == 'move' || state == 'start') that.grids[grid].paintColor(y1, x1, x2, state);
        else if(state == 'stop') that.grids[grid].gridLogic(y1, x1, x2);
        return;
      }
    }
  }
}
