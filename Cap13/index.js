import { Compare, defaultCompare} from './utils.js'

console.log("Sorting and Search algorithms")

console.log("----------------------------------------------------------------")

function createNonSortedArray(size) {
    const array = []
    for(let i = size; i > 0; i--) {
        array.push(i)
    }
    return array
}

let array = createNonSortedArray(5)
console.log("Creating Non Sorted Array:")
console.log(array.join())
console.log("")

function swap(array, a, b) {
    // const temp = array[a]
    // array[a] = array[b]
    // array[b] = temp
    [array[a], array[b]] = [array[b], array[a]]
}

function bubbleSort(array, compareFn = defaultCompare) {
    const {length} = array
    for(let i=0; i< length; i++){
        for (let j = 0; j < length - 1; j++){
            if(compareFn(array[j], array[j+1]) === Compare.BIGGER_THAN){
                swap(array, j, j+1)
            }
        }
    }
    return array
}

console.log("Bubble Sort:")
array =  bubbleSort(array)
console.log(array.join())

function modifiedBubbleSort(array, compareFn = defaultCompare) {
    const {length} = array
    for(let i=0; i< length; i++){
        for (let j = 0; j < length - 1 - i; j++){
            if(compareFn(array[j], array[j+1]) === Compare.BIGGER_THAN){
                swap(array, j, j+1)
            }
        }
    }
    return array
}

console.log("Modified Bubble Sort:")
array =  modifiedBubbleSort(array)
console.log(array.join())
console.log("")

console.log("----------------------------------------------------------------")

array = createNonSortedArray(5)
console.log("Creating Non Sorted Array:")
console.log(array.join())
console.log("")

function selectionSort(array, compareFn = defaultCompare) {
    const {length} = array
    let indexMin;
    for (let i = 0; i<length-1; i++){
        indexMin = i
        for (let j = i; j< length; j++) {
            if(compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN){
                indexMin = j
            }
        }
        if(i !== indexMin){
            swap(array, i , indexMin)
        }
    }
    return array
}

console.log("Selection Sort:")
array =  selectionSort(array)
console.log(array.join())
console.log("")

console.log("----------------------------------------------------------------")

array = [3,5,1,4,2]
console.log("Creating Array with First Index is Sorted:")
console.log(array.join())
console.log("")

function insertionSort(array, compareFn = defaultCompare) {
    const {length} = array
    let temp;
    for (let i = 1; i<length; i++){
        let j = i
        temp = array[i]
        while(j>0 && compareFn(array[j-1], temp) === Compare.BIGGER_THAN){
            array[j] = array[j-1]
            j--
        }
        array[j] = temp
    }
    return array
}

console.log("Insertion Sort:")
array =  insertionSort(array)
console.log(array.join())
console.log("")

console.log("----------------------------------------------------------------")
