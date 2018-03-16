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
    var browser = new Browser();
    if(!groupNum) groupNum = browser.versions.mobile ? 3 : 5;
    canvas = document.getElementById('canvas'),
    w = window.innerWidth,
    h = window.innerHeight - 50,
    cav = canvas.getContext('2d'),
    blackHeightRatio = 0.6,
    blackWidthRatio = 0.8,
    groupIntervalRatio = 0.05,
    keyboardTop = browser.versions.mobile ? 5 : 0.4*h,
    keyboardLeft = browser.versions.mobile ? 5 : 0.15*w,
    keyBoardBottom = browser.versions.mobile ? h-50 : 0.6*h,
    keyBoardRight = browser.versions.mobile ? w-5 : 0.85*w,
    keyHeight = keyBoardBottom - keyboardTop,
    keyboardWidth = keyBoardRight - keyboardLeft,
    intervalWidth = keyboardWidth * groupIntervalRatio / groupNum,
    groupWidth = keyboardWidth * (1 - groupIntervalRatio) / groupNum,
    keyWidth = groupWidth / 7;
    cav.clearRect(0, 0, w, h);
  }

  this.setOrGetGroupNum = function(num) {
    if(!num) return groupNum;
    if(num < 1 || num > 5) return;
    groupNum = parseInt(num);
    set();
    canvas.height = h;
    canvas.width = w;
    createKeyboard();
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

  this.noteToRect = function(note) {
    if(note < 24 || note > 83)return 0;

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
      }
    };

    var xWInt = parseInt((whichNote - 47) / 2);
      left = groupLeft + xWInt * keyWidth;
    if(xWInt >= 0 && xWInt <= 6) {
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


  this.ifPositionChanged = function(x, y, lastPositionNote) {
    var currentPositionNote = this.positionToNote(x, y);
    if(currentPositionNote != lastPositionNote.a) {
      lastPositionNote.a = currentPositionNote;
      return true;
    }

    lastPositionNote.a = currentPositionNote;
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

  var indicatorPosition = {};
  this.paintIndicator = function(group) {
    var ip = indicatorPosition;
    cav.clearRect(ip.left, ip.top, ip.width, ip.height * 0.9);
    ip.width = groupWidth,
    ip.height = keyHeight * 0.2,
    ip.left = keyboardLeft + (groupWidth + intervalWidth) * parseInt(group + groupNum / 2),
    ip.top = keyboardTop - ip.height,
    ip.centerX = ip.left + 0.2 * ip.width,
    ip.centerY = ip.top + 0.5 * ip.height;
    cav.save();
    ['#ff0000', '#00ff00', '#0000ff'].forEach(function(color) {
      cav.fillStyle = color;
      cav.strokeStyle = '#444';
      cav.lineWidth = 2;
      var radius = 0.3 * (ip.height < ip.width * 0.3 ? ip.height : ip.width * 0.3);
      cav.beginPath();
      cav.arc(ip.centerX, ip.centerY, radius, 0, Math.PI * 1.5);
      cav.closePath();
      cav.stroke();
      cav.fill();
      ip.centerX += 0.3 * ip.width;
    });
    cav.restore();
  }
}
