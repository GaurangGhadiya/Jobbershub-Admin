import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import SelectDropdown from '../SelectDropdown';
import InputFieldWithIcon from '../InputFieldWithIcon';
import RegistrationPastDaysModal from '../Modals/RegistrationDaysModal';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StateModal from '../Modals/StateModal';
import SellerRegistrationPastDaysModal from '../Modals/SellerRegistrationDaysModal';
import SellerTypekModal from '../Modals/SellerTypeModal';

const searchOptions = [
    { value: '1', label: 'Seller Name' },
    { value: '2', label: 'Seller Mo. Number' },
    { value: '3', label: 'Email ID	' },
    { value: '4', label: 'Pan No	' },
    { value: '5', label: 'Aadhar No	' },
    { value: '6', label: 'Company Name	' },
    { value: '7', label: 'GST Number	' },
];
const SellerFilter = () => {
    const [searchFilter, setSearchFilter] = useState("")
    const [filterValue, setFilterValue] = useState({})
    const [registrationPastDays, setregistrationPastDays] = React.useState(false);
    const [sellerType, setsellerType] = React.useState(false);

    const registrationPastDaysOpen = () => {
        setregistrationPastDays(true);
    };
    const registrationPastDaysClose = () => {
        setregistrationPastDays(false);
    };
  
    const sellerTypeOpen = () => {
        setsellerType(true);
    };
    const sellerTypeClose = () => {
        setsellerType(false);
    };
   

    const handleChange = (e) => {
        const { name, value } = e.target
        setFilterValue({ ...filterValue, [name]: value });
    };
    console.log('filterValue', filterValue)
    return (
        <Box style={{ backgroundColor: "white" }} className="bottomborder" mb={3} pt={2}>
            <Grid container spacing={2} p={2} pt={0} >
                <Grid item sm={12} md={3}>

                    <Box onClick={registrationPastDaysOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Registration Date and Time</Typography>
                        <ArrowDropDownIcon />

                    </Box>
                </Grid>

                <Grid item sm={12} md={3}>
                    <SelectDropdown
                        value={filterValue?.selectSearch || ""}
                        name="selectSearch"
                        onChange={handleChange}
                        options={searchOptions}
                        placeholder="Select field..."
                    />

                </Grid>
                {filterValue?.selectSearch && <Grid item sm={12} md={2}>
                    <InputFieldWithIcon
                        // icon={<SearchIcon />}
                        value={filterValue?.searchValue || ""}
                        name="searchValue"
                        onChange={handleChange}
                        placeholder="Search..."
                    />
                </Grid>}
                {/* <Grid item sm={12} md={2}>
                    <InputFieldWithIcon
                        // icon={<SearchIcon />}
                        value={filterValue?.searchFilter || ""}
                        name="searchFilter"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search filter..."
                    />
                </Grid>
                <Grid item sm={12} md={2}>
                    <Box onClick={() => setSearchFilter(filterValue?.searchFilter)} style={{ cursor: "pointer", padding: "2px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"100px"} >
                        <Typography color={"white"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Search</Typography>
                    </Box>
                </Grid> */}
                
               
                <Grid item sm={12} md={2}>

                    <Box onClick={sellerTypeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                        style={{ cursor: "pointer", border: searchFilter?.includes("sellerType") ? "2px solid blue" : "1px solid #CDCDCD" }}
                    >
                        <Typography fontSize={"14px"} color={"#707070"}>Seller Type</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>



                <Box width={"100%"} display={"flex"} justifyContent={"end"} mt={3}>
                    <Box style={{ cursor: "pointer", padding: "5px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"100px"} mr={1} >
                        <Typography color={"#FF9F59"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                    </Box>
                    <Box style={{ cursor: "pointer", padding: "5px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"100px"} >
                        <Typography color={"white"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                    </Box>
                </Box>

            </Grid>
            <SellerRegistrationPastDaysModal registrationPastDays={registrationPastDays} registrationPastDaysClose={registrationPastDaysClose} />
           
            <SellerTypekModal sellerType={sellerType} sellerTypeClose={sellerTypeClose} />
           
        </Box>
    )
}

export default SellerFilter
