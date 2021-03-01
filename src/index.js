import React from 'react';
import ReactDOM from 'react-dom';
import TextArea from './textArea' //实现微博@功能组件

// import $ from 'jquery'
// import App from './App';
// import Kkbapp from './kkbapp'
// import { Provider } from 'react-redux'
// import Store from './store'
// import { Provider } from './greactRedux'

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={Store}>
//       <Kkbapp />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// import ReactDOM,{useState} from "./greact-dom"
// import './index.css';


// function FunComp() {

//   //输出数组是因为不想让变量固定
//   const [count,setCount] = useState(0)

//   return <>
//     <button onClick={()=> setCount(count+1)}>{count+''}</button>
//     <p>我是FunComp1</p>
//     <p>我是FunComp2</p>
//   </>
// }


// class ClComp extends React.Component {
//   render() {
//     return <div>我是类组件ClComp</div>
//   }
// }

// ClComp.prototype.isReactComponent = {}

// const jsx = (
//   <div className='wrap'>
//     <h1 className='red'>登高</h1>
//     <p>风急天高猿啸哀</p>
//     <p>渚清沙白鸟飞回</p>
//     <FunComp />
//     <ClComp />
//   </div>
// )


// ReactDOM.render(jsx, document.getElementById('root'))


// ReactDOM.render(
//   <TextArea />,
//   document.getElementById('root')
// );



import UseCallbackPage from './useCallback'

ReactDOM.render(<UseCallbackPage />, document.getElementById('root'))