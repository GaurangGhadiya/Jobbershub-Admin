import React, { useState } from 'react';
import {
    Button,
    TextField,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import api from '../../../utils/api';
import { callAlert } from '../../../redux/actions/alert';
import { useDispatch } from 'react-redux';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 10,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 10,
});

const AddVendorForm = ({ open, onClose }) => {
    const [title, setTitle] = useState('');
    const [range, setRange] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [leadCategory, setLeadCategory] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        console.log('Add Category button clicked');

        // Check if fields are filled
        if (!selectedFile || !title || !description || !range) {
            console.log('Required fields are missing');
            dispatch(callAlert({ message: 'Please fill in all required fields.', type: 'FAILED' }));
            return;
        }

        // Log data to be submitted
        console.log('Submitting data:', {
            category_image: selectedFile,
            category_name: title,
            description,
            category_id: leadCategory ? leadCategory.id : 0,
            discount_upto: range,
            cat_type: selectedValue,
        });

        // Create FormData
        const formData = new FormData();
        formData.append('category_image', selectedFile);
        formData.append('category_name', title);
        formData.append('description', description);
        formData.append('category_id', leadCategory ? leadCategory.id : 0); // Use 0 if not provided
        formData.append('discount_upto', range);
        formData.append('cat_type', selectedValue);

        try {
            console.log('Making API call...');
            const response = await api.post('/api/leads/add-category', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response) {
                console.log('Response received:', response);
                alert('Added successfully');
                //window.history.back();
                onClose();
            }
        } catch (error) {
            console.log('Error occurred:', error);
            const errorMessage = error.response?.data?.error || error.message;
            dispatch(callAlert({ message: errorMessage, type: 'FAILED' }));
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Sub Category</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Discount Up To"
                        name="discount_upto"
                        type="number"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box display="inline-block" justifyContent="space-between" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '70%', verticalAlign: 'top' }}>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                    </Button>
                    {selectedFile && (
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            {selectedFile.name}
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add Category
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddVendorForm;
