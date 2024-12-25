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
import CreditTransactions from "@/components/Dashboard/User/CreditBalance";
import { Grid, Button,TableContainer, Paper, Typography, Divider, Box, TextField, Select, MenuItem, FormControl,InputLabel,Link } from "@mui/material";
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import * as XLSX from 'xlsx';
import GetAppIcon from '@mui/icons-material/GetApp';
import ExposureIcon from '@mui/icons-material/Exposure';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import { Consolidate } from "mdi-material-ui";



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
    const router = useRouter();
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
    const  attr  = router.query;
    // console.log(attr);
    const dispatch = useDispatch();
    const [mlmId, setMlmId] = useState('');
    const [mobile, setMobile] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [narration, setNarration] = useState('');
    const currentDate = new Date();
    const [fromDate, setFromDate] = React.useState(dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)));
    const [toDate, setToDate] = React.useState(dayjs(getDate.date));
    const [buttonHidden, setButtonHidden] = useState(false);
    const action_type = attr.action;
    

    useEffect(() => {
        const getTnx = async () => {
            const newFromDate = fromDate.add(1, 'day');
            const reqData = {
                from_date: newFromDate.toISOString().split('T')[0],
                to_date: toDate.toISOString().split('T')[0],
                action_type: action_type
            }

            try {

                const response = await api.post("/api/wallet/system_credit_debit", reqData);

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

    }, [fromDate, toDate, action_type, dispatch]);

    const handleFromDateChange = (date) => {
        setFromDate(date);
      };
    
      const handleToDateChange = (date) => {
        setToDate(date);
      };

   
        const handleChange = (event) => {
            setSelectedValue(event.target.value);
        };

        // Excel export 
        const [fileName, setFileName] = useState('credit_debit_report.xlsx');

        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(showServiceTrans);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            XLSX.writeFile(workbook, fileName);
        };

        const filteredRows = rows.filter(row => {
            return (
              (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
              (row.mobile && row.mobile.includes(searchTerm)) ||
              (row.email && row.email.includes(searchTerm)) ||
              (row.transaction_id && row.transaction_id==searchTerm)
              // Add conditions for other relevant columns
            );
        });


        
       
      const handleSubmit = async () => {
        setButtonHidden(true);
          const formData ={
       
            'mlmId':mlmId,
            'walletType':selectedValue,
            'mobile' :mobile,
            'amount' :amount,
            'action': attr.action,
            'narration': narration
          }

        try {
          const response = await api.post('/api/wallet/credit-debit-income-to-user', formData);
          
          if (response.status==200) {
            alert(response.data.message);
            window.history.back();
            
          } else {
            alert(response.data.message);
          }

        } catch (error) {
          console.error('Error  file:', error);
          alert(error.data.message);
        }
        
      };

     

    return (
        
        <Layout>
            <Grid
                container
                spacing={4}
            >
                <Grid item={true} xs={12}>
                    <Grid className="page-header" item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={10}>
                                <Typography variant="h5"  >{attr.action}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button href={`/bulk-income-credit/?action=${attr.action}`} variant="contained" className="white-button">+ Bulk Upload</Button>
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
                        <Grid item xs={5}></Grid>
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
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Wallet Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedValue}
                                        label="Wallet"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">Please Select</MenuItem>
                                        <MenuItem value="wallet">Smart Pay Wallet</MenuItem>
                                        <MenuItem value="cashback">Cashback wallet</MenuItem>
                                        <MenuItem value="income">Income Wallet</MenuItem>
                                        <MenuItem value="Royality">Royality</MenuItem>
                                        <MenuItem value="Reward">Reward</MenuItem>
                                        <MenuItem value="SIP">SIP</MenuItem>
                                        <MenuItem value="MF">MF</MenuItem>
                                        <MenuItem value="Laptop">Laptop</MenuItem>
                                        <MenuItem value="Bike">Bike</MenuItem>
                                        <MenuItem value="Car">Car</MenuItem>
                                        <MenuItem value="House">House</MenuItem>
                                        <MenuItem value="Travel">Travel</MenuItem>
                                        <MenuItem value="Insurance">Insurance</MenuItem>
                                        <MenuItem value="Child Education">Child Education</MenuItem>
                                        <MenuItem value="Marriage">Marriage</MenuItem>
                                        <MenuItem value="Salary">Salary</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%'}}>
                                <TextField required  fullWidth label="MLM ID" variant="outlined" display={'inline-block'}
                                value={mlmId} onChange={(e) => setMlmId(e.target.value)} sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '45px', 
                                    },
                                    }} />
                                
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%'}} >
                                <TextField required  fullWidth label="Mobile" variant="outlined" display={'inline-block'}
                                value={mobile} onChange={(e) => setMobile(e.target.value)} sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '45px', 
                                    },
                                    }}/>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%'}}>
                                <TextField required  fullWidth label="Amount" variant="outlined" display={'inline-block'}
                                    value={amount} onChange={(e) => setAmount(e.target.value)} sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: '45px', 
                                        },
                                        }}  />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%'}}>
                                <TextField required  fullWidth label="Narration" variant="outlined" display={'inline-block'}
                                value={narration} onChange={(e) => setNarration(e.target.value)} sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '45px', 
                                    },
                                    }} />
                            </Box>
                        </Grid>
                        
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%', margin: '9px -5px'}}>
                                {!buttonHidden && (
                                    <Button variant="contained" size="large" fullWidth className="btn-secondry" onClick={handleSubmit} >
                                        Submit
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item={true} xs={12} >
                      <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={2} mb={1} sx={{ verticalAlign: 'middle', float:'right'}}>
                        <Button onClick={exportToExcel} variant="contained" className="btn-secondry" size="small">
                            <ExposureIcon/> Customize Table
                        </Button>
                        <Button onClick={exportToExcel} variant="contained" className="btn-secondry" size="small">
                            <GetAppIcon/> Download Report
                        </Button>
                      </Box>
                  </Grid>
                </Grid>
                    
            </Grid>
            <CreditTransactions showServiceTrans={filteredRows} />
        </Layout>

    );
}
export default withAuth(TransactionHistory);

