console.log("Agora feito pelo Typescript");
var numbersType = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numbersType);
var friendsType = [
    { name: "Jonh", age: 70 },
    { name: "Lucas", age: 20 },
    { name: "Luis", age: 50 },
];
var comparePersonType = function (a, b) {
    switch (true) {
        case a.age < b.age: return -1;
        case a.age > b.age: return 1;
        default: return 0;
    }
};
console.log(friendsType.sort(comparePersonType));
