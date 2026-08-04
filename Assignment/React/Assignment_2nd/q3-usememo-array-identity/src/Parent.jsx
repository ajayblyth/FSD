import { useMemo, useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);

  // Although the array values never change, a NEW array object is created
// on every parent render. React.memo compares prop references, not contents,
// so it sees a different array reference and re-renders the child.


  // const fruits = ["Apple", "Banana", "Orange"];

    const fruits = useMemo(() => {
    return ["Apple", "Banana", "Orange", "Grapes", "Mango", "Pineapple","Peach","papaya"];
  }, []);

  return (
    <div>
      {/* <h2>Without useMemo</h2> */}

      <h2>With useMemo</h2>

      <h3>Counter : {count}</h3>

      <button onClick={() => setCount(count + 1)}>
        Increment Counter
      </button>

      <Child fruits={fruits} />
    </div>
  );
}

export default Parent;