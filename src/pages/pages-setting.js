"use client"
import React, { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import PagesTransactions from "@/components/Pages/contentList";
import { Grid,Button, TableContainer, Paper, Typography, Divider, Box, TextField, Select, MenuItem, FormControl,InputLabel } from "@mui/material";
import dayjs from 'dayjs';
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



function PagesReport(props) {
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
                from_date: newFromDate.toISOString().split('T')[0],
                to_date: toDate.toISOString().split('T')[0],
            }

            try {

                const response = await api.post("/api/page/get-pages-admin");
                
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
                (row.title && row.title.toLowerCase().includes(selectedValue.toLowerCase()))
              );
          });
      }else{
          filteredRows = rows.filter(row => {
              return (
              (row.title && row.title.toLowerCase().includes(searchTerm.toLowerCase())) 
       
              // Add conditions for other relevant columns
              );
          });
      }

    

    return (
        
        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            
            <Grid item={true} xs={12}   >
                <TableContainer component={Paper} >

                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '72%', verticalAlign: 'top'}} >
                        <Typography variant="h5"  sx={{ padding: 2 }}>Pages</Typography>
                    </Box>

                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top' }}>
                        <TextField id="standard-basic" placeholder="Search" variant="standard" mt={2} style={{width: '100%'}}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                        }}/>
                    </Box>
            
              


                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={2}  mb={1}  sx={{ verticalAlign: 'top' }}>
                            <Button variant="contained"  style={{ marginRight: '5px' }} href={`/add-new-page/`}>Add New Content
                            </Button>
                        </Box>
                    
                </TableContainer>
            </Grid>
            
            </Grid>
                <PagesTransactions showServiceTrans={filteredRows} />
        </Layout>

    );
}
export default withAuth(PagesReport);

