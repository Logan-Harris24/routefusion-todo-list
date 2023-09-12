import { useState, useEffect } from "react";
import { Header } from "./components/Header/header";
import { NoteForm } from "./components/NoteForm/noteform";
import { Notes } from "./components/Notes/notes";
import { ConfirmModal } from "./components/ConfirmModal/confirmmodal";
import { ToastContainer } from 'react-toastify';
import config from '../config.js';

function App() {
  const [notes, setNotes] = useState(
    (localStorage.getItem(config.localStorageKey))
      ? JSON.parse(localStorage.getItem(config.localStorageKey))
      : []
  );

  useEffect(()=>{
    if(config.useMockData) {
      getMockData();
    }
  },[])

  const getMockData=()=>{
    fetch('/data/notes.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        localStorage.setItem(config.localStorageKey, JSON.stringify(json));
      });
  }

  function setNotesAndSave(newNotes) {
    setNotes(newNotes);
    localStorage.setItem(config.localStorageKey, JSON.stringify(newNotes));
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

  function completeNotes(completedNotes) {
    const newNotes = notes.map(note => {
      if(completedNotes.some((completedNote) => completedNote.id === note.id)) {
        return {
          ...note,
          isCompleted: true
        }
      }
      return note;
    });
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
      <ConfirmModal/>
      <ToastContainer autoClose={4000}/>
      <div data-testid="appHeader">
        <Header/>
      </div>
      <div data-testid="appNoteForm">
        <NoteForm handleCreateNote={createNote}/>
      </div>
      <div data-testid="appNotes">
        <Notes notes={notes} handleEditNote={editNoteById} handleDeleteNotes={deleteNotes} handleCompleteNotes={completeNotes} handleToggleCompleteNotes={toggleCompleteNotes}/>
      </div>
    </>
  )
}

export default App
