// technically interesting: 
// 1. added increasing difficulty of mouse trap. 
// We decremented the delay each time so the mouse traps get 
// closer and closer every scene (minimum delay: 1.5 seconds)
// 2. added a tint on the rat for power-up (eating the cheese), and 
// set a timer for the tint to last 30 seconds (same duration as the powerup)

//visually style: 1. We are very proud of our music, 
// the sound effects and music fit really well with our happy and playful
// theme. We also had no prior experience with sound, 
// so we believe we did really well despite that
//2. We are very proud of our artwork. It fits in really well with our theme,
// and the cartoonish look was exactly what we were going for

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
            debug: false,
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
let score;
let highScore;
let cont=false;
let quit=false
let playNow=false;
let newHighScore = false;

