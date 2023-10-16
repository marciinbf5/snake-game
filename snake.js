const grid = 20;
const gameContainer = document.querySelector('.game-container');
const snake = document.getElementById('snake');
const food = document.getElementById('food');
let snakeBody = [{ top: 0, left: 0 }];
let direction = 'right';
let gameLoop;
let gameOver = false;

function gameStart() {
  drawSnake();
  generateFood();
  gameLoop = setInterval(moveSnake, 200);
  document.addEventListener('keydown', changeDirection);
}

function drawSnake() {
  snake.style.top = `${snakeBody[0].top * grid}px`;
  snake.style.left = `${snakeBody[0].left * grid}px`;
}

function moveSnake() {
  const head = { top: snakeBody[0].top, left: snakeBody[0].left };

  if (direction === 'right') head.left += 1;
  if (direction === 'left') head.left -= 1;
  if (direction === 'up') head.top -= 1;
  if (direction === 'down') head.top += 1;

  snakeBody.unshift(head);

  if (checkCollision()) {
    gameOver = true;
    return;
  }

  if (snakeBody[0].top === food.offsetTop && snakeBody[0].left === food.offsetLeft) {
    snake.classList.add('snake-body');
    generateFood();
  } else {
    snakeBody.pop();
  }

  drawSnake();
}

function checkCollision() {
  const head = snakeBody[0];
  if (head.top * grid >= gameContainer.offsetHeight || head.left * grid >= gameContainer.offsetWidth ||
      head.top < 0 || head.left < 0 ||
      snakeBody.slice(1).some(segment => segment.top === head.top && segment.left === head.left)) {
    return true;
  }
  return false;
}

function generateFood() {
  const maxPos = gameContainer.offsetWidth / grid - 1;
  const foodPos = {
    top: Math.floor(Math.random() * maxPos) * grid,
    left: Math.floor(Math.random() * maxPos) * grid
  };
  food.style.top = `${foodPos.top}px`;
  food.style.left = `${foodPos.left}px`;
}

function changeDirection(e) {
  const key = e.keyCode;
  if (key === 37 && direction !== 'right') direction = 'left';
  if (key === 38 && direction !== 'down') direction = 'up';
  if (key === 39 && direction !== 'left') direction = 'right';
  if (key === 40 && direction !== 'up') direction = 'down';
}

function gameOverScreen() {
  clearInterval(gameLoop);
  snake.classList.remove('snake-body');
  snake.style.display = 'none';
  const gameOverText = document.createElement('div');
  gameOverText.classList.add('game-over');
  gameOverText.textContent = 'Game Over';
  gameContainer.appendChild(gameOverText);
}

gameStart();