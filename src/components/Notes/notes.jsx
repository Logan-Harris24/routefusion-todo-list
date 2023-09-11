import styles from './notes.module.css';
import { useState, useMemo, useCallback, useRef } from 'react';
import { BsCheckSquareFill } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';
import { DataTable } from "../DataTable/datatable";
import { Note } from "../Note/note";
import { RowMenu } from '../DataTable/RowMenu/rowmenu';
import { SearchBar } from '../DataTable/SearchBar/searchbar';
import moment from 'moment/moment';

export function Notes({ notes, handleCompleteNotes, handleEditNote, handleDeleteNotes }) {
  const notesQuantity = notes.length;
  const completedNotes = notes.filter(note => note.isCompleted).length;
  const incompleteNotes = (notesQuantity-completedNotes);
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [searchText, setSearchText] = useState('');

	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

  function handleSearch(e){
    setSearchText(e.target.value)
  }

	const searchBarMemo = useMemo(() => {
		const handleClear = () => {
			if (searchText) {
				setSearchText('');
			}
		};

		return (
      <SearchBar searchText={searchText} onSearch={handleSearch} onClear={handleClear}/>
		);
	}, [searchText]);
  
	const searchedNotes = notes.filter(note => note.description && note.description.toLowerCase().includes(searchText.toLowerCase()));
  
	const tableActionsMemo = useMemo(() => {
		function handleComplete() {
			if (window.confirm(`Are you sure you want to toggle the completion status for the selected notes?`)) {
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
      <div className={styles.contextContainer}>
        <div className={styles.completeActionContainer} onClick={handleComplete}>
          <BsCheckSquareFill className={styles.completeActionIcon}/> <span>Toggle Completion</span>
        </div>
        <div className={styles.deleteActionContainer} onClick={handleDelete}>
          <BsTrash3 className={styles.deleteActionIcon}/> <span>Delete</span>
        </div>
      </div>
		);
	}, [selectedRows, toggleCleared]);

  const getFormattedDate = (note) => {
    var now = moment();
    var date = moment(note.createdDate);
    var defaultFormat = 'ddd, MMM DD';
    var yearFormat = 'yyyy'

    var dateFormat = (now.year === date.year) ? defaultFormat : (`${defaultFormat}, ${yearFormat}`);
    return date.format(dateFormat);
  };

  const notesColumns = [
    {id: 'description', name: 'Description', sortable: true, selector: note => note.description, cell: note => <Note note={note} handleEditNote={handleEditNote} />},
    {id: 'isCompleted', name: 'Completed?', sortable: true, selector: note => note.isCompleted.toString(), center: true,
      cell: note =>
        (note.isCompleted)
        ? <div className={styles.completeButtonContainer}>
            <BsCheckSquareFill color='#26c77c'/>
          </div>
        : undefined},
    {id: 'createdDate', name: 'CreatedDate', sortable: true, selector: note => moment(note.createdDate), format: note => getFormattedDate(note), style: {cursor: 'default'}},
    {id: 'actions', name: '', button: true, cell: note => <RowMenu note={note} handleCompleteNotes={handleCompleteNotes} handleDeleteNotes={handleDeleteNotes}/>},
  ];

  return (
    <div className={styles.notes}>
      <header className={styles.header}>
        <div>
          <p>All</p>
          <span>{notesQuantity}</span>
          <p className={styles.textIncomplete}>Incomplete</p>
          <span>{incompleteNotes}</span>
          <p className={styles.textCompleted}>Completed</p>
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
        contextMessage={{ singular: 'note', plural: 'notes', message: 'selected' }}
      />
    </div>
  )
}