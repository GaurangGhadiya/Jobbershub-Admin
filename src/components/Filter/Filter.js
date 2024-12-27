import { Box, Grid, Typography } from '@mui/material'
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
import AuthorizedMembersModal from '../Modals/authorizedMembersModal';
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
const options = [
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'india', label: 'India' },
];
const searchOptions = [
    { value: '1', label: 'Affiliate ID' },
    { value: '2', label: 'Affiliate Name' },
    { value: '3', label: 'Pincode' },
    { value: '4', label: 'Affiliate mobile number' },
    { value: '5', label: 'Email ID' },
    { value: '6', label: 'Sponsor id' },
    { value: '7', label: 'Sponsor Name' },
    { value: '8', label: 'Sponsor Mobile Number' },
];
const Filter = () => {
    const [searchFilter, setSearchFilter] = useState("")
    const [filterValue, setFilterValue] = useState({})
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFilterValue({ ...filterValue, [name]: value });
    };
console.log('filterValue', filterValue)
    return (
        <Box style={{ backgroundColor: "white" }} className="bottomborder" mb={3} pt={2}>
            <Grid container spacing={2} p={2} pt={0} >
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                    value={filterValue?.registrationPastDays || ""}
                    name="registrationPastDays"
                    onChange={handleChange}
                    options={options}
                    placeholder="Registration Past 7 days"

                /> */}
                    <Box onClick={registrationPastDaysOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Registration Past 7 days</Typography>
                        <ArrowDropDownIcon />

                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                    value={filterValue?.authorizationPastDays || ""}
                    name="authorizationPastDays"
                    onChange={handleChange}
                    options={options}
                    placeholder="Authorization Past 7 days"
                /> */}
                    <Box onClick={authorizationPastDaysOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Authorization Past 7 days</Typography>
                        <ArrowDropDownIcon />

                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    <SelectDropdown
                    value={filterValue?.selectSearch || ""}
                    name="selectSearch"
                    onChange={handleChange}
                    options={searchOptions}
                    placeholder="Select field for search"
                />
                   
                </Grid>
                {filterValue?.selectSearch && <Grid item sm={12} md={2}>
                    <InputFieldWithIcon
                  
                        value={filterValue?.searchValue || ""}
                        name="searchValue"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search..."
                    />
                </Grid>}
                <Grid item sm={12} md={2}>
                    <InputFieldWithIcon
                        // icon={<SearchIcon />}
                        value={filterValue?.searchFilter || ""}
                        name="searchFilter"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search filter..."
                    />
                </Grid>
                <Grid item sm={12} md={2}>
                <Box onClick={() => setSearchFilter(filterValue?.searchFilter)} style={{ cursor: "pointer", padding: "2px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"100px"} >
                            <Typography color={"white"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Search</Typography>
                        </Box>
                </Grid>
                {!filterValue?.selectSearch &&<Grid item sm={12} md={2}>
                
                </Grid>}
                <Grid item sm={12} md={2}>
                   
                    <Box onClick={stateOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} 
                    style={{ cursor: "pointer", border  : searchFilter?.includes("state") ? "2px solid blue" : "1px solid #CDCDCD" }}
                    >
                        <Typography fontSize={"14px"} color={"#707070"}>State</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                   
                    <Box onClick={districtOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} 
                    style={{ cursor: "pointer", border  : searchFilter?.includes("district") ? "2px solid blue" : "1px solid #CDCDCD" }}
                    >
                        <Typography fontSize={"14px"} color={"#707070"}>District</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                   
                    <Box onClick={talukaOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"}
                    style={{ cursor: "pointer", border  : searchFilter?.includes("taluka") ? "2px solid blue" : "1px solid #CDCDCD" }}
                    >
                        <Typography fontSize={"14px"} color={"#707070"}>Taluka</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.affiliateRank || ""}
                        name="affiliateRank"
                        onChange={handleChange}
                        options={options}
                        placeholder="Affiliate Rank"
                    /> */}
                      <Box onClick={affiliateRankOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} 
                    style={{ cursor: "pointer", border  : searchFilter?.includes("affiliate rank") ? "2px solid blue" : "1px solid #CDCDCD" }}
                    >
                        <Typography fontSize={"14px"} color={"#707070"}>Affiliate Rank</Typography>
                        <ArrowDropDownIcon />
                        </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.affiliateType || ""}
                        name="affiliateType"
                        onChange={handleChange}
                        options={options}
                        placeholder="Affiliate Type"
                    /> */}
                          <Box onClick={affiliateTypeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Affiliate Type</Typography>
                        <ArrowDropDownIcon />
                        </Box>
                </Grid>
                {/* <Grid item sm={12} md={2}>
                    <SelectDropdown
                    value={filterValue?.sponsorType || ""}
                    name="sponsorType"
                    onChange={handleChange}
                    options={options}
                    placeholder="Sponsor Type"
                />
                    <Box onClick={sponserTypeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Sponsor Type</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid> */}
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.sponsorRank || ""}
                        name="sponsorRank"
                        onChange={handleChange}
                        options={options}
                        placeholder="Sponsor Rank"
                    /> */}
                     <Box onClick={sponserRankOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Sponsor Rank</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                
                     <Box onClick={teamOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Team</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.totalPendingLeads || ""}
                        name="totalPendingLeads"
                        onChange={handleChange}
                        options={options}
                        placeholder="Total Pending Leads"
                    /> */}
                    <Box onClick={pendingLeadsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Pending Leads </Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.selfPurchaseDVThisMonth || ""}
                        name="selfPurchaseDVThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="Self Purchase DV This Month"
                    /> */}
                    <Box onClick={selfPurchaseDVOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Self Purchase DC</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                {/* <Grid item sm={12} md={2}>
                    <SelectDropdown
                        value={filterValue?.directPurchaseDVThisMonth || ""}
                        name="directPurchaseDVThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="Direct Purchase DV This Month"
                    />
                     <Box onClick={directPurchaseDVOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Direct Purchase DV This Month</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid> */}
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.myAuthorizedMembersThisMonth || ""}
                        name="myAuthorizedMembersThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="My Authorized Members This Month"
                    /> */}
                     <Box onClick={authorizedMembersOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>My 1st Level Total Purchase DV</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.mySecondLevelAuthorizedMembersThisMonth || ""}
                        name="mySecondLevelAuthorizedMembersThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="My Second Level Authorized Members This Month"
                    /> */}
                     <Box onClick={secondLevelMembersOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Authorized Members in Second Level</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.mySecondLevelAuthorizedMembersThisMonth || ""}
                        name="mySecondLevelAuthorizedMembersThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="My Second Level Authorized Members This Month"
                    /> */}
                     <Box onClick={totalActiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Total Active Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.mySecondLevelAuthorizedMembersThisMonth || ""}
                        name="mySecondLevelAuthorizedMembersThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="My Second Level Authorized Members This Month"
                    /> */}
                     <Box onClick={totalPassiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Total Passive Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.mySecondLevelAuthorizedMembersThisMonth || ""}
                        name="mySecondLevelAuthorizedMembersThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="My Second Level Authorized Members This Month"
                    /> */}
                     <Box onClick={dematActiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Demat A/C Active Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.mySecondLevelAuthorizedMembersThisMonth || ""}
                        name="mySecondLevelAuthorizedMembersThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="My Second Level Authorized Members This Month"
                    /> */}
                     <Box onClick={coursesActiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Courses Active Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.mySecondLevelAuthorizedMembersThisMonth || ""}
                        name="mySecondLevelAuthorizedMembersThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="My Second Level Authorized Members This Month"
                    /> */}
                     <Box onClick={insuranceActiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Insurance Active Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.mySecondLevelAuthorizedMembersThisMonth || ""}
                        name="mySecondLevelAuthorizedMembersThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="My Second Level Authorized Members This Month"
                    /> */}
                     <Box onClick={investmentActiveIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Investment Active income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.mySecondLevelAuthorizedMembersThisMonth || ""}
                        name="mySecondLevelAuthorizedMembersThisMonth"
                        onChange={handleChange}
                        options={options}
                        placeholder="My Second Level Authorized Members This Month"
                    /> */}
                     <Box onClick={primeRequestOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Prime Request</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.KYCStatus || ""}
                        name="KYCStatus"
                        onChange={handleChange}
                        options={options}
                        placeholder="KYC Status"
                    /> */}
                     <Box onClick={KYCStatusOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>KYC Status</Typography>
                        <ArrowDropDownIcon />
                        </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.nomineeStatus || ""}
                        name="nomineeStatus"
                        onChange={handleChange}
                        options={options}
                        placeholder="Nominee Status"
                    /> */}
                     <Box onClick={nomineeStatusOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Nominee Status</Typography>
                        <ArrowDropDownIcon />
                        </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.affiliateStatus || ""}
                        name="affiliateStatus"
                        onChange={handleChange}
                        options={options}
                        placeholder="Affiliate Status"
                    /> */}
                      <Box onClick={affiliateStatusOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Affiliate Status</Typography>
                        <ArrowDropDownIcon />
                        </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.smartPeWalletBalance || ""}
                        name="smartPeWalletBalance"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search SmartPe Wallet Balance"
                    /> */}
                      <Box onClick={smartpeWalletBalanceOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search SmartPe Wallet Balance</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.totalEarning || ""}
                        name="totalEarning"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Total Earning"
                    /> */}
                     <Box onClick={totalEarningOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Total Earning</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.mainActiveWalletBalance || ""}
                        name="mainActiveWalletBalance"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Main Active Wallet Balance"
                    /> */}
                     <Box onClick={activeWalletBalanceOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Main Active Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.mainPassiveWalletBalance || ""}
                        name="mainPassiveWalletBalance"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Main Passive Wallet Balance"
                    /> */}
                      <Box onClick={passiveWalletBalanceOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Main Passive Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.rewardIncome || ""}
                        name="rewardIncome"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Reward Income"
                    /> */}
                    <Box onClick={rewardIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> Reward Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.rewardIncome || ""}
                        name="rewardIncome"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Reward Income"
                    /> */}
                    <Box onClick={salaryOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> Salary Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.royaltyIncome || ""}
                        name="royaltyIncome"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Royalty Income"
                    /> */}
                     <Box onClick={royaltyIncomeOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> Royalty Income</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.SIPMFFunds || ""}
                        name="SIPMFFunds"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search SIP/MF Funds"
                    /> */}
                     <Box onClick={SIPMFFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search SIP/MF Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.laptopFunds || ""}
                        name="laptopFunds"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Laptop Funds"
                    /> */}
                     <Box onClick={laptopFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search Laptop Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.bikeFunds || ""}
                        name="bikeFunds"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Bike Funds"
                    /> */}
                    <Box onClick={bickFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search Bick Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.carFunds || ""}
                        name="carFunds"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Car Funds"
                    /> */}
                     <Box onClick={carFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search Car Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.houseFunds || ""}
                        name="houseFunds"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search House Funds"
                    /> */}
                    <Box onClick={houseFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search House Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.houseFunds || ""}
                        name="houseFunds"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search House Funds"
                    /> */}
                    <Box onClick={insuranceFundsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Search Insurance Funds</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.houseFunds || ""}
                        name="houseFunds"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search House Funds"
                    /> */}
                    <Box onClick={childHigherEducationFundOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Child Higher Education Fund</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.houseFunds || ""}
                        name="houseFunds"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search House Funds"
                    /> */}
                    <Box onClick={marriageBurdenReliefFundOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}>Marriage Burden Relief Fund</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.totalWithdrawal || ""}
                        name="totalWithdrawal"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Total Withdrawal"
                    /> */}
                      <Box onClick={totalWithdrawalOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> Total Withdrawal</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.TDSBalance || ""}
                        name="TDSBalance"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search TDS Balance"
                    /> */}
                     <Box onClick={tdsBalanceOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> TDS Balance</Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
                <Grid item sm={12} md={2}>
                    {/* <SelectDropdown
                        value={filterValue?.paidTDS || ""}
                        name="paidTDS"
                        onChange={handleChange}
                        options={options}
                        placeholder="Search Paid TDS"
                    /> */}
                      <Box onClick={paidTcsOpen} borderRadius={"4px"} border={"1px solid #CDCDCD"} backgroundColor={"white"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={"10px"} py={"2px"} style={{ cursor: "pointer" }}>
                        <Typography fontSize={"14px"} color={"#707070"}> Paid TDS </Typography>
                        <ArrowDropDownIcon />
                    </Box>
                </Grid>
             
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
                        <Box style={{ cursor: "pointer", padding: "5px 19px", border: "2px solid #FF9F59" }} borderRadius={"4px"} width={"100px"} mr={1} onClick={activeWalletBalanceClose}>
                            <Typography color={"#FF9F59"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Reset</Typography>
                        </Box>
                        <Box style={{ cursor: "pointer", padding: "5px 19px", backgroundColor: "#FF9F59" }} borderRadius={"4px"} width={"100px"} onClick={activeWalletBalanceClose}>
                            <Typography color={"white"} fontSize={"16px"} textAlign={"center"} fontWeight={500}>Submit</Typography>
                        </Box>
                    </Box>

            </Grid>
            <RegistrationPastDaysModal registrationPastDays={registrationPastDays} registrationPastDaysClose={registrationPastDaysClose} />
            <AuthorizationPastDaysModal authorizationPastDays={authorizationPastDays} authorizationPastDaysClose={authorizationPastDaysClose} />
            <SponserTypeModal sponserType={sponserType} sponserTypeClose={sponserTypeClose} />
            <SponserRankModal sponserRank={sponserRank} sponserRankClose={sponserRankClose} />
            <AffiliateTypeModal affiliateType={affiliateType} affiliateTypeClose={affiliateTypeClose} />
            <AffiliateRankModal affiliateRank={affiliateRank} affiliateRankClose={affiliateRankClose} />
            <SmartpeWalletBalanceModal smartpeWalletBalance={smartpeWalletBalance} smartpeWalletBalanceClose={smartpeWalletBalanceClose} />
            <TotalEarningModal totalEarning={totalEarning} totalEarningClose={totalEarningClose} />
            <ActiveWalletBalanceModal activeWalletBalance={activeWalletBalance} activeWalletBalanceClose={activeWalletBalanceClose} />
            <PassiveWalletBalanceModal passiveWalletBalance={passiveWalletBalance} passiveWalletBalanceClose={passiveWalletBalanceClose} />
            <TotalWithdrawalModal totalWithdrawal={totalWithdrawal} totalWithdrawalClose={totalWithdrawalClose} />
            <RoyaltyIncomeModal royaltyIncome={royaltyIncome} royaltyIncomeClose={royaltyIncomeClose} />
            <RewardIncomeModal rewardIncome={rewardIncome} rewardIncomeClose={rewardIncomeClose} />
            <SIPMFFundsModal SIPMFFunds={SIPMFFunds} SIPMFFundsClose={SIPMFFundsClose} />
            <LaptopFundsModal laptopFunds={laptopFunds} laptopFundsClose={laptopFundsClose} />
            <BickFundsModal bickFunds={bickFunds} bickFundsClose={bickFundsClose} />
            <CarFundsModal carFunds={carFunds} carFundsClose={carFundsClose} />
            <HouseFundsModal houseFunds={houseFunds} houseFundsClose={houseFundsClose} />
            <InsuranceFundsModal insurance={insuranceFunds} insuranceClose={insuranceFundsClose} />
            <ChildHigherEducationFundModal childHigherEducationFund={childHigherEducationFund} childHigherEducationFundClose={childHigherEducationFundClose} />
            <MarriageBurdenReliefFundModal marriageBurdenReliefFund={marriageBurdenReliefFund} marriageBurdenReliefFundClose={marriageBurdenReliefFundClose} />
            <TDSBalanceModal tdsBalance={tdsBalance} tdsBalanceClose={tdsBalanceClose} />
            <PaidTCSModal paidTcs={paidTcs} paidTcsClose={paidTcsClose} />
            <PendingLeadsModal pendingLeads={pendingLeads} pendingLeadsClose={pendingLeadsClose} />
            <UnauthorizedLeadsModal unauthorized={unauthorized} unauthorizedClose={unauthorizedClose} />
            <AuthorizedLeadsModal authorized={authorized} authorizedClose={authorizedClose} />
            <SelfPurchaseDVModal selfPurchaseDV={selfPurchaseDV} selfPurchaseDVClose={selfPurchaseDVClose} />
            <DirectPurchaseDVModal directPurchaseDV={directPurchaseDV} directPurchaseDVClose={directPurchaseDVClose} />
            <AuthorizedMembersModal authorizedMembers={authorizedMembers} authorizedMembersClose={authorizedMembersClose} />
            <SecondLevelMembersModal secondLevelMembers={secondLevelMembers} secondLevelMembersClose={secondLevelMembersClose} />
            <KYCStatusModal KYCStatus={KYCStatus} KYCStatusClose={KYCStatusClose} />
            <NomineeStatusModal nomineeStatus={nomineeStatus} nomineeStatusClose={nomineeStatusClose} />
            <AffiliateStatusModal affiliateStatus={affiliateStatus} affiliateStatusClose={affiliateStatusClose} />
            <StateModal state={state} stateClose={stateClose} />
            <DistrictModal district={district} districtClose={districtClose} />
            <TalukaModal taluka={taluka} talukaClose={talukaClose} />
            <TeamModal team={team} teamClose={teamClose} />
            <SalaryIncomeModal salary={salary} salaryClose={salaryClose} />
            <TotalActiveIncomeModal totalActiveIncome={totalActiveIncome} totalActiveIncomeClose={totalActiveIncomeClose} />
            <TotalPassiveIncomeModal totalPassiveIncome={totalPassiveIncome} totalPassiveIncomeClose={totalPassiveIncomeClose} />
            <DematActiveIncomeModal dematActiveIncome={dematActiveIncome} dematActiveIncomeClose={dematActiveIncomeClose} />
            <CoursesActiveIncomeModal coursesActiveIncome={coursesActiveIncome} coursesActiveIncomeClose={coursesActiveIncomeClose} />
            <InsuranceActiveIncomeModal insuranceActiveIncome={insuranceActiveIncome} insuranceActiveIncomeClose={insuranceActiveIncomeClose} />
            <InvestmentActiveIncomeModal investmentActiveIncome={investmentActiveIncome} investmentActiveIncomeClose={investmentActiveIncomeClose} />
            <PrimeRequestModal primeRequest={primeRequest} primeRequestClose={primeRequestClose} />
        </Box>
    )
}

export default Filter
