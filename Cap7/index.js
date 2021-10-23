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

}

let set = new Set()

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