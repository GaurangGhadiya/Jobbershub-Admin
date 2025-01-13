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

export default function UplineCountModal({filterData,setFilterData, uplineCount, uplineCountClose }) {

    const [internalState, setInternalState] = React.useState({})


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
              

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={2}>
                        <Box display={"flex"} justifyContent={"space-between"} >
                            <Typography mr={1} mt={0.5}>Above</Typography>
                            <input type='number' value={internalState?.upline_count_above} onChange={(e) => setInternalState({...internalState, upline_count_above : e.target.value })} style={{ borderRadius: "2px", border: "1px solid #000000", padding: "5px 10px", fontSize: "16px", width: "120px" }} />
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Typography mr={1} mt={0.5}>Below</Typography>
                            <input type='number' value={internalState?.upline_count_below}  onChange={(e) => setInternalState({...internalState, upline_count_below : e.target.value })} style={{ borderRadius: "2px", border: "1px solid #000000", padding: "5px 10px", fontSize: "16px", width: "120px" }} />
                        </Box>
                    </Box>

                    <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={4}>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"120px"} mr={1} onClick={uplineCountClose}>
                            <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"120px"} ml={1} onClick={uplineCountClose}>
                            <Typography color={"white"} fontSize={"18px"} textAlign={"center"} fontWeight={500}
                                                    onClick={e => setFilterData({...filterData, ...internalState})}

                            >Submit</Typography>
                        </Box>
                    </Box>
                </DialogContent>
            

            </BootstrapDialog>
        </React.Fragment>
    );
}
