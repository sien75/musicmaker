var bpm = 120;//define the bpm

//instrumentName(pitch, duration, volume), 'duration' means how long the note lasts.
//eg. 4: 4*beatTime=2s, this note will last 2 seconds.
var musicArray1 = [
  [piano(C4, 4)],
  [piano(C4, 4)],
  [piano(G4, 4)],
  [piano(G4, 4)],
  [piano(A4, 4)],
  [piano(A4, 4)],
  [piano(G4, 4)]
];
var musicInfo1 = {
  beatTime : 60/bpm,
  pieceTime : musicArray1.length*60/bpm,
  allInstruments : ['piano']
}

var musicArray2 = [
  [bass(C4, 1)],
  [bass(D4, 1)],
  [bass(E5, 1)],
  [bass(C4, 1)],
  [bass(C4, 1)],
  [bass(D4, 1)],
  [bass(E5, 1)],
  [bass(C4, 1)],
];
var musicInfo2 = {
  beatTime : 60/bpm,
  pieceTime : musicArray2.length*60/bpm,
  allInstruments : ['bass']
};

var myAudio = new MyAudio();

function start(choice) {
  myAudio.set(window['musicArray' + choice], window['musicInfo' + choice]);
  myAudio.start();
}
