import { Pentagram } from "../prefab/pentagram";
import { Color, SCENE_NAME as GAME_SCENE_NAME } from "./game";

export const SCENE_NAME = "gameover";

export default class GameOverScene extends Phaser.Scene {

    private score: number = 0;

    constructor() {
        super(SCENE_NAME);
    }

    preload() {
        this.load.image("pentagram", "sprites/pentagram.png");
    }

    init(data: { score: number }) {
        this.score = data.score;
    }

    create() {
        const pentagram = new Pentagram(this, this.game.renderer.width / 2, this.game.renderer.height / 2 - 100);
        pentagram.changeColor(Color.RED);
        const gameover = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'GAME OVER', { color: 'red', fontSize: "50px", fontStyle: "bold" }).setOrigin(0.5);
        gameover.postFX.addGlow(Color.RED, 1, 1, false, 0.1, 20);
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 55, `SCORE ${this.score}`, { color: '#fff' }).setOrigin(0.5);
        const clickToRestart = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 120, 'CLICK TO RESTART', { color: '#fff', fontSize: "20px", fontStyle: "bold" }).setOrigin(0.5);
        this.tweens.add({
            targets: clickToRestart,
            alpha: 0,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 330, 'A Osheanoush & LeoZero game 🧠🫀', { color: '#fff', fontStyle: "italic" }).setOrigin(0.5);
        this.input.on('pointerdown', () => {
            this.scene.start(GAME_SCENE_NAME);
        });
    }
}