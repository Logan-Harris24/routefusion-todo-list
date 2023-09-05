import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { NoteForm } from "./components/NoteForm";
import { Notes } from "./components/Notes";

const LOCAL_STORAGE_KEY = 'todo:notes';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadSavedNotes();
  }, [])
  
  function loadSavedNotes() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
      setNotes(JSON.parse(saved));
    }
  }

  function setNotesAndSave(newNotes) {
    setNotes(newNotes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newNotes));
  }

  function createNote(noteDescription) {
    setNotesAndSave([...notes, {
      id: crypto.randomUUID(),
      description: noteDescription,
      isCompleted: false,
      createdDate: new Date()
    }]);
  }

  function editNoteById(noteId, noteDescription) {
    const newNotes = notes.map(note => {
      if(note.id === noteId) {
        return {
          ...note,
          description: noteDescription
        }
      }
      return note;
    });
    setNotesAndSave(newNotes);
  }

  function deleteNoteById(noteId) {
    const newNotes = notes.filter(note => note.id !== noteId);
    setNotesAndSave(newNotes);
  }

  function toggleCompleteNoteById(noteId) {
    const newNotes = notes.map(note => {
      if(note.id === noteId) {
        return {
          ...note,
          isCompleted: !note.isCompleted
        }
      }
      return note;
    });
    setNotesAndSave(newNotes);
  }

  return (
    <>
      <Header />
      <NoteForm handleCreateNote={createNote}/>
      <Notes notes={notes} handleEditNote={editNoteById} handleDeleteNote={deleteNoteById} handleCompleteNote={toggleCompleteNoteById}/>
    </>
  )
}

export default App
