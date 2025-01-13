"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import api from "../../utils/api";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";

import { useRouter } from "next/router"; 
import { Typography, Paper, Box, List, ListItem, Checkbox, FormControlLabel } from "@mui/material";

const Checklist = () => {
  const [checklist, setChecklist] = useState([]);  

  const dispatch = useDispatch();
  const router = useRouter(); 

  const employeeId = Cookies.get('employee_id');
  
  useEffect(() => {
    if (!employeeId) return; 

    const getKPI = async () => {
      const reqData = { employee_id: employeeId };  
      try {
        const response = await api.post("/api/employee/get-employee", reqData);
        if (response.status === 200) {
          setChecklist(response.data.checkList || []);  
          console.log("My checklist is ",response.data.checkList)
        }
      } catch (error) {
        dispatch(
          callAlert({
            message: error?.response?.data?.error || error.message,
            type: "FAILED",
          })
        );
      }
    };

    getKPI();  
  }, [employeeId, dispatch]);  

  return (
    <Layout>
      <Typography variant="h5" component="h2" mb={3} sx={{ fontWeight: 'bold' }}>
        My Checklist
      </Typography>
      <Paper elevation={3} sx={{ padding: '16px' }}>
  <Box
    sx={{
      borderRadius: '8px',
      border: '1px solid #ccc',  
    
    }}
  >
    {checklist && checklist.length > 0 ? (  
      <List>
        {checklist.map((item, index) => (
          <ListItem key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}  
                  disabled  
                />
              }
              label={item.checklist}
            />
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography>No checklist available</Typography> 
    )}
  </Box>
</Paper>

    </Layout>
  );
};

export default Checklist;
