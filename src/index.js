import imgGame from './img/grafica-trex.png'; // Width: 1233 Height: 68

let CANVAS;
let CONTEXT;
const WIDTH_CANVAS = 700;
const HEIGHT_CANVAS = 300;
const FPS = 45;

const IMG = {
  image: null
};
const FLOOR = {
  image: null,
  value: 200,
  x: 1200
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
  gameover: false
};

const init = () => {
  console.log('inicializando');
  CANVAS = document.querySelector('#canvas');
  CANVAS.width = WIDTH_CANVAS;
  CANVAS.height = HEIGHT_CANVAS;
  CANVAS.style.border = '2px solid #000';
  CONTEXT = CANVAS.getContext('2d');
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
        NIVEL.gameover = false;
        NIVEL.velocity = 2;
        CACTUS.velocity = 4;
        CACTUS.x = WIDTH_CANVAS - 100;
        CLOUD.velocity = 1;
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
      NIVEL.gameover = true;
      NIVEL.velocity = 0;
      CLOUD.velocity = 0;
      CACTUS.velocity = 0;
    }
  }
};

const drawFloor = () => {
  CONTEXT.drawImage(
    IMG.image,
    0,
    50,
    1200,
    18,
    0,
    FLOOR.value + 38,
    WIDTH_CANVAS,
    20
  );
  if (FLOOR.x > WIDTH_CANVAS) {
    FLOOR.x -= NIVEL.velocity;
  } else {
    FLOOR.x = WIDTH_CANVAS;
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
  if (CACTUS.x < -100) {
    CACTUS.x = WIDTH_CANVAS + 100;
  } else {
    CACTUS.x -= CACTUS.velocity;
  }
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
};

document.addEventListener('load', init());
