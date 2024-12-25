"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import Layout from "@/components/Dashboard/layout";
import AddMoneyRequestTransactions from "@/components/AddMoneyRequest/AddMoneyRequestReport";
import { Grid, TableContainer, Paper, Typography, Divider, Box, TextField,FormControl, InputLabel,Select,MenuItem } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

// import { Steps } from 'antd';




const drawWidth = 220;
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    borderRadius: 2,
    // border: '2px solid #000',
    boxShadow: 24, overflow: 'auto'
};

const innerStyle = {
    overflow: 'auto',
    width: 400,
    height: 400,
};

function AddMoneyRequestReport(props) {
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }
    const handleSearch = (text) => {
        setSearchTerm(text);
    };
    
    const dispatch = useDispatch();
    const currentDate = new Date();
    const [fromDate, setFromDate] = React.useState(dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)));
    const [toDate, setToDate] = React.useState(dayjs(getDate.date));


    useEffect(() => {
        const getMenus = JSON.parse(localStorage.getItem('menu'));
        const page_url = 'add-money-request';
        let foundMenu = false;
        

        for (const item of getMenus) {
            if (item.menu_url === page_url && item._insert == 1) {
                foundMenu = true;
                break; 
            }
            
        }
        if (!foundMenu) {
            window.location.href = '/dashboard'; 
        }
    }, []);

    useEffect(() => {
        const getTnx = async () => {
            const newFromDate = fromDate.add(1, 'day');
            const reqData = {
                from_date: newFromDate.toISOString().split('T')[0],
                to_date: toDate.toISOString().split('T')[0],
            }

            try {
              
                const response = await api.post("/api/add_money/add-money-list", reqData);
             
                if (response.status === 200) {
                    setShowServiceTrans(response.data.data)
                }

            } catch (error) {

                // if (error?.response?.data?.error) {
                //     dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }))
                // } else {
                //     dispatch(callAlert({ message: error.message, type: 'FAILED' }))
                // }

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
      let filteredRows;

      if(selectedValue != ''){
          filteredRows = rows.filter(row => {
              return (
                (row.status !== undefined && row.status === parseInt(selectedValue))
              );
          });
      }else{
          filteredRows = rows.filter(row => {
              return (
              (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (row.last_name && row.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (row.username && row.username.includes(searchTerm)) ||
              (row.mobile && row.mobile.includes(searchTerm))  ||
              (row.trans_no && row.trans_no.includes(searchTerm)) 
             
              // Add conditions for other relevant columns
              );
          });
      }

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
                                <Typography variant="h5">Add Money Request</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
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
                                        maxDate={toDate}
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
                                        maxDate={toDate}
                                        minDate={fromDate}
                                        />
                                        
                                </LocalizationProvider>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%'}} >
                                <FormControl fullWidth >
                                    <InputLabel >Status</InputLabel>
                                    <Select
                                        id="select-status"
                                        value={selectedValue}
                                        onChange={handleChange}
                                        sx={{
                                            height: '45px',
                                        }}
                                    >
                                        <MenuItem value="">Default</MenuItem>
                                        <MenuItem value="0">Pending</MenuItem>
                                        <MenuItem value="1">Approved</MenuItem>
                                        <MenuItem value="2">Rejected</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}>
                            <Box mt={3} mb={1} sx={{width: '100%'}}>
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
            <AddMoneyRequestTransactions showServiceTrans={filteredRows} />
        </Layout>


    );
}
export default withAuth(AddMoneyRequestReport);

