var notes = {
  '1' : 48, '1#' : 49, '2' : 50, '2#' : 51, '3' : 52, '4' : 53, '4#' : 54,
  '5' : 55, '5#' : 56, '6' : 57, '6#' : 58, '7' : 59
};

function MyCanvas() {
  var canvas, w, h, cav,
    blackHeightRatio, blackWidthRatio, groupIntervalRatio,
    groupNum,
    keyboardTop, keyboardLeft, keyBoardBottom, keyBoardRight,
    keyHeight,
    keyboardWidth, intervalWidth, groupWidth, keyWidth;

  function set() {
    canvas = document.getElementById('canvas'),
    w = window.innerWidth,
    h = window.innerHeight - 50,
    cav = canvas.getContext('2d'),
    blackHeightRatio = 0.6,
    blackWidthRatio = 0.8,
    groupIntervalRatio = 0.05,
    groupNum = 5,
    keyboardTop = 0.4*h,
    keyboardLeft = 0.15*w,
    keyBoardBottom = 0.6*h,
    keyBoardRight = 0.85*w,
    keyHeight = keyBoardBottom - keyboardTop,
    keyboardWidth = keyBoardRight - keyboardLeft,
    intervalWidth = keyboardWidth * groupIntervalRatio / groupNum,
    groupWidth = keyboardWidth * (1 - groupIntervalRatio) / groupNum,
    keyWidth = groupWidth / 7;
  }

  this.init = function() {//窗大小变化要重调用reset()
    set();
    canvas.height = h;
    canvas.width = w;
    createKeyboard();
  }

  function createKeyboard() {
    for(var i = 0; i<groupNum; i++) {
      var isCenC = i - parseInt(groupNum / 2) == 0 ? true : false;
      createKeyGroup(keyboardLeft+i*(groupWidth+intervalWidth),
        keyboardLeft+i*(groupWidth+intervalWidth)+groupWidth, isCenC);
    }
  }

  function createKeyGroup(groupLeft, groupRight, isCenC) {
    cav.beginPath();
    cav.fillStyle = '#fff';
    cav.fillRect(groupLeft, keyboardTop, groupWidth, keyHeight);
    cav.moveTo(groupLeft, keyboardTop);
    cav.lineTo(groupRight, keyboardTop);
    cav.lineTo(groupRight, keyBoardBottom);
    cav.lineTo(groupLeft, keyBoardBottom);
    cav.lineTo(groupLeft, keyboardTop);
    cav.moveTo(groupLeft+3*keyWidth, keyboardTop);
    cav.lineTo(groupLeft+3*keyWidth, keyBoardBottom);
    for (var i = 1; i <= 6; i++) {
      if(i == 3)continue;
      cav.moveTo(groupLeft+i*keyWidth, keyboardTop+keyHeight*blackHeightRatio);
      cav.lineTo(groupLeft+i*keyWidth, keyBoardBottom);
      /*cav.moveTo(groupLeft+(i-blackWidthRatio/2)*keyWidth, keyboardTop);
      cav.lineTo(groupLeft+(i-blackWidthRatio/2)*keyWidth, keyboardTop+keyHeight*blackHeightRatio);
      cav.lineTo(groupLeft+(i+blackWidthRatio/2)*keyWidth, keyboardTop+keyHeight*blackHeightRatio);
      cav.lineTo(groupLeft+(i+blackWidthRatio/2)*keyWidth, keyboardTop);*/
      cav.fillStyle = '#000';
      cav.fillRect(groupLeft+(i-blackWidthRatio/2)*keyWidth, keyboardTop,
        blackWidthRatio*keyWidth, keyHeight*blackHeightRatio);
    }
    cav.stroke();

    var a = keyWidth < keyHeight * (1 - blackHeightRatio) ? keyWidth : keyHeight * (1 - blackHeightRatio);
    cav.font = a + 'px Arial';
    if(isCenC) cav.fillText('C', groupLeft+keyWidth*0.15, keyboardTop+keyHeight*0.9);
  }

  this.positionToNote = function(x, y) {
    if(y < keyboardTop || y > keyBoardBottom) return 0;
    if(x < keyboardLeft || x > keyBoardRight) return 0;

    var whichGroup = parseInt((x - keyboardLeft) / (groupWidth + intervalWidth)),
      whichGroupByNote = whichGroup - parseInt(groupNum / 2),
      groupLeft = keyboardLeft + whichGroup * (groupWidth + intervalWidth),
      groupLeftOfBlack = groupLeft + keyWidth * (1 - blackWidthRatio / 2);

    if(keyboardTop <= y && y <= keyboardTop+keyHeight*blackHeightRatio) {
      var xB = (x - groupLeftOfBlack) / keyWidth + 1,
        xBInt = parseInt(xB),
        diff = xB - xBInt;
      if(xBInt != 3 && xBInt < 7 && xBInt > 0) {
        if(0 < diff && diff < blackWidthRatio)
          return notes[xBInt + '#'] + 12 * whichGroupByNote;
      }
    }

    var xW = (x - groupLeft) / keyWidth + 1,
      xWInt = parseInt(xW);
    if(xWInt > 0 || xWInt < 8) return notes[xWInt] + whichGroupByNote * 12;
  }

  var lastPositionNote;
  this.ifPositionChanged = function(x, y, mousemoveStart) {
    if(mousemoveStart == 0) {
      lastPositionNote = this.positionToNote(x, y);
      return false;
    }

    var currentPositionNote = this.positionToNote(x, y);
    if(currentPositionNote != lastPositionNote) {
      lastPositionNote = currentPositionNote;
      console.log(mousemoveStart);
      return true;
    }

    lastPositionNote = currentPositionNote;
    return false;
  }

  return 0;
}
