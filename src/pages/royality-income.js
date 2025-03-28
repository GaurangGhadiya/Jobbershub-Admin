"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/IncomeReport/royality_income";
import { Grid,Paper,TableContainer } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Steps } from 'antd';
import { Typography,Divider,Box,TextField} from "@mui/material";
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


function TransactionHistory(props) {
  
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
  
    const currentDate = new Date();
    const [fromDate, setFromDate] = React.useState(dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)));
    const [toDate, setToDate] = React.useState(dayjs(getDate.date));

    useEffect(() => {
        const getTnx = async () => {
          const newFromDate = fromDate.add(1, 'day');
          const reqData = {
            from_date: newFromDate.toISOString().split('T')[0],
            to_date: toDate.toISOString().split('T')[0],
          };

          // const originalString = 'Hello, World!';
          // const encryptedData = DataEncrypt(JSON.stringify(originalString));
          // console.log(encryptedData);
          // const decryptedObject = DataDecrypt(encryptedData);
          // console.log(decryptedObject);
          try {
            const response = await api.post('/api/report/royality-income-report', reqData);
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
    
        if (uid) {
          getTnx();
        }
      }, [uid, fromDate, toDate, dispatch]);

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
          (row.last_name && row.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
          (row.mobile && row.mobile.includes(searchTerm)) ||
          (row.email && row.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.royality_rank && row.royality_rank.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.level && row.level.toLowerCase().includes(searchTerm.toLowerCase()))
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
                              <Typography variant="h5"  >Royality Income</Typography>
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

              </Grid>
            
            </Grid>
            
            <Transactions showServiceTrans={filteredRows} />
        </Layout>


    );
}
export default withAuth(TransactionHistory);

