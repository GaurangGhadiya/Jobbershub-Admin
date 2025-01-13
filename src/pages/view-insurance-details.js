"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import { Grid,Paper,TableContainer, FormControl, InputLabel, Select, MenuItem,Button, Table, TableBody, TableCell, TableRow,Link } from "@mui/material";
import { Typography,Divider,Box,TextField} from "@mui/material";
import { useRouter } from 'next/router';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { DataEncrypt, DataDecrypt } from '../../utils/encryption';

function TransactionHistory(props) {
  
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState([]);
    const [lead_name, setlead_name] = useState('');
    const [category_name, setcategory_name] = useState('');
    const [ins_no, setins_no] = useState('');
    const [ins_type, setins_type] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [mlm_id, setmlm_id] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setemail] = useState('');
    const [entry_date, setentry_date] = useState('');
  
    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }

    useEffect(() => {
       
        const all_parameters = {
            "insurance_id": id
        }
        const encryptedData = DataEncrypt(JSON.stringify(all_parameters));

        const getTnx = async () => {
        //   const reqData = {
        //     encReq: encryptedData
        //   };
          try {
            const response = await api.post('/api/report/get-insurance-data', all_parameters);
            if (response.status === 200) {
                //const decryptedObject = DataDecrypt(response.data);
                setlead_name(response.data.data.lead_name);
                setcategory_name(response.data.data.category_name);
                setins_no(response.data.data.ins_no);
                setins_type(response.data.data.ins_type);
                setfirst_name(response.data.data.first_name);
                setlast_name(response.data.data.last_name);
                setmlm_id(response.data.data.mlm_id);
                setmobile(response.data.data.mobile);
                setemail(response.data.data.email);
                setentry_date(response.data.data.entry_date);
                setFormData(response.data.formdata);
           
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
          
      const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };


      const dataMap = {};

    formData.forEach(obj => {
        const filename = obj['filename'];
        const image = obj['image'];

        // If filename exists and image exists, add to dataMap
        if (filename && image) {
            dataMap[filename] = image;
        }
    });

    const handleDownload = async (image) => {
        try {
          const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${image}`;
      
          const response = await fetch(imageUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/octet-stream',
            },
          });
      
          if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
          }
      
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          
         
          const link = document.createElement('a');
          link.href = url;
          link.download = image; 
          document.body.appendChild(link);
          link.click();
      
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
      
        } catch (error) {
          console.error('Error downloading the file:', error);
        }
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
            
                </TableContainer>
            </Grid>
            
            
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} >
                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                        <Typography variant="h5"  sx={{ padding: 2 }}>Lead Details</Typography>
                    </Box>

                    <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top', padding: '0 10px'}} >
                        <Typography variant="h6"  sx={{ padding: 2 }} style={{textAlign: 'center', width: '100%', display: 'inline-block'}}>{lead_name}</Typography>
                        <Table aria-label="Users" sx={{ size: 2 }} mt={2} >
                            <TableBody>
                                <TableRow>
                                    <TableCell>Lead No.</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{ins_no}</TableCell>

                                    <TableCell>Lead Date</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry_date}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Lead Type</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{ins_type}</TableCell>

                                    <TableCell>Category</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{category_name}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{first_name + ' ' + last_name + '('+ mlm_id +')'}</TableCell>

                                    <TableCell>Contact Details</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{mobile + '/' + email}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table aria-label="User Details" sx={{ size: 2 }} mt={2}>
                            <TableBody>
                            {formData.map((obj, index) => (
                                <div key={index}>
                                    {Object.entries(obj).map(([key, value]) => (
                                        key != 'image' && key != 'filename' && ( 
                                            <>
                                        <TableRow key={key}>
                                            <TableCell style={{width:'30%'}}>
                                                {capitalizeFirstLetter(key.replace(/_/g, ' '))}
                                            </TableCell>
                                            <TableCell style={{width:'5%'}}>:</TableCell>
                                            <TableCell style={{width:'65%'}}>
                                                {Array.isArray(value) ? (
                                                    <ul>
                                                        {value.map((item, itemIndex) => (
                                                            <li key={itemIndex}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    capitalizeFirstLetter(value)
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        </>
                                        )
                                    ))}
                                    
                                </div>
                            ))}
                            {Object.entries(dataMap).map(([filename, image], index) => (
                                        <div key={index}>
                                            <TableRow>
                                                <TableCell style={{width:'30%', wordBreak: 'break-all'}}>{capitalizeFirstLetter(filename.replace(/([a-z])([A-Z])/g, '$1 $2'))}</TableCell>
                                                <TableCell style={{width:'5%'}}>:</TableCell>
                                                <TableCell style={{width:'65%'}}>
                                                    <Link href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${image}`}>
                                                        <a>
                                                            <Button variant="contained" size="small" color="success" style={{ fontWeight: 'bold' }}>View</Button>
                                                        </a>
                                                    </Link>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="primary"
                                                        style={{ fontWeight: 'bold', marginLeft: '10px' }}
                                                        onClick={() => handleDownload(image)}
                                                    >
                                                        Download
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </div>
                                    ))}
                            </TableBody>
                        </Table>
                    </Box>

                        <br /><br /><br /><br /><br />
                    </TableContainer>
                </Grid>
            </Grid>
        </Layout>


    );
}
export default withAuth(TransactionHistory);

