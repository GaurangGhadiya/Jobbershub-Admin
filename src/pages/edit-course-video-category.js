"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import { Grid,Paper,TableContainer, FormControl, InputLabel, Select, MenuItem,Button } from "@mui/material";
import { Typography,Divider,Box,TextField} from "@mui/material";
import { useRouter } from 'next/router';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { DataEncrypt, DataDecrypt } from '../../utils/encryption';

function TransactionHistory(props) {

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
  
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const [title, setTitle] = useState('');
   
    const [status, setstatus] = useState('');
    const [leadCategory, setLeadCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [category_image, setcategory_image] = useState('');
    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }


  
      const handleChange = (event) => {
        setLeadCategory(event.target.value);
      };
  
      
      
    const statushandleChange = (event) => {
      setstatus(event.target.value);
    };

    const handleCancel = async () => {
      window.history.back();
    };

    
      useEffect(() => {
        const all_parameters = {
          "category_name1": null
      }
      const encryptedData = DataEncrypt(JSON.stringify(all_parameters));
        const reqData = {
          encReq: encryptedData
        };
        const getCategories = async () => {
          try {
            const response = await api.post("/api/course_video/get-category", reqData);
               
                  if (response.status === 200) {
                    const decryptedObject = DataDecrypt(response.data);
                    setCategories(decryptedObject.data);
                  }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
    
        getCategories();
      }, []);
      
  

    useEffect(() => {
        const getTnx = async () => {
          const reqData = {
            "category_id": id
          };

          try {
            const response = await api.post('/api/course_video/get-video-category', reqData);
            if (response.status === 200) {
          
                setTitle(response.data.data.category_name);
                setLeadCategory(response.data.data.parent_id);
                setstatus(response.data.data.status);
             
               
            }
          } catch (error) {
            if (error?.response?.data?.error) {
              dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
            } else {
              dispatch(callAlert({ message: error.message, type: 'FAILED' }));
            }
          }
        };
    
        if (id) {
          getTnx();
        }
      }, [id, dispatch]);

    const handleSubmit = async () => {
     

            const formData ={
                'video_id':id,
                'category_name':title,
                'status':status,
                'category_id':1,
            }

        try {
            const response = await api.post("/api/course_video/update-video-category", formData);
            
            if (response) {
                window.history.back();
                alert('Updated successfully');
            } 

        } catch (error) {
            console.error('Error updating :', error);
        }
        
        };
          
       
    

    return (

        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            
            
            
            
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} >
                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '40%', verticalAlign: 'top'}} >
                        <Typography variant="h5"  sx={{ padding: 2 }}>Course Video [Update] </Typography>
                    </Box>

                    <Box  justifyContent={'space-between'} alignItems={'right'} mt={3} ml={1} mb={0} style={{width: '50%', verticalAlign: 'top'}} >

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="transaction-type-label"
                                    id="transaction-type"
                                    variant="outlined"
                                    value={leadCategory}
                                    label="Lead Type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Please Select</MenuItem>
                                
                                        {categories.map((category) => (
                                            
                                    <MenuItem key={category.id} value={category.id}>
                                    {category.category_name}
                                    </MenuItem>
                                    ))}

                                </Select>
                        </FormControl>

                        </Box>

                        <Box  justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                            fullWidth label="Title" 
                            variant="outlined" display={'inline-block'}
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}  />

                        </Box>


                    <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={statushandleChange}
                            >
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={0}>Inactive</MenuItem>
                            </Select>
                        </FormControl>

                        </Box>
                        <br /><br />
                        <Grid item>
                            <Box display="flex" justifyContent="flex-first" mr={2}  mt={1} ml={2} mb={1} >
                            <Button variant="contained" color="success" style={{ marginRight: '8px' }} size="medium" onClick={handleSubmit}>
                                Update
                            </Button>
                            <Button variant="outlined"  onClick={handleCancel} >Cancel</Button>
                            </Box>   
                        </Grid>
                        <br /><br /><br /><br /><br />
                    </TableContainer>
                </Grid>
            </Grid>
        </Layout>


    );
}
export default withAuth(TransactionHistory);
