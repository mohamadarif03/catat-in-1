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
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { registerUser } from '../services/apiAuthService';
import type { RegisterData } from '../services/apiAuthService';

import FlashOnIcon from '@mui/icons-material/FlashOn';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';

interface FormErrors {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

const initialErrors: FormErrors = {
  username: '',
  email: '',
  password: '',
  password_confirm: '',
};

const validateEmailFormat = (email: string): string => {
  if (email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(email).toLowerCase())) {
      return 'Format email tidak valid';
    }
  }
  return '';
};

function RegisterPage(): React.JSX.Element {
  const navigate = useNavigate();
  const [role, setRole] = useState<'siswa' | 'pembimbing'>('siswa');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('Registrasi berhasil!', data);
      navigate('/login');
    },
    
    onError: (error: any) => {
      console.error('Registrasi gagal:', error);
      
      setErrors(initialErrors);
      setGeneralError(null);

      const responseData = error?.response?.data;

      if (responseData?.data && Array.isArray(responseData.data)) {
        const newErrors = { ...initialErrors };
        
        responseData.data.forEach((err: { field: string; message: string }) => {
          if (err.field === 'username') newErrors.username = err.message;
          if (err.field === 'email') newErrors.email = err.message;
          if (err.field === 'password') newErrors.password = err.message;
          if (err.field === 'passwordconfirm') newErrors.password_confirm = err.message;
        });
        
        setErrors(newErrors);
      } 
      else if (responseData?.meta?.message) {
        const message = responseData.meta.message;
        const lowerCaseMessage = message.toLowerCase();

        if (
          lowerCaseMessage.includes('email already registered') ||
          lowerCaseMessage.includes('email sudah terdaftar')
        ) {
          setErrors((prev) => ({ ...prev, email: message }));
        } 
        else if (
          lowerCaseMessage.includes('password') &&
          lowerCaseMessage.includes('match') 
        ) {
          setErrors((prev) => ({ ...prev, password_confirm: message }));
        }
        else {
          setGeneralError(message);
        }
      } 
      else {
        setGeneralError('Registrasi gagal. Coba lagi.');
      }
    },
  });

  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRole: 'siswa' | 'pembimbing' | null,
  ) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setErrors(initialErrors);
    setGeneralError(null);
    mutation.reset(); 

    const feErrors: Partial<FormErrors> = {};
    
    const emailFormatError = validateEmailFormat(email);
    if (emailFormatError) {
      feErrors.email = emailFormatError;
    }

    if (passwordConfirm && password !== passwordConfirm) {
      feErrors.password_confirm = "Password does't match";
    }

    if (Object.keys(feErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...feErrors }));
      return;
    }

    const data: RegisterData = {
      role: role,
      username: username,
      email: email,
      password: password,
      password_confirm: passwordConfirm,
    };

    mutation.mutate(data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{ p: 4, borderRadius: '16px', maxWidth: 420, width: '100%' }}
      >
        <Stack spacing={2} alignItems="center">
          <FlashOnIcon sx={{ color: 'primary.main', fontSize: 40, mb: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Create Your Account
          </Typography>

          {generalError && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {generalError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 2 }}>
            <Stack spacing={2}>
              <ToggleButtonGroup
                value={role}
                exclusive
                onChange={handleRoleChange}
                fullWidth
              >
                <ToggleButton value="siswa">
                  <PersonOutlineIcon sx={{ mr: 1 }} />
                  I am a Student
                </ToggleButton>
                <ToggleButton value="pembimbing">
                  <SupervisorAccountOutlinedIcon sx={{ mr: 1 }} />
                  I am a Guardian
                </ToggleButton>
              </ToggleButtonGroup>

              <TextField
                label="Full Name"
                name="username"
                required
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                label="Email Address"
                name="email"
                type="email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                label="Confirm Password" 
                name="password_confirm"
                type="password"
                required
                fullWidth
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                error={!!errors.password_confirm}
                helperText={errors.password_confirm}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ textTransform: 'none', py: 1.5, color:'white' }}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Mendaftarkan...' : 'Create Account'}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ pt: 2 }}>
            Already have an account?{' '}
            <Link
              href="/sign-in"
              onClick={(e) => {
                e.preventDefault();
                navigate('/sign-in');
              }}
              fontWeight="bold"
            >
              Sign In
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default RegisterPage;