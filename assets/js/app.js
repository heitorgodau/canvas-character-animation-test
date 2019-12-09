// Constants set-up
const SCALE = 4;
const IMG_WIDTH = 16;
const IMG_HEIGHT = 18;
const SCALE_WIDTH = IMG_WIDTH * SCALE;
const SCALE_HEIGHT = IMG_HEIGHT * SCALE;
const MOVEMENT_SPEED = 1;
const FACING_DOWN = 0;
const FACING_UP = 1;
const FACING_LEFT = 2;
const FACING_RIGHT = 3;
const FRAME_LIMIT = 12;
const CYCLE_LOOP = [0, 1, 0, 2];
const IMG = new Image();
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const keyPresses = {};

// Variables set-up
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;

// Canvas set-up
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;


const drawFrame = (frameX, frameY, canvasX, canvasY) => {
  ctx.drawImage(
    IMG,
    frameX * IMG_WIDTH,
    frameY * IMG_HEIGHT,
    IMG_WIDTH,
    IMG_HEIGHT,
    canvasX,
    canvasY,
    SCALE_WIDTH,
    SCALE_HEIGHT,
  );
};

window.onkeydown = (event) => {
  keyPresses[event.key] = true;
};

window.onkeyup = (event) => {
  keyPresses[event.key] = false;
};

const loadImg = () => {
  IMG.src = './assets/images/Green-Cap-Character-16x18.png';
  IMG.onload = () => {
    window.requestAnimationFrame(gameLoop);
  };
}

loadImg();

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let hasMoved = false;

  if (keyPresses.w) {
    moveCharacter(0, -MOVEMENT_SPEED, FACING_UP)
    hasMoved = true;
  } else if (keyPresses.s) {
    moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN)
    hasMoved = true;
  } else if (keyPresses.a) {
    moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT)
    hasMoved = true;
  } else if (keyPresses.d) {
    moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT)
    hasMoved = true;
  }

  if (hasMoved) {
    frameCount += 1;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex += 1;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }

  drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
  if (!hasMoved) {
    currentLoopIndex = 0;
  };

  window.requestAnimationFrame(gameLoop);
};

const moveCharacter = (deltaX, deltaY, direction) => {
  if (positionX + deltaX > 0 && positionX + SCALE_WIDTH + deltaX < canvas.width) {
    positionX += deltaX;
  };
  if (positionY + deltaY > 0 && positionY + SCALE_HEIGHT + deltaY < canvas.height) {
    positionY += deltaY;
  }

  currentDirection = direction;
}
