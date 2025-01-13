// components/AddVendorForm.js
import React, { useState } from 'react';
import { Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import api from '../../../utils/api'; // Adjust the import path as necessary
import { callAlert } from '../../../redux/actions/alert';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const AddVendorForm = ({ open, onClose }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
  company_name: '',
        service_url: '',
       
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post('/api/employee/add-qualification', formData);
            if (response) {
                alert('Added successfully');
                router.push('/qualification').then(() => {
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
            <DialogTitle>Add New Qualification</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        name="qualification_name"
                        value={formData.qualification_name}
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
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddVendorForm;
