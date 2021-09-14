// 10 primeiros Fibonnaci

const fibonnaci = []
fibonnaci[0] = 0
fibonnaci[1] = 1
fibonnaci[2] = 1

for (let i = 3; i < 10; i++) {
    fibonnaci[i] = fibonnaci[i-1] + fibonnaci[i-2]    
}

console.log(fibonnaci)    

/// 

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