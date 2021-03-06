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

document.getElementById('erase').addEventListener('click', eraseCanvas);
document.getElementById('save').addEventListener('click', saveCanvas);
document.getElementById('load').addEventListener('click', loadCanvas);
document.getElementById('clear').addEventListener('click', clearCanvas);
// on blur change stroke style to the color of the hex input
document.getElementById('hex').addEventListener('blur', changeStrokeStyle);

// last known position
var pos = { x: 0, y: 0 };

// new position from mouse events
function setPosition(e) {
 pos.x = e.offsetX;
 pos.y = e.offsetY;
}

// change stroke style to the color of the hex input
function changeStrokeStyle (e) {
 ctx.strokeStyle = document.getElementById("hex").value;
}



function draw(e) {
 if (e.buttons !== 1) return; // if mouse is pressed.....
 var color = document.getElementById("hex").value;
 var width = document.getElementById("line").value;
 ctx.beginPath();
 ctx.lineWidth = width;
 ctx.lineCap = 'round';
 // remove this stroke style because it is refactored into a separate function
//   ctx.strokeStyle = color;
 ctx.moveTo(pos.x, pos.y);
 setPosition(e);
 ctx.lineTo(pos.x, pos.y);
 ctx.stroke();
 ctx.closePath();
}

function eraseCanvas(e){
 //remove everything but the strokeStyle change
  ctx.strokeStyle = '#ffffff';
}

function saveCanvas(){
 var canvas = document.getElementById("draw");
 window.localStorage.canvasImage = canvas.toDataURL();
}

function loadCanvas(){
 var img = new Image();
 img.src = window.localStorage.canvasImage;
 img.onload = function() {
   ctx.drawImage(img, 0, 0);
 }
}

function clearCanvas(){
 ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
