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

array = createNonSortedArray(8)
console.log("Creating Non Sorted Array:")
console.log(array.join())
console.log("")

function mergeSort(array, compareFn = defaultCompare) {
    if(array.length > 1){
        const {length} = array
        const middle = Math.floor(length / 2)
        const left = mergeSort(array.slice(0,middle), compareFn)
        const right = mergeSort(array.slice(middle, length), compareFn)
        array = merge(left, right, compareFn)
    }
    return array
}

function merge(left, right,compareFn) {
    let i = 0
    let j = 0 
    const result = []
    while(i<left.length && j<right.length) {
        result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++])
    } 
    return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

console.log("Merge Sort:")
array =  mergeSort(array)
console.log(array.join())
console.log("")

console.log("----------------------------------------------------------------")

array = [3,5,1,6,4,7,2]
console.log("Creating Non Sorted Array:")
console.log(array.join())
console.log("")

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

console.log("Quick Sort:")
array =  quickSort(array)
console.log(array.join())
console.log("")

console.log("----------------------------------------------------------------")


array = [5,4,3,2,3,1]
console.log("Creating Non Sorted Array:")
console.log(array.join())
console.log("")

function countingSort(array) {
    if(array.length < 2){
        return array
    }
    const maxValue = findMaxValue(array)
    const counts = new Array(maxValue+1)
    array.forEach(element =>{
        if(!counts[element]){
            counts[element] = 0
        }
        counts[element] ++
    })
    let sortedIndex = 0
    counts.forEach((count, i)=>{
        while(count > 0){
            array[sortedIndex++] = i
            count--
        }
    })
    return array
}

function findMaxValue(array) {
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
        if(array[i]>max){
            max = array[i]
        }
    }
    return max
}

console.log("Counting Sort:")
array =  countingSort(array)
console.log(array.join())
console.log("")

console.log("----------------------------------------------------------------")

array = [5,4,3,2,6,1,7,10,9,8]
console.log("Creating Non Sorted Array:")
console.log(array.join())
console.log("")

function bucketSort(array, bucketSize=5) {
    if(array.length < 2){
        return array
    }
    const buckets = createBuckets(array, bucketSize)
    return sortBuckets(buckets)
}

function createBuckets(array, bucketSize) {
    let minValue = array[0] 
    let maxValue = array[0]
    for (let i = 1; i < array.length; i++) {
        if(array[i] < minValue){
            minValue = array[i]
        }else if(array[i] > maxValue){
            maxValue = array[i]
        }
    }
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
    const buckets = []
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = []
    }
    for (let i = 0; i < array.length; i++){
        const bucketIndex = Math.floor((array[i] - minValue) / bucketSize)
        buckets[bucketIndex].push(array[i])
    }
    return buckets
}

function sortBuckets(buckets) {
    const sortedArray = []
    for (let i = 0; i < buckets.length; i++) {
        if(buckets[i] != null){
            insertionSort(buckets[i])
            sortedArray.push(...buckets[i])
        }
    }
    return sortedArray
}

console.log("Bucket Sort:")
array =  bucketSort(array)
console.log(array.join())
console.log("")

console.log("----------------------------------------------------------------")


array = [456,789,123,1,32,4,243,321,42,90,10,999]
console.log("Creating Non Sorted Array:")
console.log(array.join())
console.log("")

function findMinValue(array) {
    let min = array[0]
    for (let i = 1; i < array.length; i++) {
        if(array[i]<min){
            min = array[i]
        }
    }
    return min
}

function radixSort(array, radixBase=5) {
    if(array.length < 2){
        return array
    }
    const minValue = findMinValue(array)
    const maxValue = findMaxValue(array)
    let significantDigit = 1
    while((maxValue - minValue) / significantDigit >=1){
        array = countingSortForRadix(array, radixBase, significantDigit, minValue)
        significantDigit *= radixBase
    }
    return array
}

function countingSortForRadix(array, radixBase, significantDigit, minValue) {
    let bucketsIndex
    const buckets = []
    const aux = []
    for(let i = 0; i < radixBase; i++) {
        buckets[i] = 0
    }
    for(let i = 0; i < array.length; i++) {
        bucketsIndex = Math.floor(((array[i]-minValue) / significantDigit) % radixBase)
        buckets[bucketsIndex]++
    }
    for(let i = 1; i < radixBase; i++) {
        buckets[i]+=buckets[i-1]
    }
    for(let i = array.length - 1; i >=0; i--){
        bucketsIndex = Math.floor(((array[i]-minValue) / significantDigit) % radixBase)
        aux[--buckets[bucketsIndex]] = array[i]
    }
    for(let i = 0; i < array.length; i++) {
        array[i] = aux[i]
    }
    return array
}

console.log("Radix Sort:")
array =  radixSort(array)
console.log(array.join())
console.log("")

console.log("----------------------------------------------------------------")