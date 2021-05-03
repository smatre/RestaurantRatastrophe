class Shelf extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width - 75, Phaser.Math.Between(game.config.height-120,game.config.height-150), 'shelf'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(); 
        this.setCollideWorldBounds(false);                   
        this.body.allowGravity=false;
        this.body.checkCollision.down=false;
        this.body.checkCollision.left=false;
        this.body.checkCollision.right=false;
        this.setPushable(false);
        this.newShelf = true;                 // custom property to control Trap spawning
    }

    update() {
        // add new Trap when existing Trap hits center X
        if(this.newShelf && this.x < Phaser.Math.Between(25,50)) {
            this.newShelf = false;
            // (recursively) call parent scene method from this context
            this.scene.addShelf(this.parent, this.velocity);
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.body.right < 35) {
            this.destroy();
        }
    }
}