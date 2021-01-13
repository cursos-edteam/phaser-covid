import imgRex from './img/dino.jpg';
import imgCloud from './img/nube.jpg';
import imgFloor from './img/suelo.jpg';
import imgCactus from './img/cactus.jpg';

let CANVAS;
let CONTEXT;
const WIDTH_CANVAS = 700;
const HEIGHT_CANVAS = 300;
const FPS = 45;

const FLOOR = {
  image: null,
  value: 200
};
const TREX = {
  image: null,
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
  y: FLOOR.value
};

const NIVEL = {
  velocity: 2,
  puntuacion: 0
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
    const key = event.keyCode || event.charCode;
    if (key === 32) {
      // espacio
      jump();
    }
  });
};

const loadImages = () => {
  TREX.image = new Image();
  TREX.image.src = imgRex;
  CLOUD.image = new Image();
  CLOUD.image.src = imgCloud;
  FLOOR.image = new Image();
  FLOOR.image.src = imgFloor;
  CACTUS.image = new Image();
  CACTUS.image.src = imgCactus;
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

const drawFloor = () => {
  CONTEXT.beginPath();
  CONTEXT.lineWidth = 1;
  CONTEXT.moveTo(0, 264);
  CONTEXT.lineTo(WIDTH_CANVAS, 264);
  CONTEXT.stroke();
};

const drawClouds = () => {
  CONTEXT.drawImage(CLOUD.image, CLOUD.x, CLOUD.y, 100, 50);
  if (CLOUD.x < -100) {
    CLOUD.x = WIDTH_CANVAS + 100;
  } else {
    CLOUD.x -= CLOUD.velocity;
  }
};

const drawCactus = () => {
  CONTEXT.drawImage(CACTUS.image, CACTUS.x, CACTUS.y, 100, 80);
  if (CACTUS.x < -100) {
    CACTUS.x = WIDTH_CANVAS + 100;
  } else {
    CACTUS.x -= NIVEL.velocity;
  }
};

const drawRex = () => {
  CONTEXT.drawImage(TREX.image, 10, TREX.start, 50, 70);
};

const clearCanvas = () => {
  CONTEXT.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
};
// Funcion que gestionara todo el control del juego
const main = () => {
  clearCanvas();
  goDown();
  drawFloor();
  drawClouds();
  drawCactus();
  drawRex();
};

document.addEventListener('load', init());
