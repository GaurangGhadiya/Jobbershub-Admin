import TextFieldComponent from '@/components/TextFieldComponent'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'

const Step7 = () => {
     const [formData, setFormData] = useState({})
      const [tableData, setTableData] = useState([])
      const [editData, setEditData] = useState({})
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
      }
    
      const handleAdd = () => {
        setTableData([...tableData, { ...formData, id: Math.floor(Math.random() * 1000000).toString() }])
        setFormData({})
      }
    
      const handleEdit = (row) => {
        setEditData(row)
        setFormData(row)
      }
    
      const handleDelete = (id) => {
        let data = [...tableData]
        let newData = data?.filter(v => v?.id != id)
        setTableData(newData)
      }
    
      const handleUpdate = () => {
        let data = [...tableData]
        let newData = data?.map(v => v?.id == editData?.id ? formData : v)
        setTableData(newData)
        setEditData({})
        setFormData({})
      }
  return (
    <>    <Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>FAQ</Typography>

    <TextFieldComponent
          name="question"
          value={formData?.question ?? ""}
          onChange={handleChange}
          placeholder='Question'
        />
        <br />
        <br />
        <br />

<TextFieldComponent
          name="answer"
          value={formData?.answer ?? ""}
          onChange={handleChange}
          placeholder='Answer'
        />

  {editData?.id ? <Box backgroundColor={"#FF8C38"} width={"100px"} my={3} style={{ cursor: "pointer" }} onClick={handleUpdate} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Update</Typography></Box> :
        <Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} onClick={handleAdd} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Add</Typography></Box>}
  
{tableData?.length > 0 &&   <Box overflow={"hidden"}>
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
                              <TableCell style={{ borderRight: "none" }} width={120} >Answer</TableCell>
                              <TableCell style={{ borderRight: "none" }} width={120} >Action</TableCell>
                          </TableRow>

                      </TableHead>

                      <TableBody>
                          {tableData?.map((row, id) => (
                              <TableRow
                                  hover
                                  key={id}
                                  style={{ textAlign: "left" }}>
                                  <TableCell style={{ borderRight: "none" }} align="left">{id+1}</TableCell>
                                  <TableCell style={{ borderRight: "none" }} align="left">{ row?.question ?? ""}</TableCell>
                                  <TableCell style={{ borderRight: "none" }} align="left">{row?.answer ?? ""}</TableCell>
                                  <TableCell style={{ borderRight: "none" }} align="left">
                                    <Box display={"flex"}>
                                      <Box backgroundColor="#D1732D" px={2} py={1} borderRadius={"4px"} onClick={() => handleEdit(row)} style={{ cursor: "pointer" }}><Typography color={'white'} >Edit</Typography></Box>
                                      <Box backgroundColor="#B73E38 " px={2} py={1} borderRadius={"4px"} ml={2}  onClick={() => handleDelete(row?.id)} style={{ cursor: "pointer" }}><Typography color={'white'} >Delete</Typography></Box>
                                    </Box>
                                  </TableCell>
                                 
                              </TableRow>
                          ))}

                      </TableBody>


                  </Table>
              </TableContainer>
          </Box>}
          
          </>  )
}

export default Step7
