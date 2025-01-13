import { Box, Button,Divider,TextField,InputLabel, InputAdornment,Select,MenuItem, Dialog,Checkbox, DialogContent, DialogTitle, Container, Grid, Paper, Table,TableSortLabel,  IconButton, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Stepper, Step, StepLabel, Link, Autocomplete } from "@mui/material";
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



const AddLeadCategoryTransactions = () => {

  
    
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
  

  const [firstName, setFirstName] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [roleId, setRoleId] = useState('');
  const [education, setEducation] = useState('');
  const [created_by, set_createdby] = useState('');
  const [offeredSalary, setOfferedSalary] = useState('');
  const [companyMobileNumber, setCompanyMobileNumber] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
 
  const [assetsData, setAssetsData] = useState('');

  const [openAssetsDialog, setOpenAssetsDialog] = useState(false);
  const [assets, setAssets] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);

  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };

    const handleChange = (event, newValue) => {
      //setLeadCategory(event.target.value);
      setLeadCategory(newValue);
      
    };

   
    
    const handleCancel = async () => {
      window.history.back();
    };
    const newhandleChange = (e) => {
        const { name, value } = e.target;
        setNewRow((prev) => ({ ...prev, [name]: value }));
      };
    
   

      
  
    useEffect(() => {
      const all_parameters = {
        "category_name1": null
    }
    const encryptedData = DataEncrypt(JSON.stringify(all_parameters));
      const reqData = {
        encReq: encryptedData
      };
      const getCategories = async () => {
        try {
          const response = await api.post("/api/employee/add-employee", reqData);
             
                if (response.status === 200) {
                  const decryptedObject = DataDecrypt(response.data);
                //   setCategories(decryptedObject.data);
                }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
  
      getCategories();
    }, []);
    

    const fetchAssets = async () => {
        try {
            const response = await api.post("/api/employee/get-assets");
            if (response.status === 200) {
                setAssets(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching assets:", error);
        }
    };

    const handleOpenAssetsDialog = () => {
        fetchAssets();
        setOpenAssetsDialog(true);
    };

    const handleCloseAssetsDialog = () => {
        setOpenAssetsDialog(false);
    };

    const handleToggleAsset = (assetId) => {
        setSelectedAssets((prevSelected) => {
            if (prevSelected.includes(assetId)) {
                return prevSelected.filter(id => id !== assetId); // Remove if already selected
            } else {
                return [...prevSelected, assetId]; // Add if not selected
            }
        });
    };

    const getSelectedAssetNames = () => {
        return assets
            .filter(asset => selectedAssets.includes(asset.id))
            .map(asset => asset.assetname)
            .join(", ");
    };

    const getSelectedAssetsDetails = () => {
        return assets.filter(asset => selectedAssets.includes(asset.id));
    };
       
      const handleSubmit = async () => {
        const formattedDob = dob ? dob.format('YYYY-MM-DD') : '';
        
        const formData = {
            first_name: firstName,
            district,
            state,
            address,
            dob: formattedDob,
            email,
            mobile,
            gender,
            role_id: roleId,
            education,
            created_by,
            Offered_salary: offeredSalary,
            Company_mobile_number: companyMobileNumber,
            Company_email: companyEmail,
            AssetsData: assetsData,
          };
         

        try {
          const response = await api.post('/api/employee/add-employee', formData,{

            headers:{'content-type': 'multipart/form-data'}
          
          
          });
        
          if (response) {
            window.history.back();
            alert('employee Saved  successfully');
          } else {
            console.error('Failed to save');
          }

        } catch (error) {
          console.error('Error uploading file:', error);
        }
        
      };

//   console.log(leadCategory);

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
                        <Typography variant="h5"  sx={{ padding: 2 }}>Add Employee</Typography>
                    </Box>


                    <Grid spacing={2}   sx={{ padding: 2 }} container>

                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
 Employee Name
</label>
<TextField
  required
  size="small"  // Makes the TextField smaller
  fullWidth
  variant="outlined"
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
  InputProps={{ style: { height: '32px' } }}  // Set a smaller height
/>
</Box>

<Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
 Employee Role
</label>
<TextField
  required
  size="small"  // Makes the TextField smaller
  fullWidth
  variant="outlined"
  value={roleId}
  onChange={(e) => setRoleId(e.target.value)}
  InputProps={{ style: { height: '32px' } }}  // Set a smaller height
/>
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
  value={state}
  onChange={(e) => setState(e.target.value)}
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
  value={district}
  onChange={(e) => setDistrict(e.target.value)}
  InputProps={{ style: { height: '32px' } }}  // Set a smaller height
/>
</Box>

<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
  Address
</label>
<TextField
        required
        label="Enter Detail Address" 
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />

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
      value={dob}
      onChange={(newValue) => setDob(dayjs(newValue))}
     
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
<Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      Personal Mobile Number
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />
</Box>

<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

      <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Gender
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />
    </Box>
    <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} // Set to one-third with padding
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
          Education
        </label>
        <TextField
          required
          size="small"
          fullWidth
          variant="outlined"
          value={education} // Use a single value for all
          onChange={(e) => setEducation(e.target.value)} // Update state
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
      updated by
        </label>
        <TextField
          required
          fullWidth
          variant="outlined"
          value={created_by} // Use a single value for all
          onChange={(e) => set_createdby(e.target.value)} // Update state
          InputProps={{ style: { height: '32px' } }} 
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
        value={offeredSalary}
        onChange={(e) => setOfferedSalary(e.target.value)}
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
  value={companyMobileNumber}
  onChange={(e) => setCompanyMobileNumber(e.target.value)}
  InputProps={{ style: { height: '32px' } }}  // Set a smaller height
/>
</Box>
<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
  email
      </label>
      <TextField
        required
        size="small"  // Makes the TextField smaller
        fullWidth
        variant="outlined"
        value={companyEmail}
        onChange={(e) => setCompanyEmail(e.target.value)}
        InputProps={{ style: { height: '32px' } }}  // Set a smaller height
      />
    </Box>

                    </Grid>

                    <Dialog open={openAssetsDialog} onClose={handleCloseAssetsDialog} maxWidth="md" fullWidth>
                <DialogTitle>Assets List</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Select</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Asset Name</TableCell>
                                <TableCell>Model Number</TableCell>
                                <TableCell>EMEI Code</TableCell>
                                <TableCell>Created On</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assets.map((asset) => (
                                <TableRow key={asset.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedAssets.includes(asset.id)}
                                            onChange={() => handleToggleAsset(asset.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{asset.id}</TableCell>
                                    <TableCell>{asset.assetname}</TableCell>
                                    <TableCell>{asset.modelno}</TableCell>
                                    <TableCell>{asset.emei}</TableCell>
                                    <TableCell>{new Date(asset.created_on).toLocaleString()}</TableCell>
                                    <TableCell>{asset.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
                    <Grid item>
                    <Box mt={2}>
                {/* <Typography variant="body1">
                    Selected Assets: {getSelectedAssetNames() || "None"}
                </Typography> */}

<Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Asset Name</TableCell>
                                            <TableCell>Model Number</TableCell>
                                            <TableCell>EMEI Code</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {getSelectedAssetsDetails().map((asset) => (
                                            <TableRow key={asset.id}>
                                                <TableCell>{asset.id}</TableCell>
                                                <TableCell>{asset.assetname}</TableCell>
                                                <TableCell>{asset.modelno}</TableCell>
                                                <TableCell>{asset.emei}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
            </Box>
                    <Button variant="contained" color="secondary" onClick={handleOpenAssetsDialog}>
                View Assets Data
            </Button>
                            <Box display="flex" justifyContent="flex-start" mr={2}  mt={1} ml={2} mb={1} >
                                <Button variant="contained" color="primary" style={{ marginRight: '8px' }} size="medium" onClick={handleSubmit}>
                                Submit
                                </Button>
                                <Button variant="outlined"  onClick={handleCancel} >Cancel</Button>
                            </Box>
                    </Grid>
       
                    
                 </TableContainer>
            </Grid>
            
        </Grid>
              
    </main>
    )
}
export default AddLeadCategoryTransactions;