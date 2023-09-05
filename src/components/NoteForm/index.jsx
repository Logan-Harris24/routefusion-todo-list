import styles from './noteform.module.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const minDescriptionLength = 1;
const maxDescriptionLength = 100;

export function NoteForm({ handleCreateNote }) {
  const [description, setDescription] = useState('');
  const [isTyping, toggleIsTyping] = useState(false);
  
  let currDescriptionLength = (maxDescriptionLength-description.length)

  function handleSubmit(e) {
    e.preventDefault();

    if(description.length < minDescriptionLength || description.length > maxDescriptionLength){ 
      toast.error(`Note must be between ${minDescriptionLength} and ${maxDescriptionLength} characters.`);
    }
    else{
      console.log(description.trim());
      handleCreateNote(description.trim());
      setDescription('');
      toast.success(`Note created successfully!`);
    }
  }

  function onChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleIsTyping() {
    toggleIsTyping(!isTyping);
  }

  return (
    <div>
      <ToastContainer autoClose={2500} />
      <div className={styles.subheaderContainer}>
        <header>
          <p>What's on your to-do list?</p>
        </header>
      </div>
      <div>
        <div className={styles.newNoteContainer}>
          <form onSubmit={handleSubmit} className={styles.newNoteForm}>
            <input
              placeholder="Create a new note (e.g., Pick up Torchy's Tacos)"
              type="text"
              value={description}
              onClick={handleIsTyping}
              onBlur={handleIsTyping}
              onChange={onChangeDescription}
            />
            <button>Create</button>
          </form>
        </div>
        <div className={styles.counterContainer}>
            <p className={styles.counterText}>Characters remaining:</p>
            <span className={currDescriptionLength < 0 ? styles.counterNumberRed : styles.counterNumber}>{currDescriptionLength}</span>
          {
            /*(!isTyping)
              ? undefined
              : (<span>{description.length}/100</span>)*/
          }
        </div>
      </div>
    </div>
  )
}