"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/transaction/transactions";
import { Grid, TableContainer, Paper, Typography, Box, TextField, Button } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx';
import GetAppIcon from '@mui/icons-material/GetApp';

const getDate = (timeZone) => {
    const dateString = timeZone;
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
};

function TransactionReport(props) {
    const [showServiceTrans, setShowServiceTrans] = useState([]);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTransaction, setFilteredTransaction] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    let rows = showServiceTrans.length > 0 ? [...showServiceTrans] : [];

    useEffect(() => {
        const getTnx = async () => {
            try {
                const response = await api.post("/api/report/get-transaction-report", reqData);
                console.log(response.data.data);
                if (response.status === 200) {
                    setShowServiceTrans(response.data.data);
                    setFilteredTransaction(response.data.data);
                }
            } catch (error) {
                if (error?.response?.data?.error) {
                    dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
                } else {
                    dispatch(callAlert({ message: error.message, type: 'FAILED' }));
                }
            }
        };
        getTnx();
    }, []);

    useEffect(() => {
        if (fromDate && toDate) {
            const filtered = showServiceTrans.filter(transaction => {
                const entryDate = dayjs(transaction.entry_date).format('YYYY-MM-DD');
                return entryDate >= dayjs(fromDate).format('YYYY-MM-DD') && entryDate <= dayjs(toDate).format('YYYY-MM-DD');
            });
            setFilteredTransaction(filtered);
        } else {
            setFilteredTransaction(showServiceTrans);
        }
    }, [fromDate, toDate, showServiceTrans]);

    // Excel export 
    const [fileName, setFileName] = useState('redeem_report.xlsx');

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(showServiceTrans);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, fileName);
    };

    const filteredRows = rows.filter(row => {
        return (
            (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row.last_name && row.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
            (row.mobile && row.mobile.includes(searchTerm))
        );
    });

    return (
        <Layout>
            <Grid container spacing={4} sx={{ padding: 2 }}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{ width: '30%', verticalAlign: 'top' }}>
                            <Typography variant="h5" sx={{ padding: 2 }}>Transaction Report</Typography>
                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={3} mb={1} sx={{ width: '20%', verticalAlign: 'top' }}>
                            <TextField
                                id="standard-basic"
                                placeholder="Search"
                                variant="standard"
                                mt={2}
                                style={{ width: '100%' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: <SearchIcon />,
                                }}
                            />
                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={1} sx={{ verticalAlign: 'top' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div>
                                    <DatePicker
                                        label="From Date"
                                        value={fromDate}
                                        sx={{ padding: 1, lineHeight: 20 }}
                                        onChange={(newValue) => setFromDate(newValue)} // Update this line
                                        InputProps={{ inputProps: { max: dayjs().format('YYYY-MM-DD') } }}
                                    />
                                    <DatePicker
                                        label="To Date"
                                        value={toDate}
                                        sx={{ padding: 1, lineHeight: 20 }}
                                        onChange={(newValue) => setToDate(newValue)} // Update this line
                                        InputProps={{ inputProps: { max: dayjs().format('YYYY-MM-DD') } }}
                                    />
                                </div>
                            </LocalizationProvider>
                        </Box>

                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'center'} mt={2} mb={1} sx={{ verticalAlign: 'middle' }}>
                            <Button onClick={exportToExcel} variant="contained" color="primary">
                                <GetAppIcon /> EXCEL
                            </Button>
                        </Box>
                    </TableContainer>
                </Grid>
            </Grid>
            <Transactions showServiceTrans={filteredRows} exportToExcel={exportToExcel} />
        </Layout>
    );
}

export default withAuth(TransactionReport);
