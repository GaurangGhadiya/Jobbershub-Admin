"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import { Grid,Paper,TableContainer, FormControl, InputLabel, Select, MenuItem,Button,Link } from "@mui/material";
import { Typography,Divider,Box,TextField} from "@mui/material";
import { useRouter } from 'next/router';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { DataEncrypt, DataDecrypt } from '../../utils/encryption';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Cookies from "js-cookie";
import { styled } from '@mui/material/styles';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from '@mui/base/Unstable_NumberInput';
 
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

function TransactionHistory(props) {

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
  
  
    const [showServiceTrans, setShowServiceTrans] = useState({});
    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const uid = Cookies.get('uid');

    const [brochure_name, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [brochure_image, setBrochure_image] = useState(null);
    const [brochure_pdf, setBrochure_pdf] = useState(null);
    

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    const handleFileChangePdf = (event) => {
        const file = event.target.files[0];
        setSelectedPdf(file);
    };

    useEffect(() => {
       
        const all_parameters = {
            "brochure_id": id
        };
        // const encryptedData = DataEncrypt(JSON.stringify(all_parameters));

        const getTnx = async () => {
        //   const reqData = {
        //     encReq: encryptedData
        //   };
          try {
            const response1 = await api.post('/api/miscellaneous/get-brochure-by-id', all_parameters);
            if (response1.data.status === 200) {
                setTitle(response1.data.data.brochure_name);
                setBrochure_image(response1.data.data.image);
                setBrochure_pdf(response1.data.data.brochure_file);
            }
          } catch (error) {
            if (error?.response?.data?.error) {
              dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
            } else {
              dispatch(callAlert({ message: error.message, type: 'FAILED' }));
            }
          }
        };
    
        if (id) {
          getTnx();
        }
      }, [id, dispatch]);

  

    
    const handleSubmit = async () => {
      
            const formData ={
                'brochure_id':id,
                'brochure_name':brochure_name,
                'image':selectedFile ,
                'brochure_pdf':selectedPdf,
                'updated_by': uid           
            }

        try {
          
        
            const response = await api.post('/api/miscellaneous/update-brochure', formData,{
                headers:{'content-type': 'multipart/form-data'}
            });
        
            if (response.status==200) {
                window.history.back();
                alert('Updated successfully');
            } else{
                alert("Failed to update");
            }

        } catch (error) {
            console.error('Error updating :', error);
        }
        
        };

        const handleLinkClick = (img) => {
    
            window.open(img, '_blank', 'noopener,noreferrer');
            };
    return (

        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} >

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '40%', verticalAlign: 'top'}} >
                            <Typography variant="h5"  sx={{ padding: 2 }}>Brochure [Update] </Typography>
                        </Box>

                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            <TextField required  fullWidth label="Brochure Name" variant="outlined" display={'inline-block'}
                            value={brochure_name} onChange={(e) => setTitle(e.target.value)}  />
                        </Box>

                        <Box justifyContent="space-between" alignItems="center" mt={1} ml={2} mb={1} sx={{ width: '50%', verticalAlign: 'top' }}>
                            <Typography variant="h6"  sx={{ fontSize: '15px' , }}>Upload Pdf </Typography>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload Pdf
                            <VisuallyHiddenInput type="file" onChange={(event) => handleFileChangePdf(event)} />
                            </Button>
                            {selectedPdf && (
                            <Typography variant="body2" sx={{ marginTop: 1 }}>
                                {selectedPdf.name}
                            </Typography>
                            )}

                            {brochure_pdf !== '' ? (<Link href="#" onClick={() => handleLinkClick(brochure_pdf)} display="inline" ml={2}>
                                View PDF
                            </Link>
                            ) : (
                                ''
                            )}


                        </Box>

                        <Box justifyContent="space-between" alignItems="center" mt={1} ml={2} mb={1} sx={{ width: '50%', verticalAlign: 'top' }}>
                            <Typography variant="h6"  sx={{ fontSize: '15px' , }}>Upload Image </Typography>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload Image
                            <VisuallyHiddenInput type="file" onChange={(event) => handleFileChange(event)} />
                            </Button>
                            {selectedFile && (
                            <Typography variant="body2" sx={{ marginTop: 1 }}>
                                {selectedFile.name}
                            </Typography>
                            )}
                            {brochure_image !== '' ? (<Link href="#" onClick={() => handleLinkClick(brochure_image)} display="inline" ml={2}>
                                View Image
                            </Link>
                            ) : (
                                ''
                            )}
                        </Box>

                        <Grid item>
                            <Box display="flex" justifyContent="flex-first" mr={2}  mt={1} ml={2} mb={1} >
                            <Button variant="contained" color="success" size="medium" onClick={handleSubmit}>
                                Update
                            </Button>
                            </Box>   
                        </Grid>
                        <br /><br />
                    </TableContainer>
                </Grid>
            </Grid>
        </Layout>


    );
}
export default withAuth(TransactionHistory);

