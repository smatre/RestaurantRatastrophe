class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'endScene' });
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
        var highscore = this.add.text('High score: ');

        //button restart
        var restartButton = this.add.image(game.config.width,
            game.config.height, 'restartButton');
        restartButton.scale = 0.18
        restartButton.setOrigin(2.1, 5);
        restartButton.setInteractive();
        restartButton.on('pointerdown', () => {
            this.clickButton();
        });
        // button quit
        var quitButton = this.add.image(game.config.width,
            game.config.height, 'quitButton');
        quitButton.scale = 0.18
        quitButton.setOrigin(2.1, 3.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            this.clickButton();
        });
    }

    clickButton() {
        this.scene.switch('titleScene');
    }
}

export default EndScene;