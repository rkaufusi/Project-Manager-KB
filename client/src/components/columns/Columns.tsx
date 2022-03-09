import * as React from 'react';
import {useState} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tasks from '../Tasks'

interface AllItems {
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

      const allToDo: AllItems[] = [
        {title: "first To Do", content: "here is the first To Do Task"},
        {title: "second To Do", content: "here is the second To Do Task"},
        {title: "third To Do", content: "here is the second To Do Task"},
      ]

      const allDoing: AllItems[] = [
        {title: "first Doing", content: "here is the first Doing Task"},
        {title: "second Doing", content: "here is the second Doing Task"},
        {title: "third Doing", content: "here is the second Doing Task"},
      ]
      const allDone: AllItems[] = [
        {title: "first Done", content: "here is the first done Task"},
        {title: "second Done", content: "here is the second done Task"},
        {title: "third Done", content: "here is the second done Task"},
      ]

      const [toDoState, setMyToDoState] = useState<AllItems[]>(allToDo)
      const [doingState, setDoingState] = useState<AllItems[]>(allDoing)
      const [doneState, setDoneState] = useState<AllItems[]>(allDone)



    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center" >
            
        <Grid item xs={3.5} container direction="column" >
 
            <Paper>
              <h2>To Do</h2>
              {toDoState.map((value) => {
                //console.log(value);
                return <Tasks taskVal={value}/>
              })}
              
            </Paper>

        </Grid>

        <Grid item xs={3.5} container direction="column" >
          <Paper>
            <h2>Doing</h2>
            {doingState.map((value) => {
                //console.log(value);
                return <Tasks taskVal={value}/>
              })}

          </Paper>
        </Grid>
        <Grid item xs={3.5} container direction="column" >
          <Paper>
            <h2>Done</h2>
            {doneState.map((value) => {
                //console.log(value);
                return <Tasks taskVal={value}/>
              })}

          </Paper>
        </Grid>

        </Grid>
      </Box>
    )
}

export default Columns
