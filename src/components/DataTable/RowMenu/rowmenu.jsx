import { useState } from 'react';
import styles from './rowmenu.module.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BsCheckSquareFill } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';

export function RowMenu ({ note, handleCompleteNotes, focusNote, handleDeleteNotes }) {
	const [menuAnchor, setMenuAnchor] = useState(null);
    
	function handleClick(e){
		setMenuAnchor(e.currentTarget);
	};

	function handleClose(){
		setMenuAnchor(null);
	};

    function handleComplete() {
        if (window.confirm(`Are you sure you want to toggle completion status for the selected note?`)) {
            handleClose();
            handleCompleteNotes([note]);
        }
    };

    function handleEdit() {
        if (window.confirm(`Are you sure you want to edit the selected note?`)) {
            handleClose();
            focusNote(note);
        }
    };

    function handleDelete() {
        if (window.confirm(`Are you sure you want to delete the selected note?`)) {
            handleClose();
            handleDeleteNotes([note]);
        }
    };

	return (
		<>
			<div className={styles.rowIconContainer} onClick={handleClick}>
				<MoreVertIcon />
			</div>
			<Menu
				id="menu"
				keepMounted
				anchorOrigin={{vertical: 'top', horizontal: 'right'}}
				anchorEl={menuAnchor}
				open={Boolean(menuAnchor)}
				onClose={handleClose}
			> 
                <div>
                    <MenuItem onClick={handleComplete}>
                        <ListItemIcon>
                            <BsCheckSquareFill className={styles.iconComplete}/>
                        </ListItemIcon>
                        {
                            (note.isCompleted ? 'Mark as uncompleted' : 'Mark as completed')
                        }
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
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