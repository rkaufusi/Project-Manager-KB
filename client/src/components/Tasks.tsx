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
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useState} from 'react'

interface AllItems {
  todo_id: number,
  title?: string,
  description?: string,
  col: string
}

const Tasks = ({taskVal}: {taskVal: AllItems}) => {

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

    const openCreateNew = (title: string, description: string, col: string) => {
      setIsOpen(true)
    }

    const closeCreateNew = () => setIsOpen(false)

    const titleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.preventDefault()
      let enteredTitle = event.target.value
      setTaskTitle(enteredTitle)
      setTask({
          ...task, 
          title: enteredTitle
      })
  }

  const descriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.preventDefault()
      let enteredDescription = event.target.value
      setTaskDescription(enteredDescription)
      setTask({
          ...task, 
          description: enteredDescription
      })
  }

  const deleteButtonPressed = (idToDelete: number) => {
    axios.delete(`http://localhost:5000/todos/${idToDelete}`)
    .then(response => console.log('deleted', response)).catch(error => console.log(error))  
  }
  const updateButtonPressed = (idToUpdate: number) => {
    axios.put(`http://localhost:5000/todos/${idToUpdate}`, task)
    .then(response => console.log('updated', response)).catch(error => console.log(error))
    setIsOpen(false)
  }

  return (
    <div>
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
                defaultValue={taskVal.title}
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
                  defaultValue={taskVal.description} 
                  variant="outlined" 
                  fullWidth
                  onChange={(event) => descriptionChange(event)}
                  />
              </Typography>
            </Grid>
            <Stack spacing={2} direction="row" sx={{m: 2}}>
                <Button variant="text" onClick={() => updateButtonPressed(taskVal.todo_id)}>Update</Button>
            </Stack>
        </Grid>

          </Box>  
        </Modal>
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
              <AddIcon onClick={() => setIsOpen(true)}/>
            </IconButton>
            <IconButton>
              <DeleteForeverIcon onClick={() => deleteButtonPressed(taskVal.todo_id)}/>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </Box>
    </div>
  )
}

export default Tasks
