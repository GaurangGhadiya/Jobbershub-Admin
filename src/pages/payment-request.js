"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import PaymentData from "@/components/leads/paymentRequest";
import { Grid, TableContainer, Paper, Typography, Divider, Box, TextField,FormControl, InputLabel,Select,MenuItem, Button } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx';
import GetAppIcon from '@mui/icons-material/GetApp';
import ExposureIcon from '@mui/icons-material/Exposure';

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

function PaymentRequest(props) {
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
        const getTnx = async () => {
            const newFromDate = fromDate.add(1, 'day');
            const reqData = {
                'from_date': newFromDate.toISOString().split('T')[0],
                'to_date': toDate.toISOString().split('T')[0],
            }

            try {

                const response = await api.post("/api/leads/purchase-request-report", reqData);
                    // console.log(response);
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
      let filteredRows = rows.filter(row => {
        return (
        (row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
        (row.mobile && row.mobile.includes(searchTerm))||
        (row.email && row.email===searchTerm) ||
        (row.transaction_id && row.transaction_id===searchTerm) ||
        (row.category_name && row.category_name.includes(searchTerm)) ||
        (row.lead_name && row.lead_name.includes(searchTerm)) ||
        (row.description && row.description.includes(searchTerm))
        // Add conditions for other relevant columns
        );
    });

      // Excel export 
      const [fileName, setFileName] = useState('payment_request.xlsx');

      const exportToExcel = () => {
          const worksheet = XLSX.utils.json_to_sheet(showServiceTrans);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
          XLSX.writeFile(workbook, fileName);
      };
     
    return (

        <Layout>
            <Grid
                container
                spacing={4}
            >
            
            <Grid item={true} xs={12} >
                <Grid className="page-header" item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <Typography variant="h5">Payment Request</Typography>
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
                </Grid>
                <Grid item={true} xs={12} >
                    <Box mt={2} mb={1} sx={{width: '30%', float: 'left'}} display={'inline-block'} justifyContent={'space-between'}>
                            <TextField id="standard-basic" placeholder="Search" variant="standard" sx={{width: '100%'}}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon />
                                ),
                            }}/>
                    </Box>                  
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
            <PaymentData showServiceTrans={filteredRows} exportToExcel={exportToExcel}/>
        </Layout>


    );
}
export default withAuth(PaymentRequest);

