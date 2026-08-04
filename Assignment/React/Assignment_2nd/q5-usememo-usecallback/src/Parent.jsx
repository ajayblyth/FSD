
import { useCallback, useMemo, useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);

  const style = useMemo(() => {
    return { color: "red" };
  }, []);

  // Without useMemo, a new style object is created on every render,
  // so React.memo cannot prevent the child from re-rendering.

  const handleClick = useCallback(() => {
    console.log("Button Clicked");
  }, []);

  // Without useCallback, a new function is created every render,
  // so React.memo still re-renders the child.

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Counter : {count}
      </button>

      <Child style={style} onClick={handleClick} />
    </div>
  );
}

export default Parent;