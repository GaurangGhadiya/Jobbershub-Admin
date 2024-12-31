import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import Filter from '@/components/Filter/Filter';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ExposureIcon from '@mui/icons-material/Exposure';
import DownloadIcon from '@mui/icons-material/Download';
import TableTop from '@/components/TableTop.js';
import CustomizetableModal from '@/components/Modals/CustomizeTableModal';
import Layout from '@/components/Layout/Layout';
import { useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PendingLeadsModal from '@/components/Modals/PendingLeadsModal';


const StickyTable = () => {
    const [tableData, setTableData] = useState([])
    const [openFilter, setOpenFilter] = useState(true);
    const [Customizetable, setCustomizetable] = useState(false)
    const [selectedTableRow, setselectedTableRow] = useState({
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
    })
    const [afterSubmitSelectedRow, setAfterSubmitSelectedRow] = useState({
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
    })
    const [pinnedTableRow, setpinnedTableRow] = useState([])
    const [pendingLeads, setpendingLeads] = React.useState(false);

    const rows = [
        { id: 1, name: 'John Doe', age: 29, city: 'New York' },
        { id: 2, name: 'Jane Smith', age: 34, city: 'Los Angeles' },
        { id: 3, name: 'Sam Brown', age: 25, city: 'Chicago' },
        { id: 4, name: 'Lisa White', age: 27, city: 'San Francisco' },
        // Add more rows if necessary
    ];

    const CustomizetableOpen = () => {
        setCustomizetable(true);
    };
    const CustomizetableClose = () => {
        setCustomizetable(false);
    };

    const handleChange = (event) => {
        const { name, checked } = event.target
        setselectedTableRow({ ...selectedTableRow, [name]: checked });
    };
    const handleChangePin = (event) => {
        const { name, checked } = event.target
        setpinnedTableRow({ ...pinnedTableRow, [name]: checked });
    };

    const getTableData = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/report/new-user-summary`).then(res => {
            setTableData(res?.data?.data)
        }).catch(e => {
            console.log('e', e)
        })

    }
    useEffect(() => {
        getTableData()
    }, [])

    const pendingLeadsOpen = () => {
        setpendingLeads(!pendingLeads);
    };
    const pendingLeadsClose = () => {
        setpendingLeads(false);
    };
    console.log('tableData', tableData)


    return (
        <Layout>
            <Box p={2} style={{ backgroundColor: "#f5f5f5" }} >
                <TableTop />
                <Box backgroundColor="#FFE9DD" className="topborder" px={3} py={1} color={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box>
                        <Typography fontSize={20} color={"#000000"} fontWeight={900}>Affiliate members</Typography>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        {/* <Box borderRadius={"10px"} padding={"5px 10px"} backgroundColor={"#F7F5DD"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={15} fontWeight={600} display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"#707070"}><ExposureIcon />&nbsp;    Customize Table</Typography>
                    </Box>
                    <Box borderRadius={"10px"} padding={"5px 10px"} backgroundColor={"#F7F5DD"} ml={2} style={{ cursor: "pointer" }}>
                        <Typography fontSize={15} fontWeight={600} display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"#707070"}><DownloadIcon />&nbsp;    Download Report</Typography>
                    </Box> */}
                        <Box ml={5} onClick={() => setOpenFilter(!openFilter)}>
                            {openFilter ? <RemoveIcon style={{ cursor: "pointer", fontSize: "40px", color: "#000000" }} /> :
                                <AddIcon style={{ cursor: "pointer", fontSize: "40px", color: "#000000" }} />}

                        </Box>
                    </Box>
                </Box>
                {openFilter && <Filter />}
                <Box height={"20px"} backgroundColor={"#F5F5F5"}></Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={2} backgroundColor={"white"} className="topborder">
                    <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography>Show</Typography>
                        <Box mx={1}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    value={10}
                                    onChange={() => { }}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>25</MenuItem>
                                    <MenuItem value={30}>90</MenuItem>
                                    <MenuItem value={30}>100</MenuItem>
                                    <MenuItem value={30}>250</MenuItem>
                                    <MenuItem value={30}>500</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Typography>entries</Typography>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={2}>
                        <Box borderRadius={"10px"} padding={"5px 10px"} backgroundColor={"#FFE9DD"} style={{ cursor: "pointer" }} onClick={CustomizetableOpen}>
                            <Typography fontSize={15} fontWeight={600} display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"#707070"}><ExposureIcon />&nbsp;    Customize Table</Typography>
                        </Box>
                        <Box borderRadius={"10px"} padding={"5px 10px"} backgroundColor={"#FFE9DD"} ml={2} style={{ cursor: "pointer" }}>
                            <Typography fontSize={15} fontWeight={600} display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"#707070"}><DownloadIcon />&nbsp;    Download Report</Typography>
                        </Box>

                    </Box>
                </Box>
                <Box overflow={"hidden"}>
                    <TableContainer component={Box} style={{
                        maxHeight: '600px', // Fixed height for vertical scroll
                        maxWidth: '100%', // Optional: Limit the width if necessary
                        overflowX: 'auto', // Enable horizontal scrolling only inside the table container
                        overflowY: 'auto', // Enable vertical scrolling inside the table container
                        fontSize: '16px',
                    }}>

                        <Table stickyHeader style={{ tableLayout: 'fixed', width: '100%', backgroundColor: "white" }} sx={{
                            borderCollapse: "separate", // Ensure no border styles from default behavior
                        }}
                        >
                            <TableHead >
                                <TableRow>
                                    <TableCell style={{ position: 'sticky', borderRight: "none", left: 0, backgroundColor: '#fff', zIndex: 10, width: 55, textAlign: 'left' }}>#</TableCell>
                                    {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell style={{ position: 'sticky', borderRight: "none", left: 55, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Registration Date & Time</TableCell>}
                                    {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell style={{ position: 'sticky', borderRight: "none", left: 185, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Authorization Date & Time</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateID && <TableCell style={{ position: 'sticky', borderRight: "none", left: 315, backgroundColor: '#fff', zIndex: 10, width: 140 }}>Affiliate Id</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateName && <TableCell style={{ position: 'sticky', borderRight: "none", left: 455, backgroundColor: '#fff', zIndex: 10, width: 160, boxShadow: "10px 10px 24px -8px rgb(42 57 78 / 16%)" }}>Affiliate Name</TableCell>}


                                    {afterSubmitSelectedRow?.State && <TableCell style={{ borderRight: "none" }} width={120} >State</TableCell>}
                                    {afterSubmitSelectedRow?.District && <TableCell style={{ borderRight: "none" }} width={120}>District</TableCell>}
                                    {afterSubmitSelectedRow?.Taluka && <TableCell style={{ borderRight: "none" }} width={120}>Taluka</TableCell>}
                                    {afterSubmitSelectedRow?.Pincode && <TableCell style={{ borderRight: "none" }} width={90}>Pincode</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateRank && <TableCell style={{ borderRight: "none" }} width={140}>Affiliate Rank</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateType && <TableCell style={{ borderRight: "none" }} width={130}>Affiliate Type</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateMobileNo && <TableCell style={{ borderRight: "none" }} width={140}>Mobile</TableCell>}
                                    {afterSubmitSelectedRow?.EmailID && <TableCell style={{ borderRight: "none" }} textAlign="left" width={260}>Email ID</TableCell>}
                                    {afterSubmitSelectedRow?.SponsorType && <TableCell style={{ borderRight: "none" }} width={140}>Sponsor Type</TableCell>}
                                    {afterSubmitSelectedRow?.SponsorRank && <TableCell style={{ borderRight: "none" }} width={140}>Sponsor Rank</TableCell>}
                                    {afterSubmitSelectedRow?.Sponsorid && <TableCell style={{ borderRight: "none" }} width={140}>Sponser id</TableCell>}
                                    {afterSubmitSelectedRow?.SponsorName && <TableCell style={{ borderRight: "none" }} width={140}>Sponsor Name</TableCell>}
                                    {afterSubmitSelectedRow?.SponsorMobileNo && <TableCell style={{ borderRight: "none" }} width={140}>Sponsor Mobile No.</TableCell>}
                                    {afterSubmitSelectedRow?.ViewUplineList && <TableCell style={{ borderRight: "none" }} width={110}>View Upline List</TableCell>}
                                    {afterSubmitSelectedRow?.Team && <TableCell style={{ borderRight: "none" }} width={90}>Team</TableCell>}
                                    {afterSubmitSelectedRow?.PendingLeads && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}><Box className='center' >Pending Leads  <FilterAltOutlinedIcon className='pointer' onClick={pendingLeadsOpen} id="basic-button" /></Box>
                                        <PendingLeadsModal pendingLeads={pendingLeads} pendingLeadsClose={pendingLeadsClose} />

                                    </TableCell>}

                                    {afterSubmitSelectedRow?.SelfPurchaseDV && <TableCell style={{ borderRight: "none" }} width={130}>Self Purchase DV</TableCell>}
                                    {afterSubmitSelectedRow?.My1stLevelTotalPurchaseDV && <TableCell style={{ borderRight: "none" }} width={160}>My 1st Level Total Purchase DV </TableCell>}
                                    {afterSubmitSelectedRow?.AuthorizedMembersInsecondlevel && <TableCell style={{ borderRight: "none" }} width={190}>Authorized Members In second level </TableCell>}
                                    {afterSubmitSelectedRow?.TotalActiveIncome && <TableCell style={{ borderRight: "none" }} width={130}>Total Active Income</TableCell>}
                                    {afterSubmitSelectedRow?.TotalPassiveIncome && <TableCell style={{ borderRight: "none" }} width={130}>Total Passive Income</TableCell>}
                                    {afterSubmitSelectedRow?.DematActiveIncome && <TableCell style={{ borderRight: "none" }} width={150}>Demat A/C Active Income</TableCell>}
                                    {afterSubmitSelectedRow?.CoursesActiveIncome && <TableCell style={{ borderRight: "none" }} width={150}>Courses Active Income</TableCell>}
                                    {afterSubmitSelectedRow?.InsuranceActiveIncome && <TableCell style={{ borderRight: "none" }} width={150}>Insurance Active Income</TableCell>}
                                    {afterSubmitSelectedRow?.InvestmentActiveIncome && <TableCell style={{ borderRight: "none" }} width={150}>Investment Active Income</TableCell>}
                                    {afterSubmitSelectedRow?.Primerequest && <TableCell style={{ borderRight: "none" }} width={90}>Prime request</TableCell>}
                                    {afterSubmitSelectedRow?.KYCStatus && <TableCell style={{ borderRight: "none" }} width={90}>KYC Status</TableCell>}
                                    {afterSubmitSelectedRow?.NomineeStatus && <TableCell style={{ borderRight: "none" }} width={90}>Nominee Status</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateStatus && <TableCell style={{ borderRight: "none" }} width={90}>Affiliate Status</TableCell>}
                                    {afterSubmitSelectedRow?.BlockReason && <TableCell style={{ borderRight: "none" }} width={90}>Block Reason</TableCell>}
                                    {afterSubmitSelectedRow?.LastCommunication && <TableCell style={{ borderRight: "none" }} width={140}>Last Communication</TableCell>}
                                    {afterSubmitSelectedRow?.NoteReminder && <TableCell style={{ borderRight: "none" }} width={100}>Note & Reminder</TableCell>}
                                    {afterSubmitSelectedRow?.Action && <TableCell style={{ borderRight: "none" }} width={90}>Action</TableCell>}
                                    {afterSubmitSelectedRow?.SmartPeWalletBalance && <TableCell style={{ borderRight: "none" }} width={110}>SmartPe Wallet Balance</TableCell>}
                                    {afterSubmitSelectedRow?.TotalEarning && <TableCell style={{ borderRight: "none" }} width={90}>Total Earning</TableCell>}
                                    {afterSubmitSelectedRow?.MainActiveIncome && <TableCell style={{ borderRight: "none" }} width={140}>Main Active Income </TableCell>}
                                    {afterSubmitSelectedRow?.MainPassiveIncome && <TableCell style={{ borderRight: "none" }} width={140}>Main Passive Income </TableCell>}
                                    {afterSubmitSelectedRow?.RewardIncome && <TableCell style={{ borderRight: "none" }} width={90}>Reward Income</TableCell>}
                                    {afterSubmitSelectedRow?.SalaryIncome && <TableCell style={{ borderRight: "none" }} width={90}>Salary Income</TableCell>}
                                    {afterSubmitSelectedRow?.RoyaltyIncome && <TableCell style={{ borderRight: "none" }} width={90}>Royalty Income</TableCell>}
                                    {afterSubmitSelectedRow?.SIPMFFund && <TableCell style={{ borderRight: "none" }} width={90}>SIP / MF Fund</TableCell>}
                                    {afterSubmitSelectedRow?.LaptopFund && <TableCell style={{ borderRight: "none" }} width={90}>Laptop Fund </TableCell>}
                                    {afterSubmitSelectedRow?.BikeFund && <TableCell style={{ borderRight: "none" }} width={90}>Bick Fund </TableCell>}
                                    {afterSubmitSelectedRow?.CarFund && <TableCell style={{ borderRight: "none" }} width={90}>Car Fund </TableCell>}
                                    {afterSubmitSelectedRow?.HouseFund && <TableCell style={{ borderRight: "none" }} width={90}>House Fund </TableCell>}
                                    {afterSubmitSelectedRow?.TravelFund && <TableCell style={{ borderRight: "none" }} width={90}>Travel Fund</TableCell>}
                                    {afterSubmitSelectedRow?.InsuranceFund && <TableCell style={{ borderRight: "none" }} width={90}>Insurance Fund</TableCell>}
                                    {afterSubmitSelectedRow?.ChildHigherEducationFund && <TableCell style={{ borderRight: "none" }} width={160}>Child Higher Education Fund</TableCell>}
                                    {afterSubmitSelectedRow?.MarriageBurdenReliefFund && <TableCell style={{ borderRight: "none" }} width={160}>Marriage Burden Relief Fund</TableCell>}
                                    {afterSubmitSelectedRow?.TotalWithdrawal && <TableCell style={{ borderRight: "none" }} width={120}>Total Withdrawal </TableCell>}
                                    {afterSubmitSelectedRow?.TDSBalance && <TableCell style={{ borderRight: "none" }} width={110}>TDS Balance </TableCell>}
                                    {afterSubmitSelectedRow?.TDSPaid && <TableCell style={{ borderRight: "none" }} width={110}>TDS Paid</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row, id) => (
                                    <TableRow
                                        hover
                                        key={id} style={{ textAlign: "left" }}>
                                        <TableCell align="left" style={{ position: 'sticky', left: 0, backgroundColor: '#fff', borderRight: "none" }}>
                                            {id + 1}
                                        </TableCell>
                                        {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell align="left" style={{ position: 'sticky', left: 55, backgroundColor: '#fff', zIndex: 9, borderRight: "none" }}>{formatDate(row?.registration_date)}</TableCell>}
                                        {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell align="left" style={{ position: 'sticky', left: 185, backgroundColor: '#fff', zIndex: 9, borderRight: "none" }}>{formatDate(row?.authorization_date)}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateID && <TableCell align="left" style={{ position: 'sticky', left: 315, backgroundColor: '#fff', zIndex: 9, borderRight: "none" }}>{row?.authorization_id}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateName && <TableCell align="left" style={{ position: 'sticky', left: 455, backgroundColor: '#fff', zIndex: 9, borderRight: "none", boxShadow: "10px 10px 24px -8px rgb(42 57 78 / 16%)" }}>{row?.first_name + " " + row?.last_name}</TableCell>}
                                        {afterSubmitSelectedRow?.State && <TableCell style={{ borderRight: "none" }} align="left">{row?.state}</TableCell>}
                                        {afterSubmitSelectedRow?.District && <TableCell style={{ borderRight: "none" }} align="left">{row?.district}</TableCell>}
                                        {afterSubmitSelectedRow?.Taluka && <TableCell style={{ borderRight: "none" }} align="left">{row?.block}</TableCell>}
                                        {afterSubmitSelectedRow?.Pincode && <TableCell style={{ borderRight: "none" }} align="left">{row?.pincode}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateRank && <TableCell style={{ borderRight: "none" }} align="left">{row?.affiliate_rank}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateType && <TableCell style={{ borderRight: "none" }} align="left">{2}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateMobileNo && <TableCell style={{ borderRight: "none" }} align="left">{row?.mobile}</TableCell>}
                                        {afterSubmitSelectedRow?.EmailID && <TableCell style={{ borderRight: "none" }} align="left">{row?.email}</TableCell>}
                                        {afterSubmitSelectedRow?.SponsorType && <TableCell style={{ borderRight: "none" }} align="left">{row.city}</TableCell>}
                                        {afterSubmitSelectedRow?.SponsorRank && <TableCell style={{ borderRight: "none" }} align="left">{row?.sponsor_rank}</TableCell>}
                                        {afterSubmitSelectedRow?.Sponsorid && <TableCell style={{ borderRight: "none" }} align="left">{row?.ref_mlm_id}</TableCell>}
                                        {afterSubmitSelectedRow?.SponsorName && <TableCell style={{ borderRight: "none" }} align="left">{row?.ref_first_name}</TableCell>}
                                        {afterSubmitSelectedRow?.SponsorMobileNo && <TableCell style={{ borderRight: "none" }} align="left">{row?.ref_mobile}</TableCell>}
                                        {afterSubmitSelectedRow?.ViewUplineList && <TableCell style={{ borderRight: "none" }} align="left">{row.age}</TableCell>}
                                        {afterSubmitSelectedRow?.Team && <TableCell style={{ borderRight: "none" }} align="left">{row.city}</TableCell>}
                                        {afterSubmitSelectedRow?.PendingLeads && <TableCell style={{ borderRight: "none" }} align="left">{row?.pending_leads}</TableCell>}
                                        {afterSubmitSelectedRow?.SelfPurchaseDV && <TableCell style={{ borderRight: "none" }} align="left">{row?.self_dv}</TableCell>}
                                        {afterSubmitSelectedRow?.My1stLevelTotalPurchaseDV && <TableCell style={{ borderRight: "none" }} align="left">{row?.firstlevel_dv}</TableCell>}
                                        {afterSubmitSelectedRow?.AuthorizedMembersInsecondlevel && <TableCell style={{ borderRight: "none" }} align="left">{row.name}</TableCell>}
                                        {afterSubmitSelectedRow?.TotalActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.totalactive_bal}</TableCell>}
                                        {afterSubmitSelectedRow?.TotalPassiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.totalpassive_bal}</TableCell>}
                                        {afterSubmitSelectedRow?.DematActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.demat_active_income}</TableCell>}
                                        {afterSubmitSelectedRow?.CoursesActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.courses_active_income}</TableCell>}
                                        {afterSubmitSelectedRow?.InsuranceActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.insurance_active_income}</TableCell>}
                                        {afterSubmitSelectedRow?.InvestmentActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.investment_active_income}</TableCell>}
                                        {afterSubmitSelectedRow?.Primerequest && <TableCell style={{ borderRight: "none" }} align="left">{row.age}</TableCell>}
                                        {afterSubmitSelectedRow?.KYCStatus && <TableCell style={{ borderRight: "none" }} align="left">{row?.kyc_status}</TableCell>}
                                        {afterSubmitSelectedRow?.NomineeStatus && <TableCell style={{ borderRight: "none" }} align="left">{row.name}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateStatus && <TableCell style={{ borderRight: "none" }} align="left">{row.age}</TableCell>}
                                        {afterSubmitSelectedRow?.BlockReason && <TableCell style={{ borderRight: "none" }} align="left">{row?.block}</TableCell>}
                                        {afterSubmitSelectedRow?.LastCommunication && <TableCell style={{ borderRight: "none" }} align="left">{row.name}</TableCell>}
                                        {afterSubmitSelectedRow?.NoteReminder && <TableCell style={{ borderRight: "none" }} align="left">{row.age}</TableCell>}
                                        {afterSubmitSelectedRow?.Action && <TableCell style={{ borderRight: "none" }} align="left">{row.city}</TableCell>}
                                        {afterSubmitSelectedRow?.SmartPeWalletBalance && <TableCell style={{ borderRight: "none" }} align="left">{row.name}</TableCell>}
                                        {afterSubmitSelectedRow?.TotalEarning && <TableCell style={{ borderRight: "none" }} align="left">{row.age}</TableCell>}
                                        {afterSubmitSelectedRow?.MainActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row.city}</TableCell>}
                                        {afterSubmitSelectedRow?.MainPassiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row.name}</TableCell>}
                                        {afterSubmitSelectedRow?.RewardIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.total_reward}</TableCell>}
                                        {afterSubmitSelectedRow?.SalaryIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.salary_fund}</TableCell>}
                                        {afterSubmitSelectedRow?.RoyaltyIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.total_royality}</TableCell>}
                                        {afterSubmitSelectedRow?.SIPMFFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.sip_amount}</TableCell>}
                                        {afterSubmitSelectedRow?.LaptopFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.laptop_amount}</TableCell>}
                                        {afterSubmitSelectedRow?.BikeFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.bike_amount}</TableCell>}
                                        {afterSubmitSelectedRow?.CarFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.car_amount}</TableCell>}
                                        {afterSubmitSelectedRow?.HouseFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.house_amount}</TableCell>}
                                        {afterSubmitSelectedRow?.TravelFund && <TableCell style={{ borderRight: "none" }} align="left">{row.name}</TableCell>}
                                        {afterSubmitSelectedRow?.InsuranceFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.insurance_amount}</TableCell>}
                                        {afterSubmitSelectedRow?.ChildHigherEducationFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.child_education}</TableCell>}
                                        {afterSubmitSelectedRow?.MarriageBurdenReliefFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.marraige_fund}</TableCell>}
                                        {afterSubmitSelectedRow?.TotalWithdrawal && <TableCell style={{ borderRight: "none" }} align="left">{row?.withdrawal_amount}</TableCell>}
                                        {afterSubmitSelectedRow?.TDSBalance && <TableCell style={{ borderRight: "none" }} align="left">{row.city}</TableCell>}
                                        {afterSubmitSelectedRow?.TDSPaid && <TableCell align="left">{row.name}</TableCell>}


                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={90}
                        rowsPerPage={10}
                        page={0}
                        onPageChange={() => { }}
                        onRowsPerPageChange={() => { }}
                        style={{ backgroundColor: "white" }}
                    />
                </Box>

                <CustomizetableModal Customizetable={Customizetable} CustomizetableClose={CustomizetableClose} handleChange={handleChange} selectedTableRow={selectedTableRow} pinnedTableRow={pinnedTableRow} handleChangePin={handleChangePin} setAfterSubmitSelectedRow={setAfterSubmitSelectedRow} setselectedTableRow={setselectedTableRow} />

            </Box>

        </Layout>
    );
};

export default StickyTable;
