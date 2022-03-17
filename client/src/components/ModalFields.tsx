import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react'
import axios from 'axios'

interface AllItems {
    title?: string,
    description?: string,
    col: string
  }

const ModalFields = ({taskColumn}: {taskColumn: string}) => {
    console.log(`here is column ${taskColumn} `)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [task, setTask] = useState({
        title: '',
        description: '',
        col: taskColumn
    })

    /*
    const [task, setTask] = useState<AllItems>({
        title: '',
        description: '',
        col: taskColumn
    }); */
    console.log(taskTitle)
    const createNewTask = () => {
        axios.post('http://localhost:5000/todos/', task)
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
    return (
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
    )
}

export default ModalFields
