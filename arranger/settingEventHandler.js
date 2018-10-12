//about bpm setting
document.getElementById('bpm').onchange = function() {
  bpm = this.value;
  musicInfo.beatTime = 60 / bpm;
}

//about row setting
document.getElementById('num1SettingRow').onchange = function() {
  this.value = handleMusicScore(0, gRows[0], parseInt(this.value));
  gRows[0] = parseInt(this.value); rePaint();
}

document.getElementById('num2SettingRow').onchange = function() {
  this.value = handleMusicScore(1, gRows[1], parseInt(this.value));
  gRows[1] = parseInt(this.value); rePaint();
}

document.getElementById('num3SettingRow').onchange = function() {
  this.value = handleMusicScore(2, gRows[2], parseInt(this.value));
  gRows[2] = parseInt(this.value); rePaint();
}

document.getElementById('num4SettingRow').onchange = function() {
  this.value = handleMusicScore(3, gRows[3], parseInt(this.value));
  gRows[3] = parseInt(this.value); rePaint();
}

document.getElementById('num5SettingRow').onchange = function() {
  this.value = handleMusicScore(4, gRows[4], parseInt(this.value));
  gRows[4] = parseInt(this.value); rePaint();
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
    for(var i = 0 * gColumns; i < cur * gColumns; i++) musicScore[num][i] = 0;
    return cur;
  }
  else if(pre == 24 && cur == 36) {
    for(var i = 24 * gColumns; i < 36 * gColumns; i++) musicScore[num][i] = 0;
    return cur;
  }
  else if(pre == 12 && cur == 24) {
    for(var i = 0 * gColumns; i < 12 * gColumns; i++) musicScore[num][i + 12 * gColumns] = musicScore[num][i];
    for(var j = 0; j < 12 * gColumns; j++) musicScore[num][j] = 0;
    return cur;
  }
  else if(pre == 12 && cur == 36) {
    for(var i = 0 * gColumns; i < 12 * gColumns; i++) musicScore[num][i + 12 * gColumns] = musicScore[num][i];
    for(var j = 0; j < 12 * gColumns; j++) musicScore[num][j] = musicScore[num][j + 24 * gColumns] = 0;
    return cur;
  }

  else if(cur == 0) {
    for(var i = 0 * gColumns; i < pre * gColumns; i++) if(musicScore[num][i] != 0) {
      alert('cannot reduce size'); return pre;
    }
    musicScore[num].length = 0;
    return cur;
  }
  else if(pre == 24 && cur == 12) {
    for(var i = 0 * gColumns; i < 12 * gColumns; i++) if(musicScore[num][i] != 0) {
      alert('cannot reduce size'); return pre;
    }
    for(var j = 0 * gColumns; j < 12 * gColumns; j++) musicScore[num][j] = musicScore[num][j + 12 * gColumns];
    musicScore[num].length = 12 * gColumns;
    return cur;
  }
  else if(pre == 36 && cur == 24) {
    for(var i = 24 * gColumns; i < 36 * gColumns; i++) if(musicScore[num][i] != 0) {
      alert('cannot reduce size'); return pre;
    }
    musicScore[num].length = 24 * gColumns;
    return cur;
  }
  else if(pre == 36 && cur == 12) {
    for(var i = 0 * gColumns; i < 12 * gColumns; i++) if(musicScore[num][i] != 0 || musicScore[num][i + 24 * gColumns] != 0) {
      alert('cannot reduce size'); return pre;
    }
    for(var j = 0; j < 12 * gColumns; j++) musicScore[num][j] = musicScore[num][j + 12 * gColumns];
    musicScore[num].length = 12 * gColumns;
    return cur;
  }
}
