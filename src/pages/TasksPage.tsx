// src/pages/TasksPage.tsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { Task } from '../types/task.types';
import TaskItem from '../components/tasks/TaskItem';
import AddTaskDialog from '../components/tasks/AddTaskDialog';
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  type TaskQueryParams
} from '../services/apiTaskService';


const getFormattedDate = (type: 'today' | 'tomorrow'): string => {
  const d = new Date();
  if (type === 'tomorrow') {
    d.setDate(d.getDate() + 1);
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getStatus = (task: Task) => {
  if (task.completed) return 'completed';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const date = new Date(task.dueDate);
  // Handle jika dueDate invalid, default ke upcoming
  if (isNaN(date.getTime())) return 'upcoming';

  date.setHours(0, 0, 0, 0);
  if (date < today) return 'overdue';
  if (date.getTime() === today.getTime()) return 'today';
  return 'upcoming';
};

function TasksPage(): React.JSX.Element {
  const [statusTab, setStatusTab] = useState<'all' | 'incomplete' | 'completed' | 'overdue'>('all');
  const [dateFilterType, setDateFilterType] = useState<'all' | 'today' | 'tomorrow'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // State untuk edit
  
  const queryClient = useQueryClient();

  const apiParams: TaskQueryParams = {};
  if (dateFilterType !== 'all') apiParams.date = getFormattedDate(dateFilterType);
  if (priorityFilter !== 'all') apiParams.priority = priorityFilter;

  // === READ ===
  const { data: tasks, isLoading, isError, error } = useQuery({
    queryKey: ['tasks', apiParams],
    queryFn: () => getTasks(apiParams),
  });

  // === MUTATIONS ===
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  // Update Mutation sekarang general (bisa status, bisa data full)
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => updateTask(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  // --- Handlers ---
  
  // 1. Buka Dialog Create
  const handleOpenCreate = () => {
    setEditingTask(null); // Reset edit state
    setOpenDialog(true);
  };

  // 2. Buka Dialog Edit
  const handleOpenEdit = (task: Task) => {
    setEditingTask(task); // Set task yang mau diedit
    setOpenDialog(true);
  };

  // 3. Submit (Create atau Update)
  const handleDialogSubmit = (title: string, context: string, task_date: string, priority: 'low' | 'medium' | 'high') => {
    if (editingTask) {
      // Mode EDIT
      updateMutation.mutate({
        id: editingTask.id,
        data: { title, context, task_date, priority }
      });
    } else {
      // Mode CREATE
      createMutation.mutate({ title, context, task_date, priority });
    }
  };

  const handleUpdateTaskStatus = (task: Task, newStatus: boolean) => {
    // Update status checkbox saja
    updateMutation.mutate({ 
      id: task.id, 
      data: { completed: newStatus } 
    });
  };

  const handleDeleteTask = (taskId: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
        deleteMutation.mutate(taskId);
    }
  };

  // --- Grouping Logic ---
  const groupedTasks = useMemo(() => {
    if (!tasks) return { overdue: [], today: [], upcoming: [], completed: [] };
    
    const filteredByTab = tasks.filter(task => {
      if (statusTab === 'all') return true;
      if (statusTab === 'completed') return task.completed;
      if (statusTab === 'incomplete') return !task.completed;
      if (statusTab === 'overdue') return !task.completed && getStatus(task) === 'overdue';
      return true;
    });

    const groups = {
      overdue: [] as Task[],
      today: [] as Task[],
      upcoming: [] as Task[],
      completed: [] as Task[],
    };

    for (const task of filteredByTab) {
      const status = getStatus(task);
      if (groups[status]) {
        groups[status].push(task);
      }
    }
    return groups;
  }, [tasks, statusTab]);

  const isEmpty = !isLoading && tasks?.length === 0;

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>My Tasks</Typography>
        <Skeleton variant="rectangular" width="100%" height={50} sx={{ mb: 4 }} />
        <Skeleton variant="rounded" width="100%" height={80} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" width="100%" height={80} />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Gagal mengambil data tasks: {error.message}</Alert>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">My Tasks</Typography>
          <Typography variant="body1" color="text.secondary">
            Stay organized and on top of your work.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<AddIcon />} 
          sx={{ textTransform: 'none', color: 'white' }}
          onClick={handleOpenCreate} // Ganti handler
        >
          Add Task
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <ToggleButtonGroup value={statusTab} exclusive onChange={(_, val) => val && setStatusTab(val)} color="primary" size="small">
          <ToggleButton value="all" sx={{ textTransform: 'none' }}>All</ToggleButton>
          <ToggleButton value="incomplete" sx={{ textTransform: 'none' }}>Incomplete</ToggleButton>
          <ToggleButton value="completed" sx={{ textTransform: 'none' }}>Completed</ToggleButton>
          <ToggleButton value="overdue" sx={{ textTransform: 'none' }}>Overdue</ToggleButton>
        </ToggleButtonGroup>
        
        <Box sx={{ flexGrow: 1 }} /> 

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Filter Date</InputLabel>
          <Select value={dateFilterType} label="Filter Date" onChange={(e) => setDateFilterType(e.target.value as any)}>
            <MenuItem value="all">All Dates</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="tomorrow">Tomorrow</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Filter Priority</InputLabel>
          <Select value={priorityFilter} label="Filter Priority" onChange={(e) => setPriorityFilter(e.target.value as any)}>
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        {isEmpty ? (
          <Paper sx={{ p: 3, textAlign: 'center', border: '2px dashed', borderColor: 'divider', borderRadius: '12px', bgcolor: 'transparent' }}>
            <Typography variant="h6">Tidak ada tugas</Typography>
            <Typography color="text.secondary">Coba ubah filter atau tambahkan tugas baru.</Typography>
          </Paper>
        ) : (
          <>
            {groupedTasks.overdue.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <WarningAmberIcon color="error" />
                  <Typography variant="h6" fontWeight="bold" color="error">Overdue</Typography>
                </Box>
                {groupedTasks.overdue.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onUpdateStatus={handleUpdateTaskStatus} 
                    onDelete={handleDeleteTask}
                    onEdit={handleOpenEdit} // Pass handler edit
                  />
                ))}
              </Box>
            )}

            {(groupedTasks.today.length > 0) && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CalendarTodayIcon color="action" />
                  <Typography variant="h6" fontWeight="bold">Today</Typography>
                </Box>
                {groupedTasks.today.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onUpdateStatus={handleUpdateTaskStatus} 
                    onDelete={handleDeleteTask}
                    onEdit={handleOpenEdit}
                  />
                ))}
              </Box>
            )}

            {(groupedTasks.upcoming.length > 0) && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <EventIcon color="action" />
                  <Typography variant="h6" fontWeight="bold">Upcoming</Typography>
                </Box>
                {groupedTasks.upcoming.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onUpdateStatus={handleUpdateTaskStatus} 
                    onDelete={handleDeleteTask}
                    onEdit={handleOpenEdit}
                  />
                ))}
              </Box>
            )}

            {groupedTasks.completed.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CheckCircleOutlineIcon color="success" />
                  <Typography variant="h6" fontWeight="bold" color="success.main">Completed</Typography>
                </Box>
                {groupedTasks.completed.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onUpdateStatus={handleUpdateTaskStatus} 
                    onDelete={handleDeleteTask}
                    onEdit={handleOpenEdit}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
      
      <AddTaskDialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        onSubmit={handleDialogSubmit} 
        initialData={editingTask} // Kirim data task yang sedang diedit
      />
    </Box>
  );
}

export default TasksPage;