import React from 'react'
import Store from './store'
import { bindActionCreators, connect } from './greactRedux'


// const Page = () => {

//     return <div>
//         <p>count:{Store.getState()}</p>
//         <p onClick={() => Store.dispatch({ type: 'ADD' })}>ADD</p>
//         <p onClick={() => Store.dispatch({ type: 'MINUS' })}>MINUS</p>
//     </div>
// }


//hoc
@connect(
    //mapStateToProps
    ({ count }) => ({ count }),
    //mapDispatchToProps
    {
        add: () => ({ type: "ADD" }),
        minus: () => ({ type: "MINUS" })
    }
    // (dispatch) => {
    //     let creators = {
    //         add: () => ({ type: "ADD" }),
    //         minus: () => ({ type: "MINUS" })
    //     }

    //     creators = bindActionCreators(creators,dispatch)

    //     return {
    //         dispatch,
    //         ...creators
    //     }
    // }
)
class Page extends React.Component {
    componentDidMount() {
        this.unsubscribe = Store.subscribe(() => {
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    add = () => {
        const { dispatch } = this.props
        dispatch({ type: 'ADD' })
    }
    minus = () => {
        const { dispatch } = this.props
        dispatch({ type: 'MINUS' })
    }
    asyncAdd = () => {
        // setTimeout(() => {
        //     Store.dispatch({ type: 'ADD' })
        // }, 1000)

        const { dispatch } = this.props

        dispatch((dispatch, getState) => {
            setTimeout(() => {
                dispatch({ type: 'ADD' })
            }, 1000)
        })
    }

    promiseAdd = () => {
        const { dispatch } = this.props

        dispatch(Promise.resolve({
            type: 'MINUS',
            payload: 100
        }))
    }
    addNum = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'ADDNUM'
        })
    }
    render() {
        console.log(this.props)
        const { count, add, minus } = this.props
        return <div>
            <p>count:{count}</p>
            {/* <p>num:{Store.getState().num}</p> */}
            {/* <p onClick={this.addNum}>ADDADDNUM</p> */}

            <p onClick={add}>ADD</p>
            <p onClick={minus}>MINUS</p>
            <p onClick={this.asyncAdd}>asyncAdd</p>
            <p onClick={this.promiseAdd}>promiseMinus</p>
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