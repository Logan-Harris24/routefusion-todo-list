import styles from './noteform.module.css';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../../config.js';

const minDescriptionLength = config.minDescriptionLength;
const maxDescriptionLength = config.maxDescriptionLength;

export function NoteForm({ handleCreateNote }) {
  const [description, setDescription] = useState('');
  const [isTyping, toggleIsTyping] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const noteRef = useRef(null);
  
  let charsRemaining = (maxDescriptionLength-description.length)
  let isValidDescription = ((charsRemaining) >= (minDescriptionLength-1) && (charsRemaining) < maxDescriptionLength)

  function handleSubmit(e) {
    e.preventDefault();

    if(!isValidDescription){ 
      toast.error(`Note must be between ${minDescriptionLength} and ${maxDescriptionLength} characters.`);
    }
    else{
      handleCreateNote(description.trim());
      setDescription('');
      toast.success(`Note created successfully!`);
    }
  }

  function onChangeDescription(e) {
    setDescription(e.target.value);
    setHasSubmitted(false);
  }

  function handleIsTyping() {
    toggleIsTyping(!isTyping);
  }

  function handleSubmitClick() {
    if((!isValidDescription)){
      noteRef.current.focus();
      setHasSubmitted(true);
    }
  }
  
  return (
    <>
      <div className={styles.subheaderContainer}>
        <header>
          <p>What's on your to-do list?</p>
        </header>
      </div>
        <div className={styles.newNoteContainer}>
          <form onSubmit={handleSubmit} className={styles.newNoteForm}>
            <input
              className={(!isValidDescription && isTyping && hasSubmitted)  || (description.length > maxDescriptionLength) ? styles.borderRed : undefined}
              placeholder="Create a new note (e.g., Pick up Torchy's Tacos)"
              type="text"
              ref={noteRef}
              value={description}
              onFocus={handleIsTyping}
              onBlur={handleIsTyping}
              onChange={onChangeDescription}
            />
            <button onClick={handleSubmitClick}>Create</button>
          </form>
        </div>
        <div className={styles.counterContainer}>
          {(!isTyping)
              ? undefined
              : <>
                  <p className={styles.counterText}>Characters:</p>
                  <span className={(!isValidDescription && hasSubmitted) || (description.length > maxDescriptionLength) ? styles.counterNumberRed : styles.counterNumber}>
                    {description.length}/{maxDescriptionLength}
                  </span>
                </>
          }
        </div>
    </>
  )
}