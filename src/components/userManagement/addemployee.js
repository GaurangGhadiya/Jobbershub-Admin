import { Box, Button,Divider,TextField,InputLabel, List, ListItem, ListItemText, FormControlLabel,DialogActions , InputAdornment,Select,MenuItem,Checkbox , Dialog, DialogContent, DialogTitle, Container, Grid, Paper, Table,TableSortLabel,  IconButton, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Stepper, Step, StepLabel, Link, Autocomplete } from "@mui/material";
import { useEffect, useState, useCallback  } from "react";
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
import qualification from "@/pages/qualification";
import { Null } from "mdi-material-ui";
import { mt } from "date-fns/locale";

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


const AddEmployee = () => {

    const router = useRouter();
    const { action, employee_id } = router.query;
    const uid = Cookies.get('uid');
    const steps = ['Employee', 'Employee document', 'Employee Details'];

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
    const handleOkAsset = () => {
      handleCloseAssetsDialog();
    };

    const handleCancelAsset = () => {
     
      handleCloseAssetsDialog();
    };

    const handleOkFacility = () => {
    
      handleCloseFacilitiesDialog();
    };
  
   
    const handleCancelFacility = () => {
     
      handleCloseFacilitiesDialog();
    };
    const handleOpenAssetsDialog = () => {
      
      setOpenAssetsDialog(true);
  };

  const handleOpenFacilitiesDialog = () => {
      
    setOpenFacilitiesDialog(true);
};

  const handleCloseAssetsDialog = () => {
      setOpenAssetsDialog(false);
  };
  const handleCloseFacilitiesDialog = () => {
    setOpenFacilitiesDialog(false);
};

  const handleToggleAsset = (assetId) => {
      setSelectedAssets((prevSelected) => {
          if (prevSelected.includes(assetId)) {
              return prevSelected.filter(id => id !== assetId);
          } else {
              return [...prevSelected, assetId]; 
          }
      });
  };

  const handleToggleFacility = (facilityID) => {
    setSelectedFacilities((prevSelected) => {
        if (prevSelected.includes(facilityID)) {
            return prevSelected.filter(id => id !== facilityID); 
        } else {
            return [...prevSelected, facilityID];
        }
    });
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
    const [roleid, setRoleId] = useState('');
    const [offered_salary, setOffered_salary] = useState('');

    const [addBloodGroup, setAddBloodGroup] = useState('');
    const [addPDistrict, setAddPDistrict] = useState('');
    const [addTState, setAddTState] = useState('');
    const [addTDistrict, setAddTDistrict] = useState('');
    const [addADistrict, setAddADistrict] = useState('');
    const [addPState, setAddPState] = useState('');
    const [addAState, setAddAState] = useState('');
    const [temporary_address, setTemporary_address] = useState('');
    const [permanant_address, setPermanant_address] = useState('');
    const [AddQualification, setAddQualification] = useState('');
    const [AddQualificationValue, setAddQualificationValue] = useState('');
    const [emmergency_contact, setEmmergency_contact] = useState('');
    const [gender, setGender] = useState('');
    const [pmobile, setPmobile] = useState('');
    const [cmobile, setCmobile] = useState([]);
    const [pemail, setPemail] = useState('');
    const [cemail, setCemail] = useState('');
    const currentDate = new Date();
    const [joining_date, setJoining_date] = React.useState(dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())));
    const [birth_date, setBirth_date] = React.useState(dayjs(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())));
    const [lastjob_companyname, setLastjob_companyname] = useState('');
    const [ssc_marks, setSsc_marks] = useState('');
    const [hsc_marks, setHsc_marks] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [addDepartment, setAddDepartment] = useState('');
    const [addReporting_To, setAddReporting_To] = useState('');
    const [AddDesignation, setAddDesignation] = useState('');
    const [KRA, setKRA] = useState('');
    const [KPA, setKPA] = useState('');
    const [SOAP, SetSOAP] = useState('');
    const [AddAssets, setAddAssets] = useState([]);
    const [Addfacilities, setAddFacilities] = useState([]);
    const [education, setEducation] = useState('');
    const [videoLink, setVideoLink] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [allData, setAllData] = useState([]);
    const [kpiList, setKpiList] = useState([]);



    const [role, setRole] = useState([]);
    const [employee_code, setEmployee_code] = useState('');
   
    
    const [blood_group, setBlood_group] = useState('');
   
    const [tstate, setTstate] = useState([]);
    const [tdistrict, setTdistrict] = useState([]);
  
    const [pstate, setPstate] = useState([]);
    const [pdistrict, setPdistrict] = useState([]);
    const [buynow_link, setbuynow_link] = useState('');

    const [final_qualification, setFinal_qualification] = useState([]);
    
    const [department, setDepartment] = useState([]);
    const [reporting_to, setReporting_to] = useState([]);
    const [level_in_company, setLevel_in_company] = useState([]);
    
    const [allocated_states, setAllocated_states] = useState([]);
    const [allocated_district, setAllocated_district] = useState([]);
    
    const [categories, setCategories] = useState([]);
    const [table1Rows, setTable1Rows] = useState([]);

    const [bannerFile, setBannerFile] = useState(null);

    const [imageSrc, setImageSrc] = useState(null); 
    const [imageSrc1, setImageSrc1] = useState(null);
    const [imageSrc2, setImageSrc2] = useState(null);
    const [imageSrc3, setImageSrc3] = useState(null);
    const [imageSrc4, setImageSrc4] = useState(null);
    const [imageSrc5, setImageSrc5] = useState(null);
    const [imageSrc6, setImageSrc6] = useState(null);
    const [imageSrc7, setImageSrc7] = useState(null);
    const [profile, setProfile] = useState(null);

    const [imageFile_Resume, setImageFile_Resume] = useState(null);
    const [imageFile_Adhar, setImageFile_Adhar] = useState(null);
    const [imageFile_Pan, setImageFile_Pan] = useState(null);
    const [imageFile_Voting, setImageFile_Voting] = useState(null);
    const [imageFile_Driving, setImageFile_Driving] = useState(null);
    
    const [imageFile_ssc, setImageFile_ssc] = useState(null);
    const [imageFile_graduation, setImageFile_graduation] = useState(null);
    const [imageFile_living, setImageFile_living] = useState(null);
    const [imageFile_profile, setImageFile_profile] = useState(null);

    
    const [fileName_resume, setFileName_resume] = useState(null);
    const [fileName_adhar, setFileName_adhar] = useState(null);

    const [fileName_pan, setFileName_pan] = useState(null);
    const [fileName_living, setFileName_living] = useState(null);
    const [fileName_driving, setFileName_driving] = useState(null);
    const [fileName_ssc, setFileName_ssc] = useState(null);
    const [fileName_voting, setFileName_voting] = useState(null);
    const [fileName_graduation, setFileName_graduation] = useState(null);
    const [fileName_profile, setFileName_profile] = useState(null);
   

    const [open, setOpen] = useState(false);
    const [fromDate, setFromDate] = useState(''); 
  
    const [openAssetsDialog, setOpenAssetsDialog] = useState(false);
    const [assets, setAssets] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState([]);

    const [openFacilitiesDialog, setOpenFacilitiesDialog] = useState(false);
    const [Facilities, setFacilities] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);

  
    const [imageSrcURL, setimageSrcURL] = useState(null);
  
    const [ChoseRole, setChoseRole] = useState('');

    const [ChoseTstate, setChoseTstate] = useState('');
    const [ChosePstate, setChosePstate] = useState('');
    const [ChoseAstate, setChoseAstate] = useState('');

    const [choseQualification, setChoseQualification] = useState('');

    const [choseDepartment, setChoseDepartment] = useState('');
    const [choseDesignation, setChoseDesignation] = useState('');
    const [choseReportingTo, setChoseReportingTo] = useState('');

    const [choseTDistrict, setchoseTDistrict] = useState('');
    const [chosePDistrict, setchosePdistrict] = useState('');
    const [choseAdistrict, setChoseADistrict] = useState('');
    
    const [choseCategory, setChoseCategory] = useState('');
    const [employeeMaster, setEmployeeMaster] = useState([]);
    
    const [category, setcategory] = useState('');

    const [error, setError] = useState(''); 
    const [C_error, setC_Error] = useState(''); 
    const [pmobileError, setPmobileError] = useState('');
    const [companyMobileError, setCompanyMobileError] = useState('');
    const [EmmergencyContactError, setEmmergencyContactError] = useState('');
    const [sscMarksError, setSscMarksError] = useState('');
    const [hscMarksError, setHscMarksError] = useState('');
    const [nameError, setNameError] = useState('');
    const [salaryError, setSalaryError] = useState('');
    const [assetsDataList, setAssetsDataList] = useState([]);
    const [facilitiesDataList, setFacilitiesDataList] = useState([]);
 
    const currentYear = new Date().getFullYear();
    const [kpi_year, setkpi_year] = useState(currentYear);
    const [kpi_month, setkpi_month] = useState("");
    const [kpi_percentage, setkpi_percentage] = useState('');
    const [kpi_salary_hike, setkpi_salary_hike] = useState('');
    const [kpi_uploadedfile, setkpi_uploadedfile] = useState(null);

    const [openKpiDialog, setopenKpiDialog] = useState(false);
    const handleOpenKpiDialog = () => {
      
      setopenKpiDialog(true);
    };

    const handleCloseKpiDialog = () => {
      setopenKpiDialog(false);
    };

    const monthhandleChange = (event) => {
      setkpi_month(event.target.value);
    };

    const kpihandleFileChange = (event) => {
      const file = event.target.files[0];
      setkpi_uploadedfile(file);
    };

    
    const handleCancelKpi = ()=>{
      setopenKpiDialog(false);
      setkpi_month("");
      setkpi_percentage("");
      setkpi_salary_hike("");
      setkpi_uploadedfile(null);
    }
    
    const handleOkKpi = async() =>{
      if(kpi_year=='' || kpi_month=='' || kpi_percentage=='' || kpi_salary_hike=='' || kpi_uploadedfile=='')
      {
        alert("Mandatory field cannot be blank");
        return false;
        
      }
      const reqData = {
        'employee_id': employee_id,
        'year': kpi_year,
        'month': kpi_month,
        'percentage': kpi_percentage,
        'salaryhike': kpi_salary_hike,
        'kpi_file': kpi_uploadedfile,
        'created_by': uid
      }
      
      try {
        const response = await api.post("/api/employee/kpi-update", reqData);
        if (response.status === 200) {
          setopenKpiDialog(false);
          setKpiList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      
    }

    const getSelectedAssetsDetails = useCallback(() => {
      return assets.filter(asset => selectedAssets.includes(asset.id));
    }, [assets, selectedAssets]);
  
    const getSelectedFacilitiesDetails = useCallback(() => {
      return Facilities.filter(facility => selectedFacilities.includes(facility.id));
    }, [Facilities, selectedFacilities]);


    useEffect(() => {
      const selectedAssets = getSelectedAssetsDetails();
      if (selectedAssets) {
        setAssetsDataList(selectedAssets);
      }
    
      const selectedFacilities = getSelectedFacilitiesDetails();
      if (selectedFacilities) {
        setFacilitiesDataList(selectedFacilities);
      }
    }, [getSelectedAssetsDetails, getSelectedFacilitiesDetails]);

  useEffect(() => {
    
    const getEmployeeMaster = async () => {
      try {
        const response = await api.post("/api/employee/get-emp-master");
        if (response.status === 200) {
          //const decryptedObject = DataDecrypt(response.data);
         // setEmployeeMaster(response.data.roleMaster);
          setRole(response.data.data.roleMaster);
          setTstate(response.data.data.stateMaster);
          setPstate(response.data.data.stateMaster);
          setAllocated_states(response.data.data.stateMaster);
          setFinal_qualification(response.data.data.qualificationMaster);
      
          setDepartment(response.data.data.departmentMaster);
      
          setLevel_in_company(response.data.data.designationMaster);
          setReporting_to(response.data.data.reportingTo);
          setAssets(response.data.data.assetMaster);
          setFacilities(response.data.data.facilitiesMaster);
       
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    async function urlToFile(url) {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.split('/').pop();
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    }
    

    const getEmployee = async () => {
      try {
        const reqData = {
          employee_id: employee_id
        }
        const response = await api.post("/api/employee/get-employee", reqData);
        if (response.status === 200) {
          const decryptedObject = response.data.data;
          console.log(decryptedObject.role_id);
          setName(decryptedObject.first_name);
          setChoseRole({'id': decryptedObject.role_id, 'role_name': decryptedObject.role_name});
          setEmployee_code(decryptedObject.employee_code);
          setOffered_salary(decryptedObject.offered_salary);
          setGender(decryptedObject.gender);
          setPmobile(decryptedObject.mobile);
          setCmobile(decryptedObject.company_mobile_number);
          setPemail(decryptedObject.email);
          const jData = new Date(decryptedObject.created_on);
          const bDate = new Date(decryptedObject.dob);
          const joining_date = dayjs(new Date(jData.getFullYear(), jData.getMonth(), jData.getDate()));
          const birthDate = dayjs(new Date(bDate.getFullYear(), bDate.getMonth(), bDate.getDate()));
          setJoining_date(joining_date);
          setBirth_date(birthDate);
          setBlood_group(decryptedObject.blood_group);
          setCemail(decryptedObject.company_email);
          setChoseTstate(decryptedObject.temporary_state);
          if(decryptedObject.temporary_state)
          {
            getDistrict(decryptedObject.temporary_state, 'T');
          }
          
          setchoseTDistrict(decryptedObject.temporary_district);
          setTemporary_address(decryptedObject.temporary_detail_address);

          setChosePstate(decryptedObject.state);
          if(decryptedObject.state)
          {
            getDistrict(decryptedObject.state, 'P');
          }
          setchosePdistrict(decryptedObject.district);
          setPermanant_address(decryptedObject.address);
          setEmmergency_contact(decryptedObject.emergency_contact);
          setLastjob_companyname(decryptedObject.last_job_company_name);
          setSsc_marks(decryptedObject.tenth_marks);
          setHsc_marks(decryptedObject.twelth_marks);
          setChoseQualification({'id': decryptedObject.qualification_id, 'qualification_name': decryptedObject.final_qualification});
          setLastjob_companyname(decryptedObject.company_name);
          if(decryptedObject.department_id)
          {
            setChoseDepartment({'id': decryptedObject.department_id, 'department_name': decryptedObject.department_name});
          }
          if(decryptedObject.reporting_to!=null)
          {
            setChoseReportingTo({'id': decryptedObject.reporting_to, 'first_name': decryptedObject.reporting_name});
          }
          
          setChoseDesignation({'id': decryptedObject.level_in_company, 'designation_name': decryptedObject.designation_name});
          setChoseAstate(decryptedObject.allocated_state);
          if(decryptedObject.allocated_state)
          {
            getDistrict(decryptedObject.allocated_state, 'A');
          }
          setChoseADistrict(decryptedObject.allocated_district);
          
          if(decryptedObject.upload_resume)
          {
            setImageSrc(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.upload_resume);
          }
          if(decryptedObject.aadhar_card)
          {
            setImageSrc1(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.aadhar_card);
          }
          
          if(decryptedObject.pan_card)
          {
            setImageSrc2(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.pan_card);
          }
          
          if(decryptedObject.voter_id)
          {
            setImageSrc3(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.voter_id);
          }
          
          if(decryptedObject.driving_Licences)
          {
            setImageSrc4(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.driving_Licences);
          }
          
          if(decryptedObject.ssc_marksheet)
          {
            setImageSrc5(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.ssc_marksheet);
          }
          
          if(decryptedObject.graduation_certificate)
          {
            setImageSrc6(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.graduation_certificate);
          }
          
          if(decryptedObject.living_certification)
          {
            setImageSrc7(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.living_certification);
          }
          
          if(decryptedObject.profile_pic)
          {
            setProfile(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.profile_pic);
          }
          
          setAssetsDataList(response.data.assets);
          setEditorHtml(decryptedObject.kra);
          setEditorHtmlkpa(decryptedObject.kpi);
          setEditorHtmlsoap(decryptedObject.sop);
          setCompany_name(decryptedObject.company_name)

          //Fasilities
          let oldFasilties = [];
          for(const item of response.data.facilities)
          {
            oldFasilties.push({'id': item.id, 'facility_name': item.facilities})
          }
          setFacilitiesDataList(oldFasilties);

          //Checklist
          let checkList = [];
          for(const item of response.data.checkList)
          {
            checkList.push({'id': item.id, 'name': item.checklist})
          }
          setRows(checkList);

          //Videos
          let VideoList = [];
          for(const item of response.data.videos)
          {
            VideoList.push({'label': item.video_name, 'link': item.VideoLinks, 'video_image': item.thumbnails})
          }
          setVideos(VideoList);
          setKpiList(response.data.keyPrformanceIndicator);

          // urlToFile(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.upload_resume)
          // .then((file) => {
          //   console.log(file); // File object
          //   setImageSrc(process.env.NEXT_PUBLIC_API_BASE_URL+decryptedObject.upload_resume);
          // })
          // .catch((error) => {
          //   console.error('Error converting URL to file:', error);
          // });
       
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    console.log(imageSrc);
   
    getEmployeeMaster();
    if(action=='Update')
    {
      getEmployee();
    }
    
  }, [employee_id]);

    const getDistrict = async (state, type) => {

      try {
        const reqData = {
          'state': state
        }
        const response = await api.post("/api/employee/get-district", reqData);
        if (response.status === 200) {

            if(type == 'T')
            {
              setTdistrict(response.data.data);
            }
            if(type == 'P')
            {
              setPdistrict(response.data.data);
            }
            if(type == 'A')
            {
              setAllocated_district(response.data.data);
            }
            
        }

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const handleChangeRole = (event, newValue) => {
      if(newValue)
      {
        setChoseRole(newValue);
        setRoleId(newValue.id);
      }else{
        setChoseRole('');
        setRoleId('');
      }
    };
    const handleChangeTState = (event, newValue) => {
      if(newValue)
      {
        setChoseTstate(newValue);
        setAddTState(newValue);
      }
      
    
      setchoseTDistrict(null); 
      if (newValue) {
        getDistrict(newValue, 'T'); 
      } else {
        setTdistrict([]); 
      }
      
    };

    const handleChangePDistrict = (event, newValue) => {
      if(newValue)
      {
        setchosePdistrict(newValue);
        setAddPDistrict(newValue);
      }
      
    };
    const handleChangeTDistrict = (event, newValue) => {
      if(newValue)
      { 
        setchoseTDistrict(newValue);
        setAddTDistrict(newValue);
      }
      
    };
    const handleChangeADistrict = (event, newValue) => {
      if(newValue)
      {
        setChoseADistrict(newValue);
        setAddADistrict(newValue);
      }
      
    };
    const handleChangePState = (event, newValue) => {
      if (newValue) {
        setChosePstate(newValue);
        setAddPState(newValue);
        getDistrict(newValue, 'P'); 
      } else {
        setTdistrict([]); 
      }
    };

    const handleChangeAState = (event, newValue) => {
      if (newValue) {
        setChoseAstate(newValue);
        setAddAState(newValue.id);
        getDistrict(newValue, 'A'); 
      } else {
        setAllocated_district([]); 
      }
    };

    const handleChangeDepartment = (event, newValue) => {
      if(newValue)
      {
        setChoseDepartment(newValue);
        setAddDepartment(newValue.id);
      }
      
    };

    const handleChangeDesignation = (event, newValue) => {
      setChoseDesignation(newValue);
      setAddDesignation(newValue.id);
    };

    const handleChangeReportingTo = (event, newValue) => {
      setChoseReportingTo(newValue);
      setAddReporting_To(newValue.id);
    };

    const handleChangePQualification = (event, newValue) => {
      setChoseQualification(newValue);
      setAddQualification(newValue.id);
      setAddQualificationValue(newValue.qualification_name)
    };

    
 
    const handleFileChange = (event) => {
      const file = event.target.files[0];
    
      if (file) {
       
          const reader = new FileReader();
          reader.onloadend = () => {
              setImageSrc(reader.result); 
          };
          reader.readAsDataURL(file);
          setFileName_resume(file);
        }
    };

    const handleFileChangeA = (event) => {
      
      const file = event.target.files[0];
      if (file) {

          const reader = new FileReader();
          reader.onloadend = () => {
              setImageSrc1(reader.result); // Set the image source for preview
          };
          setFileName_adhar(file);
          reader.readAsDataURL(file);
          
  };
};
  
  const handleFileChangeP= (event) => {
    const file = event.target.files[0];
    
    if (file) {
    
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc2(reader.result); 
        };
        reader.readAsDataURL(file);
        setFileName_pan(file);
      }
    }


const handleFileChangev = (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setImageSrc3(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName_voting(file);
  }
};

const handleFileChangeD = (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setImageSrc4(reader.result); 
      };
      reader.readAsDataURL(file);
      setFileName_driving(file);
  }
};
const handleFileChangeS = (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setImageSrc5(reader.result); // Set the image source for preview
      };
      reader.readAsDataURL(file);
      setFileName_ssc(file);
  }
};

const handleFileChangeG = (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setImageSrc6(reader.result); // Set the image source for preview
      };
      reader.readAsDataURL(file);
      setFileName_graduation(file);
  }
};

const handleFileChangeL = (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setImageSrc7(reader.result); // Set the image source for preview
      };
      reader.readAsDataURL(file);
      setFileName_living(file);
  }
};

const handleFileChangeProfile = (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setProfile(reader.result); // Set the image source for preview
      };
      reader.readAsDataURL(file);
      setFileName_profile(file);
  }
};





    const handleDelete = () => {
        setImageSrc(null); 
    };

    const handleDeleteA= () => {
      setImageSrc1(null);
  };
  const handleDeleteP = () => {
    setImageSrc2(null); // Clear the image
};
const handleDeleteV = () => {
  setImageSrc3(null); // Clear the image
};
const handleDeleteD = () => {
  setImageSrc4(null); // Clear the image
};
const handleDeleteS = () => {
  setImageSrc5(null); // Clear the image
};
const handleDeleteG = () => {
setImageSrc6(null); // Clear the image
};
const handleDeleteL = () => {
setImageSrc7(null); // Clear the image
};

const handleDeleteProfile = () => {
  setImageSrc7(null); // Clear the image
  };

  const handleDownload = async (filePath, filename) => {
    if (!filePath) {
      alert('File path is missing.');
      return;
    }
  
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
  
      const fileURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the file.');
    }
  };

  const handleClickOpen = (filePath) => {
    //setOpen(true); 
    if (!filePath) {
      alert('File path is missing.');
      return;
    }
  
    const link = document.createElement('a');
    link.href = filePath;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      const [checkedNames, setCheckedNames] = useState({});
    
      const newhandleChange = (e) => {
        const { name, value } = e.target;
        setNewRow(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
      const addNewRowAssets = () => {
        const updatedRows = [...rows, { id: rows.length + 1, ...newRow }];
        setRows(updatedRows);
        setNewRow({ name: '', modelno: '', uniqueno: '', assetno: '', assetdate: '', aperson: '' });
      };

      const addNewRow = () => {
        if (newRow.name.trim() === '') {
          alert('Name cannot be empty');
          return;
        }
        setRows(prevRows => [
          ...prevRows,
          { id: rows.length + 1, name: newRow.name }
        ]);
        setNewRow({ name: '' }); // Clear input field after adding
      };
    
      const handleCheckboxChange = (name) => {
        setCheckedNames(prevState => ({
          ...prevState,
          [name]: !prevState[name]
        }));
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
      const handleDateFilter = () => {
        const filteredData = allData.filter(item => {
            const itemDate = dayjs(item.created_on); // Replace `item.date` with your actual date field
            return itemDate.isSame(fromDate, 'day') || 
                   itemDate.isSame(toDate, 'day') || 
                   (itemDate.isAfter(fromDate) && itemDate.isBefore(toDate));
        });
      
      };
      
      const handleDOBchange = (date) => {
        setBirth_date(date);
        handleDateFilter(); 
      };

      const handleJoiningchange = (date) => {
        setJoining_date(date);
        handleDateFilter(); 
      };
      // const handleJoiningchange = (date) => {
     
      //   const formattedDate = dayjs(date).format('YYYY-MM-DD');
      //   console.log(formattedDate);  
      //   setJoining_date(formattedDate);  
      //   handleDateFilter(); 
      // };

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
          let facility_data = [];
          let assets_data = [];
          let checklist_data = [];
          const assetData = assetsDataList;
          const facilitiesData = getSelectedFacilitiesDetails();
          const joiningDate = joining_date.add(1, 'day');
          const birthDate = birth_date.add(1, 'day');

          for(const item of videos)
          {
            if (!item.details_id) {
              videoImage.push(item.video_image);
              video_data.push({level: item.level, link: item.link});
            }
          }

          for(const item of facilitiesData)
          {
            if (item.id) {
              facility_data.push(item.facility_name);
            }
          }

          for(const item of rows)
          {
            checklist_data.push(item.name);
          }
        
            
          for(const item of assetData)
          {
            if (item.id) {
              assets_data.push(item);
            }
          }
         
          const formData ={
            'first_name': name,
            'role_id': roleid,
            'offered_salary': offered_salary,
            'gender': gender,
            'mobile': pmobile,
            'email':pemail,
            'company_mobile_number': cmobile,
            'joining_date': joiningDate.toISOString().split('T')[0],
            'company_email': cemail,
            'created_by':uid,
            'blood_group': blood_group,
            'dob': birthDate.toISOString().split('T')[0],
            'district' : addPDistrict,
            'state': addPState,
            'address':permanant_address,
            'qualification_id': AddQualification,
            'temporary_state': addTState,
            'temporary_district': addTDistrict,
            'temporary_detail_address': temporary_address,
            'emergency_contact': emmergency_contact,
            'last_job_company_name':lastjob_companyname,
            'tenth_marks':ssc_marks,
            'twelth_marks': hsc_marks,
            'company_name':company_name,
            'department_id': addDepartment,
            'reporting_to': addReporting_To,
            'level_in_company': AddDesignation,
            'allocated_state':addAState,
            'allocated_district': addADistrict,
            'allocated_taluka':addADistrict,
            'kra':editorHtml,
            'kpi':editorHtmlkpa,
            'sop':editorHtmlsoap,
            'Checklist': JSON.stringify(checklist_data),
            'facilities': JSON.stringify(facility_data),
            'assetsData' : JSON.stringify(assets_data),
            'upload_resume': fileName_resume,
            'aadhar_card': fileName_adhar,
            'pan_card': fileName_pan,
            'driving_Licences': fileName_driving,
            'ssc_marksheet': fileName_ssc,
            'graduation_certificate': fileName_graduation,
            'voter_id': fileName_voting,
            'living_certification': fileName_living,
            'profile_pic': fileName_profile,
            'education': AddQualificationValue,
            'video_data': JSON.stringify(video_data),
            'thumbnails': videoImage,
          }

       

       
      try {
        let response = [];
        if(action =='Update')
        {
          formData.employee_id = employee_id;
          response = await api.post('/api/employee/edit-employee', formData, {
            headers:{'content-type': 'multipart/form-data'}
          });
        }else{
          response = await api.post('/api/employee/add-employee', formData, {
            headers:{'content-type': 'multipart/form-data'}
          });
        }
          
        if (response) {
          router.push('/user-management');
          alert('Employee Saved  successfully');
        } else {
          alert(response.data.data.error);
          console.error('Failed to save');
        }

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };

   
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setPemail(emailValue);
    
        if (!emailValue) {
          setError('Email is required');
        } else if (!emailRegex.test(emailValue)) {
          setError('Please enter a valid email address');
        } else {
          setError('');  
        }
      };
    
      const emailRegexcompany = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const handleCompanyEmailChange = (e) => {
        const emailValuec = e.target.value;
        setCemail(emailValuec);
    
        if (!emailValuec) {
          setC_Error('Email is required');
        } else if (!emailRegexcompany.test(emailValuec)) {
          setC_Error('Please enter a valid email address');
        } else {
          setC_Error('');  
        }
      };
    
      const handlePmobileChange = (e) => {
        const value = e.target.value;
        setPmobile(value);
    
        // Check if the mobile number is empty
        if (!value) {
          setPmobileError('Mobile number is required');
        }
        // Check if the mobile number contains only numbers and is exactly 10 digits long
        else if (!/^\d{10}$/.test(value)) {
          setPmobileError('Please enter a valid 10-digit mobile number');
        } else {
          setPmobileError('');
        }
      };
    
      // Handle company mobile number validation
      const handleCompanyMobileChange = (e) => {
        const value = e.target.value;
        setCmobile(value);
    
        // Check if the mobile number is empty
        if (!value) {
          setCompanyMobileError('Mobile number is required');
        }
        // Check if the mobile number contains only numbers and is exactly 10 digits long
        else if (!/^\d{10}$/.test(value)) {
          setCompanyMobileError('Please enter a valid 10-digit mobile number');
        } else {
          setCompanyMobileError('');
        }
      };
    
      const handleEmmergencyContactChange = (e) => {
        const value = e.target.value;
        setEmmergency_contact(value);
    
        if (!value) {
          setEmmergencyContactError('Mobile number is required');
        }
        else if (!/^\d{10}$/.test(value)) {
          setEmmergencyContactError('Please enter a valid 10-digit mobile number');
        } else {
          setEmmergencyContactError('');
        }
      };

      const numberOrDecimalRegex = /^\d*\.?\d*$/;

     
      const handleSscMarksChange = (e) => {
        const value = e.target.value;
        setSsc_marks(value);

        if (value === '' || numberOrDecimalRegex.test(value)) {
          setSscMarksError('');  
        } else {
          setSscMarksError('Please enter a valid number or decimal');
        }
      };
    
     
      const handleHscMarksChange = (e) => {
        const value = e.target.value;
        setHsc_marks(value);
    
      
        if (value === '' || numberOrDecimalRegex.test(value)) {
          setHscMarksError('');  
        } else {
          setHscMarksError('Please enter a valid number or decimal');
        }
      };

      const handleSalaryChange = (e) => {
        const value = e.target.value;
        setOffered_salary(value); 
        if (numberOrDecimalRegex.test(value) || value === '') {
          
          setSalaryError(''); 
        } else {
          setSalaryError('Please enter a valid number');
        }
      };

      const alphabeticRegex = /^[A-Za-z\s]*$/;  
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (alphabeticRegex.test(value) || value === '') {
    
      setNameError(''); 
    } else {
      setNameError('Please enter only alphabetic characters');
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
            <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mb={1} style={{width: '30%', verticalAlign: 'top'}} >
                        <Typography variant="h5"  sx={{ padding: 2 }}>{action =='Update' ? ( <>Update Employee</>): (<>Add New Employee</>)}</Typography>
                    </Box>
                <TableContainer component={Paper} >
                    <Stepper activeStep={activeStep} alternativeLabel sx={{paddingTop: '20px'}}>  
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
        size="small"
        fullWidth
        variant="outlined"
        value={name}
        onChange={handleNameChange}
        error={!!nameError}  
        helperText={nameError}  
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
                            options={role}
                            getOptionLabel={(Role) => Role ? Role.role_name : ''}
                            value={ChoseRole}
                            onChange={handleChangeRole}
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
        value={employee_code}
        onChange={(e) => setId(e.target.value)}
        disabled 
       
      />
    </Box>

    <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
 Offered Salary
      </label>
      <TextField
        required
        size="small"
        fullWidth
        variant="outlined"
        value={offered_salary}
        onChange={handleSalaryChange}
        error={!!salaryError}  // Apply error styling if there's an error
        helperText={salaryError}  // Show error message if input is invalid
      />
</Box>


<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

      <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Gender
      </label>
    
      <FormControl fullWidth>
                          
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
                                    <MenuItem  value="Trans-Gender">TransGender</MenuItem>
                                  
                                </Select>
                        </FormControl>
    
    </Box>
    <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      Personal Mobile Number
      </label>
      <TextField
          required
          size="small"  
          fullWidth
          variant="outlined"
          value={pmobile}
          onChange={handlePmobileChange}
          error={!!pmobileError}  
          helperText={pmobileError} 
        />
</Box>


    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

      <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
        Company mobile no.
      </label>
      <TextField
          required
          size="small"  
          fullWidth
          variant="outlined"
          value={cmobile}
          onChange={handleCompanyMobileChange}
          error={!!companyMobileError}  
          helperText={companyMobileError}  
        />
    </Box>
    <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      Personal Email Id
      </label>
      <TextField
        required
        size="small"  
        fullWidth
        variant="outlined"
        value={pemail}
        onChange={handleEmailChange}
       
        error={!!error}  
        helperText={error}  
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
    <div>
    
      <DatePicker
        sx={{ width: '100%', height:'33px' }} 
        value={joining_date}
          format="DD-MM-YYYY"
        onChange={handleJoiningchange}
       
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              height: '20px', 
              '& input': {
                height: '20px', 
                padding: '0 10px', 
                marginTop:'-10px'
              },
              '& .MuiOutlinedInput-root': {
                height: '20px', 
              },
            }}
          />
        )}
      />
           </div></LocalizationProvider>


    </Box>
    <Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
  
  
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
      Birth Date
      </label>
     
     

      <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div>
    
    <DatePicker
        sx={{ width: '100%', height:'33px' }} 
          format="DD-MM-YYYY"
        value={birth_date}
        // onChange={(newValue) => setBirthdate(dayjs(newValue))}
        onChange={handleDOBchange}
       
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              height: '20px', 
              '& input': {
                height: '20px', 
                padding: '0 10px', 
                marginTop:'-10px'
              },
              '& .MuiOutlinedInput-root': {
                height: '20px', 
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
                                <Select
                                   required
                                    id="blood_group"
                                    variant="outlined"
                                    value={blood_group}
                                    label="Blood Group"
                                    onChange={BloodGroupChange}
                                >
                                    <MenuItem value="">Please Select</MenuItem>
                                    <MenuItem  value="A+">A+</MenuItem>
                                    <MenuItem  value="B+">B+</MenuItem>
                                    <MenuItem  value="A-">A-</MenuItem>
                                    <MenuItem  value="B-">B-</MenuItem>
                                    <MenuItem  value="O+">O+</MenuItem>
                                    <MenuItem  value="O-">O-</MenuItem>
                                    <MenuItem  value="AB+">AB+</MenuItem>
                                    <MenuItem  value="AB-">AB-</MenuItem>
                                </Select>
                        </FormControl>
    
    </Box>
    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >
    <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
   Company Email Id
      </label>
      <TextField
        required
        size="small"  
        fullWidth
        variant="outlined"
        value={cemail}
        onChange={handleCompanyEmailChange}
       
        error={!!C_error}  
        helperText={C_error}  
      />
    </Box>

                        

                        <Box justifyContent={'space-between'} alignItems={'right'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top'}} >

                      
                          
                          <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block', fontWeight: 'bold' }}>
      Temporary Address
      </label>
      <br/>
                        
                          
      <FormControl fullWidth>
                          <Autocomplete
                            id="category-autocomplete"
                            options={tstate}
                            getOptionLabel={(state) => state ? state : ''}
                            value={ChoseTstate}
                            onChange={handleChangeTState}
                            renderInput={(params) => <TextField {...params} label="Please select state" variant="outlined" />}
                          />
                          
                        </FormControl>
                        <br/><br/>
                        <FormControl fullWidth>
                          <Autocomplete
                            id="category-autocomplete"
                            options={tdistrict}
                            getOptionLabel={(TDistrict) => TDistrict ? TDistrict : ''}
                            value={choseTDistrict}
                            onChange={handleChangeTDistrict}
                            renderInput={(params) => <TextField {...params} label="Please select district" variant="outlined" />}
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
      
      />

                     
                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

                       
                          <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block', fontWeight: 'bold' }}>
      Permanant Address
      </label>
      <br/>
      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={pstate}
                            getOptionLabel={(StateP) => StateP ? StateP : ''}
                            value={ChosePstate}
                            onChange={handleChangePState}
                            renderInput={(params) => <TextField {...params} label="Please select state" variant="outlined" />}
                          />
                          
                        </FormControl>
                        <br/><br/>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={pdistrict}
                            getOptionLabel={(PDistrict) => PDistrict ? PDistrict : ''}
                            value={chosePDistrict}
                            onChange={handleChangePDistrict}
                            renderInput={(params) => <TextField {...params} label="Please select district" variant="outlined" />}
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
      
      />

</Box>

<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
Emergency Contact
</label>
<TextField
          required
          size="small"  
          fullWidth
          variant="outlined"
          value={emmergency_contact}
          onChange={handleEmmergencyContactChange}
          error={!!EmmergencyContactError}  
          helperText={EmmergencyContactError} 
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
          value={ssc_marks}
          onChange={handleSscMarksChange}
          error={!!sscMarksError}  
          helperText={sscMarksError}  
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        style={{ width: '33%', padding: '0 5px' }} 
      >
        <label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
          12TH Marks
        </label>
        <TextField
          required
          size="small"
          fullWidth
          variant="outlined"
          value={hsc_marks}
          onChange={handleHscMarksChange}
          error={!!hscMarksError}  
          helperText={hscMarksError} 
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
                            options={final_qualification}
                            getOptionLabel={(qualification) => qualification ? qualification.qualification_name : ''}
                            value={choseQualification}
                            onChange={handleChangePQualification}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
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
                            options={department}
                            getOptionLabel={(Department) => Department ? Department.department_name : ''}
                            value={choseDepartment}
                            onChange={handleChangeDepartment}
                            renderInput={(params) => <TextField {...params} placeholder="please select Department" variant="outlined" />}
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
                            options={reporting_to}
                            getOptionLabel={(reporting) => reporting ? reporting.first_name : ''}
                            value={choseReportingTo}
                            onChange={handleChangeReportingTo}
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
                            options={level_in_company}
                            getOptionLabel={(designation) => designation ? designation.designation_name : ''}
                            value={choseDesignation}
                            onChange={handleChangeDesignation}
                            renderInput={(params) => <TextField {...params} placeholder="Level in company" variant="outlined" />}
                          />
                          
                        </FormControl>
</Box>


<Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} ml={1} style={{width: '49%', verticalAlign: 'top'}} >

<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
  Allocated States
</label>
<FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={allocated_states}
                            getOptionLabel={(Astate) => Astate ? Astate : ''}
                            value={ChoseAstate}
                            onChange={handleChangeAState}
                            renderInput={(params) => <TextField {...params} placeholder="Allocated states" variant="outlined" />}
                          />
                          
                        </FormControl>
</Box>
<Box justifyContent={'space-between'} alignItems={'left'} mt={3} ml={1} mb={0} style={{width: '49%', verticalAlign: 'top', padding: '0 3px;', boxSizing:'border-box'}} >
<label style={{ marginBottom: '4px', fontSize: '14px', display: 'block' }}>
Allocated District
</label>
<FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Autocomplete
                            id="category-autocomplete"
                            options={allocated_district}
                            getOptionLabel={(allocatedDistrict) => allocatedDistrict ? allocatedDistrict : ''}
                            value={choseAdistrict}
                            onChange={handleChangeADistrict}
                            renderInput={(params) => <TextField {...params} placeholder="Allocated district" variant="outlined" />}
                          />
                          
                        </FormControl>
                      </Box>

                      <Box display="flex"  justifyContent="space-between"  mt={4} mb={1}  sx={{ width: '100%' }}>
                            <Typography variant="h6" sx={{ padding: 2 }}>My key Performances Indicator</Typography>
                            <Button variant="contained" color="secondary" onClick={handleOpenKpiDialog}
                              sx={{
                                backgroundColor: '#ff8c38',
                                height: '30px',
                              }}
                            >Add More</Button>
                      </Box>
                                      
                                            
                      <Dialog open={openKpiDialog} onClose={handleCloseKpiDialog} maxWidth="md" fullWidth>
                          <DialogTitle>Key Performances</DialogTitle>
                          <hr />
                          <DialogContent>
                            <Table>
                                <TableBody>
                                        <TableRow>
                                            <TableCell align="left">Year<span className="star">*</span></TableCell>
                                            <TableCell align="left"><TextField name="kpi_year" variant="outlined" value={kpi_year} onChange={(e) => setkpi_year(e.target.value)} inputProps={{ readOnly: true }}/></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Month<span className="star">*</span></TableCell>
                                            <TableCell width="200px">
                                              <FormControl fullWidth>
                                                      <Select
                                                        required
                                                          id="months"
                                                          variant="outlined"
                                                          value={kpi_month}
                                                          onChange={monthhandleChange}
                                                      >
                                                          <MenuItem value="">Please Select</MenuItem>
                                                          <MenuItem  value="January">January</MenuItem>
                                                          <MenuItem  value="February">February</MenuItem>
                                                          <MenuItem  value="March">March</MenuItem>
                                                          <MenuItem  value="April">April</MenuItem>
                                                          <MenuItem  value="May">May</MenuItem>
                                                          <MenuItem  value="June">June</MenuItem>
                                                          <MenuItem  value="July">July</MenuItem>
                                                          <MenuItem  value="August">August</MenuItem>
                                                          <MenuItem  value="September">September</MenuItem>
                                                          <MenuItem  value="October">October</MenuItem>
                                                          <MenuItem  value="November">November</MenuItem>
                                                          <MenuItem  value="December">December</MenuItem>
                                                      </Select>
                                              </FormControl>
                                              
                                              </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Percentage<span className="star">*</span></TableCell>
                                            <TableCell><TextField name="kpi_percentage" variant="outlined" value={kpi_percentage} onChange={(e) => setkpi_percentage(e.target.value)}/></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Salary Hike<span className="star">*</span></TableCell>
                                            <TableCell><TextField name="kpi_salary_hike" variant="outlined" value={kpi_salary_hike} onChange={(e) => setkpi_salary_hike(e.target.value)}/></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Upload<span className="star">*</span></TableCell>
                                            <TableCell>
                                            <Button component="label" variant="contained"  display="inline" startIcon={<CloudUploadIcon />}>
                                              Upload file
                                              <VisuallyHiddenInput type="file" accept="application/pdf, image/*" onChange={(event) => kpihandleFileChange(event)}  />
                                            </Button>
                                              <br/>
                                              <br/>
                                              {kpi_uploadedfile && (
                                              <Typography variant="body2" sx={{ marginTop: 1 }} display="inline" >
                                                  {kpi_uploadedfile.name}
                                              </Typography>
                                              )}
                                            </TableCell>
                                        </TableRow>
                                        
                                </TableBody>
                            </Table>
                          </DialogContent>
                          <DialogActions>
                              <Button onClick={handleCancelKpi} color="secondary">
                                Cancel
                              </Button>
                              <Button onClick={handleOkKpi} color="primary">
                                OK
                              </Button>
                          </DialogActions>
                      </Dialog>

                      <Table>
                          <TableHead>
                              <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Month</TableCell>
                                <TableCell>Percentage</TableCell>
                                <TableCell>Salary Hike</TableCell>
                                <TableCell>View</TableCell>
                                <TableCell>Updated By</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {kpiList.map((kpi, index) => (
                                  <TableRow key={kpi.id}>
                                      <TableCell>{index+1}</TableCell>
                                      <TableCell>{kpi.year}</TableCell>
                                      <TableCell>{kpi.month}</TableCell>
                                      <TableCell>{kpi.percentage}%</TableCell>
                                      <TableCell>{kpi.salaryhike}%</TableCell>
                                      <TableCell><Link href={kpi.kpi_file} target='_blank'><Button variant="contained" size="small"><VisibilityIcon /> View</Button></Link></TableCell>
                                      <TableCell>{kpi.update_by}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                        </Table>

                      </Grid>
                    )}


                    {activeStep === 1 && (
                      <Grid spacing={2} sx={{ padding: 3 }} container>
                      <Grid container spacing={1} sx={{marginTop:"50px"}}>
                      <Grid item xs={3}>
            <Box>
                <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
                    Upload Resume <span style={{ color: 'red' }}>*</span>
                </label>
                <TextField
                      variant="outlined"
                      placeholder="Upload an image"
                      label={imageSrc || ''}
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
                          color: 'transparent',
                        },
                      }}
                      inputProps={{ readOnly: true }}
                    />
                



                <Box mt={1} display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Button component="label" variant="contained" size="small"  sx={{backgroundColor:'#ff8c38'}}>
                            Upload
                            <input
                                type="file"
                                hidden
                                accept="application/pdf, image/*" 
                                onChange={handleFileChange} 
                                
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
                            <VisibilityIcon onClick={() => handleClickOpen(imageSrc || '')} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                            <DownloadIcon
                              onClick={() => handleDownload(imageSrc || '', 'resume')}
                              style={{ cursor: 'pointer', marginLeft: '10px' }}
                            />
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
Adhar Card <span style={{ color: 'red' }}>*</span>
</label>
<TextField
                    variant="outlined"
                    placeholder="Upload an image"
                    label={imageSrc1 || ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <UploadIcon style={{ cursor: 'pointer', height: '24px', width: '24px' }} />
                            </InputAdornment>
                        ),
                        style: {
                            height: '100px',
                            width: '100%',
                            backgroundImage: imageSrc1 ? `url(${imageSrc1})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: 'transparent', 
                        },
                    }}
                    inputProps={{ readOnly: true }} 
                />


            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
              <Button component="label" variant="contained" size="small"  sx={{backgroundColor:'#ff8c38'}}>
                            Upload
                            <VisuallyHiddenInput type="file" onChange={(event) => handleFileChangeA(event)}  />
                        </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={handleDeleteA} 
                 
                  style={{ marginLeft: '5px' }} 
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleClickOpen(imageSrc1 || '')}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleDownload(imageSrc1 || '', 'aadhar')}
                />
                </Box>
              </Box>
             
            </Box>
          </Box>
        </Grid>  <Grid item xs={3}>
          <Box>
          <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
PAN Card <span style={{ color: 'red' }}>*</span>
</label>
<TextField
                    variant="outlined"
                    placeholder="Upload an image"
                    label={imageSrc2 || ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <UploadIcon style={{ cursor: 'pointer', height: '24px', width: '24px' }} />
                            </InputAdornment>
                        ),
                        style: {
                            height: '100px',
                            width: '100%',
                            backgroundImage: imageSrc2 ? `url(${imageSrc2})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: 'transparent', // Hide the text color
                        },
                    }}
                    inputProps={{ readOnly: true }}    />



           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
              <Button component="label" variant="contained" size="small"  sx={{backgroundColor:'#ff8c38'}}>
                            Upload
                            <input
                                type="file"
                                hidden
                                accept="image/*" 
                                onChange={handleFileChangeP} 
                            />
                        </Button>
                        <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={handleDeleteP} 
                 
                  style={{ marginLeft: '5px' }} 
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleClickOpen(imageSrc2 || '')}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleDownload(imageSrc2 || '', 'pan')}
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
                    label={imageSrc3 || ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <UploadIcon style={{ cursor: 'pointer', height: '24px', width: '24px' }} />
                            </InputAdornment>
                        ),
                        style: {
                            height: '100px',
                            width: '100%',
                            backgroundImage: imageSrc3 ? `url(${imageSrc3})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: 'transparent', // Hide the text color
                        },
                    }}
                    inputProps={{ readOnly: true }}    />
                  

           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
              <Button component="label" variant="contained" size="small"  sx={{backgroundColor:'#ff8c38'}}>
                            Upload
                            <input
                                type="file"
                                hidden
                                accept="image/*" 
                                onChange={handleFileChangev} 
                            />
                        </Button>
                        <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={handleDeleteV} 
                 
                  style={{ marginLeft: '5px' }} 
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleClickOpen(imageSrc3 || '')}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleDownload(imageSrc3 || '', 'voter')}
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
                    label={imageSrc4 || ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <UploadIcon style={{ cursor: 'pointer', height: '24px', width: '24px' }} />
                            </InputAdornment>
                        ),
                        style: {
                            height: '100px',
                            width: '100%',
                            backgroundImage: imageSrc4 ? `url(${imageSrc4})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: 'transparent', // Hide the text color
                        },
                    }}
                    inputProps={{ readOnly: true }}    />


           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
              <Button component="label" variant="contained" size="small"  sx={{backgroundColor:'#ff8c38'}}>
                            Upload
                            <input
                                type="file"
                                hidden
                                accept="image/*" 
                                onChange={handleFileChangeD} 
                            />
                        </Button>
                        <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={handleDeleteD} 
                 
                  style={{ marginLeft: '5px' }} 
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleClickOpen(imageSrc4 || '')}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleDownload(imageSrc4 || '', 'driving')}
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
                    label={imageSrc5 || ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <UploadIcon style={{ cursor: 'pointer', height: '24px', width: '24px' }} />
                            </InputAdornment>
                        ),
                        style: {
                            height: '100px',
                            width: '100%',
                            backgroundImage: imageSrc5 ? `url(${imageSrc5})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: 'transparent', // Hide the text color
                        },
                    }}
                    inputProps={{ readOnly: true }}    />
                    
  
           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
              <Button component="label" variant="contained" size="small"  sx={{backgroundColor:'#ff8c38'}}>
                            Upload
                            <input
                                type="file"
                                hidden
                                accept="image/*" 
                                onChange={handleFileChangeS} 
                            />
                        </Button>
                        <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={handleDeleteS} 
                 
                  style={{ marginLeft: '5px' }} 
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleClickOpen(imageSrc5 || '')}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleDownload(imageSrc5 || '', 'ssc_marksheet')}
                />
                </Box>
              </Box>
             
            </Box>
          </Box>
        </Grid>  <Grid item xs={3}>
          <Box>
          <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
Graduation Certficate<span style={{ color: 'red' }}>*</span>
</label>
            <TextField
              variant="outlined"
              placeholder="Upload an image"
              label={imageSrc6 || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadIcon
                      style={{ cursor: 'pointer', height: '24px', width: '24px' }} // Icon size
                      //onClick={() => handleIconClick()}
                    />
                  </InputAdornment>
               
                ),
                style: {
                  height: '100px',
                  width: '100%',
                  backgroundImage: imageSrc6 ? `url(${imageSrc6})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'transparent', // Hide the text color
                },
                sx: {
                  '& .MuiInputBase-input': {
                    padding: '16px 14px', // Center text vertically
                  },
                },
              }}
            />
            
           
            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Button component="label" variant="contained" size="small"  sx={{backgroundColor:'#ff8c38'}}>
                            Upload
                            <input
                                type="file"
                                hidden
                                accept="image/*" 
                                onChange={handleFileChangeG} 
                            />
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
                  onClick={() => handleClickOpen(imageSrc6 || '')}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleDownload(imageSrc6 || '', 'graduation_certificate')}
                />
                </Box>
              </Box>
             
            </Box>
          </Box>
        </Grid>  <Grid item xs={3}>
          <Box>
          <label style={{ marginBottom: '20px', fontSize: '14px', display: 'block' }}>
Living Certficate <span style={{ color: 'red' }}>*</span>
</label>
            <TextField
              variant="outlined"
              placeholder="Upload an image"
              label={imageSrc7 || ''}
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
                style: {
                  height: '100px',
                  width: '100%',
                  backgroundImage: imageSrc7 ? `url(${imageSrc7})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'transparent', // Hide the text color
                },
                sx: {
                  '& .MuiInputBase-input': {
                    padding: '16px 14px', // Center text vertically
                  },
                },
              }}
            />
           

            <Box mt={1} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Button component="label" variant="contained" size="small"  sx={{backgroundColor:'#ff8c38'}}>
                            Upload
                            <input
                                type="file"
                                hidden
                                accept="image/*" 
                                onChange={handleFileChangeL} 
                            />
                        </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={handleDeleteL} 
                  style={{ marginLeft: '5px' }} // Space between buttons
                >
                  Delete
                </Button>
                <Box sx={{alignItems:'right', marginLeft:"40px"}}>
                <VisibilityIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleClickOpen(imageSrc7 || '')}
                />
                <DownloadIcon
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleDownload(imageSrc7 || '', 'living_certificate')}
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
                    Upload profile <span style={{ color: 'red' }}>*</span>
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
                            backgroundImage: profile ? `url(${profile})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: 'transparent', // Hide the text color
                        },
                    }}
                    inputProps={{ readOnly: true }} // Make the text box read-only
                />
                



                <Box mt={1} display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Button component="label" variant="contained" size="small"  sx={{backgroundColor:'#ff8c38'}}>
                            Upload
                            <input
                                type="file"
                                hidden
                                accept="image/*" 
                                onChange={handleFileChangeProfile} 
                                
                            />
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={handleDeleteProfile} // Clear image
                            style={{ marginLeft: '5px' }} // Space between buttons
                        >
                            Delete
                        </Button>
                        <Box sx={{ alignItems: 'right', marginLeft: "40px" }}>
                            <VisibilityIcon onClick={() => handleClickOpen(profile || '')} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                            <DownloadIcon   onClick={() => handleDownload(profile || '', 'profile_pic')}  style={{ cursor: 'pointer', marginLeft: '10px' }} />
                        </Box>
                    </Box>
                </Box>
                <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Image Preview</DialogTitle>
                    <DialogContent>
                        {profile && (
                            <img
                                src={profile}
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
      
    </Grid>
    <br/><br/><br/><br/>
    <Box display="flex"  justifyContent="space-between"  mt={4} mb={1}  sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ padding: 2 }}> Company Provided Assets</Typography>
      <Button variant="contained" color="secondary" onClick={handleOpenAssetsDialog}
        sx={{
          backgroundColor: '#ff8c38',
          height: '30px',
        }}
      >
        View Assets Data
      </Button>
    </Box>

                       
          <Dialog open={openAssetsDialog} onClose={handleCloseAssetsDialog} maxWidth="md" fullWidth>
                <DialogTitle>Assets List</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Select</TableCell>
                                <TableCell>Sr No</TableCell>
                                <TableCell>Asset Name</TableCell>
                                <TableCell>Model Number</TableCell>
                                <TableCell>Unique No/IMEI Code</TableCell>
                                <TableCell>Assets No</TableCell>
                                <TableCell>Assets Handover Date</TableCell>
                                <TableCell>Assets Handover Person</TableCell>

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
                                    <TableCell>{asset.modelno}</TableCell>
                                    <TableCell>{asset.emei}</TableCell>
                                    <TableCell>{asset.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
        <Button onClick={handleCancelAsset} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleOkAsset} color="primary">
          OK
        </Button>
      </DialogActions>
            </Dialog>

            <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Sr No</TableCell>
                                <TableCell>Asset Name</TableCell>
                                <TableCell>Model Number</TableCell>
                                <TableCell>Unique No/IMEI Code</TableCell>
                                <TableCell>Assets No</TableCell>
                                <TableCell>Assets Handover Date</TableCell>
                                <TableCell>Assets Handover Person</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assetsDataList.map((assets, index) => (
                                            <TableRow key={assets.id}>
                                                <TableCell>{index+1}</TableCell>
                                                <TableCell>{assets.assetname}</TableCell>
                                                <TableCell>{assets.modelno}</TableCell>
                                                <TableCell>{assets.emei}</TableCell>
                                                <TableCell>{assets.modelno}</TableCell>
                                                <TableCell>{assets.emei}</TableCell>
                                                <TableCell>{assets.emei}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table><br/><br/>
                               

            <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} sx={{marginTop:"51px"}} >
         
            <Box display="flex"  justifyContent="space-between"  mt={1} mb={1}  sx={{ width: '100%' }}
    >
      <Typography variant="h6" sx={{ padding: 2 }}> Company Provided Facilities and Membership</Typography>
      <Button variant="contained" color="secondary" onClick={handleOpenFacilitiesDialog} sx={{backgroundColor:'#ff8c38', height:"30px"}}>
              Company Provided Membership And Facilities
            </Button>
    </Box>
                
                       
                        <Dialog open={openFacilitiesDialog} onClose={handleCloseFacilitiesDialog} maxWidth="md" fullWidth>
                <DialogTitle>Facility List</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Select</TableCell>
                                <TableCell>Sr No</TableCell>
                                <TableCell>Facility Name</TableCell>
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Facilities.map((facilities) => (
                                <TableRow key={facilities.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedFacilities.includes(facilities.id)}
                                            onChange={() => handleToggleFacility(facilities.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{facilities.id}</TableCell>
                                    <TableCell>{facilities.facility_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
        <Button onClick={handleCancelFacility} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleOkFacility} color="primary">
          OK
        </Button>
      </DialogActions>
            </Dialog>

            <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Sr. No</TableCell>
                                <TableCell>Facility  Name</TableCell>
                               
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {facilitiesDataList.map((facilities, index) => (
                                            <TableRow key={facilities.id}>
                                                <TableCell>{index+1}</TableCell>
                                                <TableCell>{facilities.facility_name}</TableCell>
                                              
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table><br/><br/>

           
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
        style={{
          height: '200px', 
        }}
      />

                            </div>

                                   <br/><br/>        <br/>
                            <div style={{ marginTop: '16px' }}>

<label style={{ marginBottom: '20px', fontSize: '14px', fontWeight:'600', display: 'block' }}>
Add KPI
</label>
<ReactQuill
        value={editorHtmlkpa}
        onChange={handleChangekpa}
        theme="snow"
        style={{
          height: '200px', 
        }}
      />
</div>

<br/><br/>
<br/>

                                              
                            <div style={{ marginTop: '16px' }}>

                            <label style={{ marginBottom: '20px', fontSize: '14px', fontWeight:'600', display: 'block' }}>
 Add SOP
        </label>
        <ReactQuill
        value={editorHtmlsoap}
        onChange={handleChangesoap}
        theme="snow"
        style={{
          height: '200px', 
        }}
      />
                            </div>
<br/><br/>
                                                    
                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                            <Typography variant="h6"  sx={{ padding: 2 }}>Checklist</Typography>
                        </Box>
                
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{ width: '100%', verticalAlign: 'top', padding: '0 10px' }}>
      <div style={{ marginTop: '16px' }}>
        <TextField
          fullWidth
          name="name"
          label="Name"
          variant="outlined"
          value={newRow.name}
          onChange={newhandleChange}
        />
      </div>

      <Button variant="contained" onClick={addNewRow} style={{ marginTop: '8px', backgroundColor:'#ff8c38' }}>Add Row</Button>

      <br />
      <br />
      <Paper style={{ padding: '10px' }}>
        <List>
          {rows.map((row) => (
            <ListItem key={row.id}
            style={{
              border: '1px solid #ccc', // Border for each checkbox item
              borderRadius: '4px', // Rounded corners
              marginBottom: '8px', // Spacing between items
              padding: '10px',
              backgroundColor: '#f9f9f9', // Optional: background color for each item
            }}>

              <FormControlLabel
               
                label={row.name}

                control={
                  <Checkbox
                    checked={checkedNames[row.name] || true}
                    onChange={() => handleCheckboxChange(row.name)}
                    name={row.name}
                  />
                }
                
              />
            </ListItem>
          ))}
        </List>
      </Paper>
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
                                          <Button variant="contained" size="small" onClick={addNewVideoRow} style={{ marginTop: '8px', backgroundColor:'#ff8c38' }}>
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
                              <Button variant="contained" color="primary" style={{ marginRight: '8px', backgroundColor:'#ff8c38' }} size="medium" onClick={handleSubmit}>
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