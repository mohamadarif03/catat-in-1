import React from 'react';
import { Typography } from '@mui/material';

function Header(): React.JSX.Element {
  return (
    <>
      <Typography variant="h4" component="h1" sx={{ color: 'text.primary', mb: 0.5 }}>
        Good morning, Alex!
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Monday, October 28
      </Typography>
    </>
  );
}

export default Header;