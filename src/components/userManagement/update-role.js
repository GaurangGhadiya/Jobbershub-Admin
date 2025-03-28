// components/AddVendorForm.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import api from '../../../utils/api'; // Adjust the import path as necessary
import { callAlert } from '../../../redux/actions/alert';
import { useDispatch } from 'react-redux';

const AddVendorForm = ({ open, onClose, initialData }) => {
    const [formData, setFormData] = useState({
        role_name: '',
        
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (initialData) {
            setFormData({
                department_id: initialData.id,
                department_name: initialData.department_name,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post('/api/employee/update-role', formData);
            if (response) {
                alert('Updated successfully');
                router.push('/role').then(() => {
                    window.location.reload();
                });
              onClose(); 
            } 
        } catch (error) {
            dispatch(callAlert({ message: error?.response?.data?.error || error.message, type: 'FAILED' }));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Update Role</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        placeholder="Role Name"
                        name="role_name"
                        value={formData.role_name}
                        onChange={handleChange}
                        fullWidth
                    />
                   
                </Box>
            </DialogContent>
            <DialogActions sx={{padding: '25px'}}>
                <Button onClick={onClose} variant="contained" color="error" size="small">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" size="small" color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddVendorForm;
