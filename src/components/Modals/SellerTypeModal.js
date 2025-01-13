import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function SellerTypekModal({ sellerType, sellerTypeClose }) {



    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={sellerTypeClose}
                // aria-labelledby="customized-dialog-title"
                open={sellerType}
            // fullWidth={true}
            // maxWidth={'xxs'}
            >

                <DialogContent>


                    <Box display={"flex"} justifyContent={"space-between"} px={2}>
                        <Box>
                            <Typography mt={1} >Select All</Typography>
                            <Typography mt={2.5}>Prepaid</Typography>
                            <Typography mt={2.5}>Postpaid</Typography>
                         
                        </Box>
                        <FormControl>
                            <RadioGroup
                                // row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="top"
                            >
                                <FormControlLabel labelPlacement="start" value="all" control={<Radio />} label="" />
                                <FormControlLabel labelPlacement="start" value="Prepaid" control={<Radio />} label="" />
                                <FormControlLabel labelPlacement="start" value="Postpaid" control={<Radio />} label="" />
                               
                            </RadioGroup>
                        </FormControl>
                    </Box>


                    <Box width={"100%"} display={"flex"} justifyContent={"space-around"} mt={4}>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"130px"} mr={1} onClick={sellerTypeClose}>
                            <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"130px"} ml={1} onClick={sellerTypeClose}>
                            <Typography color={"white"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                        </Box>
                    </Box>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
