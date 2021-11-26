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

console.log("Fibonnaci")

function fibonnaciInteractive(n){
    if(n<1) return 0
    if(n<=2) return 1
    let fibMinus2 = 0
    let fibMinus1 = 1
    let fibN = n
    for(let i = 2; i <= n; i++){
        fibN = fibMinus1 + fibMinus2
        fibMinus2 = fibMinus1
        fibMinus1 = fibN
    }
    return fibN
}

console.log("Fibonnaci Interactive of 5:", fibonnaciInteractive(5))

function fibonnaci(n) {
    if(n<1) return 0
    if(n<=2) return 1
    return fibonnaci(n-1) + fibonnaci(n-2)
}

console.log("Fibonnaci Recursive of 5:", fibonnaciInteractive(5))

function fibonnaciMemoization(n) {
    const memo = [0,1]
    const fibonnaci = (n) =>{
        if(memo[n] != null) return memo[n]
        return memo[n] = fibonnaci(n-1, memo) + fibonnaci(n-2, memo)
    }
    return fibonnaci
}

console.log("Fibonnaci Memoization of 5:", fibonnaciMemoization()(5))