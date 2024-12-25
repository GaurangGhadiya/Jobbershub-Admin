"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/AssetManagement/assets";
import { Grid,Paper,TableContainer, Button } from "@mui/material";
import { Typography,Divider,Box,TextField} from "@mui/material";
import AddVendorForm from '@/components/AssetManagement/add-asset'; 
import AddIcon from '@mui/icons-material/Add';


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


const TransactionHistory = (props) => {
  const [showServiceTrans, setShowServiceTrans] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const uid = Cookies.get('uid');


  useEffect(() => {
    
      const getTnx = async () => {
          const reqData = {};
          try {
              const response = await api.post('/api/employee/get-assets-list', reqData);
              
              if (response.status === 200) {
                  setShowServiceTrans(response.data.data);
                  
              }
          } catch (error) {
              dispatch(callAlert({ message: error?.response?.data?.error || error.message, type: 'FAILED' }));
          }
      };
      if (uid) {
          getTnx();
      }
  }, [uid, dispatch]);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  return (
      <Layout>
          <Grid container spacing={4} >
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={1} style={{ width: '100%' }}>
                    <Typography variant="h5" >Asset List</Typography>
                    <Button variant="contained" color="success" size="medium" onClick={handleOpenForm}>
                    <AddIcon /> Add new asset
                    </Button>
                </Box>
              </Grid>
          </Grid>
          <Transactions showServiceTrans={showServiceTrans} />
          <AddVendorForm open={openForm} onClose={handleCloseForm}/>
      </Layout>
  );
};

export default withAuth(TransactionHistory);

