import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNote({ addNote }) {

  // ===============================
  // Controlled Input State
  // ===============================

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Used to navigate after adding a note.
  const navigate = useNavigate();

  // ===============================
  // Form Submit
  // ===============================

  const handleSubmit = (e) => {

    // Prevent page refresh.
    e.preventDefault();

    // Don't allow empty notes.
    if (title.trim() === "" || body.trim() === "") {
      return;
    }

    // Call the function received from App.jsx.
    addNote(title, body);

    // Clear the form.
    setTitle("");
    setBody("");

    // Navigate to the Notes page.
    navigate("/notes");
  };

  return (
    <div>

      <h2>Add Note</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Title</label>

          <br />

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
          />
        </div>

        <br />

        <div>
          <label>Body</label>

          <br />

          <textarea
            rows="5"
            cols="40"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter Note"
          />
        </div>

        <br />

        <button type="submit">
          Add Note
        </button>

      </form>

    </div>
  );
}

export default AddNote;