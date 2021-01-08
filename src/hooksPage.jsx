import React, { useReducer, useCallback } from 'react'
import { useSelector, useDispatch, connect } from "./greactRedux";
import { countReducer } from './store/index1.js'

// const HooksPage = () => {
//     const [state, dispatch] = useReducer(countReducer, 0)

//     return <div>
//         count:{state}
//         <button onClick={() => dispatch({ type: 'ADD' })}>add</button>
//     </div>
// }


function ReactReduxHookPage({ value }) {
    const dispatch = useDispatch();
    const add = useCallback(() => {
        dispatch({ type: "ADD" });
    }, []);
    const count = useSelector(({ count }) => count);
    return (
        <div>
            <h3>ReactReduxHookPage</h3>
            <p>{count}</p>
            <button onClick={add}>add</button>
        </div>
    );
}

export default ReactReduxHookPage
// export default HooksPage