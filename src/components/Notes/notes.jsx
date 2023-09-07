import { Note } from '../Note/note';
import styles from './notes.module.css';
import { DataTable } from "../DataTable/datatable";

export function Notes({ notes, handleEditNote, handleDeleteNote, handleCompleteNote }) {
  const notesQuantity = notes.length;
  const completedNotes = notes.filter(note => note.isCompleted).length;
  const incompleteNotes = (notesQuantity-completedNotes);

  const ExpandedComponent = ({notes}) => <pre>{JSON.stringify(notes, null, 2)}</pre>;
  const notesColumns = [
    {name: 'Description', selector: row => row.description, sortable: true},
    {name: 'CreatedDate', selector: row => row.createdDate, sortable: true},
  ];

  return (
    <div className={styles.notes}>
      <DataTable
        columns={notesColumns}
        data={notes}
        selectableRows
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  )
}