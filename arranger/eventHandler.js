document.getElementById('play').onclick = function () {
  player.play();
}

document.getElementById('stop').onclick = function () {
  player.stop();
}

document.getElementById('setting').onclick = function () {
  setting.showSetting(-1);
}

document.getElementById('download').onclick = function () {
  var cf = confirm("do you want to download the music score on the sceen?");
  if(cf == true) download.saveAs();
}

document.getElementById("upld").onchange = function () {
  var file = this.files[0];
  upload.ul(file);
}

body.oncontextmenu = function (e) {
  e.preventDefault();
}

body.onselectstart = function (e) {
  e.preventDefault();
}

canvas.onmousedown = function (e) {
  if(e.button == 2) {
    window['ifRightDown'] = true;
    window['rightPos'] = getPos(e);
  }
  else {
    window['ifLeftDown'] = true;
    window['leftDownPos'] = getPos(e);
    graphic.operateGrid(window['leftDownPos'], getPos(e), 'start');
  }
}

canvas.onmouseup = function (e) {
  if(e.button == 2) {
    window['ifRightDown'] = false;
  }
  else if(window['ifLeftDown']){
    window['ifLeftDown'] = false;
    graphic.operateGrid(window['leftDownPos'], getPos(e), 'stop');
  }
}

canvas.onmousemove = function (e) {
  if(window['ifRightDown']) {
    var currentPos = getPos(e);
    posChange.x += (currentPos.x - window['rightPos'].x);
    posChange.y += (currentPos.y - window['rightPos'].y);
    window['rightPos'] = currentPos;
    graphic.exeGra();
  }
  else if(window['ifLeftDown']) {
    graphic.operateGrid(window['leftDownPos'], getPos(e), 'move');
  }
}

if(document.addEventListener) {
  document.addEventListener('DOMMouseScroll',scrollFunc,false);
}
window.onmousewheel = document.onmousewheel = scrollFunc;

function scrollFunc(e) {
  var delta = e.wheelDelta || e.detail,
    currentPos = getPos(e),
    correction = {x : 0, y : 0};
    correction.x += 1.1 * (currentPos.x - posChange.x) - 0.05 * canvas.width;
    correction.y += 1.1 * (currentPos.y - posChange.y) - 0.05 * canvas.height;
  if(delta > 0) {
    scale_gain *= 1.03;
    posChange.x -= correction.x * 0.03;
    posChange.y -= correction.y * 0.03;
  } else if(delta < 0) {
    scale_gain /= 1.03;
    posChange.x += correction.x * 0.03;
    posChange.y += correction.y * 0.03;
  }
  graphic.exeGra();
}

window.onresize = function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.95 - 45;
  graphic.exeGra();
}

function getPos(e) {
  var bbox = canvas.getBoundingClientRect(),
    x = e.clientX - bbox.left * (canvas.width / bbox.width),
    y = e.clientY - bbox.top * (canvas.height / bbox.height);
    return {x : x, y : y};
}
