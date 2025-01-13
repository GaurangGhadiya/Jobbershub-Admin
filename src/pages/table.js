import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Typography, FormControl, Select, MenuItem, CircularProgress, IconButton, Menu, Button, Pagination } from '@mui/material';
import Filter from '@/components/Filter/Filter';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ExposureIcon from '@mui/icons-material/Exposure';
import DownloadIcon from '@mui/icons-material/Download';
import TableTop from '@/components/TableTop.js';
import CustomizetableModal from '@/components/Modals/CustomizeTableModal';
import Layout from '@/components/Layout/Layout';
import { useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PendingLeadsModal from '@/components/Modals/PendingLeadsModal';
import TeamModal from '@/components/Modals/TeamModal';
import SelfPurchaseDVModal from '@/components/Modals/SelfPurchaseDVModal';
import SecondLevelMembersModal from '@/components/Modals/SecondLevelMembersModal';
import TotalActiveIncomeModal from '@/components/Modals/TotalActiveIncomeModal';
import TotalPassiveIncomeModal from '@/components/Modals/TotalPassiveIncomeModal';
import DematActiveIncomeModal from '@/components/Modals/DematActiveIncomeModal';
import CoursesActiveIncomeModal from '@/components/Modals/CoursesActiveIncomeModal';
import InsuranceActiveIncomeModal from '@/components/Modals/InsuranceActiveIncomeModal';
import InvestmentActiveIncomeModal from '@/components/Modals/InvestmentActiveIncomeModal';
import AuthorizedMembersModala from '@/components/Modals/AuthorizedMembersModala';
import { styled, alpha } from '@mui/material/styles';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BlockIcon from '@mui/icons-material/Block';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PrimeRequestActionModal from '@/components/Modals/PrimeRequestActionModal';
import { useRouter } from 'next/router';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MicIcon from '@mui/icons-material/Mic';
import Image from 'next/image';
import ChatModal from '@/components/Modals/ChatModal';
import CallModal from '@/components/Modals/CallModal';
import SmartpeWalletBalanceModal from '@/components/Modals/SmartpeWalletBalanceModal';
import TotalEarningModal from '@/components/Modals/TotalEarningModal';
import RewardIncomeModal from '@/components/Modals/RewardIncomeModal';
import SalaryIncomeModal from '@/components/Modals/SalaryIncomeModal';
import RoyaltyIncomeModal from '@/components/Modals/RoyaltyIncomeModal';
import SIPMFFundsModal from '@/components/Modals/SIPMFFundsModal';
import LaptopFundsModal from '@/components/Modals/LaptopFundsModal';
import BickFundsModal from '@/components/Modals/BickFundsModal';
import CarFundsModal from '@/components/Modals/CarFundsModal';
import HouseFundsModal from '@/components/Modals/HouseFundsModal';
import InsuranceFundsModal from '@/components/Modals/InsuranceFundsModal';
import ChildHigherEducationFundModal from '@/components/Modals/ChildHigherEducationFundModal';
import MarriageBurdenReliefFundModal from '@/components/Modals/MarriageBurdenReliefFundModal';
import TotalWithdrawalModal from '@/components/Modals/WithdrawalModal';
import TDSBalanceModal from '@/components/Modals/TDSBalanceModal';
import PaidTCSModal from '@/components/Modals/PaidTDSModal';
import TravelFundsModal from '@/components/Modals/TravelFundsModal';
import MainActiveIncomeModal from '@/components/Modals/MainActiveIncomeModal';
import MainPassiveIncomeModal from '@/components/Modals/MainPassiveIncomeModal';
const ITEM_HEIGHT = 48;
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));



const StickyTable = () => {
    const router = useRouter()
    const [tableData, setTableData] = useState([])
    const [openFilter, setOpenFilter] = useState(true);
    const [Customizetable, setCustomizetable] = useState(false)
    const [selectedTableRow, setselectedTableRow] = useState({
        RegistrationDateTime: true,
        AuthorizationDateTime: true,
        AffiliateID: true,
        AffiliateName: true,
        State: true,
        District: true,
        Taluka: true,
        Pincode: true,
        AffiliateRank: true,
        AffiliateType: true,
        AffiliateMobileNo: true,
        EmailID: true,
        SponsorType: true,
        SponsorRank: true,
        Sponsorid: true,
        SponsorName: true,
        SponsorMobileNo: true,
        ViewUplineList: true,
        Team: true,
        PendingLeads: true,
        SelfPurchaseDV: true,
        My1stLevelTotalPurchaseDV: true,
        AuthorizedMembersInsecondlevel: true,
        TotalActiveIncome: true,
        TotalPassiveIncome: true,
        DematActiveIncome: true,
        CoursesActiveIncome: true,
        InsuranceActiveIncome: true,
        InvestmentActiveIncome: true,
        Primerequest: true,
        KYCStatus: true,
        NomineeStatus: true,
        AffiliateStatus: true,
        BlockReason: true,
        LastCommunication: true,
        NoteReminder: true,
        Action: true,
        TotalEarning: true,
        MainActiveIncome: true,
        MainPassiveIncome: true,
        RewardIncome: true,
        SalaryIncome: true,
        RoyaltyIncome: true,
        SIPMFFund: true,
        LaptopFund: true,
        BikeFund: true,
        CarFund: true,
        HouseFund: true,
        TravelFund: true,
        InsuranceFund: true,
        ChildHigherEducationFund: true,
        MarriageBurdenReliefFund: true,
        TotalWithdrawal: true,
        TDSBalance: true,
        TDSPaid: true,
    })
    const [afterSubmitSelectedRow, setAfterSubmitSelectedRow] = useState({
        RegistrationDateTime: true,
        AuthorizationDateTime: true,
        AffiliateID: true,
        AffiliateName: true,
        State: true,
        District: true,
        Taluka: true,
        Pincode: true,
        AffiliateRank: true,
        AffiliateType: true,
        AffiliateMobileNo: true,
        EmailID: true,
        SponsorType: true,
        SponsorRank: true,
        Sponsorid: true,
        SponsorName: true,
        SponsorMobileNo: true,
        ViewUplineList: true,
        Team: true,
        PendingLeads: true,
        SelfPurchaseDV: true,
        My1stLevelTotalPurchaseDV: true,
        AuthorizedMembersInsecondlevel: true,
        TotalActiveIncome: true,
        TotalPassiveIncome: true,
        DematActiveIncome: true,
        CoursesActiveIncome: true,
        InsuranceActiveIncome: true,
        InvestmentActiveIncome: true,
        Primerequest: true,
        KYCStatus: true,
        NomineeStatus: true,
        AffiliateStatus: true,
        BlockReason: true,
        LastCommunication: true,
        NoteReminder: true,
        Action: true,
        TotalEarning: true,
        MainActiveIncome: true,
        MainPassiveIncome: true,
        RewardIncome: true,
        SalaryIncome: true,
        RoyaltyIncome: true,
        SIPMFFund: true,
        LaptopFund: true,
        BikeFund: true,
        CarFund: true,
        HouseFund: true,
        TravelFund: true,
        InsuranceFund: true,
        ChildHigherEducationFund: true,
        MarriageBurdenReliefFund: true,
        TotalWithdrawal: true,
        TDSBalance: true,
        TDSPaid: true,
    })
    const [pinnedTableRow, setpinnedTableRow] = useState([])
    const [pendingLeads, setpendingLeads] = React.useState(false);
    const [selfPurchaseDV, setselfPurchaseDV] = React.useState(false);
    const [authorizedMembers, setauthorizedMembers] = React.useState(false);
    const [secondLevelMembers, setsecondLevelMembers] = React.useState(false);
    const [totalActiveIncome, settotalActiveIncome] = React.useState(false);
    const [totalPassiveIncome, settotalPassiveIncome] = React.useState(false);
    const [dematActiveIncome, setdematActiveIncome] = React.useState(false);
    const [coursesActiveIncome, setcoursesActiveIncome] = React.useState(false);
    const [insuranceActiveIncome, setinsuranceActiveIncome] = React.useState(false);
    const [investmentActiveIncome, setinvestmentActiveIncome] = React.useState(false);
    const [team, setteam] = React.useState(false);
    const [filterValue, setFilterValue] = useState({})
    const [loading, setLoading] = useState(false)
    const [countData, setCountData] = useState({})
    const [PrimeRequestModal, setPrimeRequestModal] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [actionData, setActionData] = useState({})
    const [totlaPage, setTotlaPage] = useState(0)
     const [smartpeWalletBalance, setsmartpeWalletBalance] = React.useState(false);
        const [totalEarning, settotalEarning] = React.useState(false);
        const [mainActiveIncome, setmainActiveIncome] = useState(false)
        const [mainPassiveIncome, setmainPassiveIncome] = useState(false)
    const [primeRequest, setprimeRequest] = React.useState(false);
            const [totalWithdrawal, settotalWithdrawal] = React.useState(false);
            const [royaltyIncome, setroyaltyIncome] = React.useState(false);
            const [rewardIncome, setrewardIncome] = React.useState(false);
            const [SIPMFFunds, setSIPMFFunds] = React.useState(false);
            const [laptopFunds, setlaptopFunds] = React.useState(false);
            const [bickFunds, setbickFunds] = React.useState(false);
            const [carFunds, setcarFunds] = React.useState(false);
            const [houseFunds, sethouseFunds] = React.useState(false);
            const [travelFunds, settravelFunds] = useState(false)
            const [insuranceFunds, setinsuranceFunds] = React.useState(false);
            const [childHigherEducationFund, setchildHigherEducationFund] = React.useState(false);
            const [marriageBurdenReliefFund, setmarriageBurdenReliefFund] = React.useState(false);
                const [salary, setsalary] = React.useState(false);
            
            const [tdsBalance, settdsBalance] = React.useState(false);
            const [paidTcs, setpaidTcs] = React.useState(false);
    const open = Boolean(anchorEl);
      const [openChatModal, setOpenChatModal] = React.useState(false)
      const [openCallModal, setOpenCallModal] = React.useState(false)
    
        const handlechatModalOpen = () => {
            setOpenChatModal(true);
        };
    
        const handlechatModalClose = () => {
            setOpenChatModal(false);
        };
        const handleCallModalOpen = () => {
            setOpenCallModal(true);
        };
    
        const handleCallModalClose = () => {
            setOpenCallModal(false);
        };
    const handleClickAction = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAction = () => {
        setAnchorEl(null);
    };

   

    const [filterData, setFilterData] = useState({
        page: 1,
        pageSize: 10,
        reg_date_filter: "tillDate",
        authorization_date_filter: "tillDate",
        self_dv_filter: "tillDate",
        authorized_team_filter: "tillDate",
        pending_leads_filter: "tillDate",
        self_dv_filter: "tillDate",
        active_income_filter: "tillDate",
        self_dv1st_filter: "tillDate",
        authorized_member_2nd_filter: "tillDate",
        passive_income_filter: "tillDate",
        demat_income_filter: "tillDate",
        courses_income_filter: "tillDate",
        insurance_active_income_filter: "tillDate",
        investment_active_income_filter: "tillDate",
        smartpay_filter: "tillDate",
        totalearning_filter: "tillDate",
        active_income_filter: "tillDate",
        passive_income_filter: "tillDate",
        reward_income_filter: "tillDate",
        salary_income_filter: "tillDate",
        royalty_income_filter: "tillDate",
        sip_income_filter: "tillDate",
        laptop_income_filter: "tillDate",
        bike_income_filter: "tillDate",
        car_income_filter: "tillDate",
        house_income_filter: "tillDate",
        travel_income_filter: "tillDate",
        insurance_income_filter: "tillDate",
        education_income_filter: "tillDate",
        marraige_income_filter: "tillDate",
        withdrawal_income_filter: "tillDate",
        tds_balance_filter: "tillDate",
        tds_paid_filter: "tillDate",
    })

    console.log('filterData', filterData)

    const rows = [
        { id: 1, name: 'John Doe', age: 29, city: 'New York' },
        { id: 2, name: 'Jane Smith', age: 34, city: 'Los Angeles' },
        { id: 3, name: 'Sam Brown', age: 25, city: 'Chicago' },
        { id: 4, name: 'Lisa White', age: 27, city: 'San Francisco' },
        // Add more rows if necessary
    ];

    const CustomizetableOpen = () => {
        setCustomizetable(true);
    };
    const CustomizetableClose = () => {
        setCustomizetable(false);
    };

    const handleChange = (event) => {
        const { name, checked } = event.target
        setselectedTableRow({ ...selectedTableRow, [name]: checked });
    };
    const handleChangePin = (event) => {
        const { name, checked } = event.target
        setpinnedTableRow({ ...pinnedTableRow, [name]: checked });
    };

    const getCount = async () => {
        setLoading(true)
        await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/report/user-summary-dashboard`).then(res => {
            console.log('api response', res)
            setCountData(res?.data)
            setLoading(false)

        }).catch(e => {
            setLoading(false)

            console.log('e', e)
        })

    }
    const PrimeRequestClick = async (status) => {
        setLoading(true)
        let body = {
            "user_id": 1,
            "status": +status,
            "updated_by": 1
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/admin/update-prime-affiliate`, body).then(res => {
            console.log('prime request response', res)
            // setCountData(res?.data)
            CustomizetableClose()
            primeRequestClose()
            setAnchorEl(null);
            setActionData()
            getTableData()
            // setLoading(false)

        }).catch(e => {
            setLoading(false)

            console.log('e', e)
        })

    }
    console.log('countData', countData)
    const getTableData = async (defaultData ) => {
        try {
            setLoading(true)
            console.log('filterValue', filterValue)
            let body = { ...filterData }
            if (filterValue?.selectSearch && filterValue?.searchValue) {
                let keyy = filterValue?.selectSearch
                body = { ...body, [keyy]: filterValue?.searchValue }
            }
            console.log('error', body,defaultData?.page)
            if(defaultData?.page){

                body = defaultData
            }
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/report/new-user-summary`, body).then(res => {
                console.log('api response', res?.data?.data)
                setTableData(res?.data?.data)
                setTotlaPage(res?.data?.totalPages)
                setLoading(false)

            }).catch(e => {
                setLoading(false)

                console.log('erro', e)
            })
        } catch (error) {
            setLoading(false)
            console.log('error', error)
        }


    }
    useEffect(() => {
        // getTableData()
        getCount()
    }, [])
    useEffect(() => {
        getTableData()
        // getCount()
    }, [filterData?.page, filterData?.pageSize])

  
   
 
    const smartpeWalletBalanceOpen = () => {
        setsmartpeWalletBalance(!smartpeWalletBalance);
    };
    const smartpeWalletBalanceClose = () => {
        setsmartpeWalletBalance(false);
    };
    const totalEarningOpen = () => {
        settotalEarning(!totalEarning);
    };
    const totalEarningClose = () => {
        settotalEarning(false);
    };
    const mainActiveIncomeOpen = () => {
        setmainActiveIncome(!mainActiveIncome);
    };
    const mainActiveIncomeClose = () => {
        setmainActiveIncome(false);
    };
    const mainPassiveIncomeOpen = () => {
        setmainPassiveIncome(!mainPassiveIncome);
    };
    const mainPassiveIncomeClose = () => {
        setmainPassiveIncome(false);
    };
   
    const totalWithdrawalOpen = () => {
        settotalWithdrawal(!totalWithdrawal);
    };
    const totalWithdrawalClose = () => {
        settotalWithdrawal(false);
    };
    const royaltyIncomeOpen = () => {
        setroyaltyIncome(!royaltyIncome);
    };
    const royaltyIncomeClose = () => {
        setroyaltyIncome(false);
    };
    const rewardIncomeOpen = () => {
        setrewardIncome(!rewardIncome);
    };
    const rewardIncomeClose = () => {
        setrewardIncome(false);
    };
    const SIPMFFundsOpen = () => {
        setSIPMFFunds(!SIPMFFunds);
    };
    const SIPMFFundsClose = () => {
        setSIPMFFunds(false);
    };
    const laptopFundsOpen = () => {
        setlaptopFunds(!laptopFunds);
    };
    const laptopFundsClose = () => {
        setlaptopFunds(false);
    };
    const bickFundsOpen = () => {
        setbickFunds(!bickFunds);
    };
    const bickFundsClose = () => {
        setbickFunds(false);
    };
    const carFundsOpen = () => {
        setcarFunds(!carFunds);
    };
    const carFundsClose = () => {
        setcarFunds(false);
    };
    const houseFundsOpen = () => {
        sethouseFunds(!houseFunds);
    };
    const houseFundsClose = () => {
        sethouseFunds(false);
    };
    const travelFundsOpen = () => {
        settravelFunds(!travelFunds);
    };
    const travelFundsClose = () => {
        settravelFunds(false);
    };
    const insuranceFundsOpen = () => {
        setinsuranceFunds(!insuranceFunds);
    };
    const insuranceFundsClose = () => {
        setinsuranceFunds(false);
    };
    const childHigherEducationFundOpen = () => {
        setchildHigherEducationFund(!childHigherEducationFund);
    };
    const childHigherEducationFundClose = () => {
        setchildHigherEducationFund(false);
    };
    const marriageBurdenReliefFundOpen = () => {
        setmarriageBurdenReliefFund(!marriageBurdenReliefFund);
    };
    const marriageBurdenReliefFundClose = () => {
        setmarriageBurdenReliefFund(false);
    };
    const tdsBalanceOpen = () => {
        settdsBalance(!tdsBalance);
    };
    const tdsBalanceClose = () => {
        settdsBalance(false);
    };
    const paidTcsOpen = () => {
        setpaidTcs(!paidTcs);
    };
    const paidTcsClose = () => {
        setpaidTcs(false);
    };
    const pendingLeadsOpen = () => {
        setpendingLeads(!pendingLeads);
    };
    const pendingLeadsClose = () => {
        setpendingLeads(false);
    };
 
    const selfPurchaseDVOpen = () => {
        setselfPurchaseDV(!selfPurchaseDV);
    };
    const selfPurchaseDVClose = () => {
        setselfPurchaseDV(false);
    };
    const authorizedMembersOpen = () => {
        setauthorizedMembers(!authorizedMembers);
    };
    const authorizedMembersClose = () => {
        setauthorizedMembers(false);
    };
    const secondLevelMembersOpen = () => {
        setsecondLevelMembers(!secondLevelMembers);
    };
    const secondLevelMembersClose = () => {
        setsecondLevelMembers(false);
    };
   
    const teamOpen = () => {
        setteam(!team);
    };
    const teamClose = () => {
        setteam(false);
    };
    const salaryOpen = () => {
        setsalary(!salary);
    };
    const salaryClose = () => {
        setsalary(false);
    };
    const totalActiveIncomeOpen = () => {
        settotalActiveIncome(!totalActiveIncome);
    };
    const totalActiveIncomeClose = () => {
        settotalActiveIncome(false);
    };
    const totalPassiveIncomeOpen = () => {
        settotalPassiveIncome(!totalPassiveIncome);
    };
    const totalPassiveIncomeClose = () => {
        settotalPassiveIncome(false);
    };
    const dematActiveIncomeOpen = () => {
        setdematActiveIncome(!dematActiveIncome);
    };
    const dematActiveIncomeClose = () => {
        setdematActiveIncome(false);
    };
    const coursesActiveIncomeOpen = () => {
        setcoursesActiveIncome(!coursesActiveIncome);
    };
    const coursesActiveIncomeClose = () => {
        setcoursesActiveIncome(false);
    };
    const insuranceActiveIncomeOpen = () => {
        setinsuranceActiveIncome(!insuranceActiveIncome);
    };
    const insuranceActiveIncomeClose = () => {
        setinsuranceActiveIncome(false);
    };
    const investmentActiveIncomeOpen = () => {
        setinvestmentActiveIncome(!investmentActiveIncome);
    };
    const investmentActiveIncomeClose = () => {
        setinvestmentActiveIncome(false);
    };
    const primeRequestOpen = () => {
        setprimeRequest(!primeRequestOpen);
    };
    const primeRequestClose = () => {
        setprimeRequest(false);
    };
  
    console.log('tableData', tableData)


    return (
        <Layout>
            <Box p={2} style={{ backgroundColor: "#f5f5f5" }} >
                <TableTop countData={countData} />
                <Box backgroundColor="#FFE9DD" className="topborder" px={3} py={1} color={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box>
                        <Typography fontSize={20} color={"#000000"} fontWeight={900}>Affiliate members</Typography>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        {/* <Box borderRadius={"10px"} padding={"5px 10px"} backgroundColor={"#F7F5DD"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={15} fontWeight={600} display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"#707070"}><ExposureIcon />&nbsp;    Customize Table</Typography>
                    </Box>
                    <Box borderRadius={"10px"} padding={"5px 10px"} backgroundColor={"#F7F5DD"} ml={2} style={{ cursor: "pointer" }}>
                        <Typography fontSize={15} fontWeight={600} display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"#707070"}><DownloadIcon />&nbsp;    Download Report</Typography>
                    </Box> */}
                        <Box ml={5} onClick={() => setOpenFilter(!openFilter)}>
                            {openFilter ? <RemoveIcon style={{ cursor: "pointer", fontSize: "40px", color: "#000000" }} /> :
                                <AddIcon style={{ cursor: "pointer", fontSize: "40px", color: "#000000" }} />}

                        </Box>
                    </Box>
                </Box>
                {openFilter && <Filter filterData={filterData} setFilterData={setFilterData} getTableData={getTableData} filterValue={filterValue} setFilterValue={setFilterValue} />}
                <Box height={"20px"} backgroundColor={"#F5F5F5"}></Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={2} backgroundColor={"white"} className="topborder">
                    <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                        <Typography>Show</Typography>
                        <Box mx={1}>
                            <FormControl sx={{ m: 1, minWidth: 90 }}>
                                <Select
                                    value={filterData?.pageSize}
                                    onChange={(e) => setFilterData({ ...filterData, pageSize: e.target.value })}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{
                                        height: "30px", // Adjust the height of the select box
                                        "& .MuiSelect-select": {
                                          padding: "5px 12px", // Adjust padding for better alignment
                                        },
                                      }}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                    <MenuItem value={90}>90</MenuItem>
                                    <MenuItem value={100}>100</MenuItem>
                                    <MenuItem value={250}>250</MenuItem>
                                    <MenuItem value={500}>500</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Typography>entries</Typography>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={2}>
                        <Box borderRadius={"10px"} padding={"5px 10px"} backgroundColor={"#FFE9DD"} style={{ cursor: "pointer" }} onClick={CustomizetableOpen}>
                            <Typography fontSize={15} fontWeight={600} display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"#707070"}><ExposureIcon />&nbsp;    Customize Table</Typography>
                        </Box>
                        <Box borderRadius={"10px"} padding={"5px 10px"} backgroundColor={"#FFE9DD"} ml={2} style={{ cursor: "pointer" }}>
                            <Typography fontSize={15} fontWeight={600} display={"flex"} justifyContent={"space-between"} alignItems={"center"} color={"#707070"}><DownloadIcon />&nbsp;    Download Report</Typography>
                        </Box>

                    </Box>
                </Box>
                {!loading ? <Box overflow={"hidden"}>
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
                            <TableHead >
                                <TableRow>
                                    <TableCell style={{ position: 'sticky', borderRight: "none", left: 0, backgroundColor: '#fff', zIndex: 10, width: 55, textAlign: 'left' }}>#</TableCell>
                                    {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell style={{ position: 'sticky', borderRight: "none", left: 55, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Registration Date & Time</TableCell>}
                                    {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell style={{ position: 'sticky', borderRight: "none", left: 185, backgroundColor: '#fff', zIndex: 10, width: 130 }}>Authorization Date & Time</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateID && <TableCell style={{ position: 'sticky', borderRight: "none", left: 315, backgroundColor: '#fff', zIndex: 10, width: 140 }}>Affiliate Id</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateName && <TableCell style={{ position: 'sticky', borderRight: "none", left: 455, backgroundColor: '#fff', zIndex: 10, width: 160, boxShadow: "10px 10px 24px -8px rgb(42 57 78 / 16%)" }}>Affiliate Name</TableCell>}


                                    {afterSubmitSelectedRow?.State && <TableCell style={{ borderRight: "none" }} width={120} >State</TableCell>}
                                    {afterSubmitSelectedRow?.District && <TableCell style={{ borderRight: "none" }} width={120}>District</TableCell>}
                                    {afterSubmitSelectedRow?.Taluka && <TableCell style={{ borderRight: "none" }} width={120}>Taluka</TableCell>}
                                    {afterSubmitSelectedRow?.Pincode && <TableCell style={{ borderRight: "none" }} width={90}>Pincode</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateRank && <TableCell style={{ borderRight: "none" }} width={140}>Affiliate Rank</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateType && <TableCell style={{ borderRight: "none" }} width={130}>Affiliate Type</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateMobileNo && <TableCell style={{ borderRight: "none" }} width={140}>Mobile</TableCell>}
                                    {afterSubmitSelectedRow?.EmailID && <TableCell style={{ borderRight: "none" }} textAlign="left" width={260}>Email ID</TableCell>}
                                    {afterSubmitSelectedRow?.SponsorType && <TableCell style={{ borderRight: "none" }} width={140}>Sponsor Type</TableCell>}
                                    {afterSubmitSelectedRow?.SponsorRank && <TableCell style={{ borderRight: "none" }} width={140}>Sponsor Rank</TableCell>}
                                    {afterSubmitSelectedRow?.Sponsorid && <TableCell style={{ borderRight: "none" }} width={140}>Sponser id</TableCell>}
                                    {afterSubmitSelectedRow?.SponsorName && <TableCell style={{ borderRight: "none" }} width={140}>Sponsor Name</TableCell>}
                                    {afterSubmitSelectedRow?.SponsorMobileNo && <TableCell style={{ borderRight: "none" }} width={140}>Sponsor Mobile No.</TableCell>}
                                    {afterSubmitSelectedRow?.ViewUplineList && <TableCell style={{ borderRight: "none" }} width={110}>View Upline List</TableCell>}
                                    {afterSubmitSelectedRow?.Team && <TableCell style={{ borderRight: "none" }} width={90} position={"relative"}><Box className='center' >Team  <FilterAltOutlinedIcon className='pointer' onClick={teamOpen} id="basic-button" /></Box>
                                        <TeamModal filterData={filterData} setFilterData={setFilterData} team={team} teamClose={teamClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.PendingLeads && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}><Box className='center' >Pending Leads  <FilterAltOutlinedIcon className='pointer' onClick={pendingLeadsOpen} id="basic-button" /></Box>
                                        <PendingLeadsModal filterData={filterData} setFilterData={setFilterData} pendingLeads={pendingLeads} pendingLeadsClose={pendingLeadsClose} />

                                    </TableCell>}


                                    {afterSubmitSelectedRow?.SelfPurchaseDV && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}><Box className='center' >Self Purchase DV  <FilterAltOutlinedIcon className='pointer' onClick={selfPurchaseDVOpen} id="basic-button" /></Box>
                                        <SelfPurchaseDVModal filterData={filterData} setFilterData={setFilterData} selfPurchaseDV={selfPurchaseDV} selfPurchaseDVClose={selfPurchaseDVClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.My1stLevelTotalPurchaseDV && <TableCell style={{ borderRight: "none" }} width={210} position={"relative"}><Box className='center' >My 1st Level Total Purchase DV <FilterAltOutlinedIcon className='pointer' onClick={authorizedMembersOpen} id="basic-button" /></Box>
                                        <AuthorizedMembersModala filterData={filterData} setFilterData={setFilterData} a authorizedMembers={authorizedMembers} authorizedMembersClose={authorizedMembersClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.AuthorizedMembersInsecondlevel && <TableCell style={{ borderRight: "none" }} width={240} position={"relative"}> <Box className='center' >Authorized Members In second level <FilterAltOutlinedIcon className='pointer' onClick={secondLevelMembersOpen} id="basic-button" /></Box>
                                        <SecondLevelMembersModal filterData={filterData} setFilterData={setFilterData} secondLevelMembers={secondLevelMembers} secondLevelMembersClose={secondLevelMembersClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.TotalActiveIncome && <TableCell style={{ borderRight: "none" }} width={180} position={"relative"}><Box className='center' >Total Active Income   <FilterAltOutlinedIcon className='pointer' onClick={totalActiveIncomeOpen} id="basic-button" /></Box>
                                        <TotalActiveIncomeModal filterData={filterData} setFilterData={setFilterData} totalActiveIncome={totalActiveIncome} totalActiveIncomeClose={totalActiveIncomeClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.TotalPassiveIncome && <TableCell style={{ borderRight: "none" }} width={180} position={"relative"}> <Box className='center' >Total Passive Income <FilterAltOutlinedIcon className='pointer' onClick={totalPassiveIncomeOpen} id="basic-button" /></Box>
                                        <TotalPassiveIncomeModal filterData={filterData} setFilterData={setFilterData} totalPassiveIncome={totalPassiveIncome} totalPassiveIncomeClose={totalPassiveIncomeClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.DematActiveIncome && <TableCell style={{ borderRight: "none" }} width={200} position={"relative"}> <Box className='center' >Demat A/C Active Income  <FilterAltOutlinedIcon className='pointer' onClick={dematActiveIncomeOpen} id="basic-button" /></Box>
                                        <DematActiveIncomeModal filterData={filterData} setFilterData={setFilterData} dematActiveIncome={dematActiveIncome} dematActiveIncomeClose={dematActiveIncomeClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.CoursesActiveIncome && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}><Box className='center' >Courses Active Income  <FilterAltOutlinedIcon className='pointer' onClick={coursesActiveIncomeOpen} id="basic-button" /></Box>
                                        <CoursesActiveIncomeModal filterData={filterData} setFilterData={setFilterData} coursesActiveIncome={coursesActiveIncome} coursesActiveIncomeClose={coursesActiveIncomeClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.InsuranceActiveIncome && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}><Box className='center' >Insurance Active Income  <FilterAltOutlinedIcon className='pointer' onClick={insuranceActiveIncomeOpen} id="basic-button" /></Box>
                                        <InsuranceActiveIncomeModal filterData={filterData} setFilterData={setFilterData} insuranceActiveIncome={insuranceActiveIncome} insuranceActiveIncomeClose={insuranceActiveIncomeClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.InvestmentActiveIncome && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}> <Box className='center' >Investment Active Income <FilterAltOutlinedIcon className='pointer' onClick={investmentActiveIncomeOpen} id="basic-button" /></Box>
                                        <InvestmentActiveIncomeModal filterData={filterData} setFilterData={setFilterData} investmentActiveIncome={investmentActiveIncome} investmentActiveIncomeClose={investmentActiveIncomeClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.Primerequest && <TableCell style={{ borderRight: "none" }} width={140}>Prime request</TableCell>}
                                    {afterSubmitSelectedRow?.KYCStatus && <TableCell style={{ borderRight: "none" }} width={140}>KYC Status</TableCell>}
                                    {afterSubmitSelectedRow?.NomineeStatus && <TableCell style={{ borderRight: "none" }} width={140}>Nominee Status</TableCell>}
                                    {afterSubmitSelectedRow?.AffiliateStatus && <TableCell style={{ borderRight: "none" }} width={140}>Affiliate Status</TableCell>}
                                    {afterSubmitSelectedRow?.BlockReason && <TableCell style={{ borderRight: "none" }} width={140}>Block Reason</TableCell>}
                                    {afterSubmitSelectedRow?.LastCommunication && <TableCell style={{ borderRight: "none" }} width={330}>Last Communication</TableCell>}
                                    {/* {afterSubmitSelectedRow?.NoteReminder && <TableCell style={{ borderRight: "none" }} width={190}>Note & Reminder</TableCell>} */}
                                    {afterSubmitSelectedRow?.Action && <TableCell style={{ borderRight: "none" }} width={190}>Action</TableCell>}
                                    {/* {afterSubmitSelectedRow?.SmartPeWalletBalance && <TableCell style={{ borderRight: "none" }} width={110}>SmartPe Wallet Balance</TableCell>} */}


                                    <TableCell style={{ borderRight: "none" }} width={110} position={"relative"}>  <Box className='center' >SmartPe Wallet  <FilterAltOutlinedIcon className='pointer' onClick={smartpeWalletBalanceOpen} id="basic-button" /></Box>
                                                <SmartpeWalletBalanceModal filterData={filterData} setFilterData={setFilterData} smartpeWalletBalance={smartpeWalletBalance} smartpeWalletBalanceClose={smartpeWalletBalanceClose} />
                                    
                                    </TableCell>
                                    {afterSubmitSelectedRow?.TotalEarning && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}>  <Box className='center' >Total Earning  <FilterAltOutlinedIcon className='pointer' onClick={totalEarningOpen} id="basic-button" /></Box>
                                                <TotalEarningModal filterData={filterData} setFilterData={setFilterData} totalEarning={totalEarning} totalEarningClose={totalEarningClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.MainActiveIncome && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}>  <Box className='center' >Main Active Income <FilterAltOutlinedIcon className='pointer' onClick={mainActiveIncomeOpen} id="basic-button" /></Box>
                                    <MainActiveIncomeModal filterData={filterData} setFilterData={setFilterData} mainActiveIncome={mainActiveIncome} mainActiveIncomeClose={mainActiveIncomeClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.MainPassiveIncome && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}><Box className='center' >Main Passive Income  <FilterAltOutlinedIcon className='pointer' onClick={mainPassiveIncomeOpen} id="basic-button" /></Box>
                                    <MainPassiveIncomeModal filterData={filterData} setFilterData={setFilterData} mainPassiveIncome={mainPassiveIncome} mainPassiveIncomeClose={mainPassiveIncomeClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.RewardIncome && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}> <Box className='center' >Reward Income <FilterAltOutlinedIcon className='pointer' onClick={rewardIncomeOpen} id="basic-button" /></Box>
                                                <RewardIncomeModal filterData={filterData} setFilterData={setFilterData} rewardIncome={rewardIncome} rewardIncomeClose={rewardIncomeClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.SalaryIncome && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}> <Box className='center' >Salary Income  <FilterAltOutlinedIcon className='pointer' onClick={salaryOpen} id="basic-button" /></Box>
                                                <SalaryIncomeModal filterData={filterData} setFilterData={setFilterData} salary={salary} salaryClose={salaryClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.RoyaltyIncome && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}>  <Box className='center' >Royalty Income <FilterAltOutlinedIcon className='pointer' onClick={royaltyIncomeOpen} id="basic-button" /></Box>
                                                <RoyaltyIncomeModal filterData={filterData} setFilterData={setFilterData} royaltyIncome={royaltyIncome} royaltyIncomeClose={royaltyIncomeClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.SIPMFFund && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}>  <Box className='center' >SIP / MF Fund <FilterAltOutlinedIcon className='pointer' onClick={SIPMFFundsOpen} id="basic-button" /></Box>
                                                <SIPMFFundsModal filterData={filterData} setFilterData={setFilterData} SIPMFFunds={SIPMFFunds} SIPMFFundsClose={SIPMFFundsClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.LaptopFund && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}> <Box className='center' >Laptop Fund  <FilterAltOutlinedIcon className='pointer' onClick={laptopFundsOpen} id="basic-button" /></Box>
                                                <LaptopFundsModal filterData={filterData} setFilterData={setFilterData} laptopFunds={laptopFunds} laptopFundsClose={laptopFundsClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.BikeFund && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}> <Box className='center' >Bike Fund <FilterAltOutlinedIcon className='pointer' onClick={bickFundsOpen} id="basic-button" /></Box>
                                                <BickFundsModal filterData={filterData} setFilterData={setFilterData} bickFunds={bickFunds} bickFundsClose={bickFundsClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.CarFund && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}>   <Box className='center' >Car Fund<FilterAltOutlinedIcon className='pointer' onClick={carFundsOpen} id="basic-button" /></Box>
                                                <CarFundsModal filterData={filterData} setFilterData={setFilterData} carFunds={carFunds} carFundsClose={carFundsClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.HouseFund && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}>  <Box className='center' >House Fund  <FilterAltOutlinedIcon className='pointer' onClick={houseFundsOpen} id="basic-button" /></Box>
                                                <HouseFundsModal filterData={filterData} setFilterData={setFilterData} houseFunds={houseFunds} houseFundsClose={houseFundsClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.TravelFund && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}>  <Box className='center' >Travel Fund <FilterAltOutlinedIcon className='pointer' onClick={travelFundsOpen} id="basic-button" /></Box>
                                    <TravelFundsModal filterData={filterData} setFilterData={setFilterData} travelFunds={travelFunds} travelFundsClose={travelFundsClose} />

                                    </TableCell>}
                                    {afterSubmitSelectedRow?.InsuranceFund && <TableCell style={{ borderRight: "none" }} width={190} position={"relative"}> <Box className='center' >Insurance Fund  <FilterAltOutlinedIcon className='pointer' onClick={insuranceFundsOpen} id="basic-button" /></Box>
                                                <InsuranceFundsModal filterData={filterData} setFilterData={setFilterData} insurance={insuranceFunds} insuranceClose={insuranceFundsClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.ChildHigherEducationFund && <TableCell style={{ borderRight: "none" }} width={240} position={"relative"}>  <Box className='center' >Child Higher Education Fund <FilterAltOutlinedIcon className='pointer' onClick={childHigherEducationFundOpen} id="basic-button" /></Box>
                                                <ChildHigherEducationFundModal filterData={filterData} setFilterData={setFilterData} childHigherEducationFund={childHigherEducationFund} childHigherEducationFundClose={childHigherEducationFundClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.MarriageBurdenReliefFund && <TableCell style={{ borderRight: "none" }} width={240} position={"relative"}> <Box className='center' >Marriage Burden Relief Fund <FilterAltOutlinedIcon className='pointer' onClick={marriageBurdenReliefFundOpen} id="basic-button" /></Box>
                                                <MarriageBurdenReliefFundModal filterData={filterData} setFilterData={setFilterData} marriageBurdenReliefFund={marriageBurdenReliefFund} marriageBurdenReliefFundClose={marriageBurdenReliefFundClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.TotalWithdrawal && <TableCell style={{ borderRight: "none" }} width={150} position={"relative"}>   <Box className='center' >Total Withdrawal <FilterAltOutlinedIcon className='pointer' onClick={totalWithdrawalOpen} id="basic-button" /></Box>
                                                <TotalWithdrawalModal filterData={filterData} setFilterData={setFilterData} totalWithdrawal={totalWithdrawal} totalWithdrawalClose={totalWithdrawalClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.TDSBalance && <TableCell style={{ borderRight: "none" }} width={140} position={"relative"}>   <Box className='center' >TDS Balance <FilterAltOutlinedIcon className='pointer' onClick={tdsBalanceOpen} id="basic-button" /></Box>
                                                <TDSBalanceModal filterData={filterData} setFilterData={setFilterData} tdsBalance={tdsBalance} tdsBalanceClose={tdsBalanceClose} />
                                    
                                    </TableCell>}
                                    {afterSubmitSelectedRow?.TDSPaid && <TableCell style={{ borderRight: "none" }} width={140} position={"relative"}>  <Box className='center' >TDS Paid <FilterAltOutlinedIcon className='pointer' onClick={paidTcsOpen} id="basic-button" /></Box>
                                                <PaidTCSModal filterData={filterData} setFilterData={setFilterData} paidTcs={paidTcs} paidTcsClose={paidTcsClose} />
                                    
                                    </TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row, id) => (
                                    <TableRow
                                        hover
                                        key={id} style={{ textAlign: "left" }}>
                                        <TableCell align="left" style={{ position: 'sticky', left: 0, backgroundColor: '#fff', borderRight: "none" }}>
                                            {id + 1}
                                        </TableCell>
                                        {afterSubmitSelectedRow?.RegistrationDateTime && <TableCell align="left" style={{ position: 'sticky', left: 55, backgroundColor: '#fff', zIndex: 9, borderRight: "none" }}>{formatDate(row?.registration_date)}</TableCell>}
                                        {afterSubmitSelectedRow?.AuthorizationDateTime && <TableCell align="left" style={{ position: 'sticky', left: 185, backgroundColor: '#fff', zIndex: 9, borderRight: "none" }}>{formatDate(row?.authorization_date)}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateID && <TableCell align="left" style={{ position: 'sticky', left: 315, backgroundColor: '#fff', zIndex: 9, borderRight: "none" }}><Typography color={"#7EAADE"} style={{ cursor: "pointer" }} onClick={() => window.open(`/affiliateProfile?id=${row?.user_id}`, "_blank")} >{row?.authorization_id}</Typography></TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateName && <TableCell align="left" style={{ position: 'sticky', left: 455, backgroundColor: '#fff', zIndex: 9, borderRight: "none", boxShadow: "10px 10px 24px -8px rgb(42 57 78 / 16%)" }}>{row?.first_name + " " + row?.last_name}</TableCell>}
                                        {afterSubmitSelectedRow?.State && <TableCell style={{ borderRight: "none" }} align="left">{row?.state}</TableCell>}
                                        {afterSubmitSelectedRow?.District && <TableCell style={{ borderRight: "none" }} align="left">{row?.district}</TableCell>}
                                        {afterSubmitSelectedRow?.Taluka && <TableCell style={{ borderRight: "none" }} align="left">{row?.block}</TableCell>}
                                        {afterSubmitSelectedRow?.Pincode && <TableCell style={{ borderRight: "none" }} align="left">{row?.pincode}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateRank && <TableCell style={{ borderRight: "none" }} align="left">{row?.affiliate_rank}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateType && <TableCell style={{ borderRight: "none" }} align="left">{row?.afftype}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateMobileNo && <TableCell style={{ borderRight: "none" }} align="left">{row?.mobile}</TableCell>}
                                        {afterSubmitSelectedRow?.EmailID && <TableCell style={{ borderRight: "none" }} align="left">{row?.email}</TableCell>}
                                        {afterSubmitSelectedRow?.SponsorType && <TableCell style={{ borderRight: "none" }} align="left">{row.spontype}</TableCell>}
                                        {afterSubmitSelectedRow?.SponsorRank && <TableCell style={{ borderRight: "none" }} align="left">{row?.sponsor_rank}</TableCell>}
                                        {afterSubmitSelectedRow?.Sponsorid && <TableCell style={{ borderRight: "none" }} align="left">{row?.ref_mlm_id}</TableCell>}
                                        {afterSubmitSelectedRow?.SponsorName && <TableCell style={{ borderRight: "none" }} align="left">{row?.ref_first_name}</TableCell>}
                                        {afterSubmitSelectedRow?.SponsorMobileNo && <TableCell style={{ borderRight: "none" }} align="left">{row?.ref_mobile}</TableCell>}
                                        {afterSubmitSelectedRow?.ViewUplineList && <TableCell style={{ borderRight: "none" }} align="left"><Typography color={"#7EAADE"} style={{ cursor: "pointer" }} onClick={() => window.open(`/uplineList?id=${row?.user_id}`, "_blank")} >{row?.upline_count}</Typography></TableCell>}
                                        {afterSubmitSelectedRow?.Team && <TableCell style={{ borderRight: "none" }} align="left"><Typography color={"#7EAADE"} style={{ cursor: "pointer" }} onClick={() => window.open(`/teamList?id=${row?.user_id}`, "_blank")} >{row?.autorized_team_count}</Typography></TableCell>}
                                        {afterSubmitSelectedRow?.PendingLeads && <TableCell style={{ borderRight: "none" }} align="left"><Typography color={"#7EAADE"} style={{ cursor: "pointer" }} onClick={() => window.open(`/pendingLeadsList?id=${row?.user_id}`, "_blank")} >{row?.pending_leads}</Typography></TableCell>}
                                        {afterSubmitSelectedRow?.SelfPurchaseDV && <TableCell style={{ borderRight: "none" }} align="left">{row?.self_dv}</TableCell>}
                                        {afterSubmitSelectedRow?.My1stLevelTotalPurchaseDV && <TableCell style={{ borderRight: "none" }} align="left">{row?.firstlevel_dv}</TableCell>}
                                        {afterSubmitSelectedRow?.AuthorizedMembersInsecondlevel && <TableCell style={{ borderRight: "none" }} align="left">{row?.authorized_second_level}</TableCell>}
                                        {afterSubmitSelectedRow?.TotalActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.total_active_income?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.TotalPassiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.total_passive_income?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.DematActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.demat_active_income?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.CoursesActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.courses_active_income?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.InsuranceActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.insurance_active_income?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.InvestmentActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.investment_active_income?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.Primerequest && <TableCell style={{ borderRight: "none" }} align="left">{row?.prime_request}</TableCell>}
                                        {afterSubmitSelectedRow?.KYCStatus && <TableCell style={{ borderRight: "none" }} align="left">{row?.kyc_status}</TableCell>}
                                        {afterSubmitSelectedRow?.NomineeStatus && <TableCell style={{ borderRight: "none" }} align="left">{row?.nominee_status}</TableCell>}
                                        {afterSubmitSelectedRow?.AffiliateStatus && <TableCell style={{ borderRight: "none" }} align="left">{row?.affiliate_status}</TableCell>}
                                        {afterSubmitSelectedRow?.BlockReason && <TableCell style={{ borderRight: "none" }} align="left">{row?.block_reason}</TableCell>}
                                        {afterSubmitSelectedRow?.LastCommunication && <TableCell style={{ borderRight: "none" }} align="left">
                                            <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
                                                <Image src="/Group 1000005406.png" height={25} width={25} style={{cursor : "pointer"}} onClick={handlechatModalOpen}/>
                                                <Image src="/Group 1000005405.png" height={25} width={25} style={{marginLeft : "10px", cursor : "pointer"}} onClick={handleCallModalOpen}/>
                                                <Box display={"flex"} justifyContent={"start"} alignItems={"center"} ml={1}>
                                                    <Box borderRadius={"2px"} style={{cursor : "pointer"}} backgroundColor="#FF9F59" px={1} py={0.5} display={"flex"} justifyContent={"start"} alignItems={"center"} onClick={handleCallModalOpen}>
                                                        <Typography fontSize={10} fontWeight={500} color={"white"}>Past Recordings</Typography>&nbsp;
                                                        <MicIcon style={{color : "white" , fontSize : "10px"}}/>
                                                    </Box>
                                                    <Box ml={1} borderRadius={"2px"} style={{cursor : "pointer"}} backgroundColor="#FF9F59" px={1} py={0.5} display={"flex"} justifyContent={"start"} alignItems={"center"} onClick={handleCallModalOpen}>
                                                        <Typography fontSize={10} fontWeight={500} color={"white"}>Add Note</Typography>&nbsp;
                                                        <AccessAlarmIcon style={{color : "white" , fontSize : "10px"}}/>

                                                    </Box>
                                                </Box>
                                            </Box>
                                        </TableCell>}
                                        {/* {afterSubmitSelectedRow?.NoteReminder && <TableCell style={{ borderRight: "none" }} align="left">{row.age}</TableCell>} */}
                                        {afterSubmitSelectedRow?.Action && <TableCell style={{ borderRight: "none" }} align="left">

                                            <div>
                                                {/* <Button
                                                    id="demo-customized-button"
                                                    aria-controls={open ? 'demo-customized-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    variant="contained"
                                                    disableElevation
                                                    onClick={handleClickAction}
                                                    endIcon={<KeyboardArrowDownIcon />}
                                                >
                                                    Options
                                                </Button> */}
                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClickAction}
                                                >

                                                    <MoreHorizIcon />
                                                </IconButton>
                                                <StyledMenu
                                                    id="demo-customized-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'demo-customized-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleCloseAction}
                                                >
                                                    <MenuItem onClick={() => {handleCloseAction(); window.open(`/affiliateProfile?id=${row?.user_id}`, "_blank")}} disableRipple>
                                                        <PersonOutlineIcon />
                                                        Profile
                                                    </MenuItem>
                                                    <MenuItem onClick={handleCloseAction} disableRipple>
                                                        <CreditCardIcon />
                                                        KYC
                                                    </MenuItem>
                                                    <MenuItem onClick={handleCloseAction} disableRipple>
                                                        <KeyIcon />
                                                        Change Password
                                                    </MenuItem>
                                                    <MenuItem onClick={() => { setActionData(row); primeRequestOpen() }} disableRipple>
                                                        <SettingsIcon />
                                                        Prime Request
                                                    </MenuItem>
                                                    <MenuItem onClick={handleCloseAction} disableRipple>
                                                        <BlockIcon />
                                                        Block/Unblock
                                                    </MenuItem>
                                                </StyledMenu>
                                            </div>
                                        </TableCell>}

                                        <TableCell style={{ borderRight: "none" }} align="left">{row?.wallet_balance}</TableCell>
                                        {/* {afterSubmitSelectedRow?.SmartPeWalletBalance && <TableCell style={{ borderRight: "none" }} align="left">{row?.wallet_balance}</TableCell>} */}
                                        {afterSubmitSelectedRow?.TotalEarning && <TableCell style={{ borderRight: "none" }} align="left">{row?.total_earning?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.MainActiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.total_main_active_income}</TableCell>}
                                        {afterSubmitSelectedRow?.MainPassiveIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.total_main_passive_income}</TableCell>}
                                        {afterSubmitSelectedRow?.RewardIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.total_reward?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.SalaryIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.salary_fund?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.RoyaltyIncome && <TableCell style={{ borderRight: "none" }} align="left">{row?.total_royality}</TableCell>}
                                        {afterSubmitSelectedRow?.SIPMFFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.sip_amount?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.LaptopFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.laptop_amount?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.BikeFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.bike_amount?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.CarFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.car_amount?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.HouseFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.house_amount?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.TravelFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.travel_income}</TableCell>}
                                        {afterSubmitSelectedRow?.InsuranceFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.insurance_amount?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.ChildHigherEducationFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.child_education}</TableCell>}
                                        {afterSubmitSelectedRow?.MarriageBurdenReliefFund && <TableCell style={{ borderRight: "none" }} align="left">{row?.marraige_fund?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.TotalWithdrawal && <TableCell style={{ borderRight: "none" }} align="left">{row?.withdrawal_amount?.toFixed(2)}</TableCell>}
                                        {afterSubmitSelectedRow?.TDSBalance && <TableCell style={{ borderRight: "none" }} align="left">{row?.total_tds_balance}</TableCell>}
                                        {afterSubmitSelectedRow?.TDSPaid && <TableCell align="left">{row?.total_tds_paid}</TableCell>}


                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box display={"flex"} justifyContent={"end"}><Pagination count={totlaPage} page={filterData?.page} onChange={(e, v) => setFilterData({ ...filterData, page: v })} />
                    </Box>
                </Box> : <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"500px"}><CircularProgress /></Box>}

                <CustomizetableModal Customizetable={Customizetable} CustomizetableClose={CustomizetableClose} handleChange={handleChange} selectedTableRow={selectedTableRow} pinnedTableRow={pinnedTableRow} handleChangePin={handleChangePin} setAfterSubmitSelectedRow={setAfterSubmitSelectedRow} setselectedTableRow={setselectedTableRow} />
                <PrimeRequestActionModal PrimeRequestModal={PrimeRequestModal} primeRequestClose={primeRequestClose} PrimeRequestClick={PrimeRequestClick} />
                            <ChatModal openChatModal={openChatModal} handlechatModalClose={handlechatModalClose}/>
                            <CallModal openCallModal={openCallModal} handleCallModalClose={handleCallModalClose}/>
                
            </Box>

        </Layout>
    );
};

export default StickyTable;
