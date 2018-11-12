function Setting() {
  var that = this;
  var cuNumOfArea = 0;

  var so = document.getElementById('settingOutline');
  var si = document.getElementById('settingInner');
  si.innerHTML += '<br/>';
  si.innerHTML += '<span style="position:absolute;left:10%;top:10%">bpm </span>\
    <input style="position:absolute; right:10%; top:10%" id="bpm" type="number"/>';
  si.innerHTML += '<br/></br/>';
  si.innerHTML += '<span style="position:absolute;left:10%;top:22.5%">columns </span>\
    <input style="position:absolute; right:10%; top:22.5%" id="columns" type="number"/>';
  si.innerHTML += '<br/><br/>';
  addElement();
  addElement();
  addElement();
  addElement();
  addElement();

  document.getElementById('bpm').value = 60 / musicInfo.beatTime;
  document.getElementById('columns').value = graphicInfo.gColumns;
  for(var i = 2; i <= 3; i++) {
    document.getElementById('num' + i + 'SettingRow').value = 12;
  }

  this.showSetting = function(area, tick) {
    if(area == -1) that.setOverall();
    else if(area >= 0 && area <= graphicInfo.numOfGraphics) that.setTick(area, tick);
  }

  this.setOverall = function() {
    so.style.left = '0px'; so.style.top = '45px';
    so.style.width = canvas.width + 'px'; so.style.height = canvas.height + 'px';
    if(window.started == true) alert('please set after stop sound');
    else if(so.style.display == 'none') so.style.display = 'block';
    else if (so.style.display == 'block') so.style.display = 'none';
  }

  this.setTick = function(area, tick) {

  }

  function addElement() {
    cuNumOfArea++;
    var top = 22.5 + 12.5 * cuNumOfArea;
    var arr;
    var e = document.createElement('div');
    e.id = 'num' + cuNumOfArea;
    e.style = 'width:100%';
    arr = '<span style="position:absolute;left:10%;top:' + top + '%">area' + cuNumOfArea + '</span>\
      <span style="position:absolute; left:40%;top:' + top + '%">rows:</span>\
      <select style="position:absolute; left:50%; top:' + top + '%" id="num' + cuNumOfArea + 'SettingRow">';
    if(cuNumOfArea >= 2) arr += '<option value=0>0</option>';
    arr += '\
        <option value=12>12</option>\
        <option value=24>24</option>\
        <option value=36>36</option>\
      </select>\
      <select style="position:absolute; right:10% ; top:' + top + '%" id="num' + cuNumOfArea + 'SettingTimbre">';
    instrumentsList.forEach(function(i) {
      arr += '<option value="' + i + '">' + i + '</option>';
    });
    arr += '<option value="drums">drums</option>';
    arr += '</select>';
    arr += '<br/><br/>';
    e.innerHTML = arr;
    si.appendChild(e);
  }
}
