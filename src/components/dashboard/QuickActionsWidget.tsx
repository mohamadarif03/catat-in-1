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
        <Button
          variant="contained"
          startIcon={<QuizOutlined />}
          fullWidth
          sx={{
            py: 1.5,
            bgcolor: '#F8FAFC',
            color: '#334155',
            border: '1px solid #E2E8F0',
            '&:hover': {
              bgcolor: '#F1F5F9',
            },
          }}
        >
          Take Quiz
        </Button>
      </Stack>
    </Paper>
  );
}

export default QuickActionsWidget;