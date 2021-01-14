import React from 'react'
import RouterContext from './RouterContext'

class Prompt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            when: props.when,
            message: props.message
        }
    }
    render() {
        const { message, when } = this.state
        return <RouterContext.Consumer>
            {context => {
                if (!when) {
                    return null
                }
                let method = context.history.block

                return <LifeCycle
                    onMount={self => {
                        self.replace = method(message)
                    }}
                    onUnMount={self => {
                        self.replace()
                        // this.unblock()
                        // this.unblock = null;
                    }}
                />
            }}
        </RouterContext.Consumer>
    }
}


class LifeCycle extends React.Component {
    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount.call(this, this)
        }
    }
    componentWillUnmount() {
        if (this.props.onUnMount) {
            this.props.onUnMount.call(this, this)
        }
    }
    render() {
        return null
    }
}

export default Prompt;
// export default Prompt