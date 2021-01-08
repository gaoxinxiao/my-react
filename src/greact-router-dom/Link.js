import React from 'react'
import RouterContext from './RouterContext'

class Link extends React.Component {

    static contextType = RouterContext;

    handelClick(e, history) {
        e.preventDefault()
        const { to } = this.props
        history.push(to)
    }
    render() {
        const { to, children, ...reset } = this.props

        return <RouterContext.Consumer>
            {(val) => {
                return <a {...reset} onClick={(e) => this.handelClick(e, val.histrory)} href={to}>{children}</a>
            }}
        </RouterContext.Consumer>
    }
}

export default Link
