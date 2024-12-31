import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { Box, Menu, MenuItem } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function PendingLeadsModal({ pendingLeads, pendingLeadsClose }) {
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

            {/* <BootstrapDialog
                onClose={pendingLeadsClose}
                open={pendingLeads}
            > */}


            {pendingLeads && <Box boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.2)"} zIndex={99999} backgroundColor="white" border={"1px solid #CDCDCD"} p={2} borderRadius={"4px"} position={"absolute"} top={80} width={450}>
                <Typography mb={1} fontSize={"20px"}>
                    By Period
                </Typography>
                <Box>
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


                </Box>
                <Typography mt={2} fontSize={"20px"}>
                    By Pending leads
                </Typography>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={2}>
                    <Box display={"flex"} justifyContent={"space-between"} >
                        <Typography mr={1} mt={0.5}>Above</Typography>
                        <input type='number' style={{ borderRadius: "2px", border: "1px solid #000000", padding: "5px 10px", fontSize: "16px", width: "120px" }} />
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography mr={1} mt={0.5}>Below</Typography>
                        <input type='number' style={{ borderRadius: "2px", border: "1px solid #000000", padding: "5px 10px", fontSize: "16px", width: "120px" }} />
                    </Box>
                </Box>


                <Box width={"100%"} display={"flex"} justifyContent={"end"} mt={4}>
                    <Box style={{ cursor: "pointer", padding: "7px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"120px"} mr={1} onClick={pendingLeadsClose}>
                        <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                    </Box>
                    <Box style={{ cursor: "pointer", padding: "7px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"120px"} ml={1} onClick={pendingLeadsClose}>
                        <Typography color={"white"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                    </Box>
                </Box>
            </Box>}

            {/* </BootstrapDialog> */}
        </React.Fragment>
    );
}
