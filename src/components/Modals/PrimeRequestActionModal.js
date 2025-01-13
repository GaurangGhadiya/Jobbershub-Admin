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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function PrimeRequestActionModal({PrimeRequestModal,primeRequestClose, PrimeRequestClick}) {

 
 

  return (
    <React.Fragment>
     
      <BootstrapDialog
        onClose={primeRequestClose}
        aria-labelledby="customized-dialog-title"
        open={PrimeRequestModal}
        // fullWidth={true}
        // maxWidth={"xs"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Prime Request
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={primeRequestClose}
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
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"cente"}>
                <Box color={"white"} backgroundColor={"#03AB32"} borderRadius={"2px"} p={2} fontWeight={500} fontSize={"14px"} style={{cursor : "pointer"}} onClick={() => PrimeRequestClick("1")}>Accept</Box>
                <Box color={"white"} backgroundColor={"#D20000"} borderRadius={"2px"} p={2} fontWeight={500} fontSize={"14px"} ml={5} style={{cursor : "pointer"}} onClick={() => PrimeRequestClick("2")}>Reject</Box>
            </Box>
         
        </DialogContent>
       
      </BootstrapDialog>
    </React.Fragment>
  );
}
