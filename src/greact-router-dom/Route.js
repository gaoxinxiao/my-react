import React, { useContext } from 'react'
import RouterContext from './RouterContext'
import matchPath from './matchPath'

function Route(props) {
    let {location} = useContext(RouterContext)
    let match = matchPath(location.location.pathname, props)
    return (
        <div>
            {match ? React.createElement(props.component) : null}
        </div>
    )
}

export default Route
