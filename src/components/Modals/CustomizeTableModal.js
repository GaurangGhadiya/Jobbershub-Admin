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
import { Box, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Close, PushPin, PushPinOutlined } from '@mui/icons-material';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizetableModal({ Customizetable, CustomizetableClose, handleChange, selectedTableRow, pinnedTableRow, handleChangePin, setAfterSubmitSelectedRow, setselectedTableRow }) {

    let box = [
        // { title: "Today’s", value: "today" },
        { title: "Yesterday’s", value: "yesterday" },
        { title: "Past 7 Days", value: "7" },
        { title: "Past 15 Days", value: "15" },
        { title: "Past 30 Days", value: "30" },
        { title: "Till Date", value: "tillDate" },
        { title: "Custom", value: "custom" },
    ]

    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={CustomizetableClose}
                // aria-labelledby="customized-dialog-title"
                open={Customizetable}
                fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle sx={{ m: 0, p: 2, pb: 1 }}  display={"flex"} justifyContent={'space-between'} alignItems={"center"}>
                    <Typography fontSize={"20px"}>Customize Table</Typography>
                    <Box onClick={CustomizetableClose} backgroundColor="#F7F5DD" style={{cursor : "pointer"}} borderRadius={"4px"} height={30} width={30} display={"flex"} justifyContent={'center'} alignItems={"center"}>
                        <Close style={{color : '#707070', fontSize:"20px"}}/>
                    </Box>
                </DialogTitle>
                <hr />


                <DialogContent>
                    <Box>
                        <FormGroup>

                            <Grid container spacing={2}>
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  disabled onChange={handleChange} icon={<PushPinOutlined />} checkedIcon={<PushPin />} checked={selectedTableRow?.RegistrationDateTime} name='RegistrationDateTime' />} label="Registration Date & Time" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.RegistrationDateTime} name='RegistrationDateTime' />} label="Registration Date & Time" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  disabled onChange={handleChange} icon={<PushPinOutlined />} checkedIcon={<PushPin />} checked={selectedTableRow?.AuthorizationDateTime} name='AuthorizationDateTime' />} label="Authorization Date & Time" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.AuthorizationDateTime} name='AuthorizationDateTime'/>} label="Authorization Date & Time" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  disabled onChange={handleChange} icon={<PushPinOutlined />} checkedIcon={<PushPin />} checked={selectedTableRow?.AffiliateID} name='AffiliateID' />} label="Affiliate ID" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.AffiliateID} name='AffiliateID'/>} label="Affiliate ID" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  disabled onChange={handleChange} icon={<PushPinOutlined />} checkedIcon={<PushPin />} checked={selectedTableRow?.AffiliateName} name='AffiliateName' />} label="Affiliate Name" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.AffiliateName} name='AffiliateName'/>} label="Affiliate Name" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.State} name='State' />} label="State" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.State} name='State'/>} label="State" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.District} name='District' />} label="District" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.District} name='District'/>} label="District" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.Taluka} name='Taluka' />} label="Taluka" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.Taluka} name='Taluka'/>} label="Taluka" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.Pincode} name='Pincode' />} label="Pincode" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.Pincode} name='Pincode'/>} label="Pincode" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.AffiliateRank} name='AffiliateRank' />} label="Affiliate Rank" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.AffiliateRank} name='AffiliateRank'/>} label="Affiliate Rank" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.AffiliateType} name='AffiliateType' />} label="Affiliate Type" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.AffiliateType} name='AffiliateType'/>} label="Affiliate Type" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.AffiliateMobileNo} name='AffiliateMobileNo' />} label="Affiliate Mobile No." />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.AffiliateMobileNo} name='AffiliateMobileNo'/>} label="Affiliate Mobile No." />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.EmailID} name='EmailID' />} label="Email ID" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.EmailID} name='EmailID'/>} label="Email ID" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.SponsorType} name='SponsorType' />} label="Sponsor Type" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.SponsorType} name='SponsorType'/>} label="Sponsor Type" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.SponsorRank} name='SponsorRank' />} label="Sponsor Rank" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.SponsorRank} name='SponsorRank'/>} label="Sponsor Rank" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.Sponsorid} name='Sponsorid' />} label="Sponsor id" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.Sponsorid} name='Sponsorid'/>} label="Sponsor id" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.SponsorName} name='SponsorName' />} label="Sponsor Name" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.SponsorName} name='SponsorName'/>} label="Sponsor Name" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.SponsorMobileNo} name='SponsorMobileNo' />} label="Sponsor Mobile No." />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.SponsorMobileNo} name='SponsorMobileNo'/>} label="Sponsor Mobile No." />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.ViewUplineList} name='ViewUplineList' />} label="View Upline List" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.ViewUplineList} name='ViewUplineList'/>} label="View Upline List" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.Team} name='Team' />} label="Team" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.Team} name='Team'/>} label="Team" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.PendingLeads} name='PendingLeads' />} label="Pending Leads" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.PendingLeads} name='PendingLeads'/>} label="Pending Leads" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.SelfPurchaseDV} name='SelfPurchaseDV' />} label="Self Purchase DV" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.SelfPurchaseDV} name='SelfPurchaseDV'/>} label="Self Purchase DV" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.My1stLevelTotalPurchaseDV} name='My1stLevelTotalPurchaseDV' />} label="My 1st Level Total Purchase DV" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.My1stLevelTotalPurchaseDV} name='My1stLevelTotalPurchaseDV'/>} label="My 1st Level Total Purchase DV " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.AuthorizedMembersInsecondlevel} name='AuthorizedMembersInsecondlevel' />} label="Authorized Members In second level " />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.AuthorizedMembersInsecondlevel} name='AuthorizedMembersInsecondlevel'/>} label="Authorized Members In second level  " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.TotalActiveIncome} name='TotalActiveIncome' />} label="Total Active Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.TotalActiveIncome} name='TotalActiveIncome'/>} label="Total Active Income " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.TotalPassiveIncome} name='TotalPassiveIncome' />} label="Total Passive Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.TotalPassiveIncome} name='TotalPassiveIncome'/>} label="Total Passive Income " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.DematActiveIncome} name='DematActiveIncome' />} label="Demat A/C Active Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.DematActiveIncome} name='DematActiveIncome'/>} label="Demat A/C Active Income " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.CoursesActiveIncome} name='CoursesActiveIncome' />} label="Courses Active Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.CoursesActiveIncome} name='CoursesActiveIncome'/>} label="Courses Active Income " />
                                </Grid> */}

                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.InsuranceActiveIncome} name='InsuranceActiveIncome' />} label="Insurance Active Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.InsuranceActiveIncome} name='InsuranceActiveIncome'/>} label="Insurance Active Income " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.InvestmentActiveIncome} name='InvestmentActiveIncome' />} label="Investment Active Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.InvestmentActiveIncome} name='InvestmentActiveIncome'/>} label="Investment Active Income " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.Primerequest} name='Primerequest' />} label="Prime request" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.Primerequest} name='Primerequest'/>} label="Prime request " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.KYCStatus} name='KYCStatus' />} label="KYC Status" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.KYCStatus} name='KYCStatus'/>} label="KYC Status " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.NomineeStatus} name='NomineeStatus' />} label="Nominee Status" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.NomineeStatus} name='NomineeStatus'/>} label="Nominee Status " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.AffiliateStatus} name='AffiliateStatus' />} label="Affiliate Status" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.AffiliateStatus} name='AffiliateStatus'/>} label="Affiliate Status " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.BlockReason} name='BlockReason' />} label="Block Reason" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.BlockReason} name='BlockReason'/>} label="Block Reason " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.LastCommunication} name='LastCommunication' />} label="Last Communication" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.LastCommunication} name='LastCommunication'/>} label="Last Communication " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.NoteReminder} name='NoteReminder' />} label="Note & Reminder" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.NoteReminder} name='NoteReminder'/>} label="Note & Reminder " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.Action} name='Action' />} label="Action" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.Action} name='Action'/>} label="Action " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.SmartPeWalletBalance} name='SmartPeWalletBalance' />} label="SmartPe Wallet Balance " />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.SmartPeWalletBalance} name='SmartPeWalletBalance'/>} label="SmartPe Wallet Balance " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.TotalEarning} name='TotalEarning' />} label="Total Earning" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.TotalEarning} name='TotalEarning'/>} label=" Total Earning" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.MainActiveIncome} name='MainActiveIncome' />} label="Main Active Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.MainActiveIncome} name='MainActiveIncome'/>} label="Main Active Income " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.MainPassiveIncome} name='MainPassiveIncome' />} label="Main Passive Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.MainPassiveIncome} name='MainPassiveIncome'/>} label="Main Passive Income " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.RewardIncome} name='RewardIncome' />} label="Reward Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.RewardIncome} name='RewardIncome'/>} label="Reward Income " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.SalaryIncome} name='SalaryIncome' />} label="Salary Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.SalaryIncome} name='SalaryIncome'/>} label="Salary Income " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.RoyaltyIncome} name='RoyaltyIncome' />} label="Royalty Income" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.RoyaltyIncome} name='RoyaltyIncome'/>} label="Royalty Income " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.SIPMFFund} name='SIPMFFund' />} label="SIP / MF Fund" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.SIPMFFund} name='SIPMFFund'/>} label="SIP / MF Fund" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.LaptopFund} name='LaptopFund' />} label="Laptop Fund" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.LaptopFund} name='LaptopFund'/>} label="Laptop Fund" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.BikeFund} name='BikeFund' />} label="Bike Fund" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.BikeFund} name='BikeFund'/>} label="Bike Fund" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.CarFund} name='CarFund' />} label="Car Fund" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.CarFund} name='CarFund'/>} label="Car Fund" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.HouseFund} name='HouseFund' />} label="House Fund" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.HouseFund} name='HouseFund'/>} label="House Fund" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.TravelFund} name='TravelFund' />} label="Travel Fund" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.TravelFund} name='TravelFund'/>} label="Travel Fund" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.InsuranceFund} name='InsuranceFund' />} label="Insurance Fund" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.InsuranceFund} name='InsuranceFund'/>} label="Insurance Fund" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.ChildHigherEducationFund} name='ChildHigherEducationFund' />} label="Child Higher Education Fund" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.ChildHigherEducationFund} name='ChildHigherEducationFund'/>} label="Child Higher Education Fund" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.MarriageBurdenReliefFund} name='MarriageBurdenReliefFund' />} label="Marriage Burden Relief Fund" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.MarriageBurdenReliefFund} name='MarriageBurdenReliefFund'/>} label="Marriage Burden Relief Fund" />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.TotalWithdrawal} name='TotalWithdrawal' />} label="Total Withdrawal" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.TotalWithdrawal} name='TotalWithdrawal'/>} label="Total Withdrawal " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.TDSBalance} name='TDSBalance' />} label="TDS Balance" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.TDSBalance} name='TDSBalance'/>} label="TDS Balance  " />
                                </Grid> */}
                                <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  onChange={handleChange} checked={selectedTableRow?.TDSPaid} name='TDSPaid' />} label="TDS Paid" />
                                </Grid>
                                {/* <Grid item sx={12} sm={6}>
                                    <FormControlLabel control={<Checkbox  sx={{
                                        color: '#FF9F59', // Default color for the checkbox
                                        '&.Mui-checked': {
                                            color: '#FF9F59', // Color when the checkbox is checked
                                        },
                                    }}  icon={<PushPinOutlined />} checkedIcon={<PushPin />} onChange={handleChangePin} checked={pinnedTableRow?.TDSPaid} name='TDSPaid'/>} label="TDS Paid  " />
                                </Grid> */}

                            </Grid>
                        </FormGroup>
                    </Box>


                    <Box width={"100%"} display={"flex"} justifyContent={"end"} mt={3}>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"100px"} mr={1}
                            onClick={() => {
                                setAfterSubmitSelectedRow({
                                    RegistrationDateTime: true,
                                    AuthorizationDateTime: true,
                                    AffiliateID: true,
                                    AffiliateName: true,
                                    State: true,
                                    District: true,
                                    Taluka: true,
                                    Pincode: true,
                                    AffiliateRank: true,
                                    AffiliateType: true,
                                    AffiliateMobileNo: true,
                                    EmailID: true,
                                    SponsorType: true,
                                    SponsorRank: true,
                                    Sponsorid: true,
                                    SponsorName: true,
                                    SponsorMobileNo: true,
                                    ViewUplineList: true,
                                    Team: true,
                                    PendingLeads: true,
                                    SelfPurchaseDV: true,
                                    My1stLevelTotalPurchaseDV: true,
                                    AuthorizedMembersInsecondlevel: true,
                                    TotalActiveIncome: true,
                                    TotalPassiveIncome: true,
                                    DematActiveIncome: true,
                                    CoursesActiveIncome: true,
                                    InsuranceActiveIncome: true,
                                    InvestmentActiveIncome: true,
                                    Primerequest: true,
                                    KYCStatus: true,
                                    NomineeStatus: true,
                                    AffiliateStatus: true,
                                    BlockReason: true,
                                    LastCommunication: true,
                                    NoteReminder: true,
                                    Action: true,
                                    TotalEarning: true,
                                    MainActiveIncome: true,
                                    MainPassiveIncome: true,
                                    RewardIncome: true,
                                    SalaryIncome: true,
                                    RoyaltyIncome: true,
                                    SIPMFFund: true,
                                    LaptopFund: true,
                                    BikeFund: true,
                                    CarFund: true,
                                    HouseFund: true,
                                    TravelFund: true,
                                    InsuranceFund: true,
                                    ChildHigherEducationFund: true,
                                    MarriageBurdenReliefFund: true,
                                    TotalWithdrawal: true,
                                    TDSBalance: true,
                                    TDSPaid: true,
                                });
                                setselectedTableRow({
                                    RegistrationDateTime: true,
                                    AuthorizationDateTime: true,
                                    AffiliateID: true,
                                    AffiliateName: true,
                                    State: true,
                                    District: true,
                                    Taluka: true,
                                    Pincode: true,
                                    AffiliateRank: true,
                                    AffiliateType: true,
                                    AffiliateMobileNo: true,
                                    EmailID: true,
                                    SponsorType: true,
                                    SponsorRank: true,
                                    Sponsorid: true,
                                    SponsorName: true,
                                    SponsorMobileNo: true,
                                    ViewUplineList: true,
                                    Team: true,
                                    PendingLeads: true,
                                    SelfPurchaseDV: true,
                                    My1stLevelTotalPurchaseDV: true,
                                    AuthorizedMembersInsecondlevel: true,
                                    TotalActiveIncome: true,
                                    TotalPassiveIncome: true,
                                    DematActiveIncome: true,
                                    CoursesActiveIncome: true,
                                    InsuranceActiveIncome: true,
                                    InvestmentActiveIncome: true,
                                    Primerequest: true,
                                    KYCStatus: true,
                                    NomineeStatus: true,
                                    AffiliateStatus: true,
                                    BlockReason: true,
                                    LastCommunication: true,
                                    NoteReminder: true,
                                    Action: true,
                                    TotalEarning: true,
                                    MainActiveIncome: true,
                                    MainPassiveIncome: true,
                                    RewardIncome: true,
                                    SalaryIncome: true,
                                    RoyaltyIncome: true,
                                    SIPMFFund: true,
                                    LaptopFund: true,
                                    BikeFund: true,
                                    CarFund: true,
                                    HouseFund: true,
                                    TravelFund: true,
                                    InsuranceFund: true,
                                    ChildHigherEducationFund: true,
                                    MarriageBurdenReliefFund: true,
                                    TotalWithdrawal: true,
                                    TDSBalance: true,
                                    TDSPaid: true,
                                });
                                CustomizetableClose()
                            }}>
                            <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500} >Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"192px"} onClick={() => { setAfterSubmitSelectedRow(selectedTableRow); CustomizetableClose() }}>
                            <Typography color={"white"} fontSize={"17px"} textAlign={"center"} fontWeight={500}>Apply Changes</Typography>
                        </Box>
                    </Box>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
