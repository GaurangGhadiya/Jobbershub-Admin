

"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import RedeemTransactions from "@/components/RedeemReport/RedeemReport";
import { Grid, TableContainer, Paper, Typography, Box, TextField,Button, FormControl, InputLabel , Select,MenuItem  } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx';
import GetAppIcon from '@mui/icons-material/GetApp';
import { styled } from '@mui/material/styles';
import ExposureIcon from '@mui/icons-material/Exposure';
import dashboard from "@/components/Product/dashboard";
import Transactions from "@/components/userManagement/view-employee";
import Link from 'next/link';

import { DataEncrypt, DataDecrypt } from '../../utils/encryption';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const drawWidth = 220;

// const getDate = (timeZone) => {
//     const dateString = timeZone;
//     const dateObject = new Date(dateString);

//     const year = dateObject.getFullYear();
//     const month = String(dateObject.getMonth() + 1).padStart(2, "0");
//     const day = String(dateObject.getDate()).padStart(2, "0");
//     const hours = String(dateObject.getHours()).padStart(2, "0");
//     const minutes = String(dateObject.getMinutes()).padStart(2, "0");

//     // Determine if it's AM or PM
//     const amOrPm = hours >= 12 ? "PM" : "AM";

//     // Convert hours to 12-hour format
//     const formattedHours = hours % 12 === 0 ? "12" : String(hours % 12);

//     const formattedDateTime = `${day}-${month}-${year} ${formattedHours}:${minutes} ${amOrPm}`;

//     return formattedDateTime;
// };


function UserManagement(props) {

    const [showServiceTrans, setShowServiceTrans] = useState({});
    const [report, setReport] = useState(null);
    const [allData, setAllData] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const [openForm1, setOpenForm1] = useState(false);
    const [openForm2, setOpenForm2] = useState(false);

    const dispatch = useDispatch();
    const currentDate = new Date();
    const [fromDate, setFromDate] = useState(dayjs(new Date(2000, 0, 1))); // Set to a far past date
    const [toDate, setToDate] = useState(dayjs(currentDate)); // Current date

    const [selectedValue, setSelectedValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const [nameSearchTerm, setNameSearchTerm] = useState('');
    const [userIdSearchTerm, setUserIdSearchTerm] = useState('');
    const [mobileSearchTerm, setMobileSearchTerm] = useState('');

    const [timeRange, setTimeRange] = React.useState('last7days');

    const [openComponent, setOpenComponent] = useState(null);

    const handleOpenComponent = (component) => {
        setOpenComponent(component);
    };

    const handleChange = (event) => {
        setTimeRange(event.target.value);
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
          "category_name1": null,
          "parent": "parent"
        }
        const encryptedData = DataEncrypt(JSON.stringify(all_parameters));
        const reqData = {
          encReq: encryptedData
        };
        
        
          const getTnx = async () => {
            const newFromDate = fromDate.add(1, 'day');
            const reqData1 = {
              from_date: fromDate.toISOString().split('T')[0],
              to_date: toDate.toISOString().split('T')[0],
            };
            
            try {
              const response = await api.post('/api/employee/get-employee-list', reqData1);
              if (response.status === 200) {
  
          
                setShowServiceTrans(response.data.data);
  
              //   console.log(response.data.data);
              }
            } catch (error) {
              if (error?.response?.data?.error) {
                dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
              } else {
                dispatch(callAlert({ message: error.message, type: 'FAILED' }));
              }
            }
          };


          getTnx();
     
  
        }, [fromDate, toDate, dispatch]);

        const apihandleChangeEvent = async (category_id) => {

            const newFromDate = fromDate.add(1, 'day');
                const reqData = {
                  from_date: newFromDate.toISOString().split('T')[0],
                  to_date: toDate.toISOString().split('T')[0],
                  category_id: category_id
                };
      
                try {
                  const response = await api.post('/api/leads/get-leads-report', reqData);
                  if (response.status === 200) {
                    setShowServiceTrans(response.data.data);
                  }
                } catch (error) {
                  if (error?.response?.data?.error) {
                    dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
                  } else {
                    dispatch(callAlert({ message: error.message, type: 'FAILED' }));
                  }
                }
           
           
          };

    const handleOKButtonClick = async () => {
        setLoading(true);
        const requestData = {
            filter: selectedValue,
            searchTerm: searchTerm
        };
    
        try {
            const response = await api.post('/api/leads/get-category', requestData);
            if (response.data.status === 200) {
                setLoading(false);
                setShowServiceTrans(response.data.data);
            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false); // Ensure loading state is reset on error
        }
    };

    const handleDateFilter = () => {
        const filteredData = allData.filter(item => {
            const itemDate = dayjs(item.created_on); // Ensure this is the correct field
            
            const isAfterFromDate = fromDate ? itemDate.isAfter(dayjs(fromDate), 'day') || itemDate.isSame(dayjs(fromDate), 'day') : true;
            const isBeforeToDate = toDate ? itemDate.isBefore(dayjs(toDate), 'day') || itemDate.isSame(dayjs(toDate), 'day') : true;

            return isAfterFromDate && isBeforeToDate;
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

        // Excel export 
        const [fileName, setFileName] = useState('redeem_report.xlsx');

        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(showServiceTrans);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            XLSX.writeFile(workbook, fileName);
        };
        const handleStatusClick = (event) => {
            setSelectedValue(event.target.value);
        };
              
   
     

        let filteredRows;

    if (selectedValue !== '') {
        filteredRows = rows.filter(row => row.status !== undefined && row.status === parseInt(selectedValue));
    } else {
        filteredRows = rows.filter(row => {
            const matchesUserId = userIdSearchTerm ? row.mlm_id && row.mlm_id.toString().includes(userIdSearchTerm) : true;
            const matchesName = nameSearchTerm ? row.category_name && row.category_name.toLowerCase().includes(nameSearchTerm.toLowerCase()) : true;
            const matchesMobile = mobileSearchTerm ? row.mobile && row.mobile.toLowerCase().includes(mobileSearchTerm.toLowerCase()) : true;
          
          
            return matchesUserId && matchesName;
        });
    }
        
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    const handleOpenForm1 = () => setOpenForm1(true);
    const handleCloseForm1= () => setOpenForm1(false);

    const handleOpenForm2 = () => setOpenForm2(true);
    const handleCloseForm2= () => setOpenForm2(false);

    return (

        <Layout component={Paper}>
            <Grid
                container
                spacing={1}
            >

              <Grid item={true} justifyContent='center' xs={12} >

                <Grid item xs={12}>
                  <Box sx={{ display: 'inline-block', width:'auto', verticalAlign: 'top' }}>
                      <Typography variant="h2" sx={{ padding: 1, fontSize: '24px' }}>Dashboard</Typography>
                  </Box>
                  <Box sx={{ display: 'inline-block', width:'auto', verticalAlign: 'top', float: 'right' }}>
                    <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                        <InputLabel id="time-range-select-label">Time Range</InputLabel>
                        <Select
                            labelId="time-range-select-label"
                            value={timeRange}
                            onChange={handleChange}
                            label="Time Range"
                        >
                            <MenuItem value="last7days">Last 7 Days</MenuItem>
                            <MenuItem value="last15days">Last 15 Days</MenuItem>
                            <MenuItem value="1month">1 Month</MenuItem>
                        </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <br/>
                <Grid container spacing={2} >
                    <Grid item xs={3} mt={1}>
                        <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline', color: '#FFA500',  }} > 0</Box>
                               <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Employees Onboard</Typography>
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                            <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Jobbershub Employees</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Growup Investment Employees</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                          <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Growup Millionaire Employees</Typography>
                            </Typography>
                                                                     
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1} >
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                              <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Growup E-Learning Employees</Typography>
                            </Typography>
                             
                               
                            </Item>
                    </Grid>
                    
                    <Grid item xs={3} mt={1} >
                        <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline', color: '#FFA500',  }} > 0</Box>
                               <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Quadrillion Employees</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                            <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Terminated Employees</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Employees On Hold</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1} >
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                          <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Bank Accounts</Typography>
                            </Typography>
                                                                     
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                              <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Credit Cards</Typography>
                            </Typography>
                             
                               
                            </Item>
                    </Grid>
                    
                    <Grid item xs={3} mt={1} >
                        <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline', color: '#FFA500',  }} > 0</Box>
                               <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Salary</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1} >
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                            <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Insurance</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total BNPL</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1} >
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                          <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total EMI Cards</Typography>
                            </Typography>
                                                                     
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                              <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total UPI Apps</Typography>
                            </Typography>
                             
                            </Item>
                    </Grid>
                    
                    <Grid item xs={3} mt={1} >
                        <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline', color: '#FFA500',  }} > 0</Box>
                               <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Wealths</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1}  >
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                            <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Loans</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1} >
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total E-Seva Services</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1} >
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                          <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>IT Services</Typography>
                            </Typography>
                                                                     
                            </Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 0px 3px #697699',
                                borderRadius: '3px',
                            }}
                            >
                              <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>New/Old Car Selling</Typography>
                            </Typography>
                             
                            </Item>
                    </Grid>
                    
                </Grid>
                   
                <Grid className="page-header" item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={2}>
                        <Typography variant="h5"  >Users</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Link href="/qualification">
                          <Button variant="contained" className="white-button" >+ Create Qualification</Button>
                        </Link>
                      </Grid>
                      <Grid item xs={2}>
                        <Link href="/company">      
                          <Button variant="contained" className="white-button">+ Create Company</Button>
                        </Link>
                      </Grid>
                      <Grid item xs={2}>
                        <Link href="/department">
                          <Button variant="contained" className="white-button">+ Create Department</Button>
                        </Link>
                      </Grid>
                      <Grid item xs={2}>
                          <Link href="/role">
                            <Button variant="contained" className="white-button">+ Create Role</Button>
                          </Link>
                      </Grid>
                      <Grid item xs={2}>
                        <Link href="/add-employee" >
                          <Button variant="contained" className="white-button">+ Create Employees</Button>
                        </Link>
                      </Grid>

                  </Grid>
                    
                </Grid>

                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                      <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Onboarding Date</InputLabel>
                        <DatePicker
                          onChange={handleFromDateChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                height: '20px',
                                '& input': {
                                  height: '20px', 
                                  padding: '0 10px', 
                                },
                                '& .MuiOutlinedInput-root': {
                                  height: '20px',
                                },
                              }}
                            />
                          )}
                        />
                        </LocalizationProvider>
                        </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Termination Date</InputLabel>
                          <DatePicker
                            onChange={handleToDateChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{
                                  height: '20px',
                                  '& input': {
                                    height: '20px', 
                                    padding: '0 10px',
                                  },
                                  '& .MuiOutlinedInput-root': {
                                    height: '20px',
                                  },
                                }}
                              />
                            )}
                          />
                          </LocalizationProvider>
                      </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}> Date Of Birth</InputLabel>
                          <DatePicker
                            onChange={handleToDateChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{
                                  height: '20px',
                                  '& input': {
                                    height: '20px',
                                    padding: '0 10px',
                                  },
                                  '& .MuiOutlinedInput-root': {
                                    height: '20px',
                                  },
                                }}
                              />
                            )}
                          />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}} >
                      <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Employee Name</InputLabel>
                      <TextField 
                              id="user-id-search" 
                              placeholder="Employee Name" 
                              variant="outlined"
                              style={{ width: '100%' }}
                              value={userIdSearchTerm}
                              onChange={(e) => setUserIdSearchTerm(e.target.value)}
                              InputProps={{
                                  startAdornment: (
                                      <SearchIcon />
                                  ),
                                  
                              }} 
                              sx={{
                                  '& .MuiOutlinedInput-root': {
                                    height: '45px', 
                                    
                                  },
                                }}
                          />
                      </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Employee Id</InputLabel>
                        <TextField fillwidth
                          id="user-id-search"
                          placeholder="Employee id"
                          variant="outlined"
                          value={userIdSearchTerm}
                          onChange={(e) => setUserIdSearchTerm(e.target.value)}
                          InputProps={{
                            startAdornment: <SearchIcon />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              height: '45px', 
                            },
                          }}
                        />
                      </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Personal mobile no</InputLabel>
                      <TextField 
                            id="user-id-search" 
                            placeholder="Personal mobile no" 
                            variant="outlined"
                            style={{ width: '100%' }}
                            value={userIdSearchTerm}
                            onChange={(e) => setUserIdSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon />
                                ),
                            }} 
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: '45px', 
                                },
                              }}
                        />
                      </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Com. Mobile Number</InputLabel>
                      <TextField 
                          id="user-id-search" 
                          placeholder="Com. mobile no" 
                          variant="outlined"
                          style={{ width: '100%' }}
                          value={userIdSearchTerm}
                          onChange={(e) => setUserIdSearchTerm(e.target.value)}
                          InputProps={{
                              startAdornment: (
                                  <SearchIcon />
                              ),
                          }} 
                          sx={{
                              '& .MuiOutlinedInput-root': {
                                height: '45px', 
                              },
                            }}
                      />
                      </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Personal Email Id</InputLabel>
                      <TextField 
                            id="user-id-search" 
                            placeholder="Personal email id" 
                            variant="outlined"
                            style={{ width: '100%' }}
                            value={userIdSearchTerm}
                            onChange={(e) => setUserIdSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon />
                                ),
                            }} 
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: '45px', 
                                },
                              }}
                        />
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                      <Box mt={1} mb={1} sx={{width: '100%'}}>
                        <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Company Email Id</InputLabel>
                        <TextField 
                            id="user-id-search" 
                            placeholder="Company email id" 
                            variant="outlined"
                            style={{ width: '100%' }}
                            value={userIdSearchTerm}
                            onChange={(e) => setUserIdSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon />
                                ),
                            }} 
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: '45px', 
                                },
                              }}
                        />
                      </Box>
                  </Grid>

                  <Grid item xs={2}>
                      <Box mt={1} mb={1} sx={{width: '100%'}}>
                        <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Final Qualification</InputLabel>
                        <TextField 
                            id="user-id-search" 
                            placeholder="Final Qualification" 
                            variant="outlined"
                            style={{ width: '100%' }}
                            value={userIdSearchTerm}
                            onChange={(e) => setUserIdSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon />
                                ),
                            }} 
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: '45px', 
                                },
                              }}
                        />
                      </Box>
                  </Grid>

                  <Grid item xs={2}>
                      <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Last Company Name</InputLabel>
                      <TextField 
                          id="user-id-search" 
                          placeholder="Last job company name" 
                          variant="outlined"
                          style={{ width: '100%' }}
                          value={userIdSearchTerm}
                          onChange={(e) => setUserIdSearchTerm(e.target.value)}
                          InputProps={{
                              startAdornment: (
                                  <SearchIcon />
                              ),
                          }} 
                          sx={{
                              '& .MuiOutlinedInput-root': {
                                height: '45px', 
                              },
                            }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Employee Role</InputLabel>
                      <TextField 
                          id="user-id-search" 
                          placeholder="Employee Role" 
                          variant="outlined"
                          style={{ width: '100%' }}
                          value={userIdSearchTerm}
                          onChange={(e) => setUserIdSearchTerm(e.target.value)}
                          InputProps={{
                              startAdornment: (
                                  <SearchIcon />
                              ),
                          }} 
                          sx={{
                              '& .MuiOutlinedInput-root': {
                                height: '45px', 
                              },
                            }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                      <Box mt={1} mb={1} sx={{width: '100%'}}>
                        <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Offered Salary</InputLabel>
                        <TextField 
                                id="user-id-search" 
                                placeholder="Offered Salary" 
                                variant="outlined"
                                style={{ width: '100%' }}
                                value={userIdSearchTerm}
                                onChange={(e) => setUserIdSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <SearchIcon />
                                    ),
                                }} 
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                      height: '45px',                                     
                                    },
                                  }}
                            />
                      </Box>
                  </Grid>

                  <Grid item xs={2}>
                      <Box mt={1} mb={1} sx={{width: '100%'}}>
                        <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Company Name</InputLabel>
                        <TextField 
                            id="user-id-search" 
                            placeholder="Company Name" 
                            variant="outlined"
                            style={{ width: '100%' }}
                            value={userIdSearchTerm}
                            onChange={(e) => setUserIdSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon />
                                ),
                            }} 
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: '45px', 
                                },
                              }}
                        />
                      </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Reporting To</InputLabel>
                      <TextField 
                            id="user-id-search" 
                            placeholder="Reporting To" 
                            variant="outlined"
                            style={{ width: '100%' }}
                            value={userIdSearchTerm}
                            onChange={(e) => setUserIdSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon />
                                ),
                            }} 
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: '45px', 
                                },
                              }}
                        />
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}} >
                      <InputLabel htmlFor="user-id-search" sx={{ mb: 1 }}>Status</InputLabel>
                        <FormControl fullWidth >
                            <InputLabel >Status</InputLabel>
                            <Select
                                id="select-status"
                                value={selectedValue}
                                onChange={handleStatusClick}
                                sx={{
                                    height: '45px',
                                  }}
                            >
                                <MenuItem value="">Default</MenuItem>
                                <MenuItem value="1">Active</MenuItem>
                                <MenuItem value="0">Inactive</MenuItem>
                                <MenuItem value="2">Rejected</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}} >
                      <InputLabel sx={{ mb: 1 }}>State(Allocated)</InputLabel>
                          <FormControl fullWidth >
                              <Select
                                  id="select-astate"
                                  value={selectedValue}
                                  label="Action"
                                  onChange={handleChange}
                                  sx={{
                                      height: '45px',
                                    }}
                              >
                                  <MenuItem value="">Default</MenuItem>
                                  <MenuItem value="1">Active </MenuItem>
                                  <MenuItem value="0">Inactive</MenuItem>
                                  <MenuItem value="2">Rejected</MenuItem>
                              </Select>
                          </FormControl>
                      </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>District(Allocated)</InputLabel>
                          <FormControl fullWidth >
                              
                              <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={selectedValue}
                                  label="Action"
                                  onChange={handleChange}
                                  sx={{
                                      height: '45px',
                                    }}
                              >
                                  <MenuItem value="">Default</MenuItem>
                                  <MenuItem value="1">Active </MenuItem>
                                  <MenuItem value="0">Inactive</MenuItem>
                                  <MenuItem value="2">Rejected</MenuItem>
                              </Select>
                          </FormControl>
                      </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                        <InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>Allocated Taluka</InputLabel>
                            <FormControl fullWidth >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedValue}
                                    label="Action"
                                    onChange={handleChange}
                                    sx={{
                                        height: '45px',
                                      }}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="1">Active </MenuItem>
                                    <MenuItem value="0">Inactive</MenuItem>
                                    <MenuItem value="2">Rejected</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}  >
                      <InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>Annual KPI</InputLabel>
                          <FormControl fullWidth >
                              <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={selectedValue}
                                  label="Action"
                                  onChange={handleChange}
                                  sx={{
                                      height: '45px',
                                    }}
                              >
                                  <MenuItem value="">Default</MenuItem>
                                  <MenuItem value="1">Active </MenuItem>
                                  <MenuItem value="0">Inactive</MenuItem>
                                  <MenuItem value="2">Rejected</MenuItem>
                              </Select>
                          </FormControl>
                      </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box mt={1} mb={1} sx={{width: '100%'}}>
                      <InputLabel id="demo-simple-select-label" sx={{ mb: 1 }}>Created By</InputLabel>
                      <TextField fillWidth
                        id="user-id-search" 
                        placeholder="Created by" 
                        variant="outlined"
                        value={userIdSearchTerm}
                        onChange={(e) => setUserIdSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                        }} 
                        sx={{
                            '& .MuiOutlinedInput-root': {
                              height: '45px', 
                            },
                          }}
                    />
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box mt={4} mb={1} >
                      <Button variant="contained" size="large" className="btn-secondry" fullWidth onClick={handleOKButtonClick}>Search</Button>
                    </Box>
                  </Grid>


                </Grid>
                  <Grid item={true} xs={12} >
                      <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={2} mb={1} sx={{ verticalAlign: 'middle', marginTop:'35px', float:'right'}}>
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
             <Transactions showServiceTrans={filteredRows} />
            
        </Layout>


    );
}
export default withAuth(UserManagement);

