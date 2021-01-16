

function render(vnode, container) {
    //vnode -> node
    let node = createNode(vnode)

    container.appendChild(node)
}

function updateAttrs(props, node) {
    Object.keys(props).forEach(key => {
        if (key !== 'children') {
            node[key] = props[key]
        }
    })
}

function updateHostComponent(vnode) {
    const { type, props } = vnode
    let node = document.createElement(type)

    if (typeof props.children === 'string') {
        //文本
        let childText = document.createTextNode(props.children)
        node.appendChild(childText)
    } else {
        reconcileChildren(props.children, node)
    }
    updateAttrs(props, node)
    return node
}

function reconcileChildren(children, node) {
    if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            render(child, node)
        }
    } else {
        render(children, node)
    }
}

function updateFunComp(vnode) {
    const { type } = vnode
    let fun = type()
    return createNode(fun)
}

function updateClaComp(vnode) {
    const { type } = vnode
    let instance = new type()
    let ele = instance.render()
    return createNode(ele)
}

function createNode(vnode) {
    const { type } = vnode
    // let child = Array.isArray(props.children) ? props.children : [props.children]
    let node = null
    if (typeof type === 'string') {
        //创建标签
        node = updateHostComponent(vnode)
    } else if (typeof type === 'function') {
        node = type.prototype.isReactComponent ? updateClaComp(vnode) : updateFunComp(vnode)
    }

    return node
}

export default { render }