var myCanvas = new MyCanvas(),
  myAudio = new MyAudio();

//start
init();

//Init functions are at below
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
  gParent.removeChild(gChild5);

  document.getElementById('keyboardGroup').style.display = 'none';
  handleOctive();
  pageSizeReduce();
  mobileWindowSizeListen();
}

function initForPC() {
  var gParent = document.getElementById('groupNum'),
    gChild1 = document.getElementById('g1'),
    gChild2 = document.getElementById('g2');
  gParent.removeChild(gChild1);
  gParent.removeChild(gChild2);

  handleOctive();
  handleKeyboardGroup();
}

function handleOctive() {
  var octs = ['n2', '2', 'n1', '1'];
  for(var i=0; i < myCanvas.setOrGetGroupNum() - 1; i++)
    document.getElementById('o' + octs[i]).style.display = 'none';
  for(; i < [-2, 2, -1, 1].length; i++)
    document.getElementById('o' + octs[i]).style.display = 'block';
  document.getElementById('octive').value = 0;
  myAudio.setOrGetOctive(0);
}

function pageSizeReduce() {
  var h1 = document.getElementsByTagName('h1'),
    first = h1[0],
    second = h1[1];
  first.style['font-size'] = second.style['font-size'] = '18px';
  second.style['margin-right'] = '5px';
  document.getElementById('switch').style['font-size'] = '12px';
}

var sizeRecord = {};
function mobileWindowSizeListen() {
  window.setInterval(function() {
    if(sizeRecord.width != window.innerWidth || sizeRecord.height != window.innerHeight)
      myCanvas.init();
    sizeRecord.width = window.innerWidth;
    sizeRecord.height = window.innerHeight;
  }, 1000);
}

function handleKeyboardGroup() {
  for (var i = 5; i > myCanvas.setOrGetGroupNum(); i--)
    document.getElementById('k' + i).style.display = 'none';
  for(; i > 0; i--)
    document.getElementById('k' + i).style.display = 'block';
  document.getElementById('keyboardGroup').value = 0;
  myCanvas.paintIndicator(0);
}
