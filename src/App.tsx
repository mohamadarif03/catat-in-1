// src/App.tsx
import { Box, Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import LibraryPage from './pages/LibraryPage'; 
import TasksPage from './pages/TasksPage'; 
import ProgressPage from './pages/ProgressPage'; 
import SummaryPage from './pages/SummaryPage';
import ProjectPage from './pages/ProjectPage';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: { xs: 1, sm: 2, md: 3 }, 
      }}
    >
      <Container
        maxWidth="xl" 
        sx={{
          bgcolor: 'background.paper', 
          borderRadius: '16px', 
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          p: 0, 
          overflow: 'hidden', 
        }}
      >
        <Navbar />
        <Box 
          component="main" 
          sx={{ p: { xs: 2, md: 4 } }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/summary" element={<SummaryPage />} /> 
            <Route path="/project/:projectId" element={<ProjectPage />} />
          </Routes>
        </Box>
      </Container>
    </Box>
  );
}

export default App;