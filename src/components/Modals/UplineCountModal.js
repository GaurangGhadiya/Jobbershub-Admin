import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function UplineCountModal({ uplineCount, uplineCountClose }) {

  

    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={uplineCountClose}
                // aria-labelledby="customized-dialog-title"
                open={uplineCount}
                fullWidth={true}
                maxWidth={'xs'}
            >
               <DialogTitle>
               Upline Count
                </DialogTitle>
                <DialogContent>
              

<Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={2}>
                    <Box display={"flex"} justifyContent={"start"}>
                        <Typography mt={0.5}>Below</Typography>&nbsp;&nbsp;
                        <input type='number' style={{ borderRadius: "20px", border: "1px solid #000000", padding: "5px 10px", fontSize: "16px", width: "100px" }} />
                    </Box>
                    <Box display={"flex"} justifyContent={"start"}>
                        <Typography mt={0.5}>Above</Typography>&nbsp;&nbsp;
                        <input type='number' style={{ borderRadius: "20px", border: "1px solid #000000", padding: "5px 10px", fontSize: "16px", width: "100px" }} />
                    </Box>


                </Box>


                    <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={4}>
                        <Box style={{ cursor: "pointer", padding: "11px 29px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"120px"} mr={1} onClick={uplineCountClose}>
                            <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "11px 29px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"120px"} ml={1} onClick={uplineCountClose}>
                            <Typography color={"white"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                        </Box>
                    </Box>
                </DialogContent>
            

            </BootstrapDialog>
        </React.Fragment>
    );
}
