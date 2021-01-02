import { createStore, applyMiddleware, combineReducers } from '../gredux'
// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'
// import promise from 'redux-promise'
import isPromise from 'is-promise'
import { isFSA } from 'flux-standard-action'

function countReducer(state = 0, action) {
    switch (action.type) {
        case "ADD":
            return state + 1
        case "MINUS":
            return state - action.payload || 1
        default:
            return state
    }
}

function numReducer(state = 0, action) {
    switch (action.type) {
        case "ADDNUM":
            return state + 1
        case "MINUSNUM":
            return state - action.payload || 1
        default:
            return state
    }
}


function thunk({ dispatch, getState }) {
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState)
        }
        next(action)
    }
}

function logger({ getState }) {
    return next => action => {
        console.log('---------------------------')
        console.log(action.type, '执行了')
        let prevState = getState()
        console.log(prevState, 'prevState')
        let returnValue = next(action)
        let nextState = getState()
        console.log(nextState, 'nextState')
        console.log('---------------------------')
        return returnValue
    }
}

function promise({ dispatch }) {
    return next => action => {
        isPromise(action) ? action.then(dispatch) : next(action)
    }
}

const store = createStore(
    combineReducers({ count: countReducer, num: numReducer }),
    applyMiddleware(thunk, logger, promise)
)

export default store