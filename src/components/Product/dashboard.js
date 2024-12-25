import { Box, Typography, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ theme }) => ({
    height: 100,
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #0000FF',
    borderRadius: '10px',
}));

const dashboard = () => {
    return (
        <Grid item={true} xs={12}   >
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '18%', verticalAlign: 'top'}}>
                        <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#FFA500', // Orange
                                }}
                                >
                                100000
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#0000FF', // Blue
                                }}
                                >
                                :50
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#000000', // Black
                                }}
                                >
                                :500
                                </Box>
                                <Typography variant="h2" sx={{ padding: 1,fontSize: '22px' }}>Recharge Count</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '19%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#FFA500', // Orange
                                }}
                                >
                                100000
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#0000FF', // Blue
                                }}
                                >
                                :50
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#000000', // Black
                                }}
                                >
                                :500
                                </Box>
                                <Typography variant="h2" sx={{ padding: 1,fontSize: '22px' }}>Recharge Performance</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '19%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#FFA500', // Orange
                                }}
                                >
                                100000
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#0000FF', // Blue
                                }}
                                >
                                :50
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#000000', // Black
                                }}
                                >
                                :500
                                </Box>
                                <Typography variant="h2" sx={{ padding: 1,fontSize: '22px' }}>BBPS Performance</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '19%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#FFA500', // Orange
                                }}
                                >
                                100000
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#0000FF', // Blue
                                }}
                                >
                                :50
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#000000', // Black
                                }}
                                >
                                :500
                                </Box>
                                <Typography variant="h2" sx={{ padding: 1,fontSize: '22px' }}>Money Transfer</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    <Grid item xs={3} display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1}  mr={2} style={{width: '19%', verticalAlign: 'top'}}>
                    <Item
                            sx={{
                                height: 100,
                                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px solid #0000FF',
                                borderRadius: '10px',
                            }}
                            >
                            <Typography variant="h6" component="div">
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#FFA500', // Orange
                                }}
                                >
                                100000
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#0000FF', // Blue
                                }}
                                >
                                :50
                                </Box>
                                <Box
                                sx={{
                                    display: 'inline',
                                    color: '#000000', // Black
                                }}
                                >
                                :500
                                </Box>
                                <Typography variant="h2" sx={{ padding: 1,fontSize: '22px' }}>Prime Count</Typography>
                            </Typography>
                            </Item>
                    </Grid>
                    
                </Grid>
    );
};

export default dashboard;
