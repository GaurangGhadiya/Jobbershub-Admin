import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import api from '../../../utils/api';
import { callAlert } from '../../../redux/actions/alert';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

const AddVendorForm = ({ open, onClose, initialData }) => {
    const router = useRouter();
    const uid = Cookies.get('uid');
    const [formData, setFormData] = useState({
        updated_by: uid,
        category_id: '',
        category_name: '',
    });

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
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Update asset category</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        placeholder="Category Name"
                        name="category_name"
                        value={formData.category_name}
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
