import TextFieldComponent from '@/components/TextFieldComponent'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Step5 = ({ formDataMain, setFormDataMain, step, setStep }) => {
  const route = useRouter()

  const [formData, setFormData] = useState({})
  const [tableData, setTableData] = useState([])
  const [editData, setEditData] = useState({})

  function transformData(input) {
    const maxLength = Math.max(input.courses_title?.length, input.courses_description?.length);
    
    return Array.from({ length: maxLength }, (_, i) => ({
      courses_title: input.courses_title[i] || "",
      courses_description: input.courses_description[i] || "",
      id1: Math.floor(Math.random() * 1000000).toString()
    }));
  }


   useEffect(() => {
      setFormData({ courses_description : "", courses_title : ""})
      // const data = transformData(formDataMain);

      setTableData(formDataMain?.courses_description_obj)
    }, [formDataMain])

  const handleNext = () => {
    if (step == 8) {

    } else {
      if(tableData?.length == 0){
        toast.error("Please add atleast one course details")
      }else{
          // setFormDataMain({ ...formDataMain, courses_title: tableData?.map(v => v?.courses_title), courses_description: tableData?.map(v => v?.courses_description) })
          setFormDataMain({ ...formDataMain, courses_description_obj : tableData})
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

  const handleChange = (e) => {
    console.log(e)
    if (e.target.type == "file") {
      const file = event.target.files[0];
      if (file) {
        setFormData({ ...formData, "photo": file })

        // alert(`File selected: ${file.name}`);
      }
    } else {
      const { name, value } = e.target

      setFormData({ ...formData, [name]: value })
    }
  }

  console.log('tableData', tableData)
  const handleAdd = () => {
    if(!formData?.courses_title || !formData?.courses_description){
      toast.error("Please add title and description")
    }else{
    setTableData([...tableData, { ...formData, id1: Math.floor(Math.random() * 1000000).toString() }])
    setFormData({})
    }
  }

  const handleEdit = (row, id1) => {
    setEditData(id1)
    setFormData(row)
  }

  const handleDelete = (id1) => {
    let data = [...tableData]
    let newData = data?.filter((v,i) => i != id1)
    setTableData(newData)
  }

  const handleUpdate = () => {
    if(!formData?.courses_title || !formData?.courses_description){
      toast.error("Please add title and description")
    }else{
    let data = [...tableData]
    let newData = data?.map((v,i) => i == editData ? formData : v)
    setTableData(newData)
    setEditData({})
    setFormData({})
    }
  }
  return (
    <>    <Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>Create Details</Typography>

      <TextFieldComponent
        name="courses_title"
        value={formData?.courses_title ?? ""}
        onChange={handleChange}
        placeholder='title'
      />
      <br />
      <br />
      <br />

      <TextFieldComponent
        name="courses_description"
        value={formData?.courses_description ?? ""}
        onChange={handleChange}
        placeholder='Description'
      />

      {(typeof editData == "number") ? <Box backgroundColor={"#FF8C38"} width={"100px"} my={3} style={{ cursor: "pointer" }} onClick={handleUpdate} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Update</Typography></Box> :
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
                <TableCell style={{ borderRight: "none" }} width={120} >Title</TableCell>
                <TableCell style={{ borderRight: "none" }} width={120} >Description</TableCell>
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
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.courses_title}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.courses_description}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">
                    <Box display={"flex"}>
                      <Box backgroundColor="#D1732D" px={2} py={1} borderRadius={"4px"}><Typography color={'white'} onClick={() => handleEdit(row, id1)} style={{ cursor: "pointer" }} >Edit</Typography></Box>
                      <Box backgroundColor="#B73E38 " px={2} py={1} borderRadius={"4px"} ml={2}><Typography color={'white'} onClick={() => handleDelete(id1)} style={{ cursor: "pointer" }}>Delete</Typography></Box>
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

export default Step5
