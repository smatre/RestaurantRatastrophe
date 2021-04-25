class TitleScene extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        this.load.image('titleScreen', 'assets/Title.png');
    }

    create() {
        //title
        var img = this.add.image(game.config.width, 
            game.config.height, 'titleScreen');
        img.scale = 0.5
        img.setOrigin(1.25, 1.4);

        //button play
        this.buttonStart = this.add.text(game.config.width/2 - 5,
            game.config.height/2 - 3, 'START',
        {fill: '#FFFFFF'});
        this.buttonStart.setInteractive();
        this.buttonStart.on('pointerdown', () => { 
            this.clickButton();
        });

        //button quit
        // this.buttonQuit = this.add.text(game.config.width/2 - 5,
        //     game.config.height/1.4 - 10, 'QUIT',
        // {fill: '#FFFFFF'});
        // this.buttonQuit.setInteractive();
        // this.buttonQuit.on('pointerdown', () => { 
        //     this.clickButton();
        // });
    }

    clickButton() {
            this.scene.start('playScene');
    }

}

//export default TitleScene;