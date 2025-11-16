import React from 'react';
import { Paper, Typography, Link } from '@mui/material';

function SummaryWidget(): React.JSX.Element {
  return (
<Paper sx={{
  p: 3,
  borderRadius: 3,
  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
  bgcolor: 'white'
}}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Latest AI Summary
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
        The Mitochondria
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
        The mitochondria, often referred to as the powerhouse of the cell, are organelles
        responsible for generating most of the cell's supply of adenosine triphosphate (ATP), used...
      </Typography>
      <Link href="#" variant="body2" sx={{ fontWeight: 600, textDecoration: 'none' }}>
        View Full Summary
      </Link>
    </Paper>
  );
}

export default SummaryWidget;