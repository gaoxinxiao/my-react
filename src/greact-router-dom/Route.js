import React, { useContext } from 'react'
import RouterContext from './RouterContext'

function Route(props) {
    let context = useContext(RouterContext)
    return (
        <div>
            {window.location.pathname === props.path ? React.createElement(props.component) : null}
        </div>
    )
}

export default Route
