import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, User, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-trip-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="font-bold text-xl hidden md:block">Tripadvisor</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 font-medium text-sm">
            <Link to="/search?type=attraction" className="hover:text-trip-green">Discover</Link>
            <Link to="/trips" className="hover:text-trip-green">Trips</Link>
            <Link to="/review" className="hover:text-trip-green">Review</Link>
            <Link to="/more" className="hover:text-trip-green">More</Link>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-trip-green text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/search?q=${(e.target as HTMLInputElement).value}`);
                }
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {user.role === 'admin' && (
                <Link to="/admin" className="text-sm font-medium hover:text-trip-green">Admin</Link>
              )}
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:block">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-full">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-sm font-bold hover:bg-gray-100 rounded-full">Sign in</Link>
              <Link to="/login" className="trip-button-secondary py-1.5 px-4 text-sm">Join</Link>
            </div>
          )}
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
