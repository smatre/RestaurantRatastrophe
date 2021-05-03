class TitleScene extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        this.load.image('titleScreen', 'assets/titleScreen.png');
        this.load.image('playButton', 'assets/playButton.png');
        this.load.audio('snore', ['assets/menu_sound.mp3']);

    }

    create() {
        //title
        var img = this.add.image(game.config.width, 
            game.config.height, 'titleScreen');
        img.scale = 1
        img.setOrigin(1,1);

         // set up audio
         this.snoreSound = this.sound.add('snore', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.snoreSound.play();

        //button play
        var playButton = this.add.image(game.config.width,
            game.config.height, 'playButton');
        playButton.scale = 0.5
        playButton.setOrigin(2, 7);
        playButton.setInteractive();
        playButton.on('pointerdown', () => { 
            this.clickButton();
        });
    }

    clickButton() {
        this.snoreSound.destroy();
        this.scene.start('playScene');
    }

}
