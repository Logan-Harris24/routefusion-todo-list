import styles from './note.module.css';
import 'react-tooltip/dist/react-tooltip.css'
import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import { Tooltip } from 'react-tooltip'
import config from '../../../config.js';
import useDynamicRefs from 'use-dynamic-refs';

const minDescriptionLength = config.minDescriptionLength;
const maxDescriptionLength = config.maxDescriptionLength;

export function Note({ note, handleEditNote }) {
  const [description, setDescription] = useState(note.description);
  const [isEditing, setIsEditing] = useState(false);
  const [isNoteOverflowed, setIsNoteOverflowed] = useState(false);
  const [getRef, setRef] = useDynamicRefs();
  const [isFocused, toggleIsFocused] = useState(false);
    
  let charsRemaining = (maxDescriptionLength-description.length)
  let isValidDescription = ((charsRemaining) >= (minDescriptionLength-1) && (charsRemaining) < maxDescriptionLength)
  
  function toggleEdit() {
    console.log(isEditing);
    setIsEditing(!isEditing);
    setDescription(note.description);
  }

  function focusNote() {
    toggleIsFocused(!isFocused);
  }
  
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!isValidDescription){ 
      toast.error(`Note must be between ${minDescriptionLength} and ${maxDescriptionLength} characters.`);
      toggleEdit();
    }
    else{
      if (description && description !== note.description){
        handleEditNote(note.id,description.trim());
        toast.success(`Note edited successfully!`);
      }
    }
    if(!isFocused && (description.length <= maxDescriptionLength)){
      toggleEdit();
    }
  }

  function handleHover(e){
    setIsNoteOverflowed((e.target.offsetWidth < e.target.scrollWidth));
  }


  return (
    <>
      <div ref={getRef(note.id)} className={styles.noteDescriptionContainer} onClick={toggleEdit} tabIndex="0" onFocus={focusNote}>
        {(!isEditing)
            ? <>
                <p 
                  className={note.isComplete ? styles.textCompleted : undefined}
                  onMouseOver={handleHover}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={note.description}
                  data-tooltip-place="bottom-start"
                  data-tooltip-hidden={!isNoteOverflowed}
                >
                  {note.description}
                </p>
                <Tooltip id="my-tooltip"/>
              </>
            : <form onSubmit={handleSubmit}>
                <input autoFocus type="text" value={description} onChange={onChangeDescription} onBlur={handleSubmit}/>
              </form>
        }
      </div>
    </>
  )
}