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
import TextAreaComponent from '../TextAreaComponent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ApproveRejectActionModal({ approveRejectModal, approveRejectModalClose,actionType, handleApproveReject }) {
  const [formData, setFormData] = React.useState({})
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }


  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={approveRejectModalClose}
        aria-labelledby="customized-dialog-title"
        open={approveRejectModal}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         {actionType} KYC
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={approveRejectModalClose}
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
          <Typography fontSize={15} mb={1}>Are you sure you want to {actionType} KYC?</Typography>
          {actionType == "Reject" && <><Title title={"Reason "} />
          <TextAreaComponent
            name="reason"
            value={formData?.reason}
            onChange={handleChange}
            placeholder='Enter Reason'
          />
          </>
}
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} mt={2}>
            <Box backgroundColor="#D3606F" borderRadius={"6px"} px={1} py={0.5} onClick={approveRejectModalClose} style={{ cursor: "pointer" }}>
              <Typography color={"white"} fontSize={16}>Cancel</Typography>
            </Box>
            <Box backgroundColor="#FE9204" borderRadius={"6px"} px={1} py={0.5} mx={2} onClick={() => handleApproveReject(formData, setFormData)} style={{ cursor: "pointer" }}>
              <Typography color={"white"} fontSize={16}>{actionType}</Typography>
            </Box>
          </Box>
        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}
