//about bpm setting
document.getElementById('bpm').onchange = function() {
  var bpm = parseInt(this.value);
  if(bpm >= 1000) bpm = 999; else if(bpm < 100) bpm = 100;
  this.value = bpm;
  musicInfo.beatTime = 60 / bpm;
}

//about columns setting
document.getElementById('columns').onchange = function() {
  var columns1 = parseInt(this.value);
  if(columns1 > 1000) columns1 = 1000; else if(columns1 < 8) columns1 = 8;
  columns1 = handleColumns(columns1);
  graphicInfo.gColumns = columns1, this.value = columns1;graphic.exeGra();
}

function handleColumns(c) {
  if(c > graphicInfo.gColumns) {
    for(var p = 0; p < graphicInfo.numOfGraphics; p++)
    for(var i = 0; i < graphicInfo.gRows[p]; i++)
    for(var j = graphicInfo.gColumns; j < c; j++)
      musicScore[p][i][j] = 0;
    return c;
  }
  else {
    for(var p = 0; p < graphicInfo.numOfGraphics; p++)
    for(var i = 0; i < graphicInfo.gRows[p]; i++)
    for(var j = c; j < graphicInfo.gColumns; j++)
      if(musicScore[p][i][j] != 0) {
        alert('cannot reduce size');
        return graphicInfo.gColumns;
      }
    for(var p = 0; p < graphicInfo.numOfGraphics; p++)
    for(var i = 0; i < graphicInfo.gRows[p]; i++)
      musicScore[p][i].length = c;
    return c;
  }
}

//about row setting
document.getElementById('num1SettingRow').onchange = function() {
  this.value = handleMusicScore(0, graphicInfo.gRows[0], parseInt(this.value));
  graphicInfo.gRows[0] = parseInt(this.value); graphic.exeGra();
}

document.getElementById('num2SettingRow').onchange = function() {
  this.value = handleMusicScore(1, graphicInfo.gRows[1], parseInt(this.value));
  graphicInfo.gRows[1] = parseInt(this.value); graphic.exeGra();
}

document.getElementById('num3SettingRow').onchange = function() {
  this.value = handleMusicScore(2, graphicInfo.gRows[2], parseInt(this.value));
  graphicInfo.gRows[2] = parseInt(this.value); graphic.exeGra();
}

document.getElementById('num4SettingRow').onchange = function() {
  this.value = handleMusicScore(3, graphicInfo.gRows[3], parseInt(this.value));
  graphicInfo.gRows[3] = parseInt(this.value); graphic.exeGra();
}

document.getElementById('num5SettingRow').onchange = function() {
  this.value = handleMusicScore(4, graphicInfo.gRows[4], parseInt(this.value));
  graphicInfo.gRows[4] = parseInt(this.value); graphic.exeGra();
}

//about timbre setting
document.getElementById('num1SettingTimbre').onchange = function() {
  musicInfo.allInstruments[0] = this.value;
}

document.getElementById('num2SettingTimbre').onchange = function() {
  musicInfo.allInstruments[1] = this.value;
}

document.getElementById('num3SettingTimbre').onchange = function() {
  musicInfo.allInstruments[2] = this.value;
}

document.getElementById('num4SettingTimbre').onchange = function() {
  musicInfo.allInstruments[3] = this.value;
}

document.getElementById('num5SettingTimbre').onchange = function() {
  musicInfo.allInstruments[4] = this.value;
}


function handleMusicScore(num, pre, cur) {
  var i, j, c;
  if(pre == 0) {
    for(i = 0; i < cur; i++) musicScore[num][i].forEach(function (a) {a = 0;});
    return cur;
  }
  else if(pre == 24 && cur == 36) {
    for(i = 24; i < 36; i++) musicScore[num][i].forEach(function (a) {a = 0;});
    return cur;
  }
  else if(pre == 12 && cur == 24) {
    for(i = 0; i < 12; i++) musicScore[num][i + 12].forEach(function (a, b) {a = musicScore[num][i][b]});
    for(j = 0; j < 12; j++) musicScore[num][j].forEach(function (a) {a = 0;});
    return cur;
  }
  else if(pre == 12 && cur == 36) {
    for(i = 0; i < 12; i++) musicScore[num][i + 12].forEach(function (a, b) {a = musicScore[num][i][b]});
    for(j = 0; j < 12; j++) musicScore[num][j].forEach(function (a, b) {a = musicScore[num][j + 24][b] = 0;});
    return cur;
  }

  else if(cur == 0) {
    for(i = 0; i < pre; i++) for(c = 0; c < graphicInfo.gColumns; c++) if(musicScore[num][i][c] != 0) {
      alert('cannot reduce size'); return pre;
    }
    musicScore[num].length = 0;
    return cur;
  }
  else if(pre == 24 && cur == 12) {
    for(var i = 0; i < 12; i++) for(c = 0; c < graphicInfo.gColumns; c++) if(musicScore[num][i][c] != 0) {
      alert('cannot reduce size'); return pre;
    }
    for(var j = 0; j < 12; j++) musicScore[num][j].forEach(function (a, b) {a = musicScore[num][j +12][b];});
    musicScore[num].length = 12;
    return cur;
  }
  else if(pre == 36 && cur == 24) {
    for(var i = 24; i < 36; i++) for(c = 0; c < graphicInfo.gColumns; c++) if(musicScore[num][i][c] != 0) {
      alert('cannot reduce size'); return pre;
    }
    musicScore[num].length = 24;
    return cur;
  }
  else if(pre == 36 && cur == 12) {
    for(var i = 0; i < 12; i++) for(c = 0; c < graphicInfo.gColumns; c++) if(musicScore[num][i][c] != 0 || musicScore[num][i + 24 * graphicInfo.gColumns][c] != 0) {
      alert('cannot reduce size'); return pre;
    }
    for(var j = 0; j < 12; j++) musicScore[num][j].forEach(function (a, b) {a = musicScore[num][j + 12][b];});
    musicScore[num].length = 12;
    return cur;
  }
}
