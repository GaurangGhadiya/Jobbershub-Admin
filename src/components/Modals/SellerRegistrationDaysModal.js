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

export default function SellerRegistrationPastDaysModal({ registrationPastDays, registrationPastDaysClose }) {

    let box = [{ title: "Today’s", value: "today" },
    { title: "Yesterday’s", value: "yesterday" },
    { title: "Past 7 Days", value: "7" },
    { title: "Past 15 Days", value: "15" },
    { title: "Past 30 Days", value: "30" },
    { title: "Till Date", value: "tillDate" },
    { title: "Custom", value: "custom" },
    ]

    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={registrationPastDaysClose}
                // aria-labelledby="customized-dialog-title"
                open={registrationPastDays}
                fullWidth={true}
                maxWidth={'xs'}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} fontSize={"23px"}>
                    By Period
                </DialogTitle>
                <DialogContent>
                    <Box display={"flex"} flexWrap={"wrap"}>
                        {box.map(v => (<Box key={v?.title} border={"1px solid black"} borderRadius={"4px"} padding={"7px 10px"} textAlign={"center"} mr={2} mb={2} style={{ cursor: "pointer" }}>
                            <Typography>{v?.title}</Typography>
                        </Box>))}
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box mr={1}>
                                <Typography>From</Typography>
                                <DesktopDatePicker defaultValue={dayjs('2022-04-17')} />
                            </Box>
                            <Box ml={1}>
                                <Typography>To</Typography>
                                <DesktopDatePicker defaultValue={dayjs('2022-04-17')} />
                            </Box>
                        </Box>
                    </LocalizationProvider>


                    <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={2}>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"122px"} onClick={registrationPastDaysClose}>
                            <Typography color={"white"} fontSize={"17px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                        </Box>
                    </Box>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
