import { Box, Button,Divider,TextField, Container, Grid, Paper,Link, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography,Image } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import api from "../../../utils/api";
import withAuth from "../../../utils/withAuth";
import { callAlert } from "../../../redux/actions/alert";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
const LineChart = dynamic(() => import('@mui/x-charts').then(mod => mod.LineChart), { ssr: false });
const axisClasses = dynamic(() => import('@mui/x-charts').then(mod => mod.axisClasses), { ssr: false });
const PieChart = dynamic(() => import('@mui/x-charts').then(mod => mod.PieChart), { ssr: false });
const BarChart = dynamic(() => import('@mui/x-charts').then(mod => mod.BarChart), { ssr: false });
// import Chart from './Chart';
// import Deposits from './Deposits';

function createData(time, amount) {
    return { time, amount: amount ?? null };
  }


  function TransactionHistory(props) {
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const dispatch = useDispatch();
    const [totalRecharge, setTotalRecharge] = useState(0.00);
    const [successRecharge, setSuccessRecharge] = useState(0.00);
    const [failedRecharge, setFailedRecharge] = useState(0.00);
    const [totalBillPayment, setTotalBillPayment] = useState(0.00);
    const [totalRechargeCount, setTotalRechargeCount] = useState(0);
    const [successRechargeCount, setSuccessRechargeCount] = useState(0);
    const [failedRechargeCount, setFailedRechargeCount] = useState(0);
    const [totalBillPaymentCount, setTotalBillPaymentCount] = useState(0);
    
    const [totalUser, setTotalUser] = useState(0);
    const [todayJoinedUser, setTodayJoinedUser] = useState(0);
    const [thisWeekJoinedUser, setThisWeekJoinedUser] = useState(0);
    const [thisMonthJoinedUser, setThisMonthJoinedUser] = useState(0);
    
    const [totalPayout, setTotalPayout] = useState(0.00);
    const [todayPayout, setTodayPayout] = useState(0.00);
    const [thisWeekPayout, setThisWeekPayout] = useState(0.00);
    const [thisMonthPayout, setThisMonthPayout] = useState(0.00);

    const [totalLeads, setTotalLeads] = useState(0.00);
    const [todayLeads, setTodayLeads] = useState(0.00);
    const [thisWeekLeads, setThisWeekLeads] = useState(0.00);
    const [thisMonthLeads, setThisMonthLeads] = useState(0.00);
    const [payoutGraph, setPayoutGraph] = useState({});
    const [currentDate, setCurrentDate] = useState('');
    

    const [totalAuthUser, setTotalAuthUser] = useState(0);
    const [todayJoinedAuthUser, setTodayJoinedAuthUser] = useState(0);
    const [thisWeekJoinedAuthUser, setThisWeekJoinedAuthUser] = useState(0);
    const [thisMonthJoinedAuthUser, setThisMonthJoinedAuthUser] = useState(0);

    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }



    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#ccc',
          color: theme.palette.common.black,
          fontSize: 12,
          linHeight: 15,
          padding: 7,
          borderRight: "1px solid rgba(224, 224, 224, 1)"
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
            linHeight: 15,
            padding: 7,
            borderRight: "1px solid rgba(224, 224, 224, 1)"
        },
      }));
  
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


      useEffect(() => {

        const getTnx = async () => {

          try {
            const response = await api.post('/api/users/admin-dashboard');
            if (response.status === 200) {
                const decryptedObject = response.data.data;
    
                setTotalRecharge(decryptedObject.totalRAmount);
                setSuccessRecharge(decryptedObject.totalSuccessAmount);
                setFailedRecharge(decryptedObject.totalFailedAmount);
                setTotalBillPayment(decryptedObject.totalBillPayment);
                setTotalRechargeCount(decryptedObject.totalRCount);
                setSuccessRechargeCount(decryptedObject.totalSuccessCount);
                setFailedRechargeCount(decryptedObject.totalFailedCount);
                setTotalBillPaymentCount(decryptedObject.totalBillPaymentCount);
                
                setTotalUser(decryptedObject.totalUser);
                setTodayJoinedUser(decryptedObject.totalTodayJoindUser);
                setThisWeekJoinedUser(decryptedObject.totalThisWeekJoindUser);
                setThisMonthJoinedUser(decryptedObject.totalThisMonthJoindUser);

                setTotalPayout(decryptedObject.totalRedeem);
                setTodayPayout(decryptedObject.totalTodayRedeem);
                setThisWeekPayout(decryptedObject.totalThisWeekRedeem);
                setThisMonthPayout(decryptedObject.totalThisMonthRedeem);

                setTotalLeads(decryptedObject.totalLeads);
                setTodayLeads(decryptedObject.totalTodayLeads);
                setThisWeekLeads(decryptedObject.totalThisWeekLeads);
                setThisMonthLeads(decryptedObject.totalThisMonthLeads);

                setShowServiceTrans(decryptedObject.todayUsers);
                setPayoutGraph(decryptedObject.palyoutData);
                setCurrentDate(decryptedObject.current_date);

                setTotalAuthUser(decryptedObject.totalAuthUser);
                setTodayJoinedAuthUser(decryptedObject.totalTodayJoindAuthUser);
                setThisWeekJoinedAuthUser(decryptedObject.totalThisWeekJoindAuthUser);
                setThisMonthJoinedAuthUser(decryptedObject.totalThisMonthJoindAuthUser);
                
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
      }, [dispatch]);
      
      const theme = useTheme();
    let data = [];
    if (Array.isArray(payoutGraph)) {
        data = payoutGraph.map(item => createData(item.date, item.total_amount));
      } 
    //   const data = [
    //     createData('00:00', 0),
    //     createData('03:00', 300),
    //     createData('06:00', 600),
    //     createData('09:00', 800),
    //     createData('12:00', 1500),
    //     createData('15:00', 2000),
    //     createData('18:00', 2400),
    //     createData('21:00', 2400),
    //     createData('24:00'),
    //   ];
      

    return (
        <main className="p-6 space-y-6">
            <Grid
                container
                spacing={4}
            >
                <Grid item={true} xs={12}   >

                    <Box mt={1} mb={2}  >
                        <Typography variant="h5" >Dashboard</Typography>
                    </Box>
                    <Grid item={true} xs={12} >
                        <Grid
                            container
                            spacing={4}
                        >
                            <Grid item xs={12} md={3} lg={3}>
                                <Paper sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 150,
                                }}
                                >
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Total Recharge
                                    </Typography>
                                    <Typography component="p" variant="h5">
                                        ₹ {totalRecharge}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                                        from {totalRechargeCount} transactions
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Paper sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 150,
                                }}
                                >
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Success Recharge
                                    </Typography>
                                    <Typography component="p" variant="h5">
                                        ₹ {successRecharge}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                                        from {successRechargeCount} transactions
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Paper sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 150,
                                }}
                                >
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Failed Recharge
                                    </Typography>
                                    <Typography component="p" variant="h5">
                                        ₹ {failedRecharge}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                                    from {failedRechargeCount} transactions
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Paper sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 150,
                                }}
                                >
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Total Bill Payment
                                    </Typography>
                                    <Typography component="p" variant="h5">
                                        ₹ {totalBillPayment}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                                    from {totalBillPaymentCount} transactions
                                    </Typography>
                                </Paper>
                            </Grid>
                            
                            
                            <Grid item xs={12} md={8} lg={6}>
                                <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                                >
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Payouts (₹)
                                 </Typography>
                                        <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
                                            <LineChart
                                            dataset={data}
                                            margin={{
                                                top: 16,
                                                right: 20,
                                                left: 70,
                                                bottom: 30,
                                            }}
                                            xAxis={[
                                                {
                                                scaleType: 'point',
                                                dataKey: 'time',
                                                tickNumber: 2,
                                                tickLabelStyle: theme.typography.body2,
                                                },
                                            ]}
                                            yAxis={[
                                                {
                                                label: '',
                                                labelStyle: {
                                                    ...theme.typography.body1,
                                                    fill: theme.palette.text.primary,
                                                },
                                                tickLabelStyle: theme.typography.body2,
                                                max: thisMonthPayout,
                                                tickNumber: 5,
                                                },
                                            ]}
                                            series={[
                                                {
                                                dataKey: 'amount',
                                                showMark: false,
                                                color: theme.palette.primary.light,
                                                },
                                            ]}
                                            sx={{
                                                [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
                                                [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
                                                [`& .${axisClasses.left} .${axisClasses.label}`]: {
                                                transform: 'translateX(-25px)',
                                                },
                                            }}
                                            />
                                        </div>
                                </Paper>
                            </Grid>
                            {/* Total Payout */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                                >
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Total Payout
                                    </Typography>
                                    <Typography component="p" variant="h4">
                                        ₹{totalPayout}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                                        on {currentDate}
                                    </Typography>
                                    <PieChart
                                        series={[
                                            {
                                            data: [
                                                { id: 0, value: thisMonthPayout, label: 'A Month' },
                                                { id: 1, value: thisWeekPayout, label: 'A Week' },
                                                { id: 2, value: todayPayout, label: 'Todays' },
                                            ],
                                            },
                                        ]}
                                        width={300}
                                        height={150}
                                        />
                                    <div>
                                        <Link color="primary" href="/redeem-report">
                                            View Payout
                                        </Link>
                                    </div>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                                >
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Total Lead
                                    </Typography>
                                    <Typography component="p" variant="h4">
                                        {totalLeads}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                                        on {currentDate}
                                    </Typography>
                                    <PieChart
                                        series={[
                                            {
                                            data: [
                                                { id: 0, value: thisMonthLeads, label: 'A Month' },
                                                { id: 1, value: thisWeekLeads, label: 'A Week' },
                                                { id: 2, value: todayLeads, label: 'Todays' },
                                            ],
                                            },
                                        ]}
                                        width={300}
                                        height={150}
                                        />
                                </Paper>
                            </Grid>

                            
                            <Grid item xs={12} md={6} lg={6}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '370px' }}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Today join user
                                    </Typography>
                                    <br/>
                                    <Table size="small" >
                                        <TableHead>
                                        <TableRow>
                                            <StyledTableCell>User Id</StyledTableCell>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell>Mobile</StyledTableCell>
                                            <StyledTableCell>Joining Date</StyledTableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.id}>
                                            <StyledTableCell>{row.mlm_id}</StyledTableCell>
                                            <StyledTableCell>{row.first_name+' ' + row.last_name}</StyledTableCell>
                                            <StyledTableCell>{row.mobile}</StyledTableCell>
                                            <StyledTableCell>{row.registration_date}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                    <Link color="primary" href="/user-details" sx={{ mt: 3 }}>
                                        See more Users
                                    </Link>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Total Users
                                    </Typography>
                                    <Typography component="p" variant="h4">
                                        {totalUser}
                                    </Typography>
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: ['Today', 'This Week', 'This Month'] }]}
                                        series={[{ data: [todayJoinedUser,thisWeekJoinedUser,thisMonthJoinedUser] }]}
                                        width={350}
                                        height={290}
                                        />
                                    </Paper>
                                    
                            </Grid>

                            <Grid item xs={12} md={3} lg={3}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Total Authorized Users
                                    </Typography>
                                    <Typography component="p" variant="h4">
                                        {totalAuthUser}
                                    </Typography>
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: ['Today', 'This Week', 'This Month'] }]}
                                        series={[{ data: [todayJoinedAuthUser,thisWeekJoinedAuthUser,thisMonthJoinedAuthUser] }]}
                                        width={350}
                                        height={290}
                                        />
                                    </Paper>
                                    
                            </Grid>
                            
                        </Grid>

                    </Grid>
                       
                    
                </Grid>

                <Grid
                    container
                // sx={{ background: "#FFF" }}
                >



                </Grid>
            </Grid>
        </main>
    )
}
export default withAuth(TransactionHistory);