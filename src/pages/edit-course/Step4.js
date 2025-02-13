import Title from '@/components/Title'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldComponent from '@/components/TextFieldComponent';
import { useRouter } from 'next/router';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Image from 'next/image';

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

const Step4 = ({ formDataMain, setFormDataMain, step, setStep }) => {
  const route = useRouter()

  const [formData, setFormData] = useState({})
  const [tableData, setTableData] = useState([])
  const [editData, setEditData] = useState({})


  function transformData(input) {
    const maxLength = Math.max(input.intro_video_link?.length, input.thumbnail?.length);
    
    return Array.from({ length: maxLength }, (_, i) => ({
      intro_video_link: input.intro_video_link[i] || "",
      thumbnail: input.thumbnail[i] || "",
      id1: Math.floor(Math.random() * 1000000).toString()
    }));
  }

  useEffect(() => {
    setFormData({ intro_video_link : ""})
    // const data = transformData(formDataMain);

    setTableData(formDataMain?.intro_video_obj)
  }, [formDataMain])

  const handleNext = () => {
    if (step == 8) {

    } else {
         // setFormDataMain({ ...formDataMain, thumbnail: tableData?.map(v => v?.thumbnail), intro_video_link: tableData?.map(v => v?.intro_video_link) })
         setFormDataMain({ ...formDataMain, intro_video_obj : tableData})
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
        setFormData({ ...formData, "thumbnail": file })

        // alert(`File selected: ${file.name}`);
      }
    } else {
      const { name, value } = e.target

      setFormData({ ...formData, [name]: value })
    }
  }

  console.log('tableData', tableData)
  const handleAdd = () => {
    setTableData([...tableData, { ...formData, id1: Math.floor(Math.random() * 1000000).toString() }])
    setFormData({})
  }

  const handleEdit = (row) => {
    setEditData(row)
    setFormData(row)
  }

  const handleDelete = (id1) => {
    let data = [...tableData]
    let newData = data?.filter(v => v?.id1 != id1)
    setTableData(newData)
  }

  const handleUpdate = () => {
    let data = [...tableData]
    let newData = data?.map(v => v?.id1 == editData?.id1 ? formData : v)
    setTableData(newData)
    setEditData({})
    setFormData({})
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sx={12} md={5}>
          <Title title={"Upload Thumbnail"} />
          <HiddenInput
            type="file"
            id="file-upload"
            name='thumbnail'
            onChange={handleChange}
          />
          <label htmlFor="file-upload" style={{ width: "250px", display: "block", position: "relative" }}>
            {!formData?.thumbnail ? <IconWrapper>
          <Image src="/Button.png" width={50} height={50} />
              <Typography color={"#FF9F59"} fontSize={"14px"} fontWeight={300}>choose file to upload</Typography>
            </IconWrapper> :
              <IconWrapper >
                { <Image src={formData?.thumbnail instanceof File  ? URL.createObjectURL(formData?.thumbnail) : formData?.thumbnail ? process.env.NEXT_PUBLIC_PHOTO_BASE_URL+"/course/"+formData?.thumbnail : null} width={250} height={145} style={{ height: "145px", marginTop: "-30px", padding: "5px" }} />}
                <Box position="absolute" top={40} left={33} backgroundColor="white" borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={2}>
                  <FileUploadIcon style={{ fontSize: '30px', color: '#FF9F59' }} />
                  <Typography color={"#FF9F59"}>Chnage image</Typography>

                </Box>
              </IconWrapper>}
          </label>
        </Grid>
        {/* <Grid item sx={12} md={5}>
        <Title title={"Upload Introductory Video"} />
        <HiddenInput
          type="file"
          id1="file-upload"
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
      <Box mt={2}></Box>
      <Title title={"Introductory Video Link"} />
      <TextFieldComponent
        name="intro_video_link"
        value={formData?.intro_video_link ?? ""}
        onChange={handleChange}
        placeholder='Introductory Video Link'
      />
      {editData?.id ? <Box backgroundColor={"#FF8C38"} width={"100px"} my={3} style={{ cursor: "pointer" }} onClick={handleUpdate} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Update</Typography></Box> :
        <Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} onClick={handleAdd} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Add</Typography></Box>}

      {tableData?.length > 0 && <Box overflow={"hidden"}>
        <TableContainer component={Box} id1="step4" style={{
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
                <TableCell style={{ borderRight: "none" }} width={120} >Thumbnail</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Introductory Video Link</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Action</TableCell>
              </TableRow>

            </TableHead>

            <TableBody>
              {tableData?.map((row, id1) => (
                <TableRow
                  hover
                  key={id1}
                  style={{ textAlign: "left" }}>
                  <TableCell style={{ borderRight: "none" }} align="left">{id1 + 1}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left"><Image src={row?.thumbnail instanceof File  ? URL.createObjectURL(row?.thumbnail) : row?.thumbnail ? process.env.NEXT_PUBLIC_PHOTO_BASE_URL+"/course/"+row?.thumbnail : null} width={150} height={70} style={{ height: "70px" }} /></TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.intro_video_link}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">
                    <Box display={"flex"}>
                      <Box backgroundColor="#D1732D" px={2} py={1} borderRadius={"4px"}><Typography color={'white'} onClick={() => handleEdit(row)} style={{ cursor: "pointer" }} >Edit</Typography></Box>
                      <Box backgroundColor="#B73E38 " px={2} py={1} borderRadius={"4px"} ml={2}><Typography color={'white'} onClick={() => handleDelete(row?.id1)} style={{ cursor: "pointer" }}>Delete</Typography></Box>
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

export default Step4
