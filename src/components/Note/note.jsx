import styles from './note.module.css';
import 'react-tooltip/dist/react-tooltip.css'
import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import { Tooltip } from 'react-tooltip'
import config from '../../../config.js';

const minDescriptionLength = config.minDescriptionLength;
const maxDescriptionLength = config.maxDescriptionLength;

export function Note({ note, handleEditNote }) {
  const [description, setDescription] = useState(note.description);
  const [isEditing, setIsEditing] = useState(false);
  const [isNoteOverflowed, setIsNoteOverflowed] = useState(false);
  const noteRef = useRef(null);
    
  let charsRemaining = (maxDescriptionLength-description.length)
  let isValidDescription = ((charsRemaining) >= (minDescriptionLength-1) && (charsRemaining) < maxDescriptionLength)
  
  function toggleEdit() {
    setIsEditing(!isEditing);
    setDescription(note.description);
  }
  
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    if(!isValidDescription){ 
      toast.error(`Note must be non-empty, between ${minDescriptionLength} and ${maxDescriptionLength} characters.`);
      toggleEdit();
    }
    else{
      if (description && description !== note.description){
        handleEditNote(note.id,description.trim());
        toast.success(`Note edited successfully!`);
      }
    }
    if((description.length <= maxDescriptionLength) || (!isValidDescription) || (description === note.description)){
      toggleEdit();
    }
  }

  function handleHover(e){
    setIsNoteOverflowed((e.target.offsetWidth < e.target.scrollWidth));
  }

  function handleKeyDown(e) {
    if(noteRef.current && e.key === "Escape"){
      noteRef.current.blur();
    }
  }

  return (
    <>
      <div className={styles.noteDescriptionContainer}>
        {(!isEditing)
          ? <>
              <p 
                className={note.isCompleted ? styles.textCompleted : undefined}
                onMouseOver={handleHover}
                onClick={note.isCompleted ? undefined : toggleEdit}
                data-testid="noteDescription"
                data-tooltip-id="noteTooltip"
                data-tooltip-content={note.description}
                data-tooltip-place="bottom-start"
                data-tooltip-hidden={!isNoteOverflowed}
              >
                {note.description}
              </p>
              <Tooltip id="noteTooltip"/>
            </>
          : <form onSubmit={handleSubmit}>
              <input ref={noteRef} data-testid="noteInput" autoFocus type="text" value={description} onChange={onChangeDescription} onBlur={handleSubmit} onKeyDown={handleKeyDown}/>
            </form>
        }
      </div>
    </>
  )
}