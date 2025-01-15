import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const CountBox = ({ title, count, color, icon , cc=0}) => {
    return (
        <>
            <Grid item sx={12} md={2.4}>
                <Box border={"1px solid #D8D8D8"} backgroundColor={"white"} borderRadius={"10px"}  p={2}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Box>
                    <Typography fontSize={"14px"} color={"#2C3941"} fontWeight={300}>{title}</Typography>

                    <Typography fontSize={"24px"} fontWeight={700} mt={1} color={"#000000"}>{count}</Typography>
                        </Box>
                        <Box backgroundColor={color} borderRadius={"6px"} height={45} width={45} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Image src={icon} height={15} width={20}/>
                    </Box>

                    </Box>
                  
                   {cc ?
                   <><Typography mt={2}>from {cc} transactions</Typography></>
                   : <Box display={"flex"} justifyContent={"start"} mt={2}>
                        <Image src={"/up.png"} height={15} width={20}/>&nbsp;&nbsp;&nbsp;
                    <Typography fontSize={14} color={"#01B351"}>8.5%</Typography>&nbsp;&nbsp;&nbsp;
                    <Typography fontSize={14} color={"#2C3941"}>Up From yesterday</Typography>
                    </Box>}

                </Box>
            </Grid>
        </>
    )
}

export default CountBox
