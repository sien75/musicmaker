function DrawGrid() {
  var that = this, ctx;

  this.set = function(_ctx, _left, _top, _width, _height, _singleH, _singleW) {
    ctx = _ctx;
    that.left = _left; that.top = _top;
    that.width = _width; that.height = _height;
    that.singleH = _singleH; that.singleW = _singleW;
    that.initLine();
  }

  this.initLine = function() {
    that.lineHorizontal();
    that.lineVertical();
  }

  this.lineHorizontal = function() {
    var c = ctx, h = that.singleH;
    c.beginPath(); c.strokeStyle = '#aaa';
    for (var i = 0; i < 22; i++) {
      c.moveTo(that.left, that.top + i * h);
      c.lineTo(that.left + that.width, that.top + i * h);
    }
    c.stroke();
    c.beginPath(); c.strokeStyle = '#eee';
    for (var i = 0; i < 4; i++) {
      c.moveTo(that.left, that.top + i * h * 7);
      c.lineTo(that.left + that.width, that.top + i * h * 7);
    }
    c.stroke();
  }

  this.lineVertical = function() {
    var c = ctx, w = that.singleW;
    c.beginPath(); c.strokeStyle = '#aaa';
    for (var i = 0; i < 33; i++) {
      c.moveTo(that.left + i * w, that.top);
      c.lineTo(that.left + i * w, that.top + that.height);
    }
    c.stroke();
  }


}
