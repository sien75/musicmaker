var bpm = 240;
var body = document.getElementsByTagName('body')[0];

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
var musicScore = new Array();
for(var p = 0; p < 4; p++) musicScore[p] = new Array(32);
area.addAreaForTone('piano', 'piano', 'grid', musicScore[0],
  {left: 5,
  top: 5,
  width: 7 * canvas.width / 15 - 5,
  height: canvas.height / 2 - 5});

area.addAreaForTone('bass', 'bass', 'grid', musicScore[1],
  {left: 7 * canvas.width / 15 + 5,
  top: 5,
  width: 7 * canvas.width / 15 - 5,
  height: canvas.height / 2 - 5});

area.addAreaForDrum('grid', musicScore[2],
  {left: 5,
  top: canvas.height / 2 + 5,
  width: 7 * canvas.width / 15 - 5,
  height: canvas.height / 2 - 5});

area.addAreaForTone('elecGuitar', 'elecGuitar', 'grid', musicScore[3],
  {left: 7 * canvas.width / 15 + 5,
  top: canvas.height / 2 + 5,
  width: 7 * canvas.width / 15 - 5,
  height: canvas.height / 2 - 5});

var myAudio = new MyAudio();
