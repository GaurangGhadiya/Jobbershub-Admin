"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import BrochureTransactions from "@/components/Brochure/BrochureList";
import { Grid,Paper,TableContainer,Button, Typography,Divider,Box,TextField } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { DataEncrypt, DataDecrypt } from '../../utils/encryption';
import { LocalFireDepartment } from "@mui/icons-material";

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
        // const all_parameters = {
        //     "category_name1": null
        // }
        // const encryptedData = DataEncrypt(JSON.stringify(all_parameters));
        const getTnx = async () => {
          // const reqData = {
          //   from_date: fromDate.toISOString().split('T')[0],
          //   to_date: toDate.toISOString().split('T')[0],
          // }
          try {
            const response = await api.post('/api/miscellaneous/get-brochure-list');
            if (response.status === 200) {
            //   const decryptedObject = DataDecrypt(response.data);
              setShowServiceTrans(response.data.data);
              // console.log(response.data.data);
            }
          } catch (error) {
            if (error?.response?.data?.error) {
              dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
            } else {
              dispatch(callAlert({ message: error.message, type: 'FAILED' }));
            }
          }
        };
    
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

    

      let filteredRows;
     
      // if(selectedValue != ''){
      //     filteredRows = rows.filter(row => {
      //         return (
      //           (row.status !== undefined && row.status === parseInt(selectedValue))
      //         );
      //     });
      // }else{
          filteredRows = rows.filter(row => {
              return (
                (row.brochure_name && row.brochure_name.toLowerCase().includes(searchTerm.toLowerCase()))
              );
          });
      // }

    return (

        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            
            <Grid item={true} xs={12}   >
              <TableContainer component={Paper} >
                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '60%', verticalAlign: 'top'}} >
                    <Typography variant="h5"  sx={{ padding: 2 }}>Brochure</Typography>
                </Box>
                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '20%', verticalAlign: 'top' }}>
                  <TextField id="standard-basic" placeholder="Search" variant="standard" mt={3} style={{width: '100%'}}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                      startAdornment: (
                          <SearchIcon />
                      ),
                    }}/>
                </Box>
                {/* <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={1} sx={{ verticalAlign: 'top' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        
                        <DatePicker 
                            //label="From Date"
                            value={fromDate}
                            sx={{ padding: 1, lineHeight: 20 }}
                            format="DD-MM-YYYY"
                            onChange={handleFromDateChange}
                            />
                    
                        <DatePicker 
                            //label="To Date"
                            value={toDate}
                            sx={{ padding: 1, lineHeight: 20 }}
                            format="DD-MM-YYYY"
                            onChange={handleToDateChange}
                            />
                            
                       
                        
                        
                        </LocalizationProvider>
                        
                            
                        </Box> */}
            
                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={2} mb={1} sx={{ verticalAlign: 'middle' }}>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: '5px' }}
                        startIcon={<AddIcon />}
                        href={`/add-brochure/`}
                    >
                       Add Brochure 
                    </Button>   
                    </Box>
                        </TableContainer>
            </Grid>
            
            </Grid>
            
            <BrochureTransactions showServiceTrans={filteredRows} />
        </Layout>


    );
}
export default withAuth(TransactionHistory);

