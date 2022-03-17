import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import axios from 'axios'

interface AllItems {
  todo_id: number,
  title?: string,
  description?: string,
  col: string
}

const Tasks = ({taskVal}: {taskVal: AllItems}) => {
  const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    console.log(taskVal)

    // do i need "e"? (e) => deleteButtonPressed(id, e)
  const deleteButtonPressed = (idToDelete: number) => {
    axios.delete(`http://localhost:5000/todos/${idToDelete}`)
    .then(response => console.log('deleted', response)).catch(error => console.log(error))  
  }
  return (
    <Box
      m={1}
      display="flex"
      justifyContent="center"
    >
      <Grid item xs={11} justifyContent="center">
        <Card elevation={2}>
          <CardHeader 
            title={taskVal.title}
          />   
          <CardContent>
            {taskVal.description}
          </CardContent>
          <CardActions>
            <IconButton>
              <AddIcon />
            </IconButton>
            <IconButton>
              <DeleteForeverIcon onClick={() => deleteButtonPressed(taskVal.todo_id)}/>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </Box>
  )
}

export default Tasks
