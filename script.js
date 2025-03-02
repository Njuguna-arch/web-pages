const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let tileSize = 20;
let gridWidth;
let gridHeight;

let snake;
let direction;
let food;
let gameOver = false;
let speed = 300;
let gameStarted = false;

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gridWidth = Math.floor(canvas.width / tileSize);
  gridHeight = Math.floor(canvas.height / tileSize);
};

const initGame = () => {
  resizeCanvas();

  snake = [{
    x: Math.floor(gridWidth / 2),
    y: Math.floor(gridHeight / 2)
  }];

  direction = { x: 0, y: 0 };

  food = {
    x: Math.floor(Math.random() * gridWidth),
    y: Math.floor(Math.random() * gridHeight)
  };

  gameOver = false;
  gameStarted = false;
};

const drawRect = (x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
};

const gameLoop = () => {
  if (gameOver) {
    ctx.fillStyle = 'red';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    return;
  }

  setTimeout(() => {
    requestAnimationFrame(gameLoop);
  }, speed);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameStarted) {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press an arrow key to start', canvas.width / 2, canvas.height / 2);
    return;
  }

  // Move snake
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // Wall collision
  if (
    head.x < 0 ||
    head.x >= gridWidth ||
    head.y < 0 ||
    head.y >= gridHeight
  ) {
    gameOver = true;
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) return;

  snake.unshift(head);

  // Food collision
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * gridWidth),
      y: Math.floor(Math.random() * gridHeight)
    };
    if (speed > 50) speed -= 5;
  } else {
    snake.pop();
  }

  // Draw food
  drawRect(food.x, food.y, 'red');

  // Draw snake
  for (let segment of snake) {
    drawRect(segment.x, segment.y, 'lime');
  }
};

// Controls
window.addEventListener('keydown', (e) => {
  if (!gameStarted) {
    gameStarted = true;
  }

  switch (e.key) {
    case 'ArrowUp':
      if (direction.y !== 1) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y !== -1) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x !== 1) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x !== -1) direction = { x: 1, y: 0 };
      break;
  }
});

// Touch Controls for Mobile
const startGame = () => {
  if (!gameStarted) {
    gameStarted = true;
  }
};

document.getElementById('up').addEventListener('click', () => {
  startGame();
  if (direction.y !== 1) direction = { x: 0, y: -1 };
});
document.getElementById('down').addEventListener('click', () => {
  startGame();
  if (direction.y !== -1) direction = { x: 0, y: 1 };
});
document.getElementById('left').addEventListener('click', () => {
  startGame();
  if (direction.x !== 1) direction = { x: -1, y: 0 };
});
document.getElementById('right').addEventListener('click', () => {
  startGame();
  if (direction.x !== -1) direction = { x: 1, y: 0 };
});

window.onload = () => {
  initGame();
  gameLoop();
};

// Handle window resize
window.addEventListener('resize', () => {
  initGame();
});
