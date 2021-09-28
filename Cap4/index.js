
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
