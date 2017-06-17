// set canvas id to variable
var canvas = document.getElementById('draw');

// get canvas 2D context and set it to the correct size
var ctx = canvas.getContext('2d');
resize();

// resize canvas when window is resized
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

// add event listeners to specify when functions should be triggered
window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

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

  ctx.beginPath(); // begin the drawing path

  ctx.lineWidth = width; // width of line
  ctx.lineCap = 'round'; // rounded end cap
  ctx.strokeStyle = color; // hex color of line

  ctx.moveTo(pos.x, pos.y); // from position
  setPosition(e); // start from here
  ctx.lineTo(pos.x, pos.y); // to position

  ctx.stroke(); // draw
 }

// MAKE THESE WORK!!!!!!
 // erase function?
 // how to trigger? use button
 // follow draw conventions
 // draw as white
 // how to assign white hex value automatically onclick
 function erase(){
   var color = document.getElementById("hex").value;
   var width = document.getElementById("line").value;
   document.getElementById("hex").value = #FFFFFF;

   ctx.beginPath(); // begin the drawing path

   ctx.lineWidth = width; // width of line
   ctx.lineCap = 'round'; // rounded end cap
   ctx.strokeStyle = color; // hex color of line

   ctx.moveTo(pos.x, pos.y); // from position
   setPosition(e); // start from here
   ctx.lineTo(pos.x, pos.y); // to position

   ctx.stroke(); // draw
 }

 // how to save to localstorage so image doesn't disappear on refresh?
 // save canvas as var
 // store somehow
 //on window load, restore saved canvas
function saveCanvas(){
  var canvas = document.getElementById("draw");
  window.localStorage.canvasImage = canvas.toDataURL();
}

//onclick load saved canvas image
function load(){
  var img = new Image();
  img.src = window.localStorage.canvasImage;
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  }
}

//clear canvas onclick
// restore canvas to blank default
function clear(){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
