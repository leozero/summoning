const INITIAL_RADIUS = 50;

export class Shield extends Phaser.GameObjects.Container {

    public circle;

    constructor(scene: Phaser.Scene, x: number, y: number, color: number) {
        super(scene, x, y);
        this.circle = scene.add.circle(x, y, INITIAL_RADIUS, 0x000000, 0);
        this.circle.setStrokeStyle(5, color);
        this.circle.setData("color", color);
        this.circle.setData("type", "shield");
        this.scene.physics.add.existing(this.circle);
        this.postFX.addGlow(color, 0, 0, false, 0.1, 50);
    }

    update() {
        this.circle.setRadius(this.circle.radius + 2);
        // @ts-ignore
        this.circle.body?.setCircle(this.circle.radius + 1);
        if (this.circle.radius > 200) {
            this.circle.alpha -= 0.01;
        }
        if (this.circle.radius > 400) {
            this.circle.destroy();
            this.destroy();
        }
    }

}