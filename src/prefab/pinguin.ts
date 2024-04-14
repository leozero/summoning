const SPRITE_NAME = 'pinguin';

export default class Pinguin extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITE_NAME);
        scene.add.existing(this);
    }

}