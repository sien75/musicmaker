var body = document.getElementsByTagName('body')[0];
var header = document.getElementById('header');
var canvas = document.getElementById('canvas');
var cav = canvas.getContext('2d');

var graphicInfo = {
  numOfGraphics : 5,
  gColumns : 32,
  gRows : [12, 12, 12, 0, 0],
  gRows0 : 12//gRows[0]
};

var musicScore = new Array();//used to storage music score
for(var pq = 0; pq < graphicInfo.numOfGraphics; pq++) {
  musicScore[pq] = new Array(graphicInfo.gRows[pq] * graphicInfo.gColumns);
  for(var qp = 0; qp < graphicInfo.gRows[pq] * graphicInfo.gColumns; qp++) musicScore[pq][qp] = 0;
}

var musicInfo = {
  beatTime : 0.5,
  allInstruments : ['piano', 'piano', 'piano', 'piano', 'piano']
};

var musicLength = 0;

var graphic = new Graphic();

var audio = new Audio();

var player = new Player();

var setting = new Setting();

var download = new Download();

var upload = new Upload();

graphic.init();
