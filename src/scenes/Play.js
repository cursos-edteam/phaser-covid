import RedBoy from '../Player/RedBoy';
import Virus from '../Objects/Virus';
import RedCrossItem from '../Objects/RedCrossItem';
class Play extends Phaser.Scene {
  constructor () {
    super({
      key: 'Play'
    })
  }

  init () {
    this.scene.launch('UI');
  }

  preload () {
  }

  create () {
    this.add.image(0, 0, 'background').setOrigin(0);
    // Bloque fisico
    this.wall_floor = this.physics.add.staticGroup();
    this.wall_floor.create(0, 0, 'wall').setOrigin(0);
    this.wall_floor.create(this.scale.width, 0, 'wall').setOrigin(1, 0).setFlipX(true);
    this.wall_floor.create(0, this.scale.height, 'floor').setOrigin(0, 1);

    this.wall_floor.refresh();

    this.wall_floor.getChildren()[2].setOffset(0, 15);

    // Grupo virus
    this.virusGroup = new Virus({
      physicsWorld: this.physics.world,
      scene: this
    })
    
     // Items
     this.itemsGroup = new RedCrossItem({
        physicsWorld: this.physics.world,
        scene: this
      });

    // Jugador
    this.redBoy = new RedBoy({
      scene: this,
      x: 100,
      y: 100
    });

    this.physics.add.collider([this.redBoy, this.virusGroup], this.wall_floor);
    this.physics.add.overlap(this.redBoy, this.virusGroup, () => {
      this.redBoy.virusCollision();
    });

    this.physics.add.overlap(this.itemsGroup, this.redBoy, () => {
      this.registry.events.emit('update_points');
      this.itemsGroup.destroyItem();
      this.virusGroup.addVirus();
  });

  }

  update () {
    this.redBoy.update();
    this.virusGroup.update();
  }

}

export default Play;