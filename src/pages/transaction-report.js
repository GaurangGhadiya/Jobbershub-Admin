"use client"
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import api from "../../utils/api";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/transaction/transactions";
import { Grid, TableContainer, Paper, Typography, Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx';
import GetAppIcon from '@mui/icons-material/GetApp';

const TransactionReport = (props) => {
    const [showServiceTrans, setShowServiceTrans] = useState([]);
    const dispatch = useDispatch();

    const [selectedValue, setSelectedValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const currentDate = new Date();
    const [fromDate, setFromDate] = useState(dayjs(new Date(2000, 0, 1))); // Set to a far past date
    const [toDate, setToDate] = useState(dayjs(currentDate)); // Current date
    const [allData, setAllData] = useState([]);


    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }


    useEffect(() => {
        const getTnx = async () => {
            const reqData = {
                from_date: fromDate.toISOString().split('T')[0],
                to_date: toDate.toISOString().split('T')[0],
                trans_type: selectedValue
            };

            try {
                const response = await api.post("/api/report/get-transaction-report", reqData);
                if (response.status === 200) {
                    setShowServiceTrans(response.data.data);
                }
            } catch (error) {
                dispatch(callAlert({ message: error?.response?.data?.error || error.message, type: 'FAILED' }));
            }
        };

        getTnx();
    }, [fromDate, toDate, selectedValue, dispatch]);

    const handleDateFilter = () => {
        const filteredData = allData.filter(item => {
            const itemDate = dayjs(item.created_on); // Replace `item.date` with your actual date field
            return itemDate.isSame(fromDate, 'day') || 
                   itemDate.isSame(toDate, 'day') || 
                   (itemDate.isAfter(fromDate) && itemDate.isBefore(toDate));
        });
        setShowServiceTrans(filteredData);
    };
    
    
    const handleFromDateChange = (date) => {
        setFromDate(date);
        handleDateFilter(); // Filter data when fromDate changes
    };
    
    const handleToDateChange = (date) => {
        setToDate(date);
        handleDateFilter(); // Filter data when toDate changes
    };

    // const handleFromDateChange = (date) => setFromDate(date);
    // const handleToDateChange = (date) => setToDate(date);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // Excel export 
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(showServiceTrans);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'transactions.xlsx');
    };

    // Filter logic
    let filteredRows;

    if(selectedValue != ''){
        filteredRows = rows.filter(row => {
            return (
              (row.category_name && row.category_name.toLowerCase()===selectedValue.toLowerCase()) ||

              (row.lead_name && row.lead_name.toLowerCase()===selectedValue.toLowerCase())
            );
        });
    }else{
    
    
    filteredRows = rows.filter(row => {
        const matchesSearchTerm = 
            (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row.last_name && row.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
            (row.mobile && row.mobile.includes(searchTerm));

        const matchesCategory = selectedValue === "" || row.trans_type === selectedValue; // Ensure this matches your data structure

        return matchesSearchTerm && matchesCategory;
    
    });
}

    return (
        <Layout>
            <Grid container spacing={4} sx={{ padding: 2 }}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Box display='inline-block' justifyContent='space-between' alignItems='right' mt={1} mb={1} sx={{ width: '30%', verticalAlign: 'top' }}>
                            <Typography variant="h5" sx={{ padding: 2 }}>Transaction Report</Typography>
                        </Box>

                        <Box display='inline-block' justifyContent='space-between' alignItems='right' mt={1} mb={1} sx={{ width: '180px', verticalAlign: 'top', padding: '0 10px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Main Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedValue}
                                    label="Main Category"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                                    <MenuItem value="Courses">Courses</MenuItem>
                                    <MenuItem value="Demat A/C">Demat A/C</MenuItem>
                                    <MenuItem value="Bank A/C">Bank A/C</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        
                        <Box display='inline-block' justifyContent='space-between' alignItems='right' mt={1} mb={1} sx={{ width: '180px', verticalAlign: 'top', padding: '0 10px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedValue}
                                    label="Sub Category"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="Recharge">Recharge</MenuItem>
                                    <MenuItem value="Courses">Angel One Demat A/C</MenuItem>
                                    <MenuItem value="Demat A/C">cvimage2</MenuItem>
                                    <MenuItem value="Bank A/C">HDFCSKY</MenuItem>

                                    <MenuItem value="Courses">Digital Marketing Course</MenuItem>
                                    <MenuItem value="Demat A/C">M Stock</MenuItem>
                                    <MenuItem value="Bank A/C">AU Bank Saving Account</MenuItem>

                                    <MenuItem value="Courses">Basics Of Stock Market</MenuItem>
                                    <MenuItem value="Demat A/C">Paytm Money</MenuItem>
                          
                                </Select>
                            </FormControl>
                        </Box>

                        <Box display='inline-block' justifyContent='space-between' alignItems='center' mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft:'20px' }}>
                            <TextField
                                id="standard-basic"
                                placeholder="Search"
                                variant="standard"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (<SearchIcon />),
                                }}
                                fullWidth
                            />
                        </Box>

                        <Box display='inline-block' justifyContent='space-between' alignItems='center' mt={1} mb={1} sx={{ verticalAlign: 'top', marginLeft:'28px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div>
                                    <DatePicker 
                                        label="From Date"
                                        sx={{ padding: 1, lineHeight: 20 }}
                                        //value={fromDate}
                                        onChange={handleFromDateChange}
                                        format="DD-MM-YYYY"
                                    />
                                    <DatePicker 
                                        label="To Date"
                                        sx={{ padding: 1, lineHeight: 20 }}
                                       // value={toDate}
                                        onChange={handleToDateChange}
                                        format="DD-MM-YYYY"
                                    />
                                </div>
                            </LocalizationProvider>
                        </Box>

                        <Box display='inline-block' justifyContent='space-between' alignItems='center' mt={2} mb={1} sx={{ verticalAlign: 'middle', marginLeft:'27px' }}>
                            <Button onClick={exportToExcel} variant="contained" color="primary">
                                <GetAppIcon /> EXCEL
                            </Button>
                        </Box>
                    </TableContainer>
                </Grid>
            </Grid>

            <Transactions showServiceTrans={filteredRows} exportToExcel={exportToExcel} />
        </Layout>
    );
};

export default TransactionReport;
