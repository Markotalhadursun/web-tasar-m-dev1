// Gelişmiş Nokia Yılan Oyunu - Yeniden başlat butonlu sürüm

const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.height = "100vh";
container.style.background = "#111";
document.body.style.margin = "0";
document.body.appendChild(container);

const canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;
canvas.style.border = "4px solid #00ff00";
container.appendChild(canvas);
const ctx = canvas.getContext("2d");

const scoreBoard = document.createElement("div");
scoreBoard.style.color = "white";
scoreBoard.style.font = "18px monospace";
scoreBoard.style.marginTop = "15px";
container.appendChild(scoreBoard);

const restartButton = document.createElement("button");
restartButton.innerText = "Tekrar Başla";
restartButton.style.marginTop = "10px";
restartButton.style.padding = "10px 20px";
restartButton.style.fontSize = "16px";
restartButton.style.display = "none";
container.appendChild(restartButton);

const grid = 20;
let snake, dx, dy, food, interval, score, gameOver;
let highScore = 0;

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / grid)),
    y: Math.floor(Math.random() * (canvas.height / grid))
  };
}

function drawPixel(x, y, head = false) {
  ctx.fillStyle = head ? "#00ff00" : "#009900";
  ctx.beginPath();
  ctx.arc(x * grid + grid / 2, y * grid + grid / 2, grid / 2 - 2, 0, 2 * Math.PI);
  ctx.fill();
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    drawPixel(snake[i].x, snake[i].y, i === 0);
  }
}

function update() {
  if (gameOver) return;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width / grid ||
    head.y >= canvas.height / grid
  ) {
    endGame();
    return;
  }

  for (let segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      endGame();
      return;
    }
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
    score++;
    if (score > highScore) highScore = score;
  } else {
    snake.pop();
  }

  draw();
  updateScore();
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawPixel(food.x, food.y);
}

function updateScore() {
  scoreBoard.innerHTML = `Skor: ${score} &nbsp;&nbsp;&nbsp; En Yüksek Skor: ${highScore}`;
}

function endGame() {
  clearInterval(interval);
  gameOver = true;
  updateScore();
  restartButton.style.display = "inline-block";
  alert("Oyun Bitti! Skor: " + score);
}

function initGame() {
  snake = [{ x: 15, y: 15 }];
  dx = 1;
  dy = 0;
  food = spawnFood();
  score = 0;
  gameOver = false;
  restartButton.style.display = "none";
  draw();
  updateScore();
  clearInterval(interval);
  interval = setInterval(update, 120);
}

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp": if (dy === 0) { dx = 0; dy = -1; } break;
    case "ArrowDown": if (dy === 0) { dx = 0; dy = 1; } break;
    case "ArrowLeft": if (dx === 0) { dx = -1; dy = 0; } break;
    case "ArrowRight": if (dx === 0) { dx = 1; dy = 0; } break;
  }
});

restartButton.addEventListener("click", initGame);

alert("Nokia tarzı Yılan Oyununa Hoş Geldiniz! Yön tuşlarıyla oynayın.");
initGame();