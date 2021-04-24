import EndScene from '../scenes/EndScene.js';
import TitleScene from '../scenes/TitleScene.js'
// 'use strict';

var titleScene  = new TitleScene();
var endScene = new EndScene();

// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 840,
    height: 525,
    backgroundColor: 0xd2efe5,
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
    // scene: [titleScene]
};

let game = new Phaser.Game(config);
window.game = game;

//load scene
game.scene.add('titleScene', titleScene);
game.scene.add('endScene', endScene);

//start title scene
game.scene.start('titleScene');
//game.scene.start('endScene');