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

console.log("Iterador")

let iterator = numbers[Symbol.iterator]();

for (const n of iterator) {
    console.log(n)
}

console.log("Entries")

let aEntries = numbers.entries();

for (const n of aEntries) {
    console.log(n)
}

console.log("Keys")

let aKeys = numbers.keys();

for (const n of aKeys) {
    console.log(n)
}

console.log("Values")

let aValues = numbers.values();

for (const n of aValues) {
    console.log(n)
}

console.log("From")


let numbers2 = Array.from(numbers)
console.log(numbers2)
let evens = Array.from(numbers, x => (x % 2 == 0))
console.log(evens)

console.log("Of")


let numbers3 = Array.of(20,21,22,23,24,25)
console.log(numbers3)
let numbers4 = Array.of(...numbers)
console.log(numbers4)

console.log("Fill")


let numFill = Array(6).fill(1)
console.log(numFill)
numFill = numFill.fill(2,1)
console.log(numFill)
numFill = numFill.fill(3,4,6)
console.log(numFill)

console.log("CopyWithin")


let copyArray = [1,2,3,4,5,6]
copyArray.copyWithin(0,3)
console.log(copyArray)
copyArray.copyWithin(1,3,5)
console.log(copyArray)

console.log("Ordenando elementos")

numbers.reverse()
console.log(numbers)

numbers.sort()
console.log(numbers)

numbers.sort((a,b)=> a - b)
console.log(numbers)

compare = (a,b) => {
    switch(true) {
        case (a>b): return 1
        case (a<b): return -1
        default: return 0    
    }
}
numbers.sort(compare)
console.log(numbers)

console.log("Ordenando personalizada")

const friends = [
    {name: "Jorge", age: 50},
    {name: "Lucas", age: 25},
    {name: "Matheus", age: 30}
]

comparePeople = (a,b) => {
    switch(true) {
        case (a.age>b.age): return 1
        case (a.age<b.age): return -1
        default: return 0    
    }
}

friends.sort(comparePeople)
console.log(friends)


console.log("Ordenando Strings")

const friendsNames = [ "Ana", "ana", "Lucas", "lucas", "Sérgio", "Sergio" ]

comparePeople = (a,b) => {
    switch(true) {
        case (a.toLowerCase()>b.toLowerCase()): return 1
        case (a.toLowerCase()<b.toLowerCase()): return -1
        default: return 0    
    }
}

friendsNames.sort(comparePeople)
console.log(friendsNames)


friendsNames.sort((a,b)=> a.localeCompare(b))
console.log(friendsNames)


console.log("Pesquisa: indexOf e lastIndexOf")

console.log(numbers.indexOf(10))
console.log(numbers.indexOf(100))

console.log((numbers.sort((a,b)=> b - a )).lastIndexOf(10))
console.log(numbers.lastIndexOf(100))

numbers.sort(compare)

console.log("Pesquisa: find and findIndex")

multiple7 = (element,index,array) => {
    return (element % 7 == 0)
}

console.log(numbers.find(multiple7))
console.log(numbers.findIndex(multiple7))

console.log("Pesquisa: includes")

console.log(numbers.includes(8))
console.log(numbers.includes(20))
console.log(numbers.includes(8,10))

console.log("Convertendo Array para String")

console.log(numbers.toString())
console.log(numbers.join("/"))

console.log("Classe TypedArray")

let length = 10
let int16 = new Int16Array(length)
for(let i=0; i <length; i++) {
    int16[i] = i + 1
}
console.log(int16)










