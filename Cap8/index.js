import {defaultToString} from "/utils.js"

export default class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {}
    }
}

console.log("My Dictionary");