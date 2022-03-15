import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const ModalFields = () => {
    return (
        <Grid container spacing={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              
            </Typography>
            <Grid item>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField label="Title" placeholder="Give your task a title!" variant="outlined" fullWidth/>
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
                    />
                </Typography>
            </Grid>
            <Stack spacing={2} direction="row" sx={{m: 2}}>
                <Button variant="text">Create</Button>
            </Stack>
        </Grid>
    )
}

export default ModalFields
