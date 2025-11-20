// src/pages/LandingPage.tsx
import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SchoolIcon from '@mui/icons-material/School';

// DARK MODE COLORS
const CUSTOM_COLORS = {
  primary: '#3E8EDE', // Biru Terang
  accent: '#FF8C42',  // Oranye
  bgSection: '#0B1120', // Background section yang lebih gelap dari default
  textPrimary: '#F8FAFC', // Putih bersih
  textSecondary: '#94A3B8', // Abu-abu kebiruan
  paperBg: '#1E293B', // Slate 800
};

function LandingPage(): React.JSX.Element {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', color: 'text.primary', fontFamily: '"Lexend", sans-serif' }}>
      
      {/* ================= HEADER / NAVBAR ================= */}
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          // Style sudah dihandle di theme.ts, tapi kita override sedikit transparansinya
          bgcolor: 'rgba(15, 23, 42, 0.85)', 
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1.5 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => navigate('/')}>
              <SchoolIcon sx={{ color: CUSTOM_COLORS.primary, fontSize: 32 }} />
              <Typography variant="h6" fontWeight="800" color="text.primary" sx={{ fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
                StudySmart
              </Typography>
            </Box>

            {/* Auth Buttons */}
            <Stack direction="row" spacing={2}>
              <Button 
                variant="text" 
                onClick={() => navigate('/sign-in')}
                sx={{ 
                  color: CUSTOM_COLORS.textPrimary, 
                  fontWeight: '600', 
                  px: 3,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                Log In
              </Button>
              <Button 
                variant="contained" 
                onClick={() => navigate('/sign-up')}
                sx={{ 
                  bgcolor: CUSTOM_COLORS.accent, 
                  color: 'white',
                  fontWeight: 'bold', 
                  px: 3,
                  '&:hover': { bgcolor: '#e67a36' }
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main">
        
        {/* ================= HERO SECTION ================= */}
        <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 14 }, pb: { xs: 10, md: 12 } }}>
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            
            {/* Headline */}
            <Box>
              <Typography 
                variant="h2" 
                component="h1"
                fontWeight="900" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '5rem' }, 
                  lineHeight: 1.1, 
                  letterSpacing: '-0.03em',
                  mb: 3,
                  background: `linear-gradient(to right, #fff, ${CUSTOM_COLORS.textSecondary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Unlock Your <Box component="span" sx={{ WebkitTextFillColor: CUSTOM_COLORS.primary }}>A+ Potential</Box>
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  color: CUSTOM_COLORS.textSecondary, 
                  maxWidth: '750px', 
                  mx: 'auto', 
                  fontWeight: 'normal',
                  lineHeight: 1.7,
                  fontSize: '1.15rem'
                }}
              >
                The all-in-one platform combining AI study tools with powerful task management to help you conquer your semester.
              </Typography>
            </Box>

            {/* Hero Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
              <Button 
                variant="contained"
                size="large"
                onClick={() => navigate('/sign-up')}
                sx={{ 
                  bgcolor: CUSTOM_COLORS.accent, 
                  color: 'white', 
                  px: 5, py: 1.8, 
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: '#e67a36', transform: 'scale(1.05)' }
                }}
              >
                Get Started for Free
              </Button>
              <Button 
                variant="outlined"
                size="large"
                sx={{ 
                  color: CUSTOM_COLORS.primary, 
                  borderColor: 'rgba(62, 142, 222, 0.3)',
                  bgcolor: 'rgba(62, 142, 222, 0.1)',
                  px: 5, py: 1.8, 
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: 'rgba(62, 142, 222, 0.2)', borderColor: CUSTOM_COLORS.primary }
                }}
              >
                Learn More
              </Button>
            </Stack>

            {/* Hero Image Placeholder (Dark Window) */}
            <Box sx={{ mt: 8, width: '100%', maxWidth: '1024px', position: 'relative' }}>
              {/* Glow effect behind image */}
              <Box sx={{ 
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '90%', height: '80%', 
                background: `radial-gradient(circle, ${CUSTOM_COLORS.primary}22 0%, transparent 70%)`,
                filter: 'blur(60px)',
                zIndex: 0
              }} />

              <Paper 
                elevation={24} 
                sx={{ 
                  position: 'relative',
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  bgcolor: '#0B1120', 
                  border: '1px solid #334155',
                  zIndex: 1
                }}
              >
                {/* Fake Window Controls */}
                <Box sx={{ display: 'flex', gap: 1, p: 2, bgcolor: '#1E293B', borderBottom: '1px solid #334155' }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#EF4444' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10B981' }} />
                </Box>
                {/* Image */}
                <Box 
                  component="img"
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
                  alt="Dashboard Preview"
                  sx={{ width: '100%', height: 'auto', display: 'block', opacity: 0.8 }}
                />
              </Paper>
            </Box>
          </Box>
        </Container>

     {/* ================= FEATURES SECTION ================= */}
<Box sx={{ bgcolor: CUSTOM_COLORS.bgSection, py: { xs: 10, md: 12 } }}>
  <Container maxWidth="lg">

    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
        Everything You Need to Succeed
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'normal' }}>
        Stay organized, study effectively, and build great habits, all in one place.
      </Typography>
    </Box>

    {/* ================= MANUAL GRID (CSS NATIVE) ================= */}
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        justifyContent: 'center'
      }}
    >

      {/* Feature 1 */}
      <Box
        sx={{
          flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 32px)" },
          maxWidth: { xs: "100%", md: "calc(33.33% - 32px)" }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            height: '100%',
            borderRadius: 4,
            transition: '0.3s',
            '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 }
          }}
        >
          <Box sx={{
            width: 64, height: 64,
            borderRadius: 3,
            bgcolor: '#DBEAFE',
            color: CUSTOM_COLORS.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mb: 3
          }}>
            <AutoAwesomeIcon fontSize="large" />
          </Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            AI Study Partner
          </Typography>
          <Typography color="text.secondary">
            Generate summaries, create flashcards, and get practice questions instantly with your personal AI assistant.
          </Typography>
        </Paper>
      </Box>

      {/* Feature 2 */}
      <Box
        sx={{
          flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 32px)" },
          maxWidth: { xs: "100%", md: "calc(33.33% - 32px)" }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            height: '100%',
            borderRadius: 4,
            transition: '0.3s',
            '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 }
          }}
        >
          <Box sx={{
            width: 64, height: 64,
            borderRadius: 3,
            bgcolor: '#DBEAFE',
            color: CUSTOM_COLORS.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mb: 3
          }}>
            <ChecklistIcon fontSize="large" />
          </Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Effortless Organization
          </Typography>
          <Typography color="text.secondary">
            Manage all your assignments, projects, and exams with intuitive to-do lists and project boards.
          </Typography>
        </Paper>
      </Box>

      {/* Feature 3 */}
      <Box
        sx={{
          flex: { xs: "1 1 100%", md: "1 1 calc(33.33% - 32px)" },
          maxWidth: { xs: "100%", md: "calc(33.33% - 32px)" }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            height: '100%',
            borderRadius: 4,
            transition: '0.3s',
            '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 }
          }}
        >
          <Box sx={{
            width: 64, height: 64,
            borderRadius: 3,
            bgcolor: '#FFEDD5',
            color: CUSTOM_COLORS.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mb: 3
          }}>
            <LocalFireDepartmentIcon fontSize="large" />
          </Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Build Winning Habits
          </Typography>
          <Typography color="text.secondary">
            Stay motivated and track your daily progress with our streak system, designed to encourage consistency.
          </Typography>
        </Paper>
      </Box>

    </Box>
  </Container>
</Box>


        {/* ================= CTA SECTION ================= */}
        <Box sx={{ py: { xs: 10, md: 14 }, px: 2 }}>
          <Container maxWidth="lg">
            <Box 
              sx={{ 
                background: `linear-gradient(135deg, #1e40af 0%, #172554 100%)`, // Darker blue gradient
                borderRadius: { xs: 4, md: 6 },
                p: { xs: 6, md: 12 },
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #334155',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Decorative Elements */}
              <Box sx={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.03)' }} />
              <Box sx={{ position: 'absolute', bottom: -80, left: -40, width: 400, height: 400, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.03)' }} />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                  Ready to Boost Your Grades?
                </Typography>
                <Typography variant="h6" sx={{ mb: 6, opacity: 0.8, fontWeight: 'normal', maxWidth: '600px', mx: 'auto' }}>
                  Join thousands of students succeeding with StudySmart. Sign up is free and takes less than a minute.
                </Typography>
                <Button 
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/sign-up')}
                  sx={{ 
                    bgcolor: CUSTOM_COLORS.accent, 
                    color: 'white', 
                    px: 6, py: 2, 
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#e67a36', transform: 'scale(1.05)' }
                  }}
                >
                  Start for Free Today
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

      </Box>

      {/* ================= FOOTER ================= */}
      <Box sx={{ bgcolor: '#0B1120', py: 8, borderTop: '1px solid #1E293B' }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={4}>
            
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SchoolIcon sx={{ color: CUSTOM_COLORS.primary, fontSize: 28 }} />
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                StudySmart
              </Typography>
            </Box>

            {/* Links */}
            <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((text) => (
                <Typography 
                  key={text} 
                  component="a" 
                  href="#" 
                  onClick={(e) => e.preventDefault()}
                  sx={{ 
                    color: CUSTOM_COLORS.textSecondary, 
                    textDecoration: 'none', 
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    '&:hover': { color: CUSTOM_COLORS.primary, transition: '0.2s' }
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Stack>

            {/* Copyright */}
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              © 2024 StudySmart. All rights reserved.
            </Typography>

          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;