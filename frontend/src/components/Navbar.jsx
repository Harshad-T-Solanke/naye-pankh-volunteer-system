import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');

    toast.success('Logged out successfully');

    navigate('/login');
  };

  const renderAuthLinks = () => {
    
    if (!token) {
      return (
        <>
          <Link
            to="/register"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
          >
            Register
          </Link>

          <Link to="/login" className="btn-primary">
            Login
          </Link>
        </>
      );
    }

   
    return (
      <>
      
        {userRole === 'user' && (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              Profile
            </Link>
          </>
        )}

        {userRole === 'admin' && (
          <>
            <Link
              to="/admin"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              Admin Panel
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="text-red-600 dark:text-red-400 hover:text-red-700"
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            🌟 NayePankh
          </Link>

          <div className="flex items-center space-x-4">

            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            >
              Home
            </Link>
            {renderAuthLinks()}
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;