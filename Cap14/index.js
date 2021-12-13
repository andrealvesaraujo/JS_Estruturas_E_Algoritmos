import { Compare, defaultCompare, defaultEquals, defaultDiff} from './utils.js'

console.log("Algorithms Designs and techniques")

console.log("----------------------------------------------------------------")

console.log("Divide and Conquer")

console.log("----------------------------------------------------------------")

const array = [8,7,6,5,4,3,2,1]
console.log("Creating Array Not Sorted:")
console.log(array.join())
console.log("")

const DOES_NOT_EXIST = -1

function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]]
}

function quickSort(array, compareFn = defaultCompare) {
    return quick(array, 0, array.length - 1, compareFn)
}

function quick(array, left, right, compareFn) {
    let index 
    if(array.length > 1){
        index = partition(array, left, right, compareFn)
        if(left < index - 1){
            quick(array, left, index-1, compareFn)
        }
        if(index < right){
            quick(array, index, right, compareFn)
        }
    }
    return array
}   

function partition(array, left, right,compareFn) {
    const pivot = array[Math.floor((right+left)/2)];
    let i = left
    let j = right 
    while(i<= j){
        while(compareFn(array[i], pivot) === Compare.LESS_THAN){
            i++
        }
        while(compareFn(array[j], pivot) === Compare.BIGGER_THAN){
            j--
        }
        if(i<=j){
            swap(array, i, j)
            i++
            j--
        }
    }
    return i
}


export function binarySearch(array, value, compareFn = defaultCompare){
    const sortedArray = quickSort(array)
    const low = 0 
    const high = array.length - 1
    return binarySearchRecursive(array,value,low,high,compareFn)
}

export function binarySearchRecursive(array,value,low,high,compareFn = defaultCompare){
    if(low<=high){
        const mid = Math.floor((low+high)/2)
        const element = array[mid]
        if(compareFn(element,value) === Compare.LESS_THAN){
            return binarySearchRecursive(array,value,mid+1,high, compareFn)
        }else if(compareFn(element,value) === Compare.BIGGER_THAN){
            return binarySearchRecursive(array,value,low,mid-1, compareFn)
        } else{
            return mid
        }
    }
    return DOES_NOT_EXIST
}

console.log("Binary Search Recursive")
let resultSearch  =  binarySearch(array,2)
console.log("Search number 2. Index of Array: ",resultSearch)
console.log("")

