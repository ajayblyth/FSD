import React from "react";

const Child = React.memo(({ fruits }) => {
  console.log("Child Rendered");

  return (
    <div>
      <h3>Fruit List</h3>

      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
});

export default Child;

// React.memo skips unnecessary child re-renders.
// It compares prop references and re-renders only if they change.
// Without React.memo, the child always re-renders when the parent renders.

