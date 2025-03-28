import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Autocomplete } from '@mui/material';
import api from '../../../utils/api'; 
import Cookies from "js-cookie";
import { callAlert } from '../../../redux/actions/alert';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const AddVendorForm = ({ open, onClose }) => {
    const router = useRouter();
    const uid = Cookies.get('uid');
    const [formData, setFormData] = useState({
        created_by: uid
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [categories, setCategories] = useState([]);
    const [choseCategory, setChoseCategory] = useState('');
    const [addCategory, setAddCategory] = useState('');

    useEffect(() => {
    
        const getAssetCategories = async () => {
            try {
                const response = await api.post("/api/employee/get-asset-category");
                if (response.status === 200) {
                    setCategories(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        getAssetCategories();
    }, []);

    const handleChangeCategory = (event, newValue) => {
        if(newValue)
        {
          setChoseCategory(newValue);
          setAddCategory(newValue.id);
        }
    };

    const handleSubmit = async () => {
        try {
            formData.category = addCategory;
            const response = await api.post('/api/employee/add-asset', formData);
            if (response) {
                alert('Added successfully');
                router.push('/assets-list').then(() => {
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
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        name="assetname"
                        placeholder="Asset Name"
                        value={formData.assetname}
                        onChange={handleChange}
                        fullWidth
                        className='input-size'
                        InputProps={{
                            sx: {
                                '& .MuiInputBase-input': {
                                  padding: '8px 11px',
                                },
                              }
                        }}
                    />
                    <FormControl fullWidth>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(category) => category ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChangeCategory}
                            renderInput={(params) => <TextField {...params} placeholder="Select Category" variant="outlined" />}
                          />
                          
                    </FormControl>
                    <TextField
                        name="modelno"
                        placeholder="Model No."
                        value={formData.modelno}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            sx: {
                                '& .MuiInputBase-input': {
                                  padding: '8px 11px',
                                },
                              }
                        }}
                    />
                    <TextField
                        name="emei"
                        placeholder="Emei No."
                        value={formData.emei}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            sx: {
                                '& .MuiInputBase-input': {
                                  padding: '8px 11px',
                                },
                              }
                        }}
                    />
                    <TextField
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            sx: {
                                '& .MuiInputBase-input': {
                                  padding: '8px 11px',
                                },
                              }
                        }}
                    />
                    <TextField
                        name="assetno"
                        placeholder="Asset No."
                        value={formData.assetno}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            sx: {
                                '& .MuiInputBase-input': {
                                  padding: '8px 11px',
                                },
                              }
                        }}
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
