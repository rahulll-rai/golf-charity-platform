import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#022c22] border-t border-emerald-500/20 py-12 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-amber-400">
              GolfCharity
            </h2>
            <p className="text-emerald-100/70 mt-2 text-sm max-w-sm">
              Empowering golfers to make a difference. Track your scores, enter monthly draws, and support your favorite charities.
            </p>
          </div>
          
          <div className="flex space-x-6 text-sm text-emerald-100/70">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <Link to="/charities" className="hover:text-amber-400 transition-colors">Charities</Link>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
          </div>
        </div>
        
        <div className="border-t border-emerald-500/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-emerald-100/50 text-sm">
            &copy; {new Date().getFullYear()} GolfCharity Platform. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-emerald-100/50">
            {/* Social Icons Placeholders */}
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 hover:bg-amber-500/20 hover:text-amber-400 flex items-center justify-center cursor-pointer transition-colors">X</div>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 hover:bg-amber-500/20 hover:text-amber-400 flex items-center justify-center cursor-pointer transition-colors">IN</div>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 hover:bg-amber-500/20 hover:text-amber-400 flex items-center justify-center cursor-pointer transition-colors">FB</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
