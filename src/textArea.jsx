
import React from 'react';
import $ from 'jquery'


function TextArea() {

  const [valueNodeObj, setValueNodeObj] = useState({})
  const [isShow, setIsShow] = useState(false)

  let data = [
    { name: '钢铁侠', id: 1 },
    { name: '黑寡妇', id: 2 },
    { name: '美国队长', id: 3 },
    { name: '绿巨人', id: 4 },
  ]

  useEffect(() => {
    const Input = document.getElementById('Input')
    Input.addEventListener('input', () => {
      let value = Input.textContent
      if (value.substring(value.length - 1) === '@') {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    })
  }, [])

  return <div>

    <div
      id='Input'
      className='input'
      contenteditable="true">
    </div>

    {
      isShow && data.map(res => {
        return <p
          className='item'
          key={res.id} onClick={() => {
            const Input = document.getElementById('Input')

            let text = Input.textContent.slice(0, Input.textContent.length - 1)
            Object.keys(valueNodeObj).forEach(key => {
              if (text.indexOf(key) !== -1) {
                var reg = new RegExp(`\\${key}`, 'gim');
                text = text.replace(reg, valueNodeObj[key])
              }
            })

            let str = `<span contenteditable=false style='color:red'>@${res.name}&nbsp;</span>`

            $("#Input").html(text + str);

            if (!valueNodeObj['@' + res.name]) valueNodeObj['@' + res.name] = `<span contenteditable=false style='color:red'>@${res.name}</span>`

            setIsShow(false)
          }}>{res.name}</p>
      })
    }
  </div>
}


export default TextArea