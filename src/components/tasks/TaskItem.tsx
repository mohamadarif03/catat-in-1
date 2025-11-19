// src/components/tasks/TaskItem.tsx
import React from 'react';
import { Box, Typography, Paper, Checkbox, IconButton, Chip } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type { Task } from '../../types/task.types';
import { useTheme } from '@mui/material/styles';

function getTaskStatus(dueDate: string, completed: boolean): { label: string, color: string, status: string } {
  if (completed) {
    return { label: `Due: ${new Date(dueDate).toLocaleDateString()}`, color: 'success.main', status: 'completed' };
  }
  const today = new Date();
  const date = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date < today) {
    return { label: 'Due: Yesterday', color: 'error.main', status: 'overdue' };
  }
  if (date.getTime() === today.getTime()) {
    return { label: 'Due: Today', color: 'warning.main', status: 'today' };
  }
  return { label: `Due: ${date.toLocaleDateString()}`, color: 'text.secondary', status: 'upcoming' };
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'error';
    case 'medium': return 'warning';
    case 'low': return 'success';
    default: return 'default';
  }
};

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (task: Task, newStatus: boolean) => void;
  onDelete: (taskId: number) => void;
}

function TaskItem({ task, onUpdateStatus, onDelete }: TaskItemProps): React.JSX.Element {
  const { label, context, completed, dueDate, priority } = task;
  const { label: dateLabel, color: dateColor, status } = getTaskStatus(dueDate, completed);
  const theme = useTheme();

  const borderColor = status === 'overdue' ? 'error.main' : 'divider';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderLeft: 4,
        borderLeftColor: borderColor,
        borderRadius: '12px',
        mb: 1.5,
      }}
    >
      <Checkbox
        checked={completed}
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon color="primary" />}
        onChange={(e) => onUpdateStatus(task, e.target.checked)}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography 
          variant="body1" 
          fontWeight="500"
          sx={{ textDecoration: completed ? 'line-through' : 'none', color: completed ? 'text.secondary' : 'text.primary' }}
        >
          {label}
        </Typography>
        {/* Tampilkan Context dan Priority */}
        <Box sx={{ display: 'flex', gap: 1, mt: 0.5, alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {context}
          </Typography>
          <Chip 
            label={priority} 
            size="small" 
            color={getPriorityColor(priority) as any} 
            variant="outlined" 
            sx={{ height: 20, fontSize: '0.7rem', textTransform: 'capitalize' }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
          {dateLabel}
        </Typography>
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: dateColor }} />
      </Box>
      <IconButton size="small" onClick={() => onDelete(task.id)}>
        <DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} />
      </IconButton>
    </Paper>
  );
}

export default TaskItem;