import CountBox from '@/components/CountBox'
import Layout from '@/components/Layout/Layout'
import { Box, Grid, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { formatDate } from '../../utils/formatDate'
import formatIndianNumber from '../../utils/FormatNumber'

const AffiliateProfile = () => {
    const router = useRouter();
    const { id } = router.query; 
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})


    const getTableData = async (defaultData) => {
        try {
            setLoading(true)
        
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/report/user-affiliate-dashboard`,{user_id : id}).then(res => {
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
    }, [id])

    console.log('userData', userData)

    return (
        <Layout>
          {userData ?  <Box p={2} style={{ backgroundColor: "#f5f5f5" }} >
                <Box borderRadius={"2px"} border={"1px solid #D8D8D8"} position={"relative"} backgroundColor="white">
                    <Image src="/Frame 2398.png" width={100} height={100} style={{ width: "100%", objectFit: "cover" }} />
                    <Box borderRadius={"50%"} ml={10} style={{ marginTop: "-50px" }} >
                        <Image src={ "/Rectangle 2085.png"} width={100} height={100} style={{ borderRadius: "50%", height: "200px", width: "200px" }} />
                        {/* <Image src={userData?.profilepic || "/Rectangle 2085.png"} width={100} height={100} style={{ borderRadius: "50%", height: "200px", width: "200px" }} /> */}
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mr={3}>
                            <Box>
                                <Typography color={"#464646"} fontSize={"20px"} fontWeight={600} ml={5} mt={1}>{userData?.first_name}</Typography>
                                <Typography color={"#505050"} fontSize={"16px"} fontWeight={600} ml={5} mt={0.5}>{userData?.rank?.rank}</Typography>
                            </Box>
                            {/* <Box backgroundColor="#FE9204" borderRadius={"6px"}><Typography color={"white"} px={2} py={1}>Edit</Typography></Box> */}

                        </Box>

                        <Grid container spacing={2} mt={2} mb={1}>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='title'>Affiliate ID</Typography></Grid>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='value'>{userData?.mlm_id}</Typography></Grid>
                            <Grid item sx={2} sm={2} md={1}></Grid>
                            <Grid item sx={2} sm={2} md={2}><Typography className='title'>Affiliate Type</Typography></Grid>
                            <Grid item sx={4} sm={4} md={4}><Typography className='value'>{userData?.affiliateType  }</Typography></Grid>

                            <Grid item sx={2} sm={2} md={2.5}><Typography className='title'>Date of Birth</Typography></Grid>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='value'>{userData?.dob || "-"}</Typography></Grid>
                            <Grid item sx={2} sm={2} md={1}></Grid>
                            <Grid item sx={2} sm={2} md={2}><Typography className='title'></Typography></Grid>
                            <Grid item sx={4} sm={4} md={4}><Typography className='value'></Typography></Grid>

                            <Grid item sx={2} sm={2} md={2.5}><Typography className='title'>Mobile No</Typography></Grid>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='value'>{userData?.mobile || ""}</Typography></Grid>
                            <Grid item sx={2} sm={2} md={1}></Grid>
                            <Grid item sx={2} sm={2} md={2}><Typography className='title'>State</Typography></Grid>
                            <Grid item sx={4} sm={4} md={4}><Typography className='value'>{userData?.state || ""}</Typography></Grid>

                            <Grid item sx={2} sm={2} md={2.5}><Typography className='title'>Email Id</Typography></Grid>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='value'>{userData?.email || ""}</Typography></Grid>
                            <Grid item sx={2} sm={2} md={1}></Grid>
                            <Grid item sx={2} sm={2} md={2}><Typography className='title'>District</Typography></Grid>
                            <Grid item sx={4} sm={4} md={4}><Typography className='value'>{userData?.district || ""}</Typography></Grid>

                            <Grid item sx={2} sm={2} md={2.5}><Typography className='title'>Registration Date</Typography></Grid>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='value'>{userData?.registration_date || "-"}</Typography></Grid>
                            <Grid item sx={2} sm={2} md={1}></Grid>
                            <Grid item sx={2} sm={2} md={2}><Typography className='title'>Taluka</Typography></Grid>
                            <Grid item sx={4} sm={4} md={4}><Typography className='value'>{userData?.block || "-"}</Typography></Grid>

                            <Grid item sx={2} sm={2} md={2.5}><Typography className='title'>Authorization Date</Typography></Grid>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='value'>{userData?.activation_date || '-'}</Typography></Grid>
                            <Grid item sx={2} sm={2} md={1}></Grid>
                            <Grid item sx={2} sm={2} md={2}><Typography className='title'>Pincode</Typography></Grid>
                            <Grid item sx={4} sm={4} md={4}><Typography className='value'>{userData?.pincode || "-"}</Typography></Grid>

                            <Grid item sx={2} sm={2} md={2.5}><Typography className='title'>Sponsor Name</Typography></Grid>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='value'>{userData?.getSponsor?.ref_first_name || "-"}</Typography></Grid>
                            <Grid item sx={2} sm={2} md={1}></Grid>
                            <Grid item sx={2} sm={2} md={2}><Typography className='title'>Detail Address</Typography></Grid>
                            <Grid item sx={4} sm={4} md={4}><Typography className='value'>{userData?.address || "-"}</Typography></Grid>

                            <Grid item sx={2} sm={2} md={2.5}><Typography className='title'>Sponsor Mobile No</Typography></Grid>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='value'>{userData?.getSponsor?.ref_mobile || "-"}</Typography></Grid>
                            <Grid item sx={2} sm={2} md={1}></Grid>
                            <Grid item sx={2} sm={2} md={2}><Typography className='title'>Nominee Status</Typography></Grid>
                            <Grid item sx={4} sm={4} md={4}><Typography className='value'>{userData?.getKyc?.nominee_status || "-"}</Typography></Grid>

                            <Grid item sx={2} sm={2} md={2.5}><Typography className='title'>KYC Status</Typography></Grid>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='value'>{userData?.getKyc?.kyc_status || "-"}</Typography></Grid>
                            <Grid item sx={2} sm={2} md={1}></Grid>
                            <Grid item sx={2} sm={2} md={2}><Typography className='title'>Instagram ID</Typography></Grid>
                            <Grid item sx={4} sm={4} md={4}><Typography className='value'>{userData?.instagram_id || "-"}</Typography></Grid>

                            <Grid item sx={2} sm={2} md={2.5}><Typography className='title'>Gender</Typography></Grid>
                            <Grid item sx={2} sm={2} md={2.5}><Typography className='value'>{userData?.gender || "-"}</Typography></Grid>
                            <Grid item sx={2} sm={2} md={1}></Grid>
                            <Grid item sx={2} sm={2} md={2}><Typography className='title'></Typography></Grid>
                            <Grid item sx={4} sm={4} md={4}><Typography className='value'></Typography></Grid>
                        </Grid>

                    </Box>
                </Box>


                <Box mt={3}>
                    <Typography fontSize={"24px"} fontWeight={600} pb={2}>Wallet Balance </Typography>
                    <Grid container spacing={2}>

                        <CountBox title="SmartPe Wallet Balance" count={userData?.wallet_balance?.toFixed(2) ?? 0.00} color={"#E5E4FF"} icon={"/icon1.png"} />

                    </Grid>
                </Box>
             
                <Box mt={3}>
                    <Typography fontSize={"24px"} fontWeight={600} pb={2}>Income Analytics </Typography>
                    <Grid container spacing={2}>

                        <CountBox title="Main Active Income " count={userData?.total_active_walletIncome?.toFixed(2) ?? 0.00} color={"#E5E4FF"} icon={"/icon1.png"} />
                        <CountBox title="Main Passive Income  " count={userData?.total_passive_walletIncome?.toFixed(2) ?? 0.00} color={"#FFF3D6"} icon={"/icon2.png"} />
                        <CountBox title=" Hold Income" count={userData?.hold_income?.toFixed(2) ?? 0.00} color={"#D9F7E8"} icon={"/icon3.png"} />
                        <CountBox title="Reward Income " count={userData?.reward_income?.toFixed(2) ?? 0.00} color={"#FFDED1"} icon={"/icon4.png"} />
                        <CountBox title="Salary Income " count={userData?.salary_income?.toFixed(2) ?? 0.00} color={"#CEFFFD"} icon={"/icon5.png"} />
                        <CountBox title=" Royalty Income" count={userData?.royality_income?.toFixed(2) ?? 0.00} color={"#FFE4FF"} icon={"/icon6.png"} />
                        <CountBox title="SIP Fund " count={userData?.sip_mitual_fund?.toFixed(2) ?? 0.00} color={"#FFDED1"} icon={"/icon7.png"} />
                        <CountBox title=" Laptop Fund" count={userData?.laptop_fund?.toFixed(2) ?? 0.00} color={"#D9F7E8"} icon={"/icon3.png"} />
                        <CountBox title="Bike Fund Paid " count={userData?.bike_found?.toFixed(2) ?? 0.00} color={"#FFDED1"} icon={"/icon4.png"} />
                        <CountBox title=" Car Fund" count={userData?.car_found?.toFixed(2) ?? 0.00} color={"#CEFFFD"} icon={"/icon5.png"} />
                        <CountBox title=" Marriage Burden Relief" count={userData?.marraige?.toFixed(2) ?? 0.00} color={"#FFE4FF"} icon={"/icon6.png"} />
                        <CountBox title=" House Fund" count={userData?.house_found?.toFixed(2) ?? 0.00} color={"#FFDED1"} icon={"/icon7.png"} />
                        <CountBox title=" Travel Fund" count={userData?.travelfund?.toFixed(2) ?? 0.00} color={"#E5E4FF"} icon={"/icon1.png"} />
                        <CountBox title=" Insurance Fund" count={userData?.insurance_found?.toFixed(2) ?? 0.00} color={"#FFF3D6"} icon={"/icon2.png"} />
                        <CountBox title=" Child Higher Education Fund" count={userData?.childeducation?.toFixed(2) ?? 0.00} color={"#D9F7E8"} icon={"/icon3.png"} />

                    </Grid>

                   


                    <Box mt={3}>
                        <Typography fontSize={"24px"} fontWeight={600} pb={2}>Monthly Performence Analytics  </Typography>
                        <Grid container spacing={2}>

                            <CountBox title="Self Purchase DV" count={(+userData?.selfdiv)?.toFixed(2)} color={"#E5E4FF"} icon={"/icon1.png"} />
                            <CountBox title="My First Level Total DV" count={(+userData?.firstdiv)?.toFixed(2)} color={"#FFF3D6"} icon={"/icon2.png"} />
                            <CountBox title="Authorized Member In Direct" count={userData?.authorizedmember?.toFixed(2)} color={"#D9F7E8"} icon={"/icon3.png"} />
                            <CountBox title="2nd Level Authorized Member" count={userData?.authorizedmember2nd?.toFixed(2)} color={"#FFDED1"} icon={"/icon4.png"} />
                            <CountBox title="Demat A/C Active Income" count={userData?.dematactive?.toFixed(2)} color={"#CEFFFD"} icon={"/icon5.png"} />
                            <CountBox title="Courses Active Income" count={userData?.courseactive?.toFixed(2)} color={"#FFE4FF"} icon={"/icon6.png"} />
                            <CountBox title="Insurance Active Income" count={userData?.insuranceactive?.toFixed(2)} color={"#FFDED1"} icon={"/icon7.png"} />
                            <CountBox title="Investment Active Income" count={userData?.investmentactive?.toFixed(2)} color={"#D9F7E8"} icon={"/icon3.png"} />
                        </Grid>
                    </Box>
                </Box>

                    <Box mt={3}>
                        <Typography fontSize={"24px"} fontWeight={600} pb={2}>Other Analytics</Typography>
                        <Grid container spacing={2}>

                            <CountBox title="My Team" count={userData?.myteam?.toFixed(2)} color={"#E5E4FF"} icon={"/icon1.png"} />
                            <CountBox title="My Pending Leads" count={userData?.pendingleads?.toFixed(2)} color={"#FFF3D6"} icon={"/icon2.png"} />
                            <CountBox title="Withdrwal History" count={userData?.withdrawal_history?.toFixed(2)} color={"#D9F7E8"} icon={"/icon3.png"} />
                            <CountBox title="TDS Reports" count={userData?.TDS_report} color={"#FFDED1"} icon={"/icon4.png"} />
                           
                        </Grid>
                    </Box>
                </Box> : ""}
        </Layout>
    )
}

export default AffiliateProfile
