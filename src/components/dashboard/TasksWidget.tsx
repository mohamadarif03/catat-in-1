import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import type { Task } from '../../types/task.types';

interface TasksWidgetProps {
  tasks: Task[];
}
function TasksWidget({ tasks }: TasksWidgetProps): React.JSX.Element {
  return (
    <Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Today's Tasks
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{color: 'white'}}
          startIcon={<Add />}
        >
          Add Task
        </Button>
      </Box>
      <List sx={{ p: 0 }}>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            disablePadding
            sx={{
              border: '1px solid #E2E8F0',
              borderRadius: 2,
              mb: 1.5,
              '&:last-child': { mb: 0 },
            }}
          >
            <Checkbox
              edge="start"
              checked={task.completed}
              tabIndex={-1}
              disableRipple
              sx={{
                ml: 1,
                '&.Mui-checked': {
                  color: 'primary.main',
                },
              }}
            />
            <ListItemText
              primary={task.label}
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default TasksWidget;