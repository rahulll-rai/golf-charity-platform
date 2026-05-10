import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-amber-400">
              GolfCharity
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/charities" className="hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Charities
              </Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Dashboard
                  </Link>
                  {user.role === "admin" && (
                    <Link to="/admin" className="hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-amber-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-white/10" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <Link to="/charities" onClick={closeMenu} className="text-white hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-center">
              Charities
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={closeMenu} className="text-white hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-center">
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" onClick={closeMenu} className="text-white hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-center">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-white/10 hover:bg-white/20 text-white w-full max-w-[200px] px-4 py-2 rounded-full text-base font-medium transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="text-white hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-center">
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white w-full max-w-[200px] text-center px-5 py-2 rounded-full text-base font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
