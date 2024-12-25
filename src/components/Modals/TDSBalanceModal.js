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

export default function TDSBalanceModal({ tdsBalance, tdsBalanceClose }) {

    let box = [
        // { title: "Today’s", value: "today" },
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
                onClose={tdsBalanceClose}
                // aria-labelledby="customized-dialog-title"
                open={tdsBalance}
                fullWidth={true}
                maxWidth={'xs'}
            >
                <DialogTitle sx={{ m: 0, p: 2, pb: 1 }} fontSize={"23px"}>
                    By Income
                </DialogTitle>
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
                <DialogTitle sx={{ m: 0, p: 2 }} fontSize={"23px"}>
                    By Period
                </DialogTitle>
                <DialogContent>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <select name="year" id="year" style={{ height: "40px", width: "110px" }}>
                            <option value="" selected disabled>Year</option>
                            <option value="1990">1990</option>
                            <option value="1991">1991</option>
                            <option value="1992">1992</option>
                            <option value="1993">1993</option>
                            <option value="1994">1994</option>
                            <option value="1995">1995</option>
                            <option value="1996">1996</option>
                            <option value="1997">1997</option>
                            <option value="1998">1998</option>
                            <option value="1999">1999</option>
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                            <option value="2003">2003</option>
                            <option value="2004">2004</option>
                            <option value="2005">2005</option>
                            <option value="2006">2006</option>
                            <option value="2007">2007</option>
                            <option value="2008">2008</option>
                            <option value="2009">2009</option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>

                        </select>
                        <select name="year" id="year" style={{ height: "40px", width: "110px" }}>
                            <option value="" selected disabled>Month</option>
                            <option value="january">January</option>
                            <option value="february">February</option>
                            <option value="march">March</option>
                            <option value="april">April</option>
                            <option value="may">May</option>
                            <option value="june">June</option>
                            <option value="july">July</option>
                            <option value="august">August</option>
                            <option value="september">September</option>
                            <option value="october">October</option>
                            <option value="november">November</option>
                            <option value="december">December</option>


                        </select>
                        <Box border={"1px solid black"} borderRadius={"4px"} padding={"7px 10px"} textAlign={"center"} mr={2} mb={2} style={{ cursor: "pointer" }}>
                            <Typography>Custom</Typography>
                        </Box>
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


                    <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={3}>
                        <Box style={{ cursor: "pointer", padding: "11px 29px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"70px"} mr={1} onClick={tdsBalanceClose}>
                            <Typography color={"#FF9F59"} fontSize={"18px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "11px 29px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"122px"} onClick={tdsBalanceClose}>
                            <Typography color={"white"} fontSize={"17px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                        </Box>
                    </Box>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
