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
import { DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";

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
    const [tasksList, setTasksList] = useState<AllItems[]>([])
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
        setTasksList(allTodos.data)
      })
    },[tasksList])
    
    const createNewTask = () => {
        axios.post('http://localhost:5000/todos/', task)
      setIsOpen(false)
      setTasksList(tasksList)
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
    //console.log(task)
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
  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result
    if(!destination) return

    const items = Array.from(tasksList)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)

    setTasksList(items)
  }

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
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid item xs={3.5} container direction="column">
          <Droppable droppableId="to do">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
              <Paper elevation={4} style={{backgroundColor: "#ACEB9B"}}>
              <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                <h2>To Do</h2>
                <IconButton>
                  <AddIcon onClick={() => openCreateNew('To Do')}/>
                </IconButton> 
              </Grid >
              {tasksList.map((value, idx) => {
                if(value.col === "To Do") {
                  return <Draggable key={value.todo_id} draggableId={value.todo_id.toString()} index={idx}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}

                      >
                      <Tasks taskVal={value}/>
                      </div>
                    )}
                    </Draggable>
                }
              })}
            </Paper>
            </div>
          )}

        </Droppable>
        </Grid>

        <Grid item xs={3.5} container direction="column" >
        <Droppable droppableId="doing">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
            <Paper elevation={4} style={{backgroundColor: "#9BE3EB"}}>
 
              <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                <h2>To Do</h2>
                <IconButton>
                  <AddIcon onClick={() => openCreateNew('To Do')}/>
                </IconButton> 
              </Grid >
              {tasksList.map((value, idx) => {
                if(value.col === "Doing") {
                  return <Draggable key={value.todo_id} draggableId={value.todo_id.toString()} index={idx}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                      <Tasks taskVal={value}/>
                      </div>
                    )}
                    </Draggable>
              }
            })}
            </Paper>
            </div>
          )}
          </Droppable>
        </Grid>


        <Grid item xs={3.5} container direction="column" >
        <Droppable droppableId="done">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
            <Paper elevation={4} style={{backgroundColor: "#EB9B9B"}}>
 
              <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                <h2>To Do</h2>
                <IconButton>
                  <AddIcon onClick={() => openCreateNew('To Do')}/>
                </IconButton> 
              </Grid >
              {tasksList.map((value, idx) => {
                if(value.col === "Done") {
                  return <Draggable key={value.todo_id} draggableId={value.todo_id.toString()} index={idx}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                      <Tasks taskVal={value}/>
                      </div>
                    )}
                    </Draggable>
              }
            })}
            </Paper>
            </div>
          )}
          </Droppable>
        </Grid>
      </DragDropContext>

      </Grid>
    </Box>
  )
}

export default Columns
