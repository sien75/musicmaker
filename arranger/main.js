var bpm = 240;

var musicArray = new Array(40);
var musicInfo = {};
function initMusicArray() {
  for(var ii=0; ii < musicArray.length; ii++) {
    musicArray[ii] = new Array(2);
    musicArray[ii][0] = new Array();
    musicArray[ii][1] = new Array();
  }
  musicInfo.beatTime = 60 / bpm;
  musicInfo.pieceLength = 0;
  musicInfo.allInstruments = [];
}
initMusicArray();

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9;
var cav = canvas.getContext('2d');
cav.fillStyle = 'black';
cav.fillRect(0, 0, canvas.width, canvas.height);

var area = new Area();
area.addAreaForTone('piano', 'grid',
  {left: 5,
  top: 5,
  width: 7 * canvas.width / 15 - 5,
  height: canvas.height / 2 - 5});

area.addAreaForTone('bass', 'grid',
  {left: 7 * canvas.width / 15 + 5,
  top: 5,
  width: 7 * canvas.width / 15 - 5,
  height: canvas.height / 2 - 5});

area.addAreaForDrum('grid',
  {left: 5,
  top: canvas.height / 2 + 5,
  width: 7 * canvas.width / 15 - 5,
  height: canvas.height / 2 - 5});

area.addAreaForTone('elecGuitar', 'grid',
  {left: 7 * canvas.width / 15 + 5,
  top: canvas.height / 2 + 5,
  width: 7 * canvas.width / 15 - 5,
  height: canvas.height / 2 - 5});

var myAudio = new MyAudio();
