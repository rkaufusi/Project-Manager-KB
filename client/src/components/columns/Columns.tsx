import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tasks from '../Tasks'

const Columns = () => {
    // axios to get columns
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center" >
            
        <Grid item xs={3.5} container direction="column" >
          <Paper>
            <h2>To Do</h2>
              <Tasks/>
              <Tasks/>
              <Tasks/>
              <Tasks/>
              <Tasks/>
              <Tasks/>
          </Paper>
        </Grid>

        <Grid item xs={3.5} container direction="column" >
          <Paper>
            <h2>Doing</h2>
              <Tasks/>
              <Tasks/>
              <Tasks/>
              <Tasks/>
              <Tasks/>
              <Tasks/>
          </Paper>
        </Grid>
        <Grid item xs={3.5} container direction="column" >
          <Paper>
            <h2>Done</h2>
              <Tasks/>
              <Tasks/>
              <Tasks/>
              <Tasks/>
              <Tasks/>
              <Tasks/>
          </Paper>
        </Grid>

        </Grid>
      </Box>
    )
}

export default Columns
