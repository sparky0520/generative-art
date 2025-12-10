addEventListener("load", () => {
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
  const size = 200;
  const sides = 5;
  const maxLevel = 4;
  const scale = 0.5;
  const spread = 0.7;
  const branches = 2;
  let color = 120;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-0.314);

  function drawBranch(level) {
    if (level > maxLevel) return;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.rotate(spread);
      ctx.scale(scale, scale);
      drawBranch(level + 1);
      ctx.restore();

      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.scale(scale, scale);
      ctx.rotate(-spread);
      drawBranch(level + 1);
      ctx.restore();
    }
  }

  function drawFractal() {
    ctx.strokeStyle = "hsl(" + color + ", 100%, 50%)";
    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }
    ctx.restore();
  }

  // fps settings
  let fps = 144;
  let lastPrint = 0;
  let timer = 0;
  let delta = 1000 / fps;

  function animate(timestamp) {
    // const duration = timestamp - lastPrint;
    // if (duration >= delta) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFractal();
    color = (color + 1) % 360;
    lastPrint = timestamp;
    // }
    // timer++;
    requestAnimationFrame(animate);
  }
  animate(timer);
});
