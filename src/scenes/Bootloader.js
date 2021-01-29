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
    const { KeyCodes } = Phaser.Input.Keyboard;
    this.teclaUP = this.input.keyboard.addKey(KeyCodes.UP);
    this.teclaUP.on('down', () => {
      console.log('Presionaste');
    });
  }
  update(time, delta) {}
}

export default Bootloader;
