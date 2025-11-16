import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import type { Task } from '../types/task.types';
import TaskItem from '../components/tasks/TaskItem';

const tasksData: Task[] = [
  { id: '1', label: 'Finalize research paper outline', context: 'History 101', completed: false, dueDate: new Date(Date.now() - 86400000).toISOString(), priority: 'high' }, // Kemarin
  { id: '2', label: 'Complete Chapter 5 Reading', context: 'Literature 203', completed: false, dueDate: new Date().toISOString(), priority: 'medium' }, // Hari ini
  { id: '3', label: 'Submit Calculus problem set', context: 'Math 210', completed: false, dueDate: new Date().toISOString(), priority: 'high' }, // Hari ini
  { id: '4', label: 'Prepare for Chemistry lab', context: 'Chem 150', completed: false, dueDate: new Date(Date.now() + 86400000).toISOString(), priority: 'medium' }, // Besok
  { id: '5', label: 'Group meeting for project', context: 'Computer Science 301', completed: false, dueDate: new Date(Date.now() + 3 * 86400000).toISOString(), priority: 'low' }, // Lusa
  { id: '6', label: 'Review lecture notes for Physics', context: 'Physics 112', completed: true, dueDate: new Date(Date.now() - 2 * 86400000).toISOString(), priority: 'medium' }, // Selesai
];
// --- Akhir Data Dummy ---

// --- Helper untuk grouping ---
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
// --- Akhir Helper ---

function TasksPage(): React.JSX.Element {
  const [filter, setFilter] = useState<'all' | 'incomplete' | 'completed' | 'overdue'>('all');
  const [sortBy, setSortBy] = useState('priority');

  const handleFilterChange = (event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    if (newFilter) {
      setFilter(newFilter as 'all' | 'incomplete' | 'completed' | 'overdue');
    }
  };

  // Logika untuk memfilter dan mengelompokkan tugas
  const groupedTasks = useMemo(() => {
    // 1. Filter
    const filtered = tasksData.filter(task => {
      if (filter === 'all') return true;
      if (filter === 'completed') return task.completed;
      if (filter === 'overdue') return !task.completed && getStatus(task) === 'overdue';
      if (filter === 'incomplete') return !task.completed;
      return true;
    });

    // 2. Sort (Contoh sederhana)
    filtered.sort((a, b) => (sortBy === 'priority' ? a.priority.localeCompare(b.priority) : new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));

    // 3. Group
    const groups = {
      overdue: [] as Task[],
      today: [] as Task[],
      upcoming: [] as Task[],
      completed: [] as Task[],
    };

    for (const task of filtered) {
      const status = getStatus(task);
      groups[status].push(task);
    }
    return groups;
  }, [filter, sortBy]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>My Tasks</Typography>
          <Typography variant="body1" color="text.secondary">
            Stay organized and on top of your work.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ textTransform: 'none', color:'white' }}>
          Add Task
        </Button>
      </Box>

      {/* Toolbar Filter */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          color="primary"
        >
          <ToggleButton value="all" sx={{ textTransform: 'none' }}>All Tasks</ToggleButton>
          <ToggleButton value="incomplete" sx={{ textTransform: 'none' }}>Incomplete</ToggleButton>
          <ToggleButton value="completed" sx={{ textTransform: 'none' }}>Completed</ToggleButton>
          <ToggleButton value="overdue" sx={{ textTransform: 'none' }}>Overdue</ToggleButton>
        </ToggleButtonGroup>
        
        <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}

        {/* Placeholder untuk Filter & Sort */}
        <Button variant="outlined" color="inherit" sx={{ textTransform: 'none', color: 'text.secondary', borderColor: 'divider' }} endIcon={<ArrowDropDownIcon />}>
          Filter by Date
        </Button>
        <Button variant="outlined" color="inherit" sx={{ textTransform: 'none', color: 'text.secondary', borderColor: 'divider' }} endIcon={<ArrowDropDownIcon />}>
          Sort by Priority
        </Button>
      </Box>

      {/* Daftar Tugas */}
      <Box>
        {/* Grup Overdue */}
        {groupedTasks.overdue.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <WarningAmberIcon color="error" />
              <Typography variant="h6" fontWeight="bold">Overdue</Typography>
            </Box>
            {groupedTasks.overdue.map(task => <TaskItem key={task.id} task={task} />)}
          </Box>
        )}

        {/* Grup Today */}
        {groupedTasks.today.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarTodayIcon color="action" />
              <Typography variant="h6" fontWeight="bold">Today</Typography>
            </Box>
            {groupedTasks.today.map(task => <TaskItem key={task.id} task={task} />)}
          </Box>
        )}

        {groupedTasks.upcoming.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <EventIcon color="action" />
              <Typography variant="h6" fontWeight="bold">Upcoming</Typography>
            </Box>
            {groupedTasks.upcoming.map(task => <TaskItem key={task.id} task={task} />)}
          </Box>
        )}

        {/* Grup Completed */}
        {groupedTasks.completed.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CheckCircleOutlineIcon color="success" />
              <Typography variant="h6" fontWeight="bold">Completed</Typography>
            </Box>
            {groupedTasks.completed.map(task => <TaskItem key={task.id} task={task} />)}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default TasksPage;