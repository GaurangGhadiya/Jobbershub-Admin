import Title from '@/components/Title'
import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldComponent from '@/components/TextFieldComponent';
import TextAreaComponent from '@/components/TextAreaComponent';
import SelectDropdown from '@/components/DropdownComponent';


const IconWrapper = styled('div')(({ theme }) => ({
  textAlign: 'center',
  width: '250px',
  height: '150px',
  border: "2px dotted #FF9F59",
  cursor: 'pointer',
  paddingTop: "30px"
}));

const HiddenInput = styled('input')({
  display: 'none',
});


const Step1 = () => {
  const [formData, setFormData] = useState({})

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
  return (
    <Box>
      <Title title={"Add Course Image"} />
      <HiddenInput
        type="file"
        id="file-upload"
        name='photo'
        onChange={handleChange}
      />
      <label htmlFor="file-upload" style={{ width: "250px", display: "block", position : "relative" }}>
        {!formData?.photo ? <IconWrapper>
          <UploadIcon style={{ fontSize: '50px', color: 'FF9F59' }} /><br />
          <Typography color={"#16151C"} fontSize={"14px"} fontWeight={300}>Drag & Drop or choose file to upload</Typography>
          <Typography color={"#A2A1A8"} fontSize={"11px"} fontWeight={300}>Supported formats : Jpeg, pdf</Typography>
        </IconWrapper> :
          <IconWrapper >
            {formData?.photo && <img src={URL.createObjectURL(formData?.photo)} width={"250px"} style={{ height: "150px", marginTop: "-30px" }} />}
            <Box position="absolute" top={50} left={100}>
              <UploadIcon style={{ fontSize: '50px', color: 'FF9F59' }} /><br />

            </Box>
          </IconWrapper>}
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
            value={formData?.category_id}
            onChange={handleChange}
            name="category_id"
          // placeholder="Choose a category"
          />

        </Grid>
        <Grid item sx={12} md={6}>
          <Title title={"Select Sub-Category "} />
          <TextFieldComponent
            name="sub_category_id"
            value={formData?.sub_category_id}
            onChange={handleChange}
            placeholder='Select Sub Category'
          />
        </Grid>
        <Grid item sx={12} md={6}>
          <Title title={"Course Name "} />
          <TextFieldComponent
            name="courses_name"
            value={formData?.courses_name}
            onChange={handleChange}
            placeholder='Enter Course Name Here'
          />
        </Grid>
        <Grid item sx={12} md={6}>
          <Title title={"Tutor Name "} />
          <TextFieldComponent
            name="tutor_name"
            value={formData?.tutor_name}
            onChange={handleChange}
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
            value={formData?.course_validity}
            onChange={handleChange}
            name="course_validity"
          // placeholder="Select Course Validity Type"
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
            value={formData?.language}
            onChange={handleChange}
            name="language"
          // placeholder="Select language"
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
            value={formData?.total_chapter}
            onChange={handleChange}
            name="total_chapter"
          // placeholder="10"
          />
        </Grid>
        {/* <Grid item sx={12} md={8}>
          <Title title={"Course validity Type "} />
          <SelectDropdown
            options={[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'cherry', label: 'Cherry' },
            ]}
            value={formData?.}
            onChange={handleChange}
            name="category"
          // placeholder="Course validity Type"
          />
        </Grid> */}
        <Grid item sx={12} md={12}>
          <Title title={"Description "} />
          <TextAreaComponent
            name="description"
            value={formData?.description}
            onChange={handleChange}
            placeholder='Enter Course description here'
          />
        </Grid>

      </Grid>
    </Box>
  )
}

export default Step1
