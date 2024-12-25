"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/leads/category";
import { Grid,Paper,TableContainer,Button, Typography,Divider,Box,TextField } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { DataEncrypt, DataDecrypt } from '../../utils/encryption';

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
  
    const [fromDate, setFromDate] = React.useState(dayjs(getDate.dateObject));
    const [toDate, setToDate] = React.useState(dayjs(getDate.dateObject));

    useEffect(() => {
        const all_parameters = {
            "category_name1": null
        }
        const encryptedData = DataEncrypt(JSON.stringify(all_parameters));
        const getTnx = async () => {
          const reqData = {
            encReq: encryptedData
          };
          
          try {
            const response = await api.post('/api/leads/get-category', reqData);
            if (response.status === 200) {
              const decryptedObject = DataDecrypt(response.data);
              console.log(decryptedObject);
              setShowServiceTrans(decryptedObject.data);
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
          (row.category_name && row.category_name.toLowerCase().includes(searchTerm.toLowerCase())) 
          // Add conditions for other relevant columns
        );
    });
    return (

        <Layout>
            <Grid
                container
                spacing={4}
            >
            <Grid item={true} xs={12}>
                <Grid className="page-header" item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <Typography variant="h5">Product Categories</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button href={`/add-new-lead-category/`} variant="contained" className="white-button">+ Create Product</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={9}></Grid>
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
            
            <Transactions showServiceTrans={filteredRows} />
        </Layout>


    );
}
export default withAuth(TransactionHistory);

