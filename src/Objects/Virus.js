class Virus extends Phaser.Physics.Arcade.Group {
  constructor(config) {
      super(config.physicsWorld, config.scene);
      this.addVirus();
  }

  addVirus() {
      this.create(
          Phaser.Math.Between(40, this.scene.scale.width - 40)
          , -10, 'virus')
          .setDepth(2)
          .setBounce(1)
          .setCircle(18)
          .setVelocityX(
              (Phaser.Math.Between(0, 1)) ? 100 : -100
          )
          .setGravityY(-1800);
  }

  update() {
      this.children.iterate( virus => {
          if(virus.body.velocity.x < 0) {
              virus.setAngularVelocity(-300);
          } else {
              virus.setAngularVelocity(300);
          }
      });
  }
}

export default Virus;