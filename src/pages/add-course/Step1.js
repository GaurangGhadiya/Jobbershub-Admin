import Title from '@/components/Title'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldComponent from '@/components/TextFieldComponent';
import TextAreaComponent from '@/components/TextAreaComponent';
import SelectDropdown from '@/components/DropdownComponent';


const IconWrapper = styled('div')(({ theme }) => ({
  textAlign: 'center',
  width: '200px',
  height: '150px',
  border: "2px dotted #FF9F59",
  cursor: 'pointer',
  paddingTop: "30px"
}));

const HiddenInput = styled('input')({
  display: 'none',
});


const Step1 = () => {

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`File selected: ${file.name}`);
      // Add your file handling logic here
    }
  };
  return (
    <Box>
      <Title title={"Add Course Image"} />
      <HiddenInput
        type="file"
        id="file-upload"
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload" style={{width : "200px", display : "block"}}>
        <IconWrapper>
          <UploadIcon style={{ fontSize: '50px', color: 'FF9F59' }} /><br />
          <Typography color={"#16151C"} fontSize={"14px"} fontWeight={300}>choose file to upload</Typography>
        </IconWrapper>
      </label>
      <Typography color={"#16151C"} my={1} fontSize={"12px"} fontWeight={300}>Recommended Image Size: 800Px - 600PX, JPEG, PNG, JPG</Typography>

      <Grid container spacing={2} >
        <Grid item sx={12} md={6}>
          <Title title={"Category "} />
          <SelectDropdown
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
            ]}
            value={''}
            onChange={() => { }}
            name="category"
            placeholder="Choose a category"
          />

        </Grid>
        <Grid item sx={12} md={6}>
          <Title title={"Select Sub-Category "} />
          <TextFieldComponent
            name="category"
            // value={""}
            // onChange={() => { }}
            placeholder='Select Sub Category'
          />
        </Grid>
        <Grid item sx={12} md={6}>
          <Title title={"Course Name "} />
          <TextFieldComponent
            name="category"
            value={""}
            onChange={() => { }}
            placeholder='Enter Course Name Here'
          />
        </Grid>
        <Grid item sx={12} md={6}>
          <Title title={"Tutor Name "} />
          <TextFieldComponent
            name="category"
            value={""}
            onChange={() => { }}
            placeholder='Enter Tutor Name Here'
          />
        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Course validity Type "} />
          <SelectDropdown
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
            ]}
            value={''}
            onChange={() => { }}
            name="category"
            placeholder="Select Course Validity Type"
          />
        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Language "} />
          <SelectDropdown
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
            ]}
            value={''}
            onChange={() => { }}
            name="category"
            placeholder="Select language"
          />
        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Total Chapters "} />
          <SelectDropdown
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
            ]}
            value={''}
            onChange={() => { }}
            name="category"
            placeholder="10"
          />
        </Grid>
        <Grid item sx={12} md={8}>
          <Title title={"Course validity Type "} />
          <SelectDropdown
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
            ]}
            value={''}
            onChange={() => { }}
            name="category"
            placeholder="Course validity Type"
          />
        </Grid>
        <Grid item sx={12} md={12}>
          <Title title={"Description "} />
          <TextAreaComponent
            name="description"
            value={""}
            onChange={() => { }}
            placeholder='Enter Course description here'
          />
        </Grid>

      </Grid>
    </Box>
  )
}

export default Step1
