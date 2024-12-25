import { Box, Button,Divider,TextField,InputLabel, InputAdornment,Select,MenuItem, Dialog, DialogContent, DialogTitle, Container, Grid, Paper, Table,TableSortLabel,  IconButton, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Stepper, Step, StepLabel, Link, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack, ColorLensOutlined } from "@mui/icons-material";
import TableCell,  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadIcon from '@mui/icons-material/CloudUpload';

import DownloadIcon from '@mui/icons-material/CloudDownload';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from '@mui/base/Unstable_NumberInput';
import { DataEncrypt, DataDecrypt } from '../../../utils/encryption';

import FormControl from '@mui/material/FormControl';
import Image from 'next/image';
import { useRouter } from 'next/router';
import VisibilityIcon from '@mui/icons-material/Visibility';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const data = [
    { id: 1, year: 2023, month: 'January', percentage: 10, salaryHike: '5%', updatedBy: 'John Doe' },
    { id: 2, year: 2023, month: 'February', percentage: 15, salaryHike: '7%', updatedBy: 'Jane Smith' },
    { id: 3, year: 2023, month: 'March', percentage: 20, salaryHike: '10%', updatedBy: 'Alice Johnson' },
    // Add more rows as needed
  ];

const AddEmployee = () => {

    const router = useRouter();
    const { action, lead_id, category_id } = router.query;
    const steps = ['Employee', 'Employee document', 'employee doc1'];


    const [activeStep, setActiveStep] = useState(0);
    const [editorHtml, setEditorHtml] = useState('');
    const [editorHtmlkpa, setEditorHtmlkpa] = useState('');
    const [editorHtmlsoap, setEditorHtmlsoap] = useState('');
    const [imagePath, setImagePath] = useState('');


    const handleChangekra = (html) => {
      setEditorHtml(html);
    };
  
    const handleChangekpa = (html) => {
      setEditorHtmlkpa(html);
    };
    const handleChangesoap = (html) => {
      setEditorHtmlsoap(html);
    };

    const handleFromDateChange = (date) => {
      setFromDate(date);
      handleDateFilter(); // Filter data when fromDate changes
  };

    const handleNext = () => {
      setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevStep) => prevStep - 1);
    };

    
    const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
        return (
          <BaseNumberInput
            slots={{
              root: StyledInputRoot,
              input: StyledInputElement,
              incrementButton: StyledButton,
              decrementButton: StyledButton,
            }}
            slotProps={{
              incrementButton: {
                children: '▴',
              },
              decrementButton: {
                children: '▾',
              },
            }}
            {...props}
            ref={ref}
          />
        );
      });

      const blue = {
        100: '#DAECFF',
        200: '#80BFFF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
      };
      
      const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
      };
      
const StyledInputRoot = styled('div')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    display: grid;
    grid-template-columns: 1fr 19px;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
    column-gap: 8px;
    padding: 4px;
  
    &.${numberInputClasses.focused} {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
  
  const StyledInputElement = styled('input')(
    ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.5;
    grid-column: 1/2;
    grid-row: 1/3;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: inherit;
    border: none;
    border-radius: inherit;
    padding: 8px 12px;
    outline: 0;
  `,
  );
  
  const StyledButton = styled('button')(
    ({ theme }) => `
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    appearance: none;
    padding: 0;
    width: 19px;
    height: 19px;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1;
    box-sizing: border-box;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 0;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      cursor: pointer;
    }
  
    &.${numberInputClasses.incrementButton} {
      grid-column: 2/3;
      grid-row: 1/2;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: 1px solid;
      border-bottom: 0;
      &:hover {
        cursor: pointer;
        background: ${blue[400]};
        color: ${grey[50]};
      }
  
    border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    }
  
    &.${numberInputClasses.decrementButton} {
      grid-column: 2/3;
      grid-row: 2/3;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border: 1px solid;
      &:hover {
        cursor: pointer;
        background: ${blue[400]};
        color: ${grey[50]};
      }
  
    border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    }
    & .arrow {
      transform: translateY(-1px);
    }
  `,
  );
    
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 10,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 10,
  });
  

    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [role, setRole] = useState(null);
    const [id, setId] = useState('');
    const [offered_salary, setOffered_salary] = useState('');
    const [gender, setGender] = useState('');
    const [pmobile, setPmobile] = useState('');
    const [cmobile, setCmobile] = useState([]);
    const [pemail, setPemail] = useState('');
    const [cemail, setCemail] = useState('');
    const [joining_date, setJoining_date] = useState('');
    const [birth_date, setBirth_date] = useState('');
    const [blood_group, setBlood_group] = useState('');
    const [temporary_address, setTemporary_address] = useState('');
    const [tstate, setTstate] = useState('');
    const [tcountry, setTcountry] = useState('');
    const [permanant_address, setPermanant_address] = useState('');
    const [pstate, setPstate] = useState('');
    const [pcountry, setPcountry] = useState('');
    const [buynow_link, setbuynow_link] = useState('');

    const [emmergency_contact, setEmmergency_contact] = useState('');
    const [lastjob_companyname, setLastjob_companyname] = useState('');
    const [ssc_marks, setSsc_marks] = useState('');
    
    const [hsc_marks, setHsc_marks] = useState('');
    const [final_qualification, setFinal_qualification] = useState('');
    const [company_name, setCompany_name] = useState('');

    
    const [department, setDepartment] = useState('');
    const [reporting_to, setReporting_to] = useState('');
    const [level_in_company, setLevel_in_company] = useState('');
    
    const [allocated_states, setAllocated_states] = useState('');
    const [allocated_district, setAllocated_district] = useState('');
    const [allocated_taluka, setAllocated_taluka] = useState('');
    const [categories, setCategories] = useState([]);
    const [table1Rows, setTable1Rows] = useState([]);

    const [bannerFile, setBannerFile] = useState(null);

    const [imageSrc, setImageSrc] = useState(null); // State for the image source
    const [open, setOpen] = useState(false);
    const [fromDate, setFromDate] = useState(''); 
    const [birthdate, setBirthdate] = useState(null);

    const [choseCategory, setChoseCategory] = useState('');
    

    const handleFileChange1 = (event) => {
      const file = event.target.files[0];
      if (file) {
          // Create a URL for the uploaded image
          const imageUrl = URL.createObjectURL(file);
          setImagePath(imageUrl); // Set the image path
      }
  };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result); // Set the image source for preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        setImageSrc(null); // Clear the image
    };

    const handleDownload = () => {
      if (imageSrc) {
          const link = document.createElement('a');
          link.href = imageSrc;
          link.download = 'uploaded_image.png'; // Set the default filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // Clean up
      }
  };
  const handleClickOpen = () => {
    setOpen(true); // Open dialog
};

const handleClose = () => {
    setOpen(false); // Close dialog
};


    // const handleFileChange = (event) => {
    //   const file = event.target.files[0];
    //   setSelectedFile(file);
    // };

    const bannerFileChange = (event) => {
      const file = event.target.files[0];
      setBannerFile(file);
    };

   
    
    const handleCancel = async () => {
      window.history.back();
    };
    
    const handleChange = (event, newValue) => {
      setChoseCategory(newValue);
      setRole(newValue.id);
    };


      const [images, setImages] = useState([]);
      const [imageLabels, setImageLabels] = useState([]);
    
      const handleImageChange = (e) => {
        const files = e.target.files;
    
        // Convert FileList to an array and update state
        setImages((prevImages) => [...prevImages, ...Array.from(files)]);
      };
    
      const handleLabelChange = (index, label) => {
        const updatedLabels = [...imageLabels];
        updatedLabels[index] = label;
        setImageLabels(updatedLabels);
      };
    
      const handleRemoveImage = (index, item_id) => {
        if(item_id)
        {
          deteleData(item_id);
        }
        const updatedImages = [...images];
        const updatedLabels = [...imageLabels];
    
        updatedImages.splice(index, 1);
        updatedLabels.splice(index, 1);
    
        setImages(updatedImages);
        setImageLabels(updatedLabels);
      };

      //Details
      const [rows, setRows] = useState([]);
      const [editingRowIndex, setEditingRowIndex] = useState(null);
      const [newRow, setNewRow] = useState({ name: '', description: '' });
    
      const newhandleChange = (e) => {
        const { name, value } = e.target;
        setNewRow((prev) => ({ ...prev, [name]: value }));
      };
    
      const addNewRowAssets = () => {
        const updatedRows = [...rows, { id: rows.length + 1, ...newRow }];
        setRows(updatedRows);
        setNewRow({ name: '', modelno: '', uniqueno: '', assetno: '', assetdate: '', aperson: '' });
      };

      const addNewRow = () => {
        const updatedRows = [...rows, { id: rows.length + 1, ...newRow }];
        setRows(updatedRows);
        setNewRow({ name: '', description: '' });
      };

      const addNewRowtable1 = (index) => {
        
        const newRowData = { id: rows.length + 1, ...rows[index] };
              const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows); 
        setTable1Rows([...table1Rows, newRowData]); 
        setNewRow({ year: '', month: '', percentage: '', salary: '', image: '', updatedby: '' });
      };
      

      const handleEditRow = (index) => {
        setEditingRowIndex(index);
        setNewRow({ ...rows[index] });
      };
    
      const handleUpdateRow = () => {
        const updatedRows = [...rows];
        updatedRows[editingRowIndex] = { ...newRow };
        setRows(updatedRows);
        setEditingRowIndex(null);
        setNewRow({ name: '', description: '' });
      };
    
      const handleDeleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
      };

      // Faq
      const [faqs, setfaqs] = useState([]);
     


      // Video
      const [videos, setVideos] = useState([]);
      const [newVideo, setNewVideo] = useState({ label: '', link: '', video_image: null });
      const [editingIndex, setEditingIndex] = useState(null);
      const [validationError, setValidationError] = useState('');

      const newVideoHandleChange = (event) => {
        const { name, value } = event.target;
        setNewVideo((prevVideo) => ({ ...prevVideo, [name]: value }));
      };

      const handlevideoImageChange = (event) => {
        const imageFile = event.target.files[0];
        setNewVideo((prevVideo) => ({ ...prevVideo, video_image: imageFile }));
      };

      const validateFields = () => {
        if (!newVideo.label || !newVideo.link || !newVideo.video_image) {
          setValidationError('All fields are mandatory');
          return false;
        }
        setValidationError('');
        return true;
      };

      const addNewVideoRow = () => {
        if (validateFields()) {
          setVideos((prevVideos) => [...prevVideos, newVideo]);
          setNewVideo({ label: '', link: '', video_image: null });
        }
      };

      const editVideoRow = (index) => {
        console.log(videos[index]);
        setNewVideo({ label: '', link: '', video_image: null }); // Set the fields to the values of the selected video
        setEditingIndex(index);
      };

      const updateVideoRow = () => {
        if (validateFields()) {
          const updatedVideos = [...videos];
          updatedVideos[editingIndex] = newVideo;
          setVideos(updatedVideos);
          setNewVideo({ label: '', link: '', video_image: null });
          setEditingIndex(null);
        }
      };

      const deleteVideoRow = (index, item_id) => {
        if(item_id)
        {
          deteleData(item_id);
        }
        const updatedVideos = [...videos];
        updatedVideos.splice(index, 1);
        setVideos(updatedVideos);
      };


      // Course Video
     

      const handlenewCourseVideoImageChange = (event) => {
        const imageFile = event.target.files[0];
        setNewCourseVideo((prevVideo) => ({ ...prevVideo, image: imageFile }));
      };

      const validateCourseFields = () => {
        if (!newCourseVideo.label || !newCourseVideo.link || !newCourseVideo.image) {
          setValidationCourseError('All fields are mandatory');
          return false;
        }
        setValidationCourseError('');
        return true;
      };

      const addNewCourseVideoRow = () => {
        if (validateCourseFields()) {
          setCourseVideo((prevVideos) => [...prevVideos, newCourseVideo]);
          setNewCourseVideo({ label: '', link: '', image:null });
        }
      };

      const editCourseVideoRow = (index) => {
        setNewCourseVideo({ label: '', link: '', image:null });
        setEditingCourseIndex(index);
      };

      const handleLinkClick = (img) => {
      
        window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}${img}`, '_blank', 'noopener,noreferrer');
      };
      
      const BloodGroupChange = (event) => {

        setBlood_group(event.target.value);
      };

      const GenderChange = (event) => {

        setGender(event.target.value);
      };

      const handleSubmit = async () => {
        let videoImage = [];
        let video_data = [];

        for(const item of videos)
          {
            if (!item.details_id) {
              videoImage.push(item.video_image);
              video_data.push(item);
            }
          }
        

        const formData ={
          'image': selectedFile,
        
          'name':name.replace(/'/g, "\\'"),
          //'description':description.replace(/'/g, "\\'"),
        // 'specification':specification,
          'role': role,
          'offered_salary': offered_salary,
          'id': id,
          'gender': gender,
          'pmobile': pmobile,
          'cmobile': cmobile,
          'pemail': pemail,
          'cemail': cemail,
          'row_data': JSON.stringify({ tableData: rows }),
          'marketing_image': images,
          'bulk_image_level': imageLabels,
         'video_data': JSON.stringify(video_data),
          'video_image': videoImage,
          'joining_date': joining_date,
          'birth_date': birth_date,
          'blood_group': blood_group,
          'temporary_address': temporary_address,
          'permanant_address': permanant_address,
          'lastjob_companyname': lastjob_companyname,
         
          'ssc_marks': ssc_marks,
          'hsc_marks': hsc_marks,
          'final_qualification': final_qualification,

          'company_name': company_name,
          'department': department,
          'reporting_to': reporting_to,
          'level_in_company': level_in_company,
          'allocated_states': allocated_states,
          'allocated_district': allocated_district
        }
       
      try {
        let response = [];

        
            response = await api.post('/api/employee/add-employee', formData);
        if (response) {
          window.history.back();
          alert('Employee Saved  successfully');
        } else {
          alert(response.data.error);
          console.error('Failed to save');
        }

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

   


    return (

      

        <main className="p-6 space-y-6">
          
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >


            <Grid item={true} xs={12}   >
                <TableContainer component={Paper} >

                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '30%', verticalAlign: 'top'}} >
                        <Typography variant="h5"  sx={{ padding: 2 }}>{action =='update' ? ( <>Update Primary products</>): (<>Add New  Employee</>)}</Typography>
                    </Box>

                    <Stepper activeStep={activeStep} alternativeLabel>  
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    {activeStep === 0 && (
                      <Grid spacing={2}   sx={{ padding: 3 }} container>

<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

      <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
       Employee Name
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />
    </Box>

    <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
       Employee Role
      </label>
      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(Role) => role ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params}  variant="outlined" />}
                          />
                          
                        </FormControl>
</Box>



<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

      <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
       Employee Id
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={id}
        onChange={(e) => setId(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />
    </Box>

    <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
 Offered Salary
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={offered_salary}
        onChange={(e) => setOffered_salary(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />
</Box>


<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

      <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Gender
      </label>
    
      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                   required
                                    id="gender"
                                    variant="outlined"
                                    value={gender}
                                    label="Gender"
                                    onChange={GenderChange}
                                >
                                    <MenuItem value="">Please Select</MenuItem>
                                    <MenuItem  value="Male">Male</MenuItem>
                                    <MenuItem  value="Female">Female</MenuItem>
                                    <MenuItem  value="Trans-Gender">Trans-Gender</MenuItem>
                                  
                                </Select>
                        </FormControl>
    
    </Box>
    <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      Personal Mobile Number
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={pmobile}
        onChange={(e) => setPmobile(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />
</Box>


    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

      <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Company mobile no.
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={cmobile}
        onChange={(e) => setCmobile(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />
    </Box>
    <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      Personal Email Id
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={pemail}
        onChange={(e) => setPemail(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />
</Box>


    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >
{/* 
      <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
     Joining Date
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={joining_date}
        onChange={(e) => setJoining_date(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      /> */}
      <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      Onboarding Date
      </label>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
  
       <DatePicker
    label="Onboarding Date"
    sx={{ width: '100%' }} // Set width of the DatePicker
    onChange={handleFromDateChange}
    renderInput={(params) => (
        <TextField
            {...params}
            sx={{
                height: '33px', // Set height for the TextField
                '& input': {
                    height: '33px', // Set height for the input
                    padding: '0 10px', // Adjust padding as needed
                },
                '& .MuiOutlinedInput-root': {
                    height: '33px', // Set height for the outlined input
                    '& fieldset': {
                        height: '33px', // Ensure the fieldset respects height
                    },
                },
            }}
        />
    )}
/>

           </LocalizationProvider>
    </Box>
    <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
  
  
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      Birth Date
      </label>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div>
    
      <DatePicker
        label="Birth Date"
        sx={{ width: '100%', height:'33px' }} // Set width of the DatePicker
        value={birthdate}
        onChange={(newValue) => setBirthdate(dayjs(newValue))}
       
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              height: '20px', // Set height for the input
              '& input': {
                height: '20px', // Ensure the input itself is also 30px
                padding: '0 10px', 
                marginTop:'-10px'// Adjust padding as needed
              },
              '& .MuiOutlinedInput-root': {
                height: '20px', // Set height for the outlined input
              },
            }}
          />
        )}
      />
           </div></LocalizationProvider>

  
    
</Box>


    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

      <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
       Blood Group
      </label>
      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Distribution Type</InputLabel>
                                <Select
                                   required
                                    id="blood_group"
                                    variant="outlined"
                                    value={blood_group}
                                    label="Blood Group"
                                    onChange={BloodGroupChange}
                                >
                                    <MenuItem value="">Please Select</MenuItem>
                                    <MenuItem  value="Flat Amount">A+</MenuItem>
                                    <MenuItem  value="Percentage">B+</MenuItem>
                                    <MenuItem  value="Flat Amount">A-</MenuItem>
                                    <MenuItem  value="Percentage">B-</MenuItem>
                                    <MenuItem  value="Flat Amount">O+</MenuItem>
                                    <MenuItem  value="Percentage">O-</MenuItem>
                                    <MenuItem  value="Flat Amount">AB+</MenuItem>
                                    <MenuItem  value="Percentage">AB-</MenuItem>
                                </Select>
                        </FormControl>
    
    </Box>
    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
   Company Email Id
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={cemail}
        onChange={(e) => setCemail(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />
    </Box>

                        

                        <Box justifyContent={'space-between'} alignItems={'right'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top'}} >

                      
                          
                          <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      Temporary Address
      </label>
                        
                          
      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(Role) => role ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="please select state" variant="outlined" />}
                          />
                          
                        </FormControl>
                        <br/><br/>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(Role) => role ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="please select district" variant="outlined" />}
                          />
                          
                        </FormControl>
                        <br/><br/>
                        <TextField
        required
        label="Enter Detail Address" 
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={temporary_address}
        onChange={(e) => setTemporary_address(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />

                     
                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

                       
                          <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      Permanant Address
      </label>
      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(Role) => role ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="please select state" variant="outlined" />}
                          />
                          
                        </FormControl>
                        <br/><br/>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(Role) => role ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="please select country" variant="outlined" />}
                          />
                          
                        </FormControl>
                        <br/><br/>
                        <TextField
        required
        label="Enter Detail Address" 
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={permanant_address}
        onChange={(e) => setPermanant_address(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />

</Box>

<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
Emmergency Contact
</label>
<TextField
  required
  size="small"  // Makes the TextField smaller
  fullWidth
  variant="outlined"
  value={name}
 // onChange={(e) => setTitle(e.target.value)}
  InputProps={{ style: { height: '32px' } }}  // Set a smaller height
/>
</Box>
<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
Last Job Company Name
</label>
<TextField
  required
  size="small"  // Makes the TextField smaller
  fullWidth
  variant="outlined"
  value={lastjob_companyname}
  onChange={(e) => setLastjob_companyname(e.target.value)}
  InputProps={{ style: { height: '32px' } }}  // Set a smaller height
/>
</Box>
<Divider sx={{ my: 2 }} />
<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>Add Education Details</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mt={3} mb={1} width="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
          10TH Marks
        </label>
        <TextField
          required
          size="small"
          fullWidth
          variant="outlined"
          value={ssc_marks} // Use a single value for all
          onChange={(e) => setSsc_marks(e.target.value)} // Update state
          InputProps={{ style: { height: '32px' } }} 
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
          12TH Marks
        </label>
        <TextField
          required
          size="small"
          fullWidth
          variant="outlined"
          value={hsc_marks} // Use a single value for all
          onChange={(e) => setHsc_marks(e.target.value)} // Update state
          InputProps={{ style: { height: '32px' } }} 
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
          Final Qualification
        </label>
        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(Role) => role ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="please select Qualification" variant="outlined" />}
                          />
                          
                        </FormControl>
      </Box>
    </Box>
                     
    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>Add Company Details</Typography>
                        </Box>

        
<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
 Company Name
</label>
<TextField
  required
  size="small"  // Makes the TextField smaller
  fullWidth
  variant="outlined"
  value={company_name}
  onChange={(e) => setCompany_name(e.target.value)}
  InputProps={{ style: { height: '32px' } }}  // Set a smaller height
/>
</Box>

<Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
 Department
</label>
<FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(Role) => role ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="please select Department" variant="outlined" />}
                          />
                          
                        </FormControl>
</Box>



<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
 Reporting To
</label>
<FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(Role) => role ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="Reporting to" variant="outlined" />}
                          />
                          
                        </FormControl>
</Box>

<Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
Level in Company
</label>
<FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(Role) => role ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="Level in company" variant="outlined" />}
                          />
                          
                        </FormControl>
</Box>


<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
  Allocated States
</label>
<TextField
  required
  size="small"  // Makes the TextField smaller
  fullWidth
  variant="outlined"
  value={allocated_states}
  onChange={(e) => setAllocated_states(e.target.value)}
  InputProps={{ style: { height: '32px' } }}  // Set a smaller height
/>
</Box>
<Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
Allocated District
</label>
<TextField
  required
  size="small"  // Makes the TextField smaller
  fullWidth
  variant="outlined"
  value={allocated_district}
  onChange={(e) => setAllocated_district(e.target.value)}
  InputProps={{ style: { height: '32px' } }}  // Set a smaller height
/>
</Box>

<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>My Key Performance Indicator</Typography>
                        </Box>
                
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '100%', verticalAlign: 'top', padding: '0 10px'}} >
                        <Box display="flex" justifyContent="space-between" mt={3} mb={1} width="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Year
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="year"
                           
                            variant="outlined"
                            onChange={newhandleChange}
          InputProps={{ style: { height: '32px' } }} 
        
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Month
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="month"
                         
                            variant="outlined"
                            onChange={newhandleChange}
          InputProps={{ style: { height: '32px' } }} 
        
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Percentage
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="percentage"
                            label="Name"
                            variant="outlined"
                            onChange={newhandleChange}
          InputProps={{ style: { height: '32px' } }} 
        />
      </Box>
    </Box>
    <Box display="flex" justifyContent="space-between" mt={3} mb={1} width="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
       Salary Hike
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="salary"
         
          variant="outlined"
          onChange={newhandleChange}
InputProps={{ style: { height: '32px' } }} 
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
          <Box display="flex" alignItems="center">
            <Button component="label" variant="contained" size="small" sx={{ marginTop: '20px' }}>
                Image Upload
                <input
                    type="file"
                    hidden
                    accept="image/*" // Restrict to images
                    onChange={handleFileChange1} // Handle file change
                />
            </Button>
            {imagePath && (
                <div style={{ marginLeft: '10px' }}>
                    <Typography variant="body2">{imagePath}</Typography>
                    {/* <img src={imagePath} alt="Uploaded Preview" style={{ maxWidth: '100px', marginLeft: '5px' }} /> */}
                </div>
            )}

            
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      updated by
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="updatedby"
                          
                            variant="outlined"
                            onChange={newhandleChange}
          InputProps={{ style: { height: '32px' } }} 
        />
      </Box>
    </Box>

                            <Button variant="contained" onClick={addNewRow} style={{ marginTop: '8px' }}>Add Row</Button>
                            <br/>
                            <br/>

                            <TableContainer component={Paper} >
                            <Table>
                                <TableHead sx={{backgroundColor:"#f7f5dd"}}>
                                <TableRow>
                                    <TableCell>Sl No.</TableCell>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Month</TableCell>
                                    <TableCell>Percentage</TableCell>
                                    <TableCell>Salary Hike</TableCell>
                                    <TableCell>View</TableCell>
                                    <TableCell>Updated By</TableCell>
                         
                                    <TableCell>Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {table1Rows.map((row, index) => (
                                    <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="year" variant="outlined" value={newRow.year} onChange={(e) => setNewRow({ ...newRow, year: e.target.value })} /> : row.year}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="month" variant="outlined" value={newRow.month} onChange={(e) => setNewRow({ ...newRow, month: e.target.value })} /> : row.month}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="percentage" variant="outlined" value={newRow.percentage} onChange={(e) => setNewRow({ ...newRow, percentage: e.target.value })} /> : row.percentage}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="salary" variant="outlined" value={newRow.salary} onChange={(e) => setNewRow({ ...newRow, salary: e.target.value })} /> : row.salary}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="image" variant="outlined" value={newRow.image} onChange={(e) => setNewRow({ ...newRow, image: e.target.value })} /> : row.image}</TableCell>
                                    
                                      <TableCell>{index === editingRowIndex ? <TextField fullWidth name="updatedby" variant="outlined" value={newRow.updatedby} onChange={(e) => setNewRow({ ...newRow, updatedby: e.target.value })} /> : row.updatedby}</TableCell>
                                 
                                 
                                    <TableCell>
                                        {index === editingRowIndex ? (
                                          <>
                                            <Button variant="contained" onClick={handleUpdateRow} color="warning" style={{ marginRight: '8px' }}>Update</Button>
                                            <Button variant="contained" onClick={setEditingRowIndex} color="error" style={{ marginRight: '8px' }}>Cancel</Button>
                                          </>
                                        ) : (
                                          <>
                                            <Button variant="contained" onClick={() => handleEditRow(index)} color="warning" style={{ marginRight: '8px' }}>Edit</Button>
                                            <Button variant="contained" onClick={() => handleDeleteRow(index)} color="error" style={{ marginRight: '8px' }}>Delete</Button>
                                          </>
                                        )}
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer><br/><br/>

                            <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell> </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell> </TableCell>
                         
                                    <TableCell></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="year" variant="outlined" value={newRow.year} onChange={(e) => setNewRow({ ...newRow, year: e.target.value })} /> : row.year}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="month" variant="outlined" value={newRow.month} onChange={(e) => setNewRow({ ...newRow, month: e.target.value })} /> : row.month}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="percentage" variant="outlined" value={newRow.percentage} onChange={(e) => setNewRow({ ...newRow, percentage: e.target.value })} /> : row.percentage}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="salary" variant="outlined" value={newRow.salary} onChange={(e) => setNewRow({ ...newRow, salary: e.target.value })} /> : row.salary}</TableCell>
                                    <TableCell>     
                                    <Button 
          variant="contained" 
          color="success" 
          onClick={() => addNewRowtable1(index)} 
          
          style={{ marginRight: '8px' }}
        >
          Upload
        </Button></TableCell>
                                      <TableCell>{index === editingRowIndex ? <TextField fullWidth name="updatedby" variant="outlined" value={newRow.updatedby} onChange={(e) => setNewRow({ ...newRow, updatedby: e.target.value })} /> : row.updatedby}</TableCell>
                                 
                                 
                                    <TableCell>
                                        {index === editingRowIndex ? (
                                          <>
                                            <Button variant="contained" onClick={handleUpdateRow} color="warning" style={{ marginRight: '8px' }}>Update</Button>
                                            <Button variant="contained" onClick={setEditingRowIndex} color="error" style={{ marginRight: '8px' }}>Cancel</Button>
                                          </>
                                        ) : (
                                          <>
                                            <Button variant="contained" onClick={() => handleEditRow(index)} color="warning" style={{ marginRight: '8px' }}>Edit</Button>
                                            <Button variant="contained" onClick={() => handleDeleteRow(index)} color="error" style={{ marginRight: '8px' }}>Delete</Button>
                                          </>
                                        )}
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Box>
                        </Grid>
                    )}


                    {activeStep === 1 && (
                      <Grid spacing={2} sx={{ padding: 3 }} container>
                      <Grid container spacing={1} sx={{marginTop:"50px"}}>
                      <Grid item xs={3}>
            <Box>
                <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
                    Upload Resume
                </label>
                <TextField
                    variant="outlined"
                    placeholder="Upload an image"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <UploadIcon style={{ cursor: 'pointer', height: '24px', width: '24px' }} />
                            </InputAdornment>
                        ),
                        style: {
                            height: '100px',
                            width: '100%',
                            backgroundImage: imageSrc ? `url(${imageSrc})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: 'transparent', // Hide the text color
                        },
                    }}
                    inputProps={{ readOnly: true }} // Make the text box read-only
                />

                <Box mt={1} display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Button component="label" variant="contained" size="small">
                            Upload
                            <input
                                type="file"
                                hidden
                                accept="image/*" // Restrict to images
                                onChange={handleFileChange} // Handle file change
                            />
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={handleDelete} // Clear image
                            style={{ marginLeft: '5px' }} // Space between buttons
                        >
                            Delete
                        </Button>
                        <Box sx={{ alignItems: 'right', marginLeft: "40px" }}>
                            <VisibilityIcon onClick={handleClickOpen} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                            <DownloadIcon   onClick={handleDownload}  style={{ cursor: 'pointer', marginLeft: '10px' }} />
                        </Box>
                    </Box>
                </Box>
                <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Image Preview</DialogTitle>
                    <DialogContent>
                        {imageSrc && (
                            <img
                                src={imageSrc}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '400px', 
                                    objectFit: 'contain', 
                                }}
                            />
                        )}
                    </DialogContent>
                </Dialog>
              
                
            </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
          <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
Adhar Card
</label>
            <TextField
              variant="outlined"
              placeholder="Upload an image"
           
              onChange={(e) => handleLabelChange(index, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadIcon
                      style={{ cursor: 'pointer', height: '24px', width: '24px' }} // Icon size
                      //onClick={() => handleIconClick()}
                    />
                  </InputAdornment>
               
                ),
                style: { height: '100px', width: '100%' }, // Increased height
                sx: {
                  '& .MuiInputBase-input': {
                    padding: '16px 14px', // Center text vertically
                  },
                },
              }}
            />
           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  //onClick={() => handleIconClick(index)}
                  onChange={handleImageChange}
                >
                  Upload
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  //onClick={() => handleDelete(index)}
                  style={{ marginLeft: '5px' }} // Space between buttons
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                 // onClick={() => handleView(index)}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                //  onClick={() => handleDownload(index)}
                />
                </Box>
              </Box>
             
            </Box>
          </Box>
        </Grid>  <Grid item xs={3}>
          <Box>
          <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
PAN Card
</label>
            <TextField
              variant="outlined"
              placeholder="Upload an image"
           
              onChange={(e) => handleLabelChange(index, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadIcon
                      style={{ cursor: 'pointer', height: '24px', width: '24px' }} // Icon size
                      //onClick={() => handleIconClick()}
                    />
                  </InputAdornment>
               
                ),
                style: { height: '100px', width: '100%' }, // Increased height
                sx: {
                  '& .MuiInputBase-input': {
                    padding: '16px 14px', // Center text vertically
                  },
                },
              }}
            />
           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  //onClick={() => handleIconClick(index)}
                  onChange={handleImageChange}
                >
                  Upload
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  //onClick={() => handleDelete(index)}
                  style={{ marginLeft: '5px' }} // Space between buttons
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                 // onClick={() => handleView(index)}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                //  onClick={() => handleDownload(index)}
                />
                </Box>
              </Box>
             
            </Box>
          </Box>
        </Grid>  <Grid item xs={3}>
          <Box>
          <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
Voter ID
</label>
            <TextField
              variant="outlined"
              placeholder="Upload an image"
           
              onChange={(e) => handleLabelChange(index, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadIcon
                      style={{ cursor: 'pointer', height: '24px', width: '24px' }} // Icon size
                      //onClick={() => handleIconClick()}
                    />
                  </InputAdornment>
               
                ),
                style: { height: '100px', width: '100%' }, // Increased height
                sx: {
                  '& .MuiInputBase-input': {
                    padding: '16px 14px', // Center text vertically
                  },
                },
              }}
            />
           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  //onClick={() => handleIconClick(index)}
                  onChange={handleImageChange}
                >
                  Upload
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  //onClick={() => handleDelete(index)}
                  style={{ marginLeft: '5px' }} // Space between buttons
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                 // onClick={() => handleView(index)}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                //  onClick={() => handleDownload(index)}
                />
                </Box>
              </Box>
             
            </Box>
          </Box>
        </Grid>
    </Grid>


    <Grid container spacing={1} sx={{marginTop:"50px"}}>
                      <Grid item xs={3}>
          <Box>
          <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
Driving Licences
</label>
            <TextField
              variant="outlined"
              placeholder="Upload an image"
           
              onChange={(e) => handleLabelChange(index, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadIcon
                      style={{ cursor: 'pointer', height: '24px', width: '24px' }} // Icon size
                      //onClick={() => handleIconClick()}
                    />
                  </InputAdornment>
               
                ),
                style: { height: '100px', width: '100%' }, // Increased height
                sx: {
                  '& .MuiInputBase-input': {
                    padding: '16px 14px', // Center text vertically
                  },
                },
              }}
            />
           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  //onClick={() => handleIconClick(index)}
                  onChange={handleImageChange}
                >
                  Upload
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  //onClick={() => handleDelete(index)}
                  style={{ marginLeft: '5px' }} // Space between buttons
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                 // onClick={() => handleView(index)}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                //  onClick={() => handleDownload(index)}
                />
                </Box>
              </Box>
             
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
          <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
SSC Markshit
</label>
            <TextField
              variant="outlined"
              placeholder="Upload an image"
           
              onChange={(e) => handleLabelChange(index, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadIcon
                      style={{ cursor: 'pointer', height: '24px', width: '24px' }} // Icon size
                      //onClick={() => handleIconClick()}
                    />
                  </InputAdornment>
               
                ),
                style: { height: '100px', width: '100%' }, // Increased height
                sx: {
                  '& .MuiInputBase-input': {
                    padding: '16px 14px', // Center text vertically
                  },
                },
              }}
            />
           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  //onClick={() => handleIconClick(index)}
                  onChange={handleImageChange}
                >
                  Upload
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  //onClick={() => handleDelete(index)}
                  style={{ marginLeft: '5px' }} // Space between buttons
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                 // onClick={() => handleView(index)}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                //  onClick={() => handleDownload(index)}
                />
                </Box>
              </Box>
             
            </Box>
          </Box>
        </Grid>  <Grid item xs={3}>
          <Box>
          <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
Graduation Certficate
</label>
            <TextField
              variant="outlined"
              placeholder="Upload an image"
           
              onChange={(e) => handleLabelChange(index, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadIcon
                      style={{ cursor: 'pointer', height: '24px', width: '24px' }} // Icon size
                      //onClick={() => handleIconClick()}
                    />
                  </InputAdornment>
               
                ),
                style: { height: '100px', width: '100%' }, // Increased height
                sx: {
                  '& .MuiInputBase-input': {
                    padding: '16px 14px', // Center text vertically
                  },
                },
              }}
            />
           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  //onClick={() => handleIconClick(index)}
                  onChange={handleImageChange}
                >
                  Upload
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  //onClick={() => handleDelete(index)}
                  style={{ marginLeft: '5px' }} // Space between buttons
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                 // onClick={() => handleView(index)}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                //  onClick={() => handleDownload(index)}
                />
                </Box>
              </Box>
             
            </Box>
          </Box>
        </Grid>  <Grid item xs={3}>
          <Box>
          <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
Living Certficate
</label>
            <TextField
              variant="outlined"
              placeholder="Upload an image"
           
              onChange={(e) => handleLabelChange(index, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadIcon
                      style={{ cursor: 'pointer', height: '24px', width: '24px' }} // Icon size
                      //onClick={() => handleIconClick()}
                    />
                  </InputAdornment>
               
                ),
                style: { height: '100px', width: '100%' }, // Increased height
                sx: {
                  '& .MuiInputBase-input': {
                    padding: '16px 14px', // Center text vertically
                  },
                },
              }}
            />
           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  //onClick={() => handleIconClick(index)}
                  onChange={handleImageChange}
                >
                  Upload
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  //onClick={() => handleDelete(index)}
                  style={{ marginLeft: '5px' }} // Space between buttons
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                 // onClick={() => handleView(index)}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                //  onClick={() => handleDownload(index)}
                />
                </Box>
              </Box>
             
            </Box>
          </Box>
        </Grid>
    </Grid>


    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} sx={{marginTop:"51px"}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>Company Provided Assets</Typography>
                        </Box>
                
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '100%', verticalAlign: 'top', padding: '0 10px', marginTop:'0px'}} >
                        <Box display="flex" justifyContent="space-between" mt={3} mb={1} width="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Asset Name
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="name"
                           
                            variant="outlined"
                            onChange={newhandleChange}
          InputProps={{ style: { height: '32px' } }} 
        
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Model NO
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="modelno"
                         
                            variant="outlined"
                            onChange={newhandleChange}
          InputProps={{ style: { height: '32px' } }} 
        
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Unique No/ IMEI
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="uniqueno"
                           
                            variant="outlined"
                            onChange={newhandleChange}
          InputProps={{ style: { height: '32px' } }} 
        />
      </Box>
    </Box>
    <Box display="flex" justifyContent="space-between" mt={3} mb={1} width="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
     Asset No
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="assetno"
         
          variant="outlined"
          onChange={newhandleChange}
InputProps={{ style: { height: '32px' } }} 
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
   Asset Handover Date
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="assetdate"
         
          variant="outlined"
          onChange={newhandleChange}
InputProps={{ style: { height: '32px' } }} 
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
    Asset Handover Person
        </label>
        <TextField
          required
          size="small"
          fullWidth
          name="aperson"
                          
                            variant="outlined"
                            onChange={newhandleChange}
          InputProps={{ style: { height: '32px' } }} 
        />
      </Box>
    </Box>
                            

                            <Button variant="contained" onClick={addNewRowAssets} style={{ marginTop: '8px' }}>Add Row</Button>
                            <br/>
                            <br/>
                            <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{backgroundColor:"#f7f5dd"}}>
                                <TableRow>
                                    <TableCell>Sl No.</TableCell>
                                    <TableCell>Asset Name</TableCell>
                                    <TableCell>Mopdel No</TableCell>
                                    <TableCell>Unique NO / IMEI</TableCell>
                                    <TableCell>Asset NO</TableCell>
                                    <TableCell>Asset Handove date</TableCell>
                                    <TableCell>Asset Handover Person</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="name" variant="outlined" value={newRow.name} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} /> : row.name}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="modelno" variant="outlined" value={newRow.modelno} onChange={(e) => setNewRow({ ...newRow, modelno: e.target.value })} /> : row.modelno}</TableCell>
                                    
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="uniqueno" variant="outlined" value={newRow.uniqueno} onChange={(e) => setNewRow({ ...newRow, uniqueno: e.target.value })} /> : row.uniqueno}</TableCell>
                                    
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="assetno" variant="outlined" value={newRow.assetno} onChange={(e) => setNewRow({ ...newRow, assetno: e.target.value })} /> : row.assetno}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="assetdate" variant="outlined" value={newRow.assetdate} onChange={(e) => setNewRow({ ...newRow, assetdate: e.target.value })} /> : row.assetdate}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="aperson" variant="outlined" value={newRow.aperson} onChange={(e) => setNewRow({ ...newRow, aperson: e.target.value })} /> : row.aperson}</TableCell>
                                    <TableCell>
                                        {index === editingRowIndex ? (
                                          <>
                                            <Button variant="contained" onClick={handleUpdateRow} color="warning" style={{ marginRight: '8px' }}>Update</Button>
                                            <Button variant="contained" onClick={setEditingRowIndex} color="error" style={{ marginRight: '8px' }}>Cancel</Button>
                                          </>
                                        ) : (
                                          <>
                                            <Button variant="contained" onClick={() => handleEditRow(index)} color="warning" style={{ marginRight: '8px' }}>Edit</Button>
                                            <Button variant="contained" onClick={() => handleDeleteRow(index)} color="error" style={{ marginRight: '8px' }}>Delete</Button>
                                          </>
                                        )}
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Box>





                    </Grid>
                    )}


                    {activeStep === 2 && (
                      <Grid spacing={2}   sx={{ padding: 3 }} container>
                      <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>Details</Typography>
                        </Box>
                
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '100%', verticalAlign: 'top', padding: '0 10px'}} >
                           
                            <div style={{ marginTop: '16px' }}>

                            <label style={{ marginBottom: '20px', fontSize: '14px', fontWeight:'600', display: 'block' }}>
 Add KRA
        </label>
                            {/* <TextareaAutosize
                                name="description"
                                rowsmin={3}
                                placeholder="description"
                                value={newRow.description}
                                style={{height: '90px', width:'99%', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                onChange={new
                                handleChange}
                            /> */}
                           <ReactQuill
        value={editorHtml}
        onChange={handleChangekra}
        theme="snow"
      />

                            </div>

                                           <br/>
                            <div style={{ marginTop: '16px' }}>

<label style={{ marginBottom: '20px', fontSize: '14px', fontWeight:'600', display: 'block' }}>
Add KPI
</label>
<ReactQuill
        value={editorHtmlkpa}
        onChange={handleChangekpa}
        theme="snow"
      />
</div>


<br/>


                       


                                              
                            <div style={{ marginTop: '16px' }}>

                            <label style={{ marginBottom: '20px', fontSize: '14px', fontWeight:'600', display: 'block' }}>
 Add SOAP
        </label>
        <ReactQuill
        value={editorHtmlsoap}
        onChange={handleChangesoap}
        theme="snow"
      />
                            </div>

                                                    
                        </Box>


                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>Add My Learning</Typography>
                        </Box>
                
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '100%', verticalAlign: 'top', padding: '0 10px'}} >
                          <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Label</TableCell>
                                    <TableCell>Link</TableCell>
                                    <TableCell>Thumbnail</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                      <TableCell style={{ width: '15%' }}><TextField fullWidth
                                            name="label"
                                            label="Label"
                                            variant="outlined"
                                            onChange={newVideoHandleChange}
                                          /></TableCell>
                                      <TableCell style={{ width: '40%' }}><TextField fullWidth
                                            name="link"
                                            label="Link"
                                            variant="outlined"
                                            onChange={newVideoHandleChange}
                                        /></TableCell>
                                      <TableCell style={{ width: '30%' }}><input type="file" accept="image/*" onChange={handlevideoImageChange} /></TableCell>
                                      <TableCell style={{ width: '15%' }}>
                                        {validationError && <div style={{ color: 'red', marginTop: '8px' }}>{validationError}</div>}
                                        {editingIndex !== null ? (
                                          <Button variant="contained" size="small" onClick={updateVideoRow} style={{ marginTop: '8px' }}>
                                            Update
                                          </Button>
                                        ) : (
                                          <Button variant="contained" size="small" onClick={addNewVideoRow} style={{ marginTop: '8px' }}>
                                            Add Link
                                          </Button>
                                        )}</TableCell>
                                  </TableRow>
                                </TableBody>
                                
                                
                                <TableBody>
                                {videos.map((video, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{video.label}</TableCell>
                                    <TableCell>{video.link}</TableCell>
                                    <TableCell>
                                      {(video.video_image instanceof File) ? (
                                          <Image src={URL.createObjectURL(video.video_image)} alt={`Image ${index}`} width={200} height={50} />
                                      ):(
                                        <Link href="#" onClick={() => handleLinkClick(video.video_image)} display="inline" ml={2}>View Thumbnail</Link>
                                      )}
                                      {/* {video.video_image &&  URL.createObjectURL(video.video_image) && <Image src={URL.createObjectURL(video.video_image)} alt={`Image ${index}`} width={200} height={50} />} */}
                                    </TableCell>
                                    <TableCell>
                                      {/* <Button variant="contained" color="warning" size="small" onClick={() => editVideoRow(index)} style={{ marginTop: '8px', marginRight: '2px' }} >Edit</Button> */}
                                      <Button variant="contained" color="error" size="small" onClick={() => deleteVideoRow(index, video.details_id ? video.details_id : null)} style={{ marginTop: '8px' }} >Delete</Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                
                            
                        </Box>

                       
                      </Grid>
                    )}


                  
                    
                    {activeStep === steps.length ? (
                      <>
                        <Typography>All steps completed</Typography>
                      </>
                        
                      
                    ) : (
                      <>
                        <Box display="flex" justifyContent="flex-start" mr={2}  mt={1} ml={2} mb={1} >
                          <Button variant="outlined" style={{ marginRight: '8px' }} size="medium" disabled={activeStep === 0} onClick={handleBack}>
                            Back
                          </Button>
                          {activeStep < 2 ? (
                            <Button variant="outlined" style={{ marginRight: '8px' }} size="medium" onClick={handleNext}>
                              Next
                            </Button>
                          ) : (
                            <>
                              <Button variant="contained" color="primary" style={{ marginRight: '8px' }} size="medium" onClick={handleSubmit}>
                              Submit
                              </Button>
                              <Button variant="outlined"  onClick={handleCancel} >Cancel</Button>
                            </>
                          )}
                          </Box>
                      </>
                    )}
                 </TableContainer>
            </Grid>
            <Grid item={true} xs={12}   >
             
              </Grid>
        </Grid>
              
    </main>
    )
}
export default AddEmployee;