import styles from './note.module.css';
import 'react-tooltip/dist/react-tooltip.css'
import { BsCheckSquareFill } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';
import { useState, useRef } from 'react';
import { Tooltip } from 'react-tooltip'

export function Note({ note, handleEditNote, handleDeleteNote, handleCompleteNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isNoteOverflowed, setIsNoteOverflowed] = useState(false);
  const noteRef = useRef(null);
  let overflowBool = `${isNoteOverflowed}`;

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function handleHover(e){
    setIsNoteOverflowed((e.target.offsetWidth < e.target.scrollWidth));
  }


  return (
    <div className={styles.note}>
      <div className={styles.checkContainer}>
        <button className={styles.checkButton} onClick={() => handleCompleteNote(note.id)}>
          {note.isCompleted ? <BsCheckSquareFill /> : <div />}
        </button>
      </div>
      <div className={styles.noteDescriptionContainer}>
        {(!isEditing)
            ? <>
                <p ref={noteRef}
                  className={note.isCompleted ? styles.textCompleted : undefined}
                  onClick={!note.isCompleted ? toggleEdit : undefined}
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
            : <input autoFocus type="text" defaultValue={note.description} onChange={(e) => handleEditNote(note.id,e.target.value)} onBlur={toggleEdit}/>
        }
      </div>
      <div className={styles.deleteButtonContainer}>
        <button onClick={() => handleDeleteNote(note.id)}>
          <BsTrash3 size={20} />
        </button>
      </div>
    </div>
  )
}