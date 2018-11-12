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
  graphicInfo.gColumns = columns1, this.value = columns1;graphic.exeGra();
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
  if(pre == 0) {
    for(var i = 0 * graphicInfo.gColumns; i < cur * graphicInfo.gColumns; i++) musicScore[num][i] = 0;
    return cur;
  }
  else if(pre == 24 && cur == 36) {
    for(var i = 24 * graphicInfo.gColumns; i < 36 * graphicInfo.gColumns; i++) musicScore[num][i] = 0;
    return cur;
  }
  else if(pre == 12 && cur == 24) {
    for(var i = 0 * graphicInfo.gColumns; i < 12 * graphicInfo.gColumns; i++) musicScore[num][i + 12 * graphicInfo.gColumns] = musicScore[num][i];
    for(var j = 0; j < 12 * graphicInfo.gColumns; j++) musicScore[num][j] = 0;
    return cur;
  }
  else if(pre == 12 && cur == 36) {
    for(var i = 0 * graphicInfo.gColumns; i < 12 * graphicInfo.gColumns; i++) musicScore[num][i + 12 * graphicInfo.gColumns] = musicScore[num][i];
    for(var j = 0; j < 12 * graphicInfo.gColumns; j++) musicScore[num][j] = musicScore[num][j + 24 * graphicInfo.gColumns] = 0;
    return cur;
  }

  else if(cur == 0) {
    for(var i = 0 * graphicInfo.gColumns; i < pre * graphicInfo.gColumns; i++) if(musicScore[num][i] != 0) {
      alert('cannot reduce size'); return pre;
    }
    musicScore[num].length = 0;
    return cur;
  }
  else if(pre == 24 && cur == 12) {
    for(var i = 0 * graphicInfo.gColumns; i < 12 * graphicInfo.gColumns; i++) if(musicScore[num][i] != 0) {
      alert('cannot reduce size'); return pre;
    }
    for(var j = 0 * graphicInfo.gColumns; j < 12 * graphicInfo.gColumns; j++) musicScore[num][j] = musicScore[num][j + 12 * graphicInfo.gColumns];
    musicScore[num].length = 12 * graphicInfo.gColumns;
    return cur;
  }
  else if(pre == 36 && cur == 24) {
    for(var i = 24 * graphicInfo.gColumns; i < 36 * graphicInfo.gColumns; i++) if(musicScore[num][i] != 0) {
      alert('cannot reduce size'); return pre;
    }
    musicScore[num].length = 24 * graphicInfo.gColumns;
    return cur;
  }
  else if(pre == 36 && cur == 12) {
    for(var i = 0 * graphicInfo.gColumns; i < 12 * graphicInfo.gColumns; i++) if(musicScore[num][i] != 0 || musicScore[num][i + 24 * graphicInfo.gColumns] != 0) {
      alert('cannot reduce size'); return pre;
    }
    for(var j = 0; j < 12 * graphicInfo.gColumns; j++) musicScore[num][j] = musicScore[num][j + 12 * graphicInfo.gColumns];
    musicScore[num].length = 12 * graphicInfo.gColumns;
    return cur;
  }
}
