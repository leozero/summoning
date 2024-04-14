const SPRITE_NAME = 'pentagram';

export class Pentagram extends Phaser.GameObjects.Sprite {

    private fx;
    private tween: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITE_NAME);
        scene.add.existing(this);
        this.fx = this.postFX.addGlow(0xffffff, 1, 2, false, 0.1, 10);
        this.createTween();
    }

    createTween() {
        this.tween = this.scene.tweens.add({
            targets: this.fx,
            outerStrength: 4,
            yoyo: true,
            loop: -1,
            ease: 'sine.inout'
        });
    }

    changeColor(color: number) {
        this.setTint(color);
        this.tween.stop();
        this.fx.color = color;
        this.tween.restart();
    }
}