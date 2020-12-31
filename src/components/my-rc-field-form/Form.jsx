import React from 'react'
import FieldContext from "./FieldContext"
import useForm from "./useForm";

const Form = ({ children, onFinish, onFinishFailed, form }) => {
    const [formInstance] = useForm(form)
    formInstance.setCallbacks({ onFinish, onFinishFailed })
    return <FieldContext.Provider value={formInstance}>
        <form onSubmit={(e) => {
            e.preventDefault()
            formInstance.submit()
        }}>{children}</form>
    </FieldContext.Provider>
}
export default Form