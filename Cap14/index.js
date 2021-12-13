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

console.log("----------------------------------------------------------------")

console.log("Dynamic Programming")

console.log("----------------------------------------------------------------")

console.log("Min Coin Change Problem")

function minCoinChange(coins, amount) {
    const cache = []
    const makeChange = (value) => {
        if(!value){
            return []
        }
        if(cache[value]){
            return cache[value]
        }
        let min = []
        let newMin
        let newAmount
        for(let i = 0; i < coins.length; i++){
            const coin = coins[i]
            newAmount = value - coin
            if(newAmount>=0){
                newMin = makeChange(newAmount)
            }
            if(newAmount>=0 && (newMin.length < min.length -1 || !min.length) && (newMin.length || !newAmount)){
                min = [coin].concat(newMin)
                // console.log("new Min " + min + ' for ' + amount)
            }
        }
        return (cache[value]=min)
    }
    return makeChange(amount)
}

let resultMinCoin  =  minCoinChange([1,5,10,25], 36)
console.log("minCoinChange of 36 in [1,5,10,25]: ", resultMinCoin)
resultMinCoin  =  minCoinChange([1,3,4], 6)
console.log("minCoinChange of 6 in [1,3,4]: ", resultMinCoin)
console.log("")