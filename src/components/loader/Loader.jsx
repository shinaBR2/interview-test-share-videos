import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

const Loader = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Typography>Checking user status</Typography>
      <Box ml={2}>
        <CircularProgress color="inherit" />
      </Box>
    </Backdrop>
  )
};

export default Loader;