import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle, TableContainer,Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import api from '../../../utils/api';
import { callAlert } from '../../../redux/actions/alert';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

const AddVendorForm = ({ open, onClose, initialData }) => {
    const router = useRouter();
    const uid = Cookies.get('uid');
    const [formData, setFormData] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        if (initialData) {
            setFormData({
                updated_by: uid,
                category_id: initialData.id,
                category_name: initialData.category_name,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post('/api/employee/update-asset-category', formData);
            if (response.status === 201) {
                alert('Updated successfully');
                router.push('/asset-category').then(() => {
                    window.location.reload();
                    });
                onClose();
            } 
        } catch (error) {
            dispatch(callAlert({ message: error?.response?.data?.error || error.message, type: 'FAILED' }));
        }
    };

    return (
        <></>
        // <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        //     <DialogTitle>Update asset category</DialogTitle>
        //     <DialogContent>
        //         <TableContainer component={Paper} className="table_container">
        //             <Table stickyHeader>
        //                 <TableHead>
        //                     <TableRow>
        //                         <TableCell>Sl No.</TableCell>
        //                         <TableCell>Table Permission</TableCell>
        //                         <TableCell>Select</TableCell>
        //                         <TableCell>Special Customize Filter Permission</TableCell>
        //                         <TableCell>Edit</TableCell>
        //                     </TableRow>
        //                 </TableHead>
        //                 <TableBody>
        //                 {menus.map((menu, index) => (
        //                     <TableRow key={index}>
        //                     <TableCell>{index + 1}</TableCell>
        //                     <TableCell>{menu.menu_name}{menu.parent_menu? (`(${menu.parent_menu})`): ''}</TableCell>
        //                     <TableCell>
        //                         <FormControlLabel
        //                         control={<Checkbox checked={menu.list ? menu.list: listchecked[menu.id]} onChange={(event) => listhandleChange(event, menu.id, menu.menu_url)} />}
        //                         />
        //                     </TableCell>
        //                     <TableCell>
        //                         {menu.table_name?(
        //                             <>
        //                             {menu.columns? (
        //                                 <Button color="primary" size="small" variant="contained"><VisibilityIcon />View</Button>
        //                             ): (
        //                                 <Button color="success" size="small" variant="contained">Select</Button>
                                        
        //                             )}
        //                             </>
        //                         ):('')}
        //                     </TableCell>
        //                     <TableCell>
        //                         {menu.table_name?(
        //                             <>
        //                             {menu.filters? (
        //                                 <Button color="primary" size="small" variant="contained"><VisibilityIcon />View</Button>
        //                             ): (
        //                                 <Button color="success" size="small" variant="contained">Select</Button>
        //                             )}
        //                             </>
        //                         ):('')}
        //                     </TableCell>
        //                     <TableCell>
        //                         <FormControlLabel
        //                         control={<Checkbox checked={menu.view ? menu.view: viewchecked[menu.id]} onChange={(event) => viewhandleChange(event, menu.id, menu.menu_url)} />}
        //                         />
        //                     </TableCell>
        //                     <TableCell>
        //                         <FormControlLabel
        //                         control={<Checkbox checked={menu.create ? menu.edit: editchecked[menu.id]} onChange={(event) => edithandleChange(event, menu.id, menu.menu_url)} />}
        //                         />
        //                     </TableCell>
        //                     <TableCell>
        //                         <FormControlLabel
        //                         control={<Checkbox checked={menu.edit ? menu.edit: editchecked[menu.id]} onChange={(event) => edithandleChange(event, menu.id, menu.menu_url)} />}
        //                         />
        //                     </TableCell>
        //                     <TableCell>
        //                         <FormControlLabel
        //                         control={<Checkbox checked={menu.delete ? menu.delete: deletechecked[menu.id]} onChange={(event) => deletehandleChange(event, menu.id, menu.menu_url)} />}
        //                         />
        //                     </TableCell>
        //                     </TableRow>
        //                 ))}
        //                 </TableBody>
        //             </Table>
        //         </TableContainer>
        //     </DialogContent>
        //     <DialogActions sx={{padding: '25px'}}>
        //         <Button onClick={onClose} variant="contained" color="error" size="small">
        //             Cancel
        //         </Button>
        //         <Button onClick={handleSubmit} variant="contained" size="small" color="primary">
        //             Update
        //         </Button>
        //     </DialogActions>
        // </Dialog>
    );
};

export default AddVendorForm;
