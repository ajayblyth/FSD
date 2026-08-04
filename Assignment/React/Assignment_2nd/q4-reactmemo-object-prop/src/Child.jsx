import React from "react";

const Child = React.memo(({ style }) => {
  console.log("Child Rendered");

  return <h2 style={style}>React.memo Example</h2>;
});

// React.memo cannot prevent the re-render because
// style={{ color: "red" }} creates a NEW object every render.
// React.memo compares object references, not object contents.

export default Child;