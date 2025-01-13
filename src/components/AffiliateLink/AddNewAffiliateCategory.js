import { Box, Button,Divider,TextField,InputLabel,Select,MenuItem, Container, Grid, Paper, TableContainer, Typography, Autocomplete, FormControl} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DataEncrypt, DataDecrypt } from '../../../utils/encryption';

const style = {
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



const AddLeadCategoryTransactions = () => {

  
    
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
  

    const [title, setTitle] = useState('');
    const [range, setRange] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [leadCategory, setLeadCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [payment_link, setPayment_link] = useState('');
    

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };

    const handleChange = (event, newValue) => {
      //setLeadCategory(event.target.value);
      setLeadCategory(newValue);
      
    };

    const chandleChange = (event) => {
      setSelectedValue(event.target.value);
    };
    
    const handleCancel = async () => {
      window.history.back();
    };
    
       
      const handleSubmit = async () => {
       
        
          const formData ={
            'category_image': selectedFile,
            'category_name':title
          }

        try {
          const response = await api.post('/api/affiliate_link/add-category', formData,{

            headers:{'content-type': 'multipart/form-data'}
          
          
          });
        
          if (response) {
            window.history.back();
            alert('Affiliate Category Added successfully');
          } else {
            console.error('Failed to save');
          }

        } catch (error) {
          console.error('Error uploading file:', error);
        }
        
      };

     console.log(leadCategory);

    return (

        <main className="p-6 space-y-6">
          
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            
            <Grid item={true} xs={12}   >
                <TableContainer component={Paper} >

                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '30%', verticalAlign: 'top'}} >
                        <Typography variant="h5"  sx={{ padding: 2 }}>Add New affiliate Category</Typography>
                    </Box>

                    <Grid spacing={2}   sx={{ padding: 2 }} container>

                        <Box  justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                            fullWidth label="Category Name" 
                            variant="outlined" display={'inline-block'}
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}  />

                        </Box>

                        <Box display="inline-block" justifyContent="space-between" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '70%',      verticalAlign: 'top' }}>
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={(event) => handleFileChange(event)} />
                                </Button>
                                {selectedFile && (
                                <Typography variant="body2" sx={{ marginTop: 1 }}>
                                    {selectedFile.name}
                                </Typography>
                                )}
                        </Box>

                    </Grid>
           
                    <Grid item>
                            <Box display="flex" justifyContent="flex-start" mr={2}  mt={1} ml={2} mb={1} >
                                <Button variant="contained" color="primary" style={{ marginRight: '8px' }} size="medium" onClick={handleSubmit}>
                                Submit
                                </Button>
                                <Button variant="outlined"  onClick={handleCancel} >Cancel</Button>
                            </Box>
                    </Grid>
       
                    
                 </TableContainer>
            </Grid>
            
        </Grid>
              
    </main>
    )
}
export default AddLeadCategoryTransactions;