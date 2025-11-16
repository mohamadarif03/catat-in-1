import React from 'react';
import { Box, Typography, Paper, Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { Task } from '../../types/task.types';

function getTaskStatus(dueDate: string, completed: boolean): { label: string, color: string, status: 'overdue' | 'today' | 'upcoming' | 'completed' } {
  if (completed) {
    return { label: `Due: ${new Date(dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`, color: 'success.main', status: 'completed' };
  }

  const today = new Date();
  const date = new Date(dueDate);
  today.setHours(0, 0, 0, 0); // Reset jam hari ini
  date.setHours(0, 0, 0, 0); // Reset jam tanggal tugas

  if (date < today) {
    return { label: 'Due: Yesterday', color: 'error.main', status: 'overdue' };
  }
  if (date.getTime() === today.getTime()) {
    return { label: 'Due: Today', color: 'warning.main', status: 'today' };
  }
  if (date > today) {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (date.getTime() === tomorrow.getTime()) {
      return { label: 'Due: Tomorrow', color: 'text.secondary', status: 'upcoming' };
    }
    return { label: `Due: ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`, color: 'text.secondary', status: 'upcoming' };
  }
  
  return { label: 'No due date', color: 'text.secondary', status: 'upcoming' };
}
// --- Akhir Helper ---

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps): React.JSX.Element {
  const { label, context, completed, dueDate } = task;
  const { label: dateLabel, color: dateColor, status } = getTaskStatus(dueDate, completed);

  // Warna border kiri
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
        borderColor: 'divider',
        borderLeft: 4,
        borderLeftColor: borderColor,
        borderRadius: '12px',
        mb: 1.5,
      }}
    >
      <Checkbox
        checked={completed}
        icon={<RadioButtonUncheckedIcon />} // Ikon bulat
        checkedIcon={<CheckCircleIcon color="primary" />} // Ikon bulat tercentang
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography 
          variant="body1" 
          fontWeight="500"
          sx={{ textDecoration: completed ? 'line-through' : 'none', color: completed ? 'text.secondary' : 'text.primary' }}
        >
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {context}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {dateLabel}
        </Typography>
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: dateColor }} />
      </Box>
    </Paper>
  );
}

export default TaskItem;