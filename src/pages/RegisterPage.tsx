// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // Ikon Student
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined'; // Ikon Guardian

function RegisterPage(): React.JSX.Element {
  const navigate = useNavigate();
  const [role, setRole] = useState<'student' | 'guardian'>('student');

  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRole: 'student' | 'guardian' | null,
  ) => {
    // Pilihan tidak boleh kosong, jadi jika user mengklik role yang aktif,
    // kita biarkan saja (jangan set ke null)
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Tambahkan logika registrasi di sini
    
    // Ambil data dari form
    const formData = new FormData(event.currentTarget);
    const data = {
      role: role,
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    console.log('Data Registrasi:', data);

    // Setelah register, arahkan ke halaman login
    navigate('/login'); 
  };

  return (
    // Latar belakang abu-abu satu halaman penuh
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: 'background.default',
        py: 4, // Tambahkan padding vertikal
      }}
    >
      {/* Kotak Form Registrasi */}
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
          {/* Ikon Logo */}
          <FlashOnIcon sx={{ color: 'primary.main', fontSize: 40, mb: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Create Your Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join StudySpark today!
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
            <Stack spacing={2}>
              
              {/* Pilihan Role (Student / Guardian) */}
              <ToggleButtonGroup
                value={role}
                exclusive
                onChange={handleRoleChange}
                aria-label="User Role"
                fullWidth
              >
                <ToggleButton value="student" aria-label="student" sx={{ textTransform: 'none', flex: 1 }}>
                  <PersonOutlineIcon sx={{ mr: 1, fontSize: '1.25rem' }} />
                  I am a Student
                </ToggleButton>
                <ToggleButton value="guardian" aria-label="guardian" sx={{ textTransform: 'none', flex: 1 }}>
                  <SupervisorAccountOutlinedIcon sx={{ mr: 1, fontSize: '1.25rem' }} />
                  I am a Guardian
                </ToggleButton>
              </ToggleButtonGroup>

              <TextField 
                label="Full Name" 
                name="name" // tambahkan name
                type="text" 
                variant="outlined" 
                required 
                fullWidth 
              />
              <TextField 
                label="Email Address" 
                name="email" // tambahkan name
                type="email" 
                variant="outlined" 
                required 
                fullWidth 
              />
              <TextField 
                label="Password" 
                name="password" // tambahkan name
                type="password" 
                variant="outlined" 
                required 
                fullWidth 
              />
              {/* Anda bisa tambahkan field "Confirm Password" di sini */}
              
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large" 
                fullWidth
                sx={{ textTransform: 'none', py: 1.5, color:'white' }}
              >
                Create Account
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ pt: 2 }}>
            Already have an account?{' '}
            <Link href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} fontWeight="bold">
              Sign In
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default RegisterPage;