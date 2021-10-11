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

        if(index>=0 && index < this.count) {

            let node = this.head

            for (let i = 0; i < index && node != null; i++) {
                node = node.next
            }

            return node
        }
        return undefined
    }

}

const list = new LinkedList()
list.push(5)
list.push(10)
list.push(15)
list.push(18)
list.push(20)
list.push(25)

console.log(list)
console.log("Removed Element: ", list.removeAt(3))
console.log("Removed Element: ", list.removeAt(4))
console.log(list)
console.log("Search element at position 2: ", list.getElementAt(1).element)
