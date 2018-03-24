function Keyboard() {
  var that = this;

  var canvas, cav,
    blackHeightRatio, blackWidthRatio, groupIntervalRatio,
    groupNum,
    keyboardTop, keyboardLeft, keyBoardBottom, keyBoardRight,
    keyHeight,
    keyboardWidth, intervalWidth, groupWidth, keyWidth,
    gradient;

  var notes = {
    '1' : 48, '1#' : 49, '2' : 50, '2#' : 51, '3' : 52, '4' : 53, '4#' : 54,
    '5' : 55, '5#' : 56, '6' : 57, '6#' : 58, '7' : 59
  };

  this.set = function(_canvas, _top, _left, _width, _height, _groupNum) {
    groupNum = (1 <= _groupNum && _groupNum <= 5) ? _groupNum : 5;
    canvas = _canvas;
    cav = canvas.getContext('2d');
    blackHeightRatio = 0.6;
    blackWidthRatio = 0.8;
    groupIntervalRatio = 0.05;
    keyboardTop = _top;
    keyboardLeft = _left;
    keyBoardBottom = _top + _height;
    keyBoardRight = _left + _width;
    keyHeight = _height;
    keyboardWidth = _width;
    intervalWidth = keyboardWidth * groupIntervalRatio / groupNum;
    groupWidth = keyboardWidth * (1 - groupIntervalRatio) / groupNum;
    keyWidth = groupWidth / 7;
    this.createKeyboard();
  }

  this.createKeyboard = function() {
    for(var i = 0; i<groupNum; i++) {
      this.createKeyGroup(keyboardLeft+i*(groupWidth+intervalWidth),
        keyboardLeft+i*(groupWidth+intervalWidth)+groupWidth);
    }
  }

  this.createKeyGroup = function(groupLeft, groupRight) {
    cav.beginPath();
    cav.fillStyle = 'rgb(255, 255, 255)';
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
      cav.fillStyle = 'rgb(0, 0, 0)';
      cav.fillRect(groupLeft+(i-blackWidthRatio/2)*keyWidth, keyboardTop,
        blackWidthRatio*keyWidth, keyHeight*blackHeightRatio);
    }
    cav.stroke();
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

  this.noteToRect = function(note) {
    if(!(note >= 24 && note <= 83))return 0;

    var groupNumByNote = parseInt(2.5 - 0.5 * groupNum) + 2,
      whichGroup = parseInt((note - 12 * groupNumByNote) / 12),
      whichNote = note % 12 + 48,
      groupLeft = keyboardLeft + whichGroup * (groupWidth + intervalWidth),
      whichGroupByNote = whichGroup - parseInt(groupNum / 2),
      groupLeftOfBlack = groupLeft + keyWidth * (1 - blackWidthRatio / 2);

    if([49, 51, 54, 56, 58].indexOf(whichNote) >= 0) {
      var xBInt = parseInt((whichNote - 48) / 2),
        left = groupLeftOfBlack + xBInt * keyWidth;
      return {
        color : 'rgb(0, 0, 0)',
        clickColor : 'rgb(1, 255, 0)',
        isCenC : false,
        rect : [
          {left : left,
          top : keyboardTop,
          width : keyWidth * blackWidthRatio,
          height : keyHeight * blackHeightRatio
          }
        ]
      }
    };

    var xWInt = parseInt((whichNote - 47) / 2);
      left = groupLeft + xWInt * keyWidth;
    if(xWInt >= 0 && xWInt <= 6) {
      var retValue = {
        color : 'rgb(255, 255, 255)',
        clickColor : 'rgb(255, 0, 1)',
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
      if(xWInt == 0 || xWInt == 3)
        retValue.rect[1].left = left + 1, retValue.rect[1].width = keyWidth * (1 - blackWidthRatio / 2) - 1;
      if(xWInt == 2 || xWInt == 6)
        retValue.rect[1].width = keyWidth * (1 - blackWidthRatio / 2) - 1;
      if(xWInt == 0 && whichGroupByNote == 0)
        retValue.isCenC = true;
      return retValue;
    }

    return 0;
  }

  var paintKet_click_interval;
  this.paintKey = function(note, cOrR) {
    var area = this.noteToRect(note);
    if(!area) return;
    if(cOrR == 'click') {
      that.paintKey_click(area);
    }
    else if(cOrR == 'release') {
      window.clearInterval(paintKet_click_interval);
      var color = area.color;
      cav.fillStyle = color;
      for(var i=0; i<area.rect.length; i++)
        cav.fillRect(area.rect[i].left, area.rect[i].top, area.rect[i].width, area.rect[i].height);
      cav.stroke();
    }
  }

  this.paintKey_click = function(area) {
    var color = area.clickColor, number = 0;

    paintKet_click_interval = window.setInterval(function() {
      number += 30;
      if(number > 150) {
        window.clearInterval(paintKet_click_interval);
      }
      color = color.replace((number-30).toString(), number.toString());

      cav.fillStyle = color;
      for(var i=0; i<area.rect.length; i++)
        cav.fillRect(area.rect[i].left, area.rect[i].top, area.rect[i].width, area.rect[i].height);
      cav.stroke();
    }, 50);
  }
}
