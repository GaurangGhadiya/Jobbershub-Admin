"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import { Grid,Paper,TableContainer, FormControl, InputLabel, Select, MenuItem,Button } from "@mui/material";
import { Typography,Divider,Box,TextField} from "@mui/material";
import { useRouter } from 'next/router';

import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

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
  
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const dispatch = useDispatch();
    const router = useRouter();
    const { setting_id } = router.query;

    const [recharge_cutoff_limit, setrecharge_cutoff_limit] = useState('');
    const [service_active_income_rate, setservice_active_income_rate] = useState('');
    const [service_passive_income_rate, setservice_passive_income_rate] = useState('');
    const [main_actve_income_rate, setmain_actve_income_rate] = useState('');
    const [main_passive_income_rate, setmain_passive_income_rate] = useState('');
    const [tds_rate, settds_rate] = useState('');
    const [recharge_panel_cron, setrecharge_panel_cron] = useState('');
    const [growth_support_name, setgrowth_support_name] = useState('');
    const [growth_support_mobile, setgrowth_support_mobile] = useState('');

    const [enable_withdrawal, setenable_withdrawal] = useState('');
    const [withdrawal_startdate, setwithdrawal_startdate] = useState(dayjs());
    const [withdrawal_starttime, setwithdrawal_starttime] = useState(dayjs());
    const [withdrawal_enddate, setwithdrawal_enddate] = useState(dayjs());
    const [withdrawal_endtime, setwithdrawal_endtime] = useState(dayjs());


    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }

    const statushandleChange = (event) => {
      setenable_withdrawal(event.target.value);
  };

  const handleFromDateChange = (date) => {
    setwithdrawal_startdate(date);
  };

  const handleSetTime = (time) => {
       
    setwithdrawal_starttime(time);
  };

  const handleEndDateChange = (date) => {
    setwithdrawal_enddate(date);
  };

  const handleEndSetTime = (time) => {
       
    setwithdrawal_endtime(time);
  };


    useEffect(() => {
        const getTnx = async () => {
          const reqData = {
          };

          // const originalString = 'Hello, World!';
          // const encryptedData = DataEncrypt(JSON.stringify(originalString));
          // console.log(encryptedData);
          // const decryptedObject = DataDecrypt(encryptedData);
          // console.log(decryptedObject);
          try {
            const response = await api.post('/api/setting/get-setting', reqData);
            if (response.status === 200) {
              setShowServiceTrans(response.data.data);
              setrecharge_cutoff_limit(response.data.data[0].recharge_cutoff_limit);

              setservice_active_income_rate(response.data.data[0].service_active_income_rate);
              setservice_passive_income_rate(response.data.data[0].service_passive_income_rate);
              setmain_actve_income_rate(response.data.data[0].main_actve_income_rate);
              setmain_passive_income_rate(response.data.data[0].main_passive_income_rate);
              settds_rate(response.data.data[0].tds_rate);
              setrecharge_panel_cron(response.data.data[0].recharge_panel_cron);
              setgrowth_support_name(response.data.data[0].growth_support_name);
              setgrowth_support_mobile(response.data.data[0].growth_support_mobile);
              setenable_withdrawal(response.data.data[0].enable_withdrawal);
              const withdrawalDate = dayjs(response.data.data[0].withdrawal_startdate);
              const withdrawalEndDate = dayjs(response.data.data[0].withdrawal_enddate);
              setwithdrawal_startdate(withdrawalDate);
              setwithdrawal_starttime(withdrawalDate);
              setwithdrawal_enddate(withdrawalEndDate);
              setwithdrawal_endtime(withdrawalEndDate);
            }
          } catch (error) {
            if (error?.response?.data?.error) {
              dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
            } else {
              dispatch(callAlert({ message: error.message, type: 'FAILED' }));
            }
          }
        };
    
        if (setting_id) {
          getTnx();
        }
      }, [setting_id, dispatch]);

        const handleSubmit = async () => {
            // alert(status);
           
              // const formData = new FormData();
              // formData.append('img', selectedFile);
              // formData.append('title', title);
              // formData.append('categoryId',transactionType);
              const combinedDateTime = withdrawal_startdate.hour(withdrawal_starttime.hour()).minute(withdrawal_starttime.minute());
              const combinedendDateTime = withdrawal_enddate.hour(withdrawal_endtime.hour()).minute(withdrawal_endtime.minute());
              const formData ={
                'recharge_limit': recharge_cutoff_limit,
                'service_active_income_rate': service_active_income_rate,
                'service_passive_income_rate': service_passive_income_rate,
                'main_actve_income_rate': main_actve_income_rate,
                'main_passive_income_rate': main_passive_income_rate,
                'tds_rate': tds_rate,
                'recharge_panel_cron': recharge_panel_cron,
                'growth_support_name': growth_support_name,
                'growth_support_mobile': growth_support_mobile,
                'setting_id': setting_id,
                'enable_withdrawal': enable_withdrawal,
                'withdrawal_startdate': combinedDateTime.toISOString(),
                'withdrawal_enddate': combinedendDateTime.toISOString(),
              }
    
            try {
                const response = await api.post("/api/setting/get-setting", formData);
                
              if (response) {
                window.history.back();
    
                alert('Updated successfully');
              } 
    
            } catch (error) {
              console.error('Error updating :', error);
            }
            
          };
    

    return (

        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            
            <Grid item={true} xs={12}   >
              <TableContainer component={Paper} >
                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '40%', verticalAlign: 'top'}} >
                    <Typography variant="h5"  sx={{ padding: 2 }}>System Setting [Update]</Typography>
                </Box>
                </TableContainer>
            </Grid>
            
            
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} >

                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Recharge Cutoff Limit" variant="outlined" display={'inline-block'}
                            value={recharge_cutoff_limit} onChange={(e) => setrecharge_cutoff_limit(e.target.value)}  />
                        </Box>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Service Active Income Rate" variant="outlined" display={'inline-block'}
                            value={service_active_income_rate} onChange={(e) => setservice_active_income_rate(e.target.value)}  />
                        </Box>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Service Passive Income Rate" variant="outlined" display={'inline-block'}
                            value={service_passive_income_rate} onChange={(e) => setservice_passive_income_rate(e.target.value)}  />
                        </Box>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Main Actve Income Rate" variant="outlined" display={'inline-block'}
                            value={main_actve_income_rate} onChange={(e) => setmain_actve_income_rate(e.target.value)}  />
                        </Box>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Main Passive Income Rate" variant="outlined" display={'inline-block'}
                            value={main_passive_income_rate} onChange={(e) => setmain_passive_income_rate(e.target.value)}  />
                        </Box>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="TDS Rate" variant="outlined" display={'inline-block'}
                            value={tds_rate} onChange={(e) => settds_rate(e.target.value)}  />
                        </Box>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Recharge Panel Cron" variant="outlined" display={'inline-block'}
                            value={recharge_panel_cron} onChange={(e) => setrecharge_panel_cron(e.target.value)}  />
                        </Box>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Growth Support Name" variant="outlined" display={'inline-block'}
                            value={growth_support_name} onChange={(e) => setgrowth_support_name(e.target.value)}  />
                        </Box>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Growth Support Mobile" variant="outlined" display={'inline-block'}
                            value={growth_support_mobile} onChange={(e) => setgrowth_support_mobile(e.target.value)}  />
                        </Box>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Withdrawal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={enable_withdrawal}
                                    label="Enable Withdrawal"
                                    onChange={statushandleChange}
                                >
                                    <MenuItem value={1}>Enable</MenuItem>
                                    <MenuItem value={0}>Disable</MenuItem>
                                </Select>
                            </FormControl>
                          </Box>
                          <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div>
                                  <DatePicker 
                                    label="Withdrawal Start Date"
                                    value={withdrawal_startdate}
                                    sx={{ padding: 1, lineHeight: 20 }}
                                    format="YYYY-MM-DD"
                                    onChange={handleFromDateChange}
                                    />

                                  <TimePicker 
                                    label="Withdrawal Start Time" 
                                    value={withdrawal_starttime}
                                    sx={{ padding: 1, lineHeight: 20, width:356 }}
                                    onChange={handleSetTime}
                                    
                                    />
                                </div>
                              </LocalizationProvider>
                          </Box>

                          <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div>
                                  <DatePicker 
                                    label="Withdrawal End Date"
                                    value={withdrawal_enddate}
                                    sx={{ padding: 1, lineHeight: 20 }}
                                    format="YYYY-MM-DD"
                                    onChange={handleEndDateChange}
                                    />

                                  <TimePicker 
                                    label="Withdrawal End Time" 
                                    value={withdrawal_endtime}
                                    sx={{ padding: 1, lineHeight: 20, width:356 }}
                                    onChange={handleEndSetTime}
                                    
                                    />
                                </div>
                              </LocalizationProvider>
                          </Box>
                        <br /><br />
                        <Grid item>
                            <Box display="flex" justifyContent="flex-first" mr={2}  mt={1} ml={2} mb={1} >
                            <Button variant="contained" color="success" size="medium" onClick={handleSubmit}>
                                Update
                            </Button>
                            </Box>   
                        </Grid>
                        <br /><br /><br /><br /><br />
                    </TableContainer>
                </Grid>
            </Grid>
        </Layout>


    );
}
export default withAuth(TransactionHistory);

