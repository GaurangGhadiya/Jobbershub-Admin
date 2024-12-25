

"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import RedeemTransactions from "@/components/RedeemReport/RedeemReport";
import { Grid, TableContainer, Paper, Typography, Box, TextField,Button, FormControl, InputLabel , Select,MenuItem , CircularProgress, Link } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx';
import GetAppIcon from '@mui/icons-material/GetApp';
import { styled } from '@mui/material/styles';

import dashboard from "@/components/Product/dashboard";
import Transactions from "@/components/leads/leads_report";
import AddSubCategory from '@/components/Product/add_subcategory';  
import AddMainCategory from '@/components/Product/add_maincategory';

import AddChildCategory from '@/components/Product/add_childcategory';

import MainCategory from '@/components/Product/main_category';
import SubCategory from '@/components/Product/sub_category'; // Import your other components similarly
import ChildCategory from '@/components/Product/child_category'
import ParentCategoryTable from "../components/Product/main_category"; 
import SubCategoryTable from "../components/Product/sub_category"; 
import ChildCategoryTable from "../components/Product/child_category"; 
import ProductTable from "../components/leads/leads_report"; 

import { DataEncrypt, DataDecrypt } from '../../utils/encryption';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const drawWidth = 220;




function Dashboard1(props) {

    const [showServiceTrans, setShowServiceTrans] = useState({});
    const [report, setReport] = useState(null);
    const [allData, setAllData] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const [openForm1, setOpenForm1] = useState(false);
    const [openForm2, setOpenForm2] = useState(false);

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

    const [timeRange, setTimeRange] = React.useState('last7days');

    const [openComponent, setOpenComponent] = useState(null);

    const [parentCategories, setParentCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);
    const [products, setProducts] = useState([]); 
    const [activeCategory, setActiveCategory] = useState('products'); 
  

    const handleOpenComponent = (component) => {
        setOpenComponent(component);
    };

    const handleChange = (event) => {
        setTimeRange(event.target.value);
    };


    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }
    const fetchProducts = async () => {
        setLoading(true); 
        try {
          const response = await api.post('/api/leads/get-leads-report');
          if (response.data.status === 200) {
            setProducts(response.data.data);
            console.log("Fetched Products:", response.data.data); 
          } else {
            console.error(response.data.message);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false); 
        }
      };

    //   const fetchCategories = async () => {
    //     try {
    //       const response = await api.post("/api/leads/get-lead-category-list");
    //       if (response.data.status === 200) {
    //         setParentCategories(response.data.data.parentCategory);
    //         setSubCategories(response.data.data.subCategory);
    //         setChildCategories(response.data.data.childCategory);
    //       } else {
    //         console.error(response.data.message);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching categories:", error);
    //     }
    //   };
    
    useEffect(() => {
        const all_parameters = {
          "category_name1": null,
          "parent": "parent"
        }
        const encryptedData = DataEncrypt(JSON.stringify(all_parameters));
        const reqData = {
          encReq: encryptedData
        };
        const getCategories = async () => {
          try {
            const response = await api.post("/api/leads/get-category", reqData);
            if (response.status === 200) {
              const decryptedObject = DataDecrypt(response.data);
              setCategories(decryptedObject.data);
          
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };

         
        
          getCategories();
          fetchProducts();
       //  fetchCategories();
  
      
        }, [fromDate, toDate, dispatch]);
        
        
        const apihandleChangeEvent = async (category_id) => {

            const newFromDate = fromDate.add(1, 'day');
                const reqData = {
                  from_date: newFromDate.toISOString().split('T')[0],
                  to_date: toDate.toISOString().split('T')[0],
                  category_id: category_id
                };
      
                try {
                  const response = await api.post('/api/leads/get-leads-report', reqData);
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

    const handleOKButtonClick = async () => {
        setLoading(true);
        const requestData = {
            filter: selectedValue,
            searchTerm: searchTerm
        };
    
        try {
            const response = await api.post('/api/leads/get-category', requestData);
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
            const itemDate = dayjs(item.created_on); // Ensure this is the correct field
            
            const isAfterFromDate = fromDate ? itemDate.isAfter(dayjs(fromDate), 'day') || itemDate.isSame(dayjs(fromDate), 'day') : true;
            const isBeforeToDate = toDate ? itemDate.isBefore(dayjs(toDate), 'day') || itemDate.isSame(dayjs(toDate), 'day') : true;

            return isAfterFromDate && isBeforeToDate;
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
        const handleStatusClick = (event) => {
            setSelectedValue(event.target.value);
        };
              
   
     

        let filteredRows;

    if (selectedValue !== '') {
        filteredRows = rows.filter(row => row.status !== undefined && row.status === parseInt(selectedValue));
    } else {
        filteredRows = rows.filter(row => {
            const matchesUserId = userIdSearchTerm ? row.mlm_id && row.mlm_id.toString().includes(userIdSearchTerm) : true;
            const matchesName = nameSearchTerm ? row.category_name && row.category_name.toLowerCase().includes(nameSearchTerm.toLowerCase()) : true;
            const matchesMobile = mobileSearchTerm ? row.mobile && row.mobile.toLowerCase().includes(mobileSearchTerm.toLowerCase()) : true;
          
          
            return matchesUserId && matchesName;
        });
    }
        
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    const handleOpenForm1 = () => setOpenForm1(true);
    const handleCloseForm1= () => setOpenForm1(false);

    const handleOpenForm2 = () => setOpenForm2(true);
    const handleCloseForm2= () => setOpenForm2(false);

    return (

        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            

    

                <Grid item={true} justifyContent='center' xs={12}  sx={{marginTop:'-20px'}} >

                    <Grid item xs={12} sx={{ marginBottom: '23px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'inline' }}>
                    <Typography variant="h2" sx={{ padding: 1, fontSize: '24px' }}>Dashboard</Typography>
                </Box>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel id="time-range-select-label">Time Range</InputLabel>
                    <Select
                        labelId="time-range-select-label"
                        value={timeRange}
                        onChange={handleChange}
                        label="Time Range"
                    >
                        <MenuItem value="last7days">Last 7 Days</MenuItem>
                        <MenuItem value="last15days">Last 15 Days</MenuItem>
                        <MenuItem value="1month">1 Month</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

                <Grid item={true} xs={12}   >
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                        <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline', color: '#FFA500',  }} > 0</Box>
                               <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Product</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                            <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Active Product</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Inactive Products</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                          <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Growup Millionaire Employees</Typography>
                            </Typography>
                                                                     
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                              <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Growup E-Learning Employees</Typography>
                            </Typography>
                             
                               
                            </Item>
                    </Grid>
                    
                </Grid>
                   
                <Grid item={true} xs={12}   >
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                        <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline', color: '#FFA500',  }} > 0</Box>
                               <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Quadrillion Employees</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                            <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Terminated Employees</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Employees On Hold</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                          <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Bank Accounts</Typography>
                            </Typography>
                                                                     
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                              <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Credit Cards</Typography>
                            </Typography>
                             
                               
                            </Item>
                    </Grid>
                    
                </Grid>
                   
                <Grid item={true} xs={12}   >
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                        <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline', color: '#FFA500',  }} > 0</Box>
                               <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Salary</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                            <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Insurance</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total BNPL</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                          <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total EMI Cards</Typography>
                            </Typography>
                                                                     
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                              <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total UPI Apps</Typography>
                            </Typography>
                             
                               
                            </Item>
                    </Grid>
                    
                </Grid>
                   

                <Grid item={true} xs={12}   >
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                        <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline', color: '#FFA500',  }} > 0</Box>
                               <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Wealths</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                            <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total Loans</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>Total E-Seva Services</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                          <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>IT Services</Typography>
                            </Typography>
                                                                     
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                              <Typography variant="h6" component="div">
                                <Box sx={{display: 'inline',color: '#FFA500'}}>0</Box>
                                
                                 <Typography variant="h2" sx={{ padding: 1,fontSize: '18px' }}>New/Old Car Selling</Typography>
                            </Typography>
                             
                               
                            </Item>
                    </Grid>
                    
                </Grid>
                   

                </Grid>
                <Grid item xs={12} sx={{ marginBottom: '23px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h2" sx={{ padding: 1, fontSize: '24px', marginRight: '2rem'  }}>Products</Typography>
        {/* <Button variant="outlined" sx={{ marginLeft: '10px'}}>Category</Button> */}
        <Button variant="outlined" sx={{ marginLeft: '10px'}}   onClick={() => setActiveCategory('parent')}>Category</Button>

        <Button variant="contained" sx={{ backgroundColor: 'white', color: 'black', marginLeft: '0.5rem', marginRight: '2rem' }} onClick={handleOpenForm1}>+</Button>
        <Button variant="outlined"  onClick={() => setActiveCategory('sub')}>Sub-Category</Button>
                  
                    
        <Button variant="contained" sx={{ backgroundColor: 'white', color: 'black', marginLeft: '0.5rem', marginRight: '2rem' }} onClick={handleOpenForm}>+</Button>
        <Button variant="outlined"  onClick={() => setActiveCategory('child')}>Child Category</Button>
        <Button variant="contained" sx={{ backgroundColor: 'white', color: 'black', marginLeft: '0.5rem', marginRight: '2rem' }}onClick={handleOpenForm2}>+</Button>

        <Button variant="contained"    onClick={() => {
          setActiveCategory('products');
          fetchProducts();
         
        }} sx={{ marginLeft: '10px', backgroundColor: 'orange' }}>All Products</Button>
        <Link href="/add-new-lead" style={{ textDecoration: 'none' }}>  <Button variant="contained" sx={{ backgroundColor: 'white', color: 'black', marginLeft: '0.5rem' }}>+</Button></Link>
    </Box>
</Grid>






            <Grid item={true} xs={12}   >
            <TableContainer component={Paper} >

           

                {/* <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '20%', verticalAlign: 'top' }}>
                    <TextField id="standard-basic" placeholder="Search" variant="standard" mt={2} style={{width: '100%'}}
                    
                    InputProps={{
                        startAdornment: (
                            <SearchIcon />
                        ),
                    }}/>
                </Box> */}



            
                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={1} sx={{ verticalAlign: 'top', marginTop:'11px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoContainer  ml={2} components={['DatePicker', 'DatePicker']}  > */}
                    <div>
                    
                    <DatePicker
                label="From Date"
                sx={{ padding: 1, lineHeight: 20 }}
                value={fromDate}
                onChange={handleFromDateChange}
                renderInput={(params) => <TextField {...params} sx={{ padding: 1 }} />}
            />
            <DatePicker
                label="To Date"
                sx={{ padding: 1, lineHeight: 20 }}
                value={toDate}
                onChange={handleToDateChange}
                renderInput={(params) => <TextField {...params} sx={{ padding: 1 }} />}
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

<Box display='inline-block' justifyContent='space-between' alignItems='right' mt={1} mb={1} sx={{ width: '180px', verticalAlign: 'top', padding: '0 10px',marginTop:'20px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Main Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedValue}
                                    label="Main Category"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                                    <MenuItem value="Courses">Courses</MenuItem>
                                    <MenuItem value="Demat A/C">Demat A/C</MenuItem>
                                    <MenuItem value="Bank A/C">Bank A/C</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                           
                        <Box display='inline-block' justifyContent='space-between' alignItems='right' mt={1} mb={1} sx={{ width: '180px', verticalAlign: 'top', padding: '0 10px', marginTop:'20px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedValue}
                                    label="Sub Category"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="Recharge">Recharge</MenuItem>
                                    <MenuItem value="Courses">Angel One Demat A/C</MenuItem>
                                    <MenuItem value="Demat A/C">cvimage2</MenuItem>
                                    <MenuItem value="Bank A/C">HDFCSKY</MenuItem>

                                    <MenuItem value="Courses">Digital Marketing Course</MenuItem>
                                    <MenuItem value="Demat A/C">M Stock</MenuItem>
                                    <MenuItem value="Bank A/C">AU Bank Saving Account</MenuItem>

                                    <MenuItem value="Courses">Basics Of Stock Market</MenuItem>
                                    <MenuItem value="Demat A/C">Paytm Money</MenuItem>
                          
                                </Select>
                            </FormControl>
                        </Box>

                   
                        <Box display='inline-block' justifyContent='space-between' alignItems='right' mt={1} mb={1} sx={{ width: '180px', verticalAlign: 'top', padding: '0 10px',marginTop:'20px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">child Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedValue}
                                    label="child Category"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="Recharge">Recharge</MenuItem>
                                    <MenuItem value="Courses">Angel One Demat A/C</MenuItem>
                                    <MenuItem value="Demat A/C">cvimage2</MenuItem>
                                    <MenuItem value="Bank A/C">HDFCSKY</MenuItem>

                                    <MenuItem value="Courses">Digital Marketing Course</MenuItem>
                                    <MenuItem value="Demat A/C">M Stock</MenuItem>
                                    <MenuItem value="Bank A/C">AU Bank Saving Account</MenuItem>

                                    <MenuItem value="Courses">Basics Of Stock Market</MenuItem>
                                    <MenuItem value="Demat A/C">Paytm Money</MenuItem>
                          
                                </Select>
                            </FormControl>
                        </Box>


<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
<TextField 
        id="user-id-search" 
        placeholder="Product Name" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Selling price" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Service provider share" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Service provider number" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Deal amount" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Destribution type" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>



                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Destribution" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>



                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Smart pay reward" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Profit after affiliate distribution" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Other marketing cost" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Employee cost" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Net profit" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '180px',marginTop:'20px', verticalAlign: 'top', padding: '0 10px'}} >
    <FormControl fullWidth  sx={{ padding: 1, }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
           
            value={selectedValue}
            label="Status"
            onChange={handleStatusClick}
        >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="0">InActive</MenuItem>
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="2">Rejected</MenuItem>
        </Select>
    </FormControl>
</Box>

<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '180px', verticalAlign: 'top', padding: '0 10px',marginTop:'20px'}} >
    <FormControl fullWidth sx={{ padding: 1, lineHeight: 20 }}>
        <InputLabel id="demo-simple-select-label">Action</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedValue}
            label="Action"
            onChange={handleChange}
        >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="0">Active </MenuItem>
            <MenuItem value="1">inactive</MenuItem>
            <MenuItem value="2">Rejected</MenuItem>
        </Select>
    </FormControl>
</Box>

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '15%', verticalAlign: 'top', marginLeft: '28px' }}>
                <TextField 
        id="user-id-search" 
        placeholder="Created by" 
        variant="outlined" // Change to outlined to have a border
        style={{ width: '100%' }}
        value={userIdSearchTerm}
        onChange={(e) => setUserIdSearchTerm(e.target.value)}
        InputProps={{
            startAdornment: (
                <SearchIcon />
            ),
        }} 
        sx={{
            border: '1px solid gray', // Add border style
            borderRadius: '4px', // Optional: adjust border radius
        }}
    />
                </Box>

                {/* ... existing Button for Search remains unchanged */}
                <Box display={'inline-block'} justifyContent={'space-between'} mt={3} mb={1} sx={{ width: '10%', verticalAlign: 'top', marginLeft: '28px',marginTop:'35px' }}>
                    <Button variant="contained" size="small" color="primary" onClick={handleOKButtonClick}>Search</Button>
                </Box>


                    
                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={2} mb={1} sx={{ verticalAlign: 'middle', marginLeft: '30px' }}>
                    <Button onClick={exportToExcel} variant="contained" color="primary" >
                        <GetAppIcon/> EXCEL
                    </Button>
                    </Box>
                </TableContainer>
            </Grid>
            
            </Grid>
             {/* <Transactions showServiceTrans={filteredRows} /> */}
             
             
      {loading && <CircularProgress />} 
      
      {activeCategory === 'child' ? (
        <ChildCategoryTable categories={childCategories} />
      ) : activeCategory === 'sub' ? (
        <SubCategoryTable categories={subCategories} />
      ) : activeCategory === 'products' ? (
        <ProductTable showServiceTrans={products} /> 
      ) : (
        <ParentCategoryTable categories={parentCategories} />
      )}

           
{openComponent === 'mainCategory' && <MainCategory />}
{openComponent === 'subCategory' && <SubCategory />}
{openComponent === 'childCategory' && <ChildCategory />}

            <AddSubCategory open={openForm} onClose={handleCloseForm}/>

            <AddMainCategory open={openForm1} onClose={handleCloseForm1}/>

            <AddChildCategory open={openForm2} onClose={handleCloseForm2}/>
        </Layout>


    );
}
export default withAuth(Dashboard1);

