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

export default function SponserRankModal({ sponserRank, sponserRankClose }) {



    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={sponserRankClose}
                // aria-labelledby="customized-dialog-title"
                open={sponserRank}
            // fullWidth={true}
            // maxWidth={'xxs'}
            >

                <DialogContent>


                    <Box display={"flex"} justifyContent={"space-between"} px={2}>
                        <Box>
                            <Typography mt={1} >Select All</Typography>
                            <Typography mt={2.5}>Team Leader</Typography>
                            <Typography mt={2.5}>Assistant Manager</Typography>
                            <Typography mt={2}>Manager</Typography>
                            <Typography mt={2.5}>Zonal Head</Typography>
                            <Typography mt={2}>National Head Promoter</Typography>
                        </Box>
                        <FormControl>
                            <RadioGroup
                                // row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="top"
                            >
                                <FormControlLabel labelPlacement="start" value="female" control={<Radio />} label="" />
                                <FormControlLabel labelPlacement="start" value="male" control={<Radio />} label="" />
                                <FormControlLabel labelPlacement="start" value="other" control={<Radio />} label="" />
                                <FormControlLabel labelPlacement="start" value="other" control={<Radio />} label="" />
                                <FormControlLabel labelPlacement="start" value="other" control={<Radio />} label="" />
                                <FormControlLabel labelPlacement="start" value="other" control={<Radio />} label="" />
                            </RadioGroup>
                        </FormControl>
                    </Box>


                    <Box width={"100%"} display={"flex"} justifyContent={"space-around"} mt={4}>
                        <Box style={{ cursor: "pointer", padding: "11px 29px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"70px"} mr={1} onClick={sponserRankClose}>
                            <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "11px 29px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"70px"} ml={1} onClick={sponserRankClose}>
                            <Typography color={"white"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                        </Box>
                    </Box>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
