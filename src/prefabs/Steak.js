class Steak extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width - 20, game.config.height - 40, 'steak'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.setCollideWorldBounds(false); 
        this.setPushable(false);
        this.body.allowGravity=false;
        this.body.checkCollision.down=true; 
        this.body.checkCollision.left=true; 
        this.body.checkCollision.right=true; 
        this.body.checkCollision.up=true;             
        this.newSteak = true;                 // custom property to control Trap spawning
    }

    update() {
        // add new Trap when existing Trap hits center X
        if(this.newSteak && this.x < Phaser.Math.Between(0,4)) {
            this.newSteak = false;
            // (recursively) call parent scene method from this context
            this.scene.addSteak(this.parent, this.velocity);
        }        
    }
}