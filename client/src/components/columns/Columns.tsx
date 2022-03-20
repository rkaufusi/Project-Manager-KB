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
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface AllItems {
  todo_id: number,
  title?: string,
  description?: string,
  col: string
}

interface Cols {
  title?: string,
  description?: string,
  col: string
}

const Columns = () => {
    const [test, setTest] = useState([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [column, setColumn] = useState('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [task, setTask] = useState({
        title: '',
        description: '',
        col: ''
    })
    useEffect(() => {
      axios.get('http://localhost:5000/todos').then((allTodos) => {
        setTest(allTodos.data)
      })
    },[test])

    test.map((value) => {
      console.log(value)
    })
    console.log(taskTitle)
    const createNewTask = () => {
        axios.post('http://localhost:5000/todos/', task)
      setIsOpen(false)
      setTest(test)
    }

    const titleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault()
        let enteredTitle = event.target.value
        setTaskTitle(enteredTitle)
        setTask({
            ...task, 
            title: enteredTitle
        })
    }
    console.log(task)
    const descriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault()
        let enteredDescription = event.target.value
        setTaskDescription(enteredDescription)
        setTask({
            ...task, 
            description: enteredDescription
        })
    }

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

  const openCreateNew = (taskColumn: string) => {
    //setColumn(title)
    setIsOpen(true)
    setTask({
      ...task, 
      col: taskColumn
  })
  }
  const closeCreateNew = () => {
    setIsOpen(false)
    console.log(`closed`)
  }

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
          <Grid container spacing={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              
            </Typography>
            <Grid item>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField 
                  label="Title" 
                  placeholder="Give your task a title!" 
                  variant="outlined" 
                  fullWidth
                  onChange={(event) => titleChange(event)}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField 
                  multiline={true}
                  rows={4} 
                  label="Description" 
                  placeholder="Add your task description" 
                  variant="outlined" 
                  fullWidth
                  onChange={(event) => descriptionChange(event)}
                  />
              </Typography>
            </Grid>
            <Stack spacing={2} direction="row" sx={{m: 2}}>
                <Button variant="text" onClick={()=> createNewTask()}>Create</Button>
            </Stack>
        </Grid>

          </Box>  
        </Modal>
        <Grid item xs={3.5} container direction="column" >
            <Paper elevation={4} style={{backgroundColor: "#ACEB9B"}}>
              <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                <h2>To Do</h2>
                <IconButton>
                  <AddIcon onClick={() => openCreateNew('To Do')}/>
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
                <AddIcon onClick={() => openCreateNew('Doing')}/>
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
                <AddIcon onClick={() => openCreateNew('Done')}/>
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
