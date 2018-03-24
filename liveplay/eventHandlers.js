var canvas = document.getElementById('canvas'),
  body = document.getElementsByTagName('body')[0],//these two variables will be used by event functions

  clickOn = false,
  positionListener = {},
  noteRecord, rectRecord,//these three variables will be used by mouse event functions, in 'PCEventHandlers.js'

  keyUpAndDownTable = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74],
  computerKeyboardGroup = 0,//used by keyboard event functions, in 'PCEventHandlers.js'

  noteRecordRect = new Array();//used by mobile device event functions, in 'mobileEventHandlers.js'

function getPos(e) {//used by event functions in 'PCEventHandlers.js' and 'mobileEventHandlers.js'
  var bbox = canvas.getBoundingClientRect(),
    x = e.clientX - bbox.left * (canvas.width / bbox.width),
    y = e.clientY - bbox.top * (canvas.height / bbox.height);
    return {x : x, y : y};
}

//select event handlers
document.getElementById('selectInstruments').onchange = function() {
  myAudio.importScript(this.value);
}

document.getElementById('octive').onchange = function() {
  myAudio.setOrGetOctive(parseInt(this.value));
}

if(!browser.versions.mobile)
  document.getElementById('keyboardGroup').onchange = function() {
    myCanvas.paintIndicator(parseInt(this.value));
    computerKeyboardGroup = parseInt(this.value);
  }

document.getElementById('groupNum').onchange = function() {
  var tv = parseInt(this.value);
  myCanvas.setOrGetGroupNum(tv);
  myAudio.setOrGetOctive(0);
  handleOctive(tv);
  handleKeyboardGroup(tv);
}
