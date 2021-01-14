

function render(vnode, container) {
    //vnode -> node
    let node = createNode(vnode)

    container.appendChild(node)
}


function createNode(vnode) {
    console.log(vnode,'vnode')
}

export default { render }