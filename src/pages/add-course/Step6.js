import TextFieldComponent from '@/components/TextFieldComponent'
import { Box, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import UploadIcon from '@mui/icons-material/CloudUpload';
import Title from '@/components/Title';


const IconWrapper = styled('div')(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  height: '150px',
  border: "2px dotted #FF9F59",
  cursor: 'pointer',
  paddingTop: "30px"
}));

const HiddenInput = styled('input')({
  display: 'none',
});

const Step6 = () => {
  const [formData, setFormData] = useState({})
  const [tableData, setTableData] = useState([])
  const [editData, setEditData] = useState({})
  const [formData2, setFormData2] = useState({})
  const [tableData2, setTableData2] = useState([])
  const [editData2, setEditData2] = useState({})
  const [formData3, setFormData3] = useState({})
  const [tableData3, setTableData3] = useState([])
  const [editData3, setEditData3] = useState({})

  const handleChange = (e) => {
    console.log(e)
    if (e.target.type == "file") {
      const file = event.target.files[0];
      if (file) {
        setFormData({ ...formData, "photo": file })
      }
    } else {
      const { name, value } = e.target

      setFormData({ ...formData, [name]: value })
    }
  }

  console.log('tableData', tableData)
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
  const handleChange2 = (e) => {
    console.log(e)
    if (e.target.type == "file") {
      const file = event.target.files[0];
      if (file) {
        setFormData2({ ...formData2, "photo": file })
      }
    } else {
      const { name, value } = e.target

      setFormData2({ ...formData2, [name]: value })
    }
  }

  console.log('tableData', tableData)
  const handleAdd2 = () => {
    setTableData2([...tableData2, { ...formData2, id: Math.floor(Math.random() * 1000000).toString() }])
    setFormData2({})
  }

  const handleEdit2 = (row) => {
    setEditData2(row)
    setFormData2(row)
  }

  const handleDelete2 = (id) => {
    let data = [...tableData2]
    let newData = data?.filter(v => v?.id != id)
    setTableData2(newData)
  }

  const handleUpdate2 = () => {
    let data = [...tableData2]
    let newData = data?.map(v => v?.id == editData2?.id ? formData2 : v)
    setTableData2(newData)
    setEditData2({})
    setFormData2({})
  }
  const handleChange3 = (e) => {
    console.log(e)
    if (e.target.type == "file") {
      const file = event.target.files[0];
      if (file) {
        setFormData3({ ...formData3, "photo": file })
      }
    } else {
      const { name, value } = e.target

      setFormData3({ ...formData3, [name]: value })
    }
  }

  console.log('tableData', tableData)
  const handleAdd3 = () => {
    setTableData3([...tableData3, { ...formData3, id: Math.floor(Math.random() * 1000000).toString() }])
    setFormData3({})
  }

  const handleEdit3 = (row) => {
    setEditData3(row)
    setFormData3(row)
  }

  const handleDelete3= (id) => {
    let data = [...tableData3]
    let newData = data?.filter(v => v?.id != id)
    setTableData3(newData)
  }

  const handleUpdate3 = () => {
    let data = [...tableData3]
    let newData = data?.map(v => v?.id == editData3?.id ? formData3 : v)
    setTableData3(newData)
    setEditData3({})
    setFormData3({})
  }
  return (
    <>    <Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>1.Marketing Images</Typography>

      <TextFieldComponent
        name="title"
        value={formData?.title ?? ""}
        onChange={handleChange}
        placeholder='title'
      />
      <br />
      <br />
      <br />

      <TextFieldComponent
        name="description"
        value={formData?.description ?? ""}
        onChange={handleChange}
        placeholder='Description'
      />

      {editData?.id ? <Box backgroundColor={"#FF8C38"} width={"100px"} my={3} style={{ cursor: "pointer" }} onClick={handleUpdate} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Update</Typography></Box> :
        <Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} onClick={handleAdd} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Add</Typography></Box>}

      {tableData?.length > 0 && <Box overflow={"hidden"} mb={3}>
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
                <TableCell style={{ borderRight: "none" }} width={120} >Title</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Image</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Action</TableCell>
              </TableRow>

            </TableHead>

            <TableBody>
              {tableData?.map((row, id) => (
                <TableRow
                  hover
                  key={id}
                  style={{ textAlign: "left" }}>
                  <TableCell style={{ borderRight: "none" }} align="left">{id + 1}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.title}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.description}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">
                    <Box display={"flex"}>
                      <Box backgroundColor="#D1732D" px={2} py={1} borderRadius={"4px"}><Typography color={'white'} onClick={() => handleEdit(row)} style={{ cursor: "pointer" }} >Edit</Typography></Box>
                      <Box backgroundColor="#B73E38 " px={2} py={1} borderRadius={"4px"} ml={2}><Typography color={'white'} onClick={() => handleDelete(row?.id)} style={{ cursor: "pointer" }}>Delete</Typography></Box>
                    </Box>
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>


          </Table>
        </TableContainer>
      </Box>}

      <Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>2.Marketing Videos</Typography>

      <Box mt={2}></Box>
      {/* <Title title={"Introductory Video Link"} /> */}
      <TextFieldComponent
        name="link"
        value={formData2?.link ?? ""}
        onChange={handleChange2}
        placeholder='Upload Marketing Video Link'
      />
      <br />
      <br />
      <br />
      {/* <Title title={"Upload Marketing Videos"} />
      <HiddenInput
        type="file"
        id="file-upload"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload" style={{width : "500px", display : "block", marginBottom : "30px"}}>
        <IconWrapper>
          <UploadIcon style={{ fontSize: '50px', color: 'FF9F59' }} /><br />
          <Typography color={"#16151C"} fontSize={"14px"} fontWeight={300}>Drag & Drop or choose file to upload</Typography>
          <Typography color={"#A2A1A8"} fontSize={"11px"} fontWeight={300}>Supported formats : Jpeg, pdf</Typography>
        </IconWrapper>
      </label> */}

      <TextFieldComponent
        name="title"
        value={formData2?.title ?? ""}
        onChange={handleChange2}
        placeholder='title'
      />
      <br />
      <br />
      <br />

      <TextFieldComponent
        name="description"
        value={formData2?.description ?? ""}
        onChange={handleChange2}
        placeholder='Description'
      />

{editData2?.id ? <Box backgroundColor={"#FF8C38"} width={"100px"} my={3} style={{ cursor: "pointer" }} onClick={handleUpdate2} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Update</Typography></Box> :
        <Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} onClick={handleAdd2} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Add</Typography></Box>}

      {tableData2?.length > 0 && <Box overflow={"hidden"} mb={3}>
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
                <TableCell style={{ borderRight: "none" }} width={120} >Title</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Video Link</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Action</TableCell>
              </TableRow>

            </TableHead>

            <TableBody>
              {tableData2?.map((row, id) => (
                <TableRow
                  hover
                  key={id}
                  style={{ textAlign: "left" }}>
                  <TableCell style={{ borderRight: "none" }} align="left">{id + 1}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.title}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.link}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">
                  <Box display={"flex"}>
                      <Box backgroundColor="#D1732D" px={2} py={1} borderRadius={"4px"}><Typography color={'white'} onClick={() => handleEdit2(row)} style={{ cursor: "pointer" }} >Edit</Typography></Box>
                      <Box backgroundColor="#B73E38 " px={2} py={1} borderRadius={"4px"} ml={2}><Typography color={'white'} onClick={() => handleDelete2(row?.id)} style={{ cursor: "pointer" }}>Delete</Typography></Box>
                    </Box>
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>


          </Table>
        </TableContainer>
      </Box>}

      <Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>3.Marketing Brochures</Typography>

      <TextFieldComponent
        name="title"
        value={formData3?.title ?? ""}
        onChange={handleChange3}
        placeholder='title'
      />
      <br />
      <br />
      <br />

      <TextFieldComponent
        name="description"
        value={formData3?.description ?? ""}
        onChange={handleChange3}
        placeholder='Description'
      />

{editData3?.id ? <Box backgroundColor={"#FF8C38"} width={"100px"} my={3} style={{ cursor: "pointer" }} onClick={handleUpdate3} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Update</Typography></Box> :
        <Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} onClick={handleAdd3} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Add</Typography></Box>}

      {tableData3?.length > 0 && <Box overflow={"hidden"}>
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
                <TableCell style={{ borderRight: "none" }} width={120} >Title</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Brochure</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Action</TableCell>
              </TableRow>

            </TableHead>

            <TableBody>
              {tableData3?.map((row, id) => (
                <TableRow
                  hover
                  key={id}
                  style={{ textAlign: "left" }}>
                  <TableCell style={{ borderRight: "none" }} align="left">{id + 1}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.title}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.description}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">
                  <Box display={"flex"}>
                      <Box backgroundColor="#D1732D" px={2} py={1} borderRadius={"4px"}><Typography color={'white'} onClick={() => handleEdit3(row)} style={{ cursor: "pointer" }} >Edit</Typography></Box>
                      <Box backgroundColor="#B73E38 " px={2} py={1} borderRadius={"4px"} ml={2}><Typography color={'white'} onClick={() => handleDelete3(row?.id)} style={{ cursor: "pointer" }}>Delete</Typography></Box>
                    </Box>
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>


          </Table>
        </TableContainer>
      </Box>}
    </>
  )
}

export default Step6
