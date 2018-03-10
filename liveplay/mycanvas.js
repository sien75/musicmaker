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
    groupNum = browser.versions.mobile ? 3 : 5,
    keyboardTop = browser.versions.mobile ? 5 : 0.4*h,
    keyboardLeft = browser.versions.mobile ? 5 : 0.15*w,
    keyBoardBottom = browser.versions.mobile ? h-50 : 0.6*h,
    keyBoardRight = browser.versions.mobile ? w-5 : 0.85*w,
    keyHeight = keyBoardBottom - keyboardTop,
    keyboardWidth = keyBoardRight - keyboardLeft,
    intervalWidth = keyboardWidth * groupIntervalRatio / groupNum,
    groupWidth = keyboardWidth * (1 - groupIntervalRatio) / groupNum,
    keyWidth = groupWidth / 7;
    console.log(w);
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
      cav.fillStyle = '#000';
      cav.fillRect(groupLeft+(i-blackWidthRatio/2)*keyWidth, keyboardTop,
        blackWidthRatio*keyWidth, keyHeight*blackHeightRatio);
    }
    cav.stroke();

    if(isCenC) {
      var a = keyWidth < keyHeight * (1 - blackHeightRatio) ? keyWidth : keyHeight * (1 - blackHeightRatio);
      cav.font = a + 'px Arial';
      cav.fillText('C', groupLeft+keyWidth*0.15, keyboardTop+keyHeight*0.9);
    }
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
      if(xBInt != 3 && xBInt < 7 && xBInt > 0 && 0 < diff && diff < blackWidthRatio)
        return notes[xBInt + '#'] + 12 * whichGroupByNote;
    }
    var xW = (x - groupLeft) / keyWidth + 1,
      xWInt = parseInt(xW);
    if(xWInt > 0 || xWInt < 8) {
      return notes[xWInt] + whichGroupByNote * 12;
    }

    return 0;
  }

  this.positionToRect = function(x, y) {
    if(y < keyboardTop || y > keyBoardBottom) return 0;
    if(x < keyboardLeft || x > keyBoardRight) return 0;

    var whichGroup = parseInt((x - keyboardLeft) / (groupWidth + intervalWidth)),
      whichGroupByNote = whichGroup - parseInt(groupNum / 2),
      groupLeft = keyboardLeft + whichGroup * (groupWidth + intervalWidth),
      groupLeftOfBlack = groupLeft + keyWidth * (1 - blackWidthRatio / 2);

    if(keyboardTop <= y && y <= keyboardTop+keyHeight*blackHeightRatio) {
      var xB = (x - groupLeftOfBlack) / keyWidth + 1,
        xBInt = parseInt(xB),
        diff = xB - xBInt,
        left = groupLeftOfBlack + (xBInt- 1) * keyWidth;
      if(xBInt != 3 && xBInt < 7 && xBInt > 0 && 0 < diff && diff < blackWidthRatio)
        return {
          color : 'black',
          clickColor : '#00cc00',
          isCenC : false,
          rect : [
            {left : left,
            top : keyboardTop,
            width : keyWidth * blackWidthRatio,
            height : keyHeight * blackHeightRatio
            }
          ]
        };
    };

    var xW = (x - groupLeft) / keyWidth + 1,
      xWInt = parseInt(xW),
      left = groupLeft + (xWInt - 1) * keyWidth;
    if(xWInt > 0 && xWInt < 8) {
      var retValue = {
        color : 'white',
        clickColor : 'red',
        isCenC : false,
        rect : [
          {left : left + 1,
          top : keyboardTop + keyHeight * blackHeightRatio,
          width : keyWidth - 2,
          height : keyHeight * (1 - blackHeightRatio) - 1
          },
          {left : left + keyWidth * blackWidthRatio / 2,
          top : keyboardTop + 1,
          width : keyWidth * (1 - blackWidthRatio),
          height : keyHeight * blackHeightRatio + 1
          }
        ]
      };
      if(xWInt == 1 || xWInt == 4)
        retValue.rect[1].left = left + 1, retValue.rect[1].width = keyWidth * (1 - blackWidthRatio / 2) - 1;
      if(xWInt == 3 || xWInt == 7)
        retValue.rect[1].width = keyWidth * (1 - blackWidthRatio / 2) - 1;
      if(xWInt == 1 && whichGroupByNote == 0)
        retValue.isCenC = true;
      return retValue;
    }

    return 0;
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
      return true;
    }

    lastPositionNote = currentPositionNote;
    return false;
  }

  this.paintKey = function(area, cOrR) {
    if(!area)return;
    var color;
    if(cOrR == 'click') color = area.clickColor;
    else if(cOrR == 'release') color = area.color;
    cav.fillStyle = color;

    for(var i=0; i<area.rect.length; i++)
      cav.fillRect(area.rect[i].left, area.rect[i].top, area.rect[i].width, area.rect[i].height);
    cav.stroke();
    if(area.isCenC) {
      var a = keyWidth < keyHeight * (1 - blackHeightRatio) ? keyWidth : keyHeight * (1 - blackHeightRatio);
      cav.font = a + 'px Arial';
      cav.fillStyle = 'black';
      cav.fillText('C', area.rect[0].left+keyWidth*0.15-1, keyboardTop+keyHeight*0.9);
    }
  }
}
