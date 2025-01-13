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
import ChatModal from './ChatModal';
export default function MessageModal({ openMessageModal, handleMessageModalClose }) {

    const [openChatModal, setOpenChatModal] = React.useState(false)

    const handlechatModalOpen = () => {
        setOpenChatModal(true);
    };

    const handlechatModalClose = () => {
        setOpenChatModal(false);
    };


    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={openMessageModal}
                onClose={handleMessageModalClose}
            >
                {/* <DialogTitle>Optional sizes</DialogTitle> */}
                <DialogContent>
                    <Box display={"flex"} justifyContent={"end"}>
                        <Box style={{ border: "1px solid #909090" }} borderRadius={"25px"} width={"300px"} padding={"2px"} >
                            <input style={{ border: "none", width: "90%" }} />
                            <SearchIcon style={{ color: "#707070", fontSize: "18px" }} />
                        </Box>
                    </Box>

                    <Box onClick={handlechatModalOpen} backgroundColor="#F9F5FF" borderRadius={"5px"} display={"flex"} justifyContent={"space-between"} alignItems={"start"} p={2} mt={2}>

                        <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                            <Image src="/Frame 89.png" height={42} width={42} />
                            <Box ml={1}>
                                <Typography color={"#000000"} fontSize={"16px"} fontWeight={400}>Yash Shewale- Top Management</Typography>
                                <Typography color={"#000000"} fontSize={"14px"} fontWeight={300}>Have you planned any dea..</Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                            <Typography fontWeight={300} color={"#000000"} fontSize={"14px"}>07:30 PM</Typography>
                            <Box borderRadius={"25px"} height={"25px"} width={"25px"} display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor="#F03333" ml={1}><Typography fontWeight={700} fontSize={"12px"} color={"white"} >10</Typography></Box>
                        </Box>


                    </Box>


                    <Box backgroundColor="#F9F5FF" borderRadius={"5px"} display={"flex"} justifyContent={"space-between"} alignItems={"start"} p={2} mt={2}>

                        <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                            <Image src="/Frame 89.png" height={42} width={42} />
                            <Box ml={1}>
                                <Typography color={"#000000"} fontSize={"16px"} fontWeight={400}>Rohan - Middle Management</Typography>
                                <Typography color={"#000000"} fontSize={"14px"} fontWeight={300}>Have you planned any dea..</Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                            <Typography fontWeight={300} color={"#000000"} fontSize={"14px"}>07:30 PM</Typography>
                            <Box borderRadius={"25px"} height={"25px"} width={"25px"} display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor="#FFC61A" ml={1}><Typography fontWeight={700} fontSize={"12px"} color={"white"} >10</Typography></Box>
                        </Box>


                    </Box>


                    <Box backgroundColor="#F9F5FF" borderRadius={"5px"} display={"flex"} justifyContent={"space-between"} alignItems={"start"} p={2} mt={2}>

                        <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                            <Image src="/Frame 89.png" height={42} width={42} />
                            <Box ml={1}>
                                <Typography color={"#000000"} fontSize={"16px"} fontWeight={400}>Rohan -Lower Management</Typography>
                                <Typography color={"#000000"} fontSize={"14px"} fontWeight={300}>Have you planned any dea..</Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                            <Typography fontWeight={300} color={"#000000"} fontSize={"14px"}>07:30 PM</Typography>
                            <Box borderRadius={"25px"} height={"25px"} width={"25px"} display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor="#03AB32" ml={1}><Typography fontWeight={700} fontSize={"12px"} color={"white"} >10</Typography></Box>
                        </Box>


                    </Box>


                    <Box backgroundColor="#F9F5FF" borderRadius={"5px"} display={"flex"} justifyContent={"space-between"} alignItems={"start"} p={2} mt={2}>

                        <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                            <Image src="/Frame 89.png" height={42} width={42} />
                            <Box ml={1}>
                                <Typography color={"#000000"} fontSize={"16px"} fontWeight={400}>Rohan - Field Employees</Typography>
                                <Typography color={"#000000"} fontSize={"14px"} fontWeight={300}>Have you planned any dea..</Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                            <Typography fontWeight={300} color={"#000000"} fontSize={"14px"}>07:30 PM</Typography>
                            <Box borderRadius={"25px"} height={"25px"} width={"25px"} display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor="#959595" ml={1}><Typography fontWeight={700} fontSize={"12px"} color={"white"} >10</Typography></Box>
                        </Box>


                    </Box>


                    <Box backgroundColor="#F9F5FF" borderRadius={"5px"} display={"flex"} justifyContent={"space-between"} alignItems={"start"} p={2} mt={2}>

                        <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                            <Image src="/Frame 89.png" height={42} width={42} />
                            <Box ml={1}>
                                <Typography color={"#000000"} fontSize={"16px"} fontWeight={400}>Rohan Deshmukh</Typography>
                                <Typography color={"#000000"} fontSize={"14px"} fontWeight={300}>Have you planned any dea..</Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"start"} alignItems={"start"}>
                            <Typography fontWeight={300} color={"#000000"} fontSize={"14px"}>10/05/2024  </Typography>
                            {/* <Box borderRadius={"25px"} height={"25px"} width={"25px"} display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor="#F03333" ml={1}><Typography fontWeight={700} fontSize={"12px"} color={"white"} >10</Typography></Box> */}
                        </Box>


                    </Box>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleMessageModalClose}>Close</Button>
                </DialogActions> */}
            </Dialog>

            <ChatModal openChatModal={openChatModal} handlechatModalClose={handlechatModalClose}/>

        </React.Fragment>
    );
}
