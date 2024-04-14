const SPRITE_NAME = 'pinguin';
const TILE_WIDTH = 59;
const TILE_HEIGHT = 98;
const FRAMES = 5;

export default class Pinguin extends Phaser.GameObjects.Sprite {

    private animate = true;
    private currentFrame = 1;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITE_NAME);
        scene.add.existing(this);
    }

}