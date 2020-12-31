import React from 'react'

//数据仓库 input
class FormStore {
    constructor() {
        this.store = {}

        this.filedEntities = []

        this.callbacks = {}

        this.rulesList = {}
    }

    //获取校验规则
    getRules = (rulesList) => {
        this.rulesList = {
            ...this.rulesList,
            ...rulesList
        }
    }

    setCallbacks = (callbacks) => {
        this.callbacks = {
            ...this.callbacks,
            ...callbacks
        }
    }

    registerFieldEntity = (entitv) => {
        this.filedEntities.push(entitv)
        return () => {
            this.filedEntities.filter(v => v !== entitv)
            delete this.store[entitv.props.name]
        }
    }

    getFieldValue = (name) => {
        return this.store[name]
    }
    getFieldsValue = () => {
        return { ...this.store }
    }

    setFieldsValue = (newStore) => {
        this.store = {
            ...this.store,
            ...newStore
        }
        this.filedEntities.forEach(entitvs => {
            Object.keys(this.store).forEach(v => {
                if (v === entitvs.props.name) {
                    entitvs.onStoreChange()
                }
            })
        })
        console.log(this.store)
    }

    validte = () => {
        let err = []
        let value = this.getFieldsValue()
        if (Object.keys(value).length) {
            Object.keys(this.rulesList).forEach(key => {
                if (this.rulesList[key][0].required) {
                    if (!value[key]){
                        err.push(key)
                        alert(`${[key]}不能为空`)
                    }
                }
            })
        } else {
            //全部为空的情况
            Object.keys(this.rulesList).forEach(key => {
                if (this.rulesList[key][0].required) {
                    err.push(key)
                    alert(`${[key]}不能为空`)
                }
            })
        }
        return err
    }

    //提交的时候执行校验    
    submit = () => {
        const { onFinish, onFinishFailed } = this.callbacks
        let err = this.validte()
        if (err.length) {
            //校验失败
            onFinishFailed(this.getFieldsValue())
        } else {
            onFinish(err, this.getFieldsValue())
        }
    }

    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            setFieldsValue: this.setFieldsValue,
            registerFieldEntity: this.registerFieldEntity,
            submit: this.submit,
            setCallbacks: this.setCallbacks,
            getRules: this.getRules
        }
    }
}

export default function useForm(form) {
    const formRef = React.useRef()
    if (!formRef.current) {
        if (form){
            formRef.current = form
        } else {
            const formStore = new FormStore()
            formRef.current = formStore.getForm()
        }
    }

    return [formRef.current]
}
