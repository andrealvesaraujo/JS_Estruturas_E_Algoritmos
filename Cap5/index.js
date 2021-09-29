console.log("Basic Queue")
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
