import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NoteDetail from "./pages/NoteDetail";
import NotFound from "./pages/NotFound";

// Requirement 7:
// Lazy load the Add Note page.
// The AddNote component will be downloaded only
// when the user visits "/add".
const AddNote = lazy(() => import("./pages/AddNote"));

function App() {

  // ============================================
  // Requirement 1:
  // Notes live in useState in the parent component.
  // Every page receives notes as props.
  // ============================================

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "First note",
      body: "This is my first note.",
    },
    {
      id: 2,
      title: "Shopping",
      body: "Milk, eggs, bread.",
    },
  ]);

  // ============================================
  // Add Note Function
  // ============================================

  const addNote = (title, body) => {

    // Requirement 2:
    // Every note should have a unique id.
    // Date.now() generates a unique number.

    const newNote = {
      id: Date.now(),
      title,
      body,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // ============================================
  // Delete Note Function
  // ============================================

  const deleteNote = (id) => {

    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    );

  };

  return (

    // Suspense displays fallback content while
    // the AddNote component is being downloaded.

    <Suspense fallback={<h2>Loading Add Note Page...</h2>}>

      <Routes>

        {/* Layout Route */}

        <Route path="/" element={<Layout />}>

          {/* Home Page */}

          <Route
            index
            element={<Home />}
          />

          {/* Notes List */}

          <Route
            path="notes"
            element={
              <Notes
                notes={notes}
              />
            }
          />

          {/* Single Note */}

          <Route
            path="notes/:id"
            element={
              <NoteDetail
                notes={notes}
                deleteNote={deleteNote}
              />
            }
          />

          {/* Add Note */}

          <Route
            path="add"
            element={
              <AddNote
                addNote={addNote}
              />
            }
          />

          {/* 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Route>

      </Routes>

    </Suspense>

  );
}

export default App;