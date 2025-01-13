import { Box, Button,Divider,TextField,InputLabel,Select,MenuItem, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Picker from "emoji-picker-react";
// import ColorPicker from 'material-ui-color-picker'

import FormControl from '@mui/material/FormControl';

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



const AddNotificationTransactions = () => {

  
    
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
    const [transactionType, setTransactionType] = useState('');
    const [appType, setAppType] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    
    const [appCategories, setAppCategories] = useState([]);
  
    const [showPicker, setShowPicker] = useState(false);
    const [message, setMessage] = useState('');
    const onEmojiClick = (event, emojiObject) => {
    
      setMessage((prevInput) => 
      
      prevInput + emojiObject.emoji);

      // setMessage((prevInput) => prevInput + emojiObject.emoji, () => {
        
      //   console.log('Updated message:', emojiObject.emoji);
      // });
      
      setShowPicker(false);
    };

    const [selectedColor, setSelectedColor] = useState('#000000'); // Initial color

    const handleColorChange = (color) => {
      
      setSelectedColor(color);
    

    };
  
    const handleApplyColor = () => {
     
      setMessage((prevInput) =>
      
      `<html><body><font color=: ${selectedColor}">${prevInput}</font></body></html>`);
      // setSelectedColor('#000000');


      // let message1='';
      // message1=`<html><body><font color:"${selectedColor}">${message}</font></body></html>`;
      
      // setMessage((prevInput) => prevInput + message1, () => {
      //   console.log(prevInput)
       
      // });
    
    };


  
    useEffect(() => {
      const getCategories = async () => {
        try {
          const response = await api.get("/api/notification/get-notification-category");
          // console.log(response);
          if (response.status === 200) {
            setCategories(response.data.data.NotificationCategory);
            setAppCategories(response.data.data.notificationApp);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
  
      getCategories();
    }, []);

  
  
    const handleChange = (event) => {
      setTransactionType(event.target.value);
    };

    const handleChange1 = (event) => {
      setAppType(event.target.value);
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
    
    const handleCancel = async () => {
      window.history.back();
    };
  
   


    
       
      const handleSubmit = async () => {
       
        
          const formData ={
            'image': selectedFile,
            'title':title,
            'type_id':transactionType,
            'body':message,
            'app_id':appType
          }

        try {

         
          const response = await api.post('/api/notification/add-notification', formData,{

            headers:{'content-type': 'multipart/form-data'}
          
          
          });
        
          if (response) {
            window.history.back();
            alert('Notification Saved  successfully');
          } else {
            console.error('Failed to save');
          }

        } catch (error) {
          console.error('Error uploading file:', error);
        }
        
      };

     

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
                        <Typography variant="h5"  sx={{ padding: 2 }}>Add New Notification</Typography>
                    </Box>


                    <Grid spacing={2}   sx={{ padding: 2 }} container>


                        
               


          <Box  justifyContent={'space-between'} alignItems={'right'} mt={3} ml={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
              
              <TextField required size="normal"
              fullWidth label="Title" 
              variant="outlined" display={'inline-block'}
              value={title} 
              onChange={(e) => setTitle(e.target.value)}  />

          </Box>


          <Box  justifyContent={'space-between'} alignItems={'right'} mt={3} ml={2} mb={0} style={{width: '50%', verticalAlign: 'top'}} >

              <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Notification</InputLabel>
                      <Select
                      labelId="transaction-type-label"
                      id="transaction-type"
                      variant="outlined"
                      value={transactionType}
                      label="Transaction Type"
                      onChange={handleChange}
                  >
                  <MenuItem value="">Please Select</MenuItem>
                  {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                          {category.notification_type}
                      </MenuItem>
                      ))}
              
                </Select>
            </FormControl>

          </Box>

          
          <Box  justifyContent={'space-between'} alignItems={'right'} mt={3} ml={2} mb={0} style={{width: '50%', verticalAlign: 'top'}} >

              <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">App Type</InputLabel>
                      <Select
                      labelId="transaction-type-label"
                      id="app-type"
                      variant="outlined"
                      value={appType}
                      label="App Type"
                      onChange={handleChange1}
                  >
                  <MenuItem value="">Please Select</MenuItem>
                  {appCategories.map((appType) => (
                      <MenuItem key={appType.id} value={appType.id}>
                          {appType.app_name}
                      </MenuItem>
                      ))}
              
                </Select>
            </FormControl>

          </Box>

          

          <Box justifyContent={'space-between'} alignItems={'right'} mt={3} ml={2} mb={0} style={{width: '50%', verticalAlign: 'top'}} >
                        
            <TextareaAutosize  fullWidth
                    label="Message" 
                    minRows={3}
                    size="normal"
                    variant="outlined"
                    placeholder="Enter Message" 
                    style={{height: '90px', width:'968px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
            /> 

           
              {/* <img
                  className="emoji-icon"
                  src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                  onClick={() => setShowPicker((val) => !val)}
                />
                {showPicker && (
                  <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
                )}
         
                 
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  ml={3}
                />
                <button onClick={handleApplyColor}>Apply Color</button>
   */}

                </Box>




          <Box  justifyContent="space-between" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '70%',      verticalAlign: 'top' }}>
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
export default AddNotificationTransactions;