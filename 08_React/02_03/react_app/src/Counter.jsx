import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    function handleIncrement() {

        setCount(count + 1);

        console.log("Count after incrementing:", count);

    }

    return (

        <div>

            <p>Count: {count}</p>

            <button onClick={handleIncrement}>
                Increment
            </button>

        </div>

    );

}

export default Counter;