import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Link, IconButton, MenuItem  } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import UpdateAsset from '@/components/AssetManagement/update_asset_category'; 
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Cookies from "js-cookie";
import api from "../../../utils/api";
import { callAlert } from '../../../redux/actions/alert';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Transactions = ({ showServiceTrans }) => {
    const router = useRouter();
    const uid = Cookies.get('uid');
    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }


    const rowsPerPageOptions = [5, 10, 25];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openForm, setOpenForm] = useState(false);
    const dispatch = useDispatch();

    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 100));
        setPage(0);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#ccc',
          color: theme.palette.common.black,
          fontSize: 12,
          linHeight: 15,
          padding: 7,
          borderRight: "1px solid rgba(224, 224, 224, 1)"
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
            linHeight: 15,
            padding: 7,
            borderRight: "1px solid rgba(224, 224, 224, 1)"
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

      const handleOpenForm = () => setOpenForm(true);
      const handleCloseForm = () => setOpenForm(false);

      const [menuVisible, setMenuVisible] = useState(false);
      const [selectedRow, setSelectedRow] = useState(null);

      const handleMenuOpen = (data) => {
        setMenuVisible(true);
        setSelectedRow(data);
      };
    
      const handleMenuClose = () => {
        setMenuVisible(false);
        setSelectedRow(null);
      };

      const handleDelete = async (category_id, status) => {
        
        try {
          const formData = {
            updated_by: uid,
            category_id: category_id,
          };
          
          const response = await api.post('/api/employee/delete-asset-category', formData);
          console.log(response);
          if (response.status === 200) {
            dispatch(callAlert({ message: response.data.message, type: 'SUCCESS' }));
            router.push('/asset-category').then(() => {
                window.location.reload();
                });
            onClose();
          }
        } catch (error) {
          const errorMessage = error?.response?.data?.error || error.message;
          dispatch(callAlert({ message: errorMessage, type: 'FAILED' }));
        }
      };


    return (
        <main className="p-6 space-y-6">
            <Grid
                container
                spacing={4}
                
            >
                <Grid item={true} xs={12}   >

                    <TableContainer component={Paper} >    

                        <Divider />
                        <Table aria-label="Asset Details" sx={{ size: 2 }} mt={2}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} width="5%">Sr No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} width="90%">Category Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} width="5%">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showServiceTrans.length > 0 ? (rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row, index) => (

                                    <StyledTableRow 
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                        <StyledTableCell>{row.category_name}</StyledTableCell>
                                      
                                        <StyledTableCell sx={{ '& button': { m: 1 } }} style={{whiteSpace: 'nowrap' }} >

                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                                <IconButton 
                                                aria-controls={`user-menu-${row.id}`}
                                                aria-haspopup="true"
                                                onClick={() => handleMenuOpen(row)}>
                                                <MoreVertIcon />
                                                </IconButton>
                                                {menuVisible && selectedRow?.id === row.id && (
                                                <div
                                                    style={{
                                                    position: 'absolute',
                                                    top: '90%',
                                                    right: '30px',
                                                    background: '#fff',
                                                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                                    zIndex: 10,
                                                    minWidth: '150px',
                                                    }}
                                                >
                                                <MenuItem onClick={handleMenuClose}>Close</MenuItem>
                                                <MenuItem onClick={handleOpenForm}>Update</MenuItem>
                                                <MenuItem onClick={() => handleDelete(row.id, 0)}>Delete</MenuItem>
                                                </div>
                                                )}
                                            </div>
                                           
                                        </StyledTableCell>

                                    </StyledTableRow >
                                )) : (

                                    <TableRow>
                                        <TableCell colSpan={11} component="th" scope="row">
                                            <Typography color={'error'}>No Records Found.</Typography>
                                        </TableCell>
                                    </TableRow>

                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={{}}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>

                <Grid container>

                </Grid>
            </Grid>

            <UpdateAsset
                open={openForm} 
                onClose={handleCloseForm} 
                initialData={selectedRow}
            />
        </main>
    )
}
export default Transactions;