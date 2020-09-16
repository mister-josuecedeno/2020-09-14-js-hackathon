const canvas = document.querySelector('#draw');
const line = document.querySelector('#thickness');
const buttons = document.querySelectorAll('button');
const eraser = document.querySelector('#eraser');

let paintColor = '#ffbb00';

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = line.value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = paintColor;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Add Eventlisteners

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

// for mobile ...
canvas.addEventListener('touchstart', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);

// for mobile
canvas.addEventListener('touchmove', draw);

canvas.addEventListener('mouseup', () => (isDrawing = false));

// for mobile
canvas.addEventListener('touchend', () => (isDrawing = false));

canvas.addEventListener('mouseout', () => (isDrawing = false));

// Tools

// Thickness
thickness.addEventListener('change', () => (ctx.lineWidth = line.value));

// Color
buttons.forEach((button) => {
  button.addEventListener(
    'click',
    (e) => (paintColor = e.target.dataset.color)
  );
});

// Eraser
eraser.addEventListener('click', (e) => (paintColor = e.target.dataset.color));
