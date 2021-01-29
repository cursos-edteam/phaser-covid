import Virus from '../assets/virus.png';

class Bootloader extends Phaser.Scene {
  constructor() {
    super({
      key: 'Bootloader'
    });
  }
  init() {
    console.log('Soy init');
  }
  preload() {
    this.load.image('virus', Virus);
  }
  create() {
    this.virus = this.add.image(100, 100, 'virus');
  }
  update(time, delta) {}
}

export default Bootloader;
