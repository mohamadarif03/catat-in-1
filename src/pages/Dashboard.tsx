import React from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import Header from '../components/dashboard/Header';
import SummaryWidget from '../components/dashboard/SummaryWidget';
import DayStreakWidget from '../components/dashboard/DayStreakWidget';
import ToDoWidget from '../components/dashboard/ToDoWidget';
import TasksWidget from '../components/dashboard/TasksWidget';
import QuickActionsWidget from '../components/dashboard/QuickActionsWidget';

import { getTasks } from '../services/apiTaskService';
import './dashboard.css';

const getTodayDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function Dashboard(): React.JSX.Element {
  const todayDate = getTodayDate();

  const { data: tasks } = useQuery({
    queryKey: ['tasks', { date: todayDate }],
    queryFn: () => getTasks({ date: todayDate }),
  });

  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter((t) => t.completed).length || 0;

  return (
    <Box>
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
            <TasksWidget />
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