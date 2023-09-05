import styles from './note.module.css';
import { BsCheckCircleFill } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';
import { useState } from 'react';

export function Note({ note, handleEditNote, handleDeleteNote, handleCompleteNote }) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleEdit() {
    setIsEditing(!isEditing);
  }


  return (
    <div className={styles.note}>
      <div className={styles.checkContainer}>
        <button className={styles.checkButton} onClick={() => handleCompleteNote(note.id)}>
          {note.isCompleted ? <BsCheckCircleFill /> : <div />}
        </button>
      </div>
      <div className={styles.noteDescriptionContainer}>
        {
          (!isEditing)
            ? (<p className={note.isCompleted ? styles.textCompleted : undefined} onClick={!note.isCompleted ? toggleEdit : undefined}>{note.description}</p>)
            : (<input autoFocus type="text" defaultValue={note.description} onChange={(e) => handleEditNote(note.id,e.target.value)} onBlur={toggleEdit}/>)
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