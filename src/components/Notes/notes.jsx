import styles from './notes.module.css';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { BsCheckSquareFill } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';
import { DataTable } from "../DataTable/datatable";
import { Note } from "../Note/note";
import { RowMenu } from '../DataTable/RowMenu/rowmenu';
import { SearchBar } from '../DataTable/SearchBar/searchbar';
import moment from 'moment/moment';
import { modal } from '../ConfirmModal/confirmmodal';
import config from '../../../config.js';

export function Notes({ notes, handleEditNote, handleDeleteNotes, handleCompleteNotes, handleToggleCompleteNotes}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const totalNotes = notes.length;
  const totalNotesComplete = notes.filter(note => note.isCompleted).length;
  const totalNotesIncomplete = (totalNotes-totalNotesComplete);

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);
  
  function handleFilter(e) {
    let filterId = e.currentTarget.id;
    let notesFiltered = (filterId !== config.filterAll)
      ? (filterId === config.filterComplete)
        ? notes.filter(note => note.isCompleted)
        : notes.filter(note => !note.isCompleted)
      : notes;
    setFilteredNotes(notesFiltered);

    const filterElements = document.querySelectorAll(`#${config.filterContainer} *`);
    filterElements.forEach((element) => {element.classList.remove(styles.headerSelected)});
    e.currentTarget.className = styles.headerSelected;
  };

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
  const notesSearched = notes.filter(note => (filteredNotes.includes(note)) && (note.description && note.description.toLowerCase().includes(searchText.toLowerCase())));
  
  const tableActionsMemo = useMemo(() => {
    function handleComplete() {
      handleCompleteNotes(selectedRows);
      setToggleCleared(!toggleCleared);
    };

    function handleDelete() {
        handleDeleteNotes(selectedRows);
        setToggleCleared(!toggleCleared);
    };

    return (
      <div className={styles.contextContainer}>
        <div className={styles.completeActionContainer}
          onClick={() => {modal(`Are you sure you want to complete all selected notes?`, () => {handleComplete()})}}>
          <BsCheckSquareFill className={styles.completeActionIcon}/> <span>Mark as completed</span>
        </div>
        <div className={styles.deleteActionContainer}
          onClick={() => {modal(`Are you sure you want to delete all selected notes?`, () => {handleDelete()})}}>
          <BsTrash3 className={styles.deleteActionIcon}/> <span>Delete</span>
        </div>
      </div>
    );
  }, [selectedRows, toggleCleared]);

  function getFormattedDate(note){
    var date = moment(note.createdDate);
    var defaultFormat = 'ddd, MMM DD yyyy';
    return date.format(defaultFormat);
  };

  const notesColumns = [
    {id: 'description', name: 'Description', sortable: true, width: "575px", selector: note => note.description, cell: note => <Note note={note} handleEditNote={handleEditNote} />},
    {id: 'isCompleted', name: 'Complete?', sortable: true, width: "125px", selector: note => note.isCompleted.toString(), center: true,
      cell: note =>
        (note.isCompleted)
        ? <div className={styles.completeRowIconContainer}>
            <BsCheckSquareFill size={15} color='#26c77c'/>
          </div>
        : undefined},
    {id: 'createdDate', name: 'CreatedDate', sortable: true, width: "160px", selector: note => moment(note.createdDate), format: note => getFormattedDate(note), style: {cursor: 'default'}},
    {id: 'actions', name: '', button: true, width: "70px", cell: note => <RowMenu note={note} handleDeleteNotes={handleDeleteNotes} handleToggleCompleteNotes={handleToggleCompleteNotes}/>},
  ];

  return (
    <div className={styles.notes}>
      <header data-testid="notesHeader" className={styles.header}>
        <div id={config.filterContainer}>
          <div id={config.filterAll} className={styles.headerSelected} onClick={handleFilter}>
            <p>All</p>
            <span>{totalNotes}</span>
          </div>
          <div id={config.filterIncomplete} onClick={handleFilter}>
            <p className={styles.textIncomplete}>Incomplete</p>
            <span>{totalNotesIncomplete}</span>
          </div>
          <div id={config.filterComplete} onClick={handleFilter}>
            <p className={styles.textComplete}>Complete</p>
            <span>{totalNotesComplete}</span>
          </div>
        </div>
      </header>
      <DataTable
        title="To-Do List"
        columns={notesColumns}
        data={
          (!searchText)
            ? (filteredNotes)
              ? notes.filter(note =>
                  (filteredNotes.includes(note))
                  || (!filteredNotes[0].isCompleted && ((note.createdDate) > (new Date(Math.max(...filteredNotes.map(element => { return new Date(element.createdDate); }))))))
                )
              : notes
            : notesSearched
        }
        fixedHeader
        fixedHeaderScrollHeight="472px"
        subHeader
        subHeaderComponent={searchBarMemo}
        subHeaderAlign="right"
        contextActions={tableActionsMemo}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        contextMessage={{ singular: 'note', plural: 'notes', message: 'selected' }}
      />
    </div>
  )
}