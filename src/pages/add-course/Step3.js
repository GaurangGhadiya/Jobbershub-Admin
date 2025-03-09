import { Box, Checkbox, Grid, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import AddCoupan from '@/components/addCoupan';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { convertTimeToAmPm, formatDateslesh } from '../../../utils/formatDate';
import toast from 'react-hot-toast';
const Step3 = ({ formDataMain, setFormDataMain, step, setStep }) => {
  const route = useRouter()
  const [formData, setFormData] = useState({})
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [courseList, setCourseList] = useState([])
  console.log('courseList', courseList, formData)
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    console.log(e)
    if (e.target.type == "file") {
      const file = event.target.files[0];
      if (file) {
        setFormData({ ...formData, "photo": file })
      }
    } else {
      const { name, checked } = e.target
      if (checked) {

        setFormData({ ...formData, [name]: checked })
      } else {
        let data = { ...formData }
        delete data[name]
        setFormData({ ...data })
      }
    }
  }

  // useEffect(() => {
  //   setFormData({ ...formDataMain })
  // }, [formDataMain])
  const handleNext = () => {
    if (step == 8) {

    } else {
      if(Object.keys(formData).length == 0){
        toast.error("Please select atleast one coupon")
      }else{

        // setFormDataMain({ ...formDataMain, coupon_id: "2"})
  
        const finalArray = courseList
    .filter(course => formData[course.id]) // Keep only matching ids
    .map(course => ({ coupon_id : course.id, coupon_amount : course.discount_val })); // Transform to required format
  
        // const selectedDiscounts = courseList
        //   .filter(course => formData[course.id])
        //   .map(course => course.discount_val);
        // console.log("courseList", courseList, formData, selectedDiscounts)
        // setFormDataMain({ ...formDataMain, coupon_id: Object.keys(formData), coupon_amount: selectedDiscounts })
        setFormDataMain({ ...formDataMain, coupon_obj : finalArray })
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

  const showDetails = (index) => {
    let data = [...courseList]
    let newData = data.map((v, i) => index == i ? { ...v, isOpen: true } : { ...v, isOpen: false })
    setCourseList(newData)
  }
  const hideDetails = (index) => {
    let data = [...courseList]
    let newData = data.map((v, i) => index == i ? { ...v, isOpen: false } : { ...v, isOpen: false })
    setCourseList(newData)
  }

  const getCourse = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/course/get-course-coupon`).then(res => {
      let data = [...res?.data?.data]
      let newData = data.map((v, i) => ({ ...v, isOpen: false }))
      setCourseList(newData)

    }).catch(e => {
      console.log('erro', e)
    })
  }

  function checkStatus(endDate, endTime) {
    const endDateTime = new Date(`${endDate}T${endTime}`);
    const now = new Date();

    return now < endDateTime ? "Active" : "Expired";
  }

  useEffect(() => {
    getCourse()
  }, [])

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography color={"#000000"} fontWeight={600} fontSize={24}>Select Cross-Selling Coupons</Typography>
        <Box style={{ backgroundColor: "#FF8C38", cursor: "pointer" }} px={2} py={1} borderRadius={"4px"} onClick={handleClickOpen}><Typography color={"white"}>Create Coupon</Typography></Box>
      </Box>

      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} border={"1px dotted #ED6A0F"} backgroundColor={'#FE950326'} px={4} py={1} mt={3}>
        <Typography color={"#000000"} fontWeight={400} fontSize={16}>You can avil coupons to your client and increase the sales of your courses.</Typography>
        <Typography color={"#ED6A0F"} fontSize={16} fontWeight={400}>Learn More</Typography>
      </Box>

      <Typography color={"#000000"} fontSize={20} fontWeight={400} mt={3}>Your Coupon List ({courseList?.length})</Typography>

      {courseList?.map((v, i) => (<>
        <Box key={v?.name} border={(Object.keys(formData)?.find(h => h == v?.id) || formDataMain?.coupon_id?.find(h => +h == v?.id)) ? "3px dotted #FF8C38" : "1px solid #697699"} borderRadius={"4px"} p={2} mt={2} >
          <Box display={"flex"} justifyContent={"space-between"} >

            <Box display={"flex"}>
              <Box borderRight={"1px dotted #828282"} pr={3}>
                <Typography color={'#000000'} fontSize={"20px"} fontWeight={500} textAlign={"center"}>{v?.discount_type == "Flat" && '₹'}{v?.discount_val}{v?.discount_type != "Flat" && '%'} OFF</Typography>
                <Typography color={'#5C5C5C'} fontSize={"16px"} fontWeight={400} textAlign={"center"}>up to ₹1000</Typography>
                <Box border={"1px dotted #ED6A0F "} backgroundColor={"#FE950326"} mt={1} borderRadius={"4px"}>

                  <Typography color={'#ED6A0F'} fontSize={"16px"} fontWeight={500} px={2} py={1}>
                    {v?.coupon_code}
                  </Typography>
                </Box>
              </Box>
              <Box pl={3}>
                <Typography color={'#000000'} fontSize={"22px"} fontWeight={500} >{v?.offer_name}</Typography>


                <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                  <Typography color={'#444444'} fontSize={"15px"} fontWeight={300}  >Created by Grownup Learning </Typography>
                  <Typography color={'#ED6A0F'} fontSize={"15px"} fontWeight={300} ml={4}>{v?.coupon_type} Coupon</Typography>

                </Box>
                <Box display={"flex"} justifyContent={"start"} alignItems={"center"} mt={4}>

                  <QueryBuilderIcon style={{ color: "#636668", fontSize: "20px" }} />
                  <Typography color={'#444444'} fontSize={"15px"} fontWeight={300} mr={4} ml={1}>
                    {v?.end_date == "2025-01-01" ? "Life Time Access" : v?.end_date && formatDateslesh(v?.end_date)}, {v?.end_date != "2025-01-01" && v?.end_time && convertTimeToAmPm(v?.end_time)}
                  </Typography>
                  <Typography color={'#ED6A0F'} fontSize={"15px"} fontWeight={300} >
                    Used {v?.is_unlimited ? "Unlimited" : v?.no_times_used} times
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box flexDirection={"column"} display={"flex"} justifyContent={"space-between"} alignItems={"end"}>
              <Box pl={3} display={"flex"} justifyContent={"space-between"} alignItems={"start"} >
                {(v?.is_unlimited || new Date() < new Date(`${v?.end_date}T${v?.end_time}`)) ? <Box backgroundColor={"#03AB32"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

                  <Typography color={'white'} fontSize={"15px"} fontWeight={500} px={2} py={1}>
                    {v?.is_unlimited ? "Active" : new Date() > new Date(`${v?.end_date}T${v?.end_time}`) ? "Expired" : "Active"}
                  </Typography>
                </Box> :
                  <Box backgroundColor={"#D20000"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

                    <Typography color={'white'} fontSize={"15px"} fontWeight={500} px={2} py={1}>
                      {v?.is_unlimited ? "Active" : new Date() > new Date(`${v?.end_date}T${v?.end_time}`) ? "Expired" : "Active"}
                    </Typography>
                  </Box>
                }
                {/* <Box backgroundColor={"#03AB32"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} ml={2}>
                <Typography color={'white'} fontSize={"15px"} fontWeight={500} px={2} py={1}>
                  Selected
                </Typography>
              </Box> */}
                {console.log("asd", formData?.[v?.id])}
                <Checkbox
                  checked={Object.keys(formData)?.find(h => h == v?.id) || formDataMain?.coupon_id?.find(h => +h == v?.id)}
                  onChange={handleChange}
                  name={v?.id}
                  inputProps={{ 'aria-label': 'controlled' }}
                  style={{ color: "#ED6A0F", marginRight: "-10px", marginLeft: "3px" }}
                />
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open1 ? 'long-menu' : undefined}
                    aria-expanded={open1 ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open1}
                    onClose={handleClose1}

                  >
                    <MenuItem onClick={handleClose1}>
                      <ListItemIcon>
                        <BorderColorIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose1}>
                      <ListItemIcon>
                        <RemoveCircleOutlineIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">Make Inactive</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose1}>
                      <ListItemIcon>
                        <HistoryIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">View Edit History</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose1}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">Delete</Typography>
                    </MenuItem>

                  </Menu>
                </div>
                {/* <MoreVertIcon style={{ color: "#BBBBBB", fontSize: "36px" }} /> */}
              </Box>
              {!v?.isOpen ? <Typography color={'#ED6A0F'} fontSize={"15px"} fontWeight={500} mr={1} onClick={() => showDetails(i)} style={{ cursor: "pointer" }}>Show Details</Typography> :
                <Typography color={'#ED6A0F'} fontSize={"15px"} fontWeight={500} mr={1} onClick={() => hideDetails(i)} style={{ cursor: "pointer" }}>Hide Details</Typography>}
            </Box>
          </Box>
          {v?.isOpen && (
            <Box mt={2} p={2}>
              <hr />
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={2.2} m={1} border={"1px solid #D2D2D2"} borderRadius={"1px"}>
                  <Box p={1}>
                    <Typography color={"#444444"} fontSize={13} fontWeight={400} mt={-1}>Total Eligible Students</Typography>
                    <Typography color={"#444444"} fontSize={14} fontWeight={600} mt={3} mb={1}>10</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={2.2} m={1} border={"1px solid #D2D2D2"} borderRadius={"1px"}>
                  <Box p={1}>
                    <Typography color={"#444444"} fontSize={13} fontWeight={400} mt={-1}>Total Assigned Courses</Typography>
                    <Typography color={"#444444"} fontSize={14} fontWeight={600} mt={3} mb={1}>10</Typography>
                  </Box>
                </Grid> <Grid item xs={12} md={2.2} m={1} border={"1px solid #D2D2D2"} borderRadius={"1px"}>
                  <Box p={1}>
                    <Typography color={"#444444"} fontSize={13} fontWeight={400} mt={-1}>Overall Usage Limit</Typography>
                    <Typography color={"#444444"} fontSize={14} fontWeight={600} mt={3} mb={1}>{v?.no_times_used}</Typography>
                  </Box>
                </Grid> <Grid item xs={12} md={2.2} m={1} border={"1px solid #D2D2D2"} borderRadius={"1px"}>
                  <Box p={1}>
                    <Typography color={"#444444"} fontSize={13} fontWeight={400} mt={-1}>Usage Per Student</Typography>
                    <Typography color={"#444444"} fontSize={14} fontWeight={600} mt={3} mb={1}>{v?.usage_per_student}</Typography>
                  </Box>
                </Grid> <Grid item xs={12} md={2.2} m={1} border={"1px solid #D2D2D2"} borderRadius={"1px"}>
                  <Box p={1}>
                    <Typography color={"#444444"} fontSize={13} fontWeight={400} mt={-1}>Min Order Value</Typography>
                    <Typography color={"#444444"} fontSize={14} fontWeight={600} mt={3} mb={1}>₹{v?.minimum_order_value}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

        </Box>
      </>
      ))}
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} my={5}>

        <Box border={"1px solid #A2A1A8"} style={{ cursor: "pointer" }} onClick={() => handleBack()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"black"} px={3} py={1}>Back</Typography></Box>
        <Box backgroundColor={"#FF8C38"} style={{ cursor: "pointer" }} onClick={() => handleNext()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Next</Typography></Box>
      </Box>
      <AddCoupan open={open} handleClose={handleClose} getCourse={getCourse} />
    </>
  )
}

export default Step3
