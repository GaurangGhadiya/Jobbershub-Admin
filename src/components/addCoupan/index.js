import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, Box, FormLabel, Grid, Radio, RadioGroup, Switch } from '@mui/material';
import TextFieldComponent from '../TextFieldComponent';
import { BorderRadius } from 'mdi-material-ui';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';
import { start } from 'nprogress';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function AddCoupan({ open, handleClose , getCourse}) {
    const [step, setStep] = React.useState("1")
    const [formData, setFormData] = React.useState({
        "is_visible": true,
        "is_lifetime": false,
        "is_unlimited": false,
        "coupan_t": "Discount",
        "course_selection_type": "All",
        "coupon_type": "Public",
        "discount_type": "Flat",
        "no_times_used": 0,
        "end_date": dayjs('2025-01-01'),
        "end_time": dayjs('2022-04-17T15:30'),
    })

    console.log('formData', formData)


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const saveCoupan =async () => {
        console.log('formData', formData)
        let formatTime = {...formData, start_time : formData?.start_time?.format("HH:mm"), end_time : formData?.end_time?.format("HH:mm")}
      console.log("formatTime",formatTime)
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/course/add-course-coupon`, formatTime).then(res => {
            console.log('api response', res)
            setStep("1")
            getCourse()
            handleClose()
            setFormData({
                
                    "is_visible": true,
                    "is_lifetime": false,
                    "is_unlimited": false,
                    "course_selection_type": "All",
                    "coupon_type": "Public",
                    "discount_type": "Flat"
                
            })

        }).catch(e => {
            console.log('erro', e)
        })

    }
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth={'md'}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Manage Coupons
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {step == "1" && <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography color={"#000000"} fontWeight={500} fontSize={14}>Coupan Type</Typography>
                    <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="coupan_t"
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Discount" control={<Radio checked={formData?.coupan_t == "Discount"}/>} label="Discount" />
                            <FormControlLabel value="Cashback"
                             control={<Radio checked={formData?.coupan_t == "Cashback"}/>} label="Cashback" />
                            <FormControlLabel value="CrossSelling" control={<Radio checked={formData?.coupan_t == "CrossSelling"}/>} label="Cross Selling" />

                        </RadioGroup>
                        <Typography color={"#000000"} fontWeight={500} fontSize={14} mt={2}>Discount Type</Typography>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="discount_type"
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Flat" control={<Radio checked={formData?.discount_type == "Flat"}/>} label="Flat Discount" />
                            <FormControlLabel value="Percentage"
                             control={<Radio checked={formData?.discount_type == "Percentage"}/>} label="Percentage Discount" />

                        </RadioGroup>

                        <Grid container spacing={2} mt={0.5}>
                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Discount Value</Typography>

                                <TextFieldComponent
                                    style={{ BorderRadius: "6px !important" }}
                                    name="discount_val"
                                    value={formData?.discount_val}
                                    onChange={handleChange}
                                    placeholder='500'
                                />
                            </Grid>

                            <Grid item sx={12} md={6}></Grid>
                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Start Date</Typography>
                                <DesktopDatePicker format='DD-MM-YYYY'
                                 value={formData?.start_date ? dayjs(formData?.start_date) :dayjs('2025-01-01')}
                                onChange={(newValue) => setFormData({ ...formData, start_date : dayjs(newValue).format("YYYY-MM-DD")})}
                                />

                            </Grid>
                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Start Time</Typography>
                                <TimePicker
                                value={formData?.start_time}
                                // sx={{ padding: 1, lineHeight: 20, width:356 }}
                                onChange={(newValue) => setFormData({ ...formData, start_time : newValue})}


                                />

                            </Grid>
                           {!formData?.is_lifetime && <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>End Date</Typography>
                                <DesktopDatePicker format='DD-MM-YYYY'
                                 value={formData?.end_date ? dayjs(formData?.end_date) :dayjs('2025-01-01')}
                                onChange={(newValue) => setFormData({ ...formData, end_date : dayjs(newValue).format("YYYY-MM-DD")})}
                                />


                            </Grid>}
                          {!formData?.is_lifetime &&  <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>End Time</Typography>
                                <TimePicker
                                value={formData?.end_time}
                                // sx={{ padding: 1, lineHeight: 20, width:356 }}
                                onChange={(newValue) => setFormData({ ...formData, end_time : newValue})}

                                />

                            </Grid>}




                            <Grid item sx={12} md={12}>
                                <FormControlLabel control={<Checkbox
                                onChange={(e) => setFormData({ ...formData, is_lifetime : e.target.checked})}

                                checked={formData?.is_lifetime}
                                name='is_lifetime'
                                sx={{
                                    color: '#FF8C38',
                                    '&.Mui-checked': {
                                        color: '#FF8C38',
                                    },
                                    
                                }} />} label="Check if you want to set coupon validity to lifetime" />

                            </Grid>
                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Minimum Order value</Typography>

                                <TextFieldComponent
                                type='number'
                                    style={{ BorderRadius: "6px !important" }}
                                    name="minimum_order_value"
                                    value={formData?.minimum_order_value}
                                    onChange={handleChange}
                                    placeholder='1000'
                                />
                            </Grid>
                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Select Course</Typography>

                                <TextFieldComponent
                                    style={{ BorderRadius: "6px !important" }}
                                    name="course"
                                    value={formData?.course}
                                    onChange={handleChange}
                                    placeholder='Advance Stock Market Course'
                                />
                            </Grid>
                        </Grid>

                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Box border={"2px solid #FF8C38"} width={"110px"} my={3} style={{ cursor: "pointer" }} borderRadius={"4px"} onClick={handleClose}><Typography fontSize={"16px"} color={"#FF8C38"} px={3} py={1}>Cancel</Typography></Box>
                            <Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} borderRadius={"4px"} onClick={() => setStep("2")}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Next</Typography></Box>
                        </Box>
                    </LocalizationProvider>}

                    {step == "2" && <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <Grid container spacing={2} mt={-2}>
                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Offer Name</Typography>

                                <TextFieldComponent
                                    style={{ BorderRadius: "6px !important" }}
                                    name="offer_name"
                                    value={formData?.offer_name}
                                    onChange={handleChange}
                                    placeholder='Welcome'
                                />
                            </Grid>
                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Coupon Code</Typography>

                                <TextFieldComponent
                                    style={{ BorderRadius: "6px !important" }}
                                    name="coupon_code"
                                    value={formData?.coupon_code}
                                    onChange={handleChange}
                                    placeholder='ProTraders'
                                />
                            </Grid>

                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Coupon Type</Typography>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="coupon_type"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Public" control={<Radio checked={formData?.coupon_type == "Public"}/>} label="Public Coupon" />
                                    <FormControlLabel value="Private" control={<Radio checked={formData?.coupon_type == "Private"} />} label="Private Coupon" />

                                </RadioGroup>
                            </Grid>
                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Description</Typography>

                                <TextFieldComponent
                                    style={{ BorderRadius: "6px !important" }}
                                    name="description"
                                    value={formData?.description}
                                    onChange={handleChange}
                                    placeholder='ProTraders'
                                />
                            </Grid>
                            <Grid item sx={12} md={12}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Couse Selection Type</Typography>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="course_selection_type"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="All" control={<Radio  checked={formData?.course_selection_type == "All"} />} label="Assign to all courses" />
                                    <FormControlLabel value="Specific" control={<Radio checked={formData?.course_selection_type == "Specific"} />} label="Assign to specific courses" />

                                </RadioGroup>
                            </Grid>
                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Number of times code can be used</Typography>

                                <TextFieldComponent
                                type='number'
                                    style={{ BorderRadius: "6px !important" }}
                                    name="no_times_used"
                                    value={formData?.no_times_used}
                                    onChange={handleChange}
                                    placeholder='0'
                                    disabled={formData?.is_unlimited}
                                />
                            </Grid>
                            <Grid item sx={12} md={12} mt={-1} mb={-1}>
                                <FormControlLabel control={<Checkbox 
                                onChange={(e) => setFormData({ ...formData, is_unlimited : e.target.checked})}
                                name='is_unlimited'
                                checked={formData?.is_unlimited}
                                sx={{
                                    color: '#FF8C38',
                                    '&.Mui-checked': {
                                        color: '#FF8C38',
                                    },
                                }} />} label="Check if you want to set number of times to unlimited" />

                            </Grid>
                            <Grid item sx={12} md={6}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Usage per student</Typography>

                                <TextFieldComponent
                                type='number'
                                    style={{ BorderRadius: "6px !important" }}
                                    name="usage_per_student"
                                    value={formData?.usage_per_student}
                                    onChange={handleChange}
                                    placeholder='10'
                                />
                            </Grid>
                            <Grid item sx={12} md={12}>
                                <Typography color={"#000000"} fontWeight={500} fontSize={14}>Visibility</Typography>
                                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Typography color={"#000000"} fontWeight={300} fontSize={12} mt={-2}>Toggle OFF in case you don't want to show this coupon to your students </Typography>

                                    <Switch
                                        checked={formData?.is_visible}
                                        name='is_visible'
                                        onChange={(e) => setFormData({ ...formData, is_visible : e.target.checked})}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </Box>


                            </Grid>
                        </Grid>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={-3} mt={-2}>
                            <Box border={"2px solid #FF8C38"} width={"80x"} my={3} style={{ cursor: "pointer" }} borderRadius={"4px"} onClick={() => setStep("1")}><Typography fontSize={"16px"} color={"#FF8C38"} px={3} py={1}>Back</Typography></Box>
                            <Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} borderRadius={"4px"} onClick={saveCoupan}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Save</Typography></Box>
                        </Box>
                    </LocalizationProvider>}
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
