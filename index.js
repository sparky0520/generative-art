const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas settings
ctx.fillStyle = "green";
ctx.lineCap = "round";

ctx.shadowColor = "rgb(0,0,0,0.7)";
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;

// effect settings
let size =
  canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;

const maxLevel = 8;
const branches = 1;

let sides = 10;
let scale = 0.85;
let spread = -0.2;
let color = 120;
let lineWidth = 30;

// controls
const randomizeButton = document.getElementById("randomizeButton");
randomizeButton.style.backgroundColor = "hsl(" + color + ", 100%, 50%)";

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetFractal);

const slider_spread = document.getElementById("spread");
const label_spread = document.querySelector('[for="spread"]');

slider_spread.addEventListener("change", function (e) {
  spread = e.target.value;
  updateSliders();
  drawFractal();
});

const slider_sides = document.getElementById("sides");
const label_sides = document.querySelector('[for="sides"]');

slider_sides.addEventListener("change", function (e) {
  sides = e.target.value;
  updateSliders();
  drawFractal();
});

let pointX = 0;
let pointY = size;
function drawBranch(level) {
  if (level > maxLevel) return;
  ctx.beginPath();
  ctx.moveTo(pointX, pointY);
  ctx.bezierCurveTo(0, sides * spread * -3, size * 5, size * 10 * spread, 0, 0);
  ctx.stroke();

  for (let i = 0; i < branches; i++) {
    ctx.save();
    ctx.translate(pointX, pointY);
    ctx.scale(scale, scale);

    ctx.save();
    ctx.rotate(spread);
    drawBranch(level + 1);
    ctx.restore();

    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(-size / 2, 0, 40, 0, Math.PI * 2);
  ctx.fill();
}

function drawFractal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "hsl(" + color + ", 100%, 50%)";
  ctx.fillStyle = "hsl(" + color + ", 100%, 50%)";
  ctx.translate(canvas.width / 2, canvas.height / 2);
  for (let i = 0; i < sides; i++) {
    ctx.scale(0.95, 0.95);
    ctx.rotate((Math.PI * 6) / sides);
    drawBranch(0);

    ctx.beginPath();
    ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
drawFractal();

function randomizeFractal() {
  sides = Math.floor(Math.random() * 19 + 2);
  scale = Math.random() * 0.4 + 0.4;
  spread = Math.random() * 0.6 - 0.3;
  color = Math.random() * 360;
  lineWidth = Math.floor(Math.random() * 31 + 20);
}

randomizeButton.addEventListener("click", () => {
  randomizeFractal();
  updateSliders();
  drawFractal();
});

function updateSliders() {
  randomizeButton.style.backgroundColor = "hsl(" + color + ", 100%, 50%)";

  // spread
  slider_spread.value = spread;
  label_spread.textContent = "Spread: " + parseFloat(spread).toPrecision(2);

  // sides
  slider_sides.value = sides;
  label_sides.textContent = "Sides: " + parseFloat(sides).toPrecision(2);
}

updateSliders();

function resetFractal() {
  sides = 15;
  scale = 0.85;
  spread = 0.2;
  color = 120;
  lineWidth = 30;
  updateSliders();
  drawFractal();
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  size =
    canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;

  ctx.shadowColor = "rgb(0,0,0,0.7)";
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
  ctx.lineCap = "round";
  drawFractal();
});
