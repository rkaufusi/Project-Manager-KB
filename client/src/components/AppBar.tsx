import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GitHubIcon from '@mui/icons-material/GitHub';

const ResponsiveAppBar = () => {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box display="flex" flexGrow={1}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Project Management KanBan
          </Typography>
          </Box>
          <AddIcon />
          <DeleteForeverIcon/>
          <GitHubIcon/>
        </Toolbar>      
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
