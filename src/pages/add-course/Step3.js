import { Box, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import React from 'react'

const Step3 = () => {
  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography color={"#000000"} fontWeight={600} fontSize={24}>Select Cross-Selling Coupons</Typography>
        <Box style={{ backgroundColor: "#FF8C38", cursor: "pointer" }} px={2} py={1} borderRadius={"4px"}><Typography color={"white"}>Create Coupon</Typography></Box>
      </Box>

      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} border={"1px dotted #ED6A0F"} backgroundColor={'#FE950326'} px={4} py={1} mt={3}>
        <Typography color={"#000000"} fontWeight={400} fontSize={16}>You can avil coupons to your client and increase the sales of your courses.</Typography>
        <Typography color={"#ED6A0F"} fontSize={16} fontWeight={400}>Learn More</Typography>
      </Box>

      <Typography color={"#000000"} fontSize={20} fontWeight={400} mt={3}>Your Coupon List (5)</Typography>

      {[1,2,3,4]?.map(v => (
        <Box key={v} border={"1px solid #697699"} borderRadius={"4px"} p={2} display={"flex"} justifyContent={"space-between"} mt={2} >

        <Box display={"flex"}>
          <Box borderRight={"1px dotted #828282"} pr={3}>
            <Typography color={'#000000'} fontSize={"20px"} fontWeight={500} textAlign={"center"}>50% OFF</Typography>
            <Typography color={'#5C5C5C'} fontSize={"16px"} fontWeight={400} textAlign={"center"}>up to ₹1000</Typography>
            <Box border={"1px dotted #ED6A0F "} backgroundColor={"#FE950326"} mt={1} borderRadius={"4px"}>

              <Typography color={'#ED6A0F'} fontSize={"16px"} fontWeight={500} px={2} py={1}>
                WELCOME 50
              </Typography>
            </Box>
          </Box>
          <Box pl={3}>
            <Typography color={'#000000'} fontSize={"22px"} fontWeight={500} >Welcome Demat</Typography>


            <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
              <Typography color={'#444444'} fontSize={"15px"} fontWeight={300}  >Created by Grownup Learning </Typography>
              <Typography color={'#ED6A0F'} fontSize={"15px"} fontWeight={300} ml={4}>Public Coupon</Typography>

            </Box>
            <Box display={"flex"} justifyContent={"start"} alignItems={"center"} mt={4}>

              <QueryBuilderIcon style={{ color: "#636668", fontSize: "20px" }} />
              <Typography color={'#444444'} fontSize={"15px"} fontWeight={300} mr={4} ml={1}>
                2024/09/04, 12:12 pm Unlimited
              </Typography>
              <Typography color={'#ED6A0F'} fontSize={"15px"} fontWeight={300} >
                Used 0 times
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box flexDirection={"column"} display={"flex"} justifyContent={"space-between"} alignItems={"end"}>
          <Box pl={3} display={"flex"} justifyContent={"space-between"} alignItems={"start"} >
            <Box backgroundColor={"#03AB32"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

              <Typography color={'white'} fontSize={"15px"} fontWeight={500} px={2} py={1}>
                ACTIVE
              </Typography>
            </Box>
            <Box backgroundColor={"#03AB32"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} ml={2}>
              <Typography color={'white'} fontSize={"15px"} fontWeight={500} px={2} py={1}>
                Selected
              </Typography>
            </Box>
            <MoreVertIcon style={{ color: "#BBBBBB", fontSize: "36px" }} />
          </Box>
          <Typography color={'#ED6A0F'} fontSize={"15px"} fontWeight={500} mr={1}>Show Details</Typography>
        </Box>
      </Box>
      ))}
    </>
  )
}

export default Step3
