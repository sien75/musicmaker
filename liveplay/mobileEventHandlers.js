//touch event handlers
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
      myAudio.startNote(n);
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
        myAudio.startNote(n);
        myCanvas.paintKey(r, 'click');
      }
    }
    for( var i=24; i < 84; i++)
      if(noteRecordRect[i] && trues.indexOf(i) < 0) {
        myAudio.stopNote(i);
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
      myAudio.stopNote(n);
      myCanvas.paintKey(r, 'release');
    }
  };
}
