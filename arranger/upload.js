document.getElementById("upload").onchange = function () {
  var file = this.files[0];
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    analyzeUpload(this.result);
  }
}

function analyzeUpload(arr) {
  if(arr.slice(0, 6) != '0x7500') {
    console.log('file format error');
    return;
  }
  var arrPiece = getArrPieces(arr);
  if(arrPiece[1].length != arrPiece[2].length
    || arrPiece[1].length / 3 != arrPiece[3].length) {
      console.log('file format error');console.log(arrPiece[3]);
      return;
  }
  var l = arrPiece.length;

  bpm = parseInt(arrPiece[0]);
  musicInfo.beatTime = 60 / bpm;

  for(var i = 0; i < l; i++) {
    var v = parseInt(arrPiece[1].slice(i * 3, (i + 1) * 3)), j = i + 1;
    v = v==12 || v==24 || v==36 ? v : 0;
    document.getElementById('num' + j + 'SettingRow').value = v;
    gRows[i] = v;
  }
  for(var i = 0; i < l; i++) {
    var v = parseInt(arrPiece[2].slice(i * 3, (i + 1) * 3)), j = i + 1;
    v = (v>=0 && v<instrumentsList.length) || v==100 ? v : 0;
    document.getElementById('num' + j + 'SettingTimbre').value =
      v==100 ? 'drums' : instrumentsList[i];
    musicInfo.allInstruments[i] = v==100 ? 'drums' : instrumentsList[i];
  }

  for(var i = 0; i < l; i++) {
    for(var j = 0; j < gRows[i] * gColumns; j++) {
      if(j < arrPiece[3][i].length)
        musicScore[i][j] = parseInt(arrPiece[3][i].slice(j, j+1));
      else musicScore[i][j] = 0;
    }
  }

  rePaint();
}

function getArrPieces(arr) {
  var i = 6, record0, record1;
  var retValue = new Array(4);
  retValue[3] = new Array();
  for(var j = 0; j <= 2; j++) {
    for(;; i++) {
      if(arr.slice(i, i + 3) == '0x' + j) record0 = i + 3;
      else if(arr.slice(i, i + 4) == '0x9' + j) {
        record1 = i;
        i = i + 4;
        break;
      }
    } retValue[j] = arr.slice(record0, record1);
  }
  for(var j = 0; j < 5; j++) {
    for(; i < arr.length; i++) {
      if(arr.slice(i, i + 4) == '0x3' + j) record0 = i + 4;
      else if(arr.slice(i, i + 5) == '0x93' + j) {
        record1 = i;
        i = i + 5;
        break;
      }
    } retValue[3][j] = arr.slice(record0, record1);
    if(i >= arr.length) break;
  }
  return retValue;
}
