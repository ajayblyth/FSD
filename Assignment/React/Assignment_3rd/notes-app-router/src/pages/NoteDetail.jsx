import { useNavigate, useParams } from "react-router-dom";

function NoteDetail({ notes, deleteNote }) {

  // ==========================================
  // useParams()
  // Reads the dynamic id from the URL.
  //
  // Example:
  // /notes/1
  // id = "1"
  // ==========================================

  const { id } = useParams();

  // ==========================================
  // useNavigate()
  // Used to navigate to another page
  // programmatically.
  // ==========================================

  const navigate = useNavigate();

  // ==========================================
  // Find the matching note.
  //
  // id from useParams() is a STRING.
  // note.id is a NUMBER.
  //
  // Convert id to Number before comparing.
  // ==========================================

 const noteId = Number(id);

const note = notes.find(
  (note) => note.id === noteId
);
  // ==========================================
  // Requirement 5
  // If note doesn't exist,
  // show "Note not found".
  // ==========================================

  if (!note) {
    return <h2>Note not found</h2>;
  }

  // ==========================================
  // Delete Button
  // ==========================================

  const handleDelete = () => {

    deleteNote(note.id);

    // Requirement 6
    // After deleting,
    // go back to Notes page.

    navigate("/notes");

  };

  return (
    <div>

      <h2>{note.title}</h2>

      <p>{note.body}</p>

      <button onClick={handleDelete}>
        Delete Note
      </button>

    </div>
  );
}

export default NoteDetail;