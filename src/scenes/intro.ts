export default class IntroScene extends Phaser.Scene {
    constructor() {
        super("intro");
    }

    preload() {
        this.load.image("logo", "sprites/logo.png");
        this.load.image("pentagram", "sprites/pentagram.png");
        this.load.audio("music", "sounds/music.mp3");
    }

    create() {
        this.sound.add("music").play({ loop: true, volume: 0.35 });
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "pentagram");
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 - 100, 'Use your arrow keys to summon\nshield and defeat the monsters', { color: '#fff', fontSize: "25px", fontStyle: "bold" }).setOrigin(0.5);
        this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'CLICK TO START', { color: '#fff', fontSize: "20px", fontStyle: "bold" }).setOrigin(0.5);
        this.input.on('pointerdown', () => {
            this.scene.start("game");
        });
    }
}