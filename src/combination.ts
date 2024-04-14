export enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}

export default class Combination {

    name: string;
    active: boolean = false;
    sequence: Direction[];
    color: number
    valid: boolean = false;
    index: number = 0;

    constructor(name: string, sequence: Direction[], color: number) {
        this.name = name;
        this.sequence = sequence;
        this.color = color;
    }

    addKey(direction: Direction) {
        if (this.sequence[this.index] === direction) {
            if (this.index == this.sequence.length - 1) {
                this.valid = true;
                return;
            }
            this.active = true;
            this.index++;
        } else {
            this.reset();
        }
    }

    reset() {
        this.active = false;
        this.index = 0;
        this.valid = false;
    }

}