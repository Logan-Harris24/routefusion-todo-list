import { useState, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BsCheckSquareFill } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';

export function RowMenu ({ row, handleEditNotes, handleCompleteNotes, handleDeleteNotes }) {
	const [menuAnchor, setMenuAnchor] = useState(null);
    
	function handleClick(e){
		setMenuAnchor(e.currentTarget);
	};

	function handleClose(){
		setMenuAnchor(null);
	};

    function handleComplete() {
        if (window.confirm(`Are you sure you want to toggle completion for the selected note?`)) {
            handleCompleteNotes([row]);
            handleClose();
        }
    };

    function handleDelete() {
        if (window.confirm(`Are you sure you want to delete the selected note?`)) {
            handleDeleteNotes([row]);
            handleClose();
        }
    };

	return (
		<div>
			<IconButton onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
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
                            <BsCheckSquareFill size={20} color='#26c77c'/>
                        </ListItemIcon>
                        {
                            (row.isCompleted ? 'Mark as incomplete' : 'Mark as complete')
                        }
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        <ListItemIcon>
                            <BsTrash3 size={20} color='#bb2d2d'/>
                        </ListItemIcon>
                        Delete
                    </MenuItem>
                </div>
			</Menu>
		</div>
	);
};