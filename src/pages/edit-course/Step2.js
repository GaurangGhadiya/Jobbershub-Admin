import SelectDropdown from '@/components/DropdownComponent';
import TextFieldComponent from '@/components/TextFieldComponent'
import Title from '@/components/Title'
import { Grid, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Step2 = ({ formDataMain, setFormDataMain, step, setStep }) => {
  const route = useRouter()

  const [formData, setFormData] = useState({})

   useEffect(() => {
      setFormData({ ...formDataMain })
    }, [formDataMain])

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

  const handleNext = () => {
    if (step == 8) {

    } else {
      setFormDataMain({ ...formDataMain, ...formData })
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
  return (
    <Grid container spacing={2}>
      <Grid item sx={12} md={4}>
        <Title title={"GST Amount 18% "} />
        <TextFieldComponent
          name="gst_amount"
          value={formData?.gst_amount}
          onChange={handleChange}
          placeholder='18% FIXED ON COURSES'
        />
      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"GST Name"} />
        <TextFieldComponent
          name="gst_name"
          value={formData?.gst_name}
          onChange={handleChange}
          placeholder='TRADEMAGIC INDIA PVT LTD'
        />
      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"GST Number"} />
        <TextFieldComponent
          name="gst_number"
          value={formData?.gst_number}
          onChange={handleChange}
          placeholder='AZJPG2064A'
        />
      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Academy Address"} />
        <TextFieldComponent
          name="academy_address"
          value={formData?.academy_address}
          onChange={handleChange}
          placeholder='Above iron sport,canada Nashik.'
        />
      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Company Marketing fee 50% "} />
        <TextFieldComponent
          name="company_marketing_fee"
          value={formData?.company_marketing_fee}
          onChange={handleChange}
          placeholder='50'
          type='number'
        />
       

      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Tutor Percentage - 50%=4100 "} />
        <TextFieldComponent
          name="tutor_percentage"
          value={formData?.tutor_percentage}
          onChange={handleChange}
          placeholder='50'
        />
       

      </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Marketing fee Type "} />
          <SelectDropdown
            options={[
              { value: 'Flat Fees', label: 'Flat Fees' },
              { value: 'Percentage Fees', label: 'Percentage Fees' },
            ]}
            value={formData?.marketing_fee_type}
            onChange={handleChange}
            name="marketing_fee_type"
          // placeholder="Marketing fee / Flat Percentage"
          />

        </Grid>
      
      <Grid item sx={12} md={4}>
        <Title title={"Slotting fee"} />
        <TextFieldComponent
          name="slotting_fee"
          value={formData?.slotting_fee}
          onChange={handleChange}
          placeholder='50'
        />
      

      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Actual Course Price"} />
        <TextFieldComponent
          name="course_amount"
          value={formData?.course_amount}
          onChange={handleChange}
          placeholder='50'
        />
      

      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Market Course Price"} />
        <TextFieldComponent
          name="market_price"
          value={formData?.market_price}
          onChange={handleChange}
          placeholder='50'
        />
      

      </Grid>
      {/* <Grid item sx={12} md={4}>
        <Title title={"Cashback Type"} />
        <SelectDropdown
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          value={formData?.}
          // onChange={handleChange}}
          name="category"
        // placeholder="Select Cashback Type"
        />

      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Distribution Type"} />
        <SelectDropdown
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          value={formData?.}
          // onChange={handleChange}}
          name="category"
        // placeholder="Offer"
        />

      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Offer "} />
        <SelectDropdown
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          value={formData?.}
          // onChange={handleChange}}
          name="category"
        // placeholder="Cashback"
        />

      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Cashback"} />
        <SelectDropdown
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          value={formData?.}
          // onChange={handleChange}}
          name="category"
        // placeholder="Distribution"
        />

      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Distribution"} />
        <SelectDropdown
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          value={formData?.}
          // onChange={handleChange}}
          name="category"
        // placeholder="Tutor Percentage - 50%=4100"
        />
      </Grid> */}
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} my={5} width={"100%"} px={2}>

        <Box border={"1px solid #A2A1A8"} style={{ cursor: "pointer" }} onClick={() => handleBack()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"black"} px={3} py={1}>Back</Typography></Box>
        <Box backgroundColor={"#FF8C38"} style={{ cursor: "pointer" }} onClick={() => handleNext()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Next</Typography></Box>
      </Box>
    </Grid>
  )
}

export default Step2
