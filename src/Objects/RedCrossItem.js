class RedCrossItem extends Phaser.Physics.Arcade.StaticGroup {
  constructor(config) {
      super(config.physicsWorld, config.scene);        
      this.addRedCrossItem();
  }

  addRedCrossItem() {
      this.create(
          Phaser.Math.Between(50, this.scene.scale.width - 50),
          Phaser.Math.Between(150, this.scene.scale.height - 70),
          'object_item'
      );
  }

  destroyItem() {
      this.children.entries[0].destroy();
      this.addRedCrossItem();
  }

}

export default RedCrossItem;