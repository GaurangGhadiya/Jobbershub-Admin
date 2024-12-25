import { Box, Button, Divider, TextField, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, IconButton, MenuItem, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import UpdateCompany from '@/components/userManagement/update-company'; 
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.MuiTableCell-head`]: {
        backgroundColor: '#ccc',
        color: theme.palette.common.black,
        fontSize: 12,
        padding: 7,
        borderRight: "1px solid rgba(224, 224, 224, 1)"
    },
    [`&.MuiTableCell-body`]: {
        fontSize: 12,
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

const Transactions = ({ showServiceTrans = [] }) => {
    const uid = Cookies.get('uid');
    const dispatch = useDispatch();
    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openForm, setOpenForm] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null); 
    const [menuVisible, setMenuVisible] = useState(false);

    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 100));
        setPage(0);
    };

    const handleOpenForm = (row) => {
        setSelectedRow(row);
        setOpenForm(true);
    };
    const handleCloseForm = () => setOpenForm(false);
    

    const handleMenuOpen = (data) => {
        setMenuVisible(true);
        setSelectedRow(data);
    };

    const handleMenuClose = () => {
        setMenuVisible(false);
        setSelectedRow(null);
    };

    const handleDelete = async(row)=>{
        try {
            const formData = {
                company_id: row.id,
                updated_by: uid
            }
            const response = await api.post('/api/employee/delete-company', formData);
            if (response) {
                alert('Deleted successfully');
                router.push('/company').then(() => {
                    window.location.reload();
                    });
               onClose(); 
            } 
        } catch (error) {
            dispatch(callAlert({ message: error?.response?.data?.error || error.message, type: 'FAILED' }));
        }
    }

    return (
        <main className="p-6 space-y-6">
            <Grid container spacing={4} >
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Divider />
                        <Table aria-label="Company Details" mt={2}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell width="5%">Sr No.</StyledTableCell>
                                    <StyledTableCell width="90%">Company Name</StyledTableCell>
                                    <StyledTableCell width="5%">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.length > 0 ? (
                                    (rows > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                    ).map((row, index) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                            <StyledTableCell>{row.company_name}</StyledTableCell>
                                            <StyledTableCell>
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
                                                    <MenuItem onClick={() => handleOpenForm(row)}>Update</MenuItem>
                                                    <MenuItem onClick={() => handleDelete(row)}>Delete</MenuItem>
                                                    </div>
                                                    )}
                                                </div>
                                                
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3}>
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
            </Grid>
            <UpdateCompany open={openForm} onClose={handleCloseForm} initialData={selectedRow} />
        </main>
    );
};

export default Transactions;
