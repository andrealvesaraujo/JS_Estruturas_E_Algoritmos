export default class MySet {
    constructor(){
        this.items = {}
    }

    has(element) {
        // return element in this.items
        return Object.prototype.hasOwnProperty.call(this.items, element)
    }

    add(element) {
        if(!this.has(element)){
            this.items[element] = element
            return true
        }
        return false
    }

    delete(element) {
        if(this.has(element)){
            delete this.items[element]
            return true
        }
        return false
    }

    clear(){
        this.items = {}
    }
    
    size(){
        return Object.keys(this.items).length
    }
    
    sizeLegacy(){
        let count = 0
        for(let key in this.items) {
            if(this.items.hasOwnProperty(key)) {
                count++
            }
        }
        return count
    }

    values(){
        return Object.values(this.items)
    }
    
    valuesLegacy(){
        let values = []
        for(let key in this.items) {
            if(this.items.hasOwnProperty(key)) {
                values.push(key)
            }
        }
        return values
    }

    union(otherSet) {
        const unionSet = new MySet()
        this.values().forEach(value => unionSet.add(value))
        otherSet.values().forEach(value => unionSet.add(value))
        return unionSet
    }
    
    intersection(otherSet) {
        const intersectionSet = new MySet()
        const values = this.values()
        const otherValues = otherSet.values()
        let biggerSet = values
        let smallerSet = otherValues
        if(otherValues.length - values.length > 0){
            biggerSet = otherValues
            smallerSet = values
        }
        smallerSet.forEach(value => {
            if(biggerSet.includes(value)){
                intersectionSet.add(value)
            }
        })
        return intersectionSet
    }
    
    difference(otherSet) {
        const differenceSet = new MySet()
        this.values().forEach(value =>{
            if(!otherSet.has(value)){
                differenceSet.add(value)
            }
        })
        return differenceSet
    }

    isSubsetOf(otherSet){
        if(this.size() > otherSet.size()){
            return false
        } 
        let isSubSet = true
        this.values().every(value=>{
            if(!otherSet.has(value)){
                isSubSet = false
                return false
            }
            return true
        })
        return isSubSet
    }
    
}

console.log("Classe De Conjunto(Set) própria")
let mySet = new MySet()

console.log("----------------------")
console.log("Adicionando valor 1: ", mySet.add(1))
console.log("Valores do conjunto: ",mySet.values())
console.log("O conjunto tem o valor 1? ",mySet.has(1))
console.log("Tamanho do conjunto: ", mySet.size())
console.log("Adicionando valor 2: ",mySet.add(2))
console.log("Valores do conjunto: ",mySet.values())
console.log("O conjunto tem o valor 2? ",mySet.has(2))
console.log("Tamanho do conjunto: ", mySet.size())
console.log("Deletando valor 1: ",mySet.delete(1))
console.log("Valores do conjunto: ",mySet.values())
console.log("Deletando valor 2: ",mySet.delete(2))
console.log("Valores do conjunto: ",mySet.values())


console.log("----------------------")
console.log("Operações de Conjuntos")
let setA = new MySet()
setA.add(1) 
setA.add(2) 
setA.add(3) 
console.log("Conjunto A: ", setA.values())
let setB = new MySet()
setB.add(3) 
setB.add(4) 
setB.add(5)
setB.add(6)
console.log("Conjunto B: ", setB.values())
const unionAB = setA.union(setB)
console.log("União dos Conjuntos de A e B: ", unionAB.values())

console.log("----------------------")
setA = new MySet()
setA.add(1) 
setA.add(2) 
setA.add(3) 
console.log("Conjunto A: ", setA.values())
setB = new MySet()
setB.add(2) 
setB.add(3) 
setB.add(4)
console.log("Conjunto B: ", setB.values())
const intersectionAB  = setA.intersection(setB)
console.log("Interseção dos Conjuntos de A e B: ",intersectionAB.values())

console.log("----------------------")
setA = new MySet()
setA.add(1) 
setA.add(2) 
setA.add(3) 
console.log("Conjunto A: ", setA.values())
setB = new MySet()
setB.add(2) 
setB.add(3) 
setB.add(4)
console.log("Conjunto B: ", setB.values())
const differenceAB = setA.difference(setB)
console.log("Diferença do conjunto A de B: ", differenceAB.values())
const differenceBA = setB.difference(setA)
console.log("Diferença do conjunto B de A: ", differenceBA.values())

console.log("----------------------")
setA = new MySet()
setA.add(1) 
setA.add(2) 
console.log("Conjunto A: ", setA.values())
setB = new MySet()
setB.add(1) 
setB.add(2) 
setB.add(3)
console.log("Conjunto B: ", setB.values())
const setC = new MySet()
setC.add(2) 
setC.add(3) 
setC.add(4)
console.log("Conjunto C: ", setC.values())
console.log("Conjunto A é subconjunto de B? ", setA.isSubsetOf(setB))
console.log("Conjunto A é subconjunto de C? ", setA.isSubsetOf(setC))

console.log("----------------------")
console.log("----------------------")

console.log("Classe De Conjunto(Set) nativa")
let set = new Set()
set.add(1)
console.log("Valores do Conjunto: ", set.values())
console.log("Conjunto tem valor 1: ", set.has(1))
console.log("Tamanho do Conjunto: ", set.size)

setA = new Set()
setA.add(1) 
setA.add(2) 
setA.add(3) 
console.log("Conjunto A: ", setA.values())
setB = new Set()
setB.add(2) 
setB.add(3)
setB.add(4) 
console.log("Conjunto B: ", setB.values())

const union = (set1,set2) =>{
    const unionSet = new Set()
    set1.forEach((value) => unionSet.add(value))
    set2.forEach((value) => unionSet.add(value))
    return unionSet
}

const intersection = (set1,set2) =>{
    const intersectionSet = new Set()
    set1.forEach((value) => {
      if(set2.has(value)){
        intersectionSet.add(value)
      }   
    })
    return intersectionSet
}

const difference = (set1,set2) =>{
    const differenceSet = new Set()
    set1.forEach((value) => {
      if(!set2.has(value)){
        differenceSet.add(value)
      }   
    })
    return differenceSet
}

console.log("Union Function of A e B: ",union(setA,setB))
console.log("Intersection Function of A e B: ",intersection(setA,setB))
console.log("Difference Function of A e B: ", difference(setA,setB))
console.log("Union With Spread Operator of A e B: ",new Set([...setA,...setB]))
console.log("Intersection With Spread Operator of A e B: ",new Set([...setA].filter(value => setB.has(value))))
console.log("Difference With Spread Operator of A e B: ",new Set([...setA].filter(value => !setB.has(value))))

