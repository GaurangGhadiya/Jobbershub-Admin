import Layout from '@/components/Layout/Layout'
import { Box, Grid, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#FAFAFA',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const AssetManagement = () => {
    return (
        <Layout>
            <Box p={2} style={{ backgroundColor: "#f5f5f5", height: "91vh" }}>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={6}>
                        <Box borderRadius={"7px"} py={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"} style={{background : 'linear-gradient(90deg, #FFD370 1.31%, #E16F7C 96.66%)'}}>
                          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                          <Box pr={2} pl={2}>
                            <Image src={'/CloudSun.png'} height={32} width={32}/>
                            <Typography color={"#424242"} fontWeight={500} fontSize={"14px"}>Partly Cloudy</Typography>
                            </Box>
                            <Box pl={2} borderLeft={"1px dotted #757575"}>
                            <Typography color={"#424242"} fontWeight={500} fontSize={"14px"}>21 September 2022</Typography>
                            <Typography color={"#424242"} fontWeight={700} fontSize={"32px"}>Today</Typography>
                            </Box>
                          </Box>
                            <Box mr={5}>
                            <Typography color={"#D9F0C5"} fontWeight={500} fontSize={"14px"}>Entry Time</Typography>
                            <Typography color={"#D9F0C5"} fontWeight={700} fontSize={"32px"}>10:11 AM</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={12} md={6} mb={3}>
                        <Box borderRadius={"7px"} py={2} display={"flex"} justifyContent={"start"} alignItems={"center"} style={{background : 'linear-gradient(90deg, #99F2C8 1.31%, #1F4037 96.66%)'}}>
                                <Box ml={10}>
                                    <Typography color={"#99F2C8"} fontWeight={500} fontSize={"14px"}>Present-on time</Typography>
                                    <Typography color={"#99F2C8"} fontWeight={700} fontSize={"32px"}>70</Typography>
                                </Box>
                                <Box ml={5}>
                                    <Typography color={"#99F2C8"} fontWeight={500} fontSize={"14px"}>Late</Typography>
                                    <Typography color={"#99F2C8"} fontWeight={700} fontSize={"32px"}>20</Typography>
                                </Box>
                                <Box ml={5}>
                                    <Typography color={"#99F2C8"} fontWeight={500} fontSize={"14px"}>Absent</Typography>
                                    <Typography color={"#99F2C8"} fontWeight={700} fontSize={"32px"}>7</Typography>
                                </Box>
                                <Box ml={5}>
                                    <Typography color={"#99F2C8"} fontWeight={500} fontSize={"14px"}>Leave</Typography>
                                    <Typography color={"#99F2C8"} fontWeight={700} fontSize={"32px"}>3</Typography>
                                </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box style={{ backgroundColor: "white" }} className="topborder bottomborder">
                    <Typography color={"#424242"} fontSize={"16px"} fontWeight={700} px={2} py={1}>My Assets</Typography>
                    <Box overflow={"hidden"}>
                        <TableContainer component={Box} style={{
                            maxHeight: '600px', // Fixed height for vertical scroll
                            maxWidth: '100%', // Optional: Limit the width if necessary
                            overflowX: 'auto', // Enable horizontal scrolling only inside the table container
                            overflowY: 'auto', // Enable vertical scrolling inside the table container
                            fontSize: '16px',
                        }}>

                            <Table stickyHeader style={{ tableLayout: 'fixed', width: '100%', backgroundColor: "white" }}>
                                <TableHead style={{ background: "white !important" }}>
                                    <StyledTableRow style={{ background: "white !important" }}>
                                        <TableCell style={{ background: "white !important" }} width={50}>#</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Asset No</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Category</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Company</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Model Name</TableCell>


                                        <TableCell style={{ background: "white !important" }} width={150} >Serial No</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Invoice No</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Purchase Date</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={160}>Owner Company</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Asset Status</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Alloted To</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Last Action Date</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Alloted By</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Action</TableCell>
                                        <TableCell style={{ background: "white !important" }} width={150}>Comment</TableCell>

                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {[1, 2, 3, 4, 5].map((row, i) => (
                                        <StyledTableRow
                                            // hover
                                            key={row.id} style={{ textAlign: "left" }}>
                                            <TableCell align="left" width={50}>
                                                {i + 1}
                                            </TableCell>
                                            <TableCell align="left" >Laptop</TableCell>
                                            <TableCell align="left" >Laptop</TableCell>
                                            <TableCell align="left" >Dell</TableCell>
                                            <TableCell align="left" >To Do</TableCell>
                                            <TableCell align="left">ABC001</TableCell>
                                            <TableCell align="left">522</TableCell>
                                            <TableCell align="left">7 Jan 2024 </TableCell>
                                            <TableCell align="left">Growup</TableCell>
                                            <TableCell align="left">In Stock</TableCell>
                                            <TableCell align="left">Admin</TableCell>
                                            <TableCell align="left">03 Jan 2021</TableCell>
                                            <TableCell align="left">Hr Purti jakkal</TableCell>
                                            <TableCell align="left">Rejected</TableCell>
                                            <TableCell align="left">Wrong Work</TableCell>



                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box display={"flex"} justifyContent={"start"} alignItems={"center"} p={2}>
                        <Box backgroundColor="#2196F3" height={13} width={13} mr={1}></Box>
                        <Typography color={'#616161'} fontSize={"12px"} mr={2}>Add</Typography>
                        <Box backgroundColor="#EF6E68" height={13} width={13} mr={1}></Box>
                        <Typography color={'#616161'} fontSize={"12px"} mr={2}>Rejected</Typography>
                        <Box backgroundColor="#FF9600" height={13} width={13} mr={1}></Box>
                        <Typography color={'#616161'} fontSize={"12px"} mr={2}>Pending</Typography>
                    </Box>
                </Box>
            </Box>
        </Layout>
    )
}

export default AssetManagement
