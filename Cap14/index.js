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
    return binarySearchRecursive(sortedArray,value,low,high,compareFn)
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

console.log("Dynamic Programming(DP)")

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

console.log("----------------------------------------------------------------")

console.log("KnapSack Problem")

function knapSack(capacity, weights, values, n) {
    
    const kS = []
    for(let i = 0; i <= n; i++) {
        kS[i] = []
    }
    for(let i = 0; i <= n; i++) {
        for(let w = 0; w <= capacity; w++) {
            if(i===0 || w===0) {
                kS[i][w] = 0
            }else if(weights[i-1] <=w){
                const a = values[i-1] + kS[i-1][w-weights[i-1]]
                const b = kS[i-1][w]
                kS[i][w] = a > b ? a : b
            } else{
                kS[i][w] = kS[i-1][w]
            }
        }
    }
    findValues(n, capacity,kS, weights, values,)
    return kS[n][capacity]
}

function findValues(n, capacity, kS, weights, values) {
    let i = n
    let k = capacity
    console.log("Items that are part of the solution:")
    while(i> 0 && k>0){
        if(kS[i][k] !== kS[i-1][k]){
            console.log(`item ${i} can be part of solution w,v: ${weights[i-1]}, ${values[i-1]}`)
            i--
            k-= kS[i][k]
        }else{
            i--
        }
    }
}

let weights = [2,3,4]
let values  = [3,4,5] 
let capacity = 5
const n = values.length
console.log("Itens {weight,value} of Capacity 5:")
console.log("[{2,3},{3,4},{4,5}]")
console.log("Total value that can be carried : ", knapSack(capacity,weights, values,n))
console.log("")

console.log("----------------------------------------------------------------")

console.log("Longest Common Subsequence(LCS)")

function lcs(wordX, wordY) {
    const m = wordX.length
    const n = wordY.length
    const l = []
    const solution = []
    for (let i = 0; i <= m; i++) {
        l[i] = []
        solution[i] = []
        for (let j = 0; j <=n ; j++) {
            l[i][j] = 0
            solution[i][j] = '0'
        }
    }
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if(i===0 || j===0){
                l[i][j] = 0
            }else if(wordX[i-1] === wordY[j-1]){
                l[i][j] = l[i-1][j-1] + 1
                solution[i][j] = 'diagonal'
            }else{
                const a = l[i-1][j]
                const b = l[i][j-1]
                l[i][j] = a > b ? a : b
                solution[i][j] = (l[i][j] == l[i-1][j]) ? 'top' : 'left'
            }
        }
    }
    printSolution(solution, wordX, m,n)
}

function printSolution(solution, wordX,m,n ) {
    let a = m
    let b = n
    let x = solution[a][b]
    let answer = ''
    while(x !== '0'){
        if(solution[a][b] === 'diagonal'){
            answer = wordX[a-1] + answer
            a--
            b--
        } else if(solution[a][b] === 'left'){
            b--
        } else if(solution[a][b] === 'top'){
            a--
        }
        x=solution[a][b]
    }
    console.log('lsc: '+ answer)
}
console.log("word1: 'acbaed'")
console.log("word2: 'abcadf'")
lcs("acbaed", "abcadf")
console.log("")

console.log("----------------------------------------------------------------")

console.log("Matrix Chain Order")

function matrixChainOrder(p) {
    const n = p.length
    const m = []
    const s= []
    for (let i=0; i<=n; i++) {
        s[i] = []
        for (let j = 0; j <=n ; j++){
            s[i][j] = 0
        }
    }
    for (let i=0; i<=n; i++) {
        m[i] = []
        m[i][i]  = 0
    }
    for(let l = 2; l< n; l++ ){
        for(let i = 1; i<= (n-l) + 1; i++) {
            const j = (i+l) - 1
            m[i][j] = Number.MAX_SAFE_INTEGER
            for(let k = i; k <= j-1; k++){
                const q = m[i][k] + m[k+1][j] + ((p[i-1] * p[k]) * p[j])
                if(q<m[i][j]){
                    m[i][j] = q
                    s[i][j] = k
                } 
            }
        }
    }
    printOptimalParenthesis(s, 1, n-1)
}

function printOptimalParenthesis(s,i,j) {
    if(i===j){
        console.log("A[" + i + "]")
    } else {
        console.log("(")
        printOptimalParenthesis(s,i, s[i][j])
        printOptimalParenthesis(s,s[i][j] + 1, j)
        console.log(")")
    }
}

const p = [10,100,5,50,1]
matrixChainOrder(p)
console.log("")

console.log("----------------------------------------------------------------")

console.log("Greedy Algorithms")

console.log("----------------------------------------------------------------")

console.log("Min Coin Change Problem")

function minCoinChangeGreed(coins, amount) {
    const change = []
    let total = 0
    for(let i = coins.length ; i >= 0; i--){
        const coin = coins[i]
        while(total+coin <= amount){
            change.push(coin)
            total+=coin
        }
    }
    return change
}

let resultGreedMinCoin  =  minCoinChangeGreed([1,5,10,25], 36)
console.log("minCoinChange of 36 in [1,5,10,25]: ", resultGreedMinCoin)
resultGreedMinCoin  =  minCoinChangeGreed([1,3,4], 6)
console.log("minCoinChange of 6 in [1,3,4]: ", resultGreedMinCoin)
console.log("")

console.log("----------------------------------------------------------------")

console.log("KnapSack Problem")

function knapSackGreed(capacity, weights, values) {
    const n = values.length
    let load =0
    let val=0
    for(let i=0; i<n && load < capacity; i++) {
        if(weights[i] <= capacity - load){
            val+=values[i]
            load+=weights[i]
        }else{
            const r = (capacity-load) / weights[i]  
            val += r*values[i]
            load+=weights[i]
        }
    }
    return val
}

weights = [2,3,4]
values  = [3,4,5] 
capacity = 6
console.log("Itens {weight,value} of Capacity 6:")
console.log("[{2,3},{3,4},{4,5}]")
console.log("Total value that can be carried : ", knapSackGreed(capacity,weights, values))
console.log("")

console.log("----------------------------------------------------------------")

console.log("Backtracking Algorithms")

console.log("----------------------------------------------------------------")

console.log("Rat in a Maze")

export function ratInAMaze(maze) {
    const solution = []
    for(let i = 0; i < maze.length; i++) {
        solution[i] = []
        for(let j = 0; j < maze[i].length ; j++){
            solution[i][j] = 0
        }
    }
    if(findPath(maze,0,0,solution) === true){
        return solution
    }
    return "NO PATH FOUND"
}

function findPath(maze, x, y, solution){
    const n = maze.length
    if(x === n-1 && y === n-1){
        solution[x][y] = 1
        return true
    }
    if(isSafe(maze,x,y) === true){
        solution[x][y] = 1
        if(findPath(maze,x+1,y, solution)){
            return true
        }
        if(findPath(maze,x,y+1, solution)){
            return true
        }
        solution[x][y] = 0
        return false
    }
    return false
}

function isSafe(maze,x,y){
    const n = maze.length
    if(x>=0 && y>=0 && x<n && y<n && maze[x][y] !==0){
        return true
    }
    return false
}

const maze = [
    [1,0,0,0],
    [1,1,1,1],
    [0,0,1,0],
    [0,1,1,1],

]

let resultBacktracking =  ratInAMaze(maze)
console.log("Rat in a Maze Path: ")
console.log(resultBacktracking)
console.log("")

console.log("----------------------------------------------------------------")

console.log("Sudoku Solver")

function sudokuSolver(matrix) {
    if(solveSudoku(matrix) === true){
        return matrix
    }   
    return "NO SOLUTION EXISTS" 
}

const UNASSIGNED = 0
function solveSudoku(matrix){
    let row = 0 
    let col = 0 
    let checkBlankSpaces = false
    for(row = 0 ; row < matrix.length; row++){
        for(col = 0; col < matrix[row].length; col++){
            if(matrix[row][col] === UNASSIGNED){
                checkBlankSpaces = true
                break
            }
        }
        if(checkBlankSpaces === true){
            break
        }
    } 
    if(checkBlankSpaces === false){
        return true
    }
    for(let num = 1; num<=9; num++){
        if(isMatrixSafe(matrix,row,col, num)){
            matrix[row][col] = num
            if(solveSudoku(matrix)){
                return true
            }
            matrix[row][col] = UNASSIGNED
        }
    }
    return false
}

function isMatrixSafe(matrix, row,col, num){
    return (
        !usedInRow(matrix, row, num) &&
        !usedInCol(matrix, col, num) && 
        !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
    )
}

function usedInRow(matrix, row, num){
    for(let col= 0; col < matrix.length; col++){
        if(matrix[row][col] === num){
            return true
        }
    }
    return false
}
function usedInCol(matrix, col, num){
    for(let row= 0; row < matrix.length; row++){
        if(matrix[row][col] === num){
            return true
        }
    }
    return false
}
function usedInBox(matrix, boxStartRow,boxStartCol, num){
    for(let row= 0; row < 3; row++){
        for(let col= 0; col < 3; col++){
            if(matrix[row+boxStartRow][col+boxStartCol] === num){
                return true
            }
        }
    }
    return false
}

const sudokuGrid = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9],
]

resultBacktracking =  sudokuSolver(sudokuGrid)
console.log("Solution Of Sudoku: ")
console.log(resultBacktracking)
console.log("")

console.log("----------------------------------------------------------------")
