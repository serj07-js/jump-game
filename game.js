const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
  x: 180,
  y: 500,
  width: 40,
  height: 40,
  dy: 0,
  jump: -10,
  gravity: 0.5,
  onGround: true
};

let spikes = [
  { x: 400, y: 560, width: 20, height: 40 }
];

document.addEventListener("touchstart", () => {
  if (player.onGround) {
    player.dy = player.jump;
    player.onGround = false;
  }
});

function update() {
  // Гравитация
  player.dy += player.gravity;
  player.y += player.dy;

  // Приземление
  if (player.y >= 500) {
    player.y = 500;
    player.dy = 0;
    player.onGround = true;
  }

  // Спайки движутся
  for (let spike of spikes) {
    spike.x -= 4;
    if (spike.x + spike.width < 0) {
      spike.x = 400 + Math.random() * 100;
    }

    // Столкновение
    if (
      player.x < spike.x + spike.width &&
      player.x + player.width > spike.x &&
      player.y < spike.y + spike.height &&
      player.y + player.height > spike.y
    ) {
      alert("💀 Game Over");
      location.reload();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, 400, 600);

  // Игрок
  ctx.fillStyle = "deepskyblue";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Спайки
  ctx.fillStyle = "crimson";
  for (let spike of spikes) {
    ctx.fillRect(spike.x, spike.y, spike.width, spike.height);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();