import { useCallback, useState } from "react";
import TodoItem from "./TodoItem";

function Todo() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Learn Hooks" },
  ]);

  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        text: input,
      },
    ]);

    setInput("");
  };

  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  }, []);

  // Without useCallback, a new deleteTodo function is created
  // on every render, so React.memo cannot prevent existing
  // TodoItem components from re-rendering.
  //
  // Using the functional form of setState (prevTodos => ...)
  // means deleteTodo does not depend on the current todos state.
  // Therefore the dependency array can stay empty ([]).

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo List</h2>

      <input
        type="text"
        placeholder="Enter Todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addTodo}>Add Todo</button>

      <hr />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
}

export default Todo;