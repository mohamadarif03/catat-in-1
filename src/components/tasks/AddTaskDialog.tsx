import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import type { Task } from '../../types/task.types';

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  initialData?: Task | null; 
  onSubmit: (
    title: string, 
    context: string, 
    task_date: string, 
    priority: 'low' | 'medium' | 'high'
  ) => void;
}

function AddTaskDialog({ open, onClose, initialData, onSubmit }: AddTaskDialogProps): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => {
    if (open) {
      if (initialData) {
        setTitle(initialData.label);
        setContext(initialData.context || '');
        const formattedDate = initialData.dueDate.split('T')[0]; 
        setDate(formattedDate);
        setPriority(initialData.priority);
      } else {
        setTitle('');
        setContext('');
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        setPriority('medium');
      }
    }
  }, [open, initialData]);

  const handleSubmit = () => {
    if (title && date) {
      onSubmit(title, context, date, priority);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '16px' } }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {initialData ? 'Edit Task' : 'Add New Task'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            autoFocus
            label="Task Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        <TextField
            label="Context / Subject"
            placeholder="e.g., Matematika, Kimia"
            fullWidth
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
          <TextField
            label="Task Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              '& input[type="date"]::-webkit-calendar-picker-indicator': {
                filter: 'invert(0.7)',  
                cursor: 'pointer',
              }
            }}
          />
          <Box>
            <Box sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>Priority</Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={priority === 'low' ? 'contained' : 'outlined'}
                onClick={() => setPriority('low')}
                sx={{
                  textTransform: 'none',
                  borderRadius: '10px',
                  bgcolor: priority === 'low' ? '#eaf3ff' : 'transparent',
                  color: priority === 'low' ? '#3a7be0' : 'inherit',
                  borderColor: '#e0e7ff',
                  '&:hover': { bgcolor: '#eaf3ff' }
                }}
              >
                Low
              </Button>

              <Button
                variant={priority === 'medium' ? 'contained' : 'outlined'}
                onClick={() => setPriority('medium')}
                sx={{
                  textTransform: 'none',
                  borderRadius: '10px',
                  bgcolor: priority === 'medium' ? '#2d7ff9' : 'transparent',
                  color: priority === 'medium' ? 'white' : 'inherit',
                  borderColor: '#2d7ff9',
                  '&:hover': { bgcolor: '#2d7ff9' }
                }}
              >
                Medium
              </Button>

              <Button
                variant={priority === 'high' ? 'contained' : 'outlined'}
                onClick={() => setPriority('high')}
                sx={{
                  textTransform: 'none',
                  borderRadius: '10px',
                  bgcolor: priority === 'high' ? '#ffe9e2' : 'transparent',
                  color: priority === 'high' ? '#dc5633' : 'inherit',
                  borderColor: '#ffd7cc',
                  '&:hover': { bgcolor: '#ffe9e2' }
                }}
              >
                High
              </Button>
            </Box>
          </Box>

          </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ color: 'white' }}>
          {initialData ? 'Save Changes' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTaskDialog;