import { memo } from "react";

const Child = memo(({ style, onClick }) => {
  console.log("Child Rendered");

  return (
    <div>
      <h2 style={style}>React.memo Fixed</h2>

      <button onClick={onClick}>Click Me</button>
    </div>
  );
});

// Removing React.memo causes the child to render
// whenever the parent renders.

export default Child;