class TitleScene extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        this.load.image('titleScreen', 'assets/Title.png');
        this.load.image('playButton', 'assets/playButton.png');

    }

    create() {
        //title
        var img = this.add.image(game.config.width, 
            game.config.height, 'titleScreen');
        img.scale = 0.5
        img.setOrigin(1.25, 1.4);

        //button play
        var playButton = this.add.image(game.config.width,
            game.config.height, 'playButton');
        playButton.scale = 0.5
        playButton.setOrigin(1.9, 5);
        playButton.setInteractive();
        playButton.on('pointerdown', () => { 
            this.clickButton();
        });
    }

    clickButton() {
            this.scene.start('playScene');
    }

}

//export default TitleScene;