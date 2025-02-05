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

export default function BlockUnblockActionModal({ blockUnblockModal, blockUnblockClose, handleBlockUnblock }) {


  const [formData, setFormData] = React.useState({})
  const [files, setFiles] = React.useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleButtonClick = () => {
    document.getElementById("file-upload").click();
  };
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }


  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={blockUnblockClose}
        aria-labelledby="customized-dialog-title"
        open={blockUnblockModal}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Block Reason
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={blockUnblockClose}
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
              <Title title={"Reason "} />
              <TextAreaComponent
                name="reason"
                value={formData?.reason}
                onChange={handleChange}
                placeholder='Enter Reason'
              />
            </Grid>
            <Grid item sm={3}>
      {/* Button Box */}
      <Box
        backgroundColor="#FF9F59"
        borderRadius={"4px"}
        px={2}
        py={1}
        sx={{ cursor: "pointer", textAlign: "center" }}
        onClick={handleButtonClick} // Trigger file input click
      >
        <Typography color={"white"} fontSize={"14px"}>
          Upload Proof
        </Typography>
      </Box>

      {/* Hidden File Input */}
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange} // Handle file selection
      />

    </Grid>
     <Grid item sm={12}>
       {/* Show Selected Files */}
       <Grid container spacing={2} >
       {files.map((file, index) => (
              <Grid item xs={3} key={index}>
                <Box
                  border="1px solid #ccc"
                  borderRadius="4px"
                  p={1}
                  textAlign="center"
                >
                  <Typography fontSize="12px">{file.name}</Typography>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "70px",
                      objectFit: "cover",
                      marginTop: "5px",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </Grid>
            ))}
            </Grid>
     </Grid>
            
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={2} width={"100%"}>
              <Box backgroundColor={'#6E757D'} borderRadius={"4px"} style={{ cursor: "pointer" }} onClick={() => handleBlockUnblock(formData,setFormData,files, setFiles)}>
                <Typography color={"white"} px={1.5} py={0.5}>Submit</Typography>
              </Box>
            </Box>
          </Grid>

        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}
