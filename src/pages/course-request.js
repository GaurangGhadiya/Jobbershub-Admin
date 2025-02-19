import Layout from '@/components/Layout/Layout';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { formatDateWithTime } from '../../utils/formatDate';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Cookies from "js-cookie";


const CourseRequest = () => {
    const router = useRouter()
    const [modaltotlaPage, setModalTotlaPage] = useState(0)
    const [modaltotalCount, setModalTotalCount] = useState(0)
    const [modaltableData, setModalTableData] = useState([])
    const [loading, setLoading] = useState(false)
       const [deleteModal, setDeleteModal] = useState(false)
        const [approveModal, setApproveModal] = useState(false)
        const [rejectModal, setRejectModal] = useState(false)
        const [deleteId, setDeleteId] = useState("")
        const [approveId, setApproveId] = useState("")
        const [rejectId, setRejectId] = useState("")
            const [seller_id, setSeller_id] = useState("")
        
    const [filterData, setFilterData] = useState({
        page: 1,
        pagesize: 10
    })

      useEffect(() => {
            Cookies.get('uid') && setSeller_id(Cookies.get('uid'))
        }, [router])

    const handleApproveCourse = async () => {

        setLoading(true)
        let body = {
            id: approveId, status: 1, remarks: "", updated_by: seller_id
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/course/update-course-status`, body).then(res => {
            console.log('api response', res)
            setLoading(false)
            closeApproveModal()
            toast.success(res?.data?.message || "Status Updated Successful.")
            getTableData()
            modalApi()

        }).catch(e => {
            setLoading(false)
            closeApproveModal()
            toast.error(typeof e?.response?.data?.message == "string" ? e?.response?.data?.message : "Something want wrong")
            console.log('e', e)
        })

    }
    const handleDeleteCourse = async () => {

        setLoading(true)
        let body = {
            id: deleteId, status: 3, remarks: "", updated_by: seller_id
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/course/update-course-status`, body).then(res => {
            console.log('api response', res)
            setLoading(false)
            closeDeleteModal()
            toast.success(res?.data?.message || "Status Updated Successful.")
            // getTableData()
            modalApi()

        }).catch(e => {
            setLoading(false)
            closeDeleteModal()
            toast.error(typeof e?.response?.data?.message == "string" ? e?.response?.data?.message : "Something want wrong")
            console.log('e', e)
        })

    }
    const handleRejectCourse = async () => {

        setLoading(true)
        let body = {
            id: rejectId, status: 2, remarks: "", updated_by: seller_id
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/course/update-course-status`, body).then(res => {
            console.log('api response', res)
            setLoading(false)
            closeRejectModal()
            toast.success(res?.data?.message || "Status Updated Successful.")
            // getTableData()
            modalApi()

        }).catch(e => {
            setLoading(false)
            closeRejectModal()
            toast.error(typeof e?.response?.data?.message == "string" ? e?.response?.data?.message : "Something want wrong")
            console.log('e', e)
        })

    }
    const modalApi = async () => {
        try {
            setLoading(true)
            let body = { ...filterData, seller_id: "", status: 0 }

            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/course/get-course-leads`, body).then(res => {
                console.log('api response', res?.data?.data)

                setModalTableData(res?.data?.data)
                setModalTotlaPage(res?.data?.totalPages)
                setModalTotalCount(res?.data?.totalCount)
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

    console.log('modaltableData', modaltableData)

    useEffect(() => {
        modalApi()
    }, [])


    const openDeleteModal = () => {
        setDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setDeleteModal(false);
    };
    const openApproveModal = () => {
        setApproveModal(true);
    };

    const closeApproveModal = () => {
        setApproveModal(false);
    };
    const openRejectModal = () => {
        setRejectModal(true);
    };

    const closeRejectModal = () => {
        setRejectModal(false);
    };

    return (
        <>
         <Layout>
                    <Box p={2} style={{ backgroundColor: "#f5f5f5" }}>
                        <Typography variant={"h6"} mb={2}>Course Requests</Typography>
            <Box overflow={"hidden"}>
                <TableContainer component={Box} style={{
                    // maxHeight: '600px', // Fixed height for vertical scroll
                    maxWidth: '100%', // Optional: Limit the width if necessary
                    overflowX: 'auto', // Enable horizontal scrolling only inside the table container
                    overflowY: 'auto', // Enable vertical scrolling inside the table container
                    fontSize: '16px',
                }}>

                    <Table stickyHeader style={{ tableLayout: 'fixed', width: '100%', backgroundColor: "white" }}>
                        <TableHead >
                            <TableRow>
                                <TableCell style={{ position: '', backgroundColor: '#fff', zIndex: 9, width: 55, textAlign: 'center' }}>#</TableCell>
                                <TableCell style={{ position: '', backgroundColor: '#fff', zIndex: 9, width: 130 }}>Created</TableCell>
                                <TableCell style={{ position: '', backgroundColor: '#fff', zIndex: 9, width: 130 }}>Creator</TableCell>
                                <TableCell style={{ position: '', backgroundColor: '#fff', zIndex: 9, width: 130 }}>Language</TableCell>
                                <TableCell style={{ position: '', backgroundColor: '#fff', zIndex: 9, width: 130 }}>Category</TableCell>


                                <TableCell width={150} >Course</TableCell>
                                <TableCell width={150}>Market Price</TableCell>
                                <TableCell width={150}>Selling Price</TableCell>
                                <TableCell width={150}>GST</TableCell>
                                <TableCell width={160}>Marketing Fee</TableCell>
                                <TableCell width={150}>Slotting Fee</TableCell>
                                <TableCell width={150}>Company Net Profit</TableCell>
                                <TableCell width={150}>Rating</TableCell>
                                {/*  <TableCell width={150}>Request</TableCell> */}
                                <TableCell width={150}>Status</TableCell>
                                <TableCell width={270}>Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {modaltableData?.map((row, i) => (
                                <TableRow
                                    // hover
                                    key={row.id} style={{ textAlign: "left" }}>
                                    <TableCell align="left" style={{ position: '', backgroundColor: '#fff' }}>
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="left" style={{ position: '', backgroundColor: '#fff', zIndex: 9 }}>{formatDateWithTime(row?.created_on)}</TableCell>
                                    <TableCell align="left" style={{ position: '', backgroundColor: '#fff', zIndex: 9 }}>{row?.creator}</TableCell>
                                    <TableCell align="left" style={{ position: '', backgroundColor: '#fff', zIndex: 9 }}>{row?.languages}</TableCell>
                                    <TableCell align="left" style={{ position: '', backgroundColor: '#fff', zIndex: 9 }}>{row?.category_name}</TableCell>
                                    <TableCell align="left">{row?.courses_name}</TableCell>
                                    <TableCell align="left">{row?.market_price}</TableCell>
                                    <TableCell align="left">{row?.course_amount}</TableCell>
                                    <TableCell align="left">{row?.gst_amount}</TableCell>
                                    <TableCell align="left">{row?.company_marketing_fee}</TableCell>
                                    <TableCell align="left">{row?.slotting_fee}</TableCell>
                                    <TableCell align="left">{row?.company_netprofit}</TableCell>
                                    <TableCell align="left">{row?.rating}</TableCell>
                                    {/*  <TableCell align="left">{row.age}</TableCell> */}
                                    <TableCell align="left">{row?.status == 0 ? "Pending" : row?.status == 1 ? "Approved" : row?.status == 2 ? "Rejected" :  row?.status == 2 ? "Deleted" : ""}</TableCell>
                                    <TableCell align="left">
                                        <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                                            <Box style={{ cursor: "pointer" }} backgroundColor="#D1732D" borderRadius={"4px"} px={1} py={0.5}><Typography color={"white"} fontSize={12} onClick={() => router.push(`/edit-course?id=${row?.id}`)}>EDIT</Typography></Box>
                                            <Box style={{ cursor: "pointer" }} mx={1} backgroundColor="#B73E38" borderRadius={"4px"} px={1} py={0.5} onClick={() => { openDeleteModal(); setDeleteId(row?.id) }}><Typography color={"white"} fontSize={12}>DELETE</Typography></Box>
                                            <Box style={{ cursor: "pointer" }} backgroundColor="green" borderRadius={"4px"} px={1} py={0.5} onClick={() => { openApproveModal(); setApproveId(row?.id) }}><Typography color={"white"} fontSize={12}>Approve</Typography></Box>
                                            <Box style={{ cursor: "pointer" }} ml={1} backgroundColor="#B73E38" borderRadius={"4px"} px={1} py={0.5} onClick={() => { openRejectModal(); setRejectId(row?.id) }}><Typography color={"white"} fontSize={12}>Reject</Typography></Box>


                                        </Box>
                                    </TableCell>



                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display={"flex"} justifyContent={"end"} alignItems={"center"} mt={1}>
                    <Typography>Total Records : {modaltotalCount}</Typography>
                    <Pagination count={modaltotlaPage} page={filterData?.page} onChange={(e, v) => setFilterData({ ...filterData, page: v })} />
                </Box>
            </Box>
            </Box>
            <Dialog
                    open={approveModal}
                    onClose={closeApproveModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Approve Course"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to approve this course?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Box style={{ cursor: "pointer" }} mx={1} backgroundColor="#B73E38" borderRadius={"4px"} px={2} py={0.7} onClick={closeApproveModal}><Typography color={"white"} fontSize={14}>No</Typography></Box>
                        <Box style={{ cursor: "pointer" }} backgroundColor="green" borderRadius={"4px"} px={2} py={0.7} onClick={handleApproveCourse}><Typography color={"white"} fontSize={14}>Yes</Typography></Box>
                    </DialogActions>
                </Dialog>
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
                <Dialog
                    open={rejectModal}
                    onClose={closeRejectModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Reject Course"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to reject this course?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Box style={{ cursor: "pointer" }} mx={1} backgroundColor="#B73E38" borderRadius={"4px"} px={2} py={0.7} onClick={closeRejectModal}><Typography color={"white"} fontSize={14}>No</Typography></Box>
                        <Box style={{ cursor: "pointer" }} backgroundColor="green" borderRadius={"4px"} px={2} py={0.7} onClick={handleRejectCourse}><Typography color={"white"} fontSize={14}>Yes</Typography></Box>
                    </DialogActions>
                </Dialog>
            </Layout>
        </>
    )
}

export default CourseRequest
