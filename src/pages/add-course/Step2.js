import SelectDropdown from '@/components/DropdownComponent';
import TextFieldComponent from '@/components/TextFieldComponent'
import Title from '@/components/Title'
import { Grid, Typography, Box, styled } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Image from 'next/image';
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


const Step2 = ({ formDataMain, setFormDataMain, step, setStep }) => {
  const route = useRouter()

  const [formData, setFormData] = useState({})
  const [redirect, setredirect] = useState("")
  useEffect(() => {
    setFormData({ ...formDataMain })
    let redirect1 = Cookies.get("employee_role")
    setredirect(redirect1)
  }, [formDataMain])

  const handleChange = (e) => {
    console.log(e)
    if (e.target.type == "file") {
      const file = event.target.files[0];
      if (file) {
        setFormData({ ...formData, "offer_poster": file })
      }
    } else {
      const { name, value } = e.target

      setFormData({ ...formData, [name]: value })
    }
  }

  const handleNext = () => {
    if (step == 8) {

    } else {
      if(!formData?.offer_poster || !formData?.gst_amount || !formData?.gst_name || !formData?.gst_number || !formData?.academy_address || !formData?.company_marketing_fee || !formData?.tutor_percentage || !formData?.slotting_fee || !formData?.course_amount || !formData?.market_price){
        toast.error("Please fill all the fields")
      }else{

        setFormDataMain({ ...formDataMain, ...formData,marketing_fee_type :'Percentage' })
        setStep(step + 1)
      }
    }
  }
  const handleBack = () => {
    if (step == 0) {
      route.push("/course")
    } else {
      setStep(step - 1)
    }
  }

  useEffect(() => {
    const { course_amount, gst_amount, company_marketing_fee, slotting_fee, cashback_per, distribution_per, offer } = formData
    if (course_amount && gst_amount && company_marketing_fee && slotting_fee && cashback_per && distribution_per && offer ) {
      const net_amount = parseFloat(course_amount) - parseFloat(gst_amount);
      const marketingAmnt = (parseFloat(net_amount) * parseFloat(company_marketing_fee)) / 100;

      const slottingAmnt = (net_amount * slotting_fee) / 100;
      const companyprofit = parseFloat(marketingAmnt) + parseFloat(slottingAmnt);
      const cashback = (companyprofit * parseFloat(cashback_per)) / 100;
      const distribution = (companyprofit * parseFloat(distribution_per)) / 100;
      const company_netprofit = parseFloat(companyprofit) - (parseFloat(cashback) + parseFloat(distribution) + parseFloat(offer));
      console.log('company_netprofit', company_netprofit)
      setFormData({...formData, company_net_profit : company_netprofit?.toFixed(2)})

    }
  }, [formData])

  return (
    <>
      <Title title={"Upload Offer Poster"} />
      <HiddenInput
        type="file"
        id="file-upload"
        name='offer_poster'
        onChange={handleChange}
      />
      <label htmlFor="file-upload" style={{ width: "250px", display: "block", position: "relative" }}>
        {!formData?.offer_poster ? <IconWrapper>
          {/* <UploadIcon style={{ fontSize: '50px', color: 'FF9F59' }} /><br /> */}
          <Image src="/Button.png" width={50} height={50} />
          <Typography color={"#FF9F59"} fontSize={"14px"} fontWeight={300}>choose file to upload</Typography>
          {/* <Typography color={"#A2A1A8"} fontSize={"11px"} fontWeight={300}>Supported formats : Jpeg, pdf</Typography> */}
        </IconWrapper> :
          <IconWrapper >
            {formData?.offer_poster && <Image src={URL.createObjectURL(formData?.offer_poster)} width={250} height={145} style={{ height: "145px", marginTop: "-30px", padding: "5px" }} />}
            <Box position="absolute" top={40} left={33} backgroundColor="white" borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={2}>
              <FileUploadIcon style={{ fontSize: '30px', color: '#FF9F59' }} />
              <Typography color={"#FF9F59"}>Change image</Typography>

            </Box>
          </IconWrapper>}
      </label>
      <Grid container spacing={2} mt={2}>
        <Grid item sx={12} md={4}>
          <Title title={"GST Amount 18% "} />
          <TextFieldComponent
            name="gst_amount"
            value={formData?.gst_amount}
            onChange={handleChange}
            placeholder=''
            type='number'
          />
        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"GST Name"} />
          <TextFieldComponent
            name="gst_name"
            value={formData?.gst_name}
            onChange={handleChange}
            placeholder=''
          />
        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"GST Number"} />
          <TextFieldComponent
            name="gst_number"
            value={formData?.gst_number}
            onChange={handleChange}
            placeholder=''
          />
        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Academy Address"} />
          <TextFieldComponent
            name="academy_address"
            value={formData?.academy_address}
            onChange={handleChange}
            placeholder=''
          />
        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Company Marketing fee in percentage"} />
          <TextFieldComponent
            name="company_marketing_fee"
            value={formData?.company_marketing_fee}
            onChange={handleChange}
            placeholder=''
            type='number'
          />


        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Tutor Percentage  "} />
          <TextFieldComponent
            name="tutor_percentage"
            value={formData?.tutor_percentage}
            onChange={handleChange}
            placeholder=''
            type='number'

          />


        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Marketing fee Type "} />
          <SelectDropdown
            disabled
            options={[
              { value: 'Flat Fees', label: 'Flat Fees' },
              { value: 'Percentage Fees', label: 'Percentage Fees' },
            ]}
            // value={formData?.marketing_fee_type}
            value={'Percentage Fees'}
            onChange={handleChange}
            name="marketing_fee_type"
          // placeholder="Marketing fee / Flat Percentage"
          />

        </Grid>

        <Grid item sx={12} md={4}>
          <Title title={"Slotting fee in percentage"} />
          <TextFieldComponent
            name="slotting_fee"
            value={formData?.slotting_fee}
            onChange={handleChange}
            placeholder=''
            type='number'

          />


        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Actual Course Price"} />
          <TextFieldComponent
            name="course_amount"
            value={formData?.course_amount}
            onChange={handleChange}
            placeholder=''
            type='number'

          />


        </Grid>
        <Grid item sx={12} md={4}>
          <Title title={"Market Course Price"} />
          <TextFieldComponent
            name="market_price"
            value={formData?.market_price}
            onChange={handleChange}
            placeholder=''
            type='number'

          />


        </Grid>

        {redirect == "Admin" && <>
          <Grid item sx={12} md={4}>
            <Title title={"Cashback Type"} />
            <SelectDropdown
              disabled
              options={[
                { value: 'percentage', label: 'Percentage' },
                { value: 'banana', label: 'Banana' },
                { value: 'cherry', label: 'Cherry' },
              ]}
              value={'percentage'}
              // onChange={handleChange}}
              name="category"
            // placeholder="Select Cashback Type"
            />

          </Grid>
          <Grid item sx={12} md={4}>
            <Title title={"Distribution Type"} />
            <SelectDropdown
              disabled
              options={[
                { value: 'percentage', label: 'Percentage' },
                { value: 'banana', label: 'Banana' },
                { value: 'cherry', label: 'Cherry' },
              ]}
              value={'percentage'}
              // onChange={handleChange}}
              name="category"
              type='number'

            // placeholder="Offer"
            />

          </Grid>
          <Grid item sx={12} md={4}>
            <Title title={"Offer Amount"} />
            <TextFieldComponent
              name="offer"
              value={formData?.offer}
              onChange={handleChange}
              placeholder=''
              type='number'

            />

          </Grid>
          <Grid item sx={12} md={4}>
            <Title title={"Cashback Percentage"} />
            <TextFieldComponent
              name="cashback_per"
              value={formData?.cashback_per}
              onChange={handleChange}
              placeholder=''
              type='number'

            />

          </Grid>
          <Grid item sx={12} md={4}>
            <Title title={"Distribution Percentage"} />
            <TextFieldComponent
              name="distribution_per"
              value={formData?.distribution_per}
              onChange={handleChange}
              placeholder=''
              type='number'

            />
          </Grid>
          <Grid item sx={12} md={4}>
            <Title title={"Company Net Profit"} />
            <TextFieldComponent
              disabled
              name="company_net_profit"
              value={formData?.company_net_profit}
              onChange={handleChange}
              placeholder=''
              type='number'

            />
          </Grid>
        </>}

        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} my={5} width={"100%"} px={2}>

          <Box border={"1px solid #A2A1A8"} style={{ cursor: "pointer" }} onClick={() => handleBack()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"black"} px={3} py={1}>Back</Typography></Box>
          <Box backgroundColor={"#FF8C38"} style={{ cursor: "pointer" }} onClick={() => handleNext()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Next</Typography></Box>
        </Box>
      </Grid>
    </>
  )
}

export default Step2
