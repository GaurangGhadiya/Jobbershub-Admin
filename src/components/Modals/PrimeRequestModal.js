import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { Box, Checkbox, DialogTitle, InputAdornment, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import SearchIcon from '@mui/icons-material/Search';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function PrimeRequestModal({filterData, setFilterData,  primeRequest, primeRequestClose }) {


    const [stateArray, setStateArray] = React.useState([
        // {name : "All" , checked: true},
        {name : "Accepted" , checked: true},
        {name:"Rejected",checked : true},
        {name:"Receive",checked : true},
        {name:"Not Receive",checked : true},
    ])
    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={primeRequestClose}
                // aria-labelledby="customized-dialog-title"
                open={primeRequest}
            // fullWidth={true}
            // maxWidth={'xxs'}
            >
 <DialogTitle>
                    Prime Request
                </DialogTitle>
                <DialogContent>
                <TextField
                        id="input-with-icon-textfield"
                        placeholder='Search'
                        label=""
                        style={{marginLeft : "15px", marginBottom : "10px"}}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        variant="standard"
                    />

                    <Box display={"flex"} justifyContent={"space-between"} px={2}>
                    <Box>
                            <Box mt={1} display={"flex"} alignItems={"center"} justifyContent={"start"}><PushPinOutlinedIcon /><Typography ml={1}>All</Typography></Box>
                            <Box mt={2.5} display={"flex"} alignItems={"center"} justifyContent={"start"}><PushPinOutlinedIcon /><Typography ml={1}>Accepted</Typography></Box>
                            <Box mt={2.5} display={"flex"} alignItems={"center"} justifyContent={"start"}><PushPinOutlinedIcon /><Typography ml={1}>Rejected</Typography></Box>
                            <Box mt={2.2} display={"flex"} alignItems={"center"} justifyContent={"start"}><PushPinOutlinedIcon /><Typography ml={1}>Receive</Typography></Box>
                            <Box mt={2} display={"flex"} alignItems={"center"} justifyContent={"start"}><PushPinOutlinedIcon /><Typography ml={1}>Not Receive</Typography></Box>

                        </Box>
                        <RadioGroup
                            // row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
       <FormControlLabel labelPlacement="start"  control={<Checkbox checked={stateArray?.every(v => v?.checked)} onClick={(e) => setStateArray(stateArray?.map(k =>  ({name : k?.name ,checked:true} )))}/>} label="" />

                          {stateArray?.map((v,id) =><FormControlLabel labelPlacement="start" key={id}  control={<Checkbox checked={v?.checked} onClick={(e) => setStateArray(stateArray?.map(k => k?.name == v?.name ? {name : k?.name ,checked: e.target.checked} : k))}/>} label="" />)}

                        </RadioGroup>
                    </Box>


                    <Box width={"100%"} display={"flex"} justifyContent={"space-around"} mt={4}>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"120px"} mr={1} onClick={primeRequestClose}>
                            <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"120px"} ml={1} onClick={primeRequestClose}>
                            <Typography color={"white"} fontSize={"18px"} textAlign={"center"} fontWeight={500}
                            onClick={() => setFilterData({...filterData , prime_request : stateArray?.filter(v => v?.checked)?.map(k => k?.name)})}

                            >Submit</Typography>
                        </Box>
                    </Box>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
