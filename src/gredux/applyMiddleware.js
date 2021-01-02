
function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer)
        let dispatch = store.dispatch

        let midApi = {
            dispatch: (action, ...args) => dispatch(action, args),
            getState: store.getState
        }

        const middlewaresChin = middlewares.map(middleware => middleware(midApi))
        dispatch = compose(...middlewaresChin)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}


function compose(...funs) {
    if (funs.length === 0) {
        return (args) => args
    }
    if (funs.length === 1) {
        return funs[0]
    }
    return funs.reduce((prevFn, nextFn) => (agrs) => prevFn(nextFn(agrs)))
}

export default applyMiddleware