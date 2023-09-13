import React from 'react';
import DataTableBase, { createTheme } from 'react-data-table-component';
import Checkbox from '@mui/material/Checkbox';
import { createTheme as createMuiTheme, ThemeProvider, styled } from '@mui/material/styles';

const paginationComponentOptions = { selectAllRowsItem: true, selectAllRowsItemText: 'All' };
const checkboxTheme = createMuiTheme({ status: { primary: '#1E90FF', }, });
const checkboxProps = { indeterminate: isIndeterminate => isIndeterminate };

const CustomCheckboxComponent = styled(Checkbox)(({ theme }) => ({
    color: theme.status.primary,
    '&.Mui-checked': {
      color: theme.status.primary,
    },
  }));

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
      default: '#525252',
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
    rows: {
      highlightOnHoverStyle: {
        borderRadius: '50px',
      },
    }
  };

export function DataTable(props) {
    return (
        <ThemeProvider theme={checkboxTheme}>
          <DataTableBase
              theme="customTheme"
              customStyles={customStyles}
              striped
              dense
              highlightOnHover
              selectableRows
              selectableRowsComponent={CustomCheckboxComponent}
              selectableRowsComponentProps={checkboxProps}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              paginationRowsPerPageOptions={[10,25,50]}
              {...props}
          />
        </ThemeProvider>
    );
}
