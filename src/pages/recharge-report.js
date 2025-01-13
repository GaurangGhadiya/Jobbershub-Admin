"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/Recharge/recharge-details";
import { Grid,Paper,TableContainer,FormControl ,InputLabel,Select, MenuItem, Button} from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Steps } from 'antd';
import { Typography,Divider,Box,TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ExposureIcon from '@mui/icons-material/Exposure';
import * as XLSX from 'xlsx';
import GetAppIcon from '@mui/icons-material/GetApp';
import { styled } from '@mui/material/styles';
import { getCurrentWeekDates, getCurrentMonthDates } from '../../utils/utiliy';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
  
    const [showServiceTrans, setShowServiceTrans] = useState([]);
    const dispatch = useDispatch();
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
    const [toDate, setToDate] = React.useState(dayjs(getDate.date));
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [statusSelectedValue, setStatusSelectedValue] = useState('');
    const [vendorSelectedValue, setVendorSelectedValue] = useState('');
    const [daySelectedValue, setDaySelectedValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    

    useEffect(() => {
        setLoading(true);
        const getTnx = async () => {
          const newFromDate = fromDate.add(1, 'day');
          const newToDate = toDate.add(1, 'day');
          const reqData = {
            from_date: newFromDate.toISOString().split('T')[0],
            to_date: newToDate.toISOString().split('T')[0],
            searchTerm: searchTerm,
            searchOperator:selectedValue,
            searchStatus: statusSelectedValue,
            searchVendor: vendorSelectedValue
          };
    
          try {
            const response = await api.post('api/report/recharge-report', reqData);
            if (response.status === 200) {
              setLoading(false);
              setShowServiceTrans(response.data.data);
              setReport(response.data.report);
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
    
        if (uid) {
          getTnx();
        }
      }, [uid, fromDate, toDate, searchTerm, selectedValue, statusSelectedValue, vendorSelectedValue, dispatch]);

      const handleFromDateChange = (date) => {
        setFromDate(date);
      };
    
      const handleToDateChange = (date) => {
        setToDate(date);
      };

      const handleChange = (event) => {
          
          setSelectedValue(event.target.value);
      };

      const handleStatusClick = (status) => {
        setStatusSelectedValue(status);
      };

      const statushandleChange = (event) => {
          
        setStatusSelectedValue(event.target.value);
      };

      const vendorHandleChange = (event) => {
          
        setVendorSelectedValue(event.target.value);
      };
      const dayHandleChange = (event) => {
        setDaySelectedValue(event.target.value);
        
        if(event.target.value == 'today')
        {
          const fromDate = dayjs();
          setFromDate(dayjs(fromDate.format('YYYY-MM-DD')));
          setToDate(dayjs(fromDate.format('YYYY-MM-DD')));
        }

        if(event.target.value == 'week')
        {
          const { from_date, to_date } = getCurrentWeekDates();
          setFromDate(dayjs(from_date));
          setToDate(dayjs(to_date));
        }

        if(event.target.value == 'month')
        {
          const {from_date, to_date} = getCurrentMonthDates();
          setFromDate(dayjs(from_date));
          setToDate(dayjs(to_date));
        }

      };
      let filteredRows = rows;
      // .filter(row => {
      //   return (
      //     (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      //     (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
      //     (row.mobile && row.mobile.includes(searchTerm)) ||
      //     (row.ConsumerNumber && row.ConsumerNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      //     (row.operator_name && row.operator_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      //     (row.recharge_status && row.recharge_status.includes(searchTerm)) ||
      //     (row.reference_no && row.reference_no.includes(searchTerm)) ||
      //     (row.trax_id && row.trax_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      //     (row.transaction_id && row.transaction_id.includes(searchTerm)) ||
      //     (row.service_name && row.service_name.includes(searchTerm))
      //     // Add conditions for other relevant columns
      //   );
      // });

      // Excel export 
      const [fileName, setFileName] = useState('recharge_report.xlsx');

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
              {loading && (
                  <div className="loader-overlay">
                      <div className="loader-wrapper">
                          <img src="/loader.gif" alt="Loader" width="150" height="150" /><br /> Loading...
                      </div>
                  </div>
              )}
              {loading && <div className="background-overlay" />}
              <Grid item={true} xs={12} >
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item md={3} lg={3} mt={1} onClick={() => handleStatusClick('SUCCESS')}>
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
                                        {report ? `₹ ${report.total_success_amt}` : `0.00`} / {report ? report.total_success_count : 0}
                                    </Box>
                                    <Typography variant="h2" sx={{ padding: 1, fontSize: '18px' }}>Total Sucess Recharge</Typography>
                                </Typography>
                            </Item>
                        </Grid>

                        <Grid item md={3} lg={3} mt={1} onClick={() => handleStatusClick('FAILURE')}>
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
                                      {report ? `₹ ${report.total_failed_amt}` : `0.00`} / {report ? report.total_failed_count : 0}
                                    </Box>
                                    <Typography variant="h2" sx={{ padding: 1, fontSize: '18px' }}>Total Failed Recharge</Typography>
                                </Typography>
                            </Item>
                        </Grid>

                        <Grid item md={3} lg={3} mt={1} onClick={() => handleStatusClick('PROCESS')}>
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
                                        {report ? `₹ ${report.total_process_amt}` : `0.00`} / {report ? report.total_process_count : 0}
                                    </Box>
                                    <Typography variant="h2" sx={{ padding: 1, fontSize: '18px' }}>Total Process Recharge</Typography>
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item md={3} lg={3} mt={1} onClick={() => handleStatusClick('PENDING')}>
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
                                        {report ? `₹ ${report.total_pending_amt}` : `0.00`} / {report ? report.total_pending_count : 0}
                                    </Box>
                                    <Typography variant="h2" sx={{ padding: 1, fontSize: '18px' }}>Total Pending Recharge</Typography>
                                </Typography>
                            </Item>
                        </Grid>
                  </Grid>
                  <Grid className="page-header" item xs={12}>
                      <Grid container spacing={1}>
                          <Grid item xs={10}>
                              <Typography variant="h5">Recharge Report</Typography>
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
                                <InputLabel id="day-wise-label">Day Wise</InputLabel>
                                <Select
                                    labelId="day-wise"
                                    id="day-wise"
                                    value={daySelectedValue}
                                    label="Day Wise"
                                    onChange={dayHandleChange}
                                    sx={{height: '45px'}}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="today">Today</MenuItem>
                                    <MenuItem value="week">This Week</MenuItem>
                                    <MenuItem value="month">This Month</MenuItem>
                                </Select>
                              </FormControl>
                          </Box>
                      </Grid>
                      <Grid item xs={2}>
                          <Box mt={1} mb={1} sx={{width: '100%'}} >
                              <FormControl fullWidth>
                                <InputLabel id="vendor-label">Recharge Vendor</InputLabel>
                                <Select
                                    labelId="vendor"
                                    id="vendor"
                                    value={vendorSelectedValue}
                                    label="Transaction Type"
                                    onChange={vendorHandleChange}
                                    sx={{height: '45px'}}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="1">Payboombiz</MenuItem>
                                    <MenuItem value="2">KK Payment</MenuItem>
                                    <MenuItem value="5">Ipayments</MenuItem>
                                    <MenuItem value="3">Tekdigi</MenuItem>
                                    <MenuItem value="4">Omega</MenuItem>
                                    
                                </Select>
                              </FormControl>
                          </Box>
                      </Grid>
                      
                      <Grid item xs={2}>
                          <Box mt={1} mb={1} sx={{width: '100%'}} >
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Operator</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedValue}
                                    label="Transaction Type"
                                    onChange={handleChange}
                                    sx={{height: '45px'}}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="Airtel">Airtel</MenuItem>
                                    <MenuItem value="Bsnl">Bsnl</MenuItem>
                                    <MenuItem value="Bsnl Special">Bsnl Special</MenuItem>
                                    <MenuItem value="Jio">Jio</MenuItem>
                                    <MenuItem value="Vodafone Idea">Vodafone Idea</MenuItem>
                                    <MenuItem value="Airtel Digital Tv">Airtel Digital Tv</MenuItem>
                                    <MenuItem value="Dish Tv">Dish Tv</MenuItem>
                                    <MenuItem value="Sun Direct">Sun Direct</MenuItem>
                                    <MenuItem value="Tata Play">Tata Play</MenuItem>
                                    <MenuItem value="Videocon D2h">Videocon D2h</MenuItem>
                                    
                                </Select>
                              </FormControl>
                          </Box>
                      </Grid>
                      <Grid item xs={2}>
                          <Box mt={1} mb={1} sx={{width: '100%'}} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={statusSelectedValue}
                                    label="Transaction Type"
                                    onChange={statushandleChange}
                                    sx={{height: '45px'}}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="SUCCESS">SUCCESS</MenuItem>
                                    <MenuItem value="PROCESS">PROCESS</MenuItem>
                                    <MenuItem value="FAILURE">FAILURE</MenuItem>
                                    <MenuItem value="PENDING">PENDING</MenuItem>
                                </Select>
                            </FormControl>
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
            
            <Transactions showServiceTrans={filteredRows} />
        </Layout>


    );
}
export default withAuth(TransactionHistory);

