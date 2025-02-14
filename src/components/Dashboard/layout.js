import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import { Box, Link, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Button, Menu, MenuItem, Stack, Typography,Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from "js-cookie";
import api from "../../../utils/api";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 250;

const userName = Cookies.get('name');

let topMenuArray = [
    { redirect: `profile`, name: 'My Profile' }, 
    { redirect: `KRA`, name: 'My KRA' },
    { redirect: `KPI`, name: 'My KPI' },
    { redirect: `SOP`, name: 'My SOP' },
    { redirect: `employee_checklist`, name: 'Checklist' },
    { redirect: '#', name: 'Offers' },
    { redirect: '#', name: 'Login/Logout History' },
    { redirect: '#', name: 'Payout' }
]

const FireNav = styled(List)(({ theme }) => ({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
}));

function Layout(props) {
    const uid = Cookies.get('uid');
    const { window } = props;
    const { children } = props;
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [menuArray, setMenuArray] = useState([]);
    const [childArray, setChildArray] = useState([]);
    const [walletBalance, setWalletBalance] = useState(0);
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState(0);

    const handleFirstMenuClick = (menuIndex, parent) => {
        setSelectedMenu(childArray[menuIndex]);
        setCurrentMenu(parent);
        localStorage.setItem('currentMenu', parent);
    };
    const pathName = usePathname();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [username, setUsername] = React.useState("");

 

    useEffect(() => {
      //   const getTnx = async () => {
      //     const reqData = {
      //         balance: 'balance'
      //     }

      //     try {

      //         const response = await api.post("/api/admin/get-admin-balance", reqData);
              
      //         if (response.status === 200) {
      //             setWalletBalance(response.data.walletBalance)
      //         }

      //     } catch (error) {

      //         if (error?.response?.data?.error) {
      //             console.log(error.response.data.error);
      //         } else {
      //             console.log(error.message);
      //         }

      //     }
      // }

      // if (uid) {
      //     getTnx();
      // }

        

        setCurrentMenu(localStorage.getItem('currentMenu')?localStorage.getItem('currentMenu'):1);

        // const getMenus = localStorage.getItem('menu') ? JSON.parse(localStorage.getItem('menu')) : [];
        const getMenus =  [];
        const menuMap = new Map();
        const newMenuArray = [];

        getMenus.forEach((item) => {
        menuMap.set(item.id, {
            redirect: item.menu_url,
            name: item.menu_name,
            item_id: item.id,
            parent_id: item.parent_id,
            children: [],
        });
        });

        getMenus.forEach((item) => {
            if (item.parent_id === 0) {
                newMenuArray.push(menuMap.get(item.id));
            } else {
                const parent = menuMap.get(item.parent_id);
                if (parent) {
                parent.children.push(menuMap.get(item.id));
                }
            }
        });
        setMenuArray(newMenuArray);
        const currentPath = pathName;
        let foundMenu = null;

        for (const item of getMenus) {
            if (currentPath.startsWith(`/${item.menu_url}`)) {
                foundMenu = item;
                break;
            }
        }

        // const checkPathInMenuArray = (topMenuArray) => {
        //     return topMenuArray.some(item => currentPath.startsWith(`/${item.redirect}`));
        //   };
      
        // if (foundMenu) {
        //     const parent_id = foundMenu.parent_id;
        //     setSelectedMenu(newChildArray[parent_id] || 0);
        // } else {
        //     setSelectedMenu(0);
        // }
    }, [pathName, uid]);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        Cookies.remove('uid');
        router.push('/login');
    };

    const renderTopMenu = (topMenuArray) => {
        return (
          <div style={{}}>
            
            <List>
            <IconButton edge="start" color="black" onClick={handleMenuClick}>
                <MenuIcon />
            </IconButton>
              {topMenuArray && topMenuArray.map((item, index) => (
                <ListItem
                  key={item.redirect}
                  disablePadding
                  style={{ display: 'inline-block', width: 'auto', color: '#000' }}
                  sx={{
                    borderBottom: pathName.startsWith("/" + item.redirect) ? '3px solid #1976d2' : '0px solid #FFFFFF',
                  }}
                  className={
                    pathName.startsWith("/" + item.redirect)
                      ? "text-[#1976d2] bg-[#f2f5f9] bg-white"
                      : "text-slate-700"
                  }
                  onClick={() => {
                    if (item.redirect !== '#' || index === 0) {
                      router.push(`/${item.redirect}`);
                    } else {
                      handleFirstMenuClick(index);
                    }
                  }}
                >
                  <ListItemButton>
                    <ListItemText
                      sx={{
                        transition: 'color 0.3s',
                        '&:hover': {
                          color: "#1976d2",
                        },
                      }}
                      primaryTypographyProps={{ fontSize: '14px' }}
                      primary={item.name}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        );
      };
    

    const [openMenus, setOpenMenus] = useState({});

  // Toggle function to open/close the parent menu
  const handleToggle = (itemId) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const renderMenu = (menuArray) => {
    return (
      <List>
        {menuArray.map((item) => (
          <React.Fragment key={item.item_id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.children && item.parent_id == 0 && item.redirect=='#') {
                    handleToggle(item.item_id);
                  } else {
                    router.push(`/${item.redirect}`);
                  }
                }}
              >
                <ListItemText primary={item.name}
                    primaryTypographyProps={{
                      sx: {
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: '800',
                      },
                    }}
                   />
                {item.children && item.parent_id == 0 && item.redirect=='#' ? (
                  openMenus[item.item_id] ? <ExpandLessIcon /> : <ExpandMoreIcon />
                ) : null}
              </ListItemButton>
            </ListItem>

            {item.children && (
              <Collapse in={openMenus[item.item_id]} timeout="auto" unmountOnExit>
                <List sx={{ paddingLeft: 1 }}>
                  {renderMenu(item.children)}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    );
  };

    return (
        <Box >
            <AppBar  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:'#F7F5DD', boxShadow: 'none' }}>
                <Toolbar>
                    
                    <Box sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}>
                        <img
                            src='/jobbershub_log.png'
                            height="80"
                            alt="Logo"
                            bgcolor="#000"
                            width="150"
                        />
                    </Box>

                    <Box sx={{ flexGrow: 2 }} ml={10}>
                        {renderTopMenu(topMenuArray)}
                    </Box>
                    
                    <Stack direction="row" >
                        <Typography color={'#000'} textAlign={'right'} style={{lineHeight: '2.50'}} variant="body2"><small>Hello, {userName}</small></Typography>
                        <Button color="inherit" onClick={handleMenuClick}>
                            <AccountCircleIcon sx={{color :"black"}} />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                        {/* <Button variant="contained" color="success">
                            Balance: <b>{walletBalance}</b>
                        </Button> */}
                    </Stack>
                </Toolbar>
                <Divider />
            </AppBar>
            <Box sx={{display: 'flex',
                height: '100vh'}}
                >

              <Box
                  sx={{
                      backgroundColor: '#F7F5DD',
                      height: '100%',
                      overflowY: 'auto', 
                      width: drawerWidth
                  }}
              >
                  
                  <Box onClick={handleClose} sx={{ textAlign: 'center', overflow: 'auto' }}>
                      <Typography variant="h6" sx={{ my: 2 }}>
                          Menu
                      </Typography>
                      {renderMenu(menuArray)}
                  </Box>
              </Box>
              <Box sx={{flex: 1,
                    padding: '20px',
                    backgroundColor: '#FFFFFF',
                    overflowY: 'auto'}}>
                  
                  <Toolbar />
                  {children}
              </Box>
            </Box>
        </Box>
    );
}

export default Layout;
