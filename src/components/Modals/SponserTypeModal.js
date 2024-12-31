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

export default function SponserTypeModal({ sponserType, sponserTypeClose }) {



    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={sponserTypeClose}
                // aria-labelledby="customized-dialog-title"
                open={sponserType}
                // fullWidth={true}
                // maxWidth={'xxs'}
            >
 <DialogTitle>
                    Sponser Type
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
                            <Box mt={2.5} display={"flex"} alignItems={"center"} justifyContent={"start"}><PushPinOutlinedIcon /><Typography ml={1}>Normal</Typography></Box>
                            <Box mt={2.5} display={"flex"} alignItems={"center"} justifyContent={"start"}><PushPinOutlinedIcon /><Typography ml={1}>Prime</Typography></Box>

                        </Box>
                        <FormControl>
                        <RadioGroup
                            // row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel labelPlacement="start" value="female" control={<Checkbox />} label="" />
                            <FormControlLabel labelPlacement="start" value="male" control={<Checkbox />} label="" />
                            <FormControlLabel labelPlacement="start" value="other" control={<Checkbox />} label="" />
                        </RadioGroup>
                    </FormControl>
                    </Box>


                    <Box width={"100%"} display={"flex"} justifyContent={"space-around"} mt={4}>
                        <Box style={{ cursor: "pointer", padding: "11px 29px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"120px"} mr={1} onClick={sponserTypeClose}>
                            <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "11px 29px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"120px"} ml={1} onClick={sponserTypeClose}>
                            <Typography color={"white"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                        </Box>
                    </Box>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
