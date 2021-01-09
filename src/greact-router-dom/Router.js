import React from 'react'
import RouterContext from './RouterContext'

class Router extends React.Component {
    static computedRootMatch(pathname) {
        return { path: '/', url: '/', params: {}, isExact: pathname === '/' }
    }

    constructor(props) {
        super(props)
        this.state = {
            location: props.histrory
        }
        this.unhistrory = props.histrory.listen((location) => {
            this.setState({ location })
        })
    }
    componentWillUnmount() {
        this.unhistrory()
    }
    render() {
        return (
            <div>
                <RouterContext.Provider value={{
                    histrory: this.props.histrory,
                    location: this.state.location,
                    match: Router.computedRootMatch(this.state.location.pathname)
                }}>
                    {this.props.children}
                </RouterContext.Provider>
            </div>
        )
    }
}

export default Router
