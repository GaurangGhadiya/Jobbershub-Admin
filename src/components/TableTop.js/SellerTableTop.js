import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CountBox from '../CountBox'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import formatIndianNumber from '../../../utils/FormatNumber';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RegistrationPastDaysModal from '../Modals/RegistrationDaysModal';
import CountFilterModalModal from '../Modals/CountFilterModal';


const SellerTableTop = ({countData}) => {
    const [openFilter, setOpenFilter] = useState(true);
    const [countFilterModal, setcountFilterModal] = useState(false)
    const [filterData, setFilterData] = useState({})

    const countFilterModalClose = () => {
      setcountFilterModal(false)
    }
    const countFilterModalOpen = () => {
      setcountFilterModal(true)
    }

  return (
    <>
  
    {openFilter && <Box  pb={4} style={{backgroundColor : "#f5f5f5"}}>
     {countData?.affiliateAnalytics?.length > 0 && <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} pb={2} position={"relative"}>
        <Typography fontSize={"24px"} fontWeight={600} >Affiliate Analytics</Typography>
                    <Box onClick={countFilterModalOpen}  borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"3px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Till Date</Typography>
                        <ArrowDropDownIcon />

                    </Box>
                                        <CountFilterModalModal filterData={filterData} setFilterData={setFilterData} countFilterModal={countFilterModal} countFilterModalClose={countFilterModalClose} />
                    
        </Box>
        <Grid container spacing={2}>

        <CountBox title="Registered Affiliates" count={formatIndianNumber(countData?.affiliateAnalytics?.[0]?.total_registered_users) ?? 0.00} color={"#E5E4FF"} icon={"/icon1.png"}/>
        <CountBox title="Total Pending Leads" count={formatIndianNumber(countData?.affiliateAnalytics?.[0]?.total_pending_leads) ?? 0.00} color={"#FFF3D6"} icon={"/icon2.png"}/>
        {/* <CountBox title=" Unauthorized Affiliats" count={formatIndianNumber(countData?.affiliateAnalytics?.[0]?.total_unauthorized) ?? 0.00} color={"#D9F7E8"} icon={"/icon3.png"}/> */}
        <CountBox title=" Authorized Affiliates" count={formatIndianNumber(countData?.affiliateAnalytics?.[0]?.authorized_users) ?? 0.00} color={"#D9F7E8"} icon={"/icon3.png"}/>
        <CountBox title=" Blocked Affiliates" count={formatIndianNumber(countData?.affiliateAnalytics?.[0]?.blocked_users) ?? 0.00} color={"#FFDED1"} icon={"/icon4.png"}/>
        <CountBox title="Normal Affiliates" count={formatIndianNumber(countData?.affiliateAnalytics?.[0]?.total_normal_user) ?? 0.00} color={"#CEFFFD"} icon={"/icon5.png"}/>
        <CountBox title="Prime Affiliates" count={formatIndianNumber(countData?.affiliateAnalytics?.[0]?.total_prime_user) ?? 0.00} color={"#FFE4FF"} icon={"/icon6.png"}/>
        </Grid>
      </Box>}

     {countData?.resultsrank?.length > 0 && <Box>
        <Typography fontSize={"24px"} fontWeight={600} py={2} mt={2}>Rank Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="Total Team Leader " count={formatIndianNumber(countData?.resultsrank?.[0]?.team_leader)}  color={"#E5E4FF"} icon={"/icon1.png"}/>
                <CountBox title="Total Asst. Manager " count={formatIndianNumber(countData?.resultsrank?.[0]?.assistant_manager)}   color={"#FFF3D6"} icon={"/icon2.png"} />
        <CountBox title="Total Manager " count={formatIndianNumber(countData?.resultsrank?.[0]?.manager)} color={"#D9F7E8"} icon={"/icon3.png"} />
        <CountBox title="Total Zonal Head " count={formatIndianNumber(countData?.resultsrank?.[0]?.zonal_head)}  color={"#FFDED1"} icon={"/icon4.png"} />
        <CountBox title="National Head Promoter" count={formatIndianNumber(countData?.resultsrank?.[0]?.national_head)} color={"#CEFFFD"} icon={"/icon5.png"} />
        </Grid>
      </Box>}
      {countData?.resultswalletBalance?.length > 0 && <Box>
        <Typography fontSize={"24px"} fontWeight={600} py={2} mt={2}>Wallet Balance Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="SmartPe Wallet Balance" count={formatIndianNumber(countData?.resultswalletBalance?.[0]?.smartpaywallet?.toFixed(2))} color={"#E5E4FF"} icon={"/icon1.png"} />
        <CountBox title="Main Active Income Wallet Balance" count={formatIndianNumber(countData?.resultswalletBalance?.[0]?.mainactive?.toFixed(2))}  color={"#FFF3D6"} icon={"/icon2.png"} />
        <CountBox title="Main Passive Income Wallet Balance" count={formatIndianNumber(countData?.resultswalletBalance?.[0]?.mainpassive?.toFixed(2))} color={"#D9F7E8"} icon={"/icon3.png"} />
        <CountBox title="Laptop Fund Balance" count={formatIndianNumber(countData?.resultswalletBalance?.[0]?.laptopfund?.toFixed(2))} color={"#FFDED1"} icon={"/icon4.png"} />
        <CountBox title="Bike Fund Balance" count={formatIndianNumber(countData?.resultswalletBalance?.[0]?.bikefund?.toFixed(2))} color={"#CEFFFD"} icon={"/icon5.png"} />
        <CountBox title="Car Fund Balance"  count={formatIndianNumber(countData?.resultswalletBalance?.[0]?.carfund?.toFixed(2))}  color={"#FFE4FF"} icon={"/icon6.png"} />
        <CountBox title="House Fund Balance" count={formatIndianNumber(countData?.resultswalletBalance?.[0]?.housefund?.toFixed(2))} color={"#FFDED1"} icon={"/icon7.png"} />
        <CountBox title="Withdrawal Till Date" count={formatIndianNumber(countData?.resultswalletBalance?.[0]?.withdrawal_tilldate?.toFixed(2))}  color={"#D9F7E8"} icon={"/icon3.png"}/>
        <CountBox title="Total TDS Balance"  count={formatIndianNumber(countData?.resultswalletBalance?.[0]?.tds_balance?.toFixed(2))}  color={"#FFDED1"} icon={"/icon4.png"} />
        </Grid>
      </Box>}
     {countData?.resultspaid?.length >0 && <Box>
        <Typography fontSize={"24px"} fontWeight={600} py={2} mt={2}>Total Paid Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="Royalty Income Paid" count={formatIndianNumber(countData?.resultspaid?.[0]?.royality_amount?.toFixed(2))} color={"#E5E4FF"} icon={"/icon1.png"} />
        <CountBox title="Reward Income Paid" count={formatIndianNumber(countData?.resultspaid?.[0]?.reward_income?.toFixed(2))} color={"#FFF3D6"} icon={"/icon2.png"}/>
        <CountBox title="SIP / MF Fund Paid" count={formatIndianNumber(countData?.resultspaid?.[0]?.sip_amount?.toFixed(2))} color={"#D9F7E8"} icon={"/icon3.png"}/>
        <CountBox title="Laptop Fund Paid" count={formatIndianNumber(countData?.resultspaid?.[0]?.laptop_amount?.toFixed(2))} color={"#FFDED1"} icon={"/icon4.png"} />
        <CountBox title="Bike Fund Paid" count={formatIndianNumber(countData?.resultspaid?.[0]?.bike_amount?.toFixed(2))} color={"#CEFFFD"} icon={"/icon5.png"} />
        <CountBox title="Car Fund Paid" count={formatIndianNumber(countData?.resultspaid?.[0]?.car_amount?.toFixed(2))}color={"#FFE4FF"} icon={"/icon6.png"} />
        <CountBox title="House Fund Paid" count={formatIndianNumber(countData?.resultspaid?.[0]?.house_amount?.toFixed(2))} color={"#FFDED1"} icon={"/icon7.png"} />
        <CountBox title="Total TDS Paid" count={formatIndianNumber(countData?.resultspaid?.[0]?.tdspaid_income?.toFixed(2))} color={"#D9F7E8"} icon={"/icon3.png"}/>
        </Grid>
      </Box>}
 
     {countData?.resultskycanalytics?.length > 0 &&  <Box>
        <Typography fontSize={"24px"} fontWeight={600} py={2} mt={2}>KYC Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="KYC Auto Approved" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.approved_kyc)} color={"#E5E4FF"} icon={"/icon1.png"} />
        <CountBox title="KYC Not Approved" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.notapproved_kyc)} color={"#FFF3D6"} icon={"/icon2.png"} />
        <CountBox title="Auto Rejected KYC" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.rejected_kyc)} color={"#D9F7E8"} icon={"/icon3.png"} />
        <CountBox title="Total Manual KYC" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.manual_kyc)} color={"#FFDED1"} icon={"/icon4.png"}/>
        <CountBox title="KYC Not Applied" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.notapplied_kyc)}  color={"#CEFFFD"} icon={"/icon5.png"}  />
        </Grid>
      </Box>}
     {countData?.resultskycanalytics?.length > 0 &&  <Box>
        <Typography fontSize={"24px"} fontWeight={600} py={2} mt={2}>Customer Support Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="KYC Auto Approved" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.approved_kyc)} color={"#E5E4FF"} icon={"/icon1.png"} />
        <CountBox title="KYC Not Approved" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.notapproved_kyc)} color={"#FFF3D6"} icon={"/icon2.png"} />
        <CountBox title="Auto Rejected KYC" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.rejected_kyc)} color={"#D9F7E8"} icon={"/icon3.png"} />
        <CountBox title="Total Manual KYC" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.manual_kyc)} color={"#FFDED1"} icon={"/icon4.png"}/>
        <CountBox title="KYC Not Applied" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.notapplied_kyc)}  color={"#CEFFFD"} icon={"/icon5.png"}  />
        </Grid>
      </Box>}
     {countData?.resultskycanalytics?.length > 0 &&  <Box>
        <Typography fontSize={"24px"} fontWeight={600} py={2} mt={2}>Activation & Distribution Analytics</Typography>
        <Grid container spacing={2}>

        <CountBox title="KYC Auto Approved" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.approved_kyc)} color={"#E5E4FF"} icon={"/icon1.png"} />
        <CountBox title="KYC Not Approved" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.notapproved_kyc)} color={"#FFF3D6"} icon={"/icon2.png"} />
        <CountBox title="Auto Rejected KYC" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.rejected_kyc)} color={"#D9F7E8"} icon={"/icon3.png"} />
        <CountBox title="Total Manual KYC" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.manual_kyc)} color={"#FFDED1"} icon={"/icon4.png"}/>
        <CountBox title="KYC Not Applied" count={formatIndianNumber(countData?.resultskycanalytics?.[0]?.notapplied_kyc)}  color={"#CEFFFD"} icon={"/icon5.png"}  />
        </Grid>
      </Box>}
    </Box>}
    </>
  )
}

export default SellerTableTop
