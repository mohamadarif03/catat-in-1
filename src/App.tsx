import { Route, Routes } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import Dashboard from './pages/Dashboard';
import LibraryPage from './pages/LibraryPage';
import TasksPage from './pages/TasksPage';
import ProgressPage from './pages/ProgressPage';
import ProjectPage from './pages/ProjectPage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/sign-up" element={<RegisterPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
        <Route path="/quiz/:topicId" element={<QuizPage />} />
      </Route>
      
    </Routes>
  );
}

export default App;