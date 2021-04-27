//global 
let cursors;
const SCALE = .5;
const tileSize = 30;


//main game object
let config = {
    type: Phaser.AUTO,
    width: 840,
    height: 525,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [TitleScene, Play, EndScene]
  }
  //define game
let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let w = game.config.width;
let h = game.config.height;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
const textSpacer = 64;
let paddle = null;
const paddleWidth = 16;
const paddleHeight = 128;
const paddleVelocity = 150;
let level;
let highScore;
let newHighScore = false;

