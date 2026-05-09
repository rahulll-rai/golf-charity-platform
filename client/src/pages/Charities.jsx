import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

  if (loading) return <div className="p-20 text-center">Loading charities...</div>;

  const filteredCharities = charities.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Make Your Impact</h1>
        <p className="text-xl text-slate-400">
          Select a charity to support. A portion of your subscription goes directly to the causes you care about.
        </p>
      </div>

      <div className="mb-10 max-w-md mx-auto">
        <input 
          type="text" 
          placeholder="Search charities..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900/80 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCharities.length === 0 ? (
          <div className="col-span-full text-center py-10 text-slate-400">No charities found matching "{searchQuery}"</div>
        ) : (
          filteredCharities.map((charity, idx) => (
            <motion.div 
              key={charity._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${user?.selectedCharity?._id === charity._id ? 'ring-2 ring-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]' : 'hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}
            >
              <Link to={`/charities/${charity._id}`} className="block h-48 overflow-hidden">
                <img 
                  src={charity.image} 
                  alt={charity.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="p-6 flex-grow flex flex-col">
                <Link to={`/charities/${charity._id}`}>
                  <h3 className="text-2xl font-bold mb-2 hover:text-purple-400 transition-colors">{charity.name}</h3>
                </Link>
                <p className="text-slate-400 mb-6 flex-grow">{charity.description}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-500">Total Raised</span>
                  <span className="font-bold text-green-400">${charity.totalDonations}</span>
                </div>
                
                {user?.selectedCharity?._id !== charity._id && (
                  <div className="mb-4">
                    <label className="block text-sm text-slate-400 mb-1">Donation Percentage</label>
                    <select 
                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      value={selectedPercentages[charity._id] || 10}
                      onChange={(e) => setSelectedPercentages({...selectedPercentages, [charity._id]: Number(e.target.value)})}
                    >
                      <option value={10}>10% (Minimum)</option>
                      <option value={15}>15%</option>
                      <option value={20}>20%</option>
                      <option value={25}>25%</option>
                    </select>
                  </div>
                )}

                <button 
                  onClick={() => handleSelectCharity(charity._id)}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${user?.selectedCharity?._id === charity._id ? 'bg-purple-500/20 text-purple-300 cursor-default' : 'bg-white/10 hover:bg-purple-600 text-white'}`}
                  disabled={user?.selectedCharity?._id === charity._id}
                >
                  {user?.selectedCharity?._id === charity._id ? 'Currently Supporting' : 'Support this Charity'}
                </button>
              </div>
            </div>
          </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Charities;
