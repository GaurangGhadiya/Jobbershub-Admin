import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import api from "../../utils/api";
import { callAlert } from "../../redux/actions/alert";
// import Layout from "@/components/Dashboard/layout";
import { useRouter } from "next/router"; 
import { Typography, Paper, Box } from "@mui/material";
import HtmlContent from "@/components/userManagement/HtmlContent"; 
import Layout from "@/components/Layout/Layout";

const KRA = () => {
  const [showKRA, setShowKRA] = useState({});
  const dispatch = useDispatch();
  const router = useRouter(); 
  const employeeId = Cookies.get('employee_id'); 

  

  useEffect(() => {
    if (!employeeId) return; 

    const getKRA = async () => {
      const reqData = { employee_id: employeeId };  
      try {
        const response = await api.post("/api/employee/get-employee", reqData);
        if (response.status === 200) {
          setShowKRA(response.data.data); 
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

    getKRA();  
  }, [employeeId, dispatch]);  

  return (
    <Layout>
      <Typography variant="h5" component="h2" mb={3} sx={{ fontWeight: 'bold' }}>
        My KRA
      </Typography>
      <Paper elevation={3} sx={{ padding: '16px' }}>
        <Box sx={{ borderRadius: '8px' }}>
        {showKRA.kra && <HtmlContent htmlString={showKRA.kra} />}
        </Box>
      </Paper>
    </Layout>
  );
};

export default KRA;
