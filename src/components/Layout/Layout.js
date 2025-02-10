import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Image from 'next/image';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { Avatar, Input, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import TempleHinduOutlinedIcon from '@mui/icons-material/TempleHinduOutlined';
import TollOutlinedIcon from '@mui/icons-material/TollOutlined';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import VoicemailOutlinedIcon from '@mui/icons-material/VoicemailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { Message } from '@mui/icons-material';
import MessageModal from '../Modals/MessageModal';
import Cookies from "js-cookie";

const drawerWidth = 320;
const menu = [
  {
    name : "All Affiliates Dashboard",
    icon : <AttractionsOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Feedback Report",
    icon : <ThumbUpOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Website Settings",
    icon : <WebAssetOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Revenue Dashboard",
    icon : <CachedOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Product Dashboard",
    icon : <EventNoteOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "SmartPe Add Money Request",
    icon : <CurrencyRupeeOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "SmartPe Recharge Finance",
    icon : <AccountBalanceWalletOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Contact Inquires",
    icon : <PermContactCalendarOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Customer Support Dashboard",
    icon : <SupportAgentOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Activation Dashboard",
    icon : <GridViewOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "User Management ",
    icon : <PersonOutlineOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Demat Account KYC Preformats",
    icon : <CurrencyRupeeOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Demat Onboarding Cross Selling",
    icon : <CurrencyRupeeOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Course Dashboard",
    icon : <AutoStoriesOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Bank Account Dashboard",
    icon : <AccountBalanceOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Wealth Dashboard",
    icon : <TempleHinduOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Loans Dashboard",
    icon : <AccountBalanceOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Insurance Dashboard",
    icon : <TollOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Credit Card Dashboard",
    icon : <CreditCardOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "E-Seva Dashboard",
    icon : <LanguageOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Product Management ",
    icon : <EventNoteOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Meeting Management",
    icon : <PeopleAltOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Coupon Management",
    icon : <ConfirmationNumberOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Recording Video Managment",
    icon : <VoicemailOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Notification Managment",
    icon : <NotificationsNoneOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Affiliate Link Management",
    icon : <AttractionsOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "TDS Report Management",
    icon : <AssignmentOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Withdrawal Requests Managment",
    icon : <CreditCardOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Banners Managment",
    icon : <WebAssetOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Marketing Content Managment",
    icon : <VolumeUpOutlinedIcon style={{color : "#525252"}}/>
   
  },
  {
    name : "Success Story Managment",
    icon : <NoteAltOutlinedIcon style={{color : "#525252"}}/>
   
  },
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openMessageModal, setOpenMessageModal] = React.useState(false)
  const [userName, setUserName] = React.useState("")


  React.useEffect(() => {
    Cookies.get('name') && setUserName(Cookies.get('name'))
  }, [])
  


  const handleMessageModalOpen = () => {
    setOpenMessageModal(true);
  };

  const handleMessageModalClose = () => {
    setOpenMessageModal(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const settings = ["Change Password", "Feedback to CEO", "Send Anonymous Feedback", "Reward & Recognitions", "Company Vision & Mission", "Company Milestone Calander", "Logout"];
  const handleFullScreen = () => {
    const element = document.documentElement; // Use the entire document or a specific element
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: "white", boxShadow: "none" }}>
        <Toolbar>
          <IconButton
            color="white"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
            <Box display={"flex"} justifyContent={"start"} alignItems={"center"}  >
              <Typography color={"#505050"} fontSize={"15px"} style={{ cursor: "pointer" }}>My Profile</Typography>
              <Typography color={"#505050"} fontSize={"15px"} style={{ cursor: "pointer" }} ml={3}>My KRA</Typography>
              <Typography color={"#505050"} fontSize={"15px"} style={{ cursor: "pointer" }} ml={3}>My KPI</Typography>
              <Typography color={"#505050"} fontSize={"15px"} style={{ cursor: "pointer" }} ml={3}>My SOP</Typography>
              <Typography color={"#505050"} fontSize={"15px"} style={{ cursor: "pointer" }} ml={3}>My Tasks</Typography>
              <Typography color={"#505050"} fontSize={"15px"} style={{ cursor: "pointer" }} ml={3}>My Checklist</Typography>
              <Typography color={"#505050"} fontSize={"15px"} style={{ cursor: "pointer" }} ml={3}>Goals</Typography>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} >
              <Box border={"1px solid #D8D8D8"} borderRadius={"100px"} display={"flex"} justifyContent={"start"} alignItems={"center"} px={"9px"} py={"5px"} onClick={handleMessageModalOpen}>
                <Box mr={1}>
                  <InboxIcon style={{ color: "grey", fontSize: "20px" }} />

                </Box>
                <Typography fontWeight={400} color={"#2A3B4B"} fontSize={"12px"}>Internal</Typography>
                <Box border={"1px solid #E34242"} borderRadius={"27px"} ml={2} py={"1px"} px={1}><Typography fontWeight={700} color={"#E34242"} fontSize={"12px"}>60</Typography></Box>
              </Box>
              <Box border={"1px solid #D8D8D8"} mx={2} borderRadius={"100px"} display={"flex"} justifyContent={"start"} alignItems={"center"} px={"9px"} py={"5px"} onClick={handleMessageModalOpen}>
                <Box mr={1}>
                  <InboxIcon style={{ color: "grey", fontSize: "20px" }} />

                </Box>
                <Typography fontWeight={400} color={"#2A3B4B"} fontSize={"12px"}>External</Typography>
                <Box border={"1px solid #E34242"} borderRadius={"27px"} ml={2} py={"1px"} px={1}><Typography fontWeight={700} color={"#E34242"} fontSize={"12px"}>60</Typography></Box>
              </Box>
              <Box position={"relative"}>
                <Box backgroundColor={"#D20000"} borderRadius={50} display={"flex"} justifyContent={"center"} alignItems={"center"} height={18} width={18} position={"absolute"} top={0} right={0}>
                  <Typography fontWeight={700} fontSize={12} color={"white"}>6</Typography>
                </Box>
                <NotificationsNoneIcon style={{ color: "#555454", fontSize: "30px" }} />
              </Box>
              <Box mx={3} >
                <CropFreeIcon style={{ color: "#555454", fontSize: "28px", cursor: "pointer" }} onClick={handleFullScreen}/>
              </Box>
              <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                <Box mr={1}>
                  <Typography color={"#1A1A1A"} fontSize={"14px"} fontWeight={700} textAlign={"right"}>{userName}</Typography>
                  <Typography color={"#757575"} fontSize={"13px"} fontWeight={500}>Ux Designer</Typography>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={userName} src="/static/images/avatar/2.jpg" style={{ borderRadius: "7px" }} />
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
     
        <DrawerHeader>
          <Box>
          <IconButton onClick={handleDrawerClose} style={{display : "none"}}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          </Box>
        <Box >
            <Image src={"/logo.png"} height={40} width={150} />

          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        {open &&<Box border={"1px solid #D0D0D0"} backgroundColor={"#F5F6FA"} borderRadius={"100px"} color={"#F5F6FA"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} pr={1} pl={2} mx={2} mt={1} >
          <input style={{ border: "none", outline: "none", backgroundColor: "#F5F6FA", width: "90%", fontSize: "15px", margin: "7px 0" }} placeholder='Search...' />
          <SearchIcon style={{ color: "black" }} />

        </Box>}
        <List>
          {menu?.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
                
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                        mr: 2,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {text?.icon}
                  {/* <Image src={text?.icon} height={15} width={15} /> */}
                </ListItemIcon>
                <ListItemText
                  primary={text?.name}
                  color='#2B2B2B'
                  fontWeight={300}
                  primaryTypographyProps={{
                    sx: { fontSize: '13px' ,color : "#2B2B2B"}, // Style for primary text
                  }}
                  sx={[
                    open
                      ? {
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, width: `calc(100% - 320px)`, }}>
        <DrawerHeader />
        {children}
      </Box>
      <MessageModal openMessageModal={openMessageModal} handleMessageModalClose={handleMessageModalClose}/>
    </Box>
  );
}
