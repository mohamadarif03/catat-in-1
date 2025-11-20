import React from 'react';
import { Paper, Typography, Box, LinearProgress, useTheme } from '@mui/material';

type ToDoWidgetProps = {
  completed: number;
  total: number;
};

function ToDoWidget({ completed, total }: ToDoWidgetProps): React.JSX.Element {
  const theme = useTheme();
  const percent = (completed / total) * 100;

  return (
    <Paper
      sx={{
        height: '100%',
        p: 3,
        borderRadius: 3,
        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        bgcolor: 'background.paper',          // ⬅️ otomatis dark/light
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
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
          bgcolor: theme.palette.action.disabledBackground, // ⬅️ auto adjust
          '& .MuiLinearProgress-bar': {
            bgcolor: 'primary.main',  // tetap sesuai tema
          },
        }}
      />
    </Paper>
  );
}

export default ToDoWidget;
