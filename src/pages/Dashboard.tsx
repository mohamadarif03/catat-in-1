import React from 'react';
import { Box } from '@mui/material'; 
import Header from '../components/dashboard/Header';
import ToDoWidget from '../components/dashboard/ToDoWidget';
import DayStreakWidget from '../components/dashboard/DayStreakWidget';
import TasksWidget from '../components/dashboard/TasksWidget';
import SummaryWidget from '../components/dashboard/SummaryWidget';
import QuickActionsWidget from '../components/dashboard/QuickActionsWidget';

import type { Task } from '../types/task.types';
import './dashboard.css';

function Dashboard(): React.JSX.Element {
  const tasks: Task[] = [
    { id: 1, label: 'Finish Calculus Chapter 3 exercises', completed: true },
    { id: 2, label: 'Draft introduction for History essay', completed: true },
    { id: 3, label: 'Review Chemistry lab notes', completed: false },
    { id: 4, label: 'Read pages 50-75 of "The Great Gatsby"', completed: false },
    { id: 5, label: 'Prepare for Biology quiz', completed: false },
  ];

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <Box sx={{ p: 4 }}>
      <Header />

      <div className="dashboard-grid">
        <div className="left-grid">

          <div className="todo-widget">
            <ToDoWidget completed={completedTasks} total={totalTasks} />
          </div>

          <div className="streak-widget">
            <DayStreakWidget />
          </div>

          <div className="empty-space"></div>

          <div className="tasks-widget">
            <TasksWidget tasks={tasks} />
          </div>

        </div>

        <div className="right-grid">
          <SummaryWidget />
          <QuickActionsWidget />
        </div>
      </div>

    </Box>
  );
}

export default Dashboard;
