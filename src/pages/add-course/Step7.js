import TextFieldComponent from '@/components/TextFieldComponent'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const Step7 = () => {
  return (
    <>    <Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>FAQ</Typography>

    <TextFieldComponent
          name="category"
          // value={""}
          // onChange={() => { }}
          placeholder='Question'
        />
        <br />
        <br />
        <br />

<TextFieldComponent
          name="category"
          // value={""}
          // onChange={() => { }}
          placeholder='Anser'
        />

      <Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{cursor : "pointer"}}  borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Add</Typography></Box>
  
   <Box overflow={"hidden"}>
              <TableContainer component={Box} id="step4" style={{
                  // maxHeight: '600px ', // Fixed height for vertical scroll
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
                              <TableCell style={{ borderRight: "none" }} width={120} >Question</TableCell>
                              <TableCell style={{ borderRight: "none" }} width={120} >Anser</TableCell>
                              <TableCell style={{ borderRight: "none" }} width={120} >Action</TableCell>
                          </TableRow>

                      </TableHead>

                      <TableBody>
                          {[1,2,3,4]?.map((row, id) => (
                              <TableRow
                                  hover
                                  key={id}
                                  style={{ textAlign: "left" }}>
                                  <TableCell style={{ borderRight: "none" }} align="left">{id+1}</TableCell>
                                  <TableCell style={{ borderRight: "none" }} align="left">{ "Benifit"}</TableCell>
                                  <TableCell style={{ borderRight: "none" }} align="left">{"Lorem ipsum dollar sit amet"}</TableCell>
                                  <TableCell style={{ borderRight: "none" }} align="left">
                                    <Box display={"flex"}>
                                      <Box backgroundColor="#D1732D" px={2} py={1} borderRadius={"4px"}><Typography color={'white'} >Edit</Typography></Box>
                                      <Box backgroundColor="#B73E38 " px={2} py={1} borderRadius={"4px"} ml={2}><Typography color={'white'} >Delete</Typography></Box>
                                    </Box>
                                  </TableCell>
                                 
                              </TableRow>
                          ))}

                      </TableBody>


                  </Table>
              </TableContainer>
          </Box></>  )
}

export default Step7
