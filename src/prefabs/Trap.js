class Trap extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width - 50, game.config.height - 40, 'trap'); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add to physics system
        this.setVelocityX(velocity);            // make it go!
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
    }
}
