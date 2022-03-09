import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useEffect from 'react'

interface ToDoItems {
  title?: string,
  content?: string
}

const Tasks = ({taskVal}: {taskVal: ToDoItems}) => {
  console.log(taskVal)
  
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    return (
      <Box
      m={1}
      display="flex"
      justifyContent="center"
      >
          <Grid item xs={11} justifyContent="center">        
              <Paper>to DO</Paper>
              {}


          </Grid>
          </Box>

    )
}

export default Tasks
