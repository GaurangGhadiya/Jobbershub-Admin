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
import { DataEncrypt, DataDecrypt } from '../../utils/encryption';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import dayjs from "dayjs";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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

  const getDate = (timeZone) => {
    const dateString = timeZone;
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");

    // Determine if it's AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 === 0 ? "12" : String(hours % 12);

    const formattedDateTime = `${day}-${month}-${year} ${formattedHours}:${minutes} ${amOrPm}`;

    return formattedDateTime;
};


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
    const [meeting_link, setMeetingLink] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [meetingDate, setmeetingDate] = React.useState(dayjs(getDate.date));
    const [meetingTime, setMeetingTime] = React.useState(dayjs(getDate.date));
    const [emeetingDate, esetmeetingDate] = React.useState(dayjs(getDate.date));
    const [emeetingTime, esetMeetingTime] = React.useState(dayjs(getDate.date));

    const handleFromDateChange = (date) => {
        setmeetingDate(date);
    };

    const handleSetTime = (time) => {
        setMeetingTime(time);
    };

    const ehandleFromDateChange = (date) => {
        esetmeetingDate(date);
    };

    const ehandleSetTime = (time) => {
        esetMeetingTime(time);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
  
    let rows;
    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }

    useEffect(() => {
       
        const all_parameters = {
            "meeting_id": id
        }
        

        const getTnx = async () => {
        //   const reqData = {
        //     encReq: encryptedData
        //   };
          try {
            const response = await api.post('/api/meeting/get-meeting-data', all_parameters);
            if (response.status === 200) {
           
                setTitle(response.data.data.name);
                setMeetingLink(response.data.data.meeting_link);
                setDescription(response.data.data.description);

                setmeetingDate(dayjs(new Date(response.data.data.meeting_date)));
                esetmeetingDate(dayjs(new Date(response.data.data.emeeting_date)));
                setMeetingTime(dayjs(response.data.data.meeting_time, "hh:mm A"));
                esetMeetingTime(dayjs(response.data.data.emeeting_time, "hh:mm A"));
          
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

        const date = new Date(meetingTime);
        const edate = new Date(emeetingTime);

        const options = { hour12: true, hour: '2-digit', minute: '2-digit' };
        const formattedTime = date.toLocaleTimeString('en-US', options);
        const eformattedTime = edate.toLocaleTimeString('en-US', options);

            const formData ={
                'meeting_id':id,
                'image': selectedFile,
                'meeting_name':title,
                'meeting_link':meeting_link,
                'description' :description,
                'meeting_date':meetingDate,
                'meeting_time':formattedTime,
                'emeeting_date':emeetingDate,
                'emeeting_time':eformattedTime,
            }

        try {
           
            const response = await api.post('/api/meeting/update-meeting', formData,{
                headers:{'content-type': 'multipart/form-data'}
              });
              
            if (response) {

                alert('Updated successfully');
                window.location.href = "/meeting";
            } 

        } catch (error) {
            console.error('Error updating :', error);
        }
        
        };
          
   
        // const statushandleChange = (event) => {
        //     setstatus(event.target.value);
        // };
       
            
  
 
      
  



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
                        <Typography variant="h5"  sx={{ padding: 2 }}>Meeting [Update] </Typography>
                    </Box>

                    <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                        
                        <TextField required  fullWidth label="Meeting Name" variant="outlined" display={'inline-block'}
                        value={title} onChange={(e) => setTitle(e.target.value)}  />
                    </Box>

               
                    <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                        
                        <TextField required  fullWidth label="Meeting Link" variant="outlined" display={'inline-block'}
                        value={meeting_link} onChange={(e) => setMeetingLink(e.target.value)}  />
                    </Box>

                    <Box justifyContent={'space-between'} alignItems={'right'} ml={1} mt={2} mb={2} style={{width: '80%', verticalAlign: 'top'}} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                                <DatePicker 
                                    label="Meeting Date"
                                    value={meetingDate}
                                    sx={{ padding: 1, lineHeight: 20, width:356 }}
                                    format="DD-MM-YYYY"
                                    onChange={handleFromDateChange}
                                    />



                                <TimePicker 
                                    label="Meeting Time" 
                                    value={meetingTime}
                                    sx={{ padding: 1, lineHeight: 20, width:356 }}
                                    onChange={handleSetTime}
                                    
                                    />
                          
                        </LocalizationProvider>
                        
                    </Box>

                    <Box justifyContent={'space-between'} alignItems={'right'} ml={1} mt={2} mb={2} style={{width: '80%', verticalAlign: 'top'}} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                                <DatePicker 
                                    label="Meeting End Date"
                                    value={emeetingDate}
                                    sx={{ padding: 1, lineHeight: 20, width:356 }}
                                    format="DD-MM-YYYY"
                                    onChange={ehandleFromDateChange}
                                    />



                                <TimePicker 
                                    label="Meeting End Time" 
                                    value={emeetingTime}
                                    sx={{ padding: 1, lineHeight: 20, width:356 }}
                                    onChange={ehandleSetTime}
                                    
                                    />
                          
                        </LocalizationProvider>
                        
                    </Box>
                        
                        
                    <Box justifyContent={'space-between'} alignItems={'right'} mt={3} ml={2} mb={0} style={{width: '50%', verticalAlign: 'top'}} >
                        
                        <TextareaAutosize  fullWidth
                                label="Description" 
                                minRows={3}
                                size="normal"
                                variant="outlined"
                                placeholder="Description" 
                                style={{height: '90px', width:'715px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                        /> 
                        </Box>
                    <Box justifyContent="space-between" alignItems="center" mt={1} ml={2} mb={1} sx={{ width: '50%', verticalAlign: 'top' }}>
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

