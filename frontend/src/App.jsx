import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DarkModeProvider } from './context/DarkModeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import Admin from './pages/Admin';
import Profile from './pages/Profile';

function App() {
  return (
    <DarkModeProvider>
      <Toaster position="top-right" />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </DarkModeProvider>
  );
}

export default App;