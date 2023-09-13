import { useState } from 'react';
import styles from './rowmenu.module.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BsCheckSquareFill } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';

export function RowMenu ({ note, handleDeleteNotes, handleToggleCompleteNotes }) {
  const [menuAnchor, setMenuAnchor] = useState(null);
    
  function handleClick(e){
    setMenuAnchor(e.currentTarget);
  };

  function handleClose(){
    setMenuAnchor(null);
  };

  function handleComplete() {
    handleClose();
    handleToggleCompleteNotes([note]);
  };

  function handleDelete() {
    handleClose();
    handleDeleteNotes([note]);
  };

  return (
    <>
      <div className={styles.rowIconContainer} onClick={handleClick}>
        <MoreVertIcon />
      </div>
      <Menu id="menu" keepMounted anchorOrigin={{vertical: 'top', horizontal: 'right'}} anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleClose}> 
        <div>
          <MenuItem data-testid="rowMenuComplete" onClick={handleComplete}>
            <ListItemIcon>
              <BsCheckSquareFill className={styles.iconComplete}/>
            </ListItemIcon>
            {
              (note.isCompleted ? 'Mark as uncompleted' : 'Mark as completed')
            }
          </MenuItem>
          <MenuItem data-testid="rowMenuDelete" onClick={handleDelete}>
            <ListItemIcon>
              <BsTrash3 className={styles.iconDelete}/>
            </ListItemIcon>
            Delete
          </MenuItem>
        </div>
      </Menu>
    </>
  );
};