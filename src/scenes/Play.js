class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // load assets
        this.load.image('border','border.png');
        this.load.image('kitchen','kitchen.png');
        this.load.image('trap','newMouseTrap.png');
        this.load.image('block','marbleFloorTile.png');
        this.load.image('grape','grapes.png');
        this.load.image('steak','steak.png');
        this.load.image('bread','bread.png');
        this.load.image('cheese','golden cheese.png');
        this.load.image('apple','badApple.png');
        this.load.image('shelf','marbleShelf.png');
        this.load.image('instruction', 'instructionScreen.png');
        this.load.image('instruction2', 'instructionScreen2.png');
        this.load.spritesheet('rat', 'ratSpritesSmall.png', {
            frameWidth: 80, frameHeight: 50, startFrame: 0, endFrame: 6
        });
        this.load.spritesheet('sparkle', 'sparkle.png', {
            frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 5
        });
    }

    create() {
        this.delay = 10000;
        this.firstTrap = true;
        this.trapSpeed = -200;
        this.trapSpeedMax = -500;
        // variables and settings
        this.JUMP_VELOCITY = -1000;
        //change MAX_JUMPS  to two once we implement magic cheese
        this.MAX_JUMPS = 1;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 2600;

        // add tile sprite
        this.bgKitchen = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'kitchen').setOrigin(0);
        this.instruct = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'instruction').setOrigin(0);
        this.instruct2 = this.add.tileSprite(game.config.width, 0, game.config.width, game.config.height, 'instruction2').setOrigin(0);
        score = 0;
        this.scoreText = this.add.text(100, 16, 'score: 0', { fontSize: '32px', fill: '#000' });;

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.allowGravity = false;
            groundTile.body.setImmovable();
            this.ground.add(groundTile);
            
        }

        // set up rat
        this.rat = this.physics.add.sprite(120, game.config.height/2-tileSize, 'rat').setOrigin(SCALE);
        this.rat.setCollideWorldBounds(true);
        this.rat.setBounce(0.5);
        this.rat.setMaxVelocity(0, 600);
        this.rat.setDragY(200);
        this.rat.setDepth(1);
        this.rat.destroyed = false;       // custom property to track this.rat life

       // set up trap group
        this.trapGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning traps
        this.time.delayedCall(2000, () => { 
            this.addTrap(); 
        });
        

        //set up shelf group
        this.shelfGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        //wait before spawning
        this.time.delayedCall(10000, () => { 
            this.addShelf(); 
        });

        //set up grape 🍇 group
        this.grapeGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        //wait before spawn
        this.time.delayedCall(15000, () => { 
            this.addGrape(); 
        });
        //set up steak 🥩 group
        this.steakGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        //wait before spawn
        this.time.delayedCall(20000, () => { 
            this.addSteak(); 
        });
        //set up bread 🍞 group
        this.breadGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        //wait before spawn
        this.time.delayedCall(25000, () => { 
            this.addBread(); 
        });
        //set up cheese 🧀 group
        this.cheeseGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        //wait before spawning
        this.time.delayedCall(35000, () => { 
            this.addCheese(); 
        });
        //set up apple 🍎 group
        this.appleGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        //wait before spawning
        this.time.delayedCall(30000, () => { 
            this.addApple(); 
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
        

        //add rat run animation
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('rat', { start: 0, end: 6, first: 0}),
            frameRate: 12
        });

        this.anims.create({
            key: 'spark',
            frames: this.anims.generateFrameNumbers('sparkle', { start: 0, end: 5, first: 0}),
            frameRate: 12
        });
        //add border
        this.border=this.physics.add.sprite(75, game.config.height/2, 'border').setOrigin(SCALE);
        this.border.setVisible(false);
        this.border.setImmovable(true);
        this.border.body.allowGravity=false;
        this.border.body.checkCollision.left=true;
        this.border.body.checkCollision.right=true;

        this.physics.add.collider(this.rat, this.ground);
        this.physics.add.collider(this.trapGroup, this.ground);
        this.physics.add.collider(this.rat, this.shelfGroup);
        this.physics.add.collider(this.rat, this.border);

    }
    // create new traps and add them to existing trap group
    addTrap() {
        let speedVariance =  Phaser.Math.Between(35, 38);
        
        this.time.delayedCall(this.delay, () => { 
            console.log("adding trap: time", this.time.now);
            let trap = new Trap(this, this.trapSpeed - speedVariance);
            this.trapGroup.add(trap);        
        });
        this.delay -= 1000;  
        
        
    }
    //create bread 🍞 group
    addBread() {
        let speedVariance =  Phaser.Math.Between(30, 33);
        let bread = new Bread(this, this.trapSpeed - speedVariance);
        this.breadGroup.add(bread);
    }
    //create grape 🍇 group
    addGrape() {
        let speedVariance =  Phaser.Math.Between(25, 28);
        let grape = new Grape(this, this.trapSpeed - speedVariance);
        this.grapeGroup.add(grape);
    }
    //create steak 🥩 group
    addSteak() {
        let speedVariance =  Phaser.Math.Between(20, 23);
        let steak = new Steak(this, this.trapSpeed - speedVariance);
        this.steakGroup.add(steak);
    }
    //create apple 🍎 group
    addApple() {
        let speedVariance =  Phaser.Math.Between(15, 18);
        let apple = new Apple(this, this.trapSpeed - speedVariance);
        this.appleGroup.add(apple);
    }
    //create cheese 🧀 group
    addCheese() {
        let speedVariance =  Phaser.Math.Between(10, 13);
        let cheese = new Cheese(this, this.trapSpeed - speedVariance);
        this.cheeseGroup.add(cheese);
    }
    // create new shelves and add them to existing group
    addShelf() {
        let speedVariance =  4;
        let shelf = new Shelf(this, this.trapSpeed - speedVariance);
        this.shelfGroup.add(shelf);
    }

    update() {
        // update tile sprites (tweak for more "speed")
        this.bgKitchen.tilePositionX += this.SCROLL_SPEED;
        //add the scrolling instruction screen but destroy it after a while
        this.instruct.x -= this.SCROLL_SPEED;
        this.instruct2.x -= this.SCROLL_SPEED;
        if(this.instruct.x < -2000){
            this.instruct.destroy();
            this.instruct2.destroy();
        }
		// check if rat is grounded
	    this.rat.isGrounded = this.rat.body.touching.down;

	    // if so, we have jumps to spare
	    if(this.rat.isGrounded) {
           // this.rat.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
            this.run = true;
	    } 

        this.rat.anims.play('run', this.run);
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	        this.rat.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
            this.run = false;
	    } 
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
        if(!this.rat.destroyed) {
            // check for collisions
            this.physics.world.collide(this.rat, this.trapGroup, 
                this.ratCollision, null, this);
                
        }

        //check trap destruction
        this.trapGroup.getChildren().forEach(trap => {
            if (trap.body.x < 25) {
                trap.destroy();
                score += 5;
                this.scoreText.text = "score: " + score;
            }
        });
        this.grapeGroup.getChildren().forEach(grape => {
            this.foodCollision(grape, "grape");
        });
        this.steakGroup.getChildren().forEach(steak => {
            this.foodCollision(steak, "steak");
        });
        this.breadGroup.getChildren().forEach(bread => {
            this.foodCollision(bread, "bread");
        });
        this.cheeseGroup.getChildren().forEach(cheese => {
            this.foodCollision(cheese, "cheese");
        });
        this.appleGroup.getChildren().forEach(apple => {
            this.foodCollision(apple, "apple");
        });
    }

    ratCollision(){
        this.rat.destroyed = true;                    // turn off collision checking
        this.difficultyTimer.destroy();  
        this.rat.destroy();  
        //change scene to end game  
        this.scene.start('endScene');
    }

    foodCollision(food,name){
        if(this.physics.world.collide(this.rat,food)) {
            if(name=="steak"){
                score += 5;
                console.log("steak");
            }
            else if (name=="grape"){
                score += 3;
                console.log("grape");
            }
            else if(name== "bread"){
                score += 1;
                console.log("break");
            }
            else if(name=="cheese"){
                this.MAX_JUMPS=2
            }
            else if(name=="apple"){
                score -= 10;
                console.log("break");
                if(score<0){
                    score=0;
                    this.ratCollision();
                }
            }
            let anim = this.add.sprite(food.x, food.y, 'sparkle').setOrigin(1, .7);
            anim.anims.play('spark');
            anim.on('animationcomplete', () => {
                anim.destroy();
            });
            food.destroy();
            this.scoreText.text = "score: " + score;
        }
    }


}