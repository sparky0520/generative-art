addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // canvas settings
  ctx.fillStyle = "green";
  ctx.strokeStyle = "yellow";
  ctx.lineCap = "round";
  ctx.lineWidth = 30;

  // effect settings
  const size = 200;
  const sides = 4;
  const maxLevel = 4;
  const scale = 0.5;
  const spread = 1.57;
  const branches = 2;

  ctx.translate(canvas.width / 2, canvas.height / 2);

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
    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }
    ctx.restore();
  }
  drawFractal();
});
