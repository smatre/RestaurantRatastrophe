class EndScene extends Phaser.Scene {
    constructor() {
        super('endScene');
    }
    preload() {
        this.load.image('endScene', 'assets/endScene.png');
        this.load.image('restartButton', 'assets/restartButton.png');
        this.load.image('quitButton', 'assets/quitButton2.png');
        this.load.image('endScreen', 'assets/endScreen.png');
        this.load.audio('rip', ['assets/rip_music.mp3']);
    }

    create() {
        this.deathSong = this.sound.add('rip', { 
            mute: false,
            volume: 0.2,
            rate: 1,
            loop: false 
        });
        this.deathSong.play();
        //endScreen
        var end = this.add.image(game.config.width, 
            game.config.height, 'endScreen');
        end.scale = 1
        end.setOrigin(1,1);
        //title
        var img = this.add.image(game.config.width,
            game.config.height, 'endScene');
        img.scale = 0.18
        img.setOrigin(1.5, 1.3);
        
       //button restart
       var restartButton = this.add.image(game.config.width,
        game.config.height, 'restartButton');
    restartButton.scale = 0.18
    restartButton.setOrigin(3.1, 1.5);
    restartButton.setInteractive();
    restartButton.on('pointerdown', function (pointer) {
        cont = true;
    }, this);

         //button quit
         var quitButton = this.add.image(game.config.width,
            game.config.height, 'quitButton');
        quitButton.scale = 0.18
        quitButton.setOrigin(1.1, 1.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', function (pointer) {
            quit=true;
        }, this);

        //check for high score in local storage
        if (localStorage.getItem('hiscore') != null) {
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

        if (newHighScore) {
            this.add.text(game.config.width / 2, game.config.height / 2 - 100,
                'New Hi-Score', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
        }
        this.add.text(game.config.width / 2, game.config.height / 2 - 65,
            `Hi-Score: ${highScore}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 30,
            `Score: ${score}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

    }


    update() {
        if (cont==true) {
            cont=false;
            this.deathSong.destroy();
            this.scene.start('playScene');
        }
        else if(quit==true){
            quit=false;
            this.deathSong.destroy();
            this.scene.start('titleScene');
        }
    }
}
