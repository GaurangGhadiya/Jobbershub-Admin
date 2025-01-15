import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SearchIcon from '@mui/icons-material/Search';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RemoveIcon from '@mui/icons-material/Remove';
import { createTheme, FormControl, Grid, InputAdornment, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material';
import Image from 'next/image';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { DesktopDatePicker, DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        height: '30px',
                        fontSize: '14px'// Set the height globally
                    },
                },
            },
        },
    },
});


export default function CallModal({ openCallModal, handleCallModalClose }) {
    const [openClose, setOpenClose] = React.useState(false)
    const [filterData, setFilterData] = React.useState({ reg_end_date: null, reminder_time: null });
    const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false); // Control Date Picker open state
    const [isTimePickerOpen, setIsTimePickerOpen] = React.useState(false); // Control Time Picker open state

    const handleTextareaKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent newline
            setIsDatePickerOpen(true); // Open Date Picker
        }
    };

    const handleDateChange = (newValue) => {
        setFilterData({ ...filterData, reg_end_date: dayjs(newValue).format("YYYY-MM-DD") });
        setIsDatePickerOpen(false); // Close Date Picker
        setIsTimePickerOpen(true); // Open Time Picker
    };

    const handleTimeChange = (newValue) => {
        setFilterData({ ...filterData, reminder_time: dayjs(newValue).format("HH:mm") });
        // setIsTimePickerOpen(false); // Close Time Picker
    };


    return (
        <React.Fragment>

            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                // open={true}
                open={openCallModal}
                onClose={handleCallModalClose}
            >
                <DialogContent >
                    <ThemeProvider theme={theme}>


                        <Box border={"1px solid #777777"} p={1} display={"flex"}>
                            <Box>
                                <Typography color={"#3F3E3E"} fontWeight={300} fontSize={"16px"}>Lead Date: 10/02/2025</Typography>
                                <Typography color={"#3F3E3E"} fontWeight={300} fontSize={"16px"} mt={1}>Client Name: Rakesh Sharma</Typography>
                            </Box>
                            <Box ml={5}>
                                <Typography color={"#3F3E3E"} fontWeight={300} fontSize={"16px"}>Product: Angel One</Typography>
                                <Typography color={"#3F3E3E"} fontWeight={300} fontSize={"16px"} mt={1}>Mobile Number: +91 8824248100</Typography>
                            </Box>

                        </Box>

                        <Box border={"1px solid #777777"} p={2} mt={1}>
                            <Typography fontSize={16} fontWeight={300} color={"#3F3E3E"} textAlign={"right"}>10 Jan 2025</Typography>
                            <Box display={"flex"} justifyContent={"start"} alignItems={"center"} mb={0} mt={-3}>
                                <Typography color={"#828282"} fontWeight={700} fontSize={"30px"}>5.</Typography>
                                <Box display={"flex"} justifyContent={"start"} alignItems={"center"} ml={35} position={"relative"}>
                                    <Box height={10} width={10} backgroundColor="#D20000" borderRadius={"25px"} position={"absolute"} top={12} left={-9}></Box>
                                    <Typography color={"#000000"} fontWeight={700} fontSize={"30px"}>Rec</Typography>
                                    <Typography color={"#D20000"} fontWeight={700} fontSize={"50px"} ml={2} mr={1}>10:20</Typography>
                                    <GraphicEqIcon style={{ color: "#D20000", fontSize: "50px" }} />
                                    <Box border={"2px solid #FFC61A"} borderRadius={"4px"} ml={2}><Typography color={"#FFC61A"} fontWeight={600} fontSize={"14px"} padding={"5px 15px"}>Hold</Typography></Box>
                                    <Box border={"2px solid #000000"} borderRadius={"4px"} mx={1.5}><Typography color={"#000000"} fontWeight={600} fontSize={"14px"} padding={"5px 15px"}>Mute</Typography></Box>
                                    <Box border={"2px solid #D20000"} backgroundColor="#D20000" borderRadius={"4px"}><Typography color={"white"} fontWeight={600} fontSize={"14px"} padding={"5px 15px"}>End Call</Typography></Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box border={"1px solid #777777"} mt={1}>
                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} backgroundColor="#F4F4F4" p={2}>
                                <Typography color={"#000000"} fontSize={"16px"} fontWeight={500}>Last Communication</Typography>
                                {openClose ? <RemoveIcon style={{ fontSize: "22px" }} onClick={() => setOpenClose(!openClose)} /> :
                                    <AddIcon style={{ fontSize: "22px" }} onClick={() => setOpenClose(!openClose)} />}
                            </Box>
                            {openClose && <>
                                <Grid container spacing={2} p={2}>
                                    <Grid item sx={12} md={1.7}>
                                        <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Call Date</Typography>

                                        <Box borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                                            style={{ cursor: "pointer", border: "1px solid #CDCDCD" }}
                                        >
                                            <Typography fontSize={"14px"} color={"#707070"}>Today</Typography>
                                            <ArrowDropDownIcon />
                                        </Box>
                                    </Grid>
                                    <Grid item sx={12} md={1.7}>
                                        <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Call Summery</Typography>

                                        <Box borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                                            style={{ cursor: "pointer", border: "1px solid #CDCDCD" }}
                                        >
                                            <Typography fontSize={"14px"} color={"#707070"}>Today</Typography>
                                            <ArrowDropDownIcon />
                                        </Box>
                                    </Grid>
                                    <Grid item sx={12} md={1.7}>
                                        <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Reminder Date</Typography>

                                        <Box borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                                            style={{ cursor: "pointer", border: "1px solid #CDCDCD" }}
                                        >
                                            <Typography fontSize={"14px"} color={"#707070"}>Today</Typography>
                                            <ArrowDropDownIcon />
                                        </Box>
                                    </Grid>
                                    <Grid item sx={12} md={1.7}>
                                        <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Reminder Time</Typography>

                                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                            <Box borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                                                style={{ cursor: "pointer", border: "1px solid #CDCDCD" }}
                                            >
                                                <Typography fontSize={"14px"} color={"#707070"}>From</Typography>
                                                <ArrowDropDownIcon />
                                            </Box>
                                            <Box borderRadius={"4px"} border={"1px solid #CDCDCD"} ml={1} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                                                style={{ cursor: "pointer", border: "1px solid #CDCDCD" }}
                                            >
                                                <Typography fontSize={"14px"} color={"#707070"}>To</Typography>
                                                <ArrowDropDownIcon />
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item sx={12} md={1.7}>
                                        <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Action By</Typography>

                                        <Box borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                                            style={{ cursor: "pointer", border: "1px solid #CDCDCD" }}
                                        >
                                            <Typography fontSize={"14px"} color={"#707070"}>Rahul Kumar</Typography>
                                            <ArrowDropDownIcon />
                                        </Box>
                                    </Grid>

                                    <Grid item sm={12} md={3.5}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            placeholder='Search'
                                            label=""
                                            // value={filterValue?.searchValue || ""}
                                            name="searchValue"
                                            // onChange={handleChange}

                                            style={{ marginBottom: "10px", marginTop: "15px", width: "100%" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <Box onClick={() => { }} style={{ cursor: "pointer", padding: "2px 19px 0 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"100%"} >
                                                            <Typography color={"white"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Search</Typography>
                                                        </Box>                              </InputAdornment>
                                                ),
                                            }}
                                            variant="standard"
                                        />
                                    </Grid>

                                </Grid>
                                <Box width={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={2} pt={0}>
                                    <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                                        <Typography>Show</Typography>
                                        <Box mx={1}>
                                            <FormControl sx={{ minWidth: 90 }}>
                                                <Select
                                                    value={2}
                                                    // value={filterData?.pagesize}
                                                    // onChange={(e) => setFilterData({ ...filterData, pagesize: e.target.value })}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    sx={{
                                                        height: "30px", // Adjust the height of the select box
                                                        "& .MuiSelect-select": {
                                                          padding: "5px 12px", // Adjust padding for better alignment
                                                        },
                                                      }}
                                                >
                                                    <MenuItem value={2}>2</MenuItem>
                                                    <MenuItem value={5}>5</MenuItem>
                                                    <MenuItem value={10}>10</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Typography>entries</Typography>
                                    </Box>
                                    <Box display={"flex"} justifyContent={"end"}>
                                        <Box style={{ cursor: "pointer", padding: "5px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"140px"} mr={1} >
                                            <Typography color={"#FF9F59"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                                        </Box>
                                        <Box style={{ cursor: "pointer", padding: "5px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"140px"} >
                                            <Typography color={"white"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Apply Filter</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </>}
                        </Box>


                        <Box border={"1px solid #777777"} mt={1}>
                            <Box overflow={"hidden"}>
                                <TableContainer component={Box} style={{
                                    maxHeight: '600px', // Fixed height for vertical scroll
                                    maxWidth: '100%', // Optional: Limit the width if necessary
                                    overflowX: 'auto', // Enable horizontal scrolling only inside the table container
                                    overflowY: 'auto', // Enable vertical scrolling inside the table container
                                    fontSize: '16px',
                                }}>

                                    <Table stickyHeader style={{ tableLayout: 'fixed', width: '100%', backgroundColor: "white" }} sx={{
                                        borderCollapse: "separate", // Ensure no border styles from default behavior
                                    }}
                                    >
                                        <TableHead style={{ backgroundColor: "white" }}>
                                            <TableRow>
                                                <TableCell style={{ borderRight: "none" }} width={15} >#</TableCell>
                                                <TableCell style={{ borderRight: "none" }} width={140} >Call Date</TableCell>
                                                <TableCell style={{ borderRight: "none" }} width={120} >Call Summery</TableCell>
                                                <TableCell style={{ borderRight: "none" }} width={120} >Call Duration</TableCell>
                                                <TableCell style={{ borderRight: "none" }} width={80} >Recording</TableCell>
                                                <TableCell style={{ borderRight: "none" }} width={120} >Note</TableCell>
                                                <TableCell style={{ borderRight: "none" }} width={180} >Reminder Date & Time</TableCell>
                                                <TableCell style={{ borderRight: "none" }} width={120} >Action</TableCell>
                                                <TableCell style={{ borderRight: "none" }} width={115} >Action by</TableCell>
                                            </TableRow>

                                        </TableHead>

                                        <TableBody>
                                            {[1, 2]?.map((row, id) => (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    style={{ textAlign: "left" }}>
                                                    <TableCell style={{ borderRight: "none" }} align="left">{id + 1}</TableCell>
                                                    <TableCell style={{ borderRight: "none" }} align="left">1/1/2026 10:30AM</TableCell>
                                                    <TableCell style={{ borderRight: "none" }} align="left">Lorem ipsum</TableCell>
                                                    <TableCell style={{ borderRight: "none" }} align="left">10 Minutes</TableCell>
                                                    <TableCell style={{ borderRight: "none" }} align="left">
                                                        <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                                                            <VolumeMuteIcon style={{ color: "#FF8C38" }} />
                                                            <DownloadIcon style={{ color: "#FF8C38" }} />
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell style={{ borderRight: "none" }} align="left">Lorem ipsum</TableCell>
                                                    <TableCell style={{ borderRight: "none" }} align="left">1/1/2026 10:30AM</TableCell>
                                                    <TableCell style={{ borderRight: "none" }} align="left">
                                                        <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                                                            <Box height={30} width={30} backgroundColor="#E4E4FF" borderRadius={"4px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                                <VisibilityIcon style={{ color: "#8280FF", fontSize: "16px" }} />
                                                            </Box>
                                                            <Box height={30} width={30} backgroundColor="#FFE8D8" borderRadius={"4px"} display={"flex"} justifyContent={"center"} alignItems={"center"} mx={1}>
                                                                <CreateIcon style={{ color: "#ED6A0F", fontSize: "16px" }} />
                                                            </Box>
                                                            <Box height={30} width={30} backgroundColor="#FFD4D4" borderRadius={"4px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                                <DeleteIcon style={{ color: "#D20000", fontSize: "16px" }} />
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell style={{ borderRight: "none" }} align="left">Rahul Kumar</TableCell>
                                                </TableRow>
                                            ))}

                                        </TableBody>


                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>


                        <Grid container spacing={2} pt={1}>
                            <Grid item sx={12} md={1.7}>
                                <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Call Summery</Typography>

                                <Box borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                                    style={{ cursor: "pointer", border: "1px solid #CDCDCD" }}
                                >
                                    <Typography fontSize={"14px"} color={"#707070"}>Verification</Typography>
                                    <ArrowDropDownIcon />
                                </Box>
                            </Grid>
                        </Grid>


                        <Grid container spacing={2} pt={1}>
                            <Grid item sm={12} md={7}>
                                <Typography fontWeight={400} fontSize={"16px"} color={"#000000"}>Add new Note For Followup</Typography>
                                <textarea style={{ border: "1px solid #D20000", padding: "10px", width: "100%" }} rows="6" placeholder="Add new Not here" onKeyDown={handleTextareaKeyDown} // Handle Enter key press
                                ></textarea>
                            </Grid>
                            <Grid item sm={12} md={5}>
                                <Typography fontWeight={400} fontSize={"16px"} color={"#000000"}>Set Reminder</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <Box border={"1px solid #E4E4E4"} p={2}>
                                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                            <Typography color={"#727272"} fontSize={14} fontWeight={400}>Select Date</Typography>
                                            {/* <Box border={"1px solid #E4E4E4"}><Typography color={"#727272"} fontSize={12} fontWeight={300} py={0.5} px={3}>1/1/2025</Typography></Box>
                                    <CalendarMonthIcon style={{ color: "#FF8C38" }} /> */}
                                            <DesktopDatePicker
                                                open={isDatePickerOpen} // Control open state
                                                onClose={() => setIsDatePickerOpen(false)} // Close when the dialog is dismissed
                                                value={filterData?.reg_end_date ? dayjs(filterData.reg_end_date) : null}
                                                onChange={handleDateChange} // Handle date selection
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Box>
                                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1.3}>
                                            <Typography color={"#727272"} fontSize={14} fontWeight={400}>Select Time</Typography>
                                            {/* <Box border={"1px solid #E4E4E4"}><Typography color={"#727272"} fontSize={12} fontWeight={300} py={0.5} px={3}>10:30AM</Typography></Box> */}
                                            {/* <AccessTimeIcon style={{ color: "#FF8C38" }} /> */}
                                            <DesktopTimePicker
                                                open={isTimePickerOpen} // Control open state
                                                onClose={() => setIsTimePickerOpen(false)} // Close when the dialog is dismissed
                                                value={filterData?.reminder_time ? dayjs(filterData.reminder_time, "HH:mm") : null}
                                                onChange={handleTimeChange} // Handle time selection
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                        </Box>

                                    </Box>
                                </LocalizationProvider>
                            </Grid>

                        </Grid>
                        <Box width={"100%"} display={"flex"} justifyContent={"end"} pt={1}>
                            <Box style={{ cursor: "pointer", padding: "5px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"140px"} mr={1} onClick={handleCallModalClose}>
                                <Typography color={"#FF9F59"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Cancel</Typography>
                            </Box>
                            <Box style={{ cursor: "pointer", padding: "5px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"140px"} onClick={handleCallModalClose}>
                                <Typography color={"white"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                            </Box>
                        </Box>

                    </ThemeProvider>

                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}
