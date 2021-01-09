
function combineReducers(redures) {
    return function (state = {}, action) {
        let nextState = {}
        let hashChanged = 0
        for (let key in redures) {
            const reducer = redures[key]
            nextState[key] = reducer(state[key], action)
            hashChanged = hashChanged || nextState[key] !== hashChanged
        }
        hashChanged = hashChanged || Object.keys(nextState).length !== Object.keys(state).length
        return hashChanged ? nextState : state
    }
}
export default combineReducers