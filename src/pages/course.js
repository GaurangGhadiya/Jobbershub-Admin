import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import Filter from '@/components/Filter/Filter';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ExposureIcon from '@mui/icons-material/Exposure';
import DownloadIcon from '@mui/icons-material/Download';
import TableTop from '@/components/TableTop.js';
import CustomizetableModal from '@/components/Modals/CustomizeTableModal';
import Layout from '@/components/Layout/Layout';
import SellerFilter from '@/components/Filter/SellerFilter';
import SellerTableTop from '@/components/TableTop.js/SellerTableTop';
import axios from 'axios';
import CourseTableTop from '@/components/TableTop.js/CourseTableTop';
import CourseFilter from '@/components/Filter/CourseFilter';

const Course = () => {
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
        const [countData, setCountData] = useState({})
        const [loading, setLoading] = useState(false)
    
    const [pinnedTableRow, setpinnedTableRow] = useState([])
    const rows = [
        { id: 1, name: 'John Doe', age: 29, city: 'New York' },
        { id: 2, name: 'Jane Smith', age: 34, city: 'Los Angeles' },
        { id: 3, name: 'Sam Brown', age: 25, city: 'Chicago' },
        { id: 4, name: 'Lisa White', age: 27, city: 'San Francisco' },
        // Add more rows if necessary
    ];

    const getCount = async () => {
        setLoading(true)
        await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/report/user-summary-dashboard`).then(res => {
            console.log('api response', res)
            setCountData(res?.data)
            setLoading(false)

        }).catch(e => {
            setLoading(false)

            console.log('e', e)
        })

    }

       useEffect(() => {
            // getTableData()
            getCount()
        }, [])

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
         <Box  p={2} style={{backgroundColor : "#f5f5f5"}}>
            <CourseTableTop countData={countData}/>
            <Box  backgroundColor="#FFE9DD" className="topborder" px={3} py={1} color={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Box>
                    <Typography fontSize={20} color={"#000000"} fontWeight={900}>My Courses</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box borderRadius={"4px"} padding={"5px 10px"} backgroundColor={"#ED6A0F"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={15} fontWeight={600} display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"white"}>
                            {/* <ExposureIcon />&nbsp;   */}
                              Add Course</Typography>
                    </Box>
                    {/* <Box borderRadius={"10px"} padding={"5px 10px"} backgroundColor={"#F7F5DD"} ml={2} style={{ cursor: "pointer" }}>
                        <Typography fontSize={15} fontWeight={600} display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"#707070"}><DownloadIcon />&nbsp;    Download Report</Typography>
                    </Box> */}
                    <Box ml={5} onClick={() => setOpenFilter(!openFilter)}>
                        {openFilter ? <RemoveIcon style={{ cursor: "pointer", fontSize: "40px", color: "#000000" }} /> :
                            <AddIcon style={{ cursor: "pointer", fontSize: "40px", color: "#000000" }} />}

                    </Box>
                </Box>
            </Box>
            {openFilter && <CourseFilter />}
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
                                sx={{
                                    height: "30px", // Adjust the height of the select box
                                    "& .MuiSelect-select": {
                                      padding: "5px 12px", // Adjust padding for better alignment
                                    },
                                  }}
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

                <Table stickyHeader style={{ tableLayout: 'fixed', width: '100%', backgroundColor : "white" }}>
                    <TableHead >
                        <TableRow>
                            <TableCell style={{ position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 10, width: 55, textAlign: 'center' }}>#</TableCell>
                            {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell style={{ position: 'sticky', left: 55, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Created</TableCell>}
                            {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell style={{ position: 'sticky', left: 185, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Creator</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateID && <TableCell style={{ position: 'sticky', left: 315, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Language</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateName && <TableCell style={{ position: 'sticky', left: 445, backgroundColor: '#fff', zIndex: 10, width: 130,boxShadow: "10px 10px 24px -8px rgb(42 57 78 / 16%)" }}>Category</TableCell>}


                            {afterSubmitSelectedRow?.State && <TableCell width={150} >Course</TableCell>}
                            {afterSubmitSelectedRow?.District && <TableCell width={150}>Discounted Price</TableCell>}
                            {afterSubmitSelectedRow?.Taluka && <TableCell width={150}>GST</TableCell>}
                            {afterSubmitSelectedRow?.Pincode && <TableCell width={160}>Marketing Fee</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateRank && <TableCell width={150}>Slotting Fee</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateType && <TableCell width={150}>My Net Profit</TableCell>}
                            {afterSubmitSelectedRow?.AffiliateMobileNo && <TableCell width={150}>Rating</TableCell>}
                            {afterSubmitSelectedRow?.EmailID && <TableCell width={150}>Request</TableCell>}
                            {afterSubmitSelectedRow?.SponsorType && <TableCell width={150}>Status</TableCell>}
                            {afterSubmitSelectedRow?.SponsorRank && <TableCell width={150}>Action</TableCell>}
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                hover
                                key={row.id} style={{ textAlign: "center" }}>
                                <TableCell align="center" style={{ position: 'sticky', left: 0, backgroundColor: '#fff' }}>
                                    {row.id}
                                </TableCell>
                                {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell align="center" style={{ position: 'sticky', left: 55, backgroundColor: '#fff', zIndex: 9 }}>9 May 2023 11:22 Am</TableCell>}
                                {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell align="center" style={{ position: 'sticky', left: 185, backgroundColor: '#fff', zIndex: 9 }}>9 May 2023 11:22 Am</TableCell>}
                                {afterSubmitSelectedRow?.AffiliateID && <TableCell align="center" style={{ position: 'sticky', left: 315, backgroundColor: '#fff', zIndex: 9 }}>3423</TableCell>}
                                {afterSubmitSelectedRow?.AffiliateName && <TableCell align="center" style={{ position: 'sticky', left: 445, backgroundColor: '#fff', zIndex: 9,boxShadow: "10px 10px 24px -8px rgb(42 57 78 / 16%)" }}>Ramesh Jadhav</TableCell>}
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
                style={{backgroundColor : "white"}}

            />
            <CustomizetableModal Customizetable={Customizetable} CustomizetableClose={CustomizetableClose} handleChange={handleChange} selectedTableRow={selectedTableRow} pinnedTableRow={pinnedTableRow} handleChangePin={handleChangePin} setAfterSubmitSelectedRow={setAfterSubmitSelectedRow} setselectedTableRow={setselectedTableRow}/>

        </Box>
       </Layout>
    );
};

export default Course;
