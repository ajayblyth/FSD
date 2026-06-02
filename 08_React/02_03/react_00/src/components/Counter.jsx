import { useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div>
      <p>Count: {count}</p>

      <button onClick={handleIncrement}>
        Increment
      </button>

      <button onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default Counter;