"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/Dashboard/User/details";
import { Grid,Paper,TableContainer,FormControl,InputLabel,Select,MenuItem, Button } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Steps } from 'antd';
import { Typography,Divider,Box,TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


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


function TransactionHistory(props) {
  
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const [fetchTrigger, setFetchTrigger] = useState(0);
    
    const uid = Cookies.get('uid');

    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }
    // const [fromDate, setFromDate] = useState(new Date());
    // const [toDate, setToDate] = useState(new Date());
    const currentDate = new Date();
    const [fromDate, setFromDate] = React.useState(dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)));
    const [toDate, setToDate] = React.useState(dayjs(getDate.dateObject));
    const [clicked, setClicked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedValue, setSelectedValue] = useState('');
    const [rankselectedValue, setRankSelectedValue] = useState('');
    const [statusselectedValue, setStatusSelectedValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        
        setSelectedValue(event.target.value);
    };
  
    const rankhandleChange = (event) => {
        
      setRankSelectedValue(event.target.value);
    };

    const statushandleChange = (event) => {
        
      setStatusSelectedValue(event.target.value);
    };

    const handleFromDateChange = (date) => {
      setFromDate(date);
    };
  
    const handleToDateChange = (date) => {
      setToDate(date);
    };

    //const handleOKButtonClick = async () => {
     // setClicked(true);
      // setLoading(true);
      // const newFromDate = fromDate.add(1, 'day');
      // const requestData = {
      //   filter: selectedValue,
      //   searchTerm: searchTerm,
      //   rank: rankselectedValue,
      //   user_status: statusselectedValue,
      //   from_date: newFromDate.toISOString().split('T')[0],
      //   to_date: toDate.toISOString().split('T')[0],
      //   page: page
      // };

      // try {
       
      //     const response = await api.post('/api/report/user-details', requestData);
            
      //     if (response.data.status === 200) {
      //       setLoading(false);
      //       setShowServiceTrans(response.data.data);
      //       setTotalPageCount(response.data.totalPageCount);
      //     }

      // } catch (error) {
      //     console.error("Error:", error);
         
      // }
     
     
    //};



    const handleOKButtonClick = async () => {
      setClicked(true);
    }

    useEffect(() => {
        const getTnx = async () => {
          
          const newFromDate = fromDate.add(1, 'day');
          const reqData = {
            page: page+1,
            filter: selectedValue,
            searchTerm: searchTerm,
            rank: rankselectedValue,
            user_status: statusselectedValue,
          };
          if(!selectedValue || !searchTerm)
          {
            reqData.from_date = newFromDate.toISOString().split('T')[0];
            reqData.to_date = toDate.toISOString().split('T')[0];
          }
          try {
            setLoading(true);
            const response = await api.post('/api/report/user-details', reqData);
            if (response.status === 200) {
              setLoading(false);
              setShowServiceTrans(response.data.data);
              setTotalPageCount(response.data.totalPageCount);
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
    
        if (uid || clicked) {
          getTnx();
        }
        setClicked(false);
        
      }, [uid, fromDate, toDate, page, clicked, fetchTrigger, dispatch]);

      const triggerPageApi = () => {
        setFetchTrigger((prev) => prev + 1);
      };

      const filteredRows = rows
    return (

        <Layout>
            <Grid
                container
                spacing={4}
            >
            
              <Grid item={true} xs={12}   >
                    {loading && (
                        <div className="loader-overlay">
                            <div className="loader-wrapper">
                                <img src="/loader.gif" alt="Loader" width="150" height="150" /><br /> Loading...
                            </div>
                        </div>
                    )}
                    {loading && <div className="background-overlay" />}
                    <Grid className="page-header" item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <Typography variant="h5">User Details</Typography>
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
                      <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%'}} >
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Rank</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={rankselectedValue}
                                      label="Transaction Type"
                                      onChange={rankhandleChange}
                                  >

                                      <MenuItem value="">Default</MenuItem>
                                      <MenuItem value="Team Leader">Team Leader</MenuItem>
                                      <MenuItem value="Assistant Manager">Assistant Manager</MenuItem>
                                      <MenuItem value="Manager">Manager</MenuItem>
                                      <MenuItem value="Zonal Head">Zonal Head</MenuItem>
                                      <MenuItem value="National Head">National Head</MenuItem>
                                  </Select>
                              </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%'}} >
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">User Status</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={statusselectedValue}
                                      label="Transaction Type"
                                      onChange={statushandleChange}
                                  >

                                      <MenuItem value="">Default</MenuItem>
                                      <MenuItem value="Active">Authorized</MenuItem>
                                      <MenuItem value="Inactive">Unauthorized</MenuItem>
                                      <MenuItem value="Free">Free</MenuItem>
                                      <MenuItem value="userActive">Active</MenuItem>
                                      <MenuItem value="userDeactive">Deactive</MenuItem>
                                  </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box mt={1} mb={1} sx={{width: '100%'}} >
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={selectedValue}
                                      label="Transaction Type"
                                      onChange={handleChange}
                                  >
                                      <MenuItem value="">Default</MenuItem>
                                      <MenuItem value="mlm_id">User Id</MenuItem>
                                      <MenuItem value="first_name">Name</MenuItem>
                                      <MenuItem value="mobile">Mobile</MenuItem>
                                      <MenuItem value="email">Email</MenuItem>
                                      <MenuItem value="ref_mlm_id">Referral User Id</MenuItem>
                                      <MenuItem value="ref_first_name">Referral Name</MenuItem>
                                      <MenuItem value="wallet_balance">Wallet Balance</MenuItem>
                                      <MenuItem value="cashback_balance">Cashback</MenuItem>
                                      <MenuItem value="city">City</MenuItem>
                                      <MenuItem value="state">State</MenuItem>
                                      <MenuItem value="pincode">Pincode</MenuItem>
                                  </Select>
                              </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
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
                        <Grid item xs={2}>
                        <Box mt={1} mb={1} >
                          <Button variant="contained" size="large" className="btn-secondry" fullWidth onClick={handleOKButtonClick}>Search</Button>
                        </Box>
                      </Grid>
                    </Grid>
              
              </Grid>
            
            </Grid>
            
            <Transactions showServiceTrans={filteredRows} totalPageCount={totalPageCount} page={page} setPage={setPage} triggerPageApi={triggerPageApi} />
        </Layout>


    );
}
export default withAuth(TransactionHistory);

