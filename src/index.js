import imgGame from './img/grafica-trex.png'; // Width: 1233 Height: 68
import { sound, endGame } from './sound';
let CANVAS;
let CONTEXT;
let JUMP_SOUND;
let DEAD_SOUND;
const WIDTH_CANVAS = 700;
const HEIGHT_CANVAS = 300;
const FPS = 45;

const IMG = {
  image: null
};
const FLOOR = {
  image: null,
  value: 200,
  x: 0,
  start: 0,
  velocity: 4
};
const TREX = {
  start: FLOOR.value,
  end: 90,
  gravity: 10,
  isDown: false,
  jumping: false
};
const CLOUD = {
  image: null,
  x: 280,
  y: 40,
  velocity: 1
};
const CACTUS = {
  image: null,
  x: 400,
  y: FLOOR.value,
  velocity: 4
};

const NIVEL = {
  velocity: 2,
  puntuacion: 0,
  gameover: false,
  deadSound: false
};

const init = () => {
  console.log('inicializando');
  CANVAS = document.querySelector('#canvas');
  CANVAS.width = WIDTH_CANVAS;
  CANVAS.height = HEIGHT_CANVAS;
  CANVAS.style.border = '2px solid #000';
  CONTEXT = CANVAS.getContext('2d');
  const url = 'https://github.com/diego-adrian/t-rex/blob/master/audio.mp3';
  JUMP_SOUND = new Audio(sound);
  DEAD_SOUND = new Audio(endGame);
  loadImages();
  // Bucle principal
  setInterval(() => {
    main();
  }, 1000 / FPS);
  document.addEventListener('keydown', (event) => {
    const { key } = event;
    if (key === ' ') {
      // espacio
      if (!NIVEL.gameover) {
        jump();
      } else {
        localStorage.setItem('count', 0);
        NIVEL.deadSound = false;
        NIVEL.gameover = false;
        NIVEL.velocity = 2;
        CACTUS.velocity = 4;
        CACTUS.x = WIDTH_CANVAS - 100;
        CLOUD.velocity = 1;
        FLOOR.velocity = 4;
      }
    }
  });
};

const loadImages = () => {
  IMG.image = new Image();
  IMG.image.src = imgGame;
};

// Esta funcion esta creada para cuando este saltando
const jump = () => {
  JUMP_SOUND.play();
  if (!TREX.jumping) TREX.jumping = true;
  TREX.idDown = false;
};
// Esta funcion esta creada para cuando ya salto empiece a caer
const goDown = () => {
  if (TREX.jumping) {
    if (TREX.start > TREX.end) {
      TREX.start -= TREX.gravity;
    } else {
      TREX.jumping = false;
      TREX.isDown = true;
    }
  } else {
    if (TREX.isDown) {
      if (TREX.start < FLOOR.value) {
        TREX.start += TREX.gravity;
      } else {
        TREX.isDown = false;
      }
    }
  }
};

/* const drawFloor = () => {
 *   CONTEXT.beginPath();
 *   CONTEXT.lineWidth = 1;
 *   CONTEXT.moveTo(0, 264);
 *   CONTEXT.lineTo(WIDTH_CANVAS, 264);
 *   CONTEXT.stroke();
 * }; */

const collision = () => {
  if (CACTUS.x > 50 && CACTUS.x < 92) {
    if (TREX.start > 165) {
      if (!NIVEL.deadSound) {
        DEAD_SOUND.play();
        NIVEL.deadSound = true;
      }
      NIVEL.gameover = true;
      NIVEL.velocity = 0;
      CLOUD.velocity = 0;
      CACTUS.velocity = 0;
      FLOOR.velocity = 0;
    }
  }
};

const drawFloor = () => {
  CONTEXT.drawImage(
    IMG.image,
    FLOOR.x,
    50,
    700,
    18,
    0,
    FLOOR.value + 38,
    1200,
    20
  );
  if (FLOOR.x > 700) {
    FLOOR.x = 0;
  } else {
    FLOOR.x += FLOOR.velocity ;
  }
};

const drawClouds = () => {
  /* CONTEXT.drawImage(IMG.image, CLOUD.x, CLOUD.y, 100, 50); */
  CONTEXT.drawImage(IMG.image, 86, 0, 50, 20, CLOUD.x, CLOUD.y, 50, 20);
  if (CLOUD.x < -100) {
    CLOUD.x = WIDTH_CANVAS + 100;
  } else {
    CLOUD.x -= CLOUD.velocity;
  }
};

const drawCactus = () => {
  // CONTEXT.drawImage(IMG.image, CACTUS.x, CACTUS.y, 100, 80);
  CONTEXT.drawImage(IMG.image, 433, 0, 25, 45, CACTUS.x, CACTUS.y, 30, 45);
  if (!NIVEL.gameover) {
    const count = localStorage.getItem('count') || 0;
    localStorage.setItem('count', parseInt(count) + 1);
  }

  if (CACTUS.x < -100) {
    CACTUS.x = WIDTH_CANVAS + 100;
  } else {
    CACTUS.x -= CACTUS.velocity;
  }
};

const drawGameOver = () => {
  if (NIVEL.gameover) {
    const count = localStorage.getItem('count') || 0;
    const score = localStorage.getItem('score') || 0;
    if (count > score) {
      localStorage.setItem('score', count);
    }

    CONTEXT.drawImage(IMG.image, 0, 0, 40, 50, 350, 100, 40, 50);
    CONTEXT.font = '30px Arial';
    CONTEXT.fillStyle = 'black';
    CONTEXT.fillText('Game Over', 300, 160);
  }
};

const writeScore = () => {
  const score = localStorage.getItem('score') || 0;
  const count = localStorage.getItem('count') || 0;
  CONTEXT.font = '20px Arial';
  CONTEXT.fillStyle = 'gray';
  CONTEXT.fillText(`HI: ${score}`, 500, 20);
  CONTEXT.fillText(count, 600, 20);
};

const drawRex = () => {
  CONTEXT.drawImage(IMG.image, 848, 0, 42, 50, 50, TREX.start, 42, 50);
};

const clearCanvas = () => {
  CONTEXT.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
};
// Funcion que gestionara todo el control del juego
const main = () => {
  clearCanvas();
  collision();
  goDown();
  drawFloor();
  drawClouds();
  drawCactus();
  drawRex();
  drawGameOver();
  writeScore();
};

document.addEventListener('load', init());
