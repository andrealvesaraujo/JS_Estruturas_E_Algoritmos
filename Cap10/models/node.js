export class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

export const Colors = {
    RED: 1,
    BLACK: 2,
}
export class RedBlackNode extends Node {
    constructor(key) {
        super(key)
        this.key = key
        this.color = Colors.RED
        this.parent = null
    }

    isRed(){
        return this.color === Colors.RED
    }
}