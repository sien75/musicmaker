function Area(canvas) {
  var that = this;

  this.addAreaForTone = function(instrument, a) {
    that[instrument] = new Keyboard();
    that[instrument].set(canvas, a.left + a.width * 0.01, a.top + a.height * 0.1, a.width * 0.8, a.height * 0.8);
    that.drawOutline(a);
  }

  this.addAreaForDrum = function(a) {
    that.drum = new Drum();
    that.drum.set(a);
    that.drawOutline(a);
  }

  this.drawOutline = function(a) {
    var cav = canvas.getContext('2d');
    cav.save();
    cav.strokeStyle = 'rgb(200, 200, 200)';
    cav.beginPath();
    cav.moveTo(a.left + 2, a.top + 2);
    cav.lineTo(a.left + a.width - 4, a.top + 2);
    cav.lineTo(a.left + a.width - 4, a.top + a.height - 4);
    cav.lineTo(a.left + 2, a.top + a.height - 4);
    cav.closePath();
    cav.stroke();
    cav.restore();
  }
}
