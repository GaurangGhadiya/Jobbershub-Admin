"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import KycTransactions from "@/components/KycReport/KycReport";
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

function KycReport(props) {
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

                const response = await api.post("/api/users/get-kyc-report", reqData);
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
              (row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
              (row.mobile && row.mobile.includes(searchTerm))||
              (row.pan_number && row.pan_number===searchTerm) ||
            (row.aadhar_number && row.aadhar_number===searchTerm) ||
            (row.account_number && row.account_number===searchTerm)  ||
              (row.ifsc_code && row.ifsc_code===searchTerm) ||
              (row.nominee_name && row.nominee_name.includes(searchTerm)) ||
              (row.nominee_relation && row.nominee_relation.includes(searchTerm)) ||
              (row.nominee_aadhaar_no && row.nominee_aadhaar_no.includes(searchTerm)) ||
              (row.nominee_pan_no && row.nominee_pan_no.includes(searchTerm)) ||
              (row.nominee_account_no && row.nominee_account_no.includes(searchTerm)) ||
              (row.nominee_bank_name && row.nominee_bank_name.includes(searchTerm)) ||
              (row.nominee_ifsc_code && row.nominee_ifsc_code.includes(searchTerm)) ||
              (row.nominee_branch_name && row.nominee_branch_name.includes(searchTerm))
              // Add conditions for other relevant columns
              );
          });
      }

      // Excel export 
      const [fileName, setFileName] = useState('kyc_report.xlsx');

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
            
                <Grid item={true} xs={12}   >
                    <Grid className="page-header" item xs={12}>
                      <Grid container spacing={1}>
                          <Grid item xs={10}>
                              <Typography variant="h5">KYC Report</Typography>
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
            <KycTransactions showServiceTrans={filteredRows} exportToExcel={exportToExcel}/>
        </Layout>


    );
}
export default withAuth(KycReport);

