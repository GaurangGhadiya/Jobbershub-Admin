import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Typography,
    Autocomplete,
    TextareaAutosize,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import api from "../../../utils/api";
import { DataEncrypt, DataDecrypt } from '../../../utils/encryption';

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

const AddLeadCategoryTransactions = ({ open, onClose }) => {
    const [title, setTitle] = useState('');
    const [range, setRange] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [leadCategory, setLeadCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const reqData = { encReq: DataEncrypt(JSON.stringify({ category_name1: null })) };
            try {
                const response = await api.post("/api/leads/get-category", reqData);
                if (response.status === 200) {
                    setCategories(DataDecrypt(response.data).data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        const formData = {
            category_image: selectedFile,
            category_name: title,
            description,
            category_id: leadCategory ? leadCategory.id : null,
            discount_upto: range,
        };

        try {
            const response = await api.post('/api/leads/add-category', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response) {
                alert('Leads Saved successfully');
                onClose(); // Close modal on success
            } else {
                console.error('Failed to save');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs" // Set maximum width to small
            fullWidth
        >
            <DialogTitle>Add Sub Category</DialogTitle>
            <DialogContent>
               
                <FormControl fullWidth margin="normal">
                    <Autocomplete
                        options={categories}
                        getOptionLabel={(option) => option ? option.category_name : ''}
                        value={leadCategory}
                        onChange={(event, newValue) => setLeadCategory(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Category" variant="outlined" />
                        )}
                    />
                </FormControl>
                <TextField
                    required
                    fullWidth
                    label="Title"
                    variant="outlined"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    required
                    fullWidth
                    label="Discount Upto"
                    variant="outlined"
                    margin="normal"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                />
                <TextareaAutosize
                    minRows={3}
                    placeholder="Enter Message"
                    style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '4px' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Box mt={2}>
                    <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                        Upload File
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
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Add Category</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddLeadCategoryTransactions;
