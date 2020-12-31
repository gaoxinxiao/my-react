import React from 'react'
import FieldContext from "./FieldContext"


class Field extends React.Component {
    static contextType = FieldContext

    componentDidMount() {
        const { name, rules } = this.props
        this.unregisterFieldEntity = this.context.registerFieldEntity(this)
        //获取校验规则
        this.context.getRules({ [name]: rules })
    }

    componentWillUnmount() {
        if (this.unregisterFieldEntity) {
            this.unregisterFieldEntity()
        }
    }

    onStoreChange = () => {
        this.forceUpdate()
    }

    getControlled = () => {
        const { setFieldsValue, getFieldValue } = this.context
        const { name, rules } = this.props
        return {
            value: getFieldValue(name),
            onChange: (e) => {
                const newValue = e.target.value
                setFieldsValue({ [name]: newValue })
            }
        }
    }
    render() {
        const { children } = this.props
        const returnChildNode = React.cloneElement(children, this.getControlled())
        return returnChildNode
    }
}

export default Field