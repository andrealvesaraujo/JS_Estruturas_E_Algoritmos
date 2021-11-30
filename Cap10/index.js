import { Node } from './models/node.js';
import { Compare, defaultCompare} from './util.js'

console.log("BinarySearchTree")
export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.root = null
    }

    insert(key){
        if(this.root == null){
            this.root = new Node(key)
        }else{
            this.insertNode(this.root, key)
        }
    }

    insertNode(node , key){
        if(this.compareFn(key, node.key) === Compare.LESS_THAN){
            if(node.left == null){
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if(node.right == null){
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback)
    }

    inOrderTraverseNode(node, callback) {
        if(node != null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)
        }
    }
    
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback)
    }

    preOrderTraverseNode(node, callback) {
        if(node != null) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)
        }
    }
    
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback)
    }

    postOrderTraverseNode(node, callback) {
        if(node != null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }

    max(){
        return this.maxNode(this.root)
    }

    maxNode(node){
        let current = node
        while(current != null && current.right != null){
            current = current.right
        }   
        return current
    }

    min(){
        return this.minNode(this.root)
    }

    minNode(node){
        let current = node
        while(current != null && current.left != null){
            current = current.left
        }   
        return current
    }


    search(key){
        return this.searchNode(this.root, key)
    }

    searchNode(node, key){
        if(node == null){
            return false
        }  
        if (this.compareFn(key, node.key) === Compare.LESS_THAN){
            return this.searchNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN){
            return this.searchNode(node.right, key)
        } else {
            return true
        }
    }

    remove(key){
        this.root = this.removeNode(this.root, key)
    }

    removeNode(node, key){
        if(node == null){
            return null
        }  
        if (this.compareFn(key, node.key) === Compare.LESS_THAN){
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN){
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            if(node.left == null && node.right == null){
                node = null
                return node
            }
            if(node.left == null){
                node = node.right
                return node
            } else if(node.right == null) {
                node = node.left
                return node
            }
            const aux = this.minNode(node.right)
            node.key = aux.key
            node.right = this.removeNode(node.right, aux.key)
            return node
        }
    }
    

}

const tree = new BinarySearchTree();
console.log("-----------------11------------------")
console.log("----------7------------------15----------")
console.log("------5-------9---------13--------20-------")
console.log("----3---6---8---10---12---14----18---25-----")

tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(9)
tree.insert(13)
tree.insert(20)
tree.insert(3)
tree.insert(8)
tree.insert(10)
tree.insert(12)
tree.insert(14)
tree.insert(18)
tree.insert(25)
tree.insert(6)

const printNode = (value) => console.log(value)
console.log("inOrderTraverse")
tree.inOrderTraverse(printNode)
console.log("preOrderTraverse")
tree.preOrderTraverse(printNode)
console.log("postOrderTraverse")
tree.postOrderTraverse(printNode)

console.log("Maximum Key: ", tree.max())
console.log("Minimum Key: ", tree.min())
console.log(tree.search(1) ? "Key 1 found" : "Key 1 not found" )
console.log(tree.search(8) ? "Key 8 found" : "Key 8 not found" )

console.log("Remove 6 : ", tree.remove(6))
console.log("Remove 5 : ", tree.remove(8))
console.log("Remove 18: ", tree.remove(18))

console.log("inOrderTraverse")
tree.inOrderTraverse(printNode)

console.log("----------------------------------------")
console.log("AvlTree")

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT:2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5,
}

class AVLTree extends BinarySearchTree {
    constructor(compareFn=defaultCompare){
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }

    getNodeHeights(node){
        if(node==null){
            return -1
        } 
        return Math.max(this.getNodeHeights(node.left), this.getNodeHeights(node.right)) + 1
    }

    getBalanceFactor(node){
        const heightDifference = this.getNodeHeights(node.left) - this.getNodeHeights(node.right)
        switch(heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT
            case -1: 
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            case 2:
                return BalanceFactor.UNBALANCED_LEFT          
            default:
                return BalanceFactor.BALANCED      
        }
    }

    rotationLL(node){
        const tmp = node.left
        node.left = tmp.right
        tmp.right = node
        return tmp
    }

    
    rotationRR(node){
        const tmp = node.right
        node.right = tmp.left 
        tmp.left = node
        return tmp
    }

    rotationLR(node){ 
        node.left = this.rotationRR(node.left)
        return this.rotationLL(node)
    }

    rotationRL(node){ 
        node.right = this.rotationLL(node.right)
        return this.rotationRR(node)
    }

    insert(key){
        this.root = this.insertNode(this.root, key)
    }

    insertNode(node, key){
        if(node == null){
            return new Node(key)
        } else if(this.compareFn(key,node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key)

        } else if(this.compareFn(key,node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key)

        } else {
            return node
        }

        const balanceFactor = this.getBalanceFactor(node)
        if(balanceFactor === BalanceFactor.UNBALANCED_LEFT){
            if(this.compareFn(key, node.left.key) === Compare.LESS_THAN){
                node = this.rotationLL(node)
            }else{
                 this.rotationLR(node)
            }
        }
        if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT){
            if(this.compareFn(key, node.right.key) === Compare.BIGGER_THAN){
                node = this.rotationRR(node)
            }else{
                return this.rotationRL(node)
            }
        }
        return node
    }

    remove(key){
        this.root = this.removeNode(this.root, key)
    }

    removeNode(node,key){
        node = super.removeNode(node, key)
        if(node == null){
            return node
        }
        const balanceFactor = this.getBalanceFactor(node)
        if(balanceFactor === BalanceFactor.UNBALANCED_LEFT){
            const balanceFactorLeft = this.getBalanceFactor(node.left)
            if(balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
                return this.rotationLL(node)
            }
            if(balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
                return this.rotationLR(node.left)
            }
        }
        if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT){
            const balanceFactorRight = this.getBalanceFactor(node.right)
            if(balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
                return this.rotationRR(node)
            }
            if(balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
                return this.rotationRL(node.right)
            }
        }
        
    }

}

