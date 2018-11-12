function Download() {
  this.saveAs = function(fileName) {
    var blob = new Blob(getArr(), {type:"text/plain"});
    var fileName = 'score.mm';
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.download = fileName;
    a.href = url;
    body.appendChild(a);
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", false, false);
    a.dispatchEvent(evt);
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function getArr() {
    var retValue = new Array();
    retValue.push('0x75000x0', 60 / musicInfo.beatTime, '0x900x1');
    for(var i = 0; i < graphicInfo.numOfGraphics; i++)
      retValue.push(graphicInfo.gRows[i]==0?'00':'0', graphicInfo.gRows[i]);
    retValue.push('0x910x2');
    for(var i = 0; i < graphicInfo.numOfGraphics; i++) {
      var idx = instrumentsList.indexOf(musicInfo.allInstruments[i]), syntax;
      if(idx < 10) syntax = '00';
      else if( idx < 100) syntax = '0';
      else syntax = '';
      retValue.push(syntax, idx);
    }
    retValue.push('0x92');
    for(var i = 0; i < graphicInfo.numOfGraphics; i++) {
      retValue.push('0x3' + i);
      musicScore[i].forEach(function (sig) {
        retValue.push(sig);
      });
      retValue.push('0x93' + i);
    }
    return retValue;
  }
}
