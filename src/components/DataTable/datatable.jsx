import React from 'react';
import DataTableBase, { createTheme } from 'react-data-table-component';
import Checkbox from '@mui/material/Checkbox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
};

createTheme('customTheme', {
    /*text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },*/
    context: {
        background: '#1E90FF',
        text: '#FFFFFF',
    },
  }, 'dark');

export function DataTable(props) {
    return (
        <DataTableBase
            theme="customTheme"
            dense
            sortIcon={sortIcon}
            highlightOnHover
            pointerOnHover
            selectableRows
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={selectProps}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            {...props}
        />
    );
}
