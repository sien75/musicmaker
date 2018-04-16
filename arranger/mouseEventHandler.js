document.getElementById('play').onclick = function() {
  initMusicArray();
  area.operateMusicArrayAndMusicInfo();
  myAudio.start();
}

canvas.onmousedown = function(e) {
  window['ifDown'] = true;
  area.operateGrid(getPos(e), 'click');
}

document.getElementsByTagName('body')[0].onmouseup = function() {
  window['ifDown'] = false;
}

canvas.onmousemove = function(e) {
  if(window['ifDown']) {
    area.operateGrid(getPos(e), 'move');
  }
}

function getPos(e) {
  var bbox = canvas.getBoundingClientRect(),
    x = e.clientX - bbox.left * (canvas.width / bbox.width),
    y = e.clientY - bbox.top * (canvas.height / bbox.height);
    return {x : x, y : y};
}
