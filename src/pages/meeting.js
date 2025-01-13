"use client"
import React, { useContext, useEffect, useState } from "react";

import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import MeetingTransactions from "@/components/Meeting/MeetingReport";

import { Grid,Button, TableContainer, Paper, Typography, Divider, Box, TextField, Select, MenuItem, FormControl,InputLabel } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';



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



function MeetingReport(props) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (text) => {
        setSearchTerm(text);
    };
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const dispatch = useDispatch();

    const currentDate = new Date();
    const [fromDate, setFromDate] = React.useState(dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)));
    const [toDate, setToDate] = React.useState(dayjs(getDate.date));

    useEffect(() => {
        const getTnx = async () => {
            const reqData = {
                from_date: fromDate.toISOString().split('T')[0],
                to_date: toDate.toISOString().split('T')[0],
            }

            try {

                const response = await api.post("/api/meeting/get-meeting-list", reqData);

                if (response.status === 200) {
                    setShowServiceTrans(response.data.data)
                }

            } catch (error) {

                if (error?.response?.data?.error) {
                    dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }))
                } else {
                    dispatch(callAlert({ message: error.message, type: 'FAILED' }))
                }

            }
        }

        if (fromDate || toDate) {
            getTnx();
        }

    }, [fromDate, toDate, dispatch]);

    const handleFromDateChange = (date) => {
        setFromDate(date);
      };
    
      const handleToDateChange = (date) => {
        setToDate(date);
      };

      const [selectedValue, setSelectedValue] = useState('');

        const handleChange = (event) => {
            setSelectedValue(event.target.value);
        };

    return (
        
        <Layout>
            <Grid
                container
                spacing={4}
            >
            
            <Grid item={true} xs={12}   >

                <Grid className="page-header" item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={10}>
                        <Typography variant="h5"  >Meeting</Typography>
                      </Grid>
                      <Grid item xs={2}>
                          <Button href={`/add-new-meeting/`} variant="contained" className="white-button">+ Create Meeting</Button>
                      </Grid>

                  </Grid>
                    
                </Grid>
                <br />
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Box mt={1} mb={1} sx={{width: '100%'}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                                <DatePicker 
                                    label="From Date"
                                    value={fromDate}
                                    sx={{ lineHeight: 20 }}
                                    format="DD-MM-YYYY"
                                    onChange={handleFromDateChange}
                                    /> 
                            </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box mt={1} mb={1} sx={{width: '100%'}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                                <DatePicker 
                                    label="To Date"
                                    value={toDate}
                                    sx={{ lineHeight: 20 }}
                                    format="DD-MM-YYYY"
                                    onChange={handleToDateChange}
                                    />
                                    
                            </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={3}>
                        <Box mt={2} mb={1} sx={{width: '100%'}}>
                            <TextField id="standard-basic" placeholder="Search" variant="standard" sx={{width: '100%'}}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon />
                                ),
                            }}/>
                        </Box>
                    </Grid>
                </Grid>

            </Grid>
            
            </Grid>
                <MeetingTransactions showServiceTrans={showServiceTrans} />
        </Layout>

    );
}
export default withAuth(MeetingReport);

