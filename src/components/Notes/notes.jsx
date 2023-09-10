import styles from './notes.module.css';
import { useState, useMemo, useCallback, useRef } from 'react';
import { BsCheckSquareFill } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';
import { DataTable } from "../DataTable/datatable";
import { Note } from "../Note/note";
import { RowMenu } from '../DataTable/RowMenu/rowmenu';
import useDynamicRefs from 'use-dynamic-refs';

export function Notes({ notes, handleCompleteNotes, handleEditNote, handleDeleteNotes }) {
  const notesQuantity = notes.length;
  const completedNotes = notes.filter(note => note.isComplete).length;
  const incompleteNotes = (notesQuantity-completedNotes);
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [searchText, setSearchText] = useState('');
  const [getRef, setRef] = useDynamicRefs();
  
  function focusNote(note){
    let noteRef = getRef(note.id);
    noteRef.current.click();
    noteRef.current.focus();
  }

	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

	const searchBarMemo = useMemo(() => {
		return (
			<input type='text' placeholder='Search By Description' onChange={e => setSearchText(e.target.value)}/>
		);
	}, [searchText]);
  
	const searchedNotes = notes.filter(note => note.description && note.description.toLowerCase().includes(searchText.toLowerCase()));
  
	const tableActionsMemo = useMemo(() => {
		function handleComplete() {
			if (window.confirm(`Are you sure you want to toggle completion for the selected notes?`)) {
        handleCompleteNotes(selectedRows);
				setToggleCleared(!toggleCleared);
			}
		};

		function handleDelete() {
			if (window.confirm(`Are you sure you want to delete the selected notes?`)) {
        handleDeleteNotes(selectedRows);
				setToggleCleared(!toggleCleared);
			}
		};

		return (
      <>
        <div className={styles.completeButtonContainer}>
          <button onClick={handleComplete}>
            <BsCheckSquareFill/>
          </button>
        </div>
        <div className={styles.deleteButtonContainer}>
          <button onClick={handleDelete}>
            <BsTrash3/>
          </button>
        </div>
      </>
		);
	}, [selectedRows, toggleCleared]);

  const notesColumns = [
    {id: 'description', name: 'Description', sortable: true, selector: note => note.description, cell: note => <Note note={note} noteRef={setRef(note.id)} handleEditNote={handleEditNote} />},
    {id: 'isComplete', name: 'IsComplete', sortable: true, selector: note => note.isComplete.toString(), center: true,
      cell: note =>
        (note.isComplete)
        ? <div className={styles.completeButtonContainer}>
            <BsCheckSquareFill color='#26c77c'/>
          </div>
        : undefined},
    {id: 'createdDate', name: 'CreatedDate', sortable: true, selector: note => note.createdDate.toString()},
    {id: 'actions', name: '', button: true, cell: note => <RowMenu note={note} handleCompleteNotes={handleCompleteNotes} focusNote={focusNote} handleDeleteNotes={handleDeleteNotes}/>},
  ];

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
      <DataTable
        title="To-Do List"
        columns={notesColumns}
        data={(!searchText) ? notes : searchedNotes}
        fixedHeader
        fixedHeaderScrollHeight="489px"
        subHeader
        subHeaderComponent={searchBarMemo}
        contextActions={tableActionsMemo}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
      />
    </div>
  )
}