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
import { Box, ClickAwayListener } from '@mui/material';
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

export default function AuthorizationPastDaysModal({filterData,setFilterData, authorizationPastDays, authorizationPastDaysClose }) {

    let box = [{ title: "Today’s", value: "today" },
        { title: "Yesterday’s", value: "yesterday" },
        { title: "Past 7 Days", value: "past_7_days" },
        { title: "Past 15 Days", value: "past_15_days" },
        { title: "Past 30 Days", value: "past_30_days" },
        { title: "Till Date", value: "tillDate" },
        { title: "Custom", value: "custom" },
        ]

    return (
        <React.Fragment>
              {authorizationPastDays == true &&
                          <ClickAwayListener onClickAway={authorizationPastDaysClose}>

              <Box boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.2)"} zIndex={11} backgroundColor="white" border={"1px solid #CDCDCD"} p={2} borderRadius={"4px"} position={"absolute"} width={400} >
                <Typography  sx={{ m: 0, p: 0 }} fontSize={"23px"}>
                By Period
                </Typography>
                <Box>
                <Box display={"flex"} flexWrap={"wrap"}>
                                {box.map(v => (<Box key={v?.title} borderRadius={"4px"} padding={"7px 10px"} textAlign={"center"} mr={2} mb={2}
                                 style={{ cursor: "pointer", border : v?.value == filterData?.authorization_date_filter ? "1px solid #ED6A0F" :"1px solid black",

                                    color : v?.value == filterData?.authorization_date_filter ? "#ED6A0F" :"black",
                                  }}
                                    onClick={() => setFilterData({ ...filterData, authorization_date_filter : v?.value})}
                        >
                                <Typography>{v?.title}</Typography>
                            </Box>))}
                        </Box>
                        {filterData?.authorization_date_filter == "custom" &&  <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Box mr={1}>
                                    <Typography>From</Typography>
                                    <DesktopDatePicker format='DD-MM-YYYY' value={dayjs(filterData?.authorization_start_date) ?? dayjs('2025-01-01')}
                                        onChange={(newValue) => setFilterData({ ...filterData, authorization_start_date : dayjs(newValue).format("YYYY-MM-DD")})} />
                                </Box>
                                <Box ml={1}>
                                    <Typography>To</Typography>
                                    <DesktopDatePicker format='DD-MM-YYYY' value={dayjs(filterData?.authorization_end_date) ?? dayjs('2025-01-01')}
                                        onChange={(newValue) => setFilterData({ ...filterData, authorization_end_date : dayjs(newValue).format("YYYY-MM-DD")})} />
                                </Box>
                            </Box>
                        </LocalizationProvider>}

                    <Box width={"100%"} display={"flex"} justifyContent={"end"} mt={3}>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"100px"} mr={1} onClick={authorizationPastDaysClose}>
                            <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"122px"} onClick={authorizationPastDaysClose}>
                            <Typography color={"white"} fontSize={"17px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                        </Box>
                    </Box>
                    
                </Box>
            </Box>
            </ClickAwayListener>
            }

            {/* <BootstrapDialog
                onClose={authorizationPastDaysClose}
                // aria-labelledby="customized-dialog-title"
                open={authorizationPastDays}
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
                                <DesktopDatePicker format='DD-MM-YYYY' defaultValue={dayjs('2022-04-17')} />
                            </Box>
                            <Box ml={1}>
                                <Typography>To</Typography>
                                <DesktopDatePicker format='DD-MM-YYYY' defaultValue={dayjs('2022-04-17')} />
                            </Box>
                        </Box>
                    </LocalizationProvider>


                    <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={2}>
                        <Box style={{ cursor: "pointer", padding: "4px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"122px"} onClick={authorizationPastDaysClose}>
                            <Typography color={"white"} fontSize={"17px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                        </Box>
                    </Box>
                </DialogContent>

            </BootstrapDialog> */}
        </React.Fragment>
    );
}
