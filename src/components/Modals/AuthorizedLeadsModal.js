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

export default function AuthorizedLeadsModal({ authorized, authorizedClose }) {



    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={authorizedClose}
                // aria-labelledby="customized-dialog-title"
                open={authorized}
                // fullWidth={true}
                // maxWidth={'xxs'}
            >

                <DialogContent>

                   <Box display={"flex"} justifyContent={"space-between"}>
                            <Typography mt={0.5}>Below</Typography>
                            <input type='number' style={{borderRadius : "20px", border : "1px solid #000000", padding : "5px 10px", fontSize : "16px"}} />
                   </Box>
                   <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                            <Typography mt={0.5}>Above</Typography>
                            <input type='number' style={{borderRadius : "20px", border : "1px solid #000000", padding : "5px 10px", fontSize : "16px"}} />
                   </Box>

                    <Box width={"100%"} display={"flex"} justifyContent={"space-around"} mt={4}>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"70px"} mr={1} onClick={authorizedClose}>
                            <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"70px"} ml={1} onClick={authorizedClose}>
                            <Typography color={"white"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                        </Box>
                    </Box>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
