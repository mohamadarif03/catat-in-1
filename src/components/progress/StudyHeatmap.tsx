import React, { useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';

const heatmapData = [
  0, 0, 1, 2, 1, 0, 0,
  1, 3, 2, 3, 4, 1, 0,
  0, 2, 3, 4, 3, 2, 0,
  1, 2, 3, 4, 2, 1, 1,
  0, 1, 1, 2, 1, 0, 0,
];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getColorForLevel = (level: number, theme: any) => {
  switch (level) {
    case 0: return theme.palette.grey[200];
    case 1: return theme.palette.primary.light;
    case 2: return theme.palette.primary.main;
    case 3: return theme.palette.primary.dark;
    case 4: return '#00397A'
    default: return '#00397A';
  }
};

function StudyHeatmap(): React.JSX.Element {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('monthly');
  const theme = useTheme();

  const handleTimeRangeChange = (event: React.MouseEvent<HTMLElement>, newRange: 'weekly' | 'monthly' | null) => {
    if (newRange) {
      setTimeRange(newRange);
    }
  };

  return (
    <Box>
      {/* Header Heatmap */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">Study Heatmap</Typography>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={handleTimeRangeChange}
          size="small"
        >
          <ToggleButton value="weekly" sx={{ textTransform: 'none' }}>Weekly</ToggleButton>
          <ToggleButton value="monthly" sx={{ textTransform: 'none' }}>Monthly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', mb: 1 }}>
        {daysOfWeek.map(day => (
          <Typography key={day} variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
            {day}
          </Typography>
        ))}
        
        {heatmapData.map((level, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              paddingBottom: '100%', 
              bgcolor: getColorForLevel(level, theme),
              borderRadius: '4px',
            }}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">Less</Typography>
        {[0, 1, 2, 3, 4].map(level => (
          <Box
            key={level}
            sx={{
              width: 15,
              height: 15,
              bgcolor: getColorForLevel(level, theme),
              borderRadius: '3px',
            }}
          />
        ))}
        <Typography variant="body2" color="text.secondary">More</Typography>
      </Box>
    </Box>
  );
}

export default StudyHeatmap;