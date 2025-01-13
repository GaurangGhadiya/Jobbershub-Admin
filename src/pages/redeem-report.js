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


function RedeemReport(props) {

    const [showServiceTrans, setShowServiceTrans] = useState([]);
    const [report, setReport] = useState(null);
    const [allData, setAllData] = useState([]);

    const dispatch = useDispatch();
    const currentDate = new Date();
    const [fromDate, setFromDate] = React.useState(dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)));
    const [toDate, setToDate] = useState(dayjs(currentDate)); 

    const [selectedValue, setSelectedValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const [nameSearchTerm, setNameSearchTerm] = useState('');
    const [userIdSearchTerm, setUserIdSearchTerm] = useState('');
    const [mobileSearchTerm, setMobileSearchTerm] = useState('');


    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const newFromDate = fromDate.add(1, 'day');
            const reqData = {
                from_date: newFromDate.toISOString().split('T')[0],
                to_date: toDate.toISOString().split('T')[0],
            };

            try {
                const response = await api.post("/api/report/get-redeem-report", reqData);
                if (response.status === 200) {
                    setShowServiceTrans(response.data.data);
                    setReport(response.data.report);
                }
            } catch (error) {
                dispatch(callAlert({ message: error?.response?.data?.error || error.message, type: 'FAILED' }));
            }
        };

        fetchData();
    }, [fromDate, toDate, dispatch]);




    const handleOKButtonClick = async () => {
        setLoading(true);
        const requestData = {
            filter: selectedValue,
            searchTerm: searchTerm
        };
    
        try {
            const response = await api.post('/api/report/get-redeem-report', requestData);
            if (response.data.status === 200) {
                setLoading(false);
                setShowServiceTrans(response.data.data);
            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false); 
        }
    };

     
const handleDateFilter = () => {
    const filteredData = allData.filter(item => {
        const itemDate = dayjs(item.created_on); 
        return itemDate.isSame(fromDate, 'day') || 
               itemDate.isSame(toDate, 'day') || 
               (itemDate.isAfter(fromDate) && itemDate.isBefore(toDate));
    });
    setShowServiceTrans(filteredData);
};


const handleFromDateChange = (date) => {
    setFromDate(date);
    handleDateFilter(); 
};

const handleToDateChange = (date) => {
    setToDate(date);
    handleDateFilter();
};

        // Excel export 

        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(showServiceTrans);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            XLSX.writeFile(workbook, 'redeem_report.xlsx');
        };
        const handleStatusClick = (status) => {
            setSelectedValue(status);
        };
              
   
        const handleChange = (event) => {
            setSelectedValue(event.target.value);
        };

        let filteredRows;

    if (selectedValue !== '') {
        filteredRows = rows.filter(row => row.status !== undefined && row.status === parseInt(selectedValue));
    } else {
        filteredRows = rows.filter(row => {
            const matchesUserId = userIdSearchTerm ? row.mlm_id && row.mlm_id.toString().includes(userIdSearchTerm) : true;
            const matchesName = nameSearchTerm ? row.first_name && row.first_name.toLowerCase().includes(nameSearchTerm.toLowerCase()) : true;
            const matchesMobile = mobileSearchTerm ? row.mobile && row.mobile==mobileSearchTerm : true;
          
          
            return matchesUserId && matchesName && matchesMobile;
        });
    }
        

    return (

        <Layout component={Paper}>
            <Grid
                container
                spacing={4}
            >
                
                <Grid item={true} justifyContent='center' xs={12} >
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item md={4} lg={3} mt={1} onClick={() => handleStatusClick('1')}>
                            <Item
                                sx={{
                                    height: 100,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0px 0px 3px #697699',
                                    borderRadius: '3px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Typography variant="h6" component="div">
                                    <Box
                                        sx={{
                                            display: 'inline',
                                            color: '#FFA500', 
                                        }}
                                    >
                                        {report ? report.total_approve_amt : 0} 
                                    </Box>
                                    <Typography variant="h2" sx={{ padding: 1, fontSize: '18px' }}>Total Approve Amount</Typography>
                                </Typography>
                            </Item>
                        </Grid>

                        <Grid item md={4} lg={3} mt={1} onClick={() => handleStatusClick('0')}>
                            <Item
                                sx={{
                                    height: 100,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0px 0px 3px #697699',
                                    borderRadius: '3px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Typography variant="h6" component="div">
                                    <Box
                                        sx={{
                                            display: 'inline',
                                            color: '#FFA500',
                                        }}
                                    >
                                        {report ? report.total_pending_amt : 0} 
                                    </Box>
                                    <Typography variant="h2" sx={{ padding: 1, fontSize: '18px' }}>Total Pending Amount</Typography>
                                </Typography>
                            </Item>
                        </Grid>

                        <Grid item md={4} lg={3} mt={1} onClick={() => handleStatusClick('2')}>
                            <Item
                                sx={{
                                    height: 100,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0px 0px 3px #697699',
                                    borderRadius: '3px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Typography variant="h6" component="div">
                                    <Box
                                        sx={{
                                            display: 'inline',
                                            color: '#FFA500', 
                                        }}
                                    >
                                        {report ? report.total_rejected_amt : 0} 
                                    </Box>
                                    <Typography variant="h2" sx={{ padding: 1, fontSize: '18px' }}>Total Rejected Amount</Typography>
                                </Typography>
                            </Item>
                        </Grid>
                    </Grid>
                

                    <Grid className="page-header" item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={10}>
                                <Typography variant="h5"  >Withdraw History Report</Typography>
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
                                        sx={{ lineHeight: 20, width: '100%' }}
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
                                        sx={{ lineHeight: 20, width: '100%' }}
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
                                        <MenuItem value="1">Active</MenuItem>
                                        <MenuItem value="0">Pending</MenuItem>
                                        <MenuItem value="2">Rejected</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%'}} >
                            <TextField 
                                    id="user-id-search" 
                                    placeholder="User ID" 
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
                            <TextField 
                                    id="name-search" 
                                    placeholder="Name" 
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    value={nameSearchTerm}
                                    onChange={(e) => setNameSearchTerm(e.target.value)}
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
                            <TextField 
                                    id="mobile-search" 
                                    placeholder="Mobile" 
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    value={mobileSearchTerm}
                                    onChange={(e) => setMobileSearchTerm(e.target.value)}
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
                        {/* <Grid item xs={3}>
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
                        </Grid> */}
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
            <RedeemTransactions showServiceTrans={filteredRows} exportToExcel={exportToExcel}/>
        </Layout>


    );
}
export default withAuth(RedeemReport);

