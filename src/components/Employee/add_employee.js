import { Box, Button,Divider,TextField,InputLabel,Select,MenuItem, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DataEncrypt, DataDecrypt } from '../../../utils/encryption';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FormControl from '@mui/material/FormControl';
import { useRouter } from 'next/router';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



const AddEmployeeTransactions = () => {


    const router = useRouter();
    const  {id, action}  = router.query;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 10,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 10,
  });
  
    const currentDate = new Date();
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = React.useState(dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)));
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [education, setEducation] = useState('');
    const [roles, setRoles] = useState([]);

    const handleChange = (event) => {   
        setRole(event.target.value);
    };

    const genderhandleChange = (event) => {   
        setGender(event.target.value);
    };

    const handleCancel = async () => {
        window.history.back();
    };

    const handleDateChange = (date) => {
        setDob(date);
      };
    
    useEffect(() => {

        const getRoles = async () => {
          try {
            const response = await api.get("/api/employee/get-roles");
            if (response.status === 200) {
              setRoles(response.data.data);
           
            }
          } catch (error) {
            console.error("Error fetching roles:", error);
          }
        };
        
        if(action=='edit')
        {
            
            const getEmployee = async () => {
                try {
                    const reqData = {
                        'employee_id': id
                    }
                const response = await api.post("/api/employee/get-employee", reqData);
                if (response.status === 200) {
                        const resData = response.data.data;
                        setRole(resData.role_id);
                        setName(resData.first_name);
                        setMobile(resData.mobile);
                        setGender(resData.gender);
                        setDob(dayjs(resData.dob));
                        setEmail(resData.email);
                        setCity(resData.city);
                        setDistrict(resData.district);
                        setState(resData.state);
                        setAddress(resData.address);
                        setPincode(resData.pincode);
                        setEducation(resData.education);
                }
                } catch (error) {
                console.error("Error fetching roles:", error);
                }
            };
            getEmployee();
        }
          

          
        getRoles();
      }, [action,id]);


      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            alert('Name is required!');
            return;
        }
        if (!mobile) {
            alert('Mobile is required!');
            return;
        }
        if (!email) {
            alert('Email is required!');
            return;
        }
        if (!address) {
            alert('Address is required!');
            return;
        }
        if (!city) {
            alert('City is required!');
            return;
        }
        if (!district) {
            alert('District is required!');
            return;
        }
        if (!state) {
            alert('State is required!');
            return;
        }
        if (!gender) {
            alert('Please select Gender');
            return;
        }
        if (!role) {
            alert('Please select Role');
            return;
        }
        if (!pincode) {
            alert('Pincode is required!');
            return;
        }
        if (!education) {
            alert('Education is required!');
            return;
        }


        const formData ={
          'first_name': name,
          'dob': dob.toISOString().split('T')[0],
          'mobile_no':mobile,
          'email':email,
          'address':address.replace(/'/g, "\\'"),
          'city':city,
          'district':district,
          'state': state,
          'gender': gender,
          'role_id': role,
          'pincode': pincode,
          'education': education
        }
       
      try {

       //console.log(formData);
        let response = [];

        if(action=='edit'){
            formData.employee_id = id;
            response = await api.post('/api/employee/edit-employee', formData);
        }else{
            response = await api.post('/api/employee/add-employee', formData);
        }
         
        if (response.status==200) {
          window.history.back();
          alert('Employee created successfully');
        } else {
          alert(response.data.error);
          console.error('Failed to save');
        }

      } catch (error) {
        console.error('Error:', error);
      }
      
    };
     

    return (

        <main className="p-6 space-y-6">
          
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            
            <Grid item={true} xs={12}   >
                <TableContainer component={Paper} >

                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '30%', verticalAlign: 'top'}} >
                        <Typography variant="h5"  sx={{ padding: 2 }}>{action == 'edit'? 'Edit Employee': 'Add New Employee'}</Typography>
                    </Box>

                    <Grid spacing={2}   sx={{ padding: 2 }} container>

                        <Table aria-label="employee" sx={{ size: 2 }} mt={2} >
                            <TableBody>
                                <TableRow>
                                    <TableCell><TextField required size="normal"
                                                fullWidth label="Name" 
                                                variant="outlined" display={'inline-block'}
                                                value={name} 
                                                onChange={(e) => setName(e.target.value)}  />
                                    </TableCell>
                                    <TableCell><TextField required size="normal"
                                                fullWidth label="Mobile" 
                                                variant="outlined" display={'inline-block'}
                                                value={mobile} 
                                                onChange={(e) => setMobile(e.target.value)} 
                                                InputProps={{
                                                    minLength: 10, // Minimum length
                                                    maxLength: 10, // Maximum length
                                                  }} />

                                    </TableCell>
                                    <TableCell>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker 
                                                required
                                                label="Date of Birth"
                                                value={dob}
                                                sx={{ padding: 1, lineHeight: 20 }}
                                                format="DD-MM-YYYY"
                                                onChange={handleDateChange}
                                                />
                                                </LocalizationProvider>
                                    </TableCell>
                                    
                                </TableRow>
                                <TableRow>
                                    <TableCell><TextField required size="normal"
                                                fullWidth label="Email" 
                                                variant="outlined" display={'inline-block'}
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)}  />


                                    </TableCell>
                                    <TableCell><FormControl required fullWidth>
                                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                            <Select
                                                
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={gender}
                                                label="Transaction Type"
                                                onChange={genderhandleChange}
                                            >
                                                <MenuItem value="">Please Select</MenuItem>
                                                <MenuItem value="Male">Male</MenuItem>
                                                <MenuItem value="Female">Female</MenuItem>
                                                <MenuItem value="Transgender">Transgender</MenuItem>
                                            </Select>
                                        </FormControl>

                                    </TableCell>
                                    <TableCell>
                                        <FormControl required fullWidth>
                                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                            <Select
                                                
                                                labelId="transaction-type-label"
                                                id="transaction-type"
                                                variant="outlined"
                                                value={role}
                                                label="Lead Type"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">Please Select</MenuItem>
                                                
                                                    {roles.map((role) => (

                                                        
                                                <MenuItem key={role.id} value={role.id}>
                                                {role.role_name}
                                                </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><TextField required size="normal"
                                                fullWidth label="City" 
                                                variant="outlined" display={'inline-block'}
                                                value={city} 
                                                onChange={(e) => setCity(e.target.value)}
                                                 />

                                    </TableCell>
                                    <TableCell><TextField required size="normal"
                                                fullWidth label="District" 
                                                variant="outlined" display={'inline-block'}
                                                value={district} 
                                                onChange={(e) => setDistrict(e.target.value)}  />

                                    </TableCell>
                                    <TableCell><TextField required size="normal"
                                                fullWidth label="State" 
                                                variant="outlined" display={'inline-block'}
                                                value={state} 
                                                onChange={(e) => setState(e.target.value)}  />

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><TextField required size="normal"
                                                fullWidth label="Pincode" 
                                                variant="outlined" display={'inline-block'}
                                                value={pincode} 
                                                onChange={(e) => setPincode(e.target.value)} 
                                                InputProps={{
                                                    minLength: 7, // Minimum length
                                                    maxLength: 7, // Maximum length
                                                  }}
                                                />

                                    </TableCell>
                                    <TableCell><TextareaAutosize  required fullWidth
                                            label="Education" 
                                            minRows={1}
                                            size="normal"
                                            variant="outlined"
                                            placeholder="Education" 
                                            style={{height: '90px', width:'100%', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                            value={education}
                                            onChange={(e) => setEducation(e.target.value)}
                                        /> 
                                        

                                    </TableCell>
                                    <TableCell>
                                        <TextareaAutosize required fullWidth
                                            label="Address" 
                                            minRows={1}
                                            size="normal"
                                            variant="outlined"
                                            placeholder="Address" 
                                            style={{height: '90px', width:'100%', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        /> 
                                    </TableCell>
                                </TableRow>
                                
                            </TableBody>
                        </Table>                      
                    </Grid>
           
                    <Grid item>
                            <Box display="flex" justifyContent="flex-start" mr={2}  mt={1} ml={2} mb={1} >
                                <Button variant="contained" color="primary" style={{ marginRight: '8px' }} size="medium" onClick={handleSubmit}>
                                Submit
                                </Button>
                                <Button variant="outlined"  onClick={handleCancel} >Cancel</Button>
                            </Box>
                    </Grid>
       
                 </TableContainer>
            </Grid>
            
        </Grid>
              
    </main>
    )
}
export default AddEmployeeTransactions;