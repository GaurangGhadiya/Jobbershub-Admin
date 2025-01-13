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

export default function TotalEarningModal({filterData,setFilterData,  totalEarning, totalEarningClose }) {

    const [internalState, setInternalState] = React.useState({
        totalearning_filter : "tillDate",

    })

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

            {/* <BootstrapDialog
                onClose={totalEarningClose}
                open={pendingLeads}
            > */}


            {totalEarning && <ClickAwayListener onClickAway={totalEarningClose}>
                <Box boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.2)"} zIndex={99999} backgroundColor="white" border={"1px solid #CDCDCD"} p={2} borderRadius={"4px"} position={"absolute"} top={80} width={450}>
                <Typography mb={1} fontSize={"20px"}>
                    By Period
                </Typography>
                <Box>
                    <Box display={"flex"} flexWrap={"wrap"}>
                                {box.map(v => (<Box key={v?.title} borderRadius={"4px"} padding={"7px 10px"} textAlign={"center"} mr={2} mb={2}
                                 style={{ cursor: "pointer", border : v?.value == internalState?.totalearning_filter ? "1px solid #ED6A0F" :"1px solid black",

                                    color : v?.value == internalState?.totalearning_filter ? "#ED6A0F" :"black",
                                  }}
                                    onClick={() => setInternalState({ ...internalState, totalearning_filter : v?.value})}
                        >
                                <Typography>{v?.title}</Typography>
                            </Box>))}
                        </Box>
                        {internalState?.totalearning_filter == "custom" &&  <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Box mr={1}>
                                    <Typography>From</Typography>
                                    <DesktopDatePicker value={dayjs(internalState?.totalearning_start_date) ?? dayjs('2025-01-01')}
                                        onChange={(newValue) => setInternalState({ ...internalState, totalearning_start_date : dayjs(newValue).format("YYYY-MM-DD")})} />
                                </Box>
                                <Box ml={1}>
                                    <Typography>To</Typography>
                                    <DesktopDatePicker value={dayjs(internalState?.totalearning_end_date) ?? dayjs('2025-01-01')}
                                        onChange={(newValue) => setInternalState({ ...internalState, totalearning_end_date : dayjs(newValue).format("YYYY-MM-DD")})} />
                                </Box>
                            </Box>
                        </LocalizationProvider>}
    
    
                    </Box>
                <Typography mt={2} fontSize={"20px"}>
                By Investment Active Income
                </Typography>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={2}>
                        <Box display={"flex"} justifyContent={"space-between"} >
                            <Typography mr={1} mt={0.5}>Above</Typography>
                            <input type='number' value={internalState?.totalearning_above} onChange={(e) => setInternalState({...internalState, totalearning_above : e.target.value })} style={{ borderRadius: "2px", border: "1px solid #000000", padding: "5px 10px", fontSize: "16px", width: "120px" }} />
                        </Box>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Typography mr={1} mt={0.5}>Below</Typography>
                            <input type='number' value={internalState?.totalearning_below}  onChange={(e) => setInternalState({...internalState, totalearning_below : e.target.value })} style={{ borderRadius: "2px", border: "1px solid #000000", padding: "5px 10px", fontSize: "16px", width: "120px" }} />
                        </Box>
                    </Box>


                <Box width={"100%"} display={"flex"} justifyContent={"end"} mt={4}>
                    <Box style={{ cursor: "pointer", padding: "7px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"120px"} mr={1} onClick={totalEarningClose}>
                        <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                    </Box>
                    <Box style={{ cursor: "pointer", padding: "7px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"120px"} ml={1} onClick={totalEarningClose}>
                        <Typography color={"white"} fontSize={"18px"} textAlign={"center"} fontWeight={500}
                        onClick={e => setFilterData({...filterData, ...internalState})}

                        >Submit</Typography>
                    </Box>
                </Box>
            </Box>
            </ClickAwayListener>
            }

            {/* </BootstrapDialog> */}
        </React.Fragment>
    );
}
