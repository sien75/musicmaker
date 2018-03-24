var myCanvas = new MyCanvas(),
  myAudio = new MyAudio();

//start
init();

//Init functions
function init() {
  myCanvas.init();
  myAudio.init();
  browser.versions.mobile ? initForMobile() : initForPC();
}

function initForMobile() {
  var gParent = document.getElementById('groupNum'),
    gChild4 = document.getElementById('g4'),
    gChild5 = document.getElementById('g5');
  gParent.removeChild(gChild4);
  gParent.removeChild(gChild5);//because of the small screen size of mobile devices, we can only remain 3 groups

  document.getElementById('keyboardGroup').style.display = 'none';//keyboard control is not needed on mobile devices
  handleOctive(parseInt(myCanvas.setOrGetGroupNum()));
  pageSizeReduce();
}

function initForPC() {
  var gParent = document.getElementById('groupNum'),
    gChild1 = document.getElementById('g1'),
    gChild2 = document.getElementById('g2');
  gParent.removeChild(gChild1);
  gParent.removeChild(gChild2);//remain at least 3 keyboard groups on PC to make the page much beautiful

  handleOctive(parseInt(myCanvas.setOrGetGroupNum()));
  handleKeyboardGroup(parseInt(myCanvas.setOrGetGroupNum()));
}

//overall settings
function handleOctive(groupNum) {//adjust octive setting by keyboard group number
  var octs = ['n2', '2', 'n1', '1'];//n2 means 'negative two'
  for(var i=0; i < groupNum - 1; i++)
    document.getElementById('o' + octs[i]).style.display = 'none';
  for(; i < octs.length; i++)
    document.getElementById('o' + octs[i]).style.display = 'block';
  document.getElementById('octive').value = 0;
}

function pageSizeReduce() {//reduce font size on mobile devices
  var h1 = document.getElementsByTagName('h1'),
    first = h1[0],
    second = h1[1];
  first.style['font-size'] = second.style['font-size'] = '18px';
  second.style['margin-right'] = '5px';
  document.getElementById('switch').style['font-size'] = '12px';
}

function handleKeyboardGroup(groupNum) {//adjust computerKeyboard control setting by keyboard group number
  for (var i = 5; i > groupNum; i--)
    document.getElementById('k' + i).style.display = 'none';
  for(; i > 0; i--)
    document.getElementById('k' + i).style.display = 'block';
  document.getElementById('keyboardGroup').value = 0;
}
