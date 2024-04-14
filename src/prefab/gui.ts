import Combination from "../combination";
import Game from "../scenes/game";

export default class GUI extends Phaser.GameObjects.Container {

    private combinations: Combination[] = [];
    private hearts: Phaser.GameObjects.Sprite[] = [];
    private scoreText: Phaser.GameObjects.Text;
    private combinationsTexts: Phaser.GameObjects.Text[] = [];
    private combinationsSprites: Phaser.GameObjects.Text[] = [];

    constructor(scene: Game, x: number, y: number, combinations: Combination[]) {
        super(scene, x, y);
        this.combinations = combinations;
        this.combinations.forEach((combination, index) => {
            this.displayCombination(combination, index);
        });
        this.displayHeart();
        this.displayScore();
    }

    displayScore() {
        if (this.scoreText) this.scoreText.setText(`${this.scene.score}`);
        else this.scoreText =
            this.scene.add.text(this.scene.centerX, 20, `${this.scene.score}`, {
                fontSize: "50px",
                stroke: "#000000",
                color: "#ffffff",
                fontFamily: "impact"
            });
    }

    displayHeart() {
        this.hearts.forEach(heart => heart.destroy());
        for (let i = this.scene.life; i--; i < 0) {
            const heart = this.scene.add.sprite(this.scene.width - (50 + (50 * i)), 40, "heart").setScale(1.5);
            this.hearts.push(heart);
            heart.preFX.addGlow(0xff0000, 1, 1, false, 0.1, 50);
        };
    }

    getCombinatioColor(combination: Combination) {
        if (combination.color === 0xff0000) return "RED";
        if (combination.color === 0x0000ff) return "BLUE";
        if (combination.color === 0x00ff00) return "GREEN";
    }

    displayCombination(combination: Combination, index: number) {
        this.combinationsTexts.push(this.scene.add.text(20, 20 + (30 * index), combination.name.toUpperCase(), {
            fontSize: "20px",
            color: this.getCombinatioColor(combination),
            fontStyle: "bold"
        }).setStroke("#ccc", 2));

        combination.sequence.forEach((direction, i) => {
            const arrow = this.scene.add.sprite(150 + 20 + (25 * i), 30 + (30 * index), "arrow");
            this.combinationsSprites.push(arrow);
            arrow.setScale(2.3);
            if (direction === "RIGHT") {
                arrow.angle = 90;
            }
            if (direction === "DOWN") {
                arrow.angle = 180;
            }
            if (direction === "LEFT") {
                arrow.angle = 270;
            }
            if (i < combination.index) {
                arrow.setTint(0xfff300);
            }
        });
    }

    update() {
        this.displayHeart();
        this.displayScore();
        this.combinationsSprites.forEach(sprite => sprite.destroy());
        this.combinationsTexts.forEach(text => text.destroy());
        this.combinations.forEach((combination, index) => {
            this.displayCombination(combination, index);
        });
    }
}