import { Box, Button,Divider,TextField,InputLabel,Select,MenuItem, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Link,Image } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { styled } from '@mui/material/styles';
import Cookies from "js-cookie";
import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRouter } from 'next/router';


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



const AddhowtoUse = () => {
  const router = useRouter();
    const  {id, action}  = router.query;
  const uid = Cookies.get('uid');
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [link, setLink] = useState('');
    const [video_link, setvideo_link] = useState('');
    
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
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleLinkClick = (img) => {
      
    window.open(img, '_blank', 'noopener,noreferrer');
  };
    
  const handleCancel = async () => {
    window.history.back();
  };
      const handleSubmit = async () => {
       
          const formData ={
            'title':title,
            'description':description,
            'video_link':video_link,
            'link':link,
            'image':selectedFile,
            'created_by': uid
          }

        try {


          let response = [];

          if(action=='edit'){
              formData.how_to_use_id = id;
              formData.updated_by = uid;
              response = await api.post('/api/miscellaneous/update-how-to-use', formData, {

                headers:{'content-type': 'multipart/form-data'}
              
              
              });
          }else{
              response = await api.post('/api/miscellaneous/add-how-to-use', formData, {

                headers:{'content-type': 'multipart/form-data'}
              
              
              });
          }

        
          if (response.status==200) {
            window.history.back();
            alert('How to use Created successfully');
          } else {
            alert(response.data.data.message);
          }

        } catch (error) {
          console.error('Error uploading file:', error);
          alert(error);
        }
        
      };

      useEffect(() => {

        if(action=='edit')
        {
          const reqData = {
            'how_to_use_id': id
          }
            
            const getStory = async () => {
                try {
                const response = await api.post("/api/miscellaneous/get-how-to-use-by-id", reqData);
                if (response.status === 200) {
                      const resData = response.data.data;
                      setTitle(resData.title);
                      setBannerFile(resData.image);
                      setDescription(resData.description);
                      setLink(resData.link);
                      setvideo_link(resData.video_link);
                }
                } catch (error) {
                console.error("Error fetching roles:", error);
                }
            };
            getStory();
        }
          
      }, [action,id]);

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
                        <Typography variant="h5"  sx={{ padding: 2 }}>Add How To Use</Typography>
                    </Box>

                    <Grid spacing={2}   sx={{ padding: 2 }} container>

                        <Box  justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                            fullWidth label="Title" 
                            variant="outlined" display={'inline-block'}
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}  />

                        </Box>

                        <Box  justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >

                        <TextareaAutosize  fullWidth
                                label="Description" 
                                minRows={3}
                                size="normal"
                                variant="outlined"
                                placeholder="Description" 
                                style={{height: '30px', width:'100%', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                        /> 

                        </Box>

                        <Box  justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                                fullWidth label="Link" 
                                variant="outlined" display={'inline-block'}
                                value={link} 
                                placeholder="Link"
                                onChange = {(e) => setLink(e.target.value)} />

                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '48%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                                fullWidth label="Video Link" 
                                variant="outlined" display={'inline-block'}
                                value={video_link} 
                                placeholder="Video Link"
                                onChange = {(e) => setvideo_link(e.target.value)} />

                        </Box>

                        <Box justifyContent="space-between" display="inline" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '100%',      verticalAlign: 'top' }}>
                                <Typography variant="p"  sx={{ padding: 2 }} display="inline">Banner Image</Typography>
                                <Button component="label" variant="contained"  display="inline" startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={(event) => handleFileChange(event)}  />
                                </Button>
                                {selectedFile && (
                                <Typography variant="body2" sx={{ marginTop: 1 }} display="inline" >
                                    {selectedFile.name}
                                </Typography>
                                )}
                                {bannerFile !== null ? (<Link href="#" onClick={() => handleLinkClick(bannerFile)} display="inline" ml={2}>
                                Banner Link
                                        </Link>
                                        ) : (
                                            ''
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
export default AddhowtoUse;