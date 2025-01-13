"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import api from "../../utils/api";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import { useRouter } from "next/router"; 
import { Typography, Paper, Box } from "@mui/material";

import HtmlContent from "@/components/userManagement/HtmlContent"; 

const KPI = () => {
  const [showKPI, setShowKPI] = useState({});
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
          setShowKPI(response.data.data); 
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
        My KPI
      </Typography>
      <Paper elevation={3} sx={{ padding: '16px' }}>
        <Box sx={{ borderRadius: '8px' }}>
         
          {showKPI.kpi && <HtmlContent htmlString={showKPI.kpi} />}
        </Box>
      </Paper>
    </Layout>
  );
};

export default KPI;
