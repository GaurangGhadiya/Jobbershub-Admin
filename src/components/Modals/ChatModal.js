import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import Image from 'next/image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
export default function ChatModal({ openChatModal, handlechatModalClose }) {




    return (
        <React.Fragment>

            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={openChatModal}
                onClose={handlechatModalClose}
            >
                <DialogTitle>Chat</DialogTitle>
                <DialogContent style={{ height: "500px" }}>


                    <Box style={{ width: "fit-content", maxWidth: "70%" }}>

                        <Box backgroundColor="#F9F5FF" borderRadius={"5px"} display={"flex"} justifyContent={"space-between"} alignItems={"start"} p={2} >

                            <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                                <Image src="/Frame 89.png" height={42} width={42} />
                                <Box ml={1}>
                                    <Typography color={"#000000"} fontSize={"16px"} fontWeight={400}>Rohan Deshmukh</Typography>
                                    <Typography color={"#000000"} fontSize={"14px"} fontWeight={300}>Have you planned any dea..</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Typography fontSize={"13px"} fontWeight={300} color={"#000000"} textAlign={"right"} mt={0.5}>10 May 2024, 07:30 PM</Typography>
                    </Box>
                    <Box style={{ width: "fit-content", maxWidth: "70%" }} mt={3}>

                        <Box backgroundColor="#F9F5FF" borderRadius={"5px"} display={"flex"} justifyContent={"space-between"} alignItems={"start"} p={2} >

                            <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                                <Image src="/Frame 89.png" height={42} width={42} />
                                <Box ml={1}>
                                    <Typography color={"#000000"} fontSize={"16px"} fontWeight={400}>Rohan Deshmukh</Typography>
                                    <Typography color={"#000000"} fontSize={"14px"} fontWeight={300}>Have you planned any dea..</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Typography fontSize={"13px"} fontWeight={300} color={"#000000"} textAlign={"right"} mt={0.5}>10 May 2024, 07:30 PM</Typography>
                    </Box>

                    <Box position={"absolute"} bottom={30} width={"90%"}>

                        <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
                            <Box style={{ border: "1px solid #505050" }} borderRadius={"25px"} width={"500px"} padding={"2px"} >
                                <input style={{ border: "none", width: "90%", paddingLeft: "5px", paddingBottom: "5px", fontSize: "16px" }} placeholder='Type your message....' />
                                <AttachFileIcon style={{ color: "#707070", fontSize: "28px", paddingTop: "5px" }} />
                            </Box>

                            <Box backgroundColor="#03AB32" borderRadius={"25px"} padding={"10px 30px"} mx={2} onClick={handlechatModalClose}><Typography fontWeight={700} fontSize={"16px"} color={"white"}>Send</Typography></Box>
                            <Box backgroundColor="#F4314E" borderRadius={"25px"} padding={"10px 30px"} onClick={handlechatModalClose}><Typography fontWeight={700} fontSize={"16px"} color={"white"}>Close Chat</Typography></Box>
                        </Box>
                    </Box>


                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handlechatModalClose}>Close</Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    );
}
