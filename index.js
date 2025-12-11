const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas settings
ctx.fillStyle = "green";
ctx.lineCap = "round";
ctx.lineWidth = 30;

ctx.shadowColor = "rgb(0,0,0,0.7)";
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;

// effect settings
const size =
  canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;

const maxLevel = 4;
const branches = 2;

let sides = 5;
let scale = 0.5;
let spread = 0.7;
let color = 120;

// controls
const randomizeButton = document.getElementById("randomizeButton");

function drawBranch(level) {
  if (level > maxLevel) return;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();

  for (let i = 0; i < branches; i++) {
    ctx.save();
    ctx.translate(size - (size / branches) * i, 0);
    ctx.scale(scale, scale);

    ctx.save();
    ctx.rotate(spread);
    drawBranch(level + 1);
    ctx.restore();

    ctx.save();
    ctx.rotate(-spread);
    drawBranch(level + 1);
    ctx.restore();

    ctx.restore();
  }
}

function drawFractal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.strokeStyle = "hsl(" + color + ", 100%, 50%)";
  ctx.translate(canvas.width / 2, canvas.height / 2);
  for (let i = 0; i < sides; i++) {
    ctx.rotate((Math.PI * 2) / sides);
    drawBranch(0);
  }
  ctx.restore();
}
drawFractal();

function randomizeFractal() {
  sides = Math.floor(Math.random() * 7 + 2);
  scale = Math.random() * 0.2 + 0.4;
  spread = Math.random() * 2.9 + 0.1;
  color = Math.random() * 360;
}

randomizeButton.addEventListener("click", () => {
  randomizeFractal();
  drawFractal();
});
