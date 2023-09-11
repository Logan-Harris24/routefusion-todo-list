import { useEffect, useState } from "react";
import { Header } from "./components/Header/header";
import { NoteForm } from "./components/NoteForm/noteform";
import { Notes } from "./components/Notes/notes";
import { ToastContainer } from 'react-toastify';

const LOCAL_STORAGE_KEY = 'todo:notes';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));

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

  function deleteNotes(deletedNotes) {
    const newNotes = notes.filter(note => !deletedNotes.includes(note));
    if(newNotes){
      setNotesAndSave(newNotes);
    }
  }

  function toggleCompleteNotes(completedNotes) {
    const newNotes = notes.map(note => {
      if(completedNotes.some((completedNote) => completedNote.id === note.id)) {
        return {
          ...note,
          isCompleted: !note.isCompleted
        }
      }
      return note;
    });
    if(newNotes){
      setNotesAndSave(newNotes);
    }
  }

  return (
    <>
      <Header />
      <ToastContainer autoClose={4000} />
      <NoteForm handleCreateNote={createNote}/>
      <Notes notes={notes} handleEditNote={editNoteById} handleDeleteNotes={deleteNotes} handleCompleteNotes={toggleCompleteNotes}/>
    </>
  )
}

export default App
