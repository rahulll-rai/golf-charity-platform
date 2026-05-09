import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [scores, setScores] = useState([]);
  const [winnings, setWinnings] = useState([]);
  const [newScore, setNewScore] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingScoreId, setEditingScoreId] = useState(null);
  const [editScoreValue, setEditScoreValue] = useState("");

  useEffect(() => {
    fetchScores();
    fetchWinnings();
  }, []);

  const fetchWinnings = async () => {
    try {
      const res = await api.get("/winners/me");
      setWinnings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchScores = async () => {
    try {
      const res = await api.get("/scores");
      setScores(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAddScore = async (e) => {
    e.preventDefault();
    if (!newScore || newScore < 1 || newScore > 45) return;
    try {
      await api.post("/scores", { score: newScore });
      setNewScore("");
      fetchScores();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteScore = async (id) => {
    try {
      await api.delete(`/scores/${id}`);
      fetchScores();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditScore = async (e) => {
    e.preventDefault();
    if (!editScoreValue || editScoreValue < 1 || editScoreValue > 45) return;
    try {
      await api.put(`/scores/${editingScoreId}`, { score: editScoreValue });
      setEditingScoreId(null);
      setEditScoreValue("");
      fetchScores();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscribe = async (planType) => {
    try {
      const res = await api.post("/subscriptions/create-checkout-session", { planType });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error(error);
      alert("Failed to initiate Stripe Checkout");
    }
  };

  const handleUploadProof = async (winnerId) => {
    const proofUrl = prompt("Enter the URL of your score screenshot (Mock Upload):", "https://example.com/proof.jpg");
    if (!proofUrl) return;
    try {
      await api.put(`/winners/${winnerId}/proof`, { proofUrl });
      alert("Proof uploaded! Pending admin verification.");
      fetchWinnings();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
        <p className="text-slate-400">Manage your subscription, scores, and charity impact.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile & Subscription Column */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-2xl"
          >
            <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Subscription Status</h2>
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-300">Current Plan</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${user?.subscriptionStatus === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {user?.subscriptionStatus.toUpperCase()}
              </span>
            </div>

            {user?.subscriptionStatus !== "active" && (
              <div className="space-y-3">
                <button 
                  onClick={() => handleSubscribe("monthly")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  Subscribe Monthly ($10/mo)
                </button>
                <button 
                  onClick={() => handleSubscribe("yearly")}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  Subscribe Yearly ($100/yr)
                </button>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-2xl"
          >
            <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Your Charity</h2>
            {user?.selectedCharity ? (
              <div>
                <p className="font-medium text-purple-400">{user.selectedCharity.name}</p>
                <p className="text-sm text-slate-400 mt-1">Donating {user.donationPercentage}% of your subscription.</p>
              </div>
            ) : (
              <div>
                <p className="text-slate-400 mb-4 text-sm">You haven't selected a charity yet.</p>
                <a href="/charities" className="text-sm text-purple-400 hover:text-purple-300">Select one now &rarr;</a>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-2xl"
          >
            <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Your Winnings</h2>
            <div className="space-y-4">
              {winnings.length === 0 ? (
                <p className="text-slate-400 text-sm">You haven't won any draws yet. Keep entering scores!</p>
              ) : (
                winnings.map(w => (
                  <div key={w._id} className="bg-slate-900/50 p-3 rounded-lg border border-white/5">
                    <p className="font-bold text-pink-400">{w.prize} <span className="text-white">(${w.prizeAmount?.toFixed(2)})</span></p>
                    <p className="text-xs text-slate-400 mb-2">Draw: {w.draw?.month}/{w.draw?.year}</p>
                    
                    <div className="flex justify-between items-center mt-2 border-t border-white/10 pt-2">
                      <span className={`text-[10px] px-2 py-1 rounded ${w.verificationStatus === 'Verified' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {w.verificationStatus}
                      </span>
                      {w.verificationStatus === 'Pending' && !w.verificationProof && (
                        <button onClick={() => handleUploadProof(w._id)} className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded">
                          Upload Proof
                        </button>
                      )}
                    </div>
                    {w.payoutStatus === 'Paid' && <p className="text-xs text-green-400 mt-2 text-right font-medium">Payout Sent</p>}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Scores Column */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 md:p-8 rounded-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Recent Scores</h2>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">Latest 5 kept</span>
            </div>

            {/* Add Score Form */}
            <form onSubmit={handleAddScore} className="flex gap-4 mb-8">
              <input 
                type="number" 
                min="1" max="45"
                required
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                placeholder="Enter score (1-45)"
                className="flex-grow bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Add Score
              </button>
            </form>

            {/* Scores List */}
            <div className="space-y-4">
              {scores.length === 0 ? (
                <p className="text-slate-400 text-center py-6">No scores logged yet.</p>
              ) : (
                scores.map((score, idx) => (
                  <div key={score._id} className="flex items-center justify-between bg-slate-900/40 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    {editingScoreId === score._id ? (
                      <form onSubmit={handleEditScore} className="flex items-center gap-4 w-full">
                        <input 
                          type="number" min="1" max="45" required
                          value={editScoreValue}
                          onChange={(e) => setEditScoreValue(e.target.value)}
                          className="bg-slate-900 border border-white/10 rounded px-3 py-1 w-24 text-white focus:outline-none focus:border-purple-500"
                        />
                        <button type="submit" className="text-green-400 hover:text-green-300 text-sm font-medium">Save</button>
                        <button type="button" onClick={() => setEditingScoreId(null)} className="text-slate-400 hover:text-slate-300 text-sm font-medium">Cancel</button>
                      </form>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center text-xl font-bold text-purple-300">
                            {score.score}
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Date Logged</p>
                            <p className="font-medium">{new Date(score.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setEditingScoreId(score._id);
                              setEditScoreValue(score.score);
                            }}
                            className="text-blue-400 hover:text-blue-300 p-2 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteScore(score._id)}
                            className="text-red-400 hover:text-red-300 p-2 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;