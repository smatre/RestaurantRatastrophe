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
        restartButton.on('pointerdown', function (pointer) {
            this.playAgain = true;
        }, this);

        //button quit
        var quitButton = this.add.image(game.config.width,
            game.config.height, 'quitButton');
        quitButton.scale = 0.18
        quitButton.setOrigin(2.1, 3.5);
        quitButton.on('pointerdown', function (pointer) {
            this.playAgain = false;
        }, this);

        //check for high score in local storage
        if (localStorage.getItem('hiscore') != null) {
            console.log("no high score in storage");

            let storedScore = parseInt(localStorage.getItem('hiscore'));
            //see if current score higher than stored score
            if (score > storedScore) {
                localStorage.setItem('hiscore', score.toString());
                highScore = score;
                newHighScore = true;
            } else {
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } else {
            highScore = score;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;

        }
        console.log("adding text");

        if (newHighScore) {
            this.add.text(game.config.width / 2, game.config.height / 2 - 100,
                'New Hi-Score', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
        }
        this.add.text(game.config.width / 2, game.config.height / 2 - 85,
            `Hi-Score: ${highScore}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 50,
            `Score: ${score}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

    }


    update() {
        if (this.playAgain) {
            this.playAgain = false;
            this.scene.start('playScene');
        }
    }
}
