import React from 'react'

export const Context = React.createContext()


function Provider({ store, children }) {
    return <Context.Provider value={store}>{children}</Context.Provider>
}

export default Provider