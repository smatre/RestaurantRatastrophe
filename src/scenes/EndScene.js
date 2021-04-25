class EndScene extends Phaser.Scene {
    constructor() {
        super('endScene');
    }
    preload() {
        this.load.image('endScene', 'assets/endScene.png');
        this.load.image('restartButton', 'assets/restartButton.png');
        this.load.image('quitButton', 'assets/quitButton2.png');
    }

    create() {
        //title
        var img = this.add.image(game.config.width, 
            game.config.height, 'endScene');
        img.scale = 0.18
        img.setOrigin(1.5, 1.3);

        //button restart
        var restartButton = this.add.image(game.config.width,
            game.config.height, 'restartButton');
        restartButton.scale = 0.18
        restartButton.setOrigin(2.1, 5);
        restartButton.setInteractive();
        restartButton.on('pointerdown', function(pointer){ 
            this.playAgain=true;
        },this);

        //button quit
        var quitButton = this.add.image(game.config.width,
            game.config.height, 'quitButton');
        quitButton.scale = 0.18
        quitButton.setOrigin(2.1, 3.5);
        quitButton.on('pointerdown', function(pointer){ 
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