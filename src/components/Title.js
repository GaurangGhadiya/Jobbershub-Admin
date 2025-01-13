import { Typography } from '@mui/material'
import React from 'react'

const Title = ({title}) => {
  return (
    <Typography color={"#0E0E0ECC"} fontSize={"14px"} fontWeight={500} >
      {title}
    </Typography>
  )
}

export default Title
