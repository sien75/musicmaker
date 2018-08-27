var bpm = 180;
var body = document.getElementsByTagName('body')[0];
var numOfGraphics = 0;
var gColumns = 32, gRows = 36;

var musicScore = new Array();//used to storage music score
for(var pq = 0; pq < 3; pq++) {
  musicScore[pq] = new Array(gRows * gColumns);
  for(var qp = 0; qp < gRows * gColumns; qp++) musicScore[pq][qp] = 0;
}
var musicInfo = {};
musicInfo.beatTime = 60 / bpm;
musicInfo.pieceLength = 0;
musicInfo.allInstruments = ['piano', 'bass', 'drums'];

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9;
var cav = canvas.getContext('2d');
cav.fillStyle = 'black';
cav.fillRect(0, 0, canvas.width, canvas.height);

var graphic = new Graphic();

function mainPositions(baseL, baseT, baseW, baseH, changes) {
  return {
      left : baseL + changes[0] + 4,
      top : baseT + changes[1] + 4,
      width : baseW * changes[2] - 8,
      height : baseH * changes[2] - 8
    };
}

function addGraphics() {
  var label = 0;
  graphic.addGraphicForTone(label, musicInfo.allInstruments[label], 'grid', musicScore[label],
    mainPositions(0, 0, canvas.width, canvas.height, [0,0,1]) );
  label++;
  graphic.addGraphicForTone(label, musicInfo.allInstruments[label], 'grid', musicScore[label],
    mainPositions(0, canvas.height, canvas.width, canvas.height, [0,0,1]) );
  label++;
  graphic.addGraphicForTone(label, musicInfo.allInstruments[label], 'grid', musicScore[label],
    mainPositions(0, 2 * canvas.height, canvas.width, canvas.height, [0,0,1]) );
  numOfGraphics = label + 1;
}

addGraphics();

var audio = new Audio();

var player = new Player();
