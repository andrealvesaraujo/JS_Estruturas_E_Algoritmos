import {defaultToString, defaultEquals} from "/utils.js"
import {Node} from "./models/Node.js"

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

console.log("Dictionary:");
console.log(dictionary.toString())

console.log('Dictionary forEach: ')
dictionary.forEach((k,v)=>{
    console.log(`key: ${k}, value: ${v}`)
})

console.log("--------------------------------")

console.log("My HashTable");

class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }

    loseloseHashCode(key) {
        if(typeof key === 'number') {       
            return key
        }
        const tableKey = this.toStrFn(key)
        let hash = 0
        for(let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i)
        }
        return hash % 37
    }

    hashCode(key) {
        return this.loseloseHashCode(key)
    }

    put(key, value) {
        if(key !== null && value !== null) {
            const position = this.hashCode(key)
            this.table[position] = new ValuePair(key,value)
            return true
        }
        return false
    }

    get(key){
        const valuePair = this.table[this.hashCode(key)]
        return valuePair == null ? null : valuePair.value
    }

    remove(key) {
        const hash = this.hashCode(key)
        const valuePair = this.table[hash]
        if(valuePair != null) {
            delete this.table[hash]
            return true
        }
        return false
    }

    keyValues() {
        return Object.values(this.table)
    }

    keys(){
        return this.keyValues().map(valuePair => valuePair.key)

    }

    values(){
        return this.keyValues().map(valuePair => valuePair.value)
    }

    size() {
        return Object.keys(this.keyValues()).length;
    }

    isEmpty() {
        return this.size() === 0
    }

    toString() {
        if(this.isEmpty()){
            return ''
        }
        const keys = Object.keys(this.table)
        let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
        for (let i = 1; i < keys.length; i++) {
            objString = `${objString}, {${keys[i]} => ${this.table[keys[i]].toString()}}`
        }
        return objString
    }

}

const hashTable = new HashTable();

console.log("Adding Gandalf and his email")
hashTable.put('Gandalf', 'gandalf@email.com')

console.log("Adding Aragorn and his email")
hashTable.put('Aragorn', 'aragorn@email.com')

console.log("Adding Gimli and his email")
hashTable.put('Gimli', 'gimli@email.com')

console.log(hashTable.hashCode('Gandalf') + ' - Gandalf');
console.log(hashTable.hashCode('Aragorn') + ' - Aragorn');
console.log(hashTable.hashCode('Gimli') + ' - Gimli');
console.log("Get Gandalf email: ", hashTable.get('Gandalf'));
console.log("Get Aragorn email: ", hashTable.get('Aragorn'));
console.log("Get Legolas email: ", hashTable.get('Legolas'));
console.log("Remove Gandalf: ", hashTable.remove('Gandalf'))
console.log("Get Gandalf email: ", hashTable.get('Gandalf'));

console.log("HashTable:");
console.log(hashTable.toString());

console.log("Adding A Lot of People")
hashTable.put('Ygritte', 'Ygritte@email.com')
hashTable.put('Jonathan', 'Jonathan@email.com')
hashTable.put('Jamie', 'Jamie@email.com')
hashTable.put('Jack', 'Jack@email.com')
hashTable.put('Jasmine', 'Jasmine@email.com')
hashTable.put('Jake', 'Jake@email.com')
hashTable.put('Nathan', 'Nathan@email.com')
hashTable.put('Athelstan', 'Athelstan@email.com')
hashTable.put('Sue', 'Sue@email.com')
hashTable.put('Aethelwulf', 'Aethelwulf@email.com')
hashTable.put('Sargeras', 'Sargeras@email.com')

console.log("HashTable:");
console.log(hashTable.toString());

console.log("--------------------------------")

class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0
        this.head = undefined
        this.equalsFn = equalsFn
    }

    push(element) {
        let node = new Node(element)
        let current
        
        if(this.head == null) {
            this.head = node
        }else {
            current = this.head

            while(current.next!=null) {
                current = current.next
            }
            current.next = node
        }
        this.count++
    }

    insert(element, index) {
        if(index >= 0 && index <= this.count) {
            const node = new Node(element)
            if(index===0){
                const current = this.head
                node.next = current
                this.head = node
            }else {
                const previus = this.getElementAt(index-1)
                const current = previus.next 
                node.next = current
                previus.next = node
            }
            this.count++
            return true
        }
        return false 
    }

    removeAt(index) {

        if(index>=0 && index < this.count) {

            let current = this.head
            if(index === 0){
                this.head = current.next
            } else {
                let previus = this.getElementAt(index-1)
                current = previus.next
                previus.next = current.next
            } 
            this.count--
            return current.element
        }

        return undefined
    }

    getElementAt(index) {

        if(index>=0 && index <= this.count) {

            let node = this.head

            for (let i = 0; i < index && node != null; i++) {
                node = node.next
            }

            return node
        }
        return undefined
    }

    indexOf(element) {
        let current = this.head 
        for(let i = 0; i < this.count && current!=null; i++){
            if(this.equalsFn(element, current.element)){
                return i
            }
            current = current.next
        }
        return -1 
    }

    remove(element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }

    size() {
        return this.count
    }

    isEmpty(){
        return this.size() === 0
    }

    getHead() {
        return this.head
    }
    
    toString() {
        if(this.head == null){
            return ''
        }
        let objString = `${this.head.element}`
        let current = this.head.next
        for (let i = 1; i < this.size() && current!=null; i++) {
            objString = `${objString}, ${current.element}`
            current = current.next            
        }
        return objString
    }

}

