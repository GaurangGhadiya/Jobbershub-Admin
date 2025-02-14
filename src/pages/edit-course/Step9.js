import TextFieldComponent from '@/components/TextFieldComponent'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Step9 = ({ formDataMain, setFormDataMain, step, setStep ,finalSubmit}) => {
  const route = useRouter()

  const [formData, setFormData] = useState({})
  const [tableData, setTableData] = useState([])
  const [editData, setEditData] = useState({})

  function transformData(input) {
    const maxLength = Math.max(input.study_material_title?.length, input.study_material_desc?.length);
    
    return Array.from({ length: maxLength }, (_, i) => ({
      study_material_title: input.study_material_title[i] || "",
      study_material_desc: input.study_material_desc[i] || "",
      id1: Math.floor(Math.random() * 1000000).toString()
    }));
  }

   useEffect(() => {
      setFormData({  study_material_title : "",study_material_desc : "" })
      // const data = transformData(formDataMain);

      setTableData(formDataMain?.study_material_obj)
    }, [formDataMain])

  const handleNext = () => {
    if (step == 8) {
      if(tableData?.length == 0){
        toast.error("Please add atleast one study material")
      }else{
      setFormDataMain({ ...formDataMain, study_material_obj : tableData})
      finalSubmit({ ...formDataMain,  study_material_obj : tableData})
      }
    } else {
      setFormDataMain({ ...formDataMain,  study_material_obj : tableData})
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAdd = () => {
    if(!formData?.study_material_title || !formData?.study_material_desc){
      toast.error("Please add title and description")
    }else{
    setTableData([...tableData, { ...formData, id1: Math.floor(Math.random() * 1000000).toString() }])
    setFormData({})
    }
  }

  const handleEdit = (row) => {
    setEditData(row)
    setFormData(row)
  }

  const handleDelete = (id1) => {
    let data = [...tableData]
    let newData = data?.filter(v => v?.id1 != id1)
    setTableData(newData)
  }

  const handleUpdate = () => {
    if(!formData?.study_material_title || !formData?.study_material_desc){
      toast.error("Please add title and description")
    }else{
    let data = [...tableData]
    let newData = data?.map(v => v?.id1 == editData?.id1 ? formData : v)
    setTableData(newData)
    setEditData({})
    setFormData({})
    }
  }

  return (
    <>    <Typography color={"#FF8C38"} fontSize={16} fontWeight={600} mb={2}>Study Material</Typography>

      <TextFieldComponent
        name="study_material_title"
        value={formData?.study_material_title ?? ""}
        onChange={handleChange}
        placeholder='title'
      />
      <br />
      <br />
      <br />

      <TextFieldComponent
        name="study_material_desc"
        value={formData?.study_material_desc ?? ""}
        onChange={handleChange}
        placeholder='Description'
      />

      {editData?.id ? <Box backgroundColor={"#FF8C38"} width={"100px"} my={3} style={{ cursor: "pointer" }} onClick={handleUpdate} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Update</Typography></Box> :
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
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.study_material_title}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">{row?.study_material_desc}</TableCell>
                  <TableCell style={{ borderRight: "none" }} align="left">
                    <Box display={"flex"}>
                      <Box backgroundColor="#D1732D" px={2} py={1} borderRadius={"4px"} onClick={() => handleEdit(row)} style={{ cursor: "pointer" }}><Typography color={'white'} >Edit</Typography></Box>
                      <Box backgroundColor="#B73E38 " px={2} py={1} borderRadius={"4px"} ml={2} onClick={() => handleDelete(row?.id1)} style={{ cursor: "pointer" }}><Typography color={'white'} >Delete</Typography></Box>
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
        <Box backgroundColor={"#FF8C38"} style={{ cursor: "pointer" }} onClick={() => handleNext()} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Update</Typography></Box>
      </Box>
    </>)
}

export default Step9
