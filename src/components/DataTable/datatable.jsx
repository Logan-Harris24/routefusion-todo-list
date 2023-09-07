import React from 'react';
import DataTableBase from 'react-data-table-component';
import Checkbox from '@mui/material/Checkbox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

export function DataTable(props) {
    return (
        <DataTableBase
            pagination
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={selectProps}
            sortIcon={sortIcon}
            dense
            {...props}
        />
    );
}
