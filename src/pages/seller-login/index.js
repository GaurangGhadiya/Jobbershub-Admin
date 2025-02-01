import { Box, Container, Divider, Typography, Paper, Tab, Grid, useMediaQuery, Checkbox } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserName from "./UserName";
import Link from "next/link";
import style from "./Login.module.css";
import classNames from "classnames";
import { Login, RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Image from "next/image";




const LoginPage = () => {

    const [value, setValue] = useState('1');
    const [valueMaster, setValueMaster] = useState('1');


    const handleChange = (event, newValue) => {

        setValue(newValue);

    };


    const handleChangeMaster = (event, newValue) => {

        setValueMaster(newValue);

    };

    //const isXsScreen = useMediaQuery('(max-width:600px)');


    return (
        <>

            <Container maxWidth="sm" sx={{ marginTop: 6, marginBottom: 6, position: 'relative', backgroundColor:'' }} >

                <Paper elevation={1} >
                    <Grid container spacing={0}>

                        <Grid item xs={12} md={12}>
                            <Box style={{ padding: '12px' }}>
                                <TabContext value={valueMaster}>
                                    <TabPanel value="1">
                                        <Typography marginBottom={2} variant="body1" textAlign={'left'}><b>JobbersHub <span style={{color: '#1976d2'}}>Seller</span></b></Typography><br></br>
                                        <Typography marginBottom={2} variant="body1" textAlign={'left'}><b>Hello! lets get started</b><br></br><span>Sign in to continue.</span></Typography>
                                    </TabPanel>
                                </TabContext>
                                <TabContext value={valueMaster}>
                                    <TabPanel value="1">
                                        <UserName handleChange={handleChange} />
                                        {/* <Link href="/forgot-password">
                                        <Typography textAlign={'right'} variant="body2" color={'primary'}>Forgot Password?</Typography>
                                            <br />
                                        </Link>
                                        

                                        <Typography textAlign={'center'} variant="body2" >Dont have an account? <Link href="/registration">Create</Link></Typography> */}
                                    </TabPanel>

                                    
                                    
                                    


                                </TabContext>

                            </Box>

                        </Grid>
                    </Grid>

                </Paper>

            </Container >

        </>

    )
}
export default LoginPage;