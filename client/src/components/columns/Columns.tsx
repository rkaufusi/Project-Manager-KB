import * as React from 'react';
import {useState} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tasks from '../Tasks'

interface ToDoItems {
  title?: string,
  content?: string
}

const Columns = () => {
    // axios to get columns
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      const testToDo: ToDoItems[] = [
        {title: "first To Do", content: "here is the first To Do Task"},
        {title: "second To Do", content: "here is the second To Do Task"},
        {title: "third To Do", content: "here is the second To Do Task"},
      ]

      const [myState, setmyState] = useState<ToDoItems[]>(testToDo)
      console.log(myState)
      const testDoing = [
        {title: "first Doing", content: "here is the first Doing Task"},
        {title: "second Doing", content: "here is the second Doing Task"},
        {title: "third Doing", content: "here is the second Doing Task"},
      ]
      const testDone = [
        {title: "first Done", content: "here is the first done Task"},
        {title: "second Done", content: "here is the second done Task"},
        {title: "third Done", content: "here is the second done Task"},
      ]

    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center" >
            
        <Grid item xs={3.5} container direction="column" >
 
            <Paper>
              <h2>To Do</h2>
              {testToDo.map((value) => {
                //console.log(value);
                return <Tasks taskVal={value}/>
              })}
              
            </Paper>

        </Grid>

        <Grid item xs={3.5} container direction="column" >
          <Paper>
            <h2>Doing</h2>
              

          </Paper>
        </Grid>
        <Grid item xs={3.5} container direction="column" >
          <Paper>
            <h2>Done</h2>
              

          </Paper>
        </Grid>

        </Grid>
      </Box>
    )
}

export default Columns
