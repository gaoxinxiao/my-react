import React from 'react'
import RouterContext from './RouterContext'
import matchPath from './matchPath'
import { ReactReduxContext } from 'react-redux';


export default function Switch(props) {
    return (
        <RouterContext.Consumer>
            {(context) => {
                let match,
                    element;
                let { location } = context.location
                React.Children.forEach(props.children, child => {
                    if (match == null) {
                        element = child
                        match = child.props.path ? matchPath(location.pathname, child.props) : context.match
                    }
                })
                return match ? React.cloneElement(element, { computedMatch: match }) : null
            }}
        </RouterContext.Consumer>
    )
}
