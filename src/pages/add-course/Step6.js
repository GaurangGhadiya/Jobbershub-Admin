import TextFieldComponent from '@/components/TextFieldComponent'
import { Box, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
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
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`File selected: ${file.name}`);
      // Add your file handling logic here
    }
  };
  return (
    <>    <Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>1.Marketing Images</Typography>

      <TextFieldComponent
        name="category"
        // value={""}
        // onChange={() => { }}
        placeholder='title'
      />
      <br />
      <br />
      <br />

      <TextFieldComponent
        name="category"
        // value={""}
        // onChange={() => { }}
        placeholder='Description'
      />

      <Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Add</Typography></Box>

      <Box overflow={"hidden"} mb={3}>
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
              {[1, 2, 3, 4]?.map((row, id) => (
                <TableRow
                  hover
                  key={id}
                  style={{ textAlign: "left" }}>
                  <TableCell style={{ borderRight: "none" }} align="left">{id + 1}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{"Benifit"}</TableCell>
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
      </Box>
      
      <Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>2.Marketing Videos</Typography>


      <Title title={"Upload Marketing Videos"} />
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
      </label>

<TextFieldComponent
  name="category"
  // value={""}
  // onChange={() => { }}
  placeholder='title'
/>
<br />
<br />
<br />

<TextFieldComponent
  name="category"
  // value={""}
  // onChange={() => { }}
  placeholder='Description'
/>

<Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Add</Typography></Box>

<Box overflow={"hidden"} mb={3}>
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
        {[1, 2, 3, 4]?.map((row, id) => (
          <TableRow
            hover
            key={id}
            style={{ textAlign: "left" }}>
            <TableCell style={{ borderRight: "none" }} align="left">{id + 1}</TableCell>
            <TableCell style={{ borderRight: "none" }} align="left">{"Benifit"}</TableCell>
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
</Box>

<Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>3.Marketing Brochures</Typography>

<TextFieldComponent
  name="category"
  // value={""}
  // onChange={() => { }}
  placeholder='title'
/>
<br />
<br />
<br />

<TextFieldComponent
  name="category"
  // value={""}
  // onChange={() => { }}
  placeholder='Description'
/>

<Box backgroundColor={"#FF8C38"} width={"80px"} my={3} style={{ cursor: "pointer" }} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Add</Typography></Box>

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
          <TableCell style={{ borderRight: "none" }} width={120} >Title</TableCell>
          <TableCell style={{ borderRight: "none" }} width={120} >Brochure</TableCell>
          <TableCell style={{ borderRight: "none" }} width={120} >Action</TableCell>
        </TableRow>

      </TableHead>

      <TableBody>
        {[1, 2, 3, 4]?.map((row, id) => (
          <TableRow
            hover
            key={id}
            style={{ textAlign: "left" }}>
            <TableCell style={{ borderRight: "none" }} align="left">{id + 1}</TableCell>
            <TableCell style={{ borderRight: "none" }} align="left">{"Benifit"}</TableCell>
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
</Box>
      </>
  )
}

export default Step6
