import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Typography, FormControl, Select, MenuItem, Pagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
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
import { formatDateWithTime } from '../../utils/formatDate';
import TextAreaComponent from '@/components/TextAreaComponent';
import Title from '@/components/Title';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const StickyTable = () => {
    const router = useRouter()
    const [openFilter, setOpenFilter] = useState(true);
    const [Customizetable, setCustomizetable] = useState(false)
    const [totlaPage, setTotlaPage] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [tableData, setTableData] = useState([])
        const [seller_id, setSeller_id] = useState("")
    
    const [modalValue, setModalValue] = useState({ status: 1 })
    const [filterData, setFilterData] = useState({
        page: 1,
        pagesize: 10
    })
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
    const [countData, setCountData] = useState({})
    const [loading, setLoading] = useState(false)
    const [changeStatusModal, setChangeStatusModal] = useState(false)
    const [clickId, setClickId] = useState("")

    const [pinnedTableRow, setpinnedTableRow] = useState([])
    useEffect(() => {
         Cookies.get('uid') && setSeller_id(Cookies.get('uid'))
     }, [router])

    const getCount = async () => {
        setLoading(true)
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/report/user-summary-dashboard`).then(res => {
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
    const openChangeStatusModal = () => {
        setChangeStatusModal(true);
    };
    const closeChangeStatusModal = () => {
        setChangeStatusModal(false);
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
        try {
            setLoading(true)
            let body = { ...filterData, seller_id: "" }

            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seller/f2f3d8116dc55526be8ab4b97bffc6bb57f28c80`, body).then(res => {
                console.log('api response', res?.data?.data)
                setTableData(res?.data?.data)
                setTotlaPage(res?.data?.totalPages)
                setTotalCount(res?.data?.totalCount)
                setLoading(false)

            }).catch(e => {
                setLoading(false)

                console.log('erro', e)
            })
        } catch (error) {
            setLoading(false)
            console.log('error', error)
        }


    }

    const handleChangeModal = (e) => {
        const { name, value } = e.target
        setModalValue({ ...modalValue, [name]: value })
    }

    useEffect(() => {
        getTableData()
        // getCount()
    }, [filterData?.page, filterData?.pagesize])

    const handleChangeStatus = async () => {
        try {
            setLoading(true)
            let body = { id : clickId, status : modalValue?.status || "", 
                remarks :modalValue?.remarks || "",updated_by : seller_id ||"" }

            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seller/837acaf2d75a3244bb9d28974a623e10c7b7c5e4`, body).then(res => {
                console.log('api response', res?.data)
                getTableData()
                setLoading(false)
                closeChangeStatusModal()
                setModalValue({})
                toast.success("Status Updated Successful.")
            }).catch(e => {
                setLoading(false)
                closeChangeStatusModal()
                console.log('erro', e)
                setModalValue({})

                toast.error("Sonething went wrong")
            })
        } catch (error) {
            setLoading(false)
            setModalValue({})
            closeChangeStatusModal()
            console.log('error', error)
            toast.error("Sonething went wrong")

        }

    }

    return (
        <Layout>
            <Box p={2} style={{ backgroundColor: "#f5f5f5" }}>
                <SellerTableTop countData={countData} />
                <Box backgroundColor="#FFE9DD" className="topborder" px={3} py={1} color={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box>
                        <Typography fontSize={20} color={"#000000"} fontWeight={900}>Seller Dashboard</Typography>
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
                {openFilter && <SellerFilter />}
                <Box height={"20px"} backgroundColor={"#F5F5F5"}></Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={2} backgroundColor={"white"} className="topborder">
                    <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography>Show</Typography>
                        <Box mx={1}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select

                                    value={filterData?.pagesize}
                                    onChange={(e) => setFilterData({ ...filterData, pagesize: e.target.value })}
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
                                    <MenuItem value={25}>25</MenuItem>
                                    <MenuItem value={90}>90</MenuItem>
                                    <MenuItem value={100}>100</MenuItem>
                                    <MenuItem value={250}>250</MenuItem>
                                    <MenuItem value={500}>500</MenuItem>
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

                        <Table stickyHeader style={{ tableLayout: 'fixed', width: '100%', backgroundColor: "white" }}>
                            <TableHead >
                                <TableRow>
                                    <TableCell style={{ position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 10, width: 55, textAlign: 'center' }}>#</TableCell>
                                    {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell style={{ position: 'sticky', left: 55, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Registration Date & Time</TableCell>}
                                    {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell style={{ position: 'sticky', left: 185, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Seller Name</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateID && <TableCell style={{ position: 'sticky', left: 315, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Seller Type</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateName && <TableCell style={{ position: 'sticky', left: 445, backgroundColor: '#fff', zIndex: 10, width: 130, boxShadow: "10px 10px 24px -8px rgb(42 57 78 / 16%)" }}>Seller Mobile Number</TableCell>}


                                    {afterSubmitSelectedRow?.State && <TableCell width={300} >Email ID</TableCell>}
                                    {afterSubmitSelectedRow?.District && <TableCell width={150}>Pan No</TableCell>}
                                    {afterSubmitSelectedRow?.Taluka && <TableCell width={150}>Aadhar No</TableCell>}
                                    {afterSubmitSelectedRow?.Pincode && <TableCell width={160}>Company Name</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateRank && <TableCell width={150}>GST Number</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateType && <TableCell width={150}>Category</TableCell>}
                                    {afterSubmitSelectedRow?.SponsorRank && <TableCell width={150}>KYC Status</TableCell>}
                                    {afterSubmitSelectedRow?.Sponsorid && <TableCell width={150}>Seller Status</TableCell>}
                                    {/* {afterSubmitSelectedRow?.SponsorName && <TableCell width={150}>Block Reason</TableCell>} */}
                                    {/* {afterSubmitSelectedRow?.SponsorMobileNo && <TableCell width={200}>Note & Reminder</TableCell>} */}
                                    {afterSubmitSelectedRow?.ViewUplineList && <TableCell width={150}>Action</TableCell>}

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData?.map((row, i) => (
                                    <TableRow
                                        hover
                                        key={row.id} style={{ textAlign: "left" }}>
                                        <TableCell align="left" style={{ position: 'sticky', left: 0, backgroundColor: '#fff' }}>
                                            {i + 1}
                                        </TableCell>
                                        {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell align="left" style={{ position: 'sticky', left: 55, backgroundColor: '#fff', zIndex: 9 }}>{formatDateWithTime(row?.created_on)}</TableCell>}
                                        {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell align="left" style={{ position: 'sticky', left: 185, backgroundColor: '#fff', zIndex: 9 }}>{row?.name}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateID && <TableCell align="left" style={{ position: 'sticky', left: 315, backgroundColor: '#fff', zIndex: 9 }}>{row?.seller_type}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateName && <TableCell align="left" style={{ position: 'sticky', left: 445, backgroundColor: '#fff', zIndex: 9, boxShadow: "10px 10px 24px -8px rgb(42 57 78 / 16%)" }}>{row?.mobileno}</TableCell>}
                                        {afterSubmitSelectedRow?.State && <TableCell align="left">{row?.email}</TableCell>}
                                        {afterSubmitSelectedRow?.District && <TableCell align="left">{row?.pan_no}</TableCell>}
                                        {afterSubmitSelectedRow?.Taluka && <TableCell align="left">{row?.aadhaar_no}</TableCell>}
                                        {afterSubmitSelectedRow?.Pincode && <TableCell align="left">{row?.category_name}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateRank && <TableCell align="left">{row?.gst_no}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateType && <TableCell align="left">{row?.category_name}</TableCell>}
                                        {afterSubmitSelectedRow?.SponsorRank && <TableCell align="left">{row?.kyc_status ? "Applied" : "Not Applied"}</TableCell>}
                                        {afterSubmitSelectedRow?.Sponsorid && <TableCell align="left">{row?.status == 0 ? "Pending" : row?.status == 1 ? "Approved" :row?.status == 2 ? "Rejected" : "Block"}</TableCell>}
                                        {/* {afterSubmitSelectedRow?.SponsorName && <TableCell align="left">{row.city}</TableCell>} */}
                                        {/* {afterSubmitSelectedRow?.SponsorMobileNo && <TableCell align="left">{row.name1}</TableCell>} */}
                                        {afterSubmitSelectedRow?.ViewUplineList && <TableCell align="left">
                                            <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                                                <Box style={{ cursor: "pointer" }} backgroundColor="#D1732D" borderRadius={"4px"} px={1} py={0.5}><Typography color={"white"} fontSize={12} onClick={() => { openChangeStatusModal(); setClickId(row?.id) }}>Change Status</Typography></Box>


                                            </Box>
                                        </TableCell>}



                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
                        <Typography>Total Records : {totalCount}</Typography>
                        <Pagination count={totlaPage} page={filterData?.page} onChange={(e, v) => setFilterData({ ...filterData, page: v })} />
                    </Box>
                </Box>

                <CustomizetableModal Customizetable={Customizetable} CustomizetableClose={CustomizetableClose} handleChange={handleChange} selectedTableRow={selectedTableRow} pinnedTableRow={pinnedTableRow} handleChangePin={handleChangePin} setAfterSubmitSelectedRow={setAfterSubmitSelectedRow} setselectedTableRow={setselectedTableRow} />
                <Dialog
                    fullWidth={true}
                    maxWidth={"sm"}
                    open={changeStatusModal}
                    onClose={closeChangeStatusModal}
                >
                    <DialogTitle>Change Seller Status</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            <Title title={"Status"} />
                            <RadioGroup
                                row
                                aria-labelledby="status"
                                name="status"
                                value={modalValue?.status}
                                onChange={handleChangeModal}
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Approve" />
                                <FormControlLabel value={2} control={<Radio />} label="Reject" />
                                <FormControlLabel value={3} control={<Radio />} label="Block" />

                            </RadioGroup>
                        </FormControl>
                        <Title title={"Reason"} />
                        <TextAreaComponent
                            name="remarks"
                            value={modalValue?.remarks}
                            onChange={handleChangeModal}
                            placeholder='Enter reason...'
                        />

                    </DialogContent>
                    <DialogActions>
                            <Box style={{ cursor: "pointer" }} backgroundColor="#D1732D" borderRadius={"4px"} px={2} py={1}><Typography color={"white"} fontSize={12} onClick={closeChangeStatusModal}>Close</Typography></Box>
                            <Box style={{ cursor: "pointer" }} mx={1} backgroundColor="green" borderRadius={"4px"} px={2} py={1} onClick={() => { }}><Typography color={"white"} fontSize={12} onClick={handleChangeStatus}>Submit</Typography></Box>


                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
};

export default StickyTable;
