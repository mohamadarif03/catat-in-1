import React from 'react';
import { Box, Paper, Typography, TextField, Button, Link, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlashOnIcon from '@mui/icons-material/FlashOn'; 

function LoginPage(): React.JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log('Login berhasil!');
    navigate('/'); 
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: 'background.default' 
      }}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: '16px', 
          maxWidth: 420, 
          width: '100%',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <FlashOnIcon sx={{ color: 'primary.main', fontSize: 40, mb: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back to StudySpark!
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
            <Stack spacing={2}>
              <TextField 
                label="Email Address" 
                type="email" 
                variant="outlined" 
                required 
                fullWidth 
              />
              <TextField 
                label="Password" 
                type="password" 
                variant="outlined" 
                required 
                fullWidth 
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="#" variant="body2" sx={{ textTransform: 'none' }}>
                  Forgot password?
                </Link>
              </Box>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large" 
                fullWidth
                sx={{ textTransform: 'none', py: 1.5, color:'white' }}
              >
                Sign In
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ pt: 2 }}>
            Don't have an account?{' '}
            <Link href="#" onClick={() => navigate('/signup')} fontWeight="bold">
              Sign Up
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LoginPage;