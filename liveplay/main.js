(function() {
  var continuousTable = {
    '0000_Aspirin': false,
  }

  document.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, { passive: false });
  document.addEventListener('contextmenu', function(e){
      e.preventDefault();
  });

  var canvas = document.getElementById('canvas'),
    AudioContextFunc = window.AudioContext || window.webkitAudioContext,
    audioContext = new AudioContextFunc(),
    player = new WebAudioFontPlayer(),
    loadedInstruments = [],
    currentInstrument = {},
    currentPlay = new Array(),
    octive = 0,

    clickOn = false,
    positionListener = {},
    noteRecord, rectRecord,

    noteRecordRect = new Array(),//用于移动设备即多点控制的地方

    keyUpAndDownTable = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74],
    keyUpAndDownGroup = 0,

    myCanvas = new MyCanvas(),
    gNum,

    browser = new Browser();

  window.onload = function() {
    myCanvas.init();
    /*loading*/;
    importScript('../sound/0000_Aspirin_sf2_file.js', function() {
      player.loader.decodeAfterLoading(audioContext, '_tone_0000_Aspirin_sf2_file');
      loadedInstruments[loadedInstruments.length] = '0000_Aspirin';
      currentInstrument.tag = '0000_Aspirin';
      currentInstrument.isContinuous = false;
      /*loaded*/;
    });

    if(browser.versions.mobile) {
      var gParent = document.getElementById('groupNum'),
        gChild4 = document.getElementById('g4'),
        gChild5 = document.getElementById('g5');
      gParent.removeChild(gChild4);
      gParent.removeChild(gChild5);
    }

    gNum = myCanvas.setOrGetGroupNum();
    handleOctAndKgp();
  }

  function handleOctAndKgp() {
    if(browser.versions.mobile) {
      document.getElementById('keyboardGroup').style.display = 'none';
    }
    else if(!browser.versions.mobile) {
      for (var i = 5; i > gNum; i--)
        document.getElementById('k' + i).style.display = 'none';
      for(; i > 0; i--)
        document.getElementById('k' + i).style.display = 'block';
      document.getElementById('keyboardGroup').value = 0;
      keyUpAndDownGroup = 0;
      myCanvas.paintIndicator(keyUpAndDownGroup);
    }

    var octs = ['n2', '2', 'n1', '1'];
    for(var i=0; i < gNum - 1; i++)
      document.getElementById('o' + octs[i]).style.display = 'none';
    for(; i < [-2, 2, -1, 1].length; i++)
      document.getElementById('o' + octs[i]).style.display = 'block';
    document.getElementById('octive').value = 0;
    octive = 0;
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

  //Select event handlers
  document.getElementById('selectInstruments').onchange = function() {
    var a = this.value.split(':'),
      tag = a[0];
    continuousTable[tag] = a[1] == 'y' ? true : false;
    if(loadedInstruments.indexOf(tag) < 0) {
      /*loading*/;
      importScript('../sound/'+ tag + '_sf2_file.js', function() {
        player.loader.decodeAfterLoading(audioContext, '_tone_' + tag + '_sf2_file');
        loadedInstruments[loadedInstruments.length] = tag;
        /*loaded*/;
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
    handleOctAndKgp();
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
    var body = document.getElementsByTagName('body')[0];

    body.onkeydown = function(event) {
      var ew = event.which;
      if(ew == 75 || ew == 37) {
        var v = parseInt(document.getElementById('keyboardGroup').value);
        keyUpAndDownGroup = document.getElementById('keyboardGroup').value = v > -parseInt(gNum / 2) ? v - 1 : v;
        myCanvas.paintIndicator(keyUpAndDownGroup);
      }
      if(ew == 76 || ew == 39) {
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
      }
    }
  }

  //Tool functions
  function importScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function(){callback();};
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  function getPos(e) {
    var bbox = canvas.getBoundingClientRect(),
      x = e.clientX - bbox.left * (canvas.width / bbox.width),
      y = e.clientY - bbox.top * (canvas.height / bbox.height);
      return {x : x, y : y};
  }

})();
