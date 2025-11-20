import React from 'react';
import { Box, Typography, Paper, Stack, useTheme } from '@mui/material';

import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import StatCard from '../components/progress/StatCard';
import StudyHeatmap from '../components/progress/StudyHeatmap';

function ProgressPage(): React.JSX.Element {
  const theme = useTheme();

  // ⬅️ Background soft highlight untuk tema (mirip card special)
  const highlightBg =
    theme.palette.mode === 'dark'
      ? theme.palette.primary.dark + '33'
      : theme.palette.primary.light + '33';

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Progress
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 8,
          gridTemplateColumns: '1fr',

          '@media (min-width: 768px)': {
            gridTemplateColumns: '2fr 1fr',
          },

          '@media (min-width: 1200px)': {
            gridTemplateColumns: '2fr 1fr',
          },
        }}
      >
        {/* CURRENT STREAK CARD */}
        <Box sx={{ gridColumn: '1 / -1' }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '12px',

              // ⬅️ otomatis mengikuti mode
              bgcolor: highlightBg,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Current Streak!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Keep the flame alive.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalFireDepartmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h3" fontWeight="bold" color="primary.main">
                42
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* HEATMAP */}
        <Box>
          <StudyHeatmap />
        </Box>

        {/* RIGHT SIDE STAT CARDS */}
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Key Stats
          </Typography>

          <Stack spacing={2}>
            <StatCard
              title="Total Study Hours"
              value="32h"
              IconComponent={AccessTimeIcon}
              iconBgColor={highlightBg}
            />

            <StatCard
              title="Tasks Completed"
              value="120"
              IconComponent={CheckCircleOutlineIcon}
              iconBgColor={highlightBg}
            />

            <StatCard
              title="AI Quizzes Taken"
              value="25"
              IconComponent={LibraryBooksIcon}
              iconBgColor={highlightBg}
            />

            <StatCard
              title="Most Productive Day"
              value="Monday"
              IconComponent={TrendingUpIcon}
              iconBgColor={highlightBg}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default ProgressPage;
