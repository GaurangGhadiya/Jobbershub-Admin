// components/AddVendorForm.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import api from '../../../utils/api'; // Adjust the import path as necessary
import { callAlert } from '../../../redux/actions/alert';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const AddVendorForm = ({ open, onClose, initialData }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        company_name: '',
        
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (initialData) {
            setFormData({
                company_id: initialData.id,
                company_name: initialData.company_name,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post('/api/employee/update-company', formData);
            if (response) {
                alert('Updated successfully');
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
            <DialogTitle>Update Company</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        placeholder="Company Name"
                        name="company_name"
                        value={formData.company_name}
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
                    Update Company
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddVendorForm;
