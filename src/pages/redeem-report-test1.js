"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import RedeemTransactions from "@/components/RedeemReport/RedeemReport";
import { Grid, TableContainer, Paper, Typography, Box, TextField,Button, FormControl, InputLabel , Select,MenuItem  } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx';
import GetAppIcon from '@mui/icons-material/GetApp';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const drawWidth = 220;

// const getDate = (timeZone) => {
//     const dateString = timeZone;
//     const dateObject = new Date(dateString);

//     const year = dateObject.getFullYear();
//     const month = String(dateObject.getMonth() + 1).padStart(2, "0");
//     const day = String(dateObject.getDate()).padStart(2, "0");
//     const hours = String(dateObject.getHours()).padStart(2, "0");
//     const minutes = String(dateObject.getMinutes()).padStart(2, "0");

//     // Determine if it's AM or PM
//     const amOrPm = hours >= 12 ? "PM" : "AM";

//     // Convert hours to 12-hour format
//     const formattedHours = hours % 12 === 0 ? "12" : String(hours % 12);

//     const formattedDateTime = `${day}-${month}-${year} ${formattedHours}:${minutes} ${amOrPm}`;

//     return formattedDateTime;
// };


function RedeemReport(props) {

    const [showServiceTrans, setShowServiceTrans] = useState({});
    const [report, setReport] = useState(null);
    const [allData, setAllData] = useState([]);

    const dispatch = useDispatch();
    const currentDate = new Date();
    const [fromDate, setFromDate] = useState(dayjs(new Date(2000, 0, 1))); // Set to a far past date
    const [toDate, setToDate] = useState(dayjs(currentDate)); // Current date

    const [selectedValue, setSelectedValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const [nameSearchTerm, setNameSearchTerm] = useState('');
    const [userIdSearchTerm, setUserIdSearchTerm] = useState('');
    const [mobileSearchTerm, setMobileSearchTerm] = useState('');


    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const reqData = {
                from_date: fromDate.toISOString().split('T')[0],
                to_date: toDate.toISOString().split('T')[0],
            };

            try {
                const response = await api.post("/api/report/get-redeem-report", reqData);
                if (response.status === 200) {
                    setShowServiceTrans(response.data.data);
                    setReport(response.data.report);
                }
            } catch (error) {
                dispatch(callAlert({ message: error?.response?.data?.error || error.message, type: 'FAILED' }));
            }
        };

        fetchData();
    }, [fromDate, toDate, dispatch]);




    const handleOKButtonClick = async () => {
        setLoading(true);
        const requestData = {
            filter: selectedValue,
            searchTerm: searchTerm
        };
    
        try {
            const response = await api.post('/api/report/get-redeem-report', requestData);
            if (response.data.status === 200) {
                setLoading(false);
                setShowServiceTrans(response.data.data);
            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false); // Ensure loading state is reset on error
        }
    };

     
const handleDateFilter = () => {
    const filteredData = allData.filter(item => {
        const itemDate = dayjs(item.created_on); // Replace `item.date` with your actual date field
        return itemDate.isSame(fromDate, 'day') || 
               itemDate.isSame(toDate, 'day') || 
               (itemDate.isAfter(fromDate) && itemDate.isBefore(toDate));
    });
    setShowServiceTrans(filteredData);
};


const handleFromDateChange = (date) => {
    setFromDate(date);
    handleDateFilter(); // Filter data when fromDate changes
};

const handleToDateChange = (date) => {
    setToDate(date);
    handleDateFilter(); // Filter data when toDate changes
};

        // Excel export 
        const [fileName, setFileName] = useState('redeem_report.xlsx');

        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(showServiceTrans);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            XLSX.writeFile(workbook, fileName);
        };
        const handleStatusClick = (status) => {
            setSelectedValue(status);
        };
              
   
        const handleChange = (event) => {
            setSelectedValue(event.target.value);
        };

        let filteredRows;

    if (selectedValue !== '') {
        filteredRows = rows.filter(row => row.status !== undefined && row.status === parseInt(selectedValue));
    } else {
        filteredRows = rows.filter(row => {
            const matchesUserId = userIdSearchTerm ? row.mlm_id && row.mlm_id.toString().includes(userIdSearchTerm) : true;
            const matchesName = nameSearchTerm ? row.first_name && row.first_name.toLowerCase().includes(nameSearchTerm.toLowerCase()) : true;
            const matchesMobile = mobileSearchTerm ? row.mobile && row.mobile.toLowerCase().includes(mobileSearchTerm.toLowerCase()) : true;
          
          
            return matchesUserId && matchesName;
        });
    }
        

    return (

        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
                
                <Grid item={true} justifyContent='center' xs={12}  sx={{marginTop:'-20px'}} >

                <Grid item xs={4} display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={1} ml={25} mr={14} style={{width: '19%', verticalAlign: 'top'}} onClick={() => handleStatusClick('1')}>
    <Item
        sx={{
            height: 100,
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid #0000FF',
            borderRadius: '10px',
            cursor: 'pointer', // Indicate that this is clickable
        }}
    >
        <Typography variant="h6" component="div">
            <Box
                sx={{
                    display: 'inline',
                    color: '#FFA500', // Orange
                }}
            >
                {report ? report.total_approve_amt : 0} 
            </Box>
            <Typography variant="h2" sx={{ padding: 1, fontSize: '22px' }}>Total Approve Amount</Typography>
        </Typography>
    </Item>
</Grid>

<Grid item xs={4} display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={1} mr={14} style={{width: '17%', verticalAlign: 'top'}} onClick={() => handleStatusClick('0')}>
    <Item
        sx={{
            height: 100,
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid #0000FF',
            borderRadius: '10px',
            cursor: 'pointer',
        }}
    >
        <Typography variant="h6" component="div">
            <Box
                sx={{
                    display: 'inline',
                    color: '#FFA500', // Orange
                }}
            >
                {report ? report.total_pending_amt : 0} 
            </Box>
            <Typography variant="h2" sx={{ padding: 1, fontSize: '22px' }}>Total Pending Amount</Typography>
        </Typography>
    </Item>
</Grid>

<Grid item xs={4} display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={1} mr={14} style={{width: '19%', verticalAlign: 'top'}} onClick={() => handleStatusClick('2')}>
    <Item
        sx={{
            height: 100,
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid #0000FF',
            borderRadius: '10px',
            cursor: 'pointer',
        }}
    >
        <Typography variant="h6" component="div">
            <Box
                sx={{
                    display: 'inline',
                    color: '#FFA500', // Orange
                }}
            >
                {report ? report.total_rejected_amt : 0} 
            </Box>
            <Typography variant="h2" sx={{ padding: 1, fontSize: '22px' }}>Total Rejected Amount</Typography>
        </Typography>
    </Item>
</Grid>
                   
                </Grid>

            <Grid item={true} xs={12}   >
            <TableContainer component={Paper} >

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '30%', verticalAlign: 'top'}} >
                    <Typography variant="h5"  sx={{ padding: 2 }}>Withdraw History Report</Typography>
                </Box>

                {/* <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '20%', verticalAlign: 'top' }}>
                    <TextField id="standard-basic" placeholder="Search" variant="standard" mt={2} style={{width: '100%'}}
                    
                    InputProps={{
                        startAdornment: (
                            <SearchIcon />
                        ),
                    }}/>
                </Box> */}

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '180px', verticalAlign: 'top', padding: '0 10px'}} >
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedValue}
            label="Status"
            onChange={handleChange}
        >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="0">Pending</MenuItem>
            <MenuItem value="1">Approved</MenuItem>
            <MenuItem value="2">Rejected</MenuItem>
        </Select>
    </FormControl>
</Box>

            
                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={1} sx={{ verticalAlign: 'top' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoContainer  ml={2} components={['DatePicker', 'DatePicker']}  > */}
                    <div>
                    
                    <DatePicker 
                        label="From Date"
                        //value={fromDate}
                        sx={{ padding: 1, lineHeight: 20 }}
                        format="DD-MM-YYYY"
                        onChange={handleFromDateChange}
                        />
                
                    <DatePicker 
                        label="To Date"
                       // value={toDate}
                        sx={{ padding: 1, lineHeight: 20 }}
                        format="DD-MM-YYYY"
                        onChange={handleToDateChange}
                        />
                        
                    </div>
                    {/* </DemoContainer> */}
                    
                    </LocalizationProvider>
                    
                        
                    </Box>

                    {/* <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '15%', verticalAlign: 'top', padding: '0 10px'}} >

<FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Filter</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        label="Transaction Type"
        onChange={handleChange}
    >
        <MenuItem value="">Default</MenuItem>
        <MenuItem value="mlm_id">member Id</MenuItem>
        <MenuItem value="first_name">Name</MenuItem>
        <MenuItem value="mobile">Mobile</MenuItem>
       
    </Select>
</FormControl>

</Box>

*/}

{/* 
<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top' , marginLeft:'28px'}}>
<TextField id="standard-basic" placeholder="Search" variant="standard" mt={2} style={{width: '100%'}}
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
InputProps={{
startAdornment: (
    <SearchIcon />
),
}}/>
</Box> */}


{/* 
<Box display={'inline-block'} justifyContent={'space-between'}  mt={3} mb={1} sx={{ width: '10%', verticalAlign: 'top' , marginLeft:'28px'}}>
<Button variant="contained" size="small" color="primary" onClick={handleOKButtonClick} >Search</Button>
</Box> */}

<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                    <TextField id="user-id-search" placeholder="Search User ID" variant="standard" mt={2} style={{ width: '100%' }}
                        value={userIdSearchTerm}
                        onChange={(e) => setUserIdSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                        }} />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                    <TextField id="name-search" placeholder="Search Name" variant="standard" mt={2} style={{ width: '100%' }}
                        value={nameSearchTerm}
                        onChange={(e) => setNameSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                        }} />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                    <TextField id="mobile-search" placeholder="Search Mobile" variant="standard" mt={2} style={{ width: '100%' }}
                        value={mobileSearchTerm}
                        onChange={(e) => setMobileSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                        }} />
                </Box>

                {/* ... existing Button for Search remains unchanged */}
                <Box display={'inline-block'} justifyContent={'space-between'} mt={3} mb={1} sx={{ width: '10%', verticalAlign: 'top', marginLeft: '28px' }}>
                    <Button variant="contained" size="small" color="primary" onClick={handleOKButtonClick}>Search</Button>
                </Box>


                    
                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={2} mb={1} sx={{ verticalAlign: 'middle' }}>
                    <Button onClick={exportToExcel} variant="contained" color="primary">
                        <GetAppIcon/> EXCEL
                    </Button>
                    </Box>
                </TableContainer>
            </Grid>
            
            </Grid>
            <RedeemTransactions showServiceTrans={filteredRows} exportToExcel={exportToExcel}/>
        </Layout>


    );
}
export default withAuth(RedeemReport);

