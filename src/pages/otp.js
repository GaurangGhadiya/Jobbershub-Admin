"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import Layout from "@/components/Dashboard/layout";
import OtpTransactions from "@/components/Otp/Otp";

import { Grid, TableContainer, Paper, Typography, Divider, Box, TextField } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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


function OtpReport(props) {
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const dispatch = useDispatch();
    const uid = Cookies.get('uid');

        const [fromDate, setFromDate] = React.useState(dayjs(getDate.date));
      const [toDate, setToDate] = React.useState(dayjs(getDate.date));

    useEffect(() => {
        const getTnx = async () => {
            // const reqData = {
            //     from_date: fromDate.toISOString().split('T')[0],
            //     to_date: toDate.toISOString().split('T')[0],
            // }

            try {

                const response = await api.post("/api/report/otp");
                if (response.status === 200) {
                    setShowServiceTrans(response.data)
                }

            } catch (error) {

                // if (error?.response?.data?.error) {
                //     dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }))
                // } else {
                //     dispatch(callAlert({ message: error.message, type: 'FAILED' }))
                // }

            }
        }

        if (fromDate || toDate) {
            getTnx();
        }

    }, [fromDate, toDate, dispatch])

    const handleFromDateChange = (date) => {
        setFromDate(date);
      };
    
      const handleToDateChange = (date) => {
        setToDate(date);
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
                            <Typography variant="h5"  >Otp Report</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '25%', verticalAlign: 'top' }}>
                <TextField id="standard-basic" placeholder="Search" variant="standard" mt={2} style={{width: '100%'}}
                
                InputProps={{
                    startAdornment: (
                        <SearchIcon />
                    ),
                  }}/>
                        </Box> */}
            
             </Grid>
            
            </Grid>
            <OtpTransactions showServiceTrans={showServiceTrans} />
        </Layout>


    );
}
export default withAuth(OtpReport);

