import React, { Component } from 'react'
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useHistory,
//     useLocation,
//     useParams,
//     withRouter,
//     // Prompt,
//     Redirect,
//     useRouteMatch
// } from 'react-router-dom'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    withRouter,
    Prompt
} from './greact-router-dom'

/**
 * react-router三种渲染方式
 * children
 * component
 * render
*/

function Detail(params) {
    return <div>详情</div>
}

class Home extends React.Component {
    componentDidMount() {
        // console.log('componentDidMount')
    }
    componentWillUnmount() {
        // console.log('componentWillUnmount')
    }
    render() {
        return <div>首页</div>
    }
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { confirm: true };
    }
    render() {
        return (
            <div>
                <h3>Product</h3>
                <Link to="/">go home</Link>
                <Prompt
                    when={this.state.confirm}
                    // message="Are you sure you want to leave?"
                    message={location => {
                        return "确定离开吗";
                    }}
                />
            </div>
        );
    }
}
export default class routerPage extends Component {
    state = {
        count: 0
    }
    render() {
        return (
            <div>
                <p onClick={() => this.setState({ count: ++this.state.count })}>count:{this.state.count}</p>
                <Router>

                    <Link to='/'>首页</Link>
                    <Link to='/detail'>详情</Link>
                    <Link to='/login'>登陆</Link>
                    <Link to='/shop'>商品</Link>

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/detail' render={() => <Detail />} />
                        <Route path='/login' component={() => <div>登陆</div>} />
                        <Route path='/shop' component={Product} />
                        <Route component={() => <div>404</div>} />
                    </Switch>
                </Router>
            </div>
        )
    }
}
