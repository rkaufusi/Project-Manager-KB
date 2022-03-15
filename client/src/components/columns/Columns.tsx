import * as React from 'react';
import {useState, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tasks from '../Tasks'
import AddIcon from '@mui/icons-material/Add';
import IconButton, { IconButtonProps } from '@mui/material/IconButton'; 
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface AllItems {
  todo_id: number,
  title?: string,
  description?: string,
  col: string
}

const Columns = () => {
    // axios to get columns
    const [test, setTest] = useState([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    useEffect(() => {
      axios.get('http://localhost:5000/todos').then((allTodos) => {
        setTest(allTodos.data)
      })
    },[])
    console.log(test)
    test.map((value) => {
      console.log(value)
    })
    /*
      todo_id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      description VARCHAR(255),
      col VARCHAR(255),
    */

    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const openCreateNew = (col: string) => {
    setIsOpen(true)
    console.log(`open ${col}`)
  }
  const closeCreateNew = () => {
    setIsOpen(false)
    console.log(`closed`)

  }
  //const addItem = () => {
   // axios.post
  //}
/*
  const allToDo: AllItems[] = [
    {title: "first To Do", description: "here is the first To Do Task", col: "To Do"},
    {title: "second To Do", description: "here is the second To Do Task", col: "To Do"},
    {title: "third To Do", description: "here is the second To Do Task", col: "To Do"},
  ]
*/
  const allDoing: AllItems[] = [
    {todo_id: 1, title: "first Doing", description: "here is the first Doing Task", col: "Doing"},
    {todo_id: 1, title: "second Doing", description: "here is the second Doing Task", col: "Doing"},
    {todo_id: 1, title: "third Doing", description: "here is the second Doing Task", col: "Doing"},
  ]

  const allDone: AllItems[] = [
    {todo_id: 1, title: "first Done", description: "here is the first done Task", col: "Done"},
    {todo_id: 1, title: "second Done", description: "here is the second done Task", col: "Done"},
    {todo_id: 1, title: "third Done", description: "here is the second done Task", col: "Done"},
  ] 

  //const [toDoState, setMyToDoState] = useState<AllItems[]>(allToDo)
  const [doingState, setDoingState] = useState<AllItems[]>(allDoing)
  const [doneState, setDoneState] = useState<AllItems[]>(allDone)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" >
        <Modal
          open={isOpen}
          onClose={closeCreateNew}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
               Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          </Box>  
        </Modal>
        <Grid item xs={3.5} container direction="column" >
            <Paper elevation={4} style={{backgroundColor: "#ACEB9B"}}>
              <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                <h2>To Do</h2>
                <IconButton>
                  <AddIcon onClick={() => openCreateNew("To Do")}/>
                </IconButton> 
              </Grid >
                {test.map((value) => {
              return <Tasks taskVal={value}/>
              })}
            </Paper>
        </Grid>

        <Grid item xs={3.5} container direction="column" >
          <Paper elevation={4} style={{backgroundColor: "#9BE3EB"}}>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
              <h2>Doing</h2>
              <IconButton>
                <AddIcon onClick={() => openCreateNew("Doing")}/>
              </IconButton>      
            </Grid >
            {doingState.map((value) => {
              return <Tasks taskVal={value}/>
            })}
          </Paper>
        </Grid>
        <Grid item xs={3.5} container direction="column" >
          <Paper elevation={4} style={{backgroundColor: "#EB9B9B"}}>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
              <h2>Done</h2>
              <IconButton>
                <AddIcon onClick={() => openCreateNew("Done")}/>
              </IconButton>  
            </Grid >
            {doneState.map((value) => {
              return <Tasks taskVal={value}/>
            })}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Columns
