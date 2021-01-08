import React, { useContext, useReducer, useLayoutEffect } from 'react'
import bindActionCreators from './bindActionCreators'
import Provider, { Context } from './Provider'
import connect from './connect'



function useStore() {
    return useContext(Context)
}

function useDispatch() {
    let store = useStore()
    return store.dispatch
}

function useSelector(selector) {
    let store = useStore()
    const [update, fourceUpdate] = useReducer(x => x + 1, 0)
    // const [update, fourceUpdate] = useState(0)

    // useEffect(() => {
    //     let unsubscribe = subscribe(() => {
    //         fourceUpdate()
    //     })
    //     return () => {
    //         unsubscribe()
    //     }
    // }, [store])

    //dom更新完成之后同步执行
    useLayoutEffect(() => {
        let unsubscribe = store.subscribe(() => {
            fourceUpdate()
        })
        return () => {
            unsubscribe()
        }
    }, [store])
    const selectData = selector(store.getState())
    return selectData
}


export {
    bindActionCreators,
    Provider,
    connect,
    useDispatch,
    useSelector
}