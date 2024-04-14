export default class IntroScene extends Phaser.Scene {
    constructor() {
        super("intro");
    }

    preload() {
        this.load.image("intro", "sprites/intro.png");
        this.load.image("pentagram", "sprites/pentagram.png");
        this.load.audio("music", "sounds/music.mp3");
    }

    create() {
        this.sound.add("music").play({ loop: true, volume: 0.35 });
        this.add.image(0, 0, "intro").setOrigin(0);
        this.add.image((this.game.renderer.width / 2) + 200, (this.game.renderer.height / 2) - 100, "pentagram");
        const title = this.add.text((this.game.renderer.width / 2) + 200, this.game.renderer.height / 2 - 300, 'The wizard penguin'.toLocaleUpperCase(), { color: '#fff', fontSize: "50px", fontStyle: "bold" }).setOrigin(0.5);
        title.setStroke('red', 16);

        this.add.text((this.game.renderer.width / 2) + 200, this.game.renderer.height / 2 - 200, 'Use your arrow keys to summon\nshield and defeat the monsters', { color: '#fff', fontSize: "25px", fontStyle: "bold" }).setOrigin(0.5);
        const clickToStart = this.add.text((this.game.renderer.width / 2) + 200, this.game.renderer.height / 2, 'CLICK TO START', { color: 'red', fontSize: "25px", fontStyle: "bold" }).setOrigin(0.5);

        this.tweens.add({
            targets: clickToStart,
            alpha: 0,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        this.input.on('pointerdown', () => {
            this.scene.start("game");
        });
    }
}