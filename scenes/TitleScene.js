class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' });
    }

    preload() {
        this.load.image('titleScreen', 'assets/Title.png');
        this.load.image('playButton', 'assets/playButton.png');
    }

    create() {


        //title
        var title = this.add.image(game.config.width,
            game.config.height, 'titleScreen');
        title.scale = 0.5
        title.setOrigin(1.25, 1.4);

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
        this.scene.switch('endScene');
    }
}

export default TitleScene;