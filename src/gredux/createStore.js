
function createStore(reducer, enhancer) {

    //增强dispatch
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }

    let currentState;
    let currentListeners = []

    function getState() {
        return currentState
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        currentListeners.forEach(lister => lister())
    }

    function subscribe(lister) {
        currentListeners.push(lister)
        return () => {
            const index = currentListeners.indexOf(lister)
            currentListeners.splice(index, 1)
        }
    }

    dispatch({ type: '123123123' })

    return {
        getState,
        subscribe,
        dispatch
    }
}

export default createStore