
function bindActionCreator(fun, dispatch) {
    return (...args) => dispatch(fun(...args))
}

function bindActionCreators(funcs, dispatch) {
    let obj = {}
    for (let key in funcs) {
        obj[key] = bindActionCreator(funcs[key], dispatch)
    }
    return obj
}
export default bindActionCreators