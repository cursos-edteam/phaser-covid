import Phaser from 'phaser';
import Bootloader from './scenes/Bootloader';
import UI from './scenes/UI';
import Menu from './scenes/Menu';
import Play from './scenes/Play';

const CONFIG = {
  title: "Juego Covid",
  version: "1.0.0",
  type: Phaser.AUTO,
  scale: {
    parent: "root",
    width: 640,
    height: 360,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 2000
      },
      debug: false
    }
  },
  scene: [
    Bootloader,
    UI,
    Play,
    Menu
  ]
};

const game = new Phaser.Game(CONFIG);
