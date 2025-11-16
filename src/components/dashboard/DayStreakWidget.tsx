import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { LocalFireDepartment } from '@mui/icons-material';

function DayStreakWidget(): React.JSX.Element {
  return (
<Paper sx={{
  p: 3,
  borderRadius: 3,
  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
  bgcolor: 'white',
  height: '100%'
}}>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            bgcolor: '#FFF7ED',
            borderRadius: '50%',
            mr: 2,
          }}
        >
          <LocalFireDepartment sx={{ color: 'secondary.main', fontSize: 30 }} />
        </Box>
        <Box>
          <Typography variant="h5" component="div" sx={{ color: 'text.primary' }}>
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