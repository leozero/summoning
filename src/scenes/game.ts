import Phaser from "phaser";
import Combination, { Direction } from "../combination";
import GUI from "../prefab/gui";
import { Pentagram } from "../prefab/pentagram";
import { Shield } from "../prefab/shield";
import Pinguin from "../prefab/pinguin";
import { Monster } from "../prefab/monster";


export const SCENE_NAME = "game";

export enum Color {
    RED = 0xff0000,
    BLUE = 0x0000ff,
    GREEN = 0x00ff00,
}

export default class Game extends Phaser.Scene {

    private pentagram: Pentagram;
    private pinguin: Pinguin;
    private gui: GUI;
    private shields: Phaser.GameObjects.Group;
    private monsters: Phaser.GameObjects.Group;
    private shieldColliders: Phaser.GameObjects.Group;
    private centerX: number;
    private centerY: number;
    private combinations: Combination[] = [];
    private width: number;
    private height: number;
    private monsterInterval: number;
    private spotlight: Phaser.GameObjects.Light;
    public life = 5;
    public score = 0;
    private ennemySpeed = 20;
    private ennemySpawn = 1000;

    constructor() {
        super(SCENE_NAME);
        this.registerCombinations();
    }

    registerCombinations() {
        // RED
        this.combinations.push(new Combination(
            "Red shadow",
            [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT],
            Color.RED
        ));
        // BLUE
        this.combinations.push(new Combination(
            "Blue wind",
            [Direction.LEFT, Direction.LEFT, Direction.DOWN, Direction.UP],
            Color.BLUE
        ));
        // GREEN
        this.combinations.push(new Combination(
            "Green fire",
            [Direction.DOWN, Direction.RIGHT, Direction.DOWN, Direction.RIGHT],
            Color.GREEN
        ));
    }

    preload() {
        this.load.image("pentagram", "sprites/pentagram.png");
        this.load.spritesheet("pinguin", "sprites/pinguin.png", { frameWidth: 59, frameHeight: 98 });
        this.load.image("skeleton", "sprites/skeleton.png");
        this.load.image("zombie", "sprites/zombie.png");
        this.load.image("ghost", "sprites/ghost.png");
        this.load.image("arrow", "sprites/arrow.png");
        this.load.image("ground", "sprites/ground.png");
        this.load.image("heart", "sprites/heart.png");
        this.load.image("sword", "sprites/sword.png");
        this.load.image("wood", "sprites/wood.png");
        this.load.image("grave", "sprites/grave.png");
        this.load.image("tree", "sprites/tree.png");
        this.load.audio("shield", "sounds/shield.wav");
        this.load.audio("hurt", "sounds/hurt.wav");
        this.load.audio("hit", "sounds/hit.wav");
        this.load.audio("death", "sounds/death.wav");
    }

    setDimensions() {
        this.width = this.game.renderer.width;
        this.height = this.game.renderer.height;
        this.centerX = this.game.renderer.width / 2;
        this.centerY = this.game.renderer.height / 2;
    }

    spawnShield(color: number) {
        const shield = new Shield(this, this.centerX, this.centerY, color);
        this.shields.add(shield);
        this.shieldColliders.add(shield.circle);
        this.physics.add.overlap(this.monsters, shield.circle);
        shield.circle.on('overlap', (gameObject1, gameObject2) => {
            if (gameObject1.getData('color') === gameObject2.getData('color')) {
                gameObject1.destroy();
            }
        });
        this.pentagram.changeColor(color);
        this.spotlight.setColor(color);
        setTimeout(() => {
            this.pentagram.changeColor(0xffffff);
            this.spotlight.setColor(0xffffff);
        }, 700);
        this.pinguin.play('summon');
        this.sound.play("shield");
    }

    listenKeyboard(event) {
        switch (event.key) {
            case "ArrowLeft":
                this.checkKey(Direction.LEFT);
                break;
            case "ArrowRight":
                this.checkKey(Direction.RIGHT);
                break;
            case "ArrowUp":
                this.checkKey(Direction.UP);
                break;
            case "ArrowDown":
                this.checkKey(Direction.DOWN);
                break;
            default:
                break;
        }
    }

    checkKey(Direction: Direction) {
        this.combinations.forEach(combination => {
            combination.addKey(Direction);
            if (combination.valid) {
                this.spawnShield(combination.color);
                this.combinations.forEach(combination => combination.reset());
                this.gui.update();
                return;
            }
            this.gui.update();
        });

    }

    spawnMonster() {
        let x = 0;
        let y = 0;
        const random = Phaser.Math.Between(1, 4);
        switch (random) {
            case 1:
                x = Phaser.Math.Between(0, this.width);
                y = -100;
                break;
            case 2:
                x = -100;
                y = Phaser.Math.Between(0, this.height);
                break;
            case 3:
                x = Phaser.Math.Between(0, this.width);
                y = this.height + 100;
                break;
            case 4:
                x = this.width + 100;
                y = Phaser.Math.Between(0, this.height);
                break;

        }

        const monster = new Monster(this, x, y);

        this.physics.moveToObject(monster, this.pentagram, this.ennemySpeed++);
        this.monsters.add(monster);
        this.physics.add.overlap(this.monsters, this.pinguin);
    }

    getRandomDecoration() {
        const decorations = ["grave", "tree", "sword", "wood"];
        return decorations[Phaser.Math.Between(0, decorations.length - 1)];
    }

    create() {
        this.cameras.main.setZoom(3);
        this.cameras.main.zoomTo(1, 1000);
        this.setDimensions();
        this.life = 5;
        this.score = 0;

        /* Floor */
        this.add.tileSprite(0, 0, this.width, this.height, "ground").setOrigin(0, 0).setAlpha(0.5).setPipeline('Light2D');
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(0, 400);
            const y = Phaser.Math.Between(150, this.height);
            this.add.sprite(x, y, this.getRandomDecoration()).setScale(1.2).setPipeline('Light2D');
        }
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(600, this.width);
            const y = Phaser.Math.Between(150, this.height);
            this.add.sprite(x, y, this.getRandomDecoration()).setScale(1.2).setPipeline('Light2D');
        }
        for (let i = 0; i < 2; i++) {
            const x = Phaser.Math.Between(400, 600);
            const y = Phaser.Math.Between(0, 300);
            this.add.sprite(x, y, this.getRandomDecoration()).setScale(1.2).setPipeline('Light2D');
        }
        for (let i = 0; i < 2; i++) {
            const x = Phaser.Math.Between(400, 600);
            const y = Phaser.Math.Between(600, this.height);
            this.add.sprite(x, y, this.getRandomDecoration()).setScale(1.2).setPipeline('Light2D');
        }

        this.lights.enable();
        this.lights.setAmbientColor(0x808080);
        this.spotlight = this.lights.addLight(this.centerX, this.centerY, 280).setIntensity(3);

        /* GUI */
        this.gui = new GUI(this, 10, 10, this.combinations);

        /* Shields */
        this.shields = this.add.group();
        this.shieldColliders = this.add.group();
        this.shields.runChildUpdate = true;

        /* Player */
        this.pentagram = new Pentagram(this, this.centerX, this.centerY);

        this.pinguin = new Pinguin(this, this.centerX, this.centerY - 30);
        this.pinguin.setData("type", "player");
        this.physics.add.existing(this.pinguin);

        this.anims.create({
            key: 'summon',
            frames: this.anims.generateFrameNumbers('pinguin'),
            frameRate: 16
        });

        /* Monster */
        this.monsters = this.add.group();
        this.monsters.runChildUpdate = true;
        this.time.addEvent({
            callback: this.spawnMonster,
            callbackScope: this,
            delay: this.ennemySpawn--,
            loop: true
        });

        /* Collision */
        this.physics.world.on('overlap', (monster, gameObject) => {
            const type = gameObject.getData("type");
            if (type === 'player') {
                this.life--;
                this.sound.play("hurt", { volume: 2 });
                this.gui.update();
                if (this.life <= 0) {
                    this.clean();
                    this.sound.play("death");
                    this.scene.start("gameover", { score: this.score });
                }
                monster.destroy();
            }
            if (type === 'shield') {
                if (monster.getData('color') === gameObject.getData('color')) {
                    this.sound.play("hit");
                    monster.destroy();
                    this.score++;
                    this.gui.update();
                }
            }
        });

        /* Keyboard */
        this.input.keyboard?.on("keydown", () => this.listenKeyboard(event));
    }

    clean() {
        clearInterval(this.monsterInterval);
        this.combinations.forEach(combination => combination.reset());
    }
}