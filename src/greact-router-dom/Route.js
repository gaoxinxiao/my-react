import React, { useContext } from 'react'
import RouterContext from './RouterContext'
import matchPath from './matchPath'

function Route(props) {
    let context = useContext(RouterContext)
    let { location } = context
    let { children, component, render, computedMatch, path } = props
    let match = computedMatch
        ? computedMatch : path ? matchPath(location.location.pathname, props) : context.match

    props = {
        ...props,
        match,
        context
    }
    return (
        <div>
            <RouterContext.Provider value={props}>
                {
                    match ?
                        typeof children === 'function' ?
                            children(props) :
                            component ?
                                React.createElement(props.component, props) :
                                render ?
                                    render(props)
                                    : null
                        : typeof children === 'function' ? children(props) : null
                }

            </RouterContext.Provider>
        </div>
    )
}

export default Route
