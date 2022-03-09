import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

interface AllItems {
  title?: string,
  content?: string
}

const Tasks = ({taskVal}: {taskVal: AllItems}) => {
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
        <Card>
          <CardHeader 
            title={taskVal.title}
          />
              
          <CardContent>
            {taskVal.content}
          </CardContent>
        </Card>
      </Grid>
    </Box>
  )
}

export default Tasks
