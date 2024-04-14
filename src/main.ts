import "./style.css";

import Phaser from "phaser";

import GameScene from "./scenes/game";
import GameOverScene from "./scenes/gameover";
import IntroScene from "./scenes/intro";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    pixelArt: true,
    parent: "app",
    width: window.innerWidth - 3,
    height: window.innerHeight - 3,
    scene: [IntroScene, GameScene, GameOverScene],
    physics: {
        default: "arcade",
        arcade: {
            // debug: true
        }
    }
};

export default new Phaser.Game(config);