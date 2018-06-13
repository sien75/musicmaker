function AttrChange() {
  var that = this,
    newCanvas = document.createElement('canvas'),
    ctx = newCanvas.getContext('2d');
  body.appendChild(newCanvas);
  newCanvas.style.display = 'none',
  newCanvas.style.position = 'absolute',
  newCanvas.style['z-index'] = 15,
  newCanvas.style.background = 'rgba(0,0,0,0.01)',
  newCanvas.width = window.innerWidth,
  newCanvas.height = window.innerHeight * 0.9;

  this.set = function(ifIsDrum, singleW, attrArray) {
    that.singleW = singleW;
    that.attrArray = attrArray;
    that.ifIsDrum = ifIsDrum;
  }

  this.click = function(x) {
    var intX = parseInt(x / that.singleW);
    newCanvas.style.display = 'block';
    var transparency = 0,
      inte = window.setInterval(function() {
      if(transparency >= 0.5) {
        window.clearInterval(inte);
        that.popupScreen();
      }
      newCanvas.style.background = 'rgba(0,0,0,' + transparency + ')';
      transparency+=0.05;console.log('a');
    }, 30);
  }

  this.gradientPiece = function(transparency) {
  }

  this.popupScreen = function() {
  }

  newCanvas.onclick = function() {
    var transparency = 0.5,
      inte = window.setInterval(function() {
      if(transparency <= 0.05) {
        window.clearInterval(inte);
        newCanvas.style.display = 'none';
      }
      newCanvas.style.background = 'rgba(0,0,0,' + transparency + ')';
      transparency-=0.05;console.log('a');
    }, 30);
  }
}
