"use client"
import React, { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
// import Head from "next/head";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/Employee/employee";
import { Grid, Button,TableContainer, Paper, Typography, Divider, Box, TextField, Select, MenuItem, FormControl,InputLabel } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';


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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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

    const router = useRouter();
    const role = Cookies.get('employee_role');

    const  {id, action}  = router.query;
    
    useEffect(() => {
        const getMenus = JSON.parse(localStorage.getItem('menu'));
        const page_url = 'employee-list';
        let foundMenu = false;
        
        if(role === 'Admin')
        {
            for (const item of getMenus) {
                if (item.menu_url === page_url && item._list == 1) {
                    foundMenu = true;
                    break; 
                }
            }
        }
        // if (!foundMenu) {
        //     window.location.href = '/dashboard'; 
        // }
    }, [role, action]);


    useEffect(() => {
        const getTnx = async () => {

            try {

                const response = await api.post("/api/employee/get-employee-list");
                
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

        getTnx();

    }, [dispatch]);

      const [selectedValue, setSelectedValue] = useState('');

        const handleChange = (event) => {
            
            setSelectedValue(event.target.value);
        };
        let filteredRows;
    
        if(selectedValue != ''){
            filteredRows = rows.filter(row => {
                return (
                  (row.sub_type && row.sub_type.toLowerCase().includes(selectedValue.toLowerCase()))
                );
            });
        }else{
            filteredRows = rows.filter(row => {
                return (
                (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
                (row.mobile && row.mobile.includes(searchTerm)) ||
                (row.email && row.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (row.employee_code && row.employee_code.toLowerCase().includes(searchTerm.toLowerCase()))
                
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

                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '60%', verticalAlign: 'top'}} >
                        <Typography variant="h5"  sx={{ padding: 2 }}>Staff List</Typography>
                    </Box>
                
                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '25%', verticalAlign: 'top' }}>
                        <TextField id="standard-basic" placeholder="Search" variant="standard" mt={2} style={{width: '100%'}}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                        }}/>
                    </Box>

                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={2} mb={1} sx={{ verticalAlign: 'middle' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* <DemoContainer  ml={2} components={['DatePicker', 'DatePicker']}  > */}

                        </LocalizationProvider>
                        
                            <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            href={`/add-new-employee/`}
                        >
                            Add New
                        </Button>   
                    </Box>

                            
                    
                </TableContainer>
            </Grid>
            
            </Grid>
                <Transactions showServiceTrans={filteredRows} />
        </Layout>

    );
}
export default withAuth(TransactionHistory);

