import {Dictionary,Queue, Stack } from "/data_structures.js"

console.log("Graph");

const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2,
}
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

let graph = new Graph()
console.log("Create a Not Directed Graph")
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

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
console.log("Add Edge C to G")
graph.addEdge('C', 'G')
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


const initializeColors = (vertices) => {
    const color = {}
    for(let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE
    }  
    return color;
}

console.log("------------Breadth First Search(BFS)------")


export const breadthFirstSearch = (graph, startVertext, callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColors(vertices)
    const queue = new Queue()
    queue.enqueue(startVertext)
    while(!queue.isEmpty()){
        const u = queue.dequeue()
        const neighbors = adjList.get(u)
        color[u] = Colors.GREY
        for(let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]
            if(color[w] === Colors.WHITE){
                color[w] = Colors.GREY
                queue.enqueue(w)
            }
        }
        color[u] = Colors.BLACK
        if(callback) {
            callback(u)
        }    
    }
}

const printVertex = (value) => console.log("Visited vertex: "+value)
console.log("Using BFS to find every vertex:")
breadthFirstSearch(graph, myVertices[0] ,printVertex)

const BFS = (graph, startVertext) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColors(vertices)
    const queue = new Queue()
    const distances = {}
    const predecessors = {}
    queue.enqueue(startVertext)
    for(let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0
        predecessors[vertices[i]] = null
    }
    while(!queue.isEmpty()){
        const u = queue.dequeue()
        const neighbors = adjList.get(u)
        color[u] = Colors.GREY
        for(let i = 0; i < neighbors.length; i++){
            const w = neighbors[i]
            if(color[w] === Colors.WHITE){
                color[w] = Colors.GREY;
                distances[w] = distances[u] + 1
                predecessors[w] = u
                queue.enqueue(w)
            }
        }
        color[u] = Colors.BLACK
    }
    return {
        distances,
        predecessors
    }
}

console.log("Using BFS to find shortestPath to A for every vertex:")
const shortestPathA = BFS(graph, myVertices[0])
const fromVertex = myVertices[0]
for(let i = 0; i < myVertices.length; i++){
    const toVertex = myVertices[i]
    const path = new Stack()
    for(let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]){
        path.push(v)
    }
    path.push(fromVertex)
    let s = path.pop()
    while(!path.isEmpty()){
        s+= ' - ' + path.pop()
    }
    console.log(s)
}

console.log("------------Depth First Search(DFS)------")

const depthFirstSearch = (graph, callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColors(vertices)
    for (let i = 0; i < vertices.length; i++){
        if(color[vertices[i]] === Colors.WHITE){
            depthFirstSearchVisit(vertices[i], color, adjList, callback)
        }
    }

}

const depthFirstSearchVisit = (u, color, adjList, callback) => {
    color[u] = Colors.GREY
    if(callback){
        callback(u)
    } 
    const neighbors = adjList.get(u)
    for(let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        if(color[w] === Colors.WHITE) {
            depthFirstSearchVisit(w,color, adjList, callback)
        }
    }
    color[u] = Colors.BLACK
}
console.log("Using DFS to find every vertex:")
depthFirstSearch(graph, printVertex)

export const DFS = graph => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColors(vertices)
    const d = {}
    const f = {}
    const p = {}
    const time = { count: 0 }
    for (let i = 0; i < vertices.length; i++) {
        f[vertices[i]] = 0 
        d[vertices[i]] = 0 
        p[vertices[i]] = null
    }
    for (let i = 0; i < vertices.length; i++) {
        if(color[vertices[i]] === Colors.WHITE){
            DFSVisit(vertices[i], color, d, f, p, time, adjList)
        }
    }
    return {
        discovery : d,
        finished: f,
        predecessors : p
    }
}

const DFSVisit = (u, color, d, f, p, time, adjList) => {
    color[u] = Colors.GREY
    d[u] = ++time.count
    const neighbors = adjList.get(u)
    for(let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        if(color[w] === Colors.WHITE){
            p[w] = u
            DFSVisit(w, color, d, f, p, time, adjList)
        }
    }
    color[u] = Colors.BLACK
    f[u] = ++time.count
}

console.log("Create a Directed Graph")

graph = new Graph(true)
myVertices = [ 'A', 'B', 'C', 'D', 'E', 'F']
for(let i = 0; i < myVertices.length; i++) {
    console.log(`Add vertice ${myVertices[i]} in Graph`)
    graph.addVertex(myVertices[i])
}
console.log("Add Edge A to C")
graph.addEdge('A', 'C')
console.log("Add Edge A to D")
graph.addEdge('A', 'D')
console.log("Add Edge B to D")
graph.addEdge('B', 'D')
console.log("Add Edge B to E")
graph.addEdge('B', 'E')
console.log("Add Edge C to F")
graph.addEdge('C', 'F')
console.log("Add Edge F to E")
graph.addEdge('F', 'E')
const result = DFS(graph)

console.log("My Graph: ")
console.log(graph.toString())

console.log("Topological ordering by using DFS:")

const fTimes = result.finished
let s = ''
for (let count = 0; count < myVertices.length; count++){
    let max = 0
    let maxName = null
    for (let i = 0; i < myVertices.length; i++) {
        if(fTimes[myVertices[i]] > max) {
            max = fTimes[myVertices[i]]
            maxName = myVertices[i]
        }
    }
    if(Object.keys(fTimes).length === 1){
        s += maxName  
    }else{
        s += maxName + ' - ' 
    }

    delete fTimes[maxName]
}

console.log(s)  
