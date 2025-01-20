import SelectDropdown from '@/components/DropdownComponent';
import TextFieldComponent from '@/components/TextFieldComponent'
import Title from '@/components/Title'
import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

const Step2 = () => {
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
        <Title title={"Tutor Percentage - 50%=4100 "} />
        <SelectDropdown
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          value={formData?.tutor_percentage}
          onChange={handleChange}
          name="tutor_percentage"
        />

      </Grid>
      <Grid item sx={12} md={4}>
      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Marketing fee Type "} />
        <SelectDropdown
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          value={formData?.marketing_fee_type}
          onChange={handleChange}
          name="marketing_fee_type"
        // placeholder="Marketing fee / Flat Percentage"
        />

      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Company Marketing fee 50% "} />
        <SelectDropdown
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          value={formData?.company_marketing_fee}
          onChange={handleChange}
          name="company_marketing_fee"
        // placeholder="Company Marketing fee 50%"
        />

      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Slotting fee"} />
        <SelectDropdown
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          value={formData?.slotting_fee}
          onChange={handleChange}
          name="slotting_fee"
        // placeholder="Slotting Fee"
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
    </Grid>
  )
}

export default Step2
