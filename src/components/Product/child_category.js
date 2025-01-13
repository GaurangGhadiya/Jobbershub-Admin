// SubCategoryTable.js
import {
    Box,
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Link,
    TablePagination,
  } from "@mui/material";
  import { useState } from "react";
  import { styled } from "@mui/material/styles";
  import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
  import api from "../../../utils/api";
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    '&.MuiTableCell-head': {
      backgroundColor: '#ccc',
      color: theme.palette.common.black,
      fontSize: 12,
      padding: 7,
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    '&.MuiTableCell-body': {
      fontSize: 12,
      padding: 7,
      borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
  }));
  
  const modalStyle = {
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
  
  const SubCategoryTable = ({ categories }) => {
    const [openModal, setOpenModal] = useState({ open: false, id: null, action: null });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleModalOpen = (id, action) => {
      setOpenModal({ open: true, id, action });
    };
  
    const handleModalClose = () => {
      setOpenModal({ open: false, id: null, action: null });
    };
  
    const handleOKButtonClick = async () => {
      const { id, action } = openModal;
      if (!id) return;
  
      const requestData = { id, action };
  
      try {
        const response = await api.post("/api/categories/update-status", requestData);
        if (response.data.status === 200) {
          location.reload();
        } else {
          console.error('Failed to update status.');
        }
      } catch (error) {
        console.error("Error:", error);
      }
  
      handleModalClose();
    };
  
    return (
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr No.</StyledTableCell>
              <StyledTableCell>Category Name</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Created Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((row, index) => (
                <TableRow key={row.id}>
                  <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                  <StyledTableCell>{row.category_name}</StyledTableCell>
                  <StyledTableCell>
                    <Link href="#" onClick={() => window.open(row.category_image, '_blank')}>
                      View Image
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>{new Date(row.created_on).toLocaleDateString()}</StyledTableCell>
                  <StyledTableCell style={{ color: row.status === 1 ? 'green' : 'red' }}>
                    {row.status === 1 ? 'Active' : 'Inactive'}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color={row.status === 1 ? "error" : "success"}
                      onClick={() => handleModalOpen(row.id, row.status === 1 ? 'deactivate' : 'activate')}
                    >
                      {row.status === 1 ? 'Deactivate' : 'Activate'}
                    </Button>
                  </StyledTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="error">No Records Found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
        <Modal open={openModal.open} onClose={handleModalClose}>
          <Box sx={modalStyle}>
            <HelpOutlineOutlinedIcon sx={{ fontSize: 40, marginLeft: 20 }} color="warning" />
            <Typography variant="h6">
              Are you sure you want to {openModal.action} this category?
            </Typography>
            <Button variant="contained" color="success" onClick={handleOKButtonClick} sx={{ marginTop: 2 }}>
              OK
            </Button>
          </Box>
        </Modal>
      </TableContainer>
    );
  };
  
  export default SubCategoryTable;
  