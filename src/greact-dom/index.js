
let nextUnitOfWork = null // 下一个要执行的任务

let wipRoot = null
/**
 * filber结构
 * stateNode dom结构
 * child 子节点
 * sibling 兄弟节点
 * return 父节点
 * alternate 记录老fiber 区分是更新操作还是初始化操作
*/

//work in progress正在工作的fiber
let wipFiber = null

//记录上一次执行的节点
let currentRoot = null

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

//更新属性
function updateNode(node, prevProps, nextProps) {
    Object.keys(prevProps)
        // .filter(k => k !== "children")
        .forEach(k => {
            if (k === "children") {
                // 有可能是文本
                if (isStringOrNumber(prevProps[k])) {
                    node.textContent = "";
                }
            } else if (k.slice(0, 2) === "on") {
                const eventName = k.slice(2).toLocaleLowerCase();
                node.removeEventListener(eventName, prevProps[k]);
            } else {
                if (!(k in prevProps)) {
                    node[k] = "";
                }
            }
        });
    Object.keys(nextProps)
        // .filter(k => k !== "children")
        .forEach(k => {
            if (k === "children") {
                // 有可能是文本
                if (isStringOrNumber(nextProps[k])) {
                    node.textContent = nextProps[k] + "";
                }
            } else if (k.slice(0, 2) === "on") {
                const eventName = k.slice(2).toLocaleLowerCase();
                node.addEventListener(eventName, nextProps[k]);
            } else {
                node[k] = nextProps[k];
            }
        });
}
//生成dom结构 
function createNode(workInProgress) {
    const { type, props } = workInProgress;
    let node = document.createElement(type);
    updateNode(node, {}, props)
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

    if (isStringOrNumber(children)) {
        return;
    }

    const newChildren = Array.isArray(children) ? children : [children];

    let previousNewFiber = null;
    //获取老节点的第一个子节点
    let oldFiber = workInProgress.alternate && workInProgress.alternate.child
    for (let i = 0; i < newChildren.length; i++) {
        let child = newChildren[i];
        let same = child && oldFiber &&
            child.type === oldFiber.type &&
            child.key === oldFiber.key

        let newFiber
        if (same) {
            //都是同一个节点
            //复用
            newFiber = {
                key: child.key || null, // 属性的标记节点
                type: child.type,
                stateNode: oldFiber.stateNode,
                child: null,
                sibling: null,
                return: workInProgress,
                alternate: oldFiber,
                props: { ...child.props }, //属性
                flags: 'Update'
            };
        }
        if (!same && child) {
            //新节点存在 新增
            newFiber = {
                key: child.key, // 属性的标记节点
                type: child.type,
                props: { ...child.props }, //属性
                stateNode: null,
                child: null,
                sibling: null,
                return: workInProgress,
                flags: 'Placement'
            };
        }

        if (!same && oldFiber) {
            //老节点存在 删除
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }

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

function updateFunComp(workInProgress) {
    //设置当前节点 和初始值
    wipFiber = workInProgress
    wipFiber.hooks = []
    wipFiber.hookIndex = 0 //记录当前执行的useState 

    const { type } = workInProgress
    let fun = type()
    reconcileChildren(workInProgress, fun);
}


function updateFragmentComponent(workInProgress) {
    reconcileChildren(workInProgress, workInProgress.props.children);
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
        type.prototype.isReactComponent
            ? updateClaComp(workInProgress)
            : updateFunComp(workInProgress);
    } else {
        updateFragmentComponent(workInProgress);
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
    requestIdleCallback(woorkLoop)
    //commin
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
}

function commitRoot() {
    console.log(wipRoot, 'wipRoot')
    commitWork(wipRoot.child)
    currentRoot = wipRoot
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
    if (workInProgress.flags === 'Placement' && workInProgress.stateNode) {
        parentNode.appendChild(workInProgress.stateNode)
    } else if (workInProgress.flags === 'Update' && workInProgress.stateNode) {
        //更新属性
        updateNode(
            workInProgress.stateNode,
            workInProgress.alternate.props,
            workInProgress.props,
        )
    }

    commitWork(workInProgress.child)
    commitWork(workInProgress.sibling)
}

requestIdleCallback(woorkLoop)

export function useState(init) {

    const oldHook = wipFiber.alternate && wipFiber.alternate.hooks[wipFiber.hookIndex]
    //区分是初次渲染还是更新

    //状态值修改状态的函数
    const hooks = oldHook ? {
        state: oldHook.state,
        queue: oldHook.queue
    } : {
            state: init,
            queue: []
        }

    const setState = (action) => {
        hooks.queue.push(action)
        //引起组件整体更新但是这里应该是从函数组件开始更新的 （目前的逻辑是从跟组件更新的）
        wipRoot = {
            alternate: currentRoot,
            props: currentRoot.props,
            stateNode: currentRoot.stateNode,
        };
        nextUnitOfWork = wipRoot
    }


    hooks.queue.forEach(action => {
        //将新的 state赋值给 老的 state
        hooks.state = action
    })


    wipFiber.hooks.push(hooks)
    wipFiber.hookIndex++

    return [hooks.state, setState]


}

export default { render }

