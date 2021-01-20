var node4 = {left: null, right: null, val: 4 }; 
var node5 = {left: null, right: null, val: 5 }; 
var node6 = {left: null, right: null, val: 6 }; 
var node7 = {left: null, right: null, val: 7 };
var node3 = {left: node6, right: node7, val: 3 };
var node2 = {left: node4, right: node5, val: 2 };
var node1 = {left: node2, right: node3, val: 1 };


//     1
//    /\
//   2  3
//  /\  /\
// 4 5 6  7

function preorderTraversal(root) {
    if(!root){
        return
    }
    console.log(root.val)
    let left = root.left
    let right = root.right
    left && preorderTraversal(left)
    right && preorderTraversal(right)
}

function inorderTraversal(root) {
    if(!root){
        return
    }
    let left = root.left
    let right = root.right
    left && inorderTraversal(left)
    console.log(root.val)
    right && inorderTraversal(right)
}

function postorderTraversal(root) {
    if(!root){
        return
    }
    let left = root.left
    let right = root.right
    left && postorderTraversal(left)
    right && postorderTraversal(right)
    console.log(root.val)
}


console.log(postorderTraversal(node1),'preorderTraversal')