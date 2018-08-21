var bpm = 240;
var body = document.getElementsByTagName('body')[0];

var musicArray = new Array(40);//used to storage music score
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
//for(var p = 0; p < 3; p++) musicScore[p] = new Array();

function addAreas(position_x, position_y, size) {
  area.addAreaForTone('piano', 'piano', 'grid', musicScore[0],
    {left: 4 + position_x,
    top: 4 + position_y,
    width: canvas.width * size - 8,
    height: canvas.height * size - 8});

  area.addAreaForTone('bass', 'bass', 'grid', musicScore[1],
    {left: 4 + position_x,
    top: canvas.height *size + 4 + position_y,
    width: canvas.width * size - 8,
    height: canvas.height * size - 8});

  area.addAreaForTone('elecGuitar', 'elecGuitar', 'grid', musicScore[2],
    {left: 4 + position_x,
    top: 2 * canvas.height * size + 4 + position_y,
    width: canvas.width * size - 8,
    height: canvas.height * size - 8});
}

addAreas(0, 0, 1);

var myAudio = new MyAudio();
