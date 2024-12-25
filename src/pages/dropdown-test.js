"use client"
import { Box, Button,Divider,TextField,InputLabel,FormControl, InputAdornment,Select,MenuItem, Dialog, DialogContent, DialogTitle, Container, Grid, Paper, Table,TableSortLabel,  IconButton, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Stepper, Step, StepLabel, Link, Autocomplete } from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/userManagement/role";


const TransactionHistory = (props) => {
    const [role, setRole] = useState([]);
    const [ChoseRole, setChoseRole] = useState('');
  useEffect(() => {
    
    const getEmployeeMaster = async () => {
      
    
      try {
        const response = await api.post("/api/employee/get-emp-master");
        if (response.status === 200) {
          //const decryptedObject = DataDecrypt(response.data);
         // setEmployeeMaster(response.data.roleMaster);
       setRole("role Master:::  ",response.data.data.roleMaster);
      
       console.log("State Master:", response.data.data.stateMaster);
        }

   //     console.log(response.roleMaster);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getEmployeeMaster();
    //setChoseCategory({'id': 1, 'category_name':  'SBI'});
    
  });
  
  const handleChangeRole = (event, newValue) => {
    setChoseRole(newValue);
    
  };
 
  return (
      <Layout>
          <Grid container spacing={4} sx={{ padding: 2 }}>
              <Grid item xs={12}>
              <TableContainer component={Paper}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={1} style={{ width: '100%' }}>
          <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
       Employee Role
      </label>
      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={role}
                            getOptionLabel={(Role) => Role ? Role.role_name : ''}
                            value={ChoseRole}
                            onChange={handleChangeRole}
                            renderInput={(params) => <TextField {...params}  variant="outlined" />}
                          />
                          
                        </FormControl>
</Box>
    </Box>
</TableContainer>

              </Grid>
          </Grid>
          <Grid item>
             
          </Grid>
       
      </Layout>
  );
};

export default withAuth(TransactionHistory);

