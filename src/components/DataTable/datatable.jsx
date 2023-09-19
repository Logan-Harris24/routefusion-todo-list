import React from 'react';
import DataTableBase, { createTheme } from 'react-data-table-component';

createTheme('customTheme', {
  text: {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    disabled: 'rgba(0,0,0,.12)',
  },
  background: {
      default: '#1f3445',
  },
  context: {
      background: '#1E90FF',
      text: '#FFFFFF',
  },
  button: {
    default: '#FFFFFF',
    focus: '#1f3445',
    hover: 'rgba(255, 255, 255, .12)',
    disabled: 'rgba(255, 255, 255, .18)',
  },
  highlightOnHover: {
    default: '#5c5c5ca9',
    text: '#FFFFFF',
  },
  striped: {
    default: '#283e50',
    text: '#FFFFFF',
  },
});

const customStyles = {
  header: {
    style: {
      height: '10px'
    }
  },
	head: {
		style: {
			fontSize: '14px',
			fontWeight: 600,
		},
	},
	headRow: {
		style: {
      borderBottomWidth: '1px',
      borderBottomColor: '#6e6e6e'
		},
  },
  rows: {
    highlightOnHoverStyle: {
      borderRadius: '50px',
    },
		denseStyle: {
			minHeight: '44px',
		},
  }
};

export function DataTable(props) {
  return (
    <DataTableBase
        theme="customTheme"
        customStyles={customStyles}
        striped
        dense
        highlightOnHover
        selectableRows
        selectableRowsVisibleOnly
        selectableRowsComponentProps={{ type: 'radio' }}
        pagination
        paginationRowsPerPageOptions={[10,25,50,100,250]}
        noDataComponent={<div style={{ padding: '24px' }}>No records to display.</div>}
        {...props}
    />
  );
}
