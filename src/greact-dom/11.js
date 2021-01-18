
// 下一个要执行的任务
let nextUnitOfWork = null; // fiber
let wipRoot = null; //work in progress root: fiber

// ! fiber是个js对象
// !  fiber节点的属性
// child 第一个子节点
// sibling 下一个兄弟节点
// return 父节点
// stateNode 在原生标签里，指的就是dom节点
// !

// vnode  虚拟dom节点
// node dom节点

function render(vnode, container) {
    // console.log("vnode", vnode); //sy-log
    // // vnode - > node
    // const node = createNode(vnode);

    // // node更新到container中
    // container.appendChild(node);
    wipRoot = {
        type: "div",
        props: { children: { ...vnode } },
        stateNode: container,
    };
    nextUnitOfWork = wipRoot;
}

// vnode->node
// 生成原生标签的dom节点
function createNode(workInProgress) {
    const { type, props } = workInProgress;
    let node = document.createElement(type);
    return node;
}

// 原生标签节点的更新
function updateHostComponent(workInProgress) {
    if (!workInProgress.stateNode) {
        // dom节点
        workInProgress.stateNode = createNode(workInProgress);
    }

    // 协调子节点
    // todo
    reconcileChildren(workInProgress, workInProgress.props.children);

    console.log("workInProgress", workInProgress); //sy-log
}



// 协调子节点
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

// work In Progress正在工作中的
function performUnitOfWork(workInProgress) {
    // * step1： 执行当前任务
    // todo
    const { type } = workInProgress;
    if (typeof type === "string") {
        // 原生标签节点
        updateHostComponent(workInProgress);
    }

    // * step2: 返回下一个任务
    // 参考王朝的故事
    // 有子节点，传给第一个子节点
    if (workInProgress.child) {
        return workInProgress.child;
    }

    let nextFiber = workInProgress;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.return;
    }
}

function workLoop(IdleDeadline) {
    while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
        //执行任务链
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

}

// 在浏览器的空闲时段内调用的函数排队
requestIdleCallback(workLoop);


export default { render };
