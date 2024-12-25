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

const StickyTable = () => {
    const [openFilter, setOpenFilter] = useState(true);
    const [Customizetable, setCustomizetable] = useState(false)
    const [selectedTableRow, setselectedTableRow] = useState({
        RegistrationDateTime : true,
        AuthorizationDateTime : true,
        AffiliateID : true,
        AffiliateName : true,
        State : true,
        District : true,
        Taluka : true,
        Pincode : true,
        AffiliateRank : true,
        AffiliateType : true,
        AffiliateMobileNo : true,
        EmailID : true,
        SponsorType : true,
        SponsorRank : true,
        Sponsorid : true,
        SponsorName : true,
        SponsorMobileNo : true,
        ViewUplineList : true,
        Team : true,
        PendingLeads : true,
        SelfPurchaseDV : true,
        My1stLevelTotalPurchaseDV : true,
        AuthorizedMembersInsecondlevel : true,
        TotalActiveIncome : true,
        TotalPassiveIncome : true,
        DematActiveIncome : true,
        CoursesActiveIncome : true,
        InsuranceActiveIncome : true,
        InvestmentActiveIncome : true,
        Primerequest : true,
        KYCStatus : true,
        NomineeStatus : true,
        AffiliateStatus : true,
        BlockReason : true,
        LastCommunication : true,
        NoteReminder : true,
        Action : true,
        TotalEarning : true,
        MainActiveIncome : true,
        MainPassiveIncome : true,
        RewardIncome : true,
        SalaryIncome : true,
        RoyaltyIncome : true,
        SIPMFFund : true,
        LaptopFund : true,
        BikeFund : true,
        CarFund : true,
        HouseFund : true,
        TravelFund : true,
        InsuranceFund : true,
        ChildHigherEducationFund : true,
        MarriageBurdenReliefFund : true,
        TotalWithdrawal : true,
        TDSBalance : true,
        TDSPaid : true,
    })
    const [afterSubmitSelectedRow, setAfterSubmitSelectedRow] = useState({
        RegistrationDateTime : true,
        AuthorizationDateTime : true,
        AffiliateID : true,
        AffiliateName : true,
        State : true,
        District : true,
        Taluka : true,
        Pincode : true,
        AffiliateRank : true,
        AffiliateType : true,
        AffiliateMobileNo : true,
        EmailID : true,
        SponsorType : true,
        SponsorRank : true,
        Sponsorid : true,
        SponsorName : true,
        SponsorMobileNo : true,
        ViewUplineList : true,
        Team : true,
        PendingLeads : true,
        SelfPurchaseDV : true,
        My1stLevelTotalPurchaseDV : true,
        AuthorizedMembersInsecondlevel : true,
        TotalActiveIncome : true,
        TotalPassiveIncome : true,
        DematActiveIncome : true,
        CoursesActiveIncome : true,
        InsuranceActiveIncome : true,
        InvestmentActiveIncome : true,
        Primerequest : true,
        KYCStatus : true,
        NomineeStatus : true,
        AffiliateStatus : true,
        BlockReason : true,
        LastCommunication : true,
        NoteReminder : true,
        Action : true,
        TotalEarning : true,
        MainActiveIncome : true,
        MainPassiveIncome : true,
        RewardIncome : true,
        SalaryIncome : true,
        RoyaltyIncome : true,
        SIPMFFund : true,
        LaptopFund : true,
        BikeFund : true,
        CarFund : true,
        HouseFund : true,
        TravelFund : true,
        InsuranceFund : true,
        ChildHigherEducationFund : true,
        MarriageBurdenReliefFund : true,
        TotalWithdrawal : true,
        TDSBalance : true,
        TDSPaid : true,
    })
    const [pinnedTableRow, setpinnedTableRow] = useState([])
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

    return (
       <Layout>
         <>
            <TableTop />
            <Box backgroundColor="#FFE9DD" px={3} py={1} color={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
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
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={2}>
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
            <TableContainer component={Box}  style={{
    maxHeight: '600px', // Fixed height for vertical scroll
    maxWidth: '100%', // Optional: Limit the width if necessary
    overflowX: 'auto', // Enable horizontal scrolling only inside the table container
    overflowY: 'auto', // Enable vertical scrolling inside the table container
    fontSize: '16px',
  }}>

                <Table stickyHeader style={{ tableLayout: 'fixed', width: '100%' }}>
                    <TableHead >
                        <TableRow>
                            <TableCell style={{ position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 10, width: 55, textAlign: 'center' }}>#</TableCell>
                            {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell style={{ position: 'sticky', left: 55, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Registration Date & Time</TableCell>}
                            {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell style={{ position: 'sticky', left: 185, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Authorization Date & Time</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateID && <TableCell style={{ position: 'sticky', left: 315, backgroundColor: '#fff', zIndex: 10, width: 90 }}>Affiliate Id</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateName && <TableCell style={{ position: 'sticky', left: 405, backgroundColor: '#fff', zIndex: 10, width: 92 }}>Affiliate Name</TableCell>}


                            {afterSubmitSelectedRow?.State && <TableCell width={90} >State</TableCell>}
                            {afterSubmitSelectedRow?.District && <TableCell width={90}>District</TableCell>}
                            {afterSubmitSelectedRow?.Taluka && <TableCell width={90}>Taluka</TableCell>}
                            {afterSubmitSelectedRow?.Pincode && <TableCell width={90}>Pincode</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateRank && <TableCell width={90}>Affiliate Rank</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateType && <TableCell width={90}>Affiliate Type</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateMobileNo && <TableCell width={90}>Mobile</TableCell>}
                            {afterSubmitSelectedRow?.EmailID && <TableCell width={60}>Email ID</TableCell>}
                            {afterSubmitSelectedRow?.SponsorType && <TableCell width={90}>Sponsor Type</TableCell>}
                            {afterSubmitSelectedRow?.SponsorRank && <TableCell width={90}>Sponsor Rank</TableCell>}
                            {afterSubmitSelectedRow?.Sponsorid && <TableCell width={90}>Sponser id</TableCell>}
                            {afterSubmitSelectedRow?.SponsorName && <TableCell width={90}>Sponsor Name</TableCell>}
                            {afterSubmitSelectedRow?.SponsorMobileNo && <TableCell width={110}>Sponsor Mobile No.</TableCell>}
                            {afterSubmitSelectedRow?.ViewUplineList && <TableCell width={110}>View Upline List</TableCell>}
                            {afterSubmitSelectedRow?.Team && <TableCell width={90}>Team</TableCell>}
                            {afterSubmitSelectedRow?.PendingLeads && <TableCell width={90}>Pending Leads</TableCell>}
                            {afterSubmitSelectedRow?.SelfPurchaseDV && <TableCell width={130}>Self Purchase DV</TableCell>}
                            {afterSubmitSelectedRow?.My1stLevelTotalPurchaseDV && <TableCell width={160}>My 1st Level Total Purchase DV </TableCell>}
                            {afterSubmitSelectedRow?.AuthorizedMembersInsecondlevel && <TableCell width={190}>Authorized Members In second level </TableCell>}
                            {afterSubmitSelectedRow?.TotalActiveIncome && <TableCell width={130}>Total Active Income</TableCell>}
                            {afterSubmitSelectedRow?.TotalPassiveIncome && <TableCell width={130}>Total Passive Income</TableCell>}
                            {afterSubmitSelectedRow?.DematActiveIncome && <TableCell width={150}>Demat A/C Active Income</TableCell>}
                            {afterSubmitSelectedRow?.CoursesActiveIncome && <TableCell width={150}>Courses Active Income</TableCell>}
                            {afterSubmitSelectedRow?.InsuranceActiveIncome && <TableCell width={150}>Insurance Active Income</TableCell>}
                            {afterSubmitSelectedRow?.InvestmentActiveIncome && <TableCell width={150}>Investment Active Income</TableCell>}
                            {afterSubmitSelectedRow?.Primerequest && <TableCell width={90}>Prime request</TableCell>}
                            {afterSubmitSelectedRow?.KYCStatus && <TableCell width={90}>KYC Status</TableCell>}
                            {afterSubmitSelectedRow?.NomineeStatus && <TableCell width={90}>Nominee Status</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateStatus && <TableCell width={90}>Affiliate Status</TableCell>}
                            {afterSubmitSelectedRow?.BlockReason && <TableCell width={90}>Block Reason</TableCell>}
                            {afterSubmitSelectedRow?.LastCommunication && <TableCell width={140}>Last Communication</TableCell>}
                            {afterSubmitSelectedRow?.NoteReminder && <TableCell width={100}>Note & Reminder</TableCell>}
                            {afterSubmitSelectedRow?.Action && <TableCell width={90}>Action</TableCell>}
                            {afterSubmitSelectedRow?.SmartPeWalletBalance && <TableCell width={110}>SmartPe Wallet Balance</TableCell>}
                            {afterSubmitSelectedRow?.TotalEarning && <TableCell width={90}>Total Earning</TableCell>}
                            {afterSubmitSelectedRow?.MainActiveIncome && <TableCell width={140}>Main Active Income </TableCell>}
                            {afterSubmitSelectedRow?.MainPassiveIncome && <TableCell width={140}>Main Passive Income </TableCell>}
                            {afterSubmitSelectedRow?.RewardIncome && <TableCell width={90}>Reward Income</TableCell>}
                            {afterSubmitSelectedRow?.SalaryIncome && <TableCell width={90}>Salary Income</TableCell>}
                            {afterSubmitSelectedRow?.RoyaltyIncome && <TableCell width={90}>Royalty Income</TableCell>}
                            {afterSubmitSelectedRow?.SIPMFFund && <TableCell width={90}>SIP / MF Fund</TableCell>}
                            {afterSubmitSelectedRow?.LaptopFund && <TableCell width={90}>Laptop Fund </TableCell>}
                            {afterSubmitSelectedRow?.BikeFund && <TableCell width={90}>Bick Fund </TableCell>}
                            {afterSubmitSelectedRow?.CarFund && <TableCell width={90}>Car Fund </TableCell>}
                            {afterSubmitSelectedRow?.HouseFund && <TableCell width={90}>House Fund </TableCell>}
                            {afterSubmitSelectedRow?.TravelFund && <TableCell width={90}>Travel Fund</TableCell>}
                            {afterSubmitSelectedRow?.InsuranceFund && <TableCell width={90}>Insurance Fund</TableCell>}
                            {afterSubmitSelectedRow?.ChildHigherEducationFund && <TableCell width={160}>Child Higher Education Fund</TableCell>}
                            {afterSubmitSelectedRow?.MarriageBurdenReliefFund && <TableCell width={160}>Marriage Burden Relief Fund</TableCell>}
                            {afterSubmitSelectedRow?.TotalWithdrawal && <TableCell width={120}>Total Withdrawal </TableCell>}
                            {afterSubmitSelectedRow?.TDSBalance && <TableCell width={110}>TDS Balance </TableCell>}
                            {afterSubmitSelectedRow?.TDSPaid && <TableCell width={110}>TDS Paid</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                // hover
                                key={row.id} style={{ textAlign: "center" }}>
                                <TableCell align="center" style={{ position: 'sticky', left: 0, backgroundColor: '#fff' }}>
                                    {row.id}
                                </TableCell>
                                {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell align="center" style={{ position: 'sticky', left: 55, backgroundColor: '#fff', zIndex: 9 }}>9 May 2023 11:22 Am</TableCell>}
                                {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell align="center" style={{ position: 'sticky', left: 185, backgroundColor: '#fff', zIndex: 9 }}>9 May 2023 11:22 Am</TableCell>}
                                {afterSubmitSelectedRow?.AffiliateID && <TableCell align="center" style={{ position: 'sticky', left: 315, backgroundColor: '#fff', zIndex: 9 }}>3423</TableCell>}
                                {afterSubmitSelectedRow?.AffiliateName && <TableCell align="center" style={{ position: 'sticky', left: 405, backgroundColor: '#fff', zIndex: 9 }}>Ramesh Jadhav</TableCell>}
                                {afterSubmitSelectedRow?.State && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.District && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.Taluka && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.Pincode && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.AffiliateRank && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.AffiliateType && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.AffiliateMobileNo && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.EmailID && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.SponsorType && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.SponsorRank && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.Sponsorid && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.SponsorName && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.SponsorMobileNo && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.ViewUplineList && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.Team && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.PendingLeads && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.SelfPurchaseDV && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.My1stLevelTotalPurchaseDV && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.AuthorizedMembersInsecondlevel && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.TotalActiveIncome && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.TotalPassiveIncome && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.DematActiveIncome && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.CoursesActiveIncome && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.InsuranceActiveIncome && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.InvestmentActiveIncome && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.Primerequest && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.KYCStatus && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.NomineeStatus && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.AffiliateStatus && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.BlockReason && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.LastCommunication && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.NoteReminder && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.Action && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.SmartPeWalletBalance && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.TotalEarning && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.MainActiveIncome && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.MainPassiveIncome && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.RewardIncome && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.SalaryIncome && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.RoyaltyIncome && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.SIPMFFund && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.LaptopFund && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.BikeFund && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.CarFund && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.HouseFund && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.TravelFund && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.InsuranceFund && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.ChildHigherEducationFund && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.MarriageBurdenReliefFund && <TableCell align="center">{row.name}</TableCell>}
                                {afterSubmitSelectedRow?.TotalWithdrawal && <TableCell align="center">{row.age}</TableCell>}
                                {afterSubmitSelectedRow?.TDSBalance && <TableCell align="center">{row.city}</TableCell>}
                                {afterSubmitSelectedRow?.TDSPaid && <TableCell align="center">{row.name}</TableCell>}


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
           
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={90}
                rowsPerPage={10}
                page={0}
                onPageChange={() => { }}
                onRowsPerPageChange={() => { }}
            />
            <CustomizetableModal Customizetable={Customizetable} CustomizetableClose={CustomizetableClose} handleChange={handleChange} selectedTableRow={selectedTableRow} pinnedTableRow={pinnedTableRow} handleChangePin={handleChangePin} setAfterSubmitSelectedRow={setAfterSubmitSelectedRow} setselectedTableRow={setselectedTableRow}/>

        </>
       </Layout>
    );
};

export default StickyTable;
