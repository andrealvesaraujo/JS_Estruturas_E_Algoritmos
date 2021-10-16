import {defaultEquals} from "/utils.js"
import {Node} from "./models/Node.js"

console.log("Linked List")

export default class LinkedList {
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
        if(index >= 0 && index <= this.size()) {
            const node = new Node(element)
            if(index===0){
                let current = this.head
                node.next = current
                this.head = node
            }else {
                const previus = this.getElementAt(index-1)
                let current = previus.next 
                node.next = current
                previus.next = node
            }
            this.count++
            return true
        }
        return false 
    }

    removeAt(index) {

        if(index>=0 && index < this.size()) {

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

        if(index>=0 && index < this.size()) {

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
        for(let i = 0; i < this.size() && current!=null; i++){
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
        if(this.isEmpty()){
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

const list = new LinkedList()
list.push(5)
list.push(10)
list.push(15)
list.push(18)
list.push(20)
list.push(25)

console.log(`List ${list}`)
console.log("Removed Element of index 3: ", list.removeAt(3))
console.log("Removed Element of index 4: ", list.removeAt(4))
console.log(`List ${list}`)


console.log("Search element at position 2: ", list.getElementAt(1).element)

list.insert("A", 3)
list.insert("B", 5)
list.insert("C", 0)
console.log(`List ${list}`)


console.log("Search index of element 'A': ", list.indexOf("A"))
console.log("Search index of element 'C': ", list.indexOf("C"))
console.log("Search index of element 'ABC': ", list.indexOf("ABC"))
console.log("Removed Element ''B': ", list.remove("B"))
console.log(`List ${list}`)

console.log("Head of List: ", list.getHead())
console.log("List is Empty? ", list.isEmpty())
console.log("List Size: ", list.size())



