import React, { useEffect, useState } from "react";

const UseEffect_basics = () => {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setPageWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);
    console.log("Hello from UseEffect");

    return () => {
      console.log("Removing .... ");
      window.removeEventListener("resize", resizeHandler);
    };
  });

  return (
    <div>
      <h2>UseEffect_basics</h2>
      <h2 onClick={() => setToggle(!toggle)}>
        {toggle ? "open" : "close"}
      </h2>

      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Inc+</button>

      <h2>{pageWidth}</h2>
    </div>
  );
};

export default UseEffect_basics; 