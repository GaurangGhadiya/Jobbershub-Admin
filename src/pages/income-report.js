"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import IncomeTransactions from "@/components/IncomeReport/IncomeReport";
import { Grid, TableContainer, Paper, Typography, Divider, Box, TextField,FormControl, InputLabel,Select,MenuItem } from "@mui/material";
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


function IncomeReport(props) {
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }
    
    const dispatch = useDispatch();
    const currentDate = new Date();
    const [fromDate, setFromDate] = React.useState(dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)));
    const [toDate, setToDate] = React.useState(dayjs(getDate.date));
    

    useEffect(() => {
        const getFilter = async () => {
            try {

                const response = await api.post("/api/users/get-category-wallet");
                if (response.status === 200) {
                    setCategories(response.data.data)
                }

            } catch (error) {

                if (error?.response?.data?.error) {
                    dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }))
                } else {
                    dispatch(callAlert({ message: error.message, type: 'FAILED' }))
                }

            }
        }
        const getTnx = async () => {
            const newFromDate = fromDate.add(1, 'day');
            const reqData = {
                from_date: newFromDate.toISOString().split('T')[0],
                to_date: toDate.toISOString().split('T')[0],
            }

            try {

                const response = await api.post("/api/refferal-report/user-income-report", reqData);
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
        getFilter();
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

        const reqData = {
            filter: selectedValue
        }

        try {

            const response = api.post("/api/refferal-report/user-income-report", reqData);
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
      };

      const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const reqData = {
            searchTerm: searchTerm
        }

        try {

            const response = api.post("/api/refferal-report/user-income-report", reqData);
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
    };

      const filteredRows = rows.filter(row => {
        return (
        (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
        (row.mobile && row.mobile.includes(searchTerm)) ||
        (row.email && row.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (row.sub_type && row.sub_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (row.recharge_type && row.recharge_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (row.reference_no && row.reference_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (row.transaction_id && row.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()))
        // Add conditions for other relevant columns
        );
    });

    return (

        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
    
            <Grid item={true} xs={12}   >
            <TableContainer component={Paper} >

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '20%', verticalAlign: 'top'}} >
                    <Typography variant="h5"  sx={{ padding: 2 }}>Income Report</Typography>
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '180px', verticalAlign: 'top', padding: '0 10px'}} >

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                            <Select
                                labelId="transaction-type-label"
                                id="transaction-type"
                                variant="outlined"
                                label="Filter"
                                value={selectedValue}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Please Select</MenuItem>
                                    {categories.map((category, index) => (
                                <MenuItem key={index} value={category.category_name}>
                                {category.category_name}
                                </MenuItem>
                                ))}

                            </Select>
                    </FormControl>

                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '20%', verticalAlign: 'top' }}>
                        <TextField id="standard-basic" placeholder="Search" variant="standard" mt={2} style={{width: '100%'}}
                        value={searchTerm}
                        //onChange={(e) => setSearchTerm(e.target.value)}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                        }}/>
                    </Box>
            
                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={1} sx={{ verticalAlign: 'top' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                   
                    <div>
                    
                    <DatePicker 
                        label="From Date"
                        value={fromDate}
                        sx={{ padding: 1, lineHeight: 20 }}
                        format="DD-MM-YYYY"
                        onChange={handleFromDateChange}
                        />
                
                    <DatePicker 
                        label="To Date"
                        value={toDate}
                        sx={{ padding: 1, lineHeight: 20 }}
                        format="DD-MM-YYYY"
                        onChange={handleToDateChange}
                        />
                        
                    </div>
                    </LocalizationProvider>
                    
                        
                    </Box>
                </TableContainer>
            </Grid>
            
            </Grid>
            <IncomeTransactions showServiceTrans={filteredRows} />
        </Layout>


    );
}
export default withAuth(IncomeReport);

