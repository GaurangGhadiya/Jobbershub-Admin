import React from 'react';
import { Box, Typography, Avatar, Paper, Grid,IconButton, Table, TableBody,TableHead, Button, TableCell, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from "react";
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';


const EmployeeProfile = (showProfile, assets, video ) => {


  const employee = showProfile || {};
  const assetList = Array.isArray(assets) ? assets : []; 
  const videoList = Array.isArray(video) ? video : [];
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const onLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const handleVideoClick = (videoLink) => {
    setSelectedVideo(videoLink);  
  };


  console.log(employee.showProfile.first_name);
 
  return (
    <>
      <Box >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Profile</Typography>
      <Paper elevation={3}>
      <Grid  style={{backgroundImage: 'url(bg_frame.jpg)',
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center'}}>
        <Grid item sm={3} ml={10} mt={4} flexDirection="column" alignItems="center" display="inline-block" sx={{textAlign:'center'}}>
        
          <Box
            sx={{
              width: '100%',
              height: 60,
              backgroundImage: `url(${employee.backgroundImage})`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px 8px 0 0',
              marginBottom: 1,
              zIndex: 1,
            }}
          />
         
         
         <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {/* Profile Avatar */}
      <Avatar
        alt={employee.first_name}
        src={employee.profile_pic}
        sx={{
          width: 170,       // Set the avatar size
          height: 170,      // Set the avatar size
          borderRadius: '50%',
          border: '4px solid white', 
          zIndex: 1         // Ensure the avatar is behind the edit icon
        }}
      />

      {/* Edit Icon Button */}
      <IconButton
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          padding: '10px',   // Optional: adds some space around the icon
          zIndex: 2,         // Ensure the edit icon is above the avatar
         
        }}
        onClick={() => { 
          // Handle edit profile picture logic here
          console.log("Edit icon clicked"); 
        }}
      >
        <EditIcon sx={{ color: 'black', fontSize: 40 }} />  {/* Increased size of the Edit icon */}
      </IconButton>
    </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {employee.showProfile.first_name || 'N/A'}
            </Typography>
          
           
          </Box>
          <Typography variant="subtitle2" color="textSecondary">
            {employee.showProfile.designation_name || 'N/A'}
          </Typography>
        </Grid>
       
      </Grid>
     

        <Grid container spacing={2} sx={{ padding: 2 }} item xs={12}>
          <Grid item xs={6}>
            <Table aria-label="employee" sx={{ borderCollapse: 'collapse' }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Employee Id</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.employee_code || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Gender</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.gender || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Personal Mobile Number</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.mobile || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Company Mobile Number</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.company_mobile_number || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Personal Email Id</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.email || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Company Email Id</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.company_email || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Joining date</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.joining_date || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Date Of Birth</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.dob || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Blood Group</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.blood_group || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>

          <Grid item xs={6}>
            <Table aria-label="additional-info" sx={{ borderCollapse: 'collapse' }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Emergency Contact</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.emergency_contact || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Temporary address</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.temporary_detail_address || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Permanant Address</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.address || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Comapny name</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.company_name || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Department</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.department_name || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Reporting To</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.reporting_name || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Level In Company</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.level_in_company || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Allocated States</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.allocated_state || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Allocated District</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.allocated_district || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', fontWeight: "bold" }}>Allocated Taluka</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>{employee.showProfile.allocated_taluka || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Paper>
      </Box>
    
      <Box mt={4}>
        <Typography variant="h6" sx={{ marginBottom: '51px' }}>
         My Interview
        </Typography>
        {selectedVideo ? (
        <Box sx={{ marginBottom: 4 }}>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${selectedVideo}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      ) : null}

      {/* Thumbnails Grid */}
      <Grid container spacing={2} justifyContent="center">
        {videoList.length > 0 ? (
          videoList.slice(0, 3).map((videoItem, index) => (  // Display max 3 thumbnails
            <Grid key={index} item xs={12} sm={4} md={4}>  {/* Each row will have 3 items */}
              <Box
                sx={{
                  padding: 1,
                  borderRadius: "8px",
                  boxShadow: 1,
                  cursor: "pointer",
                  '&:hover': { opacity: 0.8 },
                }}
                onClick={() => handleVideoClick(videoItem.videoLink)}  // Click to play video
              >
                <img
                  src={videoItem.thumbnail}
                  alt={`Video Thumbnail ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No videos available.
          </Typography>
        )}
      </Grid>
      </Box>

      <Box mt={4}>
  <Typography variant="h6" sx={{ marginBottom: 2 }}>
    My Documents
  </Typography>
  <Grid container spacing={2}>
    <Grid item xs={4} sm={1.5}>
    <Grid container spacing={2}>
        <Grid item xs={4} sm={1.5}>
          <Box>
            <Box
              sx={{
                width: 70,
                height: 100,
                backgroundImage: `url(${employee.showProfile.upload_resume})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: 1,
              }}
            />
            <Typography variant="caption" align="center">
              My Resume
            </Typography>
            {/* <Button variant="contained" color="primary" onClick={handleOpen}>
              View Resume
            </Button> */}
          </Box>
        </Grid>
      </Grid>

    
      {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>My Resume</DialogTitle>
        <DialogContent>
          <Document
            file={employee.showProfile.upload_resume} 
            onLoadSuccess={onLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </Grid>
    
    <Grid item xs={4} sm={1.5}>
      <Box>
        <Box
          sx={{
            width: 70,
            height: 100,
            backgroundImage: `url(${employee.showProfile.adhar_card})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: 1,
          }}
        />
        <Typography variant="caption" align="center">
          Aadhar
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={4} sm={1.5}>
      <Box>
        <Box
          sx={{
            width: 70,
            height: 100,
            backgroundImage: `url(${employee.showProfile.pan_card})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: 1,
          }}
        />
        <Typography variant="caption" align="center">
          PAN Card
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={4} sm={1.5}>
      <Box>
        <Box
          sx={{
            width: 70,
            height: 100,
            backgroundImage: `url(${employee.showProfile.voter_id})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: 1,
          }}
        />
        <Typography variant="caption" align="center">
          Voter ID
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={4} sm={1.5}>
      <Box>
        <Box
          sx={{
            width: 70,
            height: 100,
            backgroundImage: `url(${employee.showProfile.driving_Licences})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: 1,
          }}
        />
        <Typography variant="caption" align="center">
          Driving License
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={4} sm={1.5}>
      <Box>
        <Box
          sx={{
            width: 70,
            height: 100,
            backgroundImage: `url(${employee.showProfile.ssc_marksheet})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: 1,
          }}
        />
        <Typography variant="caption" align="center">
          SSC Certificate
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={4} sm={1.5}>
      <Box>
        <Box
          sx={{
            width: 70,
            height: 100,
            backgroundImage: `url(${employee.graduation_certificate})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: 1,
          }}
        />
        <Typography variant="caption" align="center">
          Graduation Certificate
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={4} sm={1.5}>
      <Box>
        <Box
          sx={{
            width: 70,
            height: 100,
            backgroundImage: `url(${employee.living_certification})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: 1,
          }}
        />
        <Typography variant="caption" align="center">
          Living Certificate
        </Typography>
      </Box>
    </Grid>
  </Grid>
</Box>



      <br/><br/>
      <Box sx={{ marginTop: 4, padding: 2,  borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
      Company Provided Assets
        </Typography>
      <Paper sx={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
    
      <Table sx={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f7f5dd' }}> {/* Peach color */}
            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>Asset Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>Model Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd' }}>EMEI Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
        {assetList.length > 0 ? (
                  assetList.map((asset, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{asset.id || 'N/A'}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{asset.name || 'N/A'}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{asset.model_number || 'N/A'}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{asset.imei_code || 'N/A'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', padding: '16px' }}>
                      No assets available
                    </TableCell>
                  </TableRow>
                )}
                  </TableBody>
      </Table>
    </Paper>
    </Box>
    <Box sx={{ marginTop: 4, padding: 2, borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
      Company Provided Membership and facilities
        </Typography>
        </Box>

        <Box sx={{ marginTop: 4, padding: 2,  borderRadius: '8px' }}>
        <Typography variant="h6" sx={{ marginBottom: '51px' }}>
         My Learning
        </Typography>
        {selectedVideo ? (
        <Box sx={{ marginBottom: 4 }}>
          <iframe
            width="100%"
            height="400"
            src={`${selectedVideo}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      ) : null}

   
      <Grid container spacing={2} justifyContent="center">
        {videoList.length > 0 ? (
          videoList.slice(0, 3).map((videoItem, index) => ( 
            <Grid key={index} item xs={12} sm={4} md={4}> 
              <Box
                sx={{
                  padding: 1,
                  borderRadius: "8px",
                  boxShadow: 1,
                  cursor: "pointer",
                  '&:hover': { opacity: 0.8 },
                }}
                onClick={() => handleVideoClick(videoItem.videoLink)}  
              >
                <img
                  src={videoItem.thumbnail}
                  alt={`Video Thumbnail ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No videos available.
          </Typography>
        )}
      </Grid><br/><br/>
      </Box>

    </>
  );
};

export default EmployeeProfile;
