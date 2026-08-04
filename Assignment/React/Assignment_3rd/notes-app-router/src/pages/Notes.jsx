import { Link } from "react-router-dom";

function Notes({ notes }) {

  // Requirement 1:
  // Notes are received as props from App.jsx.
  // App.jsx is the single source of truth.

  return (
    <div>

      <h2>All Notes</h2>

      {/* If there are no notes */}

      {notes.length === 0 && (
        <h3>No Notes Available</h3>
      )}

      {/* Display every note */}

      {notes.map((note) => {

        return (

          <div
            key={note.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >

            {/* Requirement 3:
                Use Link instead of <a href>
            */}

            <Link
              to={`/notes/${note.id}`}
              style={{
                textDecoration: "none",
                color: "blue",
                fontWeight: "bold",
              }}
            >
              {note.title}
            </Link>

          </div>

        );

      })}

    </div>
  );
}

export default Notes;
