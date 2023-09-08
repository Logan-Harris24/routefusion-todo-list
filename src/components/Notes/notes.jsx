import styles from './notes.module.css';
import { useState, useMemo, useCallback } from 'react';
import { DataTable } from "../DataTable/datatable";
import { BsTrash3 } from 'react-icons/bs';
import { differenceBy } from 'lodash';

export function Notes({ notes, handleEditNotes, handleSaveNotes, handleDeleteNotes, handleCompleteNotes }) {
  const notesQuantity = notes.length;
  const completedNotes = notes.filter(note => note.isCompleted).length;
  const incompleteNotes = (notesQuantity-completedNotes);
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [searchText, setSearchText] = useState('');
  
	const searchBarMemo = useMemo(() => {
		return (
			<input type='text' placeholder='Search By Description' onChange={e => setSearchText(e.target.value)}/>
		);
	}, [searchText]);
  
	const searchedNotes = notes.filter(note => note.description && note.description.toLowerCase().includes(searchText.toLowerCase()));
  
	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);
  
	const tableActions = useMemo(() => {
		function handleDelete() {
			if (window.confirm(`Are you sure you want to delete the selected notes?`)) {
				setToggleCleared(!toggleCleared);
        handleDeleteNotes(selectedRows);
			}
		};

		return (
      <div className={styles.deleteButtonContainer}>
        <button onClick={handleDelete}>
          <BsTrash3 size={20} />
        </button>
      </div>
		);
	}, [selectedRows, toggleCleared]);

  const notesColumns = [
    {id: 'description', name: 'Description', selector: row => row.description, sortable: true},
    {id: 'isCompleted', name: 'IsCompleted', selector: row => row.isCompleted ? 'Yes' : 'No', sortable: true},
    {id: 'createdDate', name: 'CreatedDate', selector: row => row.createdDate.toString(), sortable: true},
    {id: 'actions', name: '', button: true, cell: row => {
        return (
          <div className={styles.deleteButtonContainer}>
            <button onClick={() => handleDeleteNotes([row])}>
              <BsTrash3 size={20} />
            </button>
          </div>
        )
      }
    },
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
        contextActions={tableActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
      />
    </div>
  )
}