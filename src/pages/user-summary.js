"use client"
import React, { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
// import Head from "next/head";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/Dashboard/User/Summary";
import { Grid, Button,TableContainer, Paper, Typography, Divider, Box, TextField, Select, MenuItem, FormControl,InputLabel } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function TransactionHistory(props) {

    

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
    const [selectedValue, setSelectedValue] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        const getTnx = async () => {
            const newFromDate = fromDate.add(1, 'day');
            const reqData = {
                from_date: newFromDate.toISOString().split('T')[0],
                to_date: toDate.toISOString().split('T')[0],
                filter: searchTerm,
                trans_type: selectedValue
            }

            try {
                const response = await api.post("/api/report/user-summary", reqData);
                
                if (response.status === 200) {
                   setLoading(false);
                    setShowServiceTrans(response.data.data);
                }

            } catch (error) {
                setLoading(false);
                if (error?.response?.data?.error) {
                    dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
                } else {
                    dispatch(callAlert({ message: error.message, type: 'FAILED' }));
                }
            }
        };

    if (fromDate || toDate || searchTerm || selectedValue) {
        getTnx();
    }

}, [fromDate, toDate, searchTerm, selectedValue, dispatch]);

    const handleFromDateChange = (date) => {
        setFromDate(date);
      };
    
      const handleToDateChange = (date) => {
        setToDate(date);
      };

      

        const handleChange = (event) => {
            
            setSelectedValue(event.target.value);
        };
        let filteredRows=rows;
    
        // if(selectedValue != ''){
        //     filteredRows = rows.filter(row => {
        //         return (
        //           (row.sub_type && row.sub_type.toLowerCase().includes(selectedValue.toLowerCase()))
        //         );
        //     });
        // }else{
        //     filteredRows = rows.filter(row => {
        //         return (
        //         (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        //         (row.mlm_id && row.mlm_id==searchTerm) ||
        //         (row.mobile && row.mobile==searchTerm) ||
        //         (row.email && row.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        //         (row.sub_type && row.sub_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        //         (row.recharge_type && row.recharge_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        //         (row.reference_no && row.reference_no==searchTerm) ||
        //         (row.transaction_id && row.transaction_id==searchTerm)
        //         // Add conditions for other relevant columns
        //         );
        //     });
        // }

    return (
        
        <Layout>
            <Grid
                container
                spacing={4}
            >
                {loading && (
                  <div className="loader-overlay">
                      <div className="loader-wrapper">
                          <img src="/loader.gif" alt="Loader" width="150" height="150" /><br /> Loading...
                      </div>
                  </div>
              )}
              {loading && <div className="background-overlay" />}
                {/* <Grid item={true} xs={12}   >
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                        <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#FFA500', // Orange
                                }}
                                >
                                100000
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#0000FF', // Blue
                                }}
                                >
                                :50
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#000000', // Black
                                }}
                                >
                                :500
                                </Box>
                                <Typography variant="h2" sx={{ padding: 1,fontSize: '22px' }}>Recharge Count</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '19%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#FFA500', // Orange
                                }}
                                >
                                100000
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#0000FF', // Blue
                                }}
                                >
                                :50
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#000000', // Black
                                }}
                                >
                                :500
                                </Box>
                                <Typography variant="h2" sx={{ padding: 1,fontSize: '22px' }}>Recharge Performance</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '19%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#FFA500', // Orange
                                }}
                                >
                                100000
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#0000FF', // Blue
                                }}
                                >
                                :50
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#000000', // Black
                                }}
                                >
                                :500
                                </Box>
                                <Typography variant="h2" sx={{ padding: 1,fontSize: '22px' }}>BBPS Performance</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '19%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#FFA500', // Orange
                                }}
                                >
                                100000
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#0000FF', // Blue
                                }}
                                >
                                :50
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#000000', // Black
                                }}
                                >
                                :500
                                </Box>
                                <Typography variant="h2" sx={{ padding: 1,fontSize: '22px' }}>Money Transfer</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '19%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#FFA500', // Orange
                                }}
                                >
                                100000
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#0000FF', // Blue
                                }}
                                >
                                :50
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#000000', // Black
                                }}
                                >
                                :500
                                </Box>
                                <Typography variant="h2" sx={{ padding: 1,fontSize: '22px' }}>Prime Count</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    
                </Grid> */}
            
                <Grid item={true} xs={12}>
                    <Grid className="page-header" item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <Typography variant="h5"  >User Summary</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button href={`/credit-balance-to-user/?action=Credit`} variant="contained" className="white-button">+ Credit</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button href={`/credit-balance-to-user/?action=Debit`} variant="contained" className="white-button">- Debit</Button>
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
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Transaction Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedValue}
                                        label="Transaction Type"
                                        onChange={handleChange}
                                        sx={{
                                            height: '45px',
                                        }}
                                    >
                                        <MenuItem value="">Default</MenuItem>
                                        <MenuItem value="Add Money">Add Money</MenuItem>
                                        <MenuItem value="Recharge">Recharge</MenuItem>
                                        <MenuItem value="Plan Purchase">Plan Purchase</MenuItem>
                                        <MenuItem value="Send Money">Send Money</MenuItem>
                                        <MenuItem value="Receive Money">Receive Money</MenuItem>
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

            <Transactions showServiceTrans={filteredRows} />
        </Layout>

    );
}
export default withAuth(TransactionHistory);

