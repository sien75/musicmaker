var bpm = 120;//define the bpm

//instrumentName(pitch, duration, volume), 'duration' means how long the note lasts.
//eg. duration = 4: 4*beatTime=2s, this note will last 2 seconds.
/*var musicArray1 = [
  [piano(C4, 1)],
  [piano(C4, 1)],
  [piano(G4, 1)],
  [piano(G4, 1)],
  [piano(A4, 1)],
  [piano(A4, 1)],
  [piano(G4, 1)]
];
var musicInfo1 = {
  beatTime : 60/bpm,
  pieceTime : musicArray1.length*60/bpm,
  allInstruments : ['piano']
}*/
var musicArray2 = [
  [ [piano(c4)], [        ] ],
  [ [piano(d4)], [piano(c4)] ],
  [ [piano(E5)], [piano(d4)] ],
  [ [piano(c4)], [piano(E5)] ],
  [ [piano(c4)], [piano(c4)] ],
  [ [piano(d4)], [piano(c4)] ],
  [ [piano(E5)], [piano(d4)] ],
  [ [piano(c4)], [piano(E5)] ],
  [ [         ], [piano(c4)] ]
];
var musicInfo2 = {
  beatTime : 60/bpm,
  pieceTime : musicArray2.length*60/bpm,
  allInstruments : ['piano']
};

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9;
var cav = canvas.getContext('2d');
cav.fillRect(0, 0, canvas.width, canvas.height);
cav.stroke();

var keyboard = new Keyboard();
var myAudio = new MyAudio();
keyboard.set(canvas, 10, 10, canvas.width / 1.3 - 10, canvas.height / 3 - 10);

document.getElementById('play').onclick = function() {
  myAudio.set(window['musicArray' + 2], window['musicInfo' + 2], keyboard);
  myAudio.start();
}
