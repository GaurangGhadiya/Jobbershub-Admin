import Layout from '@/components/Layout/Layout'
import { Box, Grid, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const TransactionDetails = () => {
    const router = useRouter();

    const { id, subType, incomeType , walletType} = router.query;

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [tableData, setTableData] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [filterData, setFilterData] = useState({})
    console.log('tableData', tableData)
    const getTableData = async () => {
        try {
            setLoading(true)

            let body = {
                user_id: id,
                page: filterData?.page || 0,
                start_date: formData?.start_date ?? dayjs().format('YYYY-MM-DD'),
                end_date: formData?.end_date ?? dayjs().format('YYYY-MM-DD'),
                sub_type: subType,
                income_type: incomeType
                // wallet_type
            }
            if(walletType){
                body.walletType = walletType
            }

            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/report/user-royality-income-transaction`, body).then(res => {
                console.log('api response', res?.data?.data)
                setTableData(res?.data?.data)
                setTotalPage(res?.data?.totalPageCount)

                setLoading(false)

            }).catch(e => {
                setLoading(false)

                console.log('e', e)
            })
        } catch (error) {
            setLoading(false)
            console.log('error', error)
        }


    }
    useEffect(() => {
        if (id) {

            getTableData()
        }
    }, [id, filterData])
    return (
        <Layout>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={2}>
                    <Grid item sx={12} sm={2}>
                        <Typography color={"#000000"} fontWeight={500} fontSize={14}>Start Date</Typography>

                        <DesktopDatePicker format='DD-MM-YYYY'
                            value={formData?.start_date ? dayjs(formData?.start_date) : dayjs(dayjs().format('YYYY-MM-DD'))}
                            onChange={(newValue) => setFormData({ ...formData, start_date: dayjs(newValue).format("YYYY-MM-DD") })}
                        />
                    </Grid>
                    <Grid item sx={12} sm={2}>
                        <Typography color={"#000000"} fontWeight={500} fontSize={14}>End Date</Typography>
                        <DesktopDatePicker format='DD-MM-YYYY'
                            value={formData?.end_date ? dayjs(formData?.end_date) : dayjs(dayjs().format('YYYY-MM-DD'))}
                            onChange={(newValue) => setFormData({ ...formData, end_date: dayjs(newValue).format("YYYY-MM-DD") })}
                        />

                    </Grid>
                    <Grid item sx={12} sm={3}>
                        <Box backgroundColor={"#FF8C38"} width={"120px"} my={3} style={{ cursor: "pointer" }} borderRadius={"4px"} onClick={getTableData}><Typography fontSize={"16px"} color={"white"} textAlign={"center"} py={1.7}>Search</Typography></Box>


                    </Grid>
                </Grid>
            </LocalizationProvider>


            {tableData?.length > 0 ? <Box overflow={"hidden"}>
                <TableContainer component={Box} style={{
                    // maxHeight: '640px', // Fixed height for vertical scroll
                    maxWidth: '70%', // Optional: Limit the width if necessary
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
                                <TableCell style={{  borderRight: "none", backgroundColor: '#fff',  width: "25%", textAlign: 'left' }}>Date</TableCell>
                                <TableCell style={{  borderRight: "none", backgroundColor: '#fff',  width: "20%", textAlign: 'left' }}>Credit</TableCell>
                                <TableCell style={{  borderRight: "none", backgroundColor: '#fff',  width: "55%", textAlign: 'left' }}>Remarks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData?.map((row, id) => (
                                <TableRow hover
                                    key={id} style={{ textAlign: "left" }}>
                                    <TableCell style={{ borderRight: "none" }} align="left">{row?.created_on}</TableCell>
                                    <TableCell style={{ borderRight: "none" }} align="left">{row?.total_credit?.toFixed(2)}</TableCell>
                                    <TableCell style={{ borderRight: "none" }} align="left">{row?.remarks || "-"}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell style={{ borderRight: "none", fontWeight: "bold" }} align="right">Total Credit</TableCell>
                                <TableCell style={{ borderRight: "none", fontWeight: "bold" }} align="left">{(tableData?.reduce((a, b) => a + (b?.total_credit || 0), 0))?.toFixed(2)}</TableCell>
                                <TableCell style={{ borderRight: "none", fontWeight: "bold" }} align="left"></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                <Box mt={2} display={"flex"} justifyContent={"flex-end"} alignItems={"center"} width={"100%"}>
                    <Pagination count={totalPage} page={filterData?.page} onChange={(e, v) => setFilterData({ ...filterData, page: v })} />

                </Box>
                </TableContainer>
            </Box> : <Typography textAlign={"center"} mt={10}>No Data Found</Typography>}
        </Layout>
    )
}

export default TransactionDetails
