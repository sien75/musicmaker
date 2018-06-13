function TimeBar() {
  var that = this, ctx;

  this.set = function(_left, _top, _width, _height) {
    that.left = _left;
    that.top = _top + 50;
    that.width = _width;
    that.height = _height;
    ctx = that.addCanvas();
  }

  this.addCanvas = function() {
    this.canvas = document.createElement('canvas');
    that.canvas.style.position = 'absolute';
    that.canvas.style.display = 'none';
    that.canvas.style.left = that.left + 'px';
    that.canvas.style.top = that.top + 'px';
    that.canvas.style.width = that.width + 'px';
    that.canvas.style.height = that.height + 'px';
    that.canvas.style['z-index'] = 20;
    body.appendChild(canvas);
    return that.canvas.getContext('2d');
  }

  this.start = function(pos) {

    if(!pos) pos = 0;

  }

  this.pause = function() {

  }

  this.stop = function() {

  }
}
