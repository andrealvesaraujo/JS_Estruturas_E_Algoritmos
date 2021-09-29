
console.log("Stack with Array")
class Stack {
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


const stack = new Stack()
console.log(stack.isEmpty())

stack.push(5)
stack.push(8)

console.log(stack)

console.log(stack.peek())

stack.push(10)
console.log(stack.size())
console.log(stack.isEmpty())

stack.push(15)
stack.pop()
stack.pop()
console.log(stack.size())


console.log("Stack with Object")

class ObjStack {
    constructor() {
        this.count = 0
        this.items = {}
    }
    
    push(element) {
        this.items[this.count] = element
        this.count++
    }
    
    pop() {
 
        if(this.isEmpty()) {
            return undefined
        }

        this.count--
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }

    peek() {
        if(this.isEmpty()) {
            return undefined
        }

        return this.items[this.count - 1]
    }

    isEmpty() {
        return this.count === 0
    }

    size() {
        return this.count
    }

    clear() {
        this.items = {}
        this.count = 0
    }

    toString() {
        if(this.isEmpty()) {
            return ""
        }
        let objString = `${this.items[0]}`
        for (let i = 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`
            
        }
        return objString
    }

}

const objStack = new ObjStack()
console.log(objStack.isEmpty())

objStack.push(5)
objStack.push(8)

console.log(objStack)

console.log(objStack.peek())

stack.push(10)
console.log(objStack.size())
console.log(objStack.isEmpty())

stack.push(15)
stack.pop()
stack.pop()
console.log(objStack.size())

console.log(objStack.toString())


console.log("Stack with Symbol")

const _items = Symbol('stackItems')
class SymbolStack {
    constructor() {
        this[_items] = []
    }
    
    push(element) {
        this[_items].push(element)
    }
    
    pop() {
        return this[_items].pop()
    }

    peek() {
        return this[_items][this[_items].length - 1]
    }

    isEmpty() {
        return this[_items].length === 0
    }

    size() {
        return this[_items].length
    }

    clear() {
        this[_items] = []
    }

}


const symbolStack = new SymbolStack()
console.log(symbolStack.isEmpty())

symbolStack.push(5)
symbolStack.push(8)

console.log(symbolStack)

let objectSymbols = Object.getOwnPropertySymbols(symbolStack)

console.log(objectSymbols.length)
console.log(objectSymbols)
console.log(objectSymbols[0])
symbolStack[objectSymbols[0]].push(1)

console.log(symbolStack)

console.log("Stack with WeakMap")

const items = new WeakMap()
class WeakMapStack {

    constructor(){
        items.set(this,[])
    }

    push(element){
        const s = items.get(this)
        s.push(element)
    }

    pop() {
        const s = items.get(this)
        const r = s.pop()
        return r
    }

    peek() {
        const s = items.get(this)
        return s[s.length - 1]
    }

    isEmpty() {
        const s = items.get(this)
        return s.length === 0
    }

    size() {
        const s = items.get(this)
        return s.length
    }

    clear() {
        items.set(this,[])
    }

    toString() {
        return items
    }

}


const weakMapStack = new WeakMapStack()

weakMapStack.push(5)
weakMapStack.push(8)
weakMapStack.push(10)

console.log(weakMapStack.size())
console.log(weakMapStack.peek())
console.log(weakMapStack.toString())

weakMapStack.pop()
weakMapStack.pop()

console.log(weakMapStack.toString())

console.log("Convertendo Numeros Decimais para Binários")

function decimalToBinary(decNumber) {
    const remStack = new Stack()
    let number = decNumber
    let rem;
    let binaryString = ''

    while(number > 0) {
        rem = Math.floor(number % 2)
        remStack.push(rem)
        number = Math.floor(number / 2)
    }

    while(!remStack.isEmpty()) {
        binaryString += remStack.pop().toString()
    }

    return binaryString
}

console.log("Decimal: 10 e Binario: " + decimalToBinary(10))
console.log("Decimal: 233 e Binario: " + decimalToBinary(233))
console.log("Decimal: 1000 e Binario: " + decimalToBinary(1000))


console.log("Convertendo Numeros Decimais para Binários")

function decimalToAnyBase(decNumber, base) {
    const remStack = new Stack()
    let number = decNumber
    let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let rem;
    let binaryString = ''

    if(!(base>=2 && base <=36)) {
        return ''
    }

    while(number > 0) {
        rem = Math.floor(number % base)
        remStack.push(rem)
        number = Math.floor(number / base)
    }

    while(!remStack.isEmpty()) {
        binaryString += digits[remStack.pop()]
    }

    return binaryString
}

console.log("Decimal: 1000 e Binario: " + decimalToAnyBase(1000,2))
console.log("Decimal: 1000 e Octal: " + decimalToAnyBase(1000,8))
console.log("Decimal: 1000 e Hexadecimal: " + decimalToAnyBase(1000,16))
console.log("Decimal: 1000 e Base 35: " + decimalToAnyBase(1000, 35))