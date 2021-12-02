import {defaultToString} from "/util.js"

class ValuePair {
    constructor(key,value) { 
        this.key = key;
        this.value = value;
    }
    toString() {
        return `#${this.key}: ${this.value}`;
    }
}

export class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {}
    }

    hasKey(key) {
        return this.table[this.toStrFn(key)] != null
    }

    set(key, value) {
        if(key != null && value != null) {
            const tableKey = this.toStrFn(key)
            this.table[tableKey] = new ValuePair(key, value)
            return true
        }
        return false;
    }

    remove(key) {
        if(this.hasKey(key)) {
            delete this.table[this.toStrFn(key)]
            return true
        }
        return false
    }

    get(key) {
        const valuePair = this.table[this.toStrFn(key)]
        return valuePair == null ? undefined : valuePair.value

        // OR

        // if(this.hasKey(key)) {
        //     return this.table[this.toStrFn(key)]
        // }
        // return undefined
    }

    keyValues() {
        return Object.values(this.table)

        // OR

        // const valuePair = []
        // for (const k in this.table) {
        //     if(this.hasKey(k)) {
        //         valuePair.push(this.table[k])
        //     }
        // }
        // return valuePair
    }

    keys(){
        return this.keyValues().map(valuePair => valuePair.key)

        // OR

        // const keys = []
        // const valuePair = this.keyValues()
        // for(let i = 0; i < valuePair.length; i++) {
        //     keys.push(valuePair[i].key)
        // }
        // return keys

    }

    values(){
        return this.keyValues().map(valuePair => valuePair.value)
    }

    forEach(callbackFn){
        const valuePairs = this.keyValues()
        for(let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
            if(result === false) {
                break
            }
        }
    }

    size() {
        return Object.keys(this.keyValues()).length;
    }

    isEmpty() {
        return this.size() === 0
    }

    clear() {
        this.table = {}
    }

    toString() {
        if(this.isEmpty()){
            return ''
        }
        const valuePairs = this.keyValues()
        let objString = `${valuePairs[0].toString()}`
        for(let i = 1; i< valuePairs.length; i++) {
            objString = `${objString}, ${valuePairs[i].toString()}`
        }
        return objString
    }
}

export class Queue {

    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items ={}
    }

    enqueue(element) {
        this.items[this.count] = element
        this.count++
    }


    dequeue() {
        
        if(this.isEmpty()) {
            return undefined
        }

        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result

    }

    peek(){
        if(this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount]
    }

    size(){
        return this.count - this.lowestCount;
    }

    isEmpty() {
        return this.count - this.lowestCount === 0
    }

    clear() {
        this.count = 0
        this.lowestCount = 0
        this.items ={}
    }

    toString() {
        if(this.isEmpty()) {
            return ''
        }
        let objString = `${this.items[this.lowestCount]}`
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`    
        }

        return objString
    }

}

export class Stack {
    constructor() {
        this.items = []
    }
    
    push(element) {
        this.items.push(element)
    }
    
    pop() {
        return this.items.pop()
    }

    peek() {
        return this.items[this.items.length - 1]
    }

    isEmpty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }

    clear() {
        this.items = []
    }

}
