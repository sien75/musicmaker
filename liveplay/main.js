var canvas = document.getElementById('canvas'),
  AudioContextFunc = window.AudioContext || window.webkitAudioContext,
  audioContext = new AudioContextFunc(),
  player = new WebAudioFontPlayer(),
  loadedInstruments = [],
  currentInstrument = {},
  currentPlay = new Array(),
  octive = 0,
  continuousTable = {
    '0000_Aspirin': false,
  },

  clickOn = false,
  positionListener = {},
  noteRecord, rectRecord,

  noteRecordRect = new Array(),//用于移动设备即多点控制的地方
  mobileWindowSizeListener,
  sizeRecord = {},

  keyUpAndDownTable = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74],
  keyUpAndDownGroup = 0,

  myCanvas = new MyCanvas(),
  gNum,

  browser = new Browser();

function init() {
  myCanvas.init();
  loadScript();
  browser.versions.mobile ? initForMobile() : initForPC();
  gNum = myCanvas.setOrGetGroupNum();
}

function loadScript() {
  document.getElementById('loading').style.display = 'inline-block';
  importScript('../sound/0000_Aspirin_sf2_file.js', function() {
    player.loader.decodeAfterLoading(audioContext, '_tone_0000_Aspirin_sf2_file');
    loadedInstruments[loadedInstruments.length] = '0000_Aspirin';
    currentInstrument.tag = '0000_Aspirin';
    currentInstrument.isContinuous = false;
    document.getElementById('loading').style.display = 'none';
  });
}

function importScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.onload = function(){callback();};
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function initForPC() {
  var gParent = document.getElementById('groupNum'),
    gChild1 = document.getElementById('g1'),
    gChild2 = document.getElementById('g2');
  gParent.removeChild(gChild1);
  gParent.removeChild(gChild2);

  handleOctive();
  handleKeyboardGroup();
}

function initForMobile() {
  var gParent = document.getElementById('groupNum'),
    gChild4 = document.getElementById('g4'),
    gChild5 = document.getElementById('g5');
  gParent.removeChild(gChild4);
  gParent.removeChild(gChild5);

  document.getElementById('keyboardGroup').style.display = 'none';
  handleOctive();
  mobileWindowSizeListener = mobileWindowSizeListen();
}

function handleOctive() {
  var octs = ['n2', '2', 'n1', '1'];
  for(var i=0; i < gNum - 1; i++)
    document.getElementById('o' + octs[i]).style.display = 'none';
  for(; i < [-2, 2, -1, 1].length; i++)
    document.getElementById('o' + octs[i]).style.display = 'block';
  document.getElementById('octive').value = 0;
  octive = 0;
}

function handleKeyboardGroup() {
  for (var i = 5; i > gNum; i--)
  document.getElementById('k' + i).style.display = 'none';
  for(; i > 0; i--)
  document.getElementById('k' + i).style.display = 'block';
  document.getElementById('keyboardGroup').value = 0;
  keyUpAndDownGroup = 0;
  myCanvas.paintIndicator(keyUpAndDownGroup);
}

function mobileWindowSizeListen() {
  return window.setInterval(function() {
    if(sizeRecord.width != window.innerWidth || sizeRecord.height != window.innerHeight)
      myCanvas.init();
    sizeRecord.width = window.innerWidth;
    sizeRecord.height = window.innerHeight;
  }, 1000);
}

function startNote(note) {
  if (note && !currentPlay[note]) {
    currentPlay[note] = player.queueWaveTable(audioContext, audioContext.destination,
      window['_tone_' + currentInstrument.tag + '_sf2_file'], 0/*currentTime*/,
      note + 12 * octive, currentInstrument.isContinuous?999:1.5, 0.5);
  }
}

function stopNote(note) {
  if (currentPlay[note]&&currentInstrument.isContinuous) {
    currentPlay[note].cancel();
  }
  currentPlay[note] = 0;
}

function getPos(e) {
  var bbox = canvas.getBoundingClientRect(),
    x = e.clientX - bbox.left * (canvas.width / bbox.width),
    y = e.clientY - bbox.top * (canvas.height / bbox.height);
    return {x : x, y : y};
}

//start
init();
