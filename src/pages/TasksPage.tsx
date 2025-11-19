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
  deleteFolder
} from '../services/apiTaskService';

// import type { TaskFilterParams } from '../services/apiTaskService';

// Helper untuk mendapatkan format YYYY-MM-DD lokal
const getFormattedDate = (type: 'today' | 'tomorrow'): string => {
  const d = new Date();
  if (type === 'tomorrow') {
    d.setDate(d.getDate() + 1);
  }
  // Format ke YYYY-MM-DD (Local time safe)
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getStatus = (task: Task) => {
  if (task.completed) return 'completed';
  const today = new Date();
  const date = new Date(task.dueDate);
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  if (date < today) return 'overdue';
  if (date.getTime() === today.getTime()) return 'today';
  return 'upcoming';
};

function TasksPage(): React.JSX.Element {
  // State UI untuk Tabs (Client-side filtering untuk status completed/incomplete)
  const [statusTab, setStatusTab] = useState<'all' | 'incomplete' | 'completed' | 'overdue'>('all');
  
  // State UI untuk Filter API
  const [dateFilterType, setDateFilterType] = useState<'all' | 'today' | 'tomorrow'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  const queryClient = useQueryClient();

  const apiParams: TaskQueryParams = {};
  
  if (dateFilterType !== 'all') {
    apiParams.date = getFormattedDate(dateFilterType);
  }
  
  if (priorityFilter !== 'all') {
    apiParams.priority = priorityFilter;
  }

  // === READ ===
  const { data: tasks, isLoading, isError, error } = useQuery({
    // Query key berubah jika filter berubah, otomatis refetch
    queryKey: ['tasks', apiParams],
    queryFn: () => getTasks(apiParams),
  });

  // === MUTATIONS ===
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ task, newStatus }: { task: Task, newStatus: boolean }) => 
      updateTask(task, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // --- Handlers ---
  const handleStatusTabChange = (event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    if (newFilter) setStatusTab(newFilter as any);
  };

  const handleDateFilterChange = (event: SelectChangeEvent<string>) => {
    setDateFilterType(event.target.value as any);
  };

  const handlePriorityFilterChange = (event: SelectChangeEvent<string>) => {
    setPriorityFilter(event.target.value as any);
  };

  const handleAddTaskSubmit = (title: string, context: string, task_date: string, priority: 'low' | 'medium' | 'high') => {
    createMutation.mutate({ title, context, task_date, priority });
  };

  const handleUpdateTaskStatus = (task: Task, newStatus: boolean) => {
    updateMutation.mutate({ task, newStatus });
  };

  const handleDeleteTask = (taskId: number) => {
    deleteMutation.mutate(taskId);
  };

  // --- Grouping Logic (Hanya untuk membagi tampilan berdasarkan status) ---
  const groupedTasks = useMemo(() => {
    if (!tasks) return { overdue: [], today: [], upcoming: [], completed: [] };
    
    // Kita filter lagi berdasarkan TAB yang dipilih (Client side)
    // Karena API hanya filter Date & Priority, status 'completed' masih tercampur
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
          <Typography variant="h4" gutterBottom>My Tasks</Typography>
          <Typography variant="body1" color="text.secondary">
            Stay organized and on top of your work.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<AddIcon />} 
          sx={{ textTransform: 'none' }}
          onClick={() => setOpenAddDialog(true)}
        >
          Add Task
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        {/* Status Filter (Client Side) */}
        <ToggleButtonGroup value={statusTab} exclusive onChange={handleStatusTabChange} color="primary" size="small">
          <ToggleButton value="all" sx={{ textTransform: 'none' }}>All</ToggleButton>
          <ToggleButton value="incomplete" sx={{ textTransform: 'none' }}>Incomplete</ToggleButton>
          <ToggleButton value="completed" sx={{ textTransform: 'none' }}>Completed</ToggleButton>
          <ToggleButton value="overdue" sx={{ textTransform: 'none' }}>Overdue</ToggleButton>
        </ToggleButtonGroup>
        
        <Box sx={{ flexGrow: 1 }} /> 

        {/* Date Filter (Server Side) */}
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Filter Date</InputLabel>
          <Select value={dateFilterType} label="Filter Date" onChange={handleDateFilterChange}>
            <MenuItem value="all">All Dates</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="tomorrow">Tomorrow</MenuItem>
          </Select>
        </FormControl>

        {/* Priority Filter (Server Side) */}
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Filter Priority</InputLabel>
          <Select value={priorityFilter} label="Filter Priority" onChange={handlePriorityFilterChange}>
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        {isEmpty ? (
          <Paper sx={{ p: 3, textAlign: 'center', border: '2px dashed', borderColor: 'divider', borderRadius: '12px' }}>
            <Typography variant="h6">Tidak ada tugas</Typography>
            <Typography color="text.secondary">Coba ubah filter atau tambahkan tugas baru.</Typography>
          </Paper>
        ) : (
          <>
            {groupedTasks.overdue.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <WarningAmberIcon color="error" />
                  <Typography variant="h6" fontWeight="bold">Overdue</Typography>
                </Box>
                {groupedTasks.overdue.map(task => (
                  <TaskItem key={task.id} task={task} onUpdateStatus={handleUpdateTaskStatus} onDelete={handleDeleteTask} />
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
                  <TaskItem key={task.id} task={task} onUpdateStatus={handleUpdateTaskStatus} onDelete={handleDeleteTask} />
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
                  <TaskItem key={task.id} task={task} onUpdateStatus={handleUpdateTaskStatus} onDelete={handleDeleteTask} />
                ))}
              </Box>
            )}

            {groupedTasks.completed.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CheckCircleOutlineIcon color="success" />
                  <Typography variant="h6" fontWeight="bold">Completed</Typography>
                </Box>
                {groupedTasks.completed.map(task => (
                  <TaskItem key={task.id} task={task} onUpdateStatus={handleUpdateTaskStatus} onDelete={handleDeleteTask} />
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
      
      <AddTaskDialog 
        open={openAddDialog} 
        onClose={() => setOpenAddDialog(false)} 
        onSubmit={handleAddTaskSubmit} 
      />
    </Box>
  );
}

export default TasksPage;