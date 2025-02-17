import Title from '@/components/Title'
import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldComponent from '@/components/TextFieldComponent';
import TextAreaComponent from '@/components/TextAreaComponent';
import SelectDropdown from '@/components/DropdownComponent';
import { useRouter } from 'next/router';
import Image from 'next/image';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';


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


const Step1 = ({ formDataMain, setFormDataMain, step, setStep }) => {
  const route = useRouter()
  const [formData, setFormData] = useState({})
  const [subCategoryList, setSubCategoryList] = useState([])

  const [redirect, setredirect] = useState("")
  const [sellerList, setSellerList] = useState([])

  useEffect(() => {
    setFormData({ ...formDataMain })
    let redirect1 = Cookies.get("employee_role")
    setredirect(redirect1)
  }, [formDataMain])
  console.log('formData', formData)

  const getSellerList = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seller/get-active-seller`).then(res => {
      console.log('api response', res)
      setSellerList(res?.data?.data)
      // setCountData(res?.data)
      // setLoading(false)

  }).catch(e => {
      // setLoading(false)

      console.log('e', e)
  })
  }

  const getSubCategory = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/course/get-course-sub-category`, {
      category_id: formDataMain?.category_id
    }).then(res => {
      console.log('api response', res)
      setSubCategoryList(res?.data?.data)
      // setCountData(res?.data)
      // setLoading(false)

    }).catch(e => {
      // setLoading(false)

      console.log('e', e)
    })
  }

  useEffect(() => {
    getSubCategory()
    getSellerList()

  }, [])

  const handleChange = (e) => {
    // console.log(e)
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
  const handleNext = () => {
    if (step == 8) {

    } else {
      if(!formData?.photo || !formData?.sub_category_id || !formData?.courses_name || !formData?.tutor_name || !formData?.course_validity || !formData?.language || !formData?.total_chapter || !formData?.description){
        toast.error("Please fill all the fields")

      }else{

        setFormDataMain({ ...formDataMain, ...formData })
        setStep(step + 1)
      }
    }
  }
  const handleBack = () => {
    if (step == 0) {
      // route.push("/course")
      route.back()
    } else {
      setStep(step - 1)
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
      <label htmlFor="file-upload" style={{ width: "250px", display: "block", position: "relative" }}>
        {!formData?.photo ? <IconWrapper>
          {/* <UploadIcon style={{ fontSize: '50px', color: 'FF9F59' }} /><br /> */}
          <Image src="/Button.png" width={50} height={50} />
          <Typography color={"#FF9F59"} fontSize={"14px"} fontWeight={300}>choose file to upload</Typography>
          {/* <Typography color={"#A2A1A8"} fontSize={"11px"} fontWeight={300}>Supported formats : Jpeg, pdf</Typography> */}
        </IconWrapper> :
          <IconWrapper >
            <Image
              src={formData?.photo instanceof File ? URL.createObjectURL(formData?.photo) : formData?.photo ? process.env.NEXT_PUBLIC_PHOTO_BASE_URL + "/course/" + formData?.photo : null}
              width={250} height={145} style={{ height: "145px", marginTop: "-30px", padding: "5px" }} />
            <Box position="absolute" top={40} left={33} backgroundColor="white" borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={2}>
              <FileUploadIcon style={{ fontSize: '30px', color: '#FF9F59' }} />
              <Typography color={"#FF9F59"}>Change image</Typography>

            </Box>
          </IconWrapper>}
      </label>
      <Typography color={"#16151C"} my={1} fontSize={"12px"} fontWeight={300}>Recommended Image Size: 800Px - 600PX, JPEG, PNG, JPG</Typography>

      <Grid container spacing={2} >
      {redirect == "Admin" && <Grid item sx={12} md={4}>
          <Title title={"Select Seller "} />
          <SelectDropdown
            options={sellerList?.map(v => ({value : v?.id, label : v?.name})) || []}

            value={formData?.seller_id}
            onChange={handleChange}
            name="seller_id"
          // placeholder="Choose a category"
          />

        </Grid>}
        <Grid item sx={12} md={4}>
          <Title title={"Category "} />
          <SelectDropdown
            options={[
              { value: '4', label: 'Cources' },
            ]}
            value={formData?.category_id}
            disabled
            onChange={handleChange}
            name="category_id"
          // placeholder="Choose a category"
          />

        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Select Sub-Category "} />
          <SelectDropdown
            options={subCategoryList?.map(v => ({ value: v?.id, label: v?.sub_category }))}
            name="sub_category_id"
            value={formData?.sub_category_id}
            onChange={handleChange}
          // placeholder='Select Sub Category'
          // placeholder="Choose a category"
          />
        </Grid>
        <Grid item sx={12} md={6}>
          <Title title={"Course Name "} />
          <TextFieldComponent
            name="courses_name"
            value={formData?.courses_name}
            onChange={handleChange}
            placeholder=''
          />
        </Grid>
        <Grid item sx={12} md={6}>
          <Title title={"Tutor Name "} />
          <TextFieldComponent
            name="tutor_name"
            value={formData?.tutor_name}
            onChange={handleChange}
            placeholder=''
          />
        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Course validity Type "} />
          <SelectDropdown
            options={[
              { value: 'Single Validity', label: 'Single Validity' },
              { value: 'Lifetime validity', label: 'Lifetime validity' },
              { value: 'Custom Validity', label: 'Custom Validity' },
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
              { value: 'English', label: 'English' },
              { value: 'Hindi', label: 'Hindi' },
              { value: 'Marathi', label: 'Marathi' },
              { value: 'Gujrati', label: 'Gujrati' },
            ]}
            value={formData?.language}
            onChange={handleChange}
            name="language"
          // placeholder="Select language"
          />
        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Total Chapters "} />

          <TextFieldComponent
            name="total_chapter"
            value={formData?.total_chapter}
            onChange={handleChange}
            placeholder=''
            type='number'
          />

        </Grid>
        <Grid item sx={12} md={12}>
          <Title title={"Description "} />
          <TextAreaComponent
            name="description"
            value={formData?.description}
            onChange={handleChange}
            placeholder=''
          />
        </Grid>

      </Grid>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} my={5}>

        <Box border={"1px solid #A2A1A8"} style={{ cursor: "pointer" }} onClick={() => handleBack()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"black"} px={3} py={1}>Back</Typography></Box>
        <Box backgroundColor={"#FF8C38"} style={{ cursor: "pointer" }} onClick={() => handleNext()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Next</Typography></Box>
      </Box>

    </Box>
  )
}

export default Step1
