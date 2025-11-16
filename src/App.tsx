// src/App.tsx
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';   
import LibraryPage from './pages/LibraryPage';   

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: { xs: 1, sm: 2, md: 3 }, 
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
          </Routes>
        </Box>
    </Box>
  );
}

export default App;