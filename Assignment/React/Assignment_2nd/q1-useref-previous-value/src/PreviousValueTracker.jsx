import { useEffect, useRef, useState } from "react";

function PreviousValueTracker() {
  const [number, setNumber] = useState("");

  const previousValue = useRef("");

  useEffect(() => {
    previousValue.current = number;
  }, [number]);

  console.log("Current:", number);
  console.log("Previous:", previousValue.current);

  return (
    <div >
      <h2>Previous Value Tracker</h2>

      <input type="number"  value={number}
        onChange={(e) => setNumber(e.target.value)}  />

      <h3>Current Value : {number}</h3>
      <h3>Previous Value : {previousValue.current}</h3>
    </div>
  );
}

export default PreviousValueTracker;

// We cannot use useState to store the previous value because updating state
// causes another render, which would lead to unnecessary renders.
// useRef stores the previous value without triggering a re-render.