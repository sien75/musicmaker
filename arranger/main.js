var bpm = 240;//define the bpm

//instrumentName(pitch, duration, volume), 'duration' means how long the note lasts.
//eg. duration = 4: 4*beatTime=2s, this note will last 2 seconds.
var musicArray2 = [
  [ [drum(), hihat()],      [] ],
  [ [hihat()],              [drum(), hihat()] ],
  [ [snare(), hihat()],     [hihat()] ],
  [ [hihat()],              [snare(), hihat()] ],
  [ [drum(), hihat()],      [hihat()] ],
  [ [hihat()],              [drum(), hihat()] ],
  [ [snare(), hihat()],     [hihat()] ],
  [ [hihat()],              [snare(), hihat()] ],
  [ [drum(), hihat()],      [hihat()] ],
  [ [hihat()],              [drum(), hihat()] ],
  [ [snare(), hihat()],     [hihat()] ],
  [ [hihat()],              [snare(), hihat()] ],
  [ [drum(), hihat()],      [hihat()] ],
  [ [hihat()],              [drum(), hihat()] ],
  [ [snare(), hihat()],     [hihat()] ],
  [ [crash1(), hihat()],    [snare(), hihat()] ],
  [ [drum(), hihat()],      [hihat()] ],
  [ [hihat()],              [crash1(), drum(), hihat()] ],
  [ [snare(), hihat()],     [hihat()] ],
  [ [hihat()],              [snare(), hihat()] ],
  [ [drum(), hihat()],      [hihat()] ],
  [ [hihat()],              [drum(), hihat()] ],
  [ [snare(), hihat()],     [hihat()] ],
  [ [hihat()],              [snare(), hihat()] ],
  [ [drum(), hihat()],      [hihat()] ],
  [ [hihat()],              [drum(), hihat()] ],
  [ [snare(), hihat()],     [hihat()] ],
  [ [hihat()],              [snare(), hihat()] ],
  [ [drum(), hihat()],      [hihat()] ],
  [ [hihat()],              [drum(), hihat()] ],
  [ [snare(), hihat()],     [hihat()] ],
  [ [snare(), hihat()],     [snare(), hihat()] ],
  [ [],                     [] ],
  [ [],                     [snare(), hihat()] ],
];
var musicInfo2 = {
  beatTime : 60/bpm,
  pieceTime : musicArray2.length*60/bpm,
  allInstruments : ['piano', 'bass', 'elecGuitar', 'drum', 'snare', 'hihat', 'crash1', 'lowTom']
};

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9;
var cav = canvas.getContext('2d');
cav.save();
cav.fillStyle = 'black';
cav.fillRect(0, 0, canvas.width, canvas.height);
cav.restore();

var area = new Area(canvas);
area.addAreaForTone('bass',
  {left: 0,
  top: 4,
  width: canvas.width / 2,
  height: canvas.height / 6 - 4});

area.addAreaForTone('piano',
  {left: 0,
  top: canvas.height / 6,
  width: canvas.width / 2,
  height: canvas.height / 6});

area.addAreaForTone('elecGuitar',
  {left: 0,
  top: 2 * canvas.height / 6,
  width: canvas.width / 2,
  height: canvas.height / 6});

area.addAreaForDrum(
  {left: 0,
  top: 3 * canvas.height / 6,
  width: canvas.width / 2,
  height: 3 * canvas.height / 6});

var myAudio = new MyAudio(area);

document.getElementById('play').onclick = function() {
  myAudio.set(window['musicArray' + 2], window['musicInfo' + 2], area);
  myAudio.start();
}
