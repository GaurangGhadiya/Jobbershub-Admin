import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Typography, FormControl, Select, MenuItem, Pagination, Menu, Button, IconButton, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent } from '@mui/material';
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
import { useRouter } from 'next/router';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { formatDate, formatDateWithTime } from '../../utils/formatDate';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';


const Course = () => {
    const router = useRouter()
    const [openFilter, setOpenFilter] = useState(true);
    const [Customizetable, setCustomizetable] = useState(false)
    const [totlaPage, setTotlaPage] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [tableData, setTableData] = useState([])
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
    const [seller_id, setSeller_id] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState("")

    const [pinnedTableRow, setpinnedTableRow] = useState([])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const openDeleteModal = () => {
        setDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setDeleteModal(false);
    };

    useEffect(() => {
        if(router?.query?.id){
            setSeller_id(router?.query?.id)
        }else{

            Cookies.get('uid') && setSeller_id(Cookies.get('uid'))
        }
    }, [router])

    const getTableData = async () => {
        try {
            setLoading(true)
            let body = { ...filterData, seller_id: seller_id }

            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/course/get-course-leads`, body).then(res => {
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

    useEffect(() => {
        getTableData()
        // getCount()
    }, [filterData?.page, filterData?.pagesize, seller_id])
    const getCount = async () => {
        setLoading(true)
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/course/get-seller-dashboard`, { seller_id: seller_id }).then(res => {
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
        seller_id && getCount()
    }, [seller_id])

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

    const handleDeleteCourse = async () => {

        setLoading(true)
        let body = {
            id: deleteId, status: "", remarks: "", updated_by: seller_id
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/course/update-course-status`, body).then(res => {
            console.log('api response', res)
            setLoading(false)
            closeDeleteModal()
            toast.success(res?.data?.message || "Status Updated Successful.")
            getTableData()

        }).catch(e => {
            setLoading(false)
            closeDeleteModal()
            toast.error(typeof e?.response?.data?.message == "string" ? e?.response?.data?.message : "Something want wrong")
            console.log('e', e)
        })

    }

    return (
        <Layout>
            <Box p={2} style={{ backgroundColor: "#f5f5f5" }}>
                <CourseTableTop countData={countData} />
                <Box backgroundColor="#FFE9DD" className="topborder" px={3} py={1} color={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box>
                        <Typography fontSize={20} color={"#000000"} fontWeight={900}>My Courses</Typography>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Box borderRadius={"4px"} padding={"5px 10px"} backgroundColor={"#ED6A0F"} style={{ cursor: "pointer" }} onClick={() => router.push("/add-course")}>
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
                                    {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell style={{ position: 'sticky', left: 55, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Created</TableCell>}
                                    {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell style={{ position: 'sticky', left: 185, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Creator</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateID && <TableCell style={{ position: 'sticky', left: 315, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Language</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateName && <TableCell style={{ position: 'sticky', left: 445, backgroundColor: '#fff', zIndex: 10, width: 130, boxShadow: "10px 10px 24px -8px rgb(42 57 78 / 16%)" }}>Category</TableCell>}


                                    {afterSubmitSelectedRow?.State && <TableCell width={150} >Course</TableCell>}
                                    {afterSubmitSelectedRow?.District && <TableCell width={150}>Market Price</TableCell>}
                                    {afterSubmitSelectedRow?.District && <TableCell width={150}>Selling Price</TableCell>}
                                    {afterSubmitSelectedRow?.Taluka && <TableCell width={150}>GST</TableCell>}
                                    {afterSubmitSelectedRow?.Pincode && <TableCell width={160}>Marketing Fee</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateRank && <TableCell width={150}>Slotting Fee</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateType && <TableCell width={150}>My Net Profit</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateMobileNo && <TableCell width={150}>Rating</TableCell>}
                                    {/* {afterSubmitSelectedRow?.EmailID && <TableCell width={150}>Request</TableCell>} */}
                                    {afterSubmitSelectedRow?.SponsorType && <TableCell width={150}>Status</TableCell>}
                                    {afterSubmitSelectedRow?.SponsorRank && <TableCell width={200}>Action</TableCell>}

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
                                        {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell align="left" style={{ position: 'sticky', left: 185, backgroundColor: '#fff', zIndex: 9 }}>{row?.creator}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateID && <TableCell align="left" style={{ position: 'sticky', left: 315, backgroundColor: '#fff', zIndex: 9 }}>{row?.languages}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateName && <TableCell align="left" style={{ position: 'sticky', left: 445, backgroundColor: '#fff', zIndex: 9, boxShadow: "10px 10px 24px -8px rgb(42 57 78 / 16%)" }}>{row?.category_name}</TableCell>}
                                        {afterSubmitSelectedRow?.State && <TableCell align="left">{row?.courses_name}</TableCell>}
                                        {afterSubmitSelectedRow?.Pincode && <TableCell align="left">{row?.market_price}</TableCell>}
                                        {afterSubmitSelectedRow?.Pincode && <TableCell align="left">{row?.course_amount}</TableCell>}
                                        {afterSubmitSelectedRow?.Taluka && <TableCell align="left">{row?.gst_amount}</TableCell>}
                                        {afterSubmitSelectedRow?.District && <TableCell align="left">{row?.company_marketing_fee}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateRank && <TableCell align="left">{row?.slotting_fee}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateType && <TableCell align="left">{row?.seller_netprofit}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateMobileNo && <TableCell align="left">{row?.rating}</TableCell>}
                                        {/* {afterSubmitSelectedRow?.EmailID && <TableCell align="left">{row.age}</TableCell>} */}
                                        {afterSubmitSelectedRow?.SponsorType && <TableCell align="left">{row?.status == 0 ? "Pending" : row?.status == 1 ? "Approved" : row?.status == 2 ? "Rejected" : "Deleted"}</TableCell>}
                                        {afterSubmitSelectedRow?.SponsorRank && <TableCell align="left">
                                            <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                                                <Box style={{ cursor: "pointer" }} backgroundColor="#D1732D" borderRadius={"4px"} px={1} py={0.5}><Typography color={"white"} fontSize={12} onClick={() => router.push(`/edit-course?id=${row?.id}`)}>EDIT</Typography></Box>
                                                <Box style={{ cursor: "pointer" }} mx={1} backgroundColor="#B73E38" borderRadius={"4px"} px={1} py={0.5} onClick={() => { openDeleteModal(); setDeleteId(row?.id) }}><Typography color={"white"} fontSize={12}>DELETE</Typography></Box>

                                                {/* <IconButton
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                >

                                                    <MoreHorizIcon />
                                                </IconButton> */}
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <MenuItem onClick={handleClose}>Live / Inactive</MenuItem>
                                                    {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                                                    {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                                                </Menu>
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

                {/* <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={90}
                rowsPerPage={10}
                page={0}
                onPageChange={() => { }}
                onRowsPerPageChange={() => { }}
                style={{backgroundColor : "white"}}

            /> */}
                <CustomizetableModal Customizetable={Customizetable} CustomizetableClose={CustomizetableClose} handleChange={handleChange} selectedTableRow={selectedTableRow} pinnedTableRow={pinnedTableRow} handleChangePin={handleChangePin} setAfterSubmitSelectedRow={setAfterSubmitSelectedRow} setselectedTableRow={setselectedTableRow} />
                <Dialog
                    open={deleteModal}
                    onClose={closeDeleteModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete Course"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this course?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Box style={{ cursor: "pointer" }} mx={1} backgroundColor="#B73E38" borderRadius={"4px"} px={2} py={0.7} onClick={closeDeleteModal}><Typography color={"white"} fontSize={14}>No</Typography></Box>
                        <Box style={{ cursor: "pointer" }} backgroundColor="green" borderRadius={"4px"} px={2} py={0.7} onClick={handleDeleteCourse}><Typography color={"white"} fontSize={14}>Yes</Typography></Box>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout >
    );
};

export default Course;
