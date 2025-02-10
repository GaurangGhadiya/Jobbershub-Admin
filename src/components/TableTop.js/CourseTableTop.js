import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CountBox from '../CountBox'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import formatIndianNumber from '../../../utils/FormatNumber';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RegistrationPastDaysModal from '../Modals/RegistrationDaysModal';
import CountFilterModalModal from '../Modals/CountFilterModal';


const CourseTableTop = ({countData}) => {
    const [openFilter, setOpenFilter] = useState(true);
    const [countFilterModal, setcountFilterModal] = useState(false)
    const [filterData, setFilterData] = useState({})

    const countFilterModalClose = () => {
      setcountFilterModal(false)
    }
    const countFilterModalOpen = () => {
      setcountFilterModal(true)
    }

    console.log('countData', countData)
  return (
    <>
  
    {openFilter && <Box  pb={4} style={{backgroundColor : "#f5f5f5"}}>
     {countData?.data?.length > 0 && <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} pb={2} position={"relative"}>
        <Typography fontSize={"24px"} fontWeight={600} >Course Data</Typography>
                    {/* <Box onClick={countFilterModalOpen}  borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"3px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Till Date</Typography>
                        <ArrowDropDownIcon />

                    </Box> */}
                                        <CountFilterModalModal filterData={filterData} setFilterData={setFilterData} countFilterModal={countFilterModal} countFilterModalClose={countFilterModalClose} />
                    
        </Box>
        <Grid container spacing={2}>

        <CountBox title="Total Course Amount" count={countData?.data?.[0]?.total_course_amount ?formatIndianNumber(countData?.data?.[0]?.total_course_amount) : 0.00} color={"#E5E4FF"} icon={"/icon1.png"}/>
        <CountBox title="Total Course" count={countData?.data?.[0]?.totalcount ?formatIndianNumber(countData?.data?.[0]?.totalcount) : 0.00} color={"#FFF3D6"} icon={"/icon2.png"}/>
        <CountBox title=" Total Net Profit" count={countData?.data?.[0]?.seller_netprofit  ? formatIndianNumber(countData?.data?.[0]?.seller_netprofit) : 0.00} color={"#D9F7E8"} icon={"/icon3.png"}/>
      </Grid>
      </Box>}
     {countData?.SubCategory?.length > 0 && <Box mt={2}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} pb={2} position={"relative"}>
        <Typography fontSize={"24px"} fontWeight={600} >Sub Category Data</Typography>
                    </Box>
        <Grid container spacing={2}>

        <CountBox title="Total Course Amount" count={countData?.SubCategory?.[0]?.totalsubcategorycount ? formatIndianNumber(countData?.SubCategory?.[0]?.totalsubcategorycount) : 0.00} color={"#E5E4FF"} icon={"/icon1.png"}/>
        {/* <CountBox title="Total Course" count={formatIndianNumber(countData?.data?.[0]?.totalcount) ?? 0.00} color={"#FFF3D6"} icon={"/icon2.png"}/> */}
        {/* <CountBox title=" Total Net Profit" count={countData?.data?.[0]?.seller_netprofit  ? formatIndianNumber(countData?.data?.[0]?.seller_netprofit) : 0.00} color={"#D9F7E8"} icon={"/icon3.png"}/> */}
      </Grid>
      </Box>}

    
    </Box>}
    </>
  )
}

export default CourseTableTop
