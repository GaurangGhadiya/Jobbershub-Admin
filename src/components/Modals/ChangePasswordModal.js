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
import { Box, Grid } from '@mui/material';
import TextFieldComponent from '../TextFieldComponent';
import Title from '../Title';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ChangePasswordActionModal({ changePasswordModal, changePasswordCloseClose, handleChangePassword }) {


const [formData, setFormData] = React.useState({})
const handleChange = (e)  => {
  const {name, value} = e.target
  setFormData({...formData, [name] : value})
}


  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={changePasswordCloseClose}
        aria-labelledby="customized-dialog-title"
        open={changePasswordModal}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change Password
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={changePasswordCloseClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Title title={"Mobile Number "} />
              <TextFieldComponent
                name="mobile"
                value={formData?.mobile}
                onChange={handleChange}
                placeholder='Enter mobile number'
              />
            </Grid>
            <Grid item sm={12}>
              <Title title={"New Password "} />
              <TextFieldComponent
                name="new"
                value={formData?.new}
                onChange={handleChange}
                placeholder='Enter new password'
              />
            </Grid>
            <Grid item sm={12}>
              <Title title={"Confirm Password "} />
              <TextFieldComponent
                name="confirm"
                value={formData?.confirm}
                onChange={handleChange}
                placeholder='Enter confirm password'
              />
            </Grid>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={2} width={"100%"}>
            <Box backgroundColor={'#D76F7C'} borderRadius={"4px"} style={{cursor : "pointer"}} onClick={() => handleChangePassword(formData,setFormData)}>
              <Typography color={"white"} px={1.5} py={0.5}>Submit</Typography>
            </Box>
            </Box>
          </Grid>

        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}
