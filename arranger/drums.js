function Drums() {
  var that = this;
  var body = document.getElementsByTagName('body')[0];
  that.widths = [];
  that.heights = [];

  this.set = function(a) {
    that.left = a.left;
    that.top = a.top + 50;
    that.width = a.width;
    that.height = a.height;
    that.setDrums();
  }

  this.setDrums = function() {
    that['drum'] = that.addImg('drum','./img/bassDrum.png', 0.3, 0.5, 0.27, 0.38, 6);
    that['snare'] = that.addImg('snare', './img/snareDrum.png', 0.245, 0.5, 0.11, 0.28, 8);
    that['hihat'] = that.addImg('hihat', './img/hihat.png', 0.148, 0.3, 0.09, 0.09, 10);
    that['lowTom'] = that.addImg('lowTom', './img/floorTom.png', 0.43, 0.45, 0.28, 0.55, 10);
    that['midTom'] = that.addImg('midTom', './img/rackTomRight.png', 0.39, 0.36, 0.19, 0.19, 9);
    that['highTom'] = that.addImg('highTom', './img/rackTomLeft.png', 0.3, 0.34, 0.16, 0.16, 9);
    that['crash1'] = that.addImg('crash1', './img/crashCymbal1.png', 0.29, 0.12, 0.12, 0.12, 6);
    that['crash2'] = that.addImg('crash2', './img/crashCymbal2.png', 0.56, 0.27, 0.12, 0.12, 6);
    that['ride'] = that.addImg('ride', './img/rideCymbal.png', 0.5, 0.1, 0.13, 0.13, 6);

    that.addImg('', './img/snareDrumStand.png', 0.25, 0.42, 0.1, 0.5, 7);
    that.addImg('', './img/hihatStand.png', 0.06, 0.13, 0.3, 0.78, 5);
    that.addImg('', './img/crashCymbalStand1.png', 0.13, 0.16, 0.32, 0.6, 5);
    that.addImg('', './img/crashCymbalStand2.png', 0.52, 0.35, 0.32, 0.55, 5);
    that.addImg('', './img/rideCymbalStand.png', 0.47, 0.13, 0.2, 0.6, 5);
  }

  this.addImg = function(name, url, l, t, w, h, zi) {
    var img = document.createElement('img');
    img.style.position = 'absolute';
    img.src = url;
    img.style.left = (that.left + that.width * l).toString() + 'px';
    img.style.top = (that.top + that.height * t).toString() + 'px';
    that.widths[name] = that.width * w ; img.style.width = that.widths[name] + 'px';
    that.heights[name] = that.height * h; img.style.height = that.heights[name] + 'px';
    img.style['z-index'] = zi;
    img.alt = 'img';
    body.appendChild(img);
    return img;
  }

  this.hitDrum = function(drumKind) {
    var ratio = 0.98, i = -0.01;
    var inte = window.setInterval(function() {
      that[drumKind].style.width = that.widths[drumKind] * ratio + 'px';
      that[drumKind].style.height = that.heights[drumKind] * ratio + 'px';
      if(ratio <= 0.95) {
        i = 0.01;
      }
      else if(ratio >= 1) {
        window.clearInterval(inte);
      }
      ratio += i;
    }, 20);
  }
}
