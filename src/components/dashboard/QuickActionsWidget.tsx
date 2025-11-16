import React from 'react';
import { Paper, Typography, Stack, Button } from '@mui/material';
import { Add, MenuBookOutlined, QuizOutlined } from '@mui/icons-material';

function QuickActionsWidget(): React.JSX.Element {
  return (
    <Paper>
      <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
        Quick Actions
      </Typography>
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          fullWidth
          sx={{ py: 1.5, color: 'white' }}
        >
          Add Task
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<MenuBookOutlined />}
          fullWidth
          sx={{ py: 1.5, borderColor: '#CBD5E1', color: '#334155' }}
        >
          Add Material
        </Button>

      </Stack>
    </Paper>
  );
}

export default QuickActionsWidget;