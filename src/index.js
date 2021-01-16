import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
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

import ReactDOM from "./greact-dom"


function FunComp(params) {
  return <>
    <p>我是FunComp1</p>
    <p>我是FunComp2</p>
  </>
}


class ClComp extends React.Component {
  render() {
    return <div>我是类组件ClComp</div>
  }
}

ClComp.prototype.isReactComponent = {}

const jsx = (
  <div className='wrap'>
    <h1 className='red'>登高</h1>
    <p>风急天高猿啸哀</p>
    <p>渚清沙白鸟飞回</p>
    <FunComp />
    {/* <ClComp /> */}
  </div>
)


ReactDOM.render(jsx, document.getElementById('root'))



// function TextArea() {

//   const [valueNode, setValueNode] = useState('')
//   const [valueNodeList, setValueNodeList] = useState([])
//   const [valueNodeObj, setValueNodeObj] = useState({})
//   const [isShow, setIsShow] = useState(false)

//   let data = [
//     { name: '钢铁侠', id: 1 },
//     { name: '黑寡妇', id: 2 },
//     { name: '美国队长', id: 3 },
//     { name: '绿巨人', id: 4 },
//   ]

//   useEffect(() => {
//     const Input = document.getElementById('Input')
//     Input.addEventListener('input', () => {
//       let value = Input.textContent
//       if (value.substring(value.length - 1) === '@') {
//         setIsShow(true)
//       } else {
//         setIsShow(false)
//       }
//     })
//   }, [])

//   return <div>

//     <div
//       id='Input'
//       className='input'
//       contenteditable="true">
//     </div>

//     {
//       isShow && data.map(res => {
//         return <p
//           className='item'
//           key={res.id} onClick={() => {
//             const Input = document.getElementById('Input')

//             let text = Input.textContent.slice(0, Input.textContent.length - 1)
//             Object.keys(valueNodeObj).forEach(key => {
//               if (text.indexOf(key) !== -1) {
//                 text = text.replace(key, valueNodeObj[key])
//               }
//             })

//             let str = `<span contenteditable=false style='color:red'>@${res.name}&nbsp;</span>`

//             $("#Input").html(text + str);


//             valueNodeObj['@' + res.name] = `<span contenteditable=false style='color:red'>@${res.name}</span>`

//             setIsShow(false)
//           }}>{res.name}</p>
//       })
//     }
//   </div>
// }

// ReactDOM.render(
//   <TextArea />,
//   document.getElementById('root')
// );