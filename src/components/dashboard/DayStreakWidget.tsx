import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { LocalFireDepartment } from '@mui/icons-material';

function DayStreakWidget(): React.JSX.Element {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        bgcolor: 'background.paper', 
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: '50%',

            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.dark + '33' 
                : theme.palette.primary.light + '33', 

            mr: 2,
          }}
        >
          <LocalFireDepartment sx={{ color: 'primary.main', fontSize: 30 }} />
        </Box>

        <Box>
          <Typography variant="h5" sx={{ color: 'text.primary' }}>
            12
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Day Streak!
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default DayStreakWidget;
