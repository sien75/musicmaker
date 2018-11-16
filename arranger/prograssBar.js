function PrograssBar() {
  var that = this;
  var timer;
  var canvasPB = document.getElementById('canvasPB');
  var ctxPB = canvasPB.getContext('2d');
  canvasPB.style['background-color'] = 'rgba(0, 0, 0, 0)';

  this.startPB = function () {
    var from = 0, to = musicLength;

    var labelStart = 0;
    while(labelStart < graphicInfo.numOfGraphics && graphicInfo.positions[labelStart].height == 0) labelStart++;
    if(labelStart >= graphicInfo.numOfGraphics) return;

    var labelEnd = graphicInfo.numOfGraphics - 1;
    while(labelEnd >= 0 && graphicInfo.positions[labelEnd].height == 0) labelEnd--;

    var t = {};
    var progress = 0;
    that.setValue(t, from, to, labelStart, labelEnd);

    that.drawLine(t.x + t.tipLength * progress, t.top, t.x + t.tipLength * progress, t.bottom, 'red', 4);
    progress++;
    timer = window.setInterval(function () {
      that.setValue(t, from, to, labelStart, labelEnd);

      if(progress != 0)
      ctxPB.clearRect(t.x + t.tipLength * (progress - 1) - 2, t.top - 1, 4, t.bottom - t.top + 2);

      if(progress != t.totalNumber)
        that.drawLine(t.x + t.tipLength * progress, t.top, t.x + t.tipLength * progress, t.bottom, 'red', 4);
      if(progress == t.totalNumber) that.stopPB();
      progress++;
    }, 20);
  }

  this.setValue = function (t, from, to, labelStart, labelEnd) {
    canvasPB.width = window.innerWidth;
    canvasPB.height = window.innerHeight * 0.95 - 45;
    canvasPB.style.display = 'block';

    t.singleW = graphicInfo.positions[labelStart].height / graphicInfo.gRows[labelStart] * 1.62;
    t.distance = (to - from) * t.singleW;
    t.time = (to - from) * musicInfo.beatTime;
    t.totalNumber = (t.time * 1000) / 20;
    t.tipLength = t.distance / t.totalNumber;

    t.x = graphicInfo.positions[labelStart].left;
    t.top = graphicInfo.positions[labelStart].top;
    t.bottom = graphicInfo.positions[labelEnd].top + graphicInfo.positions[labelEnd].height;
  }

  this.drawLine = function (x1, y1, x2, y2, color, w) {
    ctxPB.strokeStyle = color;
    ctxPB.lineWidth = w;
    ctxPB.beginPath();
    ctxPB.moveTo(x1, y1);
    ctxPB.lineTo(x2, y2);
    ctxPB.stroke();
  }

  this.stopPB = function () {
    window.clearInterval(timer);
    canvasPB.style.display = 'none';
  }
}
