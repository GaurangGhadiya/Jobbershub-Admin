import Layout from '@/components/Layout/Layout'
import { Box, FormControl, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { formatDate } from '../../utils/formatDate'
const TeamList = () => {
      const router = useRouter();
        const { id } = router.query; 
        const [loading, setLoading] = useState(false)
        const [userData, setUserData] = useState([])
        const [page, setPage] = useState(1)

        const getTableData = async (defaultData) => {
            try {
                setLoading(true)
            
                await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/refferal-report/user-teams`,{user_id : id, page : page}).then(res => {
                    console.log('api response', res?.data?.data)
                    setUserData( res?.data?.data)
                   
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
        if(id){
    
            getTableData()
        }
        }, [id, page])
  return (
    <Layout>
    <Box p={2} style={{ backgroundColor: "#f5f5f5", minHeight : "92vh" }} >
        <Box backgroundColor="white" borderRadius={"4px"} mb={2}>
            <Box display={"flex"} justifyContent={"start"} alignItems={"center"} ml={2}>
                <Typography>Show</Typography>
                <Box mx={1}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            // value={filterData?.pageSize}
                            // onChange={(e) => setFilterData({...filterData,pageSize:e.target.value })}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
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
                                <TableCell style={{ borderRight: "none" }} width={20} >#</TableCell>
                                <TableCell style={{ borderRight: "none" }} width={120} >Joining Date</TableCell>
                                <TableCell style={{ borderRight: "none" }} width={120} >Affiliate ID</TableCell>
                                <TableCell style={{ borderRight: "none" }} width={120} >Affiliate Name</TableCell>
                                <TableCell style={{ borderRight: "none" }} width={120} >Affiliate Mobile</TableCell>
                                <TableCell style={{ borderRight: "none" }} width={120} >Sponsor name</TableCell>
                                <TableCell style={{ borderRight: "none" }} width={120} >Rank</TableCell>
                                <TableCell style={{ borderRight: "none" }} width={120} >Affiliate Status</TableCell>
                               
                            </TableRow>

                        </TableHead>

                        <TableBody>
                            {userData?.map((row, id) => (
                                <TableRow
                                    hover
                                    key={id}
                                    style={{ textAlign: "left" }}>
                                    <TableCell style={{ borderRight: "none" }} align="left">{id+1}</TableCell>
                                    <TableCell style={{ borderRight: "none" }} align="left">{row?.activation_date || "-"}</TableCell>
                                    <TableCell style={{ borderRight: "none" }} align="left">{row?.mlm_id || ""}</TableCell>
                                    <TableCell style={{ borderRight: "none" }} align="left">{row?.first_name || "-"}</TableCell>
                                    <TableCell style={{ borderRight: "none" }} align="left">{row?.mobile || "-"}</TableCell>
                                    <TableCell style={{ borderRight: "none" }} align="left">{row?.ref_first_name || "-"}</TableCell>
                                    <TableCell style={{ borderRight: "none" }} align="left">{row?.rank || "-"}</TableCell>
                                    <TableCell style={{ borderRight: "none" }} align="left">{row?.user_status || "-"}</TableCell>
                                  
                                </TableRow>
                            ))}

                        </TableBody>


                    </Table>
                </TableContainer>
            </Box>

            <Box display={"flex"} justifyContent={"end"} my={2}><Pagination count={10} page={page}
            onChange={(e, v) => setPage(v )} 
            />
            </Box>

            </Box>

        </Box>
</Layout>
  )
}

export default TeamList
