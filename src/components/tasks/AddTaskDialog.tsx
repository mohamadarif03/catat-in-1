// src/components/tasks/AddTaskDialog.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, context: string, task_date: string, priority: 'low' | 'medium' | 'high') => void;
}

function AddTaskDialog({ open, onClose, onSubmit }: AddTaskDialogProps): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState(''); // BARU: Context Input
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = () => {
    if (title.trim() && context.trim()) {
      onSubmit(title.trim(), context.trim(), date, priority);
      
      // Reset form
      setTitle('');
      setContext('');
      setDate(new Date().toISOString().split('T')[0]);
      setPriority('medium');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            autoFocus
            label="Task Title"
            placeholder="e.g., Selesaikan Bab 3"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          />
          <FormControl fullWidth>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title || !context}>Add Task</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTaskDialog;