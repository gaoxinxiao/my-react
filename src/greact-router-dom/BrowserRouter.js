import React from 'react'
import Router from './Router'
import { createBrowserHistory } from 'history'

class BrowserRouter extends React.Component {
    constructor() {
        super()
        this.histrory = createBrowserHistory()
    }
    render() {
        return (
            <div>
                <Router histrory={this.histrory} children={this.props.children} />
            </div>
        )
    }
}

export default BrowserRouter
