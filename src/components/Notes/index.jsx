import { Note } from '../Note';
import styles from './notes.module.css';

export function Notes({ notes, handleEditNote, handleDeleteNote, handleCompleteNote }) {
  const notesQuantity = notes.length;
  const completedNotes = notes.filter(note => note.isCompleted).length;
  const incompleteNotes = (notesQuantity-completedNotes);

  return (
    <div className={styles.notes}>
      <header className={styles.header}>
        <div>
          <p>All</p>
          <span>{notesQuantity}</span>
          <p className={styles.textIncomplete}>Incomplete</p>
          <span>{incompleteNotes}</span>
          <p className={styles.textCompleted}>Complete</p>
          <span>{completedNotes}</span>
        </div>
      </header>
      <div className={styles.list}>
        {notes
          .sort((a,b) => b.CreatedDate-a.CreatedDate)
          .map((note) => (
            <Note key={note.id} note={note} handleEditNote={handleEditNote} handleDeleteNote={handleDeleteNote} handleCompleteNote={handleCompleteNote} />
          ))}
      </div>
    </div>
  )
}