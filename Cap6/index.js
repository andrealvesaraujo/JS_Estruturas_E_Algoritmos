import {defaultEquals} from "/utils.js"
import {Node, DoublyNode} from "./models/Node.js"

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

class DoublyLinkedList extends LinkedList{
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
        this.tail = undefined
    }

    insert(element, index) {
        if(index>=0 && index<=this.count){
            const node = new DoublyNode(element)
            let current = this.head
            if(index === 0){

                if(this.head == null){
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head
                    current.prev = node
                    this.head = node
                }

            }else if(index === this.count) {
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node
            } else {
                const previus = this.getElementAt(index-1)
                current = previus.next
                node.next = current
                previus.next = node
                current.prev = node 
                node.prev = previus
            }
            this.count++
            return true
        }
        return false
    }

    push(element) {
        const node = new DoublyNode(element);
        if (this.head == null) {
          this.head = node;
          this.tail = node;
        } else {
          this.tail.next = node;
          node.prev = this.tail;
          this.tail = node;
        }
        this.count++;
    }

    removeAt(index) {
        if(index >=0 && index < this.count){
            let current = this.head
            if(index === 0){
                this.head = current.next
                if(this.count === 1){
                    this.tail = undefined
                }else{
                    this.head.prev = undefined
                }
            }else if(index === this.count -1){
                current = this.tail
                this.tail = current.prev
                this.tail.next = undefined
            }else{
                current = this.getElementAt(index)
                const previous = current.prev
                console.log(previous)
                previous.next = current.next
                current.next.prev = previous
            }
            this.count--
            return current.element
        }
        return undefined
    }

}


const dblist = new DoublyLinkedList()

dblist.insert("A", 0)
dblist.insert("B", 1)
dblist.insert("C", 2)
dblist.insert("D", 3)
console.log(`DoublyLinkedList ${dblist}`)

console.log("Removed Element of index 0: ", dblist.removeAt(0))
console.log("Removed Element of index 2: ", dblist.removeAt(2))
console.log("Removed Element of index 1: ", dblist.removeAt(1))
console.log(`DoublyLinkedList ${dblist}`)


class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
    }

    insert(element, index) {
        if(index >= 0 && index <= this.count){
            const node = new Node(element)
            let current = this.head
            
            if(index === 0){

                if(this.head == null){
                    this.head = node
                    node.next = this.head
                }else{
                    node.next = current
                    current = this.getElementAt(this.size())
                    this.head = node
                    current.next = this.head
                }

            }else{
                const previus = this.getElementAt(index-1)
                node.next = previus.next
                previus.next = node
            }
            this.count++
            return true
        }
        return false
    }

    removeAt(index) {
        if(index >=0 && index < this.count) {
            let current = this.head
            if(index === 0){
                if(this.size() === 1){
                    this.head = undefined
                }else{
                    const removed = this.head
                    current = this.getElementAt(this.size())
                    this.head = this.head.next
                    current.next = this.head
                    current = removed
                }
            }else {
                const previus = this.getElementAt(index-1)
                current = previus.next
                previus.next = current.next
            }
            this.count--
            return current.element
        }
        return undefined
    }

}


const circularlist = new CircularLinkedList()

circularlist.insert("AB", 0)
circularlist.insert("BC", 1)
circularlist.insert("CD", 2)
circularlist.insert("DE", 3)
console.log(`CircularLinkedList ${circularlist}`)

console.log("Removed Element of index 0: ", circularlist.removeAt(0))
console.log("Removed Element of index 2: ", circularlist.removeAt(2))
console.log("Removed Element of index 1: ", circularlist.removeAt(1))
console.log(`CircularLinkedList ${circularlist}`)


const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

export function defaultCompare(a,b) {
    if(a===b) {
        return 0
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN    
}

class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare){
        super(equalsFn)
        this.compareFn = compareFn
    }

    insert(element, index=0){
        if(this.isEmpty()) {
            return super.insert(element,0)
        }
        const pos = this.getIndexNextSortedElement(element)
        return super.insert(element,pos)
    }   

    getIndexNextSortedElement(element) {
        let current = this.head
        let i = 0
        for(; i< this.size() && current; i++){
            const comp = this.compareFn(element,current.element)
            if(comp === Compare.LESS_THAN){
                return i
            }
            current = current.next
        }
        return i
    }
}


const sortedLinkedList = new SortedLinkedList()

sortedLinkedList.insert(10)
console.log(`SortedLinkedList ${sortedLinkedList}`)
sortedLinkedList.insert(30)
console.log(`SortedLinkedList ${sortedLinkedList}`)
sortedLinkedList.insert(35)
console.log(`SortedLinkedList ${sortedLinkedList}`)
sortedLinkedList.insert(15)
console.log(`SortedLinkedList ${sortedLinkedList}`)
sortedLinkedList.insert(40)
console.log(`SortedLinkedList ${sortedLinkedList}`)
sortedLinkedList.insert(1)
console.log(`SortedLinkedList ${sortedLinkedList}`)


class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList()
    }

    push(element){
        this.items.push(element)
    }

    pop() {
        if(this.isEmpty()) {
            return undefined
        }
        return this.items.removeAt(this.size() - 1)
    }

    peek() {
        if(this.isEmpty()) {
            return undefined
        }
        return this.items.getElementAt(this.size() - 1).element
    }

    isEmpty(){
        return this.items.isEmpty()
    } 

    size(){
        return this.items.size()
    }

    clear(){
        this.items.clear()        
    }

    toString(){
        return this.items.toString()
    }
}


const stackLinkedList = new StackLinkedList()
stackLinkedList.push(5)
stackLinkedList.push(10)
stackLinkedList.push(20)
stackLinkedList.push(15)

console.log(`StackLinkedList ${stackLinkedList}`)
console.log("StackLinkedList is Empty? ", stackLinkedList.isEmpty())
console.log("StackLinkedList Size: ", stackLinkedList.size())
console.log("StackLinkedList PEEK: ", stackLinkedList.peek())

console.log("StackLinkedList POP: ", stackLinkedList.pop())
console.log(`StackLinkedList ${stackLinkedList}`)
console.log("StackLinkedList POP: ", stackLinkedList.pop())
console.log(`StackLinkedList ${stackLinkedList}`)
