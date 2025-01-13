"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import { Grid,Paper,TableContainer, FormControl, InputLabel, Select, MenuItem,Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Typography,Divider,Box,TextField} from "@mui/material";
import { useRouter } from 'next/router';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { DataEncrypt, DataDecrypt } from '../../utils/encryption';
import Image from "next/image";

function TransactionHistory(props) {
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [mlm_id, setmlm_id] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    const [ref_mlm_id, setref_mlm_id] = useState('');
    const [ref_first_name, setref_first_name] = useState('');
    const [ref_last_name, setref_last_name] = useState('');
    const [ref_mobile, setref_mobile] = useState('');
    const [wallet_balance, setwallet_balance] = useState('0');
    const [royality_income, setroyality_income] = useState('0');
    const [reward_income, setreward_income] = useState('0');
    const [total_active_walletIncome, settotal_active_walletIncome] = useState('0');
    const [total_passive_walletIncome, settotal_passive_walletIncome] = useState('0');
    const [total_earning, settotal_earning] = useState('0');
    const [activation_date, setactivation_date] = useState('');
    const [registration_date, setregistration_date] = useState('');
    const [user_status, setuser_status] = useState('');
    const [sip_mitual_fund, setsip_mitual_fund] = useState('0');
    const [laptop_fund, setlaptop_fund] = useState('0');
    const [bike_found, setbike_found] = useState('0');
    const [car_found, setcar_found] = useState('0');
    const [house_found, sethouse_found] = useState('0');
    const [withdrawal_history, setwithdrawal_history] = useState('0');
  
    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }

    useEffect(() => {
       
        const all_parameters = {
            "user_id": id
        }
        const encryptedData = DataEncrypt(JSON.stringify(all_parameters));

        const getTnx = async () => {
          const reqData = {
            encReq: encryptedData
          };
          try {
            const response = await api.post('/api/users/my-earning', reqData);
            if (response.status === 200) {
                const decryptedObject = DataDecrypt(response.data);
                
                setfirst_name(decryptedObject.data.first_name);
                setlast_name(decryptedObject.data.last_name);
                setmlm_id(decryptedObject.data.mlm_id);
                setmobile(decryptedObject.data.mobile);
                setemail(decryptedObject.data.email);
                setref_mlm_id(decryptedObject.data.ref_mlm_id);
                setref_first_name(decryptedObject.data.ref_first_name);
                setref_last_name(decryptedObject.data.ref_last_name);
                setref_mobile(decryptedObject.data.ref_mobile);
                setwallet_balance(decryptedObject.data.wallet_balance);
                setroyality_income(decryptedObject.data.royality_income);
                setreward_income(decryptedObject.data.reward_income);
                settotal_active_walletIncome(decryptedObject.data.total_active_walletIncome);
                settotal_passive_walletIncome(decryptedObject.data.total_passive_walletIncome);
                settotal_earning(decryptedObject.data.total_earning);
                setactivation_date(decryptedObject.data.activation_date);
                setregistration_date(decryptedObject.data.registration_date);
                setuser_status(decryptedObject.data.user_status);

                setsip_mitual_fund(decryptedObject.data.sip_mitual_fund);
                setlaptop_fund(decryptedObject.data.laptop_fund);
                setbike_found(decryptedObject.data.bike_found);
                setcar_found(decryptedObject.data.car_found);
                sethouse_found(decryptedObject.data.house_found);
                setwithdrawal_history(decryptedObject.data.withdrawal_history);
                
            }
          } catch (error) {
            if (error?.response?.data?.error) {
              dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
            } else {
              dispatch(callAlert({ message: error.message, type: 'FAILED' }));
            }
          }
        };
    
        if (id) {
          getTnx();
        }
      }, [id, dispatch]);
          
      const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

    return (

        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            
            <Grid item={true} xs={12}   >
              <TableContainer component={Paper} >
            
                </TableContainer>
            </Grid>
            
            
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} >
                    <Grid
                        container
                        spacing={4}
                        sx={{ padding: 2 }}
                    >
                    <Grid item xs={6}>
                        <Grid
                            container
                            spacing={2}
                            sx={{ padding: 1 }}
                        >
                        <Grid item xs={3}>
                            <img src="/icon.png" alt="Icon" width="100px" height="100px" />
                        </Grid>
                        <Grid item xs={9}>
                            <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                                <Typography variant="h4" >{first_name + ' ' + last_name }</Typography>
                                <Typography variant="h6" style={{ color: 'orange' }} >{mlm_id}</Typography>
                            </Box>
                        </Grid>
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                    <Table aria-label="Users" sx={{ size: 2 }} mt={2} >
                            <TableBody>
                                <TableRow>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{mobile}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{email}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Status</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{user_status}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Registration Date</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{registration_date}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Activation Date</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{activation_date}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Sponser Name</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{ref_first_name + ' ' + ref_last_name}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Sponser Mobile</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{ref_mobile}</TableCell>
                                </TableRow>
                                
                            </TableBody>
                        </Table>
                    </Grid>
                    </Grid>
                    <Grid item={true} xs={12} >
                        <Grid
                            container
                            spacing={4}
                            sx={{ padding: 2 }}
                        >
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#1399c6', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>Wallet Balance</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{wallet_balance}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#0d91da', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>Royality Income</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{royality_income}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#0c81c2', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>Reward Income</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{reward_income}</Typography>
                                </Paper>
                            </Grid>
                            
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#0a71aa', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>Active Wallet Income</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{total_active_walletIncome}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#096192', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>Passive Wallet Income</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{total_passive_walletIncome}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#085783', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>Total Earning</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{total_earning}</Typography>
                                </Paper>
                            </Grid>
                            
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#074d74', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>SIP/MF Fund</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{sip_mitual_fund}</Typography>
                                </Paper>
                            </Grid>
                            
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#064366', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>Car Fund</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{car_found}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#9cbfd3', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>Laptop Fund</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{laptop_fund}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#84b0c8', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>Bike Fund</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{bike_found}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#6ba0bd', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>House Fund</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{house_found}</Typography>
                                </Paper>
                            </Grid>

                            <Grid item={true} xs={3} >
                                <Paper elevation={6} style={{ backgroundColor: '#5290b2', padding: 20 }}>
                                    <Typography variant="h6" style={{ color: 'white' }}>Withdrawal History</Typography>
                                    <Typography variant="h4" style={{ color: 'white' }}>{withdrawal_history}</Typography>
                                </Paper>
                            </Grid>
                            
                        </Grid>

                    </Grid>
                    
                    <br /><br /><br /><br /><br />
                </TableContainer>  
                </Grid>
            </Grid>
        </Layout>


    );
}
export default withAuth(TransactionHistory);

