import { Color } from "../scenes/game";

const SPRITE_NAME = 'zombie';

export class Monster extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        const randomNum = Phaser.Math.Between(0, 2);
        super(scene, x, y, Monster.getRandomSpriteName(randomNum));
        const color = this.getRandomColor(randomNum);
        console.log(color);
        this.scene.add.existing(this);
        this.setData("color", color);
        this.setData("type", "monster")
        const fx = this.postFX.addGlow(color, 1, 2, false, 0.1, 10);
        this.scene.physics.add.existing(this);
        this.z = -5;
        this.body.onOverlap = true;

    }


    static getRandomSpriteName(index: number) {
        const names = ['zombie', 'ghost', 'skeleton'];
        return names[index];

    }

    getRandomColor(index: number) {
        const colors = [Color.GREEN, Color.BLUE, Color.RED];
        return colors[index];
    }

    preUpdate() {
        if (this.x > this.scene.centerX) {
            this.setFlipX(true);
        } else {
            this.setFlipX(false);
        }
    }

} 