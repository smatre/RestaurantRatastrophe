class Trap extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, Phaser.Math.Between(game.config.width-256, game.config.width - 20), game.config.height - paddleHeight/2, 'trap'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        this.setVelocityX(velocity);            // make it go!
        //this.setImmovable(); 
        this.setCollideWorldBounds(true);                   
        
        this.newTrap = true;                 // custom property to control Trap spawning
    }

    update() {
        // add new Trap when existing Trap hits center X
        if(this.newTrap && this.x < centerX) {
            this.newTrap = false;
            // (recursively) call parent scene method from this context
            this.scene.addTrap(this.parent, this.velocity);
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < 25) {
            this.destroy();
        }
    }
}