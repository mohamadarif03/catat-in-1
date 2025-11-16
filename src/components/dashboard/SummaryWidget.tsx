import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

function SummaryWidget(): React.JSX.Element {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
        bgcolor: 'white'
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        Daily Quiz
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.5 }}
      >
        Test your knowledge and keep your streak going!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          py: 1.2,
          borderRadius: 2,
          color:'white',
          fontSize: '0.95rem',
          '&:hover': {
            backgroundColor: '#e67a36'
          }
        }}
      >
        Start Quiz
      </Button>
    </Paper>
  );
}

export default SummaryWidget;
