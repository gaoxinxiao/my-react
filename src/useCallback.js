// import * as React from "react";
// import { useState, useCallback, PureComponent } from "react";

// export default function UseCallbackPage(props) {
//     const [count, setCount] = useState(0);
//     const addClick = () => {
//         let sum = 0;
//         for (let i = 0; i < count; i++) {
//             sum += i;
//         }
//         return sum;
//     };
//     const [value, setValue] = useState("");
//     const ChildEle = useCallback(() => addClick(), [count])

//     return (
//         <div>
//             <h3>UseCallbackPage</h3>
//             <p>{count}</p>
//             <button onClick={() => setCount(count + 1)}>add</button>
//             <input value={value} onChange={event => setValue(event.target.value)} />
//             <Child addClick={ChildEle} count={count} />
//         </div>
//     );
// }
// class Child extends PureComponent {
//     render() {
//         console.log("child render", this.props.count);
//         const { addClick } = this.props;
//         return (
//             <div>
//                 <h3>Child</h3>
//                 <button onClick={() => console.log(addClick())}>add</button>
//             </div>
//         );
//     }
// }

import * as React from "react";
import { useState, useMemo } from "react";

export default function UseMemoPage(props) {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState("");
    const expensive = useMemo(() => {
        console.log("compute");
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += i;
        }
        return sum;
    }, [count])
    return (
        <div>
            <h3>UseMemoPage</h3>
            <p>expensive:{expensive}</p>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <input value={value} onChange={event => setValue(event.target.value)} />
        </div>
    );
}