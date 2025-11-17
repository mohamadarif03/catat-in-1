import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Link, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import FlashOnIcon from '@mui/icons-material/FlashOn';

import { loginUser } from '../services/apiAuthService';
import type { LoginData } from '../services/apiAuthService';
import apiClient from '../lib/axios';

interface FormErrors {
  email: string;
  password: string;
}

const initialErrors: FormErrors = {
  email: '',
  password: '',
};

function LoginPage(): React.JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      navigate('/');
    },
    
    onError: (error: any) => {
      console.error('Login gagal:', error);
      const responseData = error?.response?.data;

      setErrors(initialErrors);
      setGeneralError(null);

      if (responseData?.data && Array.isArray(responseData.data)) {
        const newErrors = { ...initialErrors };
        responseData.data.forEach((err: { field: string; message: string }) => {
          if (err.field === 'email') newErrors.email = err.message;
          if (err.field === 'password') newErrors.password = err.message;
        });
        setErrors(newErrors);
      } 
      else if (responseData?.meta?.message) {
        const message = responseData.meta.message;
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('email') || lowerMessage.includes('user not found') || lowerMessage.includes('user tidak ditemukan')) {
          setErrors((prev) => ({ ...prev, email: message }));
        } 
        else if (lowerMessage.includes('password') || lowerMessage.includes('credential') || lowerMessage.includes('password salah')) {
          setErrors((prev) => ({ ...prev, password: message }));
        } 
        else {
          setGeneralError(message);
        }
      } 
      else {
        setGeneralError('Email atau password salah. Coba lagi.');
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setErrors(initialErrors);
    setGeneralError(null);
    mutation.reset();

    const data: LoginData = {
      email: email,
      password: password,
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
      }}
    >
      <Paper
        elevation={0}
        sx={{ p: 4, borderRadius: '16px', maxWidth: 420, width: '100%' }}
      >
        <Stack spacing={2} alignItems="center">
          <FlashOnIcon sx={{ color: 'primary.main', fontSize: 40, mb: 1 }} />
          <Typography variant="h5" fontWeight="bold">Sign In</Typography>

          {generalError && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {generalError}
            </Alert>
          )}

          {/* [MODIFIKASI] Tambah 'noValidate' */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                variant="outlined"
                required
                fullWidth
                value={email}  onChange={(e) => setEmail(e.target.value)}  error={!!errors.email}  helperText={errors.email}/>
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                required
                fullWidth
                value={password}  onChange={(e) => setPassword(e.target.value)}  error={!!errors.password}  helperText={errors.password}/>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="#" variant="body2">Forgot password?</Link>
              </Box>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ textTransform: 'none', py: 1.5, color:'white' }}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Signing In...' : 'Sign In'}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ pt: 2 }}>
            Don't have an account?{' '}
            <Link href="/sign-up" onClick={(e) => { e.preventDefault(); navigate('/sign-up'); }} fontWeight="bold">
              Sign Up
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LoginPage;