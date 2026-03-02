import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SearchIcon, BellIcon, UserIcon, LogoutIcon } from './Icons';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/');
    }
    setShowDropdown(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-90' : 'bg-gradient-to-b from-black to-transparent'
      }`}
    >
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="text-netflix-red text-2xl md:text-3xl font-bold tracking-tight">
            KODFLIX
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-white hover:text-gray-300 text-sm transition-colors">
                Home
              </Link>
              <Link to="/dashboard" className="text-gray-300 hover:text-white text-sm transition-colors">
                TV Shows
              </Link>
              <Link to="/dashboard" className="text-gray-300 hover:text-white text-sm transition-colors">
                Movies
              </Link>
              <Link to="/dashboard" className="text-gray-300 hover:text-white text-sm transition-colors">
                New & Popular
              </Link>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Search */}
              <button className="text-white hover:text-gray-300 transition-colors">
                <SearchIcon className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <button className="text-white hover:text-gray-300 transition-colors relative">
                <BellIcon className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-netflix-red text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <span className="hidden md:block text-sm">{user?.username}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-95 border border-gray-700 rounded shadow-lg py-2">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-white text-sm font-medium">{user?.username}</p>
                      <p className="text-gray-400 text-xs">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 flex items-center gap-2 text-sm"
                    >
                      <LogoutIcon className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-white hover:text-gray-300 text-sm transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="btn-primary text-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
