import { Compare, defaultCompare, defaultEquals} from './utils.js'

console.log("Complexity of Algorithms")

console.log("Example of O(1)")

function increment(num){
    let cost = 0
    ++cost
    console.log(`cost for increment with input value ${num} is ${cost}`)
    return ++num;
}

increment(1)
increment(10)
increment(100)

console.log("Example of O(n)")

function sequentialSearch(array, value, equalsFn = defaultEquals){
    let cost = 0
    for (let i = 0; i < array.length; i++){
        cost++
        if(equalsFn(value, array[i])){
            return i
        }
    }
    console.log(`cost for sequentialSearch with input size ${array.length} is ${cost}`)
    return -1
}

sequentialSearch(new Array(10).fill(5), -1)
sequentialSearch(new Array(100).fill(5), -1)
sequentialSearch(new Array(1000).fill(5), -1)

console.log("Example of O(n²)")

function swap(array, index1, index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
}

function bubbleSort(array, compareFn = defaultCompare){
    const {length} = array
    let cost = 0
    for (let i = 0; i < length; i++){
        cost++
        for (let j = 0; j < length-1; j++){
            cost++
            if(compareFn(array[j], array[j+1]) === Compare.BIGGER_THAN){
                swap(array, j, j+1)
            }
        }
    }
    console.log(`cost for bubbleSort with input size ${length} is ${cost}`)
    return array
}

bubbleSort(new Array(10).fill(5))
bubbleSort(new Array(100).fill(5))
bubbleSort(new Array(1000).fill(5))
