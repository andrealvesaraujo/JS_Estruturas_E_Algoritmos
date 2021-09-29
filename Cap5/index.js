console.log("Queue")
class Queue {

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

const queue = new Queue()

console.log("isEmpty: ",queue.isEmpty())

queue.enqueue("Jonh")
queue.enqueue("Luke")

console.log("Queue: ",queue.toString())

queue.enqueue("Camila")

console.log("Queue: ", queue.toString())
console.log("size: ",queue.size())
console.log("isEmpty: ",queue.isEmpty())

queue.dequeue()
queue.dequeue()

console.log("Queue: ",queue.toString())

console.log("Deque")
class Deque {

    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items ={}
    }

    addFront(element){
        if(this.isEmpty()){
            this.addBack(element)
        }else if(this.lowestCount > 0){
            this.lowestCount--
            this.items[this.lowestCount] = element
        }else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i-1]                
            }
            this.count++
            this.lowestCount = 0
            this.items[0] = element
        }
    }


    addBack(element){
        this.items[this.count] = element
        this.count++
    }

    removeFront() {
        
        if(this.isEmpty()) {
            return undefined
        }

        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result

    }

    removeBack() {

        if(this.isEmpty()) {
            return undefined
        }
        this.count--
        const result = this.items[this.count]
        delete this.items[this.count]
        return result

    }

    peekFront(){
        if(this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount]
    }

    peekBack(){
        if(this.isEmpty()) {
            return undefined
        }

        return this.items[this.count - 1]
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


const deque = new Deque()

console.log("isEmpty: ",deque.isEmpty())

deque.addBack("Jonh")
deque.addBack("Luke")

console.log("Deque: ",deque.toString())

deque.addBack("Camila")

console.log("Deque: ", deque.toString())
console.log("size: ",deque.size())
console.log("isEmpty: ",deque.isEmpty())

deque.removeFront()
console.log("Deque: ", deque.toString())

deque.removeBack()
console.log("Deque: ", deque.toString())

deque.addFront("Jack")

console.log("Deque: ", deque.toString())