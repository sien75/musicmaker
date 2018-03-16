//Select event handlers
document.getElementById('selectInstruments').onchange = function() {
  var a = this.value.split(':'),
    tag = a[0];
  continuousTable[tag] = a[1] == 'y' ? true : false;
  if(loadedInstruments.indexOf(tag) < 0) {
    document.getElementById('loading').style.display = 'inline-block';
    importScript('../sound/'+ tag + '_sf2_file.js', function() {
      player.loader.decodeAfterLoading(audioContext, '_tone_' + tag + '_sf2_file');
      loadedInstruments[loadedInstruments.length] = tag;
      document.getElementById('loading').style.display = 'none';
    });
  }
  currentInstrument.tag = tag;
  currentInstrument.isContinuous = continuousTable[tag];
}

document.getElementById('octive').onchange = function() {
  octive = parseInt(this.value);
}

if(!browser.versions.mobile)
  document.getElementById('keyboardGroup').onchange = function() {
    keyUpAndDownGroup = parseInt(this.value);
    myCanvas.paintIndicator(keyUpAndDownGroup);
  }

document.getElementById('groupNum').onchange = function() {
  myCanvas.setOrGetGroupNum(this.value);
  gNum = myCanvas.setOrGetGroupNum();
  handleOctive();
  handleKeyboardGroup();
}

//Mouse event handlers
if(!browser.versions.mobile) {
  canvas.onmousedown = function (event) {
    var pos;
    if(event.clientX) pos = getPos(event);
    noteRecord = myCanvas.positionToNote(pos.x, pos.y),
    rectRecord = myCanvas.noteToRect(noteRecord);
    if(noteRecord && rectRecord) {
      clickOn = true;
      positionListener.a = noteRecord;
      startNote(noteRecord);
      myCanvas.paintKey(rectRecord, 'click');
    }
  };

  canvas.onmousemove = function(event) {
    if(clickOn) {
      var pos;
      if(event.clientX) pos = getPos(event);
      if(myCanvas.ifPositionChanged(pos.x, pos.y, positionListener)) {
        stopNote(noteRecord);
        myCanvas.paintKey(rectRecord, 'release');
        noteRecord = myCanvas.positionToNote(pos.x, pos.y),
        rectRecord = myCanvas.noteToRect(noteRecord);
        startNote(noteRecord);
        myCanvas.paintKey(rectRecord, 'click');
      }
    }
  };

  canvas.onmouseup = function() {
    stopNote(noteRecord);
    myCanvas.paintKey(rectRecord, 'release');
    clickOn = false;
  };
}

//Touch event handlers
if(browser.versions.mobile) {
  document.addEventListener('touchmove', function() {
    event.preventDefault();
  }, { passive: false });
  document.addEventListener('contextmenu', function(e){
      e.preventDefault();
  });

  canvas.ontouchstart = function(event) {
    var pos;
    if(event.changedTouches) for (var i = 0; i < event.changedTouches.length; i++) {
      pos = getPos(event.changedTouches[i]);
      var n = myCanvas.positionToNote(pos.x, pos.y),
        r = myCanvas.noteToRect(n);
      noteRecordRect[n] = r;
      startNote(n);
      myCanvas.paintKey(r, 'click');
    }
  };

  canvas.ontouchmove = function(event) {
    var pos, trues = new Array();
    if(event.targetTouches) for (var i = 0; i < event.targetTouches.length; i++) {
      pos = getPos(event.targetTouches[i]);
      var n = myCanvas.positionToNote(pos.x, pos.y),
        r = myCanvas.noteToRect(n);
      if(trues.indexOf(n) < 0) trues.push(n);
      if(!noteRecordRect[n]) {
        noteRecordRect[n] = true;
        startNote(n);
        myCanvas.paintKey(r, 'click');
      }
    }
    for( var i=24; i < 84; i++)
      if(noteRecordRect[i] && trues.indexOf(i) < 0) {
        stopNote(i);
        myCanvas.paintKey(myCanvas.noteToRect(i), 'release');
        noteRecordRect[i] = false;
      }
  };

  canvas.ontouchend = function(event) {
    var pos;
    if(event.changedTouches) for (var i = 0; i < event.changedTouches.length; i++) {
      pos = getPos(event.changedTouches[i]);
      var n = myCanvas.positionToNote(pos.x, pos.y),
        r = myCanvas.noteToRect(n);
      noteRecordRect[n] = false;
      stopNote(n);
      myCanvas.paintKey(r, 'release');
    }
  };
}

//keyboard event handlers
if(!browser.versions.mobile) {
  var noteOnJudge = new Array(12);
  noteOnJudge.forEach(function(n) {n = 0;});
  var body = document.getElementsByTagName('body')[0];

  body.onkeydown = function(event) {
    var ew = event.which;
    if((ew == 75 || ew == 37) && noteOnJudge.indexOf(1) < 0) {
      var v = parseInt(document.getElementById('keyboardGroup').value);
      keyUpAndDownGroup = document.getElementById('keyboardGroup').value = v > -parseInt(gNum / 2) ? v - 1 : v;
      myCanvas.paintIndicator(keyUpAndDownGroup);
    }
    if((ew == 76 || ew == 39) && noteOnJudge.indexOf(1) < 0) {
      var v = parseInt(document.getElementById('keyboardGroup').value);
      keyUpAndDownGroup = document.getElementById('keyboardGroup').value = v < parseInt((gNum - 1) / 2) ? v + 1 : v;
      myCanvas.paintIndicator(keyUpAndDownGroup);
    }
    else {
      var idx = keyUpAndDownTable.indexOf(ew);
      if(idx >= 0) {
        var i = idx + 48 + keyUpAndDownGroup * 12;
        startNote(i);
        myCanvas.paintKey(myCanvas.noteToRect(i), 'click');
        noteOnJudge[idx] = 1;
      }
    }
  }

  body.onkeyup = function(event) {
    var ew = event.which,
      idx = keyUpAndDownTable.indexOf(ew);
    if (idx >= 0) {
      var i = idx + 48 + keyUpAndDownGroup * 12;
      stopNote(i);
      myCanvas.paintKey(myCanvas.noteToRect(i), 'release');
      noteOnJudge[idx] = 0;
    }
  }
}
