const canvas = document.getElementById("maze");
const ctx = canvas.getContext("2d");

const maze = [
  [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
  [1,0,1,0,1,0,1,1,0,1,0,1,1,1,1],
  [1,0,1,0,1,0,1,1,0,1,0,1,1,0,0],
  [1,0,1,0,0,0,0,1,0,1,0,1,1,0,1],
  [1,0,1,1,1,1,0,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,1,1,0,1],
  [1,1,1,1,0,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,1,0,1,0,1,1,0,1],
  [1,0,1,1,1,1,0,1,0,1,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,0,0,0,1,1,1,1],
];

let player = { x: 0, y: 0 };
const goal = { x: 14, y: 2 };

function resizeCanvas() {
  const maxWidth = Math.min(window.innerWidth - 40, 600);
  const cellSize = Math.floor(maxWidth / maze[0].length);
  canvas.width = cellSize * maze[0].length;
  canvas.height = cellSize * maze.length;
  draw(cellSize);
}

function draw(size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 1) {
        const px = x * size;
        const py = y * size;

        if (y > 0 && maze[y - 1][x] === 0) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + size, py);
          ctx.stroke();
        }
        if (y < maze.length - 1 && maze[y + 1][x] === 0) {
          ctx.beginPath();
          ctx.moveTo(px, py + size);
          ctx.lineTo(px + size, py + size);
          ctx.stroke();
        }
        if (x > 0 && maze[y][x - 1] === 0) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, py + size);
          ctx.stroke();
        }
        if (x < maze[y].length - 1 && maze[y][x + 1] === 0) {
          ctx.beginPath();
          ctx.moveTo(px + size, py);
          ctx.lineTo(px + size, py + size);
          ctx.stroke();
        }
      }
    }
  }

  ctx.font = `${Math.floor(size * 0.7)}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText("🏰", goal.x * size + size / 2, 2 * size + size / 2);
  ctx.fillText("👸🏻", player.x * size + size / 2, player.y * size + size / 2);
}

function move(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (maze[newY] && maze[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
    resizeCanvas();

    if (player.x === goal.x && player.y === goal.y) {
      document.getElementById("win-message").style.display = "block";
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") move(0, -1);
  if (e.key === "ArrowDown") move(0, 1);
  if (e.key === "ArrowLeft") move(-1, 0);
  if (e.key === "ArrowRight") move(1, 0);
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();