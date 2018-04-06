document.getElementById('play').onclick = function() {
  initMusicArray();
  area.operateMusicArrayAndMusicInfo();
  myAudio.start();
}

canvas.onmousedown = function(e) {
  var pos = getPos(e);
  area.operateGrid(pos);
}

function getPos(e) {
  var bbox = canvas.getBoundingClientRect(),
    x = e.clientX - bbox.left * (canvas.width / bbox.width),
    y = e.clientY - bbox.top * (canvas.height / bbox.height);
    return {x : x, y : y};
}
