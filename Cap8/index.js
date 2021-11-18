import {defaultToString} from "/utils.js"

class ValuePair {
    constructor(key,value) { 
        this.key = key;
        this.value = value;
    }
    toString() {
        return `#${this.key}: ${this.value}`;
    }
}

export default class Dictionary {
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

console.log("My Dictionary");

const dictionary = new Dictionary();

console.log("Adding Gandalf and his email")
dictionary.set('Gandalf', 'gandalf@email.com')

console.log("Adding Aragorn and his email")
dictionary.set('Aragorn', 'aragorn@email.com')

console.log("Adding Gimli and his email")
dictionary.set('Gimli', 'gimli@email.com')

console.log("Dictionary size: ",dictionary.size())
console.log("Dictionary keys: ",dictionary.keys())
console.log("Dictionary values: ", dictionary.values())
console.log("Get Aragorn email: ", dictionary.get('Aragorn'));
console.log("Check If Have Legolas: ", dictionary.hasKey('Legolas'));
console.log("Remove Gimli: ", dictionary.remove('Gimli'));

console.log("Adding Legolas and his email")
dictionary.set('Legolas', 'legolas@email.com')

console.log("Dictionary keys: ",dictionary.keys())
console.log("Dictionary values: ", dictionary.values())
console.log("Dictionary keyValues: ", dictionary.keyValues())

console.log('Dictionary forEach: ')
dictionary.forEach((k,v)=>{
    console.log(`key: ${k}, value: ${v}`)
})