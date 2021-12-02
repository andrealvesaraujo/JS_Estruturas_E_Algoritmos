import {Dictionary} from "/dictionary.js"

console.log("Graph");

export default class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected
        this.vertices = []
        this.adjList = new Dictionary()
    }

    addVertex(v) {
        if(!this.vertices.includes(v)){ 
            this.vertices.push(v)
            this.adjList.set(v, [])
        }
    }

    addEdge(v,w){
        if(!this.adjList.get(v)){
            this.addVertex(v)
        }
        if(!this.adjList.get(w)){
            this.addVertex(w)
        }
        this.adjList.get(v).push(w)
        if(!this.isDirected){
            this.adjList.get(w).push(v)
        }
    }

    getVertices(){
        return this.vertices
    }

    getAdjList(){
        return this.adjList
    }

    toString(){
        let s = ''
        for(let i = 0 ; i < this.vertices.length; i++){
            s += `${this.vertices[i]} -> `
            const neighbors = this.adjList.get(this.vertices[i])
            for(let j = 0 ; j < neighbors.length; j++){
                s+= `${neighbors[j]} `
            }
            s+='\n'
        }
        return s
    }
}

const graph = new Graph()
console.log("Create a Not Directed Graph")
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for(let i = 0; i < myVertices.length; i++) {
    console.log(`Add vertice ${myVertices[i]} in Graph`)
    graph.addVertex(myVertices[i])
}

console.log("Add Edge A to B")
graph.addEdge('A', 'B')
console.log("Add Edge A to C")
graph.addEdge('A', 'C')
console.log("Add Edge A to D")
graph.addEdge('A', 'D')
console.log("Add Edge C to D")
graph.addEdge('C', 'D')
console.log("Add Edge D to G")
graph.addEdge('D', 'G')
console.log("Add Edge D to H")
graph.addEdge('D', 'H')
console.log("Add Edge B to E")
graph.addEdge('B', 'E')
console.log("Add Edge B to F")
graph.addEdge('B', 'F')
console.log("Add Edge E to I")
graph.addEdge('E', 'I')

console.log("My Graph: ")
console.log(graph.toString())