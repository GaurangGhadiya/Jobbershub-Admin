import { Autocomplete, Box, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SelectDropdown from '../SelectDropdown';
import InputFieldWithIcon from '../InputFieldWithIcon';
import SearchIcon from '@mui/icons-material/Search';
import GreenBtn from '../Button/Green';
import RegistrationPastDaysModal from '../Modals/RegistrationDaysModal';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AuthorizationPastDaysModal from '../Modals/AuthorizationDaysModal';
import SponserTypeModal from '../Modals/SponserTypeModal';
import AffiliateTypeModal from '../Modals/AffiliateTypeModal';
import SponserRankModal from '../Modals/SponserRankModal';
import AffiliateRankModal from '../Modals/AffiliateRankModal';
import SmartpeWalletBalanceModal from '../Modals/SmartpeWalletBalanceModal';
import TotalEarningModal from '../Modals/TotalEarningModal';
import ActiveWalletBalanceModal from '../Modals/ActiveWalletBalance';
import PassiveWalletBalanceModal from '../Modals/PassiveWalletBalanceModal';
import TotalWithdrawalModal from '../Modals/WithdrawalModal';
import RoyaltyIncomeModal from '../Modals/RoyaltyIncomeModal';
import RewardIncomeModal from '../Modals/RewardIncomeModal';
import SIPMFFundsModal from '../Modals/SIPMFFundsModal';
import LaptopFundsModal from '../Modals/LaptopFundsModal';
import BickFundsModal from '../Modals/BickFundsModal';
import CarFundsModal from '../Modals/CarFundsModal';
import HouseFundsModal from '../Modals/HouseFundsModal';
import TDSBalanceModal from '../Modals/TDSBalanceModal';
import PaidTCSModal from '../Modals/PaidTDSModal';
import PendingLeadsModal from '../Modals/PendingLeadsModal';
import UnauthorizedLeadsModal from '../Modals/UnauthorizedLeadsModal';
import AuthorizedLeadsModal from '../Modals/AuthorizedLeadsModal';
import SelfPurchaseDVModal from '../Modals/SelfPurchaseDVModal';
import DirectPurchaseDVModal from '../Modals/DirectPurchaseDVModal';
import AuthorizedMembersModal from '../Modals/AuthorizedMembersModala';
import SecondLevelMembersModal from '../Modals/SecondLevelMembersModal';
import KYCStatusModal from '../Modals/KYCStatusModal';
import NomineeStatusModal from '../Modals/NomineeStatusModal';
import AffiliateStatusModal from '../Modals/AffiliateStatusModal';
import StateModal from '../Modals/StateModal';
import DistrictModal from '../Modals/DistrictModal';
import TalukaModal from '../Modals/TalukaModal';
import TeamModal from '../Modals/TeamModal';
import SalaryIncomeModal from '../Modals/SalaryIncomeModal';
import InsuranceFundsModal from '../Modals/InsuranceFundsModal';
import ChildHigherEducationFundModal from '../Modals/ChildHigherEducationFundModal';
import MarriageBurdenReliefFundModal from '../Modals/MarriageBurdenReliefFundModal';
import TotalActiveIncomeModal from '../Modals/TotalActiveIncomeModal';
import TotalPassiveIncomeModal from '../Modals/TotalPassiveIncomeModal';
import DematActiveIncomeModal from '../Modals/DematActiveIncomeModal';
import CoursesActiveIncomeModal from '../Modals/CoursesActiveIncomeModal';
import InsuranceActiveIncomeModal from '../Modals/InsuranceActiveIncomeModal';
import InvestmentActiveIncomeModal from '../Modals/InvestmentActiveIncomeModal';
import PrimeRequestModal from '../Modals/PrimeRequestModal';
import UplineCountModal from '../Modals/UplineCountModal';

const options = [
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'india', label: 'India' },
];
const searchOptions = [
    { value: 'affiliate_id', label: 'Affiliate ID' },
    { value: 'affiliate_name', label: 'Affiliate Name' },
    { value: 'pincode', label: 'Pincode' },
    { value: 'affiliate_mobileno', label: 'Affiliate mobile number' },
    { value: 'affiliate_emailid', label: 'Email ID' },
    { value: 'sponsor_id', label: 'Sponsor id' },
    { value: 'sponsor_name', label: 'Sponsor Name' },
    { value: 'sponsor_mobileno', label: 'Sponsor Mobile Number' },
];
const CourseFilter = ({ filterData, setFilterData, getTableData ,filterValue, setFilterValue}) => {
    const [searchFilter, setSearchFilter] = useState("")
    const [registrationPastDays, setregistrationPastDays] = React.useState(false);
    const [authorizationPastDays, setauthorizationPastDays] = React.useState(false);
    const [sponserType, setsponserType] = React.useState(false);
    const [sponserRank, setsponserRank] = React.useState(false);
    const [affiliateType, setaffiliateType] = React.useState(false);
    const [affiliateRank, setaffiliateRank] = React.useState(false);
    const [smartpeWalletBalance, setsmartpeWalletBalance] = React.useState(false);
    const [totalEarning, settotalEarning] = React.useState(false);
    const [activeWalletBalance, setactiveWalletBalance] = React.useState(false);
    const [passiveWalletBalance, setpassiveWalletBalance] = React.useState(false);
    const [totalWithdrawal, settotalWithdrawal] = React.useState(false);
    const [royaltyIncome, setroyaltyIncome] = React.useState(false);
    const [rewardIncome, setrewardIncome] = React.useState(false);
    const [SIPMFFunds, setSIPMFFunds] = React.useState(false);
    const [laptopFunds, setlaptopFunds] = React.useState(false);
    const [bickFunds, setbickFunds] = React.useState(false);
    const [carFunds, setcarFunds] = React.useState(false);
    const [houseFunds, sethouseFunds] = React.useState(false);
    const [insuranceFunds, setinsuranceFunds] = React.useState(false);
    const [childHigherEducationFund, setchildHigherEducationFund] = React.useState(false);
    const [marriageBurdenReliefFund, setmarriageBurdenReliefFund] = React.useState(false);
    const [tdsBalance, settdsBalance] = React.useState(false);
    const [paidTcs, setpaidTcs] = React.useState(false);
    const [pendingLeads, setpendingLeads] = React.useState(false);
    const [unauthorized, setunauthorized] = React.useState(false);
    const [authorized, setauthorized] = React.useState(false);
    const [selfPurchaseDV, setselfPurchaseDV] = React.useState(false);
    const [directPurchaseDV, setdirectPurchaseDV] = React.useState(false);
    const [authorizedMembers, setauthorizedMembers] = React.useState(false);
    const [secondLevelMembers, setsecondLevelMembers] = React.useState(false);
    const [KYCStatus, setKYCStatus] = React.useState(false);
    const [nomineeStatus, setnomineeStatus] = React.useState(false);
    const [affiliateStatus, setaffiliateStatus] = React.useState(false);
    const [state, setstate] = React.useState(false);
    const [district, setdistrict] = React.useState(false);
    const [taluka, settaluka] = React.useState(false);
    const [team, setteam] = React.useState(false);
    const [salary, setsalary] = React.useState(false);
    const [totalActiveIncome, settotalActiveIncome] = React.useState(false);
    const [totalPassiveIncome, settotalPassiveIncome] = React.useState(false);
    const [dematActiveIncome, setdematActiveIncome] = React.useState(false);
    const [coursesActiveIncome, setcoursesActiveIncome] = React.useState(false);
    const [insuranceActiveIncome, setinsuranceActiveIncome] = React.useState(false);
    const [investmentActiveIncome, setinvestmentActiveIncome] = React.useState(false);
    const [primeRequest, setprimeRequest] = React.useState(false);
    const [uplineCount, setuplineCount] = React.useState(false);

    const registrationPastDaysOpen = () => {
        setregistrationPastDays(true);
    };
    const registrationPastDaysClose = () => {
        setregistrationPastDays(false);
    };
    const authorizationPastDaysOpen = () => {
        setauthorizationPastDays(true);
    };
    const authorizationPastDaysClose = () => {
        setauthorizationPastDays(false);
    };
    const sponserTypeOpen = () => {
        setsponserType(true);
    };
    const sponserTypeClose = () => {
        setsponserType(false);
    };
    const sponserRankOpen = () => {
        setsponserRank(true);
    };
    const sponserRankClose = () => {
        setsponserRank(false);
    };
    const affiliateTypeOpen = () => {
        setaffiliateType(true);
    };
    const affiliateTypeClose = () => {
        setaffiliateType(false);
    };
    const affiliateRankOpen = () => {
        setaffiliateRank(true);
    };
    const affiliateRankClose = () => {
        setaffiliateRank(false);
    };
    const smartpeWalletBalanceOpen = () => {
        setsmartpeWalletBalance(true);
    };
    const smartpeWalletBalanceClose = () => {
        setsmartpeWalletBalance(false);
    };
    const totalEarningOpen = () => {
        settotalEarning(true);
    };
    const totalEarningClose = () => {
        settotalEarning(false);
    };
    const activeWalletBalanceOpen = () => {
        setactiveWalletBalance(true);
    };
    const activeWalletBalanceClose = () => {
        setactiveWalletBalance(false);
    };
    const passiveWalletBalanceOpen = () => {
        setpassiveWalletBalance(true);
    };
    const passiveWalletBalanceClose = () => {
        setpassiveWalletBalance(false);
    };
    const totalWithdrawalOpen = () => {
        settotalWithdrawal(true);
    };
    const totalWithdrawalClose = () => {
        settotalWithdrawal(false);
    };
    const royaltyIncomeOpen = () => {
        setroyaltyIncome(true);
    };
    const royaltyIncomeClose = () => {
        setroyaltyIncome(false);
    };
    const rewardIncomeOpen = () => {
        setrewardIncome(true);
    };
    const rewardIncomeClose = () => {
        setrewardIncome(false);
    };
    const SIPMFFundsOpen = () => {
        setSIPMFFunds(true);
    };
    const SIPMFFundsClose = () => {
        setSIPMFFunds(false);
    };
    const laptopFundsOpen = () => {
        setlaptopFunds(true);
    };
    const laptopFundsClose = () => {
        setlaptopFunds(false);
    };
    const bickFundsOpen = () => {
        setbickFunds(true);
    };
    const bickFundsClose = () => {
        setbickFunds(false);
    };
    const carFundsOpen = () => {
        setcarFunds(true);
    };
    const carFundsClose = () => {
        setcarFunds(false);
    };
    const houseFundsOpen = () => {
        sethouseFunds(true);
    };
    const houseFundsClose = () => {
        sethouseFunds(false);
    };
    const insuranceFundsOpen = () => {
        setinsuranceFunds(true);
    };
    const insuranceFundsClose = () => {
        setinsuranceFunds(false);
    };
    const childHigherEducationFundOpen = () => {
        setchildHigherEducationFund(true);
    };
    const childHigherEducationFundClose = () => {
        setchildHigherEducationFund(false);
    };
    const marriageBurdenReliefFundOpen = () => {
        setmarriageBurdenReliefFund(true);
    };
    const marriageBurdenReliefFundClose = () => {
        setmarriageBurdenReliefFund(false);
    };
    const tdsBalanceOpen = () => {
        settdsBalance(true);
    };
    const tdsBalanceClose = () => {
        settdsBalance(false);
    };
    const paidTcsOpen = () => {
        setpaidTcs(true);
    };
    const paidTcsClose = () => {
        setpaidTcs(false);
    };
    const pendingLeadsOpen = () => {
        setpendingLeads(true);
    };
    const pendingLeadsClose = () => {
        setpendingLeads(false);
    };
    const unauthorizedOpen = () => {
        setunauthorized(true);
    };
    const unauthorizedClose = () => {
        setunauthorized(false);
    };
    const authorizedOpen = () => {
        setauthorized(true);
    };
    const authorizedClose = () => {
        setauthorized(false);
    };
    const selfPurchaseDVOpen = () => {
        setselfPurchaseDV(true);
    };
    const selfPurchaseDVClose = () => {
        setselfPurchaseDV(false);
    };
    const directPurchaseDVOpen = () => {
        setdirectPurchaseDV(true);
    };
    const directPurchaseDVClose = () => {
        setdirectPurchaseDV(false);
    };
    const authorizedMembersOpen = () => {
        setauthorizedMembers(true);
    };
    const authorizedMembersClose = () => {
        setauthorizedMembers(false);
    };
    const secondLevelMembersOpen = () => {
        setsecondLevelMembers(true);
    };
    const secondLevelMembersClose = () => {
        setsecondLevelMembers(false);
    };
    const KYCStatusOpen = () => {
        setKYCStatus(true);
    };
    const KYCStatusClose = () => {
        setKYCStatus(false);
    };
    const nomineeStatusOpen = () => {
        setnomineeStatus(true);
    };
    const nomineeStatusClose = () => {
        setnomineeStatus(false);
    };
    const affiliateStatusOpen = () => {
        setaffiliateStatus(true);
    };
    const affiliateStatusClose = () => {
        setaffiliateStatus(false);
    };
    const stateOpen = () => {
        setstate(true);
    };
    const stateClose = () => {
        setstate(false);
    };
    const districtOpen = () => {
        setdistrict(true);
    };
    const districtClose = () => {
        setdistrict(false);
    };
    const talukaOpen = () => {
        settaluka(true);
    };
    const talukaClose = () => {
        settaluka(false);
    };
    const teamOpen = () => {
        setteam(true);
    };
    const teamClose = () => {
        setteam(false);
    };
    const salaryOpen = () => {
        setsalary(true);
    };
    const salaryClose = () => {
        setsalary(false);
    };
    const totalActiveIncomeOpen = () => {
        settotalActiveIncome(true);
    };
    const totalActiveIncomeClose = () => {
        settotalActiveIncome(false);
    };
    const totalPassiveIncomeOpen = () => {
        settotalPassiveIncome(true);
    };
    const totalPassiveIncomeClose = () => {
        settotalPassiveIncome(false);
    };
    const dematActiveIncomeOpen = () => {
        setdematActiveIncome(true);
    };
    const dematActiveIncomeClose = () => {
        setdematActiveIncome(false);
    };
    const coursesActiveIncomeOpen = () => {
        setcoursesActiveIncome(true);
    };
    const coursesActiveIncomeClose = () => {
        setcoursesActiveIncome(false);
    };
    const insuranceActiveIncomeOpen = () => {
        setinsuranceActiveIncome(true);
    };
    const insuranceActiveIncomeClose = () => {
        setinsuranceActiveIncome(false);
    };
    const investmentActiveIncomeOpen = () => {
        setinvestmentActiveIncome(true);
    };
    const investmentActiveIncomeClose = () => {
        setinvestmentActiveIncome(false);
    };
    const primeRequestOpen = () => {
        setprimeRequest(true);
    };
    const primeRequestClose = () => {
        setprimeRequest(false);
    };
    const uplineCountOpen = () => {
        setuplineCount(true);
    };
    const uplineCountClose = () => {
        setuplineCount(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFilterValue({ ...filterValue, [name]: value });
    };
    console.log('filterValue', filterValue)
    return (
        <Box style={{ backgroundColor: "white" }} className="bottomborder" mb={3} pt={2}>
            <Grid container spacing={2} p={2} pt={0} position={"relative"}>
                <Grid item sm={12} md={1.2} >

                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Created</Typography>
                    <Box onClick={registrationPastDaysOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"3px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>{filterData?.reg_date_filter}</Typography>
                        <ArrowDropDownIcon />

                    </Box>
                    <RegistrationPastDaysModal filterData={filterData} setFilterData={setFilterData} registrationPastDays={registrationPastDays} registrationPastDaysClose={registrationPastDaysClose} />

                </Grid>
                <Grid item sm={12} md={1.2}>

                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Creator</Typography>

                    <Box onClick={authorizationPastDaysOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"3px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>{filterData?.authorization_date_filter}</Typography>
                        <ArrowDropDownIcon />

                    </Box>
                    <AuthorizationPastDaysModal filterData={filterData} setFilterData={setFilterData} authorizationPastDays={authorizationPastDays} authorizationPastDaysClose={authorizationPastDaysClose} />

                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Language</Typography>

                    <Box onClick={stateOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                        style={{ cursor: "pointer", border: searchFilter?.includes("state") ? "2px solid blue" : "1px solid #CDCDCD" }}
                    >
                        <Typography fontSize={"14px"} color={"#707070"}>{filterData?.state}</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Category</Typography>

                    <Box onClick={districtOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                        style={{ cursor: "pointer", border: searchFilter?.includes("district") ? "2px solid blue" : "1px solid #CDCDCD" }}
                    >
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Course</Typography>

                    <Box onClick={talukaOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                        style={{ cursor: "pointer", border: searchFilter?.includes("taluka") ? "2px solid blue" : "1px solid #CDCDCD" }}
                    >
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>

                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Discounted price</Typography>

                    <Box onClick={affiliateRankOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                        style={{ cursor: "pointer", border: searchFilter?.includes("affiliate rank") ? "2px solid blue" : "1px solid #CDCDCD" }}
                    >
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>GST</Typography>

                    <Box onClick={affiliateTypeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Marketing Fee</Typography>

                    <Box onClick={affiliateTypeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                {/* <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Marketing Fee</Typography>

                    <SelectDropdown
                        value={filterValue?.selectSearch || ""}
                        name="selectSearch"
                        onChange={handleChange}
                        options={searchOptions}
                        placeholder="Select field for search"
                    />

                </Grid> */}
                {/* <Grid item sm={12} md={2.4}>
                    <TextField
                        id="input-with-icon-textfield"
                        placeholder='Search'
                        label=""
                        value={filterValue?.searchValue || ""}
                        name = "searchValue"
                        onChange={handleChange}

                        style={{ marginBottom: "10px", marginTop: "15px", width: "100%" }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            // endAdornment: (
                            //     <InputAdornment position="start">
                            //         <Box onClick={() => setSearchFilter(filterValue?.searchFilter)} style={{ cursor: "pointer", padding: "2px 19px 0 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"100%"} >
                            //             <Typography color={"white"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Search</Typography>
                            //         </Box>                              </InputAdornment>
                            // ),
                        }}
                        variant="standard"
                    />
                </Grid> */}
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Slotting Fee</Typography>

                    <Box onClick={sponserRankOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>My Net Profit</Typography>

                    <Box onClick={sponserTypeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Rating</Typography>

                    <Box onClick={uplineCountOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Course Request</Typography>

                    <Box onClick={primeRequestOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                {/* <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>KYC Status</Typography>

                    <Box onClick={KYCStatusOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Nominee Status</Typography>

                    <Box onClick={nomineeStatusOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Affiliate Status</Typography>

                    <Box onClick={affiliateStatusOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>

                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Block Reason</Typography>

                    <Box onClick={() => { }} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Last Communication</Typography>

                    <Box onClick={() => { }} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={1.2}>
                    <Typography color={"#707070"} fontWeight={600} fontSize={"12px"}>Reminder</Typography>

                    <Box onClick={() => { }} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>All</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid> */}



                {/* {filterValue?.selectSearch && <Grid item sm={12} md={2}>
                    <InputFieldWithIcon

                        value={filterValue?.searchValue || ""}
                        name="searchValue"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search..."
                    />
                </Grid>}
                <Grid item sm={12} md={2}>
                  
                    <Autocomplete
                        disablePortal
                        options={[]}
                        //   padding : '10px'
                        sx={{ padding: "0px !important" }}
                        renderInput={(params) => <TextField {...params} placeholder="Search filter..." padding={"0px"} label="" />}
                    />
                </Grid>
                <Grid item sm={12} md={2}>
                    <Box onClick={() => setSearchFilter(filterValue?.searchFilter)} style={{ cursor: "pointer", padding: "2px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"100px"} >
                        <Typography color={"white"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Search</Typography>
                    </Box>
                </Grid> */}
                {/* {!filterValue?.selectSearch && <Grid item sm={12} md={2}>

                </Grid>} */}




                {/* <Grid item sm={12} md={2}>

                    <Box onClick={teamOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Team</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                   
                    <Box onClick={pendingLeadsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Pending Leads </Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                  
                    <Box onClick={selfPurchaseDVOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Self Purchase DC</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
            
                <Grid item sm={12} md={2}>
                   
                    <Box onClick={authorizedMembersOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>My 1st Level Total Purchase DV</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                
                    <Box onClick={secondLevelMembersOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Authorized Members in Second Level</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                  
                    <Box onClick={totalActiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Total Active Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                 
                    <Box onClick={totalPassiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Total Passive Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    
                    <Box onClick={dematActiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Demat A/C Active Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                  
                    <Box onClick={coursesActiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Courses Active Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                   
                    <Box onClick={insuranceActiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Insurance Active Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                  
                    <Box onClick={investmentActiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Investment Active income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>

                <Grid item sm={12} md={2}>
                 
                    <Box onClick={smartpeWalletBalanceOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search SmartPe Wallet Balance</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                 
                    <Box onClick={totalEarningOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Total Earning</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                 
                    <Box onClick={activeWalletBalanceOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Main Active Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                  
                    <Box onClick={passiveWalletBalanceOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Main Passive Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>

                <Grid item sm={12} md={2}>
                 
                    <Box onClick={rewardIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> Reward Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                 
                    <Box onClick={salaryOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> Salary Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                 
                    <Box onClick={royaltyIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> Royalty Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                  
                    <Box onClick={SIPMFFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search SIP/MF Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
              
                    <Box onClick={laptopFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search Laptop Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                 
                    <Box onClick={bickFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search Bick Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                  
                    <Box onClick={carFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search Car Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                 
                    <Box onClick={houseFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search House Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                   
                    <Box onClick={insuranceFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search Insurance Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    
                    <Box onClick={childHigherEducationFundOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Child Higher Education Fund</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                  
                    <Box onClick={marriageBurdenReliefFundOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Marriage Burden Relief Fund</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                  
                    <Box onClick={totalWithdrawalOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> Total Withdrawal</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                 
                    <Box onClick={tdsBalanceOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> TDS Balance</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                   
                    <Box onClick={paidTcsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> Paid TDS </Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid> */}

                {/* <Grid item sm={12} md={2}>
                    <SelectDropdown
                        value={filterValue?.totalUnauthorizedLeads || ""}
                        name="totalUnauthorizedLeads"
                        onChange={handleChange}
                        options={options}
                        placeholder="Total Unauthorized Leads"
                    />
                         <Box onClick={unauthorizedOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Total Unauthorized Leads </Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    <SelectDropdown
                        value={filterValue?.totalAuthorizedLeads || ""}
                        name="totalAuthorizedLeads"
                        onChange={handleChange}
                        options={options}
                        placeholder="Total Authorized Leads"
                    />
                       <Box onClick={authorizedOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Total Authorized Leads </Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                */}


                <Box width={"100%"} display={"flex"} justifyContent={"end"} mt={3}>
                    <Box style={{ cursor: "pointer", padding: "5px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"140px"} mr={1} onClick={() => {
                        setFilterData({
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
                        });
                        getTableData({
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
                        })
                    }}>
                        <Typography color={"#FF9F59"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                    </Box>
                    <Box style={{ cursor: "pointer", padding: "5px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"140px"} onClick={getTableData}>
                        <Typography color={"white"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Apply Filter</Typography>
                    </Box>
                </Box>

            </Grid>
            <SponserTypeModal filterData={filterData} setFilterData={setFilterData} sponserType={sponserType} sponserTypeClose={sponserTypeClose} />
            <SponserRankModal filterData={filterData} setFilterData={setFilterData} sponserRank={sponserRank} sponserRankClose={sponserRankClose} />
            <AffiliateTypeModal filterData={filterData} setFilterData={setFilterData} affiliateType={affiliateType} affiliateTypeClose={affiliateTypeClose} />
            <AffiliateRankModal filterData={filterData} setFilterData={setFilterData} affiliateRank={affiliateRank} affiliateRankClose={affiliateRankClose} />
            <SmartpeWalletBalanceModal filterData={filterData} setFilterData={setFilterData} smartpeWalletBalance={smartpeWalletBalance} smartpeWalletBalanceClose={smartpeWalletBalanceClose} />
            <TotalEarningModal filterData={filterData} setFilterData={setFilterData} totalEarning={totalEarning} totalEarningClose={totalEarningClose} />
            <ActiveWalletBalanceModal filterData={filterData} setFilterData={setFilterData} activeWalletBalance={activeWalletBalance} activeWalletBalanceClose={activeWalletBalanceClose} />
            <PassiveWalletBalanceModal filterData={filterData} setFilterData={setFilterData} passiveWalletBalance={passiveWalletBalance} passiveWalletBalanceClose={passiveWalletBalanceClose} />
            <TotalWithdrawalModal filterData={filterData} setFilterData={setFilterData} totalWithdrawal={totalWithdrawal} totalWithdrawalClose={totalWithdrawalClose} />
            <RoyaltyIncomeModal filterData={filterData} setFilterData={setFilterData} royaltyIncome={royaltyIncome} royaltyIncomeClose={royaltyIncomeClose} />
            <RewardIncomeModal filterData={filterData} setFilterData={setFilterData} rewardIncome={rewardIncome} rewardIncomeClose={rewardIncomeClose} />
            <SIPMFFundsModal filterData={filterData} setFilterData={setFilterData} SIPMFFunds={SIPMFFunds} SIPMFFundsClose={SIPMFFundsClose} />
            <LaptopFundsModal filterData={filterData} setFilterData={setFilterData} laptopFunds={laptopFunds} laptopFundsClose={laptopFundsClose} />
            <BickFundsModal filterData={filterData} setFilterData={setFilterData} bickFunds={bickFunds} bickFundsClose={bickFundsClose} />
            <CarFundsModal filterData={filterData} setFilterData={setFilterData} carFunds={carFunds} carFundsClose={carFundsClose} />
            <HouseFundsModal filterData={filterData} setFilterData={setFilterData} houseFunds={houseFunds} houseFundsClose={houseFundsClose} />
            <InsuranceFundsModal filterData={filterData} setFilterData={setFilterData} insurance={insuranceFunds} insuranceClose={insuranceFundsClose} />
            <ChildHigherEducationFundModal filterData={filterData} setFilterData={setFilterData} childHigherEducationFund={childHigherEducationFund} childHigherEducationFundClose={childHigherEducationFundClose} />
            <MarriageBurdenReliefFundModal filterData={filterData} setFilterData={setFilterData} marriageBurdenReliefFund={marriageBurdenReliefFund} marriageBurdenReliefFundClose={marriageBurdenReliefFundClose} />
            <TDSBalanceModal filterData={filterData} setFilterData={setFilterData} tdsBalance={tdsBalance} tdsBalanceClose={tdsBalanceClose} />
            <PaidTCSModal filterData={filterData} setFilterData={setFilterData} paidTcs={paidTcs} paidTcsClose={paidTcsClose} />
            <PendingLeadsModal filterData={filterData} setFilterData={setFilterData} pendingLeads={pendingLeads} pendingLeadsClose={pendingLeadsClose} />
            <UnauthorizedLeadsModal filterData={filterData} setFilterData={setFilterData} unauthorized={unauthorized} unauthorizedClose={unauthorizedClose} />
            <AuthorizedLeadsModal filterData={filterData} setFilterData={setFilterData} authorized={authorized} authorizedClose={authorizedClose} />
            <SelfPurchaseDVModal filterData={filterData} setFilterData={setFilterData} selfPurchaseDV={selfPurchaseDV} selfPurchaseDVClose={selfPurchaseDVClose} />
            <DirectPurchaseDVModal filterData={filterData} setFilterData={setFilterData} directPurchaseDV={directPurchaseDV} directPurchaseDVClose={directPurchaseDVClose} />
            {/* <AuthorizedMembersModal filterData={filterData} setFilterData={setFilterData} authorizedMembers={authorizedMembers} authorizedMembersClose={authorizedMembersClose} /> */}
            <SecondLevelMembersModal filterData={filterData} setFilterData={setFilterData} secondLevelMembers={secondLevelMembers} secondLevelMembersClose={secondLevelMembersClose} />
            <KYCStatusModal filterData={filterData} setFilterData={setFilterData} KYCStatus={KYCStatus} KYCStatusClose={KYCStatusClose} />
            <NomineeStatusModal filterData={filterData} setFilterData={setFilterData} nomineeStatus={nomineeStatus} nomineeStatusClose={nomineeStatusClose} />
            <AffiliateStatusModal filterData={filterData} setFilterData={setFilterData} affiliateStatus={affiliateStatus} affiliateStatusClose={affiliateStatusClose} />
            <StateModal filterData={filterData} setFilterData={setFilterData} state={state} stateClose={stateClose} />
            <DistrictModal filterData={filterData} setFilterData={setFilterData} district={district} districtClose={districtClose} />
            <TalukaModal filterData={filterData} setFilterData={setFilterData} taluka={taluka} talukaClose={talukaClose} />
            <TeamModal filterData={filterData} setFilterData={setFilterData} team={team} teamClose={teamClose} />
            <SalaryIncomeModal filterData={filterData} setFilterData={setFilterData} salary={salary} salaryClose={salaryClose} />
            <TotalActiveIncomeModal filterData={filterData} setFilterData={setFilterData} totalActiveIncome={totalActiveIncome} totalActiveIncomeClose={totalActiveIncomeClose} />
            <TotalPassiveIncomeModal filterData={filterData} setFilterData={setFilterData} totalPassiveIncome={totalPassiveIncome} totalPassiveIncomeClose={totalPassiveIncomeClose} />
            <DematActiveIncomeModal filterData={filterData} setFilterData={setFilterData} dematActiveIncome={dematActiveIncome} dematActiveIncomeClose={dematActiveIncomeClose} />
            <CoursesActiveIncomeModal filterData={filterData} setFilterData={setFilterData} coursesActiveIncome={coursesActiveIncome} coursesActiveIncomeClose={coursesActiveIncomeClose} />
            <InsuranceActiveIncomeModal filterData={filterData} setFilterData={setFilterData} insuranceActiveIncome={insuranceActiveIncome} insuranceActiveIncomeClose={insuranceActiveIncomeClose} />
            <InvestmentActiveIncomeModal filterData={filterData} setFilterData={setFilterData} investmentActiveIncome={investmentActiveIncome} investmentActiveIncomeClose={investmentActiveIncomeClose} />
            <PrimeRequestModal filterData={filterData} setFilterData={setFilterData} primeRequest={primeRequest} primeRequestClose={primeRequestClose} />
            <UplineCountModal filterData={filterData} setFilterData={setFilterData} uplineCount={uplineCount} uplineCountClose={uplineCountClose} />
        </Box>
    )
}

export default CourseFilter
