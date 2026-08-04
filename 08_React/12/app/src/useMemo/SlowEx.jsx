
import React, { useMemo, useState } from "react";

const slowDouble = (num) => {
  console.log("Running the slow calc");

  const start = Date.now();

  while (Date.now() - start < 1000) {}

  return num * 2;
};

const SlowEx = () => {

  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  // const doubled = slowDouble(number); //problem:This runs on every render, even when only the theme changes.

  const doubled = useMemo(() => {
  return slowDouble(number);
}, [number]);

  const theme = {
    backgroundColor: dark ? "#333" : "#FFFFFF",
    color: dark ? "#FFFFFF" : "#000000",
    padding: "1rem",
  };

  return (
    <div style={theme}>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <button onClick={() => setDark(!dark)}>
        Toggle Theme
      </button>

      <h2>Doubled: {doubled}</h2>

    </div>
  );
};

export default SlowEx;