console.log("Recursion")

console.log("----------------------------------------")

console.log("Factorial interative")

function factorialInterative(number) {
    if(number < 0){
        return undefined
    }
    let total = 1
    for(var n = number; n > 1; n--){
        total = total * n
    }
    return total
}

console.log("Factorial of 5: ", factorialInterative(5))

console.log("Factorial recursive")

function factorialRecursive(number){
    console.trace()
    if(number === 0 || number === 1){
        return 1
    }

    return number * factorialRecursive(number-1)
}

console.log("Factorial Recursive of 5: ", factorialRecursive(5))

console.log("----------------------------------------")

console.log("Error Stack Overflow")

let i = 0

function recursiveFn(){
    i++,
    recursiveFn()
}

try {
    recursiveFn()
} catch (ex) {
    console.log('i = ' + i + ' error: ' + ex)
}

console.log("----------------------------------------")
