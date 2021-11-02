export default class Set {
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
        const unionSet = new Set()
        this.values().forEach(value => unionSet.add(value))
        otherSet.values().forEach(value => unionSet.add(value))
        return unionSet
    }
    
    intersection(otherSet) {
        const intersectionSet = new Set()
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
        const differenceSet = new Set()
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
let set = new Set()

console.log("----------------------")
console.log("Adicionando valor 1: ", set.add(1))
console.log("Valores do conjunto: ",set.values())
console.log("O conjunto tem o valor 1? ",set.has(1))
console.log("Tamanho do conjunto: ", set.size())
console.log("Adicionando valor 2: ",set.add(2))
console.log("Valores do conjunto: ",set.values())
console.log("O conjunto tem o valor 2? ",set.has(2))
console.log("Tamanho do conjunto: ", set.size())
console.log("Deletando valor 1: ",set.delete(1))
console.log("Valores do conjunto: ",set.values())
console.log("Deletando valor 2: ",set.delete(2))
console.log("Valores do conjunto: ",set.values())


console.log("----------------------")
console.log("Operações de Conjuntos")
let setA = new Set()
setA.add(1) 
setA.add(2) 
setA.add(3) 
console.log("Conjunto A: ", setA.values())
let setB = new Set()
setB.add(3) 
setB.add(4) 
setB.add(5)
setB.add(6)
console.log("Conjunto B: ", setB.values())
const unionAB = setA.union(setB)
console.log("União dos Conjuntos de A e B: ", unionAB.values())

console.log("----------------------")
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
const intersectionAB  = setA.intersection(setB)
console.log("Interseção dos Conjuntos de A e B: ",intersectionAB.values())

console.log("----------------------")
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
const differenceAB = setA.difference(setB)
console.log("Diferença do conjunto A de B: ", differenceAB.values())
const differenceBA = setB.difference(setA)
console.log("Diferença do conjunto B de A: ", differenceBA.values())

console.log("----------------------")
setA = new Set()
setA.add(1) 
setA.add(2) 
console.log("Conjunto A: ", setA.values())
setB = new Set()
setB.add(1) 
setB.add(2) 
setB.add(3)
console.log("Conjunto B: ", setB.values())
const setC = new Set()
setC.add(2) 
setC.add(3) 
setC.add(4)
console.log("Conjunto C: ", setC.values())
console.log("Conjunto A é subconjunto de B? ", setA.isSubsetOf(setB))
console.log("Conjunto A é subconjunto de C? ", setA.isSubsetOf(setC))


