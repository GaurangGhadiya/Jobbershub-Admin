import { Box, Button,Divider,TextField,InputLabel,Select,MenuItem, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Stepper, Step, StepLabel, Link, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack, ColorLensOutlined } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from '@mui/base/Unstable_NumberInput';
import { DataEncrypt, DataDecrypt } from '../../../utils/encryption';

import FormControl from '@mui/material/FormControl';
import Image from 'next/image';
import { useRouter } from 'next/router';

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

    const router = useRouter();
    const { action, lead_id, category_id } = router.query;
    const steps = ['Label', 'Details', 'Marketing', 'FAQ', 'Videos', 'Broucher', 'Course Videos', 'Study Material'];

    const [activeStep, setActiveStep] = useState(0);

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
  

    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [description, setDescription] = useState('');
    const [specification, setSpecification] = useState('');
    const [leadCategory, setLeadCategory] = useState('');
    const [choseCategory, setChoseCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [sequence, setSequense] = useState('');
    const [total_earning, settotal_earning] = useState('');
    const [distribution_amount, setdistribution_amount] = useState('');
    const [download_app_link, setdownload_app_link] = useState('');
    const [opnel_now_link, setopnel_now_link] = useState('');
    const [referral_link, setreferral_link] = useState('');
    const [video_link, setvideo_link] = useState('');
    const [buynow_link, setbuynow_link] = useState('');

    const [company_name, setCompany_name] = useState('');
    const [gst_no, setGst_no] = useState('');
    const [company_address, setCompany_address] = useState('');
    
    const [distribution_type, setdistribution_type] = useState('');
    const [reward_amount, setreward_amount] = useState('');
    const [reward_type, setreward_type] = useState('');


    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };

    const bannerFileChange = (event) => {
      const file = event.target.files[0];
      setBannerFile(file);
    };

   
    
    const handleCancel = async () => {
      window.history.back();
    };
    
    const handleChange = (event, newValue) => {
      setChoseCategory(newValue);
      setLeadCategory(newValue.id);
    };

    const disTypehandleChange = (event) => {
      setdistribution_type(event.target.value);
    };

    const rewardTypehandleChange = (event) => {
      setreward_type(event.target.value);
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
    
      const handleUpload = () => {
        // Implement image upload logic (e.g., send images and labels to the server)
        console.log('Uploading images with labels:', { images, imageLabels });
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
            const response = await api.post("/api/leads/get-category", reqData);
            if (response.status === 200) {
              const decryptedObject = DataDecrypt(response.data);
              setCategories(decryptedObject.data);
           
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };

        getCategories();
        //setChoseCategory({'id': 1, 'category_name':  'SBI'});
        if(action == 'update')
        {
          const reqAllData = {
            "category_id": category_id,
            "lead_header_id": lead_id
          };
          const allData = DataEncrypt(JSON.stringify(reqAllData));
          const reqencData = {
            encReq: allData
          };
          const getAlldata = async () => {
            try {
              const response = await api.post("/api/leads/get-leads-details-admin", reqencData);
              
              if (response.status === 200) {
                  const dataObject = response.data;
                  const main_data = dataObject.main_data;
                  const data = dataObject.data;

                  setTitle(main_data.lead_name);
                  setSelectedFile(main_data.img);
                  setBannerFile(main_data.banner_image);
                  setDescription(main_data.description);
                  setSpecification(main_data.specification);
                  setLeadCategory(main_data.category_id);
                  setChoseCategory({'id': main_data.category_id, 'category_name':  main_data.category_name});
                  setSequense(main_data.sequence);
                  settotal_earning(main_data.total_earning);
                  setdistribution_amount(main_data.distribution_amount);
                  setdownload_app_link(main_data.download_app_link);
                  setopnel_now_link(main_data.open_now_link);
                  setreferral_link(main_data.referral_link);
                  setvideo_link(main_data.video_link);
                  setbuynow_link(main_data.link);
                  setCompany_name(main_data.product_company_name);
                  setGst_no(main_data.gst_no);
                  setCompany_address(main_data.company_address);
                  setdistribution_type(main_data.distribution_type);
                  setreward_type(main_data.reward_type);
                  setreward_amount(main_data.reward_amount);

                  const updatedRows = [];
                  const updatedfaq = [];
                  const updatedimage = [];
                  const updateVideo = [];
                  const updateBroucher = [];
                  const updateCourseVideo = [];
                  const updateStudyMaterial = [];
                  for(const detail of data)
                  {
                    
                    if(detail.lead_detail_group == 'Details')
                    {
                      let i=0;
                      for(const ndetail of detail.leads)
                      {
                        i++;
                        updatedRows.push({'id': i, 'details_id': ndetail.lead_detail_id, 'name': ndetail.lead_value, 'description': ndetail.description.join('')});
                      }
                      
                    }

                    if(detail.lead_detail_group == 'Marketing')
                    {
                      let i=0;
                      for(const ndetail of detail.leads)
                      {
                        i++;

                        updatedimage.push({'id': i, 'details_id': ndetail.lead_detail_id, 'image': ndetail.image, 'imageLabels': ndetail.lead_value, 'old': 1});
                      }
                      
                    }

                    if(detail.lead_detail_group == 'faqs')
                    {
                      let i=0;
                      for(const ndetail of detail.leads)
                      {
                        i++;
                        updatedfaq.push({'id': i, 'details_id': ndetail.lead_detail_id, 'question': ndetail.question, 'answer': ndetail.description.join('')});
                      }
                      
                    }

                    if(detail.lead_detail_group == 'Video')
                    {
                      let i=0;
                      for(const ndetail of detail.leads)
                      {
                        i++;
                        updateVideo.push({ 'details_id': ndetail.lead_detail_id, 'label': ndetail.lead_value, 'link': ndetail.video, 'video_image': ndetail.image });
                      }
                      
                    }

                    if(detail.lead_detail_group == 'Broucher')
                    {
                      let i=0;
                      for(const ndetail of detail.leads)
                      {
                        i++;
                        updateBroucher.push({'details_id': ndetail.lead_detail_id, 'label': ndetail.lead_value, 'pdf': ndetail.pdf, 'image': ndetail.image });
                      }
                      
                    }

                    if(detail.lead_detail_group == 'Course Video')
                    {
                      let i=0;
                      for(const ndetail of detail.leads)
                      {
                        i++;
                        updateCourseVideo.push({'details_id': ndetail.lead_detail_id, 'label': ndetail.lead_value, 'link': ndetail.video, 'image': ndetail.image });
                      }
                      
                    }

                    if(detail.lead_detail_group == 'Study Material')
                    {
                      let i=0;
                      for(const ndetail of detail.leads)
                      {
                        i++;
                        updateStudyMaterial.push({'details_id': ndetail.lead_detail_id,'label': ndetail.lead_value, 'pdf': ndetail.pdf, 'image': ndetail.image });
                      }
                      
                    }

                    
                  }
                  setRows(updatedRows);
                  setfaqs(updatedfaq);
                  setVideos(updateVideo);
                  setImages(updatedimage);
                  setBroucher(updateBroucher);
                  setCourseVideo(updateCourseVideo);
                  setStudyMaterial(updateStudyMaterial);
                const decryptedObject = DataDecrypt(response.data);
                setCategories(decryptedObject.data);
             
              }
            } catch (error) {
              console.error("Error fetching Details:", error.message);
            }
          };

          getAlldata();
        }
        

    
        
      }, [action, lead_id, category_id]);
  
      //Details
      const [rows, setRows] = useState([]);
      const [editingRowIndex, setEditingRowIndex] = useState(null);
      const [newRow, setNewRow] = useState({ name: '', description: '' });
    
      const newhandleChange = (e) => {
        const { name, value } = e.target;
        setNewRow((prev) => ({ ...prev, [name]: value }));
      };
    
      const addNewRow = () => {
        const updatedRows = [...rows, { id: rows.length + 1, ...newRow }];
        setRows(updatedRows);
        setNewRow({ name: '', description: '' });
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
      const [editingFaqIndex, setEditingFaqIndex] = useState(null);
      const [newfaqsRow, setNewfaqsRow] = useState({ question: '', answer: '' });
    
      const newfaqhandleChange = (e) => {
        const { name, value } = e.target;
        setNewfaqsRow((prev) => ({ ...prev, [name]: value }));
      };
    
      const addNewfaqRow = () => {
        const updatedRows = [...faqs, { id: faqs.length + 1, ...newfaqsRow }];
        setfaqs(updatedRows);
        setNewfaqsRow({ question: '', answer: '' });
      };

      const handleEditFaq = (index) => {
        setEditingFaqIndex(index);
        setNewfaqsRow({ ...faqs[index] });
      };
    
      const handleUpdateFaq = () => {
        const updatedRows = [...faqs];
        updatedRows[editingFaqIndex] = { ...newfaqsRow };
        setfaqs(updatedRows);
        setEditingFaqIndex(null);
        setNewfaqsRow({ question: '', answer: '' });
      };
    
      const handleDeleteFaq = (index) => {
        const updatedRows = [...faqs];
        updatedRows.splice(index, 1);
        setfaqs(updatedRows);
      };


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
      const [courseVideo, setCourseVideo] = useState([]);
      const [newCourseVideo, setNewCourseVideo] = useState({ label: '', link: '', image:null });
      const [editingCourseIndex, setEditingCourseIndex] = useState(null);
      const [validationCourseError, setValidationCourseError] = useState('');

      const newCourseVideoHandleChange = (event) => {
        const { name, value } = event.target;
        setNewCourseVideo((prevVideo) => ({ ...prevVideo, [name]: value }));
      };

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

      const updateCourseVideoRow = () => {
        if (validateCourseFields()) {
          const updatedCourseVideos = [...courseVideo];
          updatedCourseVideos[editingCourseIndex] = newCourseVideo;
          setCourseVideo(updatedCourseVideos);
          setNewCourseVideo({ label: '', link: '', image:null});
          setEditingCourseIndex(null);
        }
      };

      const deleteCourseVideoRow = (index, item_id) => {
        if(item_id)
        {
          deteleData(item_id);
        }
        const updatedCourseVideos = [...courseVideo];
        updatedCourseVideos.splice(index, 1);
        setCourseVideo(updatedCourseVideos);
      };


      // Broucher
      const [broucher, setBroucher] = useState([]);
      const [newBroucher, setNewBroucher] = useState({ label: '', pdf: null, image:null });
      const [editingBroucherIndex, setEditingBroucherIndex] = useState(null);
      const [validationBroucherError, setValidationBroucherError] = useState('');

      const newBroucherHandleChange = (event) => {
        const { name, value } = event.target;
        setNewBroucher((prevbroucher) => ({ ...prevbroucher, [name]: value }));
      };

      const handleBroucherImageChange = (event) => {
        const imageFile = event.target.files[0];
        setNewBroucher((prevbroucher) => ({ ...prevbroucher, image: imageFile }));
      };

      const handleBroucherChange = (event) => {
        const file = event.target.files[0];
        setNewBroucher((prevbroucher) => ({ ...prevbroucher, pdf: file }));
      };
   

      const validateBroucherFields = () => {
        if (!newBroucher.label || !newBroucher.pdf ||  !newBroucher.image) {
          setValidationBroucherError('All fields are mandatory');
          return false;
        }
        setValidationBroucherError('');
        return true;
      };

      const addNewBroucher = () => {
        if (validateBroucherFields()) {
          setBroucher((prevFile) => [...prevFile, newBroucher]);
          setNewBroucher({ label: '', pdf: null, image:null });
        }
      };

      const editBroucher = (index) => {
        setNewBroucher(broucher[index]);
        setEditingBroucherIndex(index);
      };

      const updateBroucher = () => {
        if (validateBroucherFields()) {
          const updatedBroucher = [...broucher];
          updatedBroucher[editingBroucherIndex] = newBroucher;
          setBroucher(updatedBroucher);
          setNewBroucher({ label: '', pdf: null, image:null });
          setEditingBroucherIndex(null);
        }
      };

      const deleteBroucher = (index, item_id) => {
        if(item_id)
        {
          deteleData(item_id);
        }
        const updatedBroucher = [...broucher];
        updatedBroucher.splice(index, 1);
        setBroucher(updatedBroucher);
      };


      // const broucherFileChange = (event) => {
      //   const file = event.target.files[0];
      //   setBroucher(file);
      // };


      // Study Material
      const [studyMaterial, setStudyMaterial] = useState([]);
      const [newStudyMaterial, setNewStudyMaterial] = useState({ label: '', pdf: null, image:null });
      const [editingStudyMaterialIndex, setEditingStudyMaterialIndex] = useState(null);
      const [validationStudyMaterialError, setValidationStudyMaterialError] = useState('');

      const newStudyMaterialHandleChange = (event) => {
        const { name, value } = event.target;
        setNewStudyMaterial((prevpdfFile) => ({ ...prevpdfFile, [name]: value }));
      };

      const handlenewStudyMaterialImageChange = (event) => {
        const imageFile = event.target.files[0];
        setNewStudyMaterial((prevpdfFile) => ({ ...prevpdfFile, image: imageFile }));
      };

      const studyMaterialFileChange = (event) => {
        const file = event.target.files[0];
        setNewStudyMaterial((prevpdfFile) => ({ ...prevpdfFile, pdf: file }));
      };

      const validateStudyMaterialFields = () => {
        if (!newStudyMaterial.label || !newStudyMaterial.pdf || !newStudyMaterial.image) {
          setValidationStudyMaterialError('All fields are mandatory');
          return false;
        }
        setValidationStudyMaterialError('');
        return true;
      };

      const addNewStudyMaterial = () => {
        if (validateStudyMaterialFields()) {
          setStudyMaterial((prevMaterial) => [...prevMaterial, newStudyMaterial]);
          setNewStudyMaterial({ label: '', pdf: null, image:null });
        }
      };

      const editStudyMaterial = (index) => {
        setNewStudyMaterial({ label: '', pdf: null, image:null });
        setEditingStudyMaterialIndex(index);
      };

      const updateStudyMaterial = () => {
        if (validateStudyMaterialFields()) {
          const updatedStudyMaterial = [...studyMaterial];
          updatedStudyMaterial[editingCourseIndex] = newStudyMaterial;
          setStudyMaterial(updatedStudyMaterial);
          setNewStudyMaterial({ label: '', pdf: null, image:null});
          setEditingStudyMaterialIndex(null);
        }
      };

      const deleteStudyMaterial = (index, item_id) => {
        if(item_id)
        {
          deteleData(item_id);
        }
        const updatedStudyMaterial = [...studyMaterial];
        updatedStudyMaterial.splice(index, 1);
        setStudyMaterial(updatedStudyMaterial);
      };


      const handleLinkClick = (img) => {
      
        window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}${img}`, '_blank', 'noopener,noreferrer');
      };
      


      const handleSubmit = async () => {

        let videoImage = [];
        let video_data = [];
        let mrkImageLavel = [];
        let broucherFile = [];
        let broucher_data = [];
        let broucher_image = [];
        let studyMaterialFile = [];
        let study_material_data = [];
        let study_material_image = [];
        let course_video_data = [];
        let course_video_image = [];

        for(const item of videos)
        {
          if (!item.details_id) {
            videoImage.push(item.video_image);
            video_data.push(item);
          }
        }
        
        for(const item of images)
        {
          mrkImageLavel.push(item.imageLabels);
        }
        setImageLabels(mrkImageLavel);

        for(const item of broucher)
        {
          if (!item.details_id) {
            broucherFile.push(item.pdf);
            broucher_data.push(item);
            broucher_image.push(item.image);
          }
        }

        for(const item of studyMaterial)
        {
          if (!item.details_id) {
            studyMaterialFile.push(item.pdf);
            study_material_data.push(item);
            study_material_image.push(item.image);
          }
        }

        for(const item of courseVideo)
        {
          if (!item.details_id) {
            course_video_data.push(item);
            course_video_image.push(item.image);
          }
        }

        

        const formData ={
          'image': selectedFile,
          'banner_image': bannerFile,
          'lead_name':title.replace(/'/g, "\\'"),
          'description':description.replace(/'/g, "\\'"),
          'specification':specification,
          'category_id':leadCategory?leadCategory:1,
          'sequense':null,
          'total_earning': total_earning,
          'distribution_amount': distribution_amount,
          'download_app_link': download_app_link,
          'open_now_link': opnel_now_link,
          'referral_link': referral_link,
          'video_link': video_link,
          'link': buynow_link,
          'row_data': JSON.stringify({ tableData: rows }),
          'marketing_image': images,
          'bulk_image_level': imageLabels,
          'faq_data': JSON.stringify({ tableData: faqs }),
          'video_data': JSON.stringify(video_data),
          'video_image': videoImage,
          'product_company_name': company_name,
          'gst_no': gst_no,
          'company_address': company_address,
          'distribution_type': distribution_type,
          'reward_type': reward_type,
          'reward_amount': reward_amount,
          'broucher_data': JSON.stringify(broucher_data),
          'broucher': broucherFile,
          'bimage': broucher_image,
          'course_video_data': JSON.stringify(course_video_data),
          'cvimage': course_video_image,
          'study_material_data': JSON.stringify(study_material_data),
          'study_material': studyMaterialFile,
          'smimage': study_material_image
        }
       
      try {

      
        let response = [];

        if(action=='update'){
            formData.lead_id = lead_id;
            response = await api.post('/api/leads/update-leads', formData,{
              headers:{'content-type': 'multipart/form-data'}
            });
        }else{
            response = await api.post('/api/leads/add-leads', formData,{
              headers:{'content-type': 'multipart/form-data'}
            });
        }
        
      
        if (response) {
          window.history.back();
          alert('Leads Saved  successfully');
        } else {
          alert(response.data.error);
          console.error('Failed to save');
        }

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

    const deteleData = async (item_id) =>
    {
      if(item_id)
      {
        const formData ={
          'item_detail_id': item_id,
          'action': 'update'
        }
      try {

        let response = response = await api.post('/api/leads/update-leads-details', formData);
      
        if (response) {
          alert('Deleted successfully');
        } else {
          alert(response.data.error);
          console.error('Failed to delete');
        }

      } catch (error) {
        console.error('Error uploading file:', error);
      }

      }

    }

console.log(leadCategory);
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
                        <Typography variant="h5"  sx={{ padding: 2 }}>{action =='update' ? ( <>Update Primary products</>): (<>Add New Primary products</>)}</Typography>
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

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '49%', verticalAlign: 'top', padding: '0 10px'}} >

                        <TextField required size="normal"
                        fullWidth label="Product Name" 
                        variant="outlined" display={'inline-block'}
                        value={title} 
                        mr={3}
                        onChange={(e) => setTitle(e.target.value)}  />

                        </Box>

                        <Box justifyContent={'space-between'} alignItems={'right'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top'}} >

                        {/* <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="transaction-type-label"
                                    id="transaction-type"
                                    variant="outlined"
                                    value={leadCategory}
                                    label="Lead Type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Please Select</MenuItem>
                                    
                                        {categories.map((category) => (

                                            
                                    <MenuItem key={category.id} value={category.id}>
                                    {category.category_name}
                                    </MenuItem>
                                    ))}

                                </Select>
                        </FormControl> */}
                          {/* <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Autocomplete
                              id="category-autocomplete"
                              options={categories}
                              getOptionLabel={(category) => category ? category.category_name : ''}
                              value={leadCategory ? categories.find(category => category.category_id === leadCategory) || null : choseCategory}
                              onChange={(event, newValue) => {
                                handleChange(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                            />
                          </FormControl> */}
                          <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={categories}
                            getOptionLabel={(category) => category ? category.category_name : ''}
                            value={choseCategory}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                          />
                          
                        </FormControl>
                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '49%', verticalAlign: 'top', padding: '0 10px'}} >

                          <TextField required size="normal"
                            fullWidth label="Product Company Name" 
                            variant="outlined" display={'inline-block'}
                            value={company_name} 
                            mr={3}
                            onChange={(e) => setCompany_name(e.target.value)}  />

                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

                          <TextField required size="normal"
                            fullWidth label="GST no" 
                            variant="outlined" display={'inline-block'}
                            value={gst_no} 
                            mr={3}
                            onChange={(e) => setGst_no(e.target.value)}  />

                        </Box>

                        <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >

                        <TextareaAutosize  fullWidth
                                label="Company Address" 
                                minRows={3}
                                size="normal"
                                variant="outlined"
                                placeholder="Company Address" 
                                style={{height: '30px', width:'100%', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px', boxSizing:'border-box' }}
                                value={company_address}
                                onChange={(e) => setCompany_address(e.target.value)}
                        /> 
                        </Box>

                        <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={2} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 4px;', boxSizing:'border-box'}} >

                        <TextareaAutosize  fullWidth
                                label="Short Description" 
                                minRows={3}
                                size="normal"
                                variant="outlined"
                                placeholder="Short Description" 
                                style={{height: '30px', width:'100%', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px', boxSizing:'border-box' }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                        /> 
                        </Box>

                        <br/>        <br/>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top'}} >

                        <NumberInput  required size="normal"
                            fullWidth label="Amount" 
                            variant="outlined" display={'inline-block'}
                            value={specification} 
                            placeholder="Amount"
                            mr={3}
                            onChange={(event, val) => setSpecification(val)}
                            /> 
                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={2} style={{width: '49%', verticalAlign: 'top'}} >

                            <NumberInput required size="normal"
                            fullWidth label="TotalEarning" 
                            variant="outlined" display={'inline-block'}
                            value={total_earning} 
                            placeholder="Total Earning"
                            
                            onChange={(event, val) => settotal_earning(val)} />

                        </Box>

                        <Box justifyContent="space-between" display="inline" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '100%',      verticalAlign: 'top' }}>
                                <Typography variant="p"  sx={{ padding: 2 }} display="inline">Poster Image</Typography>
                                <Button component="label" variant="contained"  display="inline" startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={(event) => handleFileChange(event)}  />
                                </Button>
                                {selectedFile && (
                                <Typography variant="body2" sx={{ marginTop: 1 }} display="inline" >
                                    {selectedFile.name}
                                </Typography>
                                )}
                                {selectedFile !== null ? (<Link href="#" onClick={() => handleLinkClick(selectedFile)} display="inline" ml={2}>
                                  <img
                                                src={selectedFile}
                                                alt="Poster Image"
                                                width="300"
                                                height="200"
                                            />
                                        </Link>
                                        ) : (
                                            ''
                                        )}
                        </Box>

                        <Box justifyContent="space-between" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '100%', verticalAlign: 'top' }}>
                                <Typography variant="p"  sx={{ padding: 2 }} display="inline">Banner Image</Typography>
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} display="inline">
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={(event) => bannerFileChange(event)} />
                                </Button>
                                {bannerFile && (
                                <Typography variant="body2" sx={{ marginTop: 1 }} display="inline">
                                    {bannerFile.name}
                                </Typography>
                                )}

                                {bannerFile !== null ? (<Link href="#" onClick={() => handleLinkClick(bannerFile)} display="inline" ml={2}>
                                  <img
                                                src={bannerFile}
                                                alt="Banner Image"
                                                width="300"
                                                height="200"
                                            />
                                        </Link>
                                        ) : (
                                            ''
                                        )}
                        </Box>

                        <Box justifyContent="space-between" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '48%', verticalAlign: 'top' }}>
                          <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Distribution Type</InputLabel>
                                <Select
                                   required
                                    id="distribution-type"
                                    variant="outlined"
                                    value={distribution_type}
                                    label="Distribution Type"
                                    onChange={disTypehandleChange}
                                >
                                    <MenuItem value="">Please Select</MenuItem>
                                    <MenuItem  value="Flat Amount">Flat Amount</MenuItem>
                                    <MenuItem  value="Percentage">Percentage</MenuItem>
                                </Select>
                        </FormControl>
                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '48%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                                fullWidth label="Distribution" 
                                variant="outlined" display={'inline-block'}
                                value={distribution_amount} 
                                placeholder="Distribution"
                                type="number"
                                inputProps={{ step: 'any' }}
                                onChange={(event) => setdistribution_amount(event.target.value)}  />

                        </Box>

                        <Box justifyContent="space-between" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '48%', verticalAlign: 'top' }}>
                          <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Reward Type</InputLabel>
                                <Select
                                    id="reward-type"
                                    variant="outlined"
                                    value={reward_type}
                                    label="Reward Type"
                                    onChange={rewardTypehandleChange}
                                >
                                    <MenuItem value="">Please Select</MenuItem>
                                    <MenuItem  value="Flat Amount">Flat Amount</MenuItem>
                                    <MenuItem  value="Percentage">Percentage</MenuItem>
                                </Select>
                        </FormControl>
                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '48%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField size="normal"
                                fullWidth label="Reward" 
                                variant="outlined" display={'inline-block'}
                                value={reward_amount} 
                                placeholder="Reward"
                                type="number"
                                inputProps={{ step: 'any' }}
                                onChange={(event) => setreward_amount(event.target.value)}
                                />

                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '48%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                                fullWidth label="Download App Link" 
                                variant="outlined" display={'inline-block'}
                                value={download_app_link} 
                                placeholder="Download App Link"
                                onChange = {(e) => setdownload_app_link(e.target.value)} />

                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '48%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                                fullWidth label="Open Now Link" 
                                variant="outlined" display={'inline-block'}
                                value={opnel_now_link} 
                                placeholder="Open Now Link"
                                onChange = {(e) => setopnel_now_link(e.target.value)} />

                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '48%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                                fullWidth label="Video Link" 
                                variant="outlined" display={'inline-block'}
                                value={video_link} 
                                placeholder="Video Link"
                                onChange = {(e) => setvideo_link(e.target.value)} />

                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '48%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                                fullWidth label="Referral Link" 
                                variant="outlined" display={'inline-block'}
                                value={referral_link} 
                                placeholder="Referral Link"
                                onChange = {(e) => setreferral_link(e.target.value)} />

                        </Box>


                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '48%', verticalAlign: 'top', padding: '0 10px'}} >

                            <TextField required size="normal"
                                fullWidth label="Buy Now /Payment Link" 
                                variant="outlined" display={'inline-block'}
                                value={buynow_link} 
                                placeholder="Buy Now /Payment Link"
                                onChange = {(e) => setbuynow_link(e.target.value)} />

                        </Box>

                        </Grid>
                    )}


                    {activeStep === 1 && (
                      <Grid spacing={2} sx={{ padding: 3 }} container>
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>Details</Typography>
                        </Box>
                
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '100%', verticalAlign: 'top', padding: '0 10px'}} >
                            <div style={{ marginTop: '16px' }}>  
                            <TextField fullWidth
                            name="name"
                            label="Name"
                            variant="outlined"
                            onChange={newhandleChange}
                            />
                            </div>
                            <div style={{ marginTop: '16px' }}>
                            <TextareaAutosize
                                name="description"
                                rowsmin={3}
                                placeholder="description"
                                value={newRow.description}
                                style={{height: '90px', width:'99%', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                onChange={newhandleChange}
                            />
                            </div>

                            <Button variant="contained" onClick={addNewRow} style={{ marginTop: '8px' }}>Add Row</Button>
                            <br/>
                            <br/>
                            <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Sl No.</TableCell>
                                    <TableCell>Header</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="name" variant="outlined" value={newRow.name} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} /> : row.name}</TableCell>
                                    <TableCell>{index === editingRowIndex ? <TextField fullWidth name="description" variant="outlined" value={newRow.description} onChange={(e) => setNewRow({ ...newRow, description: e.target.value })} /> : row.description}</TableCell>
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
                          <Typography variant="h6"  sx={{ padding: 2 }}>Multiple Marketing Images</Typography>
                      </Box>
                      
                      <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '100%', verticalAlign: 'top', padding: '0 10px'}} >
                          <div>
                        <Typography variant="p"  sx={{ padding: 2 }}>Marketing Image</Typography>
                        <input
                          component="label"
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                        />
                        
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Sl No.</TableCell>
                                <TableCell>Level</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {images.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                  <TextField
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    value={item?.imageLabels?.[index] || imageLabels[index]}
                                    onChange={(e) => handleLabelChange(index, e.target.value)}
                                  />
                                   </TableCell>
                                  <TableCell>
                                    {item.old==1 ? (
                                      <Link href="#" onClick={() => handleLinkClick(item.image)} display="inline" ml={2}>
                                        <img src={item.image} alt="Marketing Image" width="300" height="200" />
                                      </Link>
                                    ) : (
                                      <Image src={URL.createObjectURL(item)} alt={`Image ${index}`} width={300} height={200} />
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Button variant="contained" size="small" color="error" onClick={() => handleRemoveImage(index, item.details_id ? item.details_id : null)}>Remove</Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                         
                      </div> 
                          </Box>
                      </Grid>
                    )}


                    {activeStep === 3 && (
                      <Grid spacing={2}   sx={{ padding: 3 }} container>
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>FAQ</Typography>
                        </Box>
                
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '100%', verticalAlign: 'top', padding: '0 10px'}} >
                            <div style={{ marginTop: '16px' }}>  
                            <TextField fullWidth
                            name="question"
                            label="Question"
                            variant="outlined"
                            onChange={newfaqhandleChange}
                            />
                            </div>
                            <div style={{ marginTop: '16px' }}>
                            <TextareaAutosize
                                name="answer"
                                rowsmin={3}
                                placeholder="Answer"
                                style={{height: '90px', width:'99%', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                onChange={newfaqhandleChange}
                            />
                            </div>
                
                            <Button variant="contained" onClick={addNewfaqRow} style={{ marginTop: '8px' }}>Add Row</Button>
                            <br/>
                            <br/>
                            <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Sl No.</TableCell>
                                    <TableCell>Question</TableCell>
                                    <TableCell>Answer</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {faqs.map((row, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{row.id}</TableCell>
                                      <TableCell>{index === editingFaqIndex ? <TextField fullWidth name="question" variant="outlined" value={newfaqsRow.question} onChange={(e) => setNewfaqsRow({ ...newfaqsRow, question: e.target.value })} /> : row.question}</TableCell>
                                      <TableCell>{index === editingFaqIndex ? <TextField fullWidth name="answer" variant="outlined" value={newfaqsRow.answer} onChange={(e) => setNewfaqsRow({ ...newfaqsRow, answer: e.target.value })} /> : row.answer}</TableCell>
                                      <TableCell>
                                          {index === editingFaqIndex ? (
                                            <>
                                              <Button variant="contained" onClick={handleUpdateFaq} color="warning" style={{ marginRight: '8px' }}>Update</Button>
                                              <Button variant="contained" onClick={setEditingFaqIndex} color="error" style={{ marginRight: '8px' }}>Cancel</Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button variant="contained" onClick={() => handleEditFaq(index)} color="warning" style={{ marginRight: '8px' }}>Edit</Button>
                                              <Button variant="contained" onClick={() => handleDeleteFaq(index)} color="error" style={{ marginRight: '8px' }}>Delete</Button>
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


                    {activeStep === 4 && (
                      <Grid spacing={2}   sx={{ padding: 3 }} container>
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>Videos Links</Typography>
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

                    {activeStep === 5 && (
                      <Grid spacing={2} sx={{ padding: 3 }} container>
                      <Box
                        display={'inline-block'}
                        justifyContent={'space-between'}
                        alignItems={'right'}
                        mt={1}
                        mb={1}
                        style={{ width: '100%', verticalAlign: 'top' }}
                      >
                        <Typography variant="h6" sx={{ padding: 2 }}>
                          Brouchers
                        </Typography>
                      </Box>
                
                      <Box
                        display={'inline-block'}
                        justifyContent={'space-between'}
                        alignItems={'right'}
                        mt={3}
                        mb={1}
                        style={{ width: '100%', verticalAlign: 'top', padding: '0 10px' }}
                      >
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Label</TableCell>
                                <TableCell>File</TableCell>
                                <TableCell>Thumbnail</TableCell>
                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell style={{ width: '30%' }}>
                                  <TextField
                                    fullWidth
                                    name="label"
                                    label="Label"
                                    variant="outlined"
                                    onChange={newBroucherHandleChange}
                                    value={newBroucher.label}
                                  />
                                </TableCell>
                                <TableCell style={{ width: '20%' }}>
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                  Upload Broucher
                                  <input type="file" onChange={handleBroucherChange} style={{ display: 'none' }} />
                                </Button>
                                {newBroucher.pdf && (
                                  <Typography variant="body2" sx={{ marginTop: 1, marginLeft:1 }} display="inline">
                                    {newBroucher.pdf.name}
                                  </Typography>
                                )}
                                </TableCell>
                                <TableCell style={{ width: '20%' }}>
                                  <Button component="label" size="small" variant="contained" startIcon={<CloudUploadIcon />}>
                                    Upload Thumbnail
                                    <input type="file" accept="image/*" onChange={handleBroucherImageChange} style={{ display: 'none' }} />
                                  </Button>
                                  {newBroucher.image && (
                                    <Typography variant="body2" sx={{ marginTop: 1, marginLeft:1 }} display="inline">
                                      {newBroucher.image.name}
                                    </Typography>
                                  )}
                                </TableCell>
                                <TableCell style={{ width: '20%' }}>
                                  
                                  {editingBroucherIndex !== null ? (
                                    <Button
                                      variant="contained"
                                      size="small"
                                      onClick={updateBroucher}
                                      style={{ marginTop: '8px' }}
                                    >
                                      Update
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      size="small"
                                      onClick={addNewBroucher}
                                      style={{ marginTop: '8px' }}
                                    >
                                      Add Broucher
                                    </Button>
                                  )}
                                  {validationBroucherError && (<div style={{ color: 'red', marginTop: '8px' }}>{validationBroucherError}</div>)}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                
                            <TableBody>
                              {broucher.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.label}</TableCell>
                                  <TableCell>
                                    {(item.pdf instanceof File) ? (
                                        <Link href={URL.createObjectURL(item.pdf)} target="_blank" display="inline" ml={2}>{item.pdf.name}</Link>
                                    ):(
                                      <Link href="#" onClick={() => handleLinkClick(item.pdf)} display="inline" ml={2}>{item.label}</Link>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                      {(item.image instanceof File) ? (
                                          <Image src={URL.createObjectURL(item.image)} alt={`Image ${index}`} width={200} height={50} />
                                      ):(
                                        <Link href="#" onClick={() => handleLinkClick(item.image)} display="inline" ml={2}>View Thumbnail</Link>
                                      )}
                                    </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      onClick={() => deleteBroucher(index, item.details_id ? item.details_id : null)}
                                      style={{ marginTop: '8px' }}
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Grid>
                    )}

                    {activeStep === 6 && (
                        <Grid spacing={2}   sx={{ padding: 3 }} container> 
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>Course Videos</Typography>
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
                                      <TableCell style={{ width: '25%' }}><TextField fullWidth
                                            name="label"
                                            label="Label"
                                            variant="outlined"
                                            onChange={newCourseVideoHandleChange}
                                          /></TableCell>
                                      <TableCell style={{ width: '20%' }}><TextField fullWidth
                                            name="link"
                                            label="Link"
                                            variant="outlined"
                                            onChange={newCourseVideoHandleChange}
                                        /></TableCell>
                                        <TableCell style={{ width: '30%' }}>
                                          <Button component="label" size="small" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Upload Thumbnail
                                            <input type="file" accept="image/*" onChange={handlenewCourseVideoImageChange} style={{ display: 'none' }} />
                                          </Button>
                                          {newCourseVideo.image && (
                                            <Typography variant="body2" sx={{ marginTop: 1, marginLeft:1 }} display="inline">
                                              {newCourseVideo.image.name}
                                            </Typography>
                                          )}
                                        </TableCell>
                                      <TableCell style={{ width: '15%' }}>
                                        
                                        {editingCourseIndex !== null ? (
                                          <Button variant="contained" size="small" onClick={updateCourseVideoRow} style={{ marginTop: '8px' }}>
                                            Update
                                          </Button>
                                        ) : (
                                          <Button variant="contained" size="small" onClick={addNewCourseVideoRow} style={{ marginTop: '8px' }}>
                                            Add Link
                                          </Button>
                                        )}
                                        {validationCourseError && <div style={{ color: 'red', marginTop: '8px' }}>{validationCourseError}</div>}
                                        </TableCell>
                                  </TableRow>
                                </TableBody>
                                
                                
                                <TableBody>
                                {courseVideo.map((video, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{video.label}</TableCell>
                                    <TableCell>{video.link}</TableCell>
                                    <TableCell>
                                      {(video.image instanceof File) ? (
                                          <Image src={URL.createObjectURL(video.image)} alt={`Image ${index}`} width={200} height={50} />
                                      ):(
                                        <Link href="#" onClick={() => handleLinkClick(video.image)} display="inline" ml={2}>View Thumbnail</Link>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {/* <Button variant="contained" color="warning" size="small" onClick={() => editVideoRow(index)} style={{ marginTop: '8px', marginRight: '2px' }} >Edit</Button> */}
                                      <Button variant="contained" color="error" size="small" onClick={() => deleteCourseVideoRow(index, video.details_id ? video.details_id : null)} style={{ marginTop: '8px' }} >Delete</Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                
                            
                        </Box>
                    </Grid>
                    )}


                    {activeStep === 7 && (
                      <Grid spacing={2}   sx={{ padding: 3 }} container>
                      <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                          <Typography variant="h6"  sx={{ padding: 2 }}>Study Material</Typography>
                      </Box>
              
                      <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '100%', verticalAlign: 'top', padding: '0 10px'}} >
                        <TableContainer component={Paper}>
                          <Table>
                              <TableHead>
                              <TableRow>
                                  <TableCell>Label</TableCell>
                                  <TableCell>File</TableCell>
                                  <TableCell>Thumbnail</TableCell>
                                  <TableCell>Action</TableCell>
                              </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                    <TableCell style={{ width: '30%' }}><TextField fullWidth
                                          name="label"
                                          label="Label"
                                          variant="outlined"
                                          onChange={newStudyMaterialHandleChange}
                                        /></TableCell>
                                    <TableCell style={{ width: '15%' }}>
                                        <Button component="label" size="small" variant="contained" startIcon={<CloudUploadIcon />} display="inline">
                                          Upload File
                                          <VisuallyHiddenInput type="file" onChange={(event) => studyMaterialFileChange(event)} />
                                        </Button>
                                        {newStudyMaterial.pdf && (
                                        <Typography variant="body2" sx={{ marginTop: 1, marginLeft: 1 }} display="inline">
                                            {newStudyMaterial.pdf.name}
                                        </Typography>
                                        )}

                                        
                                    </TableCell>
                                    <TableCell style={{ width: '30%' }}>
                                          <Button component="label" size="small" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Upload Thumbnail
                                            <input type="file" accept="image/*" onChange={handlenewStudyMaterialImageChange} style={{ display: 'none' }} />
                                          </Button>
                                          {newStudyMaterial.image && (
                                            <Typography variant="body2" sx={{ marginTop: 1, marginLeft:1 }} display="inline">
                                              {newStudyMaterial.image.name}
                                            </Typography>
                                          )}
                                        </TableCell>
                                    <TableCell style={{ width: '15%' }}>
                                      
                                      {editingStudyMaterialIndex !== null ? (
                                        <Button variant="contained" size="small" onClick={updateStudyMaterial} style={{ marginTop: '8px' }}>
                                          Update
                                        </Button>
                                      ) : (
                                        <Button variant="contained" size="small" onClick={addNewStudyMaterial} style={{ marginTop: '8px' }}>
                                          Add Study Material
                                        </Button>
                                      )}
                                      {validationStudyMaterialError && <div style={{ color: 'red', marginTop: '8px' }}>{validationStudyMaterialError}</div>}
                                      </TableCell>
                                      
                                      
                                </TableRow>
                              </TableBody>

                              <TableBody>
                              {studyMaterial.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.label}</TableCell>
                                  <TableCell>
                                    {(item.pdf instanceof File) ? (
                                        <Link href={URL.createObjectURL(item.pdf)} target="_blank" display="inline" ml={2}>{item.pdf.name}</Link>
                                    ):(
                                      <Link href="#" onClick={() => handleLinkClick(item.pdf)} display="inline" ml={2}>{item.label}</Link>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                      {(item.image instanceof File) ? (
                                          <Image src={URL.createObjectURL(item.image)} alt={`Image ${index}`} width={200} height={50} />
                                      ):(
                                        <Link href="#" onClick={() => handleLinkClick(item.image)} display="inline" ml={2}>View Thumbnail</Link>
                                      )}
                                    </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      onClick={() => deleteStudyMaterial(index, item.details_id ? item.details_id : null)}
                                      style={{ marginTop: '8px' }}
                                    >
                                      Delete
                                    </Button>
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
                          {activeStep < 7 ? (
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
export default AddLeadCategoryTransactions;