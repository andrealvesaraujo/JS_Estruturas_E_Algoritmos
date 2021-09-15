// 10 primeiros Fibonnaci

const fibonnaci = []
fibonnaci[0] = 0
fibonnaci[1] = 1
fibonnaci[2] = 1

for (let i = 3; i < 10; i++) {
    fibonnaci[i] = fibonnaci[i-1] + fibonnaci[i-2]    
}

console.log(fibonnaci)    

/// Inserindo um elemento na primeira posição e o Unshift

let numbers = [0,1,2,3,4,5,6,7,8,9]

numbers.push(11,12,13)

Array.prototype.insertFirstPosition = function(value) {

    for (let i = this.length; i >=0; i--) {
        this[i] = this[i-1];        
    }
    this[0] = value
}

numbers.insertFirstPosition(-1)

console.log(numbers)

numbers.unshift(-4,-3,-2)

console.log(numbers)


/// Remover um elemento da primeira posição e o Shift

numbers.pop()

console.log(numbers)

Array.prototype.ReIndex = function(myArray) {
    const newArray = []
    for (let i = 0; i < myArray.length; i++) {
        
        if(myArray[i] !== undefined) {
            newArray.push(myArray[i])
        }
        
    }
    return newArray
}

Array.prototype.removeFirstPosition = function() {
    
    for (let i = 0; i < this.length; i++) {
        
        this[i]  = this[i+1]
        
    }
    return this.ReIndex(this)
    
}

numbers = numbers.removeFirstPosition()

console.log(numbers)

numbers.shift()

console.log(numbers)

/// Splice

numbers.splice(5,3)

numbers.splice(5,0,2,3,4)

console.log(numbers)

// Arrays Bidimensionais e interando neles
let myArrays = []
myArrays[0] = [1,2,3,4,5]
myArrays[1] = [2,4,6,8,10]

function printMatrix(myArrays){
    for (let i = 0; i < myArrays.length; i++) {
       for (let j = 0; j < myArrays[i].length; j++) {
           console.log(myArrays[i][j])
       }
    }
}

printMatrix(myArrays)

console.table(myArrays)

/// Métodos basicos de array do ES2015

const zero = 0
const positive = [1,2,3]
const negative = [-3,-2,-1]
let values = negative.concat(zero, positive);
console.log(values)

numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

const isEven = (x) => x%2 === 0

console.log(numbers.every(isEven))

console.log(numbers.some(isEven))

numbers.forEach(x => console.log(x % 2 === 0))

const myMap = numbers.map(isEven)

console.log(myMap)

const myNumbersFiltered = numbers.filter(isEven)

console.log(myNumbersFiltered)

console.log("Total: ", numbers.reduce( (previus, current) => previus+current))

/// Métodos basicos de array do ES6


