class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // load ssets
        this.load.image('kitchen','kitchen.png');
        this.load.image('counter','counter.png');
        this.load.image('rat','rat.png');
        this.load.image('trap','mouseTrap.png');
    }

    create() {
        this.barrierSpeed = -200;
        this.barrierSpeedMax = -500;
        // variables and settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 2600;

        // add tile sprite
        this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'kitchen').setOrigin(0);


        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        // put another tile sprite above the ground tiles
       this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'counter').setOrigin(0);


        // set up my rat son 👽
       // this.alien = this.physics.add.sprite(120, game.config.height/2-tileSize, 'platformer_atlas', 'side').setScale(SCALE);
        this.rat = this.physics.add.sprite(120, game.config.height/2-tileSize, 'rat').setOrigin(SCALE);
        this.rat.setCollideWorldBounds(true);
        this.rat.setBounce(0.5);
        this.rat.setImmovable();
        this.rat.setMaxVelocity(0, 600);
        this.rat.setDragY(200);
        this.rat.setDepth(1);             // ensures that this.rat z-depth remains above shadow this.rats
        this.rat.destroyed = false;       // custom property to track this.rat life
       // this.rat.setBlendMode('SCREEN');  // set a WebGL blend mode
        // set up barrier group
        this.barrierGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning barriers
        this.time.delayedCall(2500, () => { 
            this.addBarrier(); 
        });

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });
        

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.rat, this.ground);
    }

    // create new barriers and add them to existing barrier group
    addBarrier() {
        let speedVariance =  Phaser.Math.Between(0, 25);
        let barrier = new Barrier(this, this.barrierSpeed - speedVariance);
        this.barrierGroup.add(barrier);
    }

    update() {
        // update tile sprites (tweak for more "speed")
        this.talltrees.tilePositionX += this.SCROLL_SPEED;
       // this.groundScroll.tilePositionX += this.SCROLL_SPEED;

		// check if rat is grounded
	    this.rat.isGrounded = this.rat.body.touching.down;
	    // if so, we have jumps to spare
	    if(this.rat.isGrounded) {
           // this.rat.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } 
        // else {
	    // 	this.rat.anims.play('jump');
	    // }
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.rat.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    } 
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
        if(!this.rat.destroyed) {
            // check for player input
            // if(cursors.up.isDown) {
            //     this.rat.body.velocity.y -= this.ratVelocity;
            // } else if(cursors.down.isDown) {
            //     this.rat.body.velocity.y += this.ratVelocity;
            // }
            // check for collisions
            this.physics.world.collide(this.rat, this.barrierGroup, this.ratCollision, null, this);
        }
    }

    ratCollision(){
        this.rat.destroyed = true;                    // turn off collision checking
        this.difficultyTimer.destroy();  
        this.rat.destroy();    

        // switch states after timer expires
       // this.time.delayedCall(4000, () => { this.scene.start('EndScene'); });
    }


}