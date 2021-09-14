interface Person<T> {

    name:string;
    age:number;

    printName(n:number,a:string): string

}

class John implements Person<John>{

    name:string;
    age:number;

    constructor() {
        this.name = "string";
        this.age = 10;
    }

    printName(n:number, a:string):string {
        return `${this.name} is ${a} && ${this.age} is ${n}`
    }

}

let g = new John()
console.log(g.printName(15, "LOL"))