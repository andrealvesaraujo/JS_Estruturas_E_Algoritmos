import { Compare, defaultCompare} from './util.js'

console.log("MinHeap")

function swap(array, a, b) {
    const temp = array[a]
    array[a] = array[b]
    array[b] = temp
}

export class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.heap = []
    }

    getLeftIndex(index){
        return 2 * index + 1
    }

    getRightIndex(index){
        return 2 * index + 2
    }

    getParentIndex(index){
        if(index === 0){
            return undefined
        }
        return Math.floor((index - 1)/2)
    }

    insert(value){
        if(value != null){
            this.heap.push(value)
            this.siftUp(this.heap.length - 1)
            return true
        }
        return false
    }

    siftUp(index){
        let parent = this.getParentIndex(index)
        while(index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN) {
            swap(this.heap, parent, index)
            index = parent
            parent = this.getParentIndex(index)
        }
    }

    size(){
        return this.heap.length
    }

    isEmpty(){
        return this.size() === 0
    }

    findMinimum(){
        return this.isEmpty() ? undefined : this.heap[0]
    }

    extract(){
        if(this.isEmpty()){
            return undefined
        }
        if(this.size() === 1){
            return this.heap.shift()
        }
        const removedValue = this.heap.shift()
        this.siftDown(0)
        return removedValue
    }

    siftDown(index){
        let element = index
        const left = this.getLeftIndex(index)
        const right = this.getRightIndex(index)
        const size = this.size()

        if(left < size && this.compareFn(this.heap[element], this.heap[left]) > Compare.BIGGER_THAN){
            element = left
        }

        if(right < size && this.compareFn(this.heap[element], this.heap[right]) > Compare.BIGGER_THAN){
            element = right
        }

        if(index !== element){
            swap(this.heap, index, element)
            this.siftDown(element)
        }
    }
}

const minHeap = new MinHeap()
console.log("Insert value '2' in MinHeap: ", minHeap.insert(2) )
console.log("Insert value '3' in MinHeap: ", minHeap.insert(3) )
console.log("Insert value '4' in MinHeap: ", minHeap.insert(4) )
console.log("Insert value '5' in MinHeap: ", minHeap.insert(5) )
console.log("Insert value '1' in MinHeap: ", minHeap.insert(1) )
console.log("MinHeap: ", minHeap.heap)
console.log("MinHeap size: : ", minHeap.size())
console.log("MinHeap is empty: ", minHeap.isEmpty())
console.log("MinHeap min value: ", minHeap.findMinimum())

const heap2 = new MinHeap()

for(let i = 0; i < 10; i++) {
    console.log(`Insert value '${i}' in MinHeap: `, heap2.insert(i) )
}
console.log("MinHeap2: ", heap2.heap)

console.log("Extract minimun in MinHeap2: ", heap2.extract())

console.log("------------------------------------------------")

console.log("MaxHeap")

function reverseCompare(compareFn){
    return (a,b) => compareFn(b,a)
}
export class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare){
        super(compareFn)
        this.compareFn = reverseCompare(compareFn)
    }
}

const maxHeap = new MaxHeap()
console.log("Insert value '2' in MaxHeap: ", maxHeap.insert(2) )
console.log("Insert value '3' in MaxHeap: ", maxHeap.insert(3) )
console.log("Insert value '4' in MaxHeap: ", maxHeap.insert(4) )
console.log("Insert value '5' in MaxHeap: ", maxHeap.insert(5) )
console.log("Insert value '1' in MaxHeap: ", maxHeap.insert(1) )
console.log("MaxHeap: ", maxHeap.heap)
console.log("MaxHeap size: : ", maxHeap.size())
console.log("MaxHeap is empty: ", maxHeap.isEmpty())
console.log("MaxHeap min value: ", maxHeap.findMinimum())

console.log("------------------------------------------------")

console.log("Heap Sort")

function heapify(array, index, heapSize, compareFn){
    let element = index
    const left = 2 * index + 1
    const right = 2 * index + 2
    const size = array.length;

    if(left < size && compareFn(array[element], array[left]) > Compare.BIGGER_THAN){
        element = left
    }

    if(right < size && compareFn(array[element], array[right]) > Compare.BIGGER_THAN){
        element = right
    }

    if(index !== element){
        swap(array, index, element)
        heapify(array, element, size, compareFn)
    }
}

function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length
    buildMaxHeap(array, compareFn)
    while(heapSize > 1){
        swap(array, 0, --heapSize)
        heapify(array, 0, heapSize, compareFn)
    }
    return array
}

function buildMaxHeap(array, compareFn) {
    for(let i = Math.floor(array.length / 2); i >= 0; i-=1){
        heapify(array, i, array.length, compareFn)
    }
    return array
}

const array = [7,6,3,5,4,1,2]
console.log('Before Sorting: ', array)
console.log('After Sorting: ', heapSort(array))
