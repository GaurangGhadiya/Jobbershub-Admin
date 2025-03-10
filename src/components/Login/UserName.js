import { Grid, TextField, FormControlLabel, Checkbox, Button, FormHelperText, Snackbar, Alert, Typography, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import CryptoJS from 'crypto-js';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DataEncrypt, DataDecrypt } from '../../../utils/encryption';

const UserName = ({ handleChange }) => {

    const route = useRouter();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    //const [term, setTerm] = useState(true);
    //const [captcha, setCaptcha] = useState(false);

    const [alert, setAlert] = useState({ open: false, type: false, message: null });

    const [error, setError] = useState({
        username: false,
        password: false
    })

    const submitHandler = async () => {
        
        const attempt = Cookies.get('attempt');

        // if (attempt && attempt >= 3) {
        //     setAlert({ open: true, type: false, message: 'Your account has been temporarily locked due to multiple incorrect login attempts!' });
        //     return;
        // }

        const newError = {
            username: userName.length < 1,
            password: password.length < 1,
            //otp: password.length < 1 && otp.length < 1,
           // term: !term,
        };
        setError(newError);
        if (Object.values(newError).every(value => value !== true) || true) {
            
            try {
                const reqData = {
                    // username: CryptoJS.AES.encrypt(userName, process.env.NEXT_PUBLIC_API_SECRET_KEY).toString(),
                    // password: CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_API_SECRET_KEY).toString(),
                    username: userName,
                    password: password,
                    is_admin: 1,
                    //userDetails: userDetail
                }
                
                const response = await api.post('/api/users/admin_login', reqData);

                if (response.status === 200) 
                //if (response)
                {
                    const responseData = response.data.data;
                    
                    localStorage.setItem('role', 'user');
                    localStorage.setItem('uid', responseData.id);
                    localStorage.setItem('email', responseData.email);
                    localStorage.setItem('name', responseData.first_name);
                    localStorage.setItem('mobile', responseData.mobile);
                    localStorage.setItem('employee_role', responseData.role_name);
                    localStorage.setItem('employee_id', responseData.employee_id);
                    localStorage.setItem('menu', JSON.stringify(response.data.employeeMenu)); 
                    
                    sendOtp();
                    
                    

                    // Cookies.set('role', 'user', { expires: 1 });
                    // Cookies.set('uid', responseData.id, { expires: 1 });
                    // Cookies.set('name', responseData.first_name + ' ' + responseData.last_name);
                    // Cookies.set('mobile', responseData.mobile);
                    // Cookies.set('employee_role', responseData.role_name, { expires: 1 });
                    // localStorage.setItem('menu', JSON.stringify(response.data.employeeMenu));
                    // route.push('/dashboard')

                }else{
                    setAlert({ open: true, type: false, message: response.data.message });
                }

            } catch (error) {

                let attempt = Cookies.get('attempt');
                if (attempt) {
                    Cookies.set('attempt', +attempt + 1, { expires: new Date(Date.now() + 3 * 60000) });
                } else {
                    Cookies.set('attempt', 1, { expires: new Date(Date.now() + 3 * 60000) });
                }



                if (error?.response?.status && error.response.status === 404) {
                    setAlert({ open: true, type: false, message: error.response.data });
                }else if (error?.response?.status && error.response.status === 401) {
                        setAlert({ open: true, type: false, message: error.response.data.message });
                } else {

                    if (error?.response?.data?.error) {
                        setAlert({ open: true, type: false, message: error.response.data.error });
                    } else {
                        setAlert({ open: true, type: false, message: error.message });
                    }
                }

            }
        }

    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ open: false, type: false, message: null });
    };


    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    const [otp, setOTP] = useState('');
    const [loginWithOtp, setLoginWithOtp] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [uid, setUid] = useState('');
    const [employeeRole, setRmployeeRole] = useState('');
    const [employee_id, setEmployee_id] = useState('');


    useEffect(() => {
        const getEmail = localStorage.getItem('email');
        const getName = localStorage.getItem('name');
        const getMobile = localStorage.getItem('mobile');
        const getUid = localStorage.getItem('uid');
        const getEmployeeRole = localStorage.getItem('employee_role');
        const getEmployeeId = localStorage.getItem('employee_id');

        setUserEmail(getEmail);
        setName(getName);
        setMobile(getMobile);
        setUid(getUid);
        setRmployeeRole(getEmployeeRole);
        setEmployee_id(getEmployeeId);

        setOTP('');
        setPassword('');

    }, [loginWithOtp])

    const sendOtp = async () => {

        if (userName && userEmail && name) {

            const reqData = {
                mode: 'API',
                type: 'Admin',
                category: 'Login',
                mobile: userName,
                email: userEmail,
                name: name,
            }

            const encryptedData = DataEncrypt(JSON.stringify(reqData));

            const encReqData = {
                encReq: encryptedData
            };

            try {

                const response = await api.post("/api/otp/get-otp", encReqData);
                const decryptedObject = DataDecrypt(response.data);

                if(response.status === 200)
                {   
                    setLoginWithOtp(true);
                    setAlert({ open: true, type: true, message: "OTP sent to your register mobile no." });
                }else{
                    setAlert({ open: true, type: false, message: decryptedObject.data.message });
                }

            } catch (error) {
                
                if (error?.response?.status && error.response.status === 404) {
                    setAlert({ open: true, type: false, message: error.response.data });
                } else {

                    if (error?.response?.data?.error) {
                        setAlert({ open: true, type: false, message: error.response.data.error });
                    } else {
                        setAlert({ open: true, type: false, message: error.message });
                    }
                }

            }

        } else {
            setAlert({ open: true, type: false, message: "Please enter valid Mobile no." });
        }

    }


    const verifyOtp = async () => {

        if (userName && otp) {

            const reqData = {
                otp: otp,
                mode: 'API',
                type: 'Admin',
                category: 'Login',
                mobile: userName
            }

            const encryptedData = DataEncrypt(JSON.stringify(reqData));

            const encReqData = {
                encReq: encryptedData
            };

            try {

                const response = await api.post("/api/otp/verify-otp", encReqData);

                if(response.status === 200)
                {
                    setAlert({ open: true, type: false, message: 'SignIn successfully!' });
                    Cookies.set('role', 'user', { expires: 1 });
                    Cookies.set('uid', uid, { expires: 1 });
                    Cookies.set('name', name, { expires: 1 });
                    Cookies.set('mobile', mobile, { expires: 1 });
                    Cookies.set('employee_role', employeeRole, { expires: 1 });
                    Cookies.set('employee_id', employee_id, { expires: 1 })
                    //localStorage.setItem('menu', JSON.stringify(response.data.employeeMenu));
                    route.push('/dashboard');
                    // route.push('/table');
                    
                }else{

                }
                

            } catch (error) {
                if (error?.response?.status && error.response.status === 404) {
                    setAlert({ open: true, type: false, message: error.response.data });
                }else if (error?.response?.status && error.response.status === 401) {
                    setAlert({ open: true, type: false, message: 'Invalid Otp' });
                } else {

                    if (error?.response?.data?.error) {
                        setAlert({ open: true, type: false, message: error.response.data.error });
                    } else {
                        setAlert({ open: true, type: false, message: error.message });
                    }
                }

            }

        } else {
            setAlert({ open: true, type: false, message: "Please enter valid otp" });
        }

    }

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    return (
        <>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    <TextField required error={error.username && true} value={userName} onChange={
                        (e) => {
                            const inputValue = e.target.value;
                            if (/^[a-zA-Z_@+.\d+]*$/.test(inputValue)) {
                                setUserName(inputValue);
                            }
                        }
                    } fullWidth label="Username" variant="outlined" />
                </Grid>


                {loginWithOtp ? (
                    <Grid item xs={12}>
                        {/* <Typography onClick={() => setLoginWithOtp(false)} color={'#4CAF50'} sx={{ cursor: 'pointer' }} textAlign={'right'} variant="body2"><small>Login using Password?</small></Typography> */}
                        <TextField helperText="OTP sent to your register mobile number." required error={error.otp && true} onChange={(e) => setOTP(e.target.value)} value={otp} fullWidth label="OTP" variant="outlined" />
                        <Button variant="contained" color={'primary'} fullWidth onClick={verifyOtp} size='large'>Verify</Button>
                    </Grid>
                ) : (
                    
                <>
                <Grid item xs={12}>
                    

                    <FormControl variant="outlined" sx={{width: '100%'}}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"

                            onChange={
                                (e) => {
                                    const inputValue = e.target.value;
                                    if (!/[<>]/.test(inputValue)) {
                                        setPassword(inputValue);
                                    }
                                }
                            }
                        />
                    </FormControl>

                    {/* <TextField type={'password'} required error={error.password && true} value={password} onChange={
                        (e) => {
                            const inputValue = e.target.value;
                            if (!/[<>]/.test(inputValue)) {
                                setPassword(inputValue);
                            }
                        }
                    } fullWidth label="Password" variant="outlined" /> */}

                </Grid>


                <Grid item xs={5}>
                    <Button variant="contained" color={'primary'} fullWidth onClick={submitHandler} size='large'>Send OTP</Button>
                    {/* <Button variant="contained" color={'primary'} fullWidth onClick={submitHandler} size='large'>Sign In</Button> */}
                </Grid>
                </>
                )}
            </Grid>

            <Snackbar
                open={alert.open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={alert.type === true ? 'success' : 'error'}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>

    )
}
export default UserName;