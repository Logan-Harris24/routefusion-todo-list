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
    if(config.useMockData && notes.length === 0) {
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

  function saveNotes(newNotes) {
    setNotes(newNotes);
    localStorage.setItem(config.localStorageKey, JSON.stringify(newNotes));
  }

  function createNote(noteDescription) {
    saveNotes([...notes, {
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
    saveNotes(newNotes);
  }

  function deleteNotes(deletedNotes) {
    const newNotes = notes.filter(note => !deletedNotes.includes(note));
    if(newNotes){
      saveNotes(newNotes);
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
      saveNotes(newNotes);
    }
  }

  function unCompleteNotes(uncompletedNotes) {
    const newNotes = notes.map(note => {
      if(uncompletedNotes.some((uncompletedNote) => uncompletedNote.id === note.id)) {
        return {
          ...note,
          isCompleted: false
        }
      }
      return note;
    });
    if(newNotes){
      saveNotes(newNotes);
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
      saveNotes(newNotes);
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
        <Notes
          notes={notes}
          handleEditNote={editNoteById}
          handleDeleteNotes={deleteNotes}
          handleCompleteNotes={completeNotes}
          handleUncompleteNotes={unCompleteNotes}
          handleToggleCompleteNotes={toggleCompleteNotes}
        />
      </div>
    </>
  )
}

export default App
