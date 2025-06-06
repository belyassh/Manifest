const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const flame = new Image();
flame.src = "flame.png";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawSpark(cx, cy, radius, opacity) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.fillStyle = `rgba(255, ${Math.floor(180 + Math.random() * 70)}, 0, ${opacity})`;
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (flame.complete) {
    const scale = 1.5;
    const flameWidth = flame.width * scale;
    const flameHeight = flame.height * scale;
    const t = Date.now() / 300;

    const dy = Math.sin(t) * 3;

    const leftX = canvas.width * 0.1;
    const rightX = canvas.width * 0.9 - flameWidth;
    const y = canvas.height - flameHeight + dy;

    // Слева
    ctx.drawImage(flame, leftX, y, flameWidth, flameHeight);
    drawSpark(leftX + flameWidth / 2, y + flameHeight / 3, 4 + Math.sin(t * 3) * 2, 0.6 + Math.sin(t * 4) * 0.3);

    // Справа
    ctx.drawImage(flame, rightX, y, flameWidth, flameHeight);
    drawSpark(rightX + flameWidth / 2, y + flameHeight / 3, 4 + Math.cos(t * 3) * 2, 0.6 + Math.cos(t * 4) * 0.3);
  }
  requestAnimationFrame(draw);
}

flame.onload = () => {
  draw();
};

// Терминал
document.getElementById("terminal-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const input = this.value.trim();
    const output = document.getElementById("terminal-output");
    output.innerText += "\n> " + input;
    this.value = "";
  }
});
