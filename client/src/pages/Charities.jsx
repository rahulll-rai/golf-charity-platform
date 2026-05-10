import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Star, ArrowRight } from "lucide-react";

const Charities = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPercentages, setSelectedPercentages] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await api.get("/charities");
        setCharities(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharities();
  }, []);

  const handleSelectCharity = async (charityId) => {
    if (!user) {
      alert("Please login to select a charity.");
      return;
    }

    try {
      const percentage = selectedPercentages[charityId] || 10;
      await api.post("/charities/select", { charityId, percentage });
      // Update local user state
      const res = await api.get("/users/me");
      setUser(res.data);
      alert("Charity selected successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to select charity.");
    }
  };

  if (loading) return <div className="p-20 text-center text-emerald-300 text-xl font-bold animate-pulse">Loading charities...</div>;

  const filteredCharities = charities.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#022c22] text-slate-100 flex flex-col w-full">
      {/* Hero Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-[#022c22] to-[#022c22]" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight"
          >
            Make Your Impact
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-emerald-100/70 mb-10 leading-relaxed"
          >
            Select a charity to support. A portion of your subscription goes directly to the causes you care about.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-emerald-500">
                <Search className="w-6 h-6" />
              </span>
              <input 
                type="text" 
                placeholder="Search charities..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#011c16]/80 border border-emerald-500/30 rounded-full pl-12 pr-6 py-4 text-white text-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCharities.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full text-center py-20 text-emerald-200/50 text-2xl font-bold"
              >
                No charities found matching "{searchQuery}"
              </motion.div>
            ) : (
              filteredCharities.map((charity, idx) => (
                <motion.div 
                  key={charity._id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.1, duration: 0.4, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -10 }}
                  className={`glass rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${user?.selectedCharity?._id === charity._id ? 'ring-2 ring-amber-500 shadow-[0_0_30px_rgba(251,191,36,0.3)] bg-emerald-900/20' : 'border border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] bg-[#011c16]/60'}`}
                >
                  <Link to={`/charities/${charity._id}`} className="block h-56 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={charity.image} 
                      alt={charity.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                  <div className="p-8 flex-grow flex flex-col">
                    <Link to={`/charities/${charity._id}`}>
                      <h3 className="text-3xl font-bold mb-3 text-white hover:text-amber-400 transition-colors leading-tight">{charity.name}</h3>
                    </Link>
                    <p className="text-emerald-100/70 mb-8 flex-grow text-lg leading-relaxed">{charity.description}</p>
                  
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-6 bg-[#022c22] p-4 rounded-xl border border-emerald-500/10">
                        <span className="text-sm font-bold text-emerald-200/60 uppercase tracking-widest">Total Raised</span>
                        <span className="text-2xl font-black text-amber-400">\${charity.totalDonations.toLocaleString()}</span>
                      </div>
                      
                      {user?.selectedCharity?._id !== charity._id && (
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-emerald-200/80 mb-2 uppercase tracking-wide">Donation Percentage</label>
                          <select 
                            className="w-full bg-[#011c16] border border-emerald-500/30 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                            value={selectedPercentages[charity._id] || 10}
                            onChange={(e) => setSelectedPercentages({...selectedPercentages, [charity._id]: Number(e.target.value)})}
                          >
                            <option value={10}>10% (Minimum)</option>
                            <option value={15}>15%</option>
                            <option value={20}>20%</option>
                            <option value={25}>25%</option>
                            <option value={50}>50%</option>
                          </select>
                        </div>
                      )}

                      <button 
                        onClick={() => handleSelectCharity(charity._id)}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${user?.selectedCharity?._id === charity._id ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 cursor-default' : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-emerald-500/30 transform hover:-translate-y-1'}`}
                        disabled={user?.selectedCharity?._id === charity._id}
                      >
                        {user?.selectedCharity?._id === charity._id ? <><Star className="w-5 h-5 fill-current" /> Currently Supporting</> : 'Support this Charity'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Charities;
