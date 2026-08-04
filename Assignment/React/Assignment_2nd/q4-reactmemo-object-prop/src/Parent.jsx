import { useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div style={
      { padding: 20 }
      }>
      <button onClick={() => setCount(count + 1)}>
        Counter : {count}
      </button>

      <Child style={{ color: "red" }} />
    </div>
  );
}

export default Parent;