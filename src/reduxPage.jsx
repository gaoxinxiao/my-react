import React from 'react'
import Store from './store'

console.log(Store, 'Store')

// const Page = () => {

//     return <div>
//         <p>count:{Store.getState()}</p>
//         <p onClick={() => Store.dispatch({ type: 'ADD' })}>ADD</p>
//         <p onClick={() => Store.dispatch({ type: 'MINUS' })}>MINUS</p>
//     </div>
// }








class Page extends React.Component {
    componentDidMount() {
        this.unsubscribe = Store.subscribe(() => {
            console.log('值改变')
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    add = () => {
        Store.dispatch({ type: 'ADD' })
    }
    minus = () => {
        Store.dispatch({ type: 'MINUS' })
    }
    asyncAdd = () => {
        // setTimeout(() => {
        //     Store.dispatch({ type: 'ADD' })
        // }, 1000)

        Store.dispatch((dispatch, getState) => {
            setTimeout(() => {
                dispatch({ type: 'ADD' })
            }, 1000)
        })
    }

    promiseAdd = () => {
        Store.dispatch(Promise.resolve({
            type: 'MINUS',
            payload: 100
        }))
    }
    addNum = () => {
        Store.dispatch({
            type: 'ADDNUM'
        })
    }
    render() {
        return <div>
            <p>count:{Store.getState().count}</p>
            <p>num:{Store.getState().num}</p>
            <p onClick={this.addNum}>ADDADDNUM</p>

            <p onClick={this.add}>ADD</p>
            <p onClick={this.asyncAdd}>asyncAdd</p>
            <p onClick={this.promiseAdd}>promiseMinus</p>
            <p onClick={this.minus}>MINUS</p>
        </div>
    }
}










function fn1(params) {
    console.log(params, 'f1')
    return params
}
function fn2(params) {
    console.log(params, 'f2')
    return params
}

function fn3(params) {
    console.log(params, 'f2')
    return params
}



let res = compose(fn1)('omg')

function compose(...funs) {
    if (funs.length === 0) {
        return (args) => args
    }
    if (funs.length === 1) {
        return funs[0]
    }
    return funs.reduce((prevFn, nextFn) => (agrs) => prevFn(nextFn(agrs)))
}

export default Page