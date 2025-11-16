import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';

type ToDoWidgetProps = {
  completed: number;
  total: number;
};

function ToDoWidget({ completed, total }: ToDoWidgetProps): React.JSX.Element {
  const percent = (completed / total) * 100;

  return (
<Paper sx={{ 
  height: '100%',
  p: 3,
  borderRadius: 3,
  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
  bgcolor: 'white'
}}>
      <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
        To-Do List
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        {completed} of {total} tasks completed
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1 }}>
          Daily Progress
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
          {Math.round(percent)}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: '#E0E7FF',
          '& .MuiLinearProgress-bar': {
            bgcolor: 'primary.main',
          },
        }}
      />
    </Paper>
  );
}

export default ToDoWidget;
