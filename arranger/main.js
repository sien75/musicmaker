var bpm = 180;
var body = document.getElementsByTagName('body')[0];
var header = document.getElementById('header');
var numOfGraphics = 5;
var gColumns = 32, gRows = new Array(numOfGraphics);
gRows = [12, 12, 12, 0, 0];
var gRows0 = gRows[0];

var musicScore = new Array();//used to storage music score
for(var pq = 0; pq < numOfGraphics; pq++) {
  musicScore[pq] = new Array(gRows[pq] * gColumns);
  for(var qp = 0; qp < gRows[pq] * gColumns; qp++) musicScore[pq][qp] = 0;
}
var musicInfo = {};
musicInfo.beatTime = 60 / bpm;
musicInfo.pieceLength = 0;
musicInfo.allInstruments = ['piano', 'piano', 'piano', 'piano', 'piano'];

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.95 - 45;
var cav = canvas.getContext('2d');
cav.fillStyle = 'black';
cav.fillRect(0, 0, canvas.width, canvas.height);

var graphic = new Graphic();

function mainPositions(baseL, baseT, baseW, baseH, changes) {
  return {
      left : (baseL+ 7) * changes[2] + changes[0],
      top : (baseT + 7) * changes[2] + changes[1],
      width : (baseW - 14) * changes[2],
      height : (baseH - 14) * changes[2]
    };
}

function paint() {
  var label = 0, totalHeight = 0;
  for(; label < numOfGraphics; label++) {
    graphic.addGraphic(label, 'grid', musicScore[label],
      mainPositions(0, totalHeight, canvas.width, (canvas.height-14)*gRows[label]/gRows[0]+14, [0,0,1]) );
    totalHeight += (canvas.height - 14) * gRows[label] / gRows[0] + 14;
  }
}

function rePaint() {
  cav.fillStyle = 'black';cav.fillRect(0, 0, canvas.width, canvas.height);
  var label = 0, totalHeight = 0;
  for(; label < numOfGraphics; label++) {
    if(gRows[label] == 0) continue;
    graphic.alterGraphic(label, 'position', mainPositions(0, totalHeight,
      canvas.width, (canvas.height-14)*gRows[label]/gRows0+14,
      [window['posChange'].x, window['posChange'].y, window['scale_gain']]) );
    totalHeight += (canvas.height-14)*gRows[label]/gRows0+14;
  }
}

paint();

var audio = new Audio();

var setting = new Setting();

var player = new Player();
