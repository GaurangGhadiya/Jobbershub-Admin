import SelectDropdown from '@/components/DropdownComponent';
import TextFieldComponent from '@/components/TextFieldComponent'
import Title from '@/components/Title'
import { Grid, Typography } from '@mui/material'
import React from 'react'

const Step2 = () => {
  return (
    <Grid container spacing={2}>
      <Grid item sx={12} md={4}>
        <Title title={"GST Amount 18% "} />
        <TextFieldComponent
          name="category"
          // value={""}
          // onChange={() => { }}
          placeholder='18% FIXED ON COURSES'
        />
      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"GST Name"} />
        <TextFieldComponent
          name="category"
          // value={""}
          // onChange={() => { }}
          placeholder='TRADEMAGIC INDIA PVT LTD'
        />
      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"GST Number"} />
        <TextFieldComponent
          name="category"
          // value={""}
          // onChange={() => { }}
          placeholder='AZJPG2064A'
        />
      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Academy Address"} />
        <TextFieldComponent
          name="category"
          // value={""}
          // onChange={() => { }}
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
          value={''}
          onChange={() => { }}
          name="category"
          // placeholder="Tutor Percentage - 50%=4100"
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
          value={''}
          onChange={() => { }}
          name="category"
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
          value={''}
          onChange={() => { }}
          name="category"
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
          value={''}
          onChange={() => { }}
          name="category"
        // placeholder="Slotting Fee"
        />

      </Grid>
      <Grid item sx={12} md={4}>
        <Title title={"Cashback Type"} />
        <SelectDropdown
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'cherry', label: 'Cherry' },
          ]}
          value={''}
          onChange={() => { }}
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
          value={''}
          onChange={() => { }}
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
          value={''}
          onChange={() => { }}
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
          value={''}
          onChange={() => { }}
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
          value={''}
          onChange={() => { }}
          name="category"
        // placeholder="Tutor Percentage - 50%=4100"
        />
      </Grid>
    </Grid>
  )
}

export default Step2
