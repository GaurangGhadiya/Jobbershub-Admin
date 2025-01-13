"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import LeadTrackDetailsTransactions from "@/components/leads/LeadsTrackDetailsReport";
import { Grid,Paper,TableContainer ,Button} from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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


function LeadsTrackDetailsHistory(props) {
  
    const [showServiceTrans, setShowServiceTrans] = useState({});
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
    const [toDate, setToDate] = React.useState(dayjs(getDate.dateObject));

    useEffect(() => {
        const getTnx = async () => {
          const newFromDate = fromDate.add(1, 'day');
          const reqData = {
            from_date: newFromDate.toISOString().split('T')[0],
            to_date: toDate.toISOString().split('T')[0],
          };
          
          try {
            const response = await api.post('/api/leads/get-track-lead-user-report', reqData);
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
    
        if (fromDate||toDate ) {
          getTnx();
        }
      }, [ fromDate, toDate, dispatch]);

      const handleFromDateChange = (date) => {
        setFromDate(date);
      };
    
      const handleToDateChange = (date) => {
        setToDate(date);
      };

      const [searchTerm, setSearchTerm] = useState('');

      const filteredRows = rows.filter(row => {
        return (
          (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
          (row.mobile && row.mobile.includes(searchTerm)) ||
          (row.email && row.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.ref_first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.ref_mlm_id && row.mlm_id.includes(searchTerm)) ||
          (row.ref_mobile && row.mobile.includes(searchTerm)) ||
          (row.ref_email && row.email.toLowerCase().includes(searchTerm.toLowerCase()))
          // Add conditions for other relevant columns
        );
    });
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
                        <Typography variant="h5"  >Leads User Track Details Report</Typography>
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
                    </Grid>
                </Grid>
            </Grid>
          </Grid>
          
          <LeadTrackDetailsTransactions showServiceTrans={showServiceTrans} />
        </Layout>


    );
}
export default withAuth(LeadsTrackDetailsHistory);

