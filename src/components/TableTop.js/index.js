import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CountBox from '../CountBox'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


const TableTop = () => {
    const [openFilter, setOpenFilter] = useState(true);

  return (
    <>
     {/* <Box backgroundColor="#FF9F59" px={3} py={2}  color={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Box>
                    <Typography fontSize={20} fontWeight={500}>Affiliate Analytics</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                   
                    <Box ml={5} onClick={()=> setOpenFilter(!openFilter)}>
                       {openFilter ?  <RemoveIcon style={{ cursor: "pointer", fontSize: "40px" }} /> :
                        <AddIcon style={{ cursor: "pointer", fontSize: "40px" }} />}

                    </Box>
                </Box>
            </Box> */}
    {openFilter && <Box p={2} pb={4} style={{backgroundColor : "#f5f5f5"}}>
      <Box>
        <Typography fontSize={"24px"} fontWeight={600} pb={2}>Affiliate Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="Registered Affiliates" count="2,38,000" color={"#E5E4FF"} icon={"/icon1.png"}/>
        <CountBox title="Total Pending Leads" count="1,50,000" color={"#FFF3D6"} icon={"/icon2.png"}/>
        <CountBox title=" Unauthorized Affiliats" count="38,000" color={"#D9F7E8"} icon={"/icon3.png"}/>
        <CountBox title=" Authorized Affiliates" count="50,000" color={"#FFDED1"} icon={"/icon4.png"}/>
        <CountBox title=" Blocked Affiliates" count="1200" color={"#CEFFFD"} icon={"/icon5.png"}/>
        <CountBox title="Normal Affiliates" count="48,000" color={"#FFE4FF"} icon={"/icon6.png"}/>
        <CountBox title="Prime Affiliates" count="2000" color={"#FFDED1"} icon={"/icon7.png"}/>
        </Grid>
      </Box>

      <Box>
        <Typography fontSize={"24px"} fontWeight={600} py={2} mt={2}>Rank Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="Total Team Leader " count="51,171"  color={"#E5E4FF"} icon={"/icon1.png"}/>
                <CountBox title="Total Asst. Manager " count="51,171"   color={"#FFF3D6"} icon={"/icon2.png"} />
        <CountBox title="Total Manager " count="1000" color={"#D9F7E8"} icon={"/icon3.png"} />
        <CountBox title="Total Zonal Head " count="51,171"  color={"#FFDED1"} icon={"/icon4.png"} />
        <CountBox title="National Head Promoter" count="100" color={"#CEFFFD"} icon={"/icon5.png"} />
        </Grid>
      </Box>
      <Box>
        <Typography fontSize={"24px"} fontWeight={600} py={2} mt={2}>Wallet Balance Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="SmartPe Wallet Balance" count="2,50,000" color={"#E5E4FF"} icon={"/icon1.png"} />
        <CountBox title="Main Active Income Wallet Balance" count="5,00,000"  color={"#FFF3D6"} icon={"/icon2.png"} />
        <CountBox title="Main Passive Income Wallet Balance" count="15,00,000" color={"#D9F7E8"} icon={"/icon3.png"} />
        <CountBox title="Laptop Fund Balance" count="100" color={"#FFDED1"} icon={"/icon4.png"} />
        <CountBox title="Bike Fund Balance" count="51,171"color={"#CEFFFD"} icon={"/icon5.png"} />
        <CountBox title="Car Fund Balance"  count="51,171" color={"#FFE4FF"} icon={"/icon6.png"} />
        <CountBox title="House Fund Balance" count="70,000" color={"#FFDED1"} icon={"/icon7.png"} />
        <CountBox title="Withdrawal Till Date" count="51,171" color={"#D9F7E8"} icon={"/icon3.png"}/>
        <CountBox title="Total TDS Balance"  count="51,171" color={"#FFDED1"} icon={"/icon4.png"} />
        </Grid>
      </Box>
      <Box>
        <Typography fontSize={"24px"} fontWeight={600} py={2} mt={2}>Total Paid Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="Royalty Income Paid" count="70,000" color={"#E5E4FF"} icon={"/icon1.png"} />
        <CountBox title="Reward Income Paid" count="51,171" color={"#FFF3D6"} icon={"/icon2.png"}/>
        <CountBox title="SIP / MF Fund Paid" count="100" color={"#D9F7E8"} icon={"/icon3.png"}/>
        <CountBox title="Laptop Fund Paid" count="51,171" color={"#FFDED1"} icon={"/icon4.png"} />
        <CountBox title="Bike Fund Paid" count="51,171" color={"#CEFFFD"} icon={"/icon5.png"} />
        <CountBox title="Car Fund Paid" count="70,000"color={"#FFE4FF"} icon={"/icon6.png"} />
        <CountBox title="House Fund Paid" count="51,171" color={"#FFDED1"} icon={"/icon7.png"} />
        <CountBox title="Total TDS Paid" count="100" color={"#D9F7E8"} icon={"/icon3.png"}/>
        </Grid>
      </Box>
      <Box>
        <Typography fontSize={"24px"} fontWeight={600} py={2} mt={2}>KYC Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="KYC Auto Approved" count="51,171" color={"#E5E4FF"} icon={"/icon1.png"} />
        <CountBox title="KYC Not Approved" count="1000" color={"#FFF3D6"} icon={"/icon2.png"} />
        <CountBox title="Auto Rejected KYC" count="51,171" color={"#D9F7E8"} icon={"/icon3.png"} />
        <CountBox title="Total Manual KYC" count="100" color={"#FFDED1"} icon={"/icon4.png"}/>
        <CountBox title="KYC Not Applied" count="100"  color={"#CEFFFD"} icon={"/icon5.png"}  />
        </Grid>
      </Box>
    </Box>}
    </>
  )
}

export default TableTop
