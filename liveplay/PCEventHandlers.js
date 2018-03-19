if(!browser.versions.mobile) {
  //mouse event handlers
  canvas.onmousedown = function (event) {
    var pos;
    if(event.clientX) pos = getPos(event);
    noteRecord = myCanvas.positionToNote(pos.x, pos.y),
    rectRecord = myCanvas.noteToRect(noteRecord);
    if(noteRecord && rectRecord) {
      clickOn = true;
      positionListener.a = noteRecord;
      myAudio.startNote(noteRecord);
      myCanvas.paintKey(rectRecord, 'click');
    }
  };

  canvas.onmousemove = function(event) {
    if(clickOn) {
      var pos;
      if(event.clientX) pos = getPos(event);
      if(myCanvas.ifPositionChanged(pos.x, pos.y, positionListener)) {
        myAudio.stopNote(noteRecord);
        myCanvas.paintKey(rectRecord, 'release');
        noteRecord = myCanvas.positionToNote(pos.x, pos.y),
        rectRecord = myCanvas.noteToRect(noteRecord);
        myAudio.startNote(noteRecord);
        myCanvas.paintKey(rectRecord, 'click');
      }
    }
  };

  canvas.onmouseup = function() {
    myAudio.stopNote(noteRecord);
    myCanvas.paintKey(rectRecord, 'release');
    clickOn = false;
  };

  //keyboard event handlers
  var noteOnJudge = new Array(12);
  noteOnJudge.forEach(function(n) {n = 0;});

  body.onkeydown = function(event) {
    var ew = event.which;
    if((ew == 75 || ew == 37) && noteOnJudge.indexOf(1) < 0) {
      var v = parseInt(document.getElementById('keyboardGroup').value);
      computerKeyboardGroup = document.getElementById('keyboardGroup').value
      = v > -parseInt(myCanvas.setOrGetGroupNum() / 2) ? v - 1 : v;
      myCanvas.paintIndicator(computerKeyboardGroup);
    }
    else if((ew == 76 || ew == 39) && noteOnJudge.indexOf(1) < 0) {
      var v = parseInt(document.getElementById('keyboardGroup').value);
      computerKeyboardGroup = document.getElementById('keyboardGroup').value =
        v < parseInt((myCanvas.setOrGetGroupNum() - 1) / 2) ? v + 1 : v;
      myCanvas.paintIndicator(computerKeyboardGroup);
    }
    else {
      var idx = keyUpAndDownTable.indexOf(ew);
      if(idx >= 0) {
        var i = idx + 48 + computerKeyboardGroup * 12;
        myAudio.startNote(i);
        myCanvas.paintKey(myCanvas.noteToRect(i), 'click');
        noteOnJudge[idx] = 1;
      }
    }
  }

  body.onkeyup = function(event) {
    var ew = event.which,
      idx = keyUpAndDownTable.indexOf(ew);
    if (idx >= 0) {
      var i = idx + 48 + computerKeyboardGroup * 12;
      myAudio.stopNote(i);
      myCanvas.paintKey(myCanvas.noteToRect(i), 'release');
      noteOnJudge[idx] = 0;
    }
  }
}
