import { useEffect, useRef, useState } from "react";

function Closure() {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    countRef.current = count;

    console.log("count now:", count);

    useEffect(() => {
        const id = setInterval(() => {
            console.log(`useref: ${countRef.current}`);
            console.log(`state: ${count}`);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        console.log("count inside effect:", count);
    }, []);

    return <button onClick={() => setCount(c => c + 1)}>+</button>;
}

export default Closure;