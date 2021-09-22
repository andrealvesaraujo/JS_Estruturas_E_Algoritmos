console.log("Agora feito pelo Typescript")

const numbersType = [1,2,3,4,5,6,7,8,9,10]

console.log(numbersType)

interface Person {
    name:string,
    age:number;
}

const friendsType = [
    {name:"Jonh", age: 70},
    {name:"Lucas", age: 20},
    {name:"Luis", age: 50},
]

const comparePersonType = (a:Person, b: Person) => {
    switch(true){
        case a.age < b.age: return -1
        case a.age > b.age: return 1
        default: return 0
    }
}

console.log(friendsType.sort(comparePersonType))