import React, { useContext, useEffect, useReducer, useState, useLayoutEffect } from 'react'
import { Context } from './Provider'
import bindActionCreators from './bindActionCreators'

const connect = (
    mapStateToProps = (state) => state,
    mapDispatchToProps) =>
    (WrappedComponent) => (props) => {
        const store = useContext(Context)
        const { getState, dispatch, subscribe } = store
        let statePorps = mapStateToProps(getState())
        let dispatchProps = { dispatch }

        if (typeof mapDispatchToProps === 'function') {
            dispatchProps = mapDispatchToProps(dispatch)
        } else if (typeof mapDispatchToProps === 'object'){
            dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
        }
        dispatchProps = {
            ...dispatchProps,
            dispatch
        }
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
            let unsubscribe = subscribe(() => {
                fourceUpdate()
            })
            return () => {
                unsubscribe()
            }
        }, [store])

        return <WrappedComponent {...props} {...statePorps} {...dispatchProps} />
    }

export default connect