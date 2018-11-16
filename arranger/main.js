var body = document.getElementsByTagName('body')[0];
var header = document.getElementById('header');
var canvas = document.getElementById('canvas');
var cav = canvas.getContext('2d');

var graphicInfo = {
  positions : [[], [], [], [], []],
  numOfGraphics : 5,
  gColumns : 32,
  gRows : [12, 12, 12, 0, 0],
  gRows0 : 12,//gRows[0]
  padding : 6
};

var musicScore = new Array(graphicInfo.numOfGraphics);//used to storage music score
for(var p = 0; p < graphicInfo.numOfGraphics; p++) {
  musicScore[p] = new Array(graphicInfo.gRows[p]);
  for(var i = 0; i < graphicInfo.gRows[p]; i++) {
    musicScore[p][i] = new Array(graphicInfo.gColumns);
    for(var j = 0; j < graphicInfo.gColumns; j++) {
      musicScore[p][i][j] = 0;
    }
  }
}

var musicInfo = {
  beatTime : 0.5,
  allInstruments : ['piano', 'piano', 'piano', 'piano', 'piano']
};

var posChange = {x : 0, y : 0};
var scale_gain = 1;

var musicLength = 0;

var graphic = new Graphic();

var audio = new Audio();

var download = new Download();

var upload = new Upload();

var player = new Player();

var setting = new Setting();

graphic.init();
