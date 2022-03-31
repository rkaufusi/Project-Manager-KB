import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import Columns from './columns/Columns'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'; 

const ResponsiveAppBar = () => {
  return (
    <div>
    <AppBar position="static" style={{backgroundColor: "#67B89E"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box display="flex" flexGrow={1}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'flex', md: 'flex' } }}
          >
            Project Management KanBan
          </Typography>
          </Box>
          <IconButton href="https://github.com/rkaufusi/Project-Manager-KB" target="_blank">
            <GitHubIcon>
            </GitHubIcon>
          </IconButton>
        </Toolbar>      
      </Container>
    </AppBar>
    <Box sx={{mt: 2.5}}>
      <Columns/>
    </Box>
    </div>
  );
};
export default ResponsiveAppBar;
