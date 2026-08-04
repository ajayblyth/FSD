
import React, { useState, useEffect, useRef } from "react";

const RenderCounter = () => {
  const [text, setText] = useState("");
  const renderCount = useRef(1);

  // Using state here would cause:
  // render -> setState -> render -> setState -> infinite loop
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <h3>Typing: {text}</h3>
      <h3>Component rendered {renderCount.current} times</h3>
    </div>
  );
};

export default RenderCounter;
