import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const CharityProfile = () => {
  const { id } = useParams();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState(50);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCharity = async () => {
      try {
        const res = await api.get(`/charities/${id}`);
        setCharity(res.data);
      } catch (error) {
        console.error("Failed to load charity", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharity();
  }, [id]);

  const handleDonate = async () => {
    if (!user) {
      alert("Please log in to make a donation.");
      return;
    }
    if (donationAmount < 1) {
      alert("Please enter a valid amount.");
      return;
    }
    try {
      await api.post(`/charities/${id}/donate`, { amount: donationAmount });
      alert(`Thank you! Your one-time donation of $${donationAmount} to ${charity.name} was successful.`);
      const res = await api.get(`/charities/${id}`);
      setCharity(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to process donation.");
    }
  };

  if (loading) return <div className="p-20 text-center text-white">Loading...</div>;
  if (!charity) return <div className="p-20 text-center text-white">Charity not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/charities" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">&larr; Back to Charities</Link>
      
      <div className="glass rounded-3xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img src={charity.image} alt={charity.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        </div>
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{charity.name}</h1>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">{charity.description}</p>
          <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-xl border border-white/5 mb-8">
            <span className="text-slate-400">Total Raised on Platform</span>
            <span className="text-3xl font-extrabold text-green-400">${charity.totalDonations}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="glass p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">📅 Upcoming Events</h2>
          {charity.upcomingEvents && charity.upcomingEvents.length > 0 ? (
            <ul className="space-y-6">
              {charity.upcomingEvents.map((event, idx) => (
                <li key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                  <h3 className="text-lg font-semibold text-purple-400">{event.title}</h3>
                  <div className="flex justify-between text-slate-400 text-sm mt-2">
                    <span>{event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">No upcoming events listed.</p>
          )}
        </motion.div>

        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}} className="glass p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-slate-900">
          <h2 className="text-2xl font-bold mb-4">Make a Direct Impact</h2>
          <p className="text-slate-400 mb-6">Want to do more? Make a one-time independent donation directly to {charity.name}.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Donation Amount ($)</label>
              <div className="flex gap-4">
                {[10, 50, 100].map(amt => (
                  <button 
                    key={amt}
                    onClick={() => setDonationAmount(amt)}
                    className={`flex-1 py-3 rounded-lg font-bold border transition-all ${donationAmount === amt ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-white/10 text-slate-400 hover:border-purple-500/50'}`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-400">
              <span>Other: $</span>
              <input 
                type="number" 
                value={donationAmount} 
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                className="bg-slate-900 border border-white/10 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <button 
              onClick={handleDonate}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-colors text-lg mt-4"
            >
              Donate ${donationAmount} Now
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">Payments are processed securely via our PCI-compliant provider.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CharityProfile;
