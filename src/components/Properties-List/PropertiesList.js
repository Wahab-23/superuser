import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


import { Link } from 'react-router-dom';

export const PropertiesList = ({ handleLoading }) => {
    const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get('https://superuser.jsons.ae/api/li6zykrxsd/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const columns = [
    { field: 'p_id', headerName: 'ID', width: 90 },
    { field: 'Title', headerName: 'Title', width: 200 },
    { field: 'p_Group', headerName: 'Group', width: 150 },
    { field: 'Price', headerName: 'Price', width: 150 },
    { field: 'Handover_Date', headerName: 'Handover Date', width: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 50,
      renderCell: (params) => (
        <Link to={`/edit-property/${params.row.p_id}`} style={{color: '#1976d2'}}>
          <EditIcon />
        </Link>
      ),
    },
  ];

  const getRowId = (row) => row.p_id;

  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            },
            '& .MuiLink-root': {
              textDecoration: 'none',
              color: theme => theme.palette.primary.main,
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  });

  return (
    <div>
        <ThemeProvider theme={theme}>
        <div style={{ height: '80vh', width: '100%', maxWidth: '810px' }}>
            <DataGrid
            rows={properties}
            columns={columns}
            pageSize={5}
            getRowId={getRowId}
            />
        </div>
        <Fab color="primary" aria-label="add" style={{float: 'right'}}>
            <Link to={'/add-new-property'} style={{textDecoration: 'none', color: 'white'}}>
                <AddIcon />
            </Link>
        </Fab>
        </ThemeProvider>
    </div>
  )
}
