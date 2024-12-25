"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import { Grid,Paper,TableContainer, FormControl, InputLabel, Select, MenuItem,Button, Image,Link } from "@mui/material";
import { Typography,Divider,Box,TextField} from "@mui/material";
import { useRouter } from 'next/router';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

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

    const [category_name, setservice_name] = useState('');
    const [discount_upto, setservice_discount_upto] = useState('');
    const [description, setdescription] = useState('');
    const [status, setstatus] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [category_image, setcategory_image] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setcategory_image(URL.createObjectURL(file));
    };
  
    const chandleChange = (event) => {
        setSelectedValue(event.target.value);
      };
      
    const handleLinkClick = (img) => {
    
    window.open(img, '_blank', 'noopener,noreferrer');
    };
    
    useEffect(() => {
        const getTnx = async () => {
          const reqData = {
            "category_id": id
          };

          // const originalString = 'Hello, World!';
          // const encryptedData = DataEncrypt(JSON.stringify(originalString));
          // console.log(encryptedData);
          // const decryptedObject = DataDecrypt(encryptedData);
          // console.log(decryptedObject);
          try {
            const response = await api.post('/api/leads/get-lead-category', reqData);
            if (response.status === 200) {
                setservice_name(response.data.data.category_name);
                setservice_discount_upto(response.data.data.discount_upto);
                setdescription(response.data.data.description);
                setstatus(response.data.data.status);
                setcategory_image(response.data.data.category_image);

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
        // alert(status);
        
            // const formData = new FormData();
            // formData.append('img', selectedFile);
            // formData.append('title', title);
            // formData.append('categoryId',transactionType);

            const formData ={
                'id':id,
                'category_name': category_name,
                'discount_upto': discount_upto,
                'description': description,
                'status': status,
                'category_image': selectedFile,
                'cat_type': selectedValue
            }
            console.log(formData);

        try {
            const response = await api.post("/api/leads/update-lead-category", formData, {

                headers:{'content-type': 'multipart/form-data'}
              
              
              });
            
            if (response) {
                window.history.back();
                alert('Updated successfully');
            } 

        } catch (error) {
            console.error('Error updating :', error);
        }
        
        };
          
        // const priorityhandleChange = (event) => {
        //     setpriority(event.target.value);
        // };
    
        const statushandleChange = (event) => {
            setstatus(event.target.value);
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
                    <Typography variant="h5"  sx={{ padding: 2 }}>Lead Category [Update] </Typography>
                </Box>
                </TableContainer>
            </Grid>
            
            
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} >

                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Category Name" variant="outlined" display={'inline-block'}
                            value={category_name}   onChange={(e) => setservice_name(e.target.value)} />
                        </Box>
                        <br />
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Discount Upto" variant="outlined" display={'inline-block'}
                            value={discount_upto} onChange={(e) => setservice_discount_upto(e.target.value)}  />
                        </Box>
                        <br />
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedValue}
                                label="Status"
                                onChange={chandleChange}
                            >
                                <MenuItem value="">Default</MenuItem>
                                <MenuItem value="Health">Health</MenuItem>
                                <MenuItem value="Term">Term</MenuItem>
                                <MenuItem value="Wealth">Wealth</MenuItem>
                                <MenuItem value="Vehicle">Vehicle</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                                
                            </Select>
                        </FormControl>

                        </Box>
                        {/* <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priority}
                                label="Priority"
                                onChange={priorityhandleChange}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                            </Select>
                        </FormControl>
                        </Box> */}

                        
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={3} ml={2} mb={0} style={{width: '50%', verticalAlign: 'top'}} >
                        
                        <TextareaAutosize  fullWidth
                                label="Description" 
                                minRows={3}
                                size="normal"
                                variant="outlined"
                                placeholder="Description" 
                                style={{height: '20px', width:'968px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                        /> 
                        </Box>



                        <br />
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

                                {category_image !== '' ? (<Link href="#" onClick={() => handleLinkClick(category_image)} display="inline" ml={2}>
                                        View Image
                                        </Link>
                                        ) : (
                                            ''
                                        )}
                        </Box>
                        <br /><br />
                        <Grid item>
                            <Box display="flex" justifyContent="flex-first" mr={2}  mt={1} ml={2} mb={1} >
                            <Button variant="contained" color="success" size="medium" onClick={handleSubmit}>
                                Update
                            </Button>
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

