import React from "react";

const TodoItem = React.memo(({ todo, onDelete }) => {
  console.log("Rendered :", todo.text);

  return (
    <div
      style={{
        marginBottom: "10px",
      }}
    >
      <span>{todo.text}</span>

      <button
        style={{ marginLeft: "10px" }}
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
});

// Without React.memo, every TodoItem re-renders whenever
// the parent component renders, even if its props never change.

export default TodoItem;