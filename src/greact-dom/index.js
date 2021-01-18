
let nextUnitOfWork = null // 下一个要执行的任务

let wipRoot = null
/**
 * filber结构
 * stateNode dom结构
 * child 子节点
 * sibling 兄弟节点
 * return 父节点
 * 
*/


function render(vnode, container) {
    //vnode -> node
    // let node = createNode(vnode)
    // container.appendChild(node)
    wipRoot = {
        type: "div",
        props: { children: { ...vnode } },
        stateNode: container,
    };
    nextUnitOfWork = wipRoot;
}


function updateNode(props, node) {
    Object.keys(props).forEach(k => {
        if (k === "children") {
            if (isStringOrNumber(props[k])) {
                node.textContent = props[k];
            }
        } else {
            node[k] = props[k];
        }
    });
}
//生成dom结构 
function createNode(workInProgress) {
    const { type, props } = workInProgress;
    let node = document.createElement(type);
    updateNode(props, node)
    return node;
}

function updateHostComponent(workInProgress) {
    if (!workInProgress.stateNode) {
        // dom节点
        workInProgress.stateNode = createNode(workInProgress);
    }

    // 协调子节点
    // todo
    reconcileChildren(workInProgress, workInProgress.props.children);
}

function reconcileChildren(workInProgress, children) {
    const newChildren = Array.isArray(children) ? children : [children];

    let previousNewFiber = null;
    for (let i = 0; i < newChildren.length; i++) {
        let child = newChildren[i];
        let newFiber = {
            key: child.key, // 属性的标记节点
            type: child.type,
            props: { ...child.props }, //属性
            stateNode: null,
            child: null,
            sibling: null,
            return: workInProgress,
        };
        if (i === 0) {
            //newFiber 是 workInProgress的第一个子fiber
            workInProgress.child = newFiber;
        } else {
            previousNewFiber.sibling = newFiber;
        }

        previousNewFiber = newFiber;
    }
}

function isStringOrNumber(sth) {
    return typeof sth === "string" || typeof sth === "number";
}

function updateAttrs(props, node) {
    Object.keys(props).forEach(k => {
        if (k === "children") {
            if (isStringOrNumber(props[k])) {
                node.textContent = props[k];
            }
        } else {
            node[k] = props[k];
        }
    });
}


function updateFunComp(vnode) {
    const { type } = vnode
    let fun = type()
    return createNode(fun)
}


function updateFragmentComponent(vnode) {
    let children = vnode.props.children
    let Fragment = document.createDocumentFragment()
    // reconcileChildren(children, Fragment)
    return Fragment
}


function updateClaComp(workInProgress) {
    const { type } = workInProgress
    let instance = new type()
    let ele = instance.render()
    reconcileChildren(workInProgress, ele);
}

function performUnitOfWork(workInProgress) {
    //fiber结构执行方式
    //1.step1 执行当前任务

    let { type } = workInProgress

    //创建原生标签节点
    if (typeof type === 'string') {
        updateHostComponent(workInProgress)
    } else if (typeof type === 'function') {
        updateClaComp(workInProgress)
    }

    //2.step2 传递下一个要执行的任务
    //2.1 如果子存在先把子返回
    //2.2 子不存在 就判断兄弟  存在就返回
    //2.3 以上都不存在就判断父级兄弟是否存在

    if (workInProgress.child) {
        return workInProgress.child
    }

    let nextFiber = workInProgress

    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.return
    }

}

function woorkLoop(IdleDeadline) {
    //有需要存在执行的任务 并且浏览器有空闲时间
    while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
    //commin
    if (!nextUnitOfWork) {
        commitRoot()
    }
}

function commitRoot() {
    commitWork(wipRoot.child)
    wipRoot = null
}

function commitWork(workInProgress) {

    if (!workInProgress) return

    let parentFiber = workInProgress.return

    while (!parentFiber.stateNode) {
        parentFiber = parentFiber.return
    }

    let parentNode = parentFiber.stateNode

    //存在dom节点才会进行插入
    if (workInProgress.stateNode) {
        parentNode.appendChild(workInProgress.stateNode)
    }

    commitWork(workInProgress.child)
    commitWork(workInProgress.sibling)
}

requestIdleCallback(woorkLoop)

export default { render }

