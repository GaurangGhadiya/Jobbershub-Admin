import TextFieldComponent from '@/components/TextFieldComponent'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/CloudUpload';
import Title from '@/components/Title';
import { useRouter } from 'next/router';

const IconWrapper = styled('div')(({ theme }) => ({
  textAlign: 'center',
  width: '250px',
  height: '150px',
  border: "2px dotted #FF9F59",
  cursor: 'pointer',
  paddingTop: "30px",
  position: "relative",
}));

const HiddenInput = styled('input')({
  display: 'none',
});
const Step8 = ({ formDataMain, setFormDataMain, step, setStep }) => {
  const route = useRouter()

  const [formData, setFormData] = useState({})
  const [tableData, setTableData] = useState([])
  const [editData, setEditData] = useState({})


  //  useEffect(() => {
  //     setFormData({ ...formDataMain })
  //   }, [formDataMain])


  const handleNext = () => {
    if (step == 8) {

    } else {
      // setFormDataMain({ ...formDataMain, recorded_courses_name : tableData?.map(v => v?.recorded_courses_name), recorded_courses_timeduration : tableData?.map(v => v?.recorded_courses_timeduration), recorded_courses_chapter : tableData?.map(v => v?.recorded_courses_chapter),recorded_courses_thumbnail : tableData?.map(v => v?.recorded_courses_thumbnail) , recorded_courses_video : tableData?.map(v => v?.recorded_courses_video)})
      setFormDataMain({ ...formDataMain, recorded_courses_obj : tableData})
   
      setStep(step + 1)
    }
  }
  const handleBack = () => {
    if (step == 0) {
      route.push("/course")
    } else {
      setStep(step - 1)
    }
  }

  const handleChange = (e) => {
    console.log(e)
    if (e.target.type == "file") {
      const file = event.target.files[0];
      if (file) {
        setFormData({ ...formData, "recorded_courses_thumbnail": file })

        // alert(`File selected: ${file.name}`);
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
  return (
    <>    <Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>Recorded Course Videos</Typography>

      <TextFieldComponent
        name="recorded_courses_name"
        value={formData?.recorded_courses_name ?? ""}
        onChange={handleChange}
        placeholder='Chapter Name'
      />
      <br />
      <br />
      <br />
      <TextFieldComponent
        name="recorded_courses_chapter"
        value={formData?.recorded_courses_chapter ?? ""}
        onChange={handleChange}
        placeholder='Chapter Count'
      />
      <br />
      <br />
      <br />
      <TextFieldComponent
        name="recorded_courses_timeduration"
        value={formData?.recorded_courses_timeduration ?? ""}
        onChange={handleChange}
        placeholder='Time Duration'
      />
      <br />
      <br />
      <br />


      <TextFieldComponent
        name="recorded_courses_video"
        value={formData?.recorded_courses_video ?? ""}
        onChange={handleChange}
        placeholder='Upload  Video Link'
      />

      <Grid container spacing={2} mt={2}>
        <Grid item sx={12} md={5}>
          <Title title={"Upload Video Thumbnail"} />
          <HiddenInput
            type="file"
            id="file-upload"
            name='recorded_courses_thumbnail'
            onChange={handleChange}
          />
          <label htmlFor="file-upload" style={{ width: "100%", display: "block" }}>
            {!formData?.recorded_courses_thumbnail ? <IconWrapper>
              <UploadIcon style={{ fontSize: '50px', color: 'FF9F59' }} /><br />
              <Typography color={"#16151C"} fontSize={"14px"} fontWeight={300}>Drag & Drop or choose file to upload</Typography>
              <Typography color={"#A2A1A8"} fontSize={"11px"} fontWeight={300}>Supported formats : Jpeg, pdf</Typography>
            </IconWrapper> :
              <IconWrapper >
                {formData?.recorded_courses_thumbnail instanceof File && <img src={URL.createObjectURL(formData?.recorded_courses_thumbnail) } width={"250px"} style={{ height: "150px", marginTop: "-30px" }} />}
                <Box position="absolute" top={50} left={100}>
                  <UploadIcon style={{ fontSize: '50px', color: 'FF9F59' }} /><br />

                </Box>
              </IconWrapper>}
          </label>
        </Grid>
        {/* <Grid item sx={12} md={5}>
        <Title title={"Upload  Video Link"} />
        <HiddenInput
          type="file"
          id="file-upload"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload" style={{width : "100%", display : "block"}}>
          <IconWrapper>
            <UploadIcon style={{ fontSize: '50px', color: 'FF9F59' }} /><br />
            <Typography color={"#16151C"} fontSize={"14px"} fontWeight={300}>Drag & Drop or choose file to upload</Typography>
            <Typography color={"#A2A1A8"} fontSize={"11px"} fontWeight={300}>Supported formats : Jpeg, pdf</Typography>
          </IconWrapper>
        </label>
        </Grid> */}



      </Grid>

      {editData?.id ? <Box backgroundColor={"#FF8C38"} width={"100px"} my={3} style={{ cursor: "pointer" }} onClick={handleUpdate} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Update</Typography></Box> :
        <Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} onClick={handleAdd} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Add</Typography></Box>}

      {tableData?.length > 0 && <Box overflow={"hidden"}>
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
                <TableCell style={{ borderRight: "none" }} width={120} >Chapter Name</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Time Duration</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Chapter</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Thumbnail</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Video</TableCell>
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
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.recorded_courses_name}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.recorded_courses_timeduration}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.recorded_courses_chapter}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left"><img src={row?.recorded_courses_thumbnail instanceof File ? URL.createObjectURL(row?.recorded_courses_thumbnail) : null} width={150} style={{ height: "70px" }} /></TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.recorded_courses_video}</TableCell>
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
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} my={5}>

        <Box border={"1px solid #A2A1A8"} style={{ cursor: "pointer" }} onClick={() => handleBack()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"black"} px={3} py={1}>Back</Typography></Box>
        <Box backgroundColor={"#FF8C38"} style={{ cursor: "pointer" }} onClick={() => handleNext()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Next</Typography></Box>
      </Box>
    </>
  )
}

export default Step8
