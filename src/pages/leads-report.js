"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/leads/leads_report";
import { Grid,Paper,TableContainer ,Button, FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField, Typography,Divider,Box} from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import SearchIcon from '@mui/icons-material/Search';
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


function LeadsHistory(props) {
  
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
    const [toDate, setToDate] = React.useState(dayjs(getDate.dateObject));

    const [leadCategory, setLeadCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const [subCategory, setSubCategory] = useState('');
    const [subcategories, setSubCategories] = useState([]);

    const [childCategory, setChildCategory] = useState('');
    const [childcategories, setChildCategories] = useState([]);

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
      
        const getTnx = async () => {
          const newFromDate = fromDate.add(1, 'day');
          const reqData1 = {
            from_date: fromDate.toISOString().split('T')[0],
            to_date: toDate.toISOString().split('T')[0],
          };
          
          try {
            const response = await api.post('/api/leads/get-leads-report', reqData1);
            if (response.status === 200) {

        
              setShowServiceTrans(response.data.data);

            //   console.log(response.data.data);
            }
          } catch (error) {
            if (error?.response?.data?.error) {
              dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
            } else {
              dispatch(callAlert({ message: error.message, type: 'FAILED' }));
            }
          }
        };
        getCategories();
        getTnx();

      }, [fromDate, toDate, dispatch]);

      // const handleFromDateChange = (date) => {
      //   setFromDate(date);
      // };
    
      // const handleToDateChange = (date) => {
      //   setToDate(date);
      // };

      const handleChange = (event, newValue) => {
        setLeadCategory(newValue);
        handleChangeEvent('sub',newValue.id);
        apihandleChangeEvent(newValue.id);
      };
  
      const subhandleChange = (event, newValue) => {
        setSubCategory(newValue);
        handleChangeEvent('child', newValue.id);
        apihandleChangeEvent(newValue.id);
      };
  
      const childhandleChange = (event, newValue) => {
        setChildCategory(newValue);
        apihandleChangeEvent(newValue.id);
      };


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

      // const handleChangeEvent = async (category_id) => {

      //   const requestData = {
      //     category_id: category_id,
      //   };

      //   try {
         
      //       const response = await api.post('/api/leads/get-leads-report', requestData);
              
      //       if (response.data.status === 200) {
      //         setShowServiceTrans(response.data.data);
             
      //       }

      //   } catch (error) {
      //     if (error?.response?.data?.error) {
      //       alert(error.response.data.error);
      //     } else {
      //       alert(error.message);
      //     }
           
      //   }
       
       
      // };

      const handleChangeEvent = async (type, category_id) => {

        const all_parameters = {
          "category_id": category_id
        }
  
        const encryptedData = DataEncrypt(JSON.stringify(all_parameters));
        const reqData = {
          encReq: encryptedData
        };
  
        try {
         
            const response = await api.post('/api/leads/get-child-category', reqData);
              
            if (response.status === 200) {
              const decryptedObject = DataDecrypt(response.data);
              if(type=='sub')
              {
                setSubCategories(decryptedObject.data);
              }else{
                setChildCategories(decryptedObject.data);
              }
              
             
            }
  
        } catch (error) {
          if (error?.response?.data?.error) {
            alert(error.response.data.error);
          } else {
            alert(error.message);
          }
           
        }
       
       
      };

      const [searchTerm, setSearchTerm] = useState('');

      const filteredRows = rows.filter(row => {
        return (
          (row.lead_name && row.lead_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.category_name && row.category_name.includes(searchTerm)) 
          // Add conditions for other relevant columns
        );
    });

    
    return (

        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            
            <Grid item={true} xs={12}   >
              <TableContainer component={Paper} >

                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '20%', verticalAlign: 'top'}} >
                    <Typography variant="h5"  sx={{ padding: 2 }}>Product [List]</Typography>
                </Box>

              
                
                {/* <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} ml={1} mb={0} style={{width: '20%', verticalAlign: 'middle'}} >

                      {/* <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Category</InputLabel>
                              <Select
                                  labelId="transaction-type-label"
                                  id="transaction-type"
                                  variant="outlined"
                                  value={leadCategory}
                                  label="Lead Type"
                                  onChange={handleChange}
                              >
                                  <MenuItem value="">Please Select</MenuItem>
                                  
                                      {categories.map((category) => (

                                          
                                  <MenuItem key={category.id} value={category.id}>
                                  {category.category_name}
                                  </MenuItem>
                                  ))}

                              </Select>
                      </FormControl> */}
                      {/* <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(category) => category ? category.category_name : ''}
                            value={leadCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                          />
                          
                        </FormControl> 

                      </Box> */}
                      <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '180px', verticalAlign: 'top', padding: '0 10px'}} >

                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label"></InputLabel>
                              <Autocomplete
                                id="category-autocomplete"
                                options={categories}
                                getOptionLabel={(category) => category ? category.category_name : ''}
                                value={leadCategory}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} label="Primary Category" variant="outlined" />}
                              />
                              
                            </FormControl>

                            </Box>

                            <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '180px', verticalAlign: 'top', padding: '0 10px'}} >

                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label"></InputLabel>
                              <Autocomplete
                                id="category-autocomplete"
                                options={subcategories}
                                getOptionLabel={(category) => category ? category.category_name : ''}
                                value={subCategory}
                                onChange={subhandleChange}
                                renderInput={(params) => <TextField {...params} label="Sub Category" variant="outlined" />}
                              />
                              
                            </FormControl>

                            </Box>

                            <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '180px', verticalAlign: 'top', padding: '0 10px'}} >

                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label"></InputLabel>
                              <Autocomplete
                                id="category-autocomplete"
                                options={childcategories}
                                getOptionLabel={(category) => category ? category.category_name : ''}
                                value={childCategory}
                                onChange={childhandleChange}
                                renderInput={(params) => <TextField {...params} label="Child Category" variant="outlined" />}
                              />
                              
                            </FormControl>

                            </Box>

                {/* <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} sx={{ width: '20%', verticalAlign: 'top', padding: '0 20px' }}>
                  <TextField id="standard-basic" placeholder="Search" variant="standard" mt={2} style={{width: '100%'}}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                      startAdornment: (
                          <SearchIcon />
                      ),
                    }}/>
                </Box> */}
                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'}  mt={2} mr={1}  sx={{ width: '15%' , float: 'right',verticalAlign: 'top' }} >

                          <Button variant="contained"  href={`/add-new-lead/`}> Add Product</Button>
                  </Box>

                  <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'}  mt={2} mr={1}  sx={{ width: '15%' , float: 'right',verticalAlign: 'top' }} >

<Button variant="contained"  href={`/add-new-lead-category/`}> Add category</Button>
</Box>
                    {/* <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={1} sx={{ verticalAlign: 'top' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div>
                        
                        <DatePicker 
                            value={fromDate}
                            sx={{ padding: 1, lineHeight: 20 }}
                            format="DD-MM-YYYY"
                            onChange={handleFromDateChange}
                            />
                    
                        <DatePicker 
                            value={toDate}
                            sx={{ padding: 1, lineHeight: 20 }}
                            format="DD-MM-YYYY"
                            onChange={handleToDateChange}
                            />
                            
                        </div>
                        
                        </LocalizationProvider>
                        
                            
                        </Box> */}

                    
                        </TableContainer>
            </Grid>
            
            </Grid>
            
            <Transactions showServiceTrans={filteredRows} />
        </Layout>


    );
}
export default withAuth(LeadsHistory);

