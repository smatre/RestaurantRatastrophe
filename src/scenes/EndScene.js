class EndScene extends Phaser.Scene {
    constructor() {
        super('endScene');
    }
    preload() {
        this.load.image('endScene', 'assets/endScene.png');
    }

    create() {
        //title
        var img = this.add.image(game.config.width, 
            game.config.height, 'endScene');
        img.scale = 0.18
        img.setOrigin(1.5, 1.3);
        //button play
        this.buttonPlay = this.add.text(game.config.width/2 - 25,
            game.config.height/2 + 40, 'RESTART',
        {fill: '#FFFFFF'});
        this.buttonPlay.setInteractive();
        
        this.buttonPlay.on('pointerdown', function(pointer){ 
            this.playAgain=true;
        },this);

        //button quit
        this.buttonQuit = this.add.text(game.config.width/2 - 12,
            game.config.height/1.35 - 5, 'QUIT',
         {fill: '#FFFFFF'});
        this.buttonQuit.setInteractive();
        this.buttonQuit.on('pointerdown', function(pointer){ 
            this.playAgain=false;
        },this);

        //button
        //  this.buttonPlay = this.add.text(game.config.width/2,
        //      game.config.height/2, 'PLAY',
        //  {fill: '#00FF00'});
        // // this.buttonPlay.setInteractive();
        // // this.buttonPlay.on('pointerdown', () => { 
        // //     console.log('pointerdown'); 
        // // });
    }


    update() {
        if (this.playAgain){
            this.playAgain=false;
            this.scene.start('playScene');
        } 
    }
}

//export default EndScene;