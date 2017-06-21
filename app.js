var canvas = document.getElementById('draw');
var ctx = canvas.getContext('2d');
resize();

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

// add event listeners to specify when functions should be triggered
window.addEventListener('resize', resize);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mouseenter', setPosition);

// last known position
var pos = { x: 0, y: 0 };

// new position from mouse events
function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

function draw(e) {
  if (e.buttons !== 1) return; // if mouse is pressed.....
  var color = document.getElementById("hex").value;
  var width = document.getElementById("line").value;
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.moveTo(pos.x, pos.y);
  setPosition(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  ctx.closePath();
 }

 function erase(e){
   if (e.buttons !== 1) return;
   var width = document.getElementById("line").value;
   ctx.beginPath();
   ctx.lineWidth = width;
   ctx.lineCap = "round";
   ctx.strokeStyle = "white";
   ctx.moveTo(pos.x, pos.y);
   setPosition(e);
   ctx.lineTo(pos.x, pos.y);
   ctx.stroke();
   ctx.closePath();
 }

function saveCanvas(){
  var canvas = document.getElementById("draw");
  window.localStorage.canvasImage = canvas.toDataURL();
}

function load(){
  var img = new Image();
  img.src = window.localStorage.canvasImage;
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  }
}

function clear(){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
