// import { createStore, applyMiddleware, combineReducers } from '../gredux'
import { createStore } from 'redux'


export const countReducer = (state = 0, action) => {
    switch (action.type) {
        case "ADD":
            return state + 1
        case "MINUS":
            return state - action.payload || 1
        default:
            return state
    }
}


const store = createStore(countReducer)

export default store