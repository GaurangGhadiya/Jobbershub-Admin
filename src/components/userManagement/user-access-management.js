import { Box, Button,Divider,TextField,InputLabel,Select,MenuItem, Container, Grid, Paper, Table, TableBody, FormControl,Autocomplete,StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography,FormControlLabel, Checkbox, Tabs, Tab, Layout, TableCell  } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import * as React from 'react';
import { useRouter } from 'next/router';
import VisibilityIcon from '@mui/icons-material/Visibility';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



const ViewEmployeeTransactions = () => {
    const router = useRouter();
    const  queryParam  = router.query;
    const [tabvalue, setTabValue] = useState(0);

    const tabhandleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    
  
    const currentDate = new Date();
    const [employees, setEmployees] = useState([]);
    const [choseEmployee, setChoseEmployee] = useState('');
    const [employee_id, setEmployee_id] = useState('');

    const [menus, setMenus] = useState([]);
    const [listchecked, setListchecked] = useState(false);
    const [insertchecked, setInsertchecked] = useState(false);
    const [viewchecked, setViewchecked] = useState(false);
    const [deletechecked, setDeletechecked] = useState(false);
    const [editchecked, setEditchecked] = useState(false);

    const handleChangeEmployee = (newValue) => {
        setChoseEmployee(newValue);
       if(newValue){
        setEmployee_id(newValue.employee_id);
       }
      };
    
    const listhandleChange = (event, menuId, page_url) => {
        const isChecked = event.target.checked;
        let check_status = 0;

        setListchecked((prevState) => ({
        ...prevState,
        [menuId]: isChecked,
        }));

        if(isChecked)
        {
            check_status = 1;
        }
        updatePermission('list', menuId, check_status, page_url);
    };

    const inserthandleChange = (event, menuId, page_url) => {
        const isChecked = event.target.checked;
        let check_status = 0;

        setInsertchecked((prevState) => ({
        ...prevState,
        [menuId]: isChecked,
        }));

        if(isChecked)
        {
            check_status = 1;
        }

        updatePermission('insert', menuId, check_status, page_url);
    };

    const viewhandleChange = (event, menuId, page_url) => {
        const isChecked = event.target.checked;
        let check_status = 0;

        setViewchecked((prevState) => ({
        ...prevState,
        [menuId]: isChecked,
        }));

        if(isChecked)
        {
            check_status = 1;
        }

        updatePermission('view', menuId, check_status, page_url);
    };

    const deletehandleChange = (event, menuId, page_url) => {
        const isChecked = event.target.checked;
        let check_status = 0;
        setDeletechecked((prevState) => ({
        ...prevState,
        [menuId]: isChecked,
        }));
        
        if(isChecked)
        {
            check_status = 1;
        }

        updatePermission('delete', menuId, check_status, page_url);
    };
    

    const edithandleChange = (event, menuId, page_url) => {
        const isChecked = event.target.checked;
        let check_status = 0;

        setEditchecked((prevState) => ({
        ...prevState,
        [menuId]: isChecked,
        }));

        if(isChecked)
        {
            check_status = 1;
        }

        updatePermission('edit', menuId, check_status, page_url);
    };


    const updatePermission = async(action, menu_id, check_status, page_url) => {
        const reqData = {
            'action': action,
            menu_id: menu_id,
            employee_id: employee_id,
            check_status: check_status,
            page_url: page_url
        };
        try {
            const response = await api.post("/api/menu/set-menu-permission", reqData);
            if (response.status === 200) {
              alert('Success');
            }
        } catch (error) {
            alert(error);
            console.error("Error fetching roles:", error);
        }
    }
    useEffect(() => {
        const getEmployeeMaster = async () => {
            try {
              const response = await api.post("/api/employee/get-emp-master");
              if (response.status === 200) {
                setEmployees(response.data.data.reportingTo);             
              }
            } catch (error) {
              console.error("Error fetching categories:", error);
            }
          };

          getEmployeeMaster();
    },[]);
    useEffect(() => {

        const getEmployee = async () => {
          try {
            const reqData = {
                'employee_id': employee_id
            }
            const response = await api.post("/api/employee/get-employee", reqData);
            if (response.status === 200) {
                setMenus(response.data.menuData);
            }
          } catch (error) {
            console.error("Error fetching employee:", error);
          }
        };

    
        getEmployee();
      }, [employee_id]);

     
    return (

            <Grid
                container
                spacing={2}
            >
            
                <Grid item={true} xs={12}   >

                    <Box  mt={1} mb={1}  >
                        <Typography variant="h5" >User Access Management</Typography>
                    </Box>
                    <TableContainer component={Paper}  sx={{padding: '20px', boxSizing: 'border-box'}} mt={5} mb={1}>
                        <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'}   style={{width: '49%', verticalAlign: 'top'}} >
                        <Typography variant="p" component="h3" mb={2}>Select Employee</Typography>
                        <FormControl fullWidth>
                            <Autocomplete
                                id="category-autocomplete"
                                options={employees}
                                getOptionLabel={(employee) => (employee ? employee.first_name : '')}
                                value={choseEmployee}
                                isOptionEqualToValue={(option, value) => option.employee_id === value.employee_id}
                                onChange={(event, newValue) => handleChangeEmployee(newValue)}
                                renderInput={(params) => (
                                <TextField {...params} placeholder="Select Employee" variant="outlined" />
                                )}
                            />
                            </FormControl>
                        </Box>
                    </TableContainer>
                    {choseEmployee? (
                        <>
                        <Box>
                            <Grid item>
                                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={3} mb={1} style={{width: '100%', verticalAlign: 'top'}} >
                                    <TableContainer component={Paper} className="table_container">
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Sl No.</TableCell>
                                                    <TableCell>Permission</TableCell>
                                                    <TableCell>Select</TableCell>
                                                    <TableCell>Table</TableCell>
                                                    <TableCell>Filter</TableCell>
                                                    <TableCell>View</TableCell>
                                                    <TableCell>Create</TableCell>
                                                    <TableCell>Edit</TableCell>
                                                    <TableCell>Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {menus.map((menu, index) => (
                                                <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{menu.menu_name}{menu.parent_menu? (`(${menu.parent_menu})`): ''}</TableCell>
                                                <TableCell>
                                                    <FormControlLabel
                                                    control={<Checkbox checked={menu.list ? menu.list: listchecked[menu.id]} onChange={(event) => listhandleChange(event, menu.id, menu.menu_url)} />}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {menu.table_name?(
                                                        <>
                                                        {menu.columns? (
                                                            <Button color="primary" size="small" variant="contained"><VisibilityIcon />View</Button>
                                                        ): (
                                                            <Button color="success" size="small" variant="contained">Select</Button>
                                                            
                                                        )}
                                                        </>
                                                    ):('')}
                                                </TableCell>
                                                <TableCell>
                                                    {menu.table_name?(
                                                        <>
                                                        {menu.filters? (
                                                            <Button color="primary" size="small" variant="contained"><VisibilityIcon />View</Button>
                                                        ): (
                                                            <Button color="success" size="small" variant="contained">Select</Button>
                                                        )}
                                                        </>
                                                    ):('')}
                                                </TableCell>
                                                <TableCell>
                                                    <FormControlLabel
                                                    control={<Checkbox checked={menu.view ? menu.view: viewchecked[menu.id]} onChange={(event) => viewhandleChange(event, menu.id, menu.menu_url)} />}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormControlLabel
                                                    control={<Checkbox checked={menu.create ? menu.edit: editchecked[menu.id]} onChange={(event) => edithandleChange(event, menu.id, menu.menu_url)} />}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormControlLabel
                                                    control={<Checkbox checked={menu.edit ? menu.edit: editchecked[menu.id]} onChange={(event) => edithandleChange(event, menu.id, menu.menu_url)} />}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormControlLabel
                                                    control={<Checkbox checked={menu.delete ? menu.delete: deletechecked[menu.id]} onChange={(event) => deletehandleChange(event, menu.id, menu.menu_url)} />}
                                                    />
                                                </TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Grid>
                            <Box display="flex" justifyContent="space-between" mt={3} mb={1} width="50%">
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    style={{ width: '33%', padding: '0 5px' }} 
                                >
                                    <label style={{ marginBottom: '4px', fontSize: '14px',fontWeight:'bold', display: 'block' }}>
                                    Password
                                    </label>
                                    <TextField
                                        required
                                        size="small"
                                        fullWidth
                                        name="password"
                                        placeholder="Enter Password"
                                        variant="outlined"
                                        InputProps={{ style: { height: '32px' } }} 
                                    />
                                </Box>

                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    placeholder="Enter Confirm Password"
                                    style={{ width: '33%', padding: '0 5px' }}
                                >
                                    <label style={{ marginBottom: '4px', fontSize: '14px',fontWeight:'bold', display: 'block' }}>
                                    Confirm Password
                                    </label>
                                    <TextField
                                        required
                                        size="small"
                                        fullWidth
                                        name="month"
                                        variant="outlined"
                                        InputProps={{ style: { height: '32px' } }} 
                                    />
                                </Box>
                            </Box>         
                        </Box>
                        </>
                    ):(<></>)}
                    
                 
       

            </Grid>
            
        </Grid>
    
    )
    
}


export default ViewEmployeeTransactions;

