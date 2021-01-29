import Phaser from 'phaser';
import Bootloader from './scenes/Bootloader';

const CONFIG = {
  title: 'Curso Phaser',
  url: 'http://mijuego',
  version: '1.0.0',
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  parent: 'root',
  pixelArt: true,
  backgroundColor: '#34495E',
  scene: [Bootloader]
};

const game = new Phaser.Game(CONFIG);
