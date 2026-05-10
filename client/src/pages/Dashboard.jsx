import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { motion } from "framer-motion";
import { UserCircle, CreditCard, Heart, Trophy, Flag, Plus, Edit2, Trash2, Upload, Activity, ChevronRight, CheckCircle2 } from "lucide-react";

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
    if (!window.confirm("Delete this score?")) return;
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      {/* Welcome Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-amber-500/20 border border-white/10 flex items-center justify-center">
            <UserCircle className="w-12 h-12 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-1">Howdy, <span className="text-emerald-400">{user?.name}</span></h1>
            <p className="text-slate-400 font-medium">Your global impact and game performance terminal.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 glass-emerald rounded-full border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            {user?.subscriptionStatus === 'active' ? 'Active Member' : 'Guest Access'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Stats & Sub */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Subscription Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
            <h2 className="text-xl font-black mb-6 text-white flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-emerald-400" /> Subscription Status
            </h2>
            
            <div className="bg-slate-950/50 rounded-2xl p-6 border border-white/5 mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Plan Type</span>
                <span className="text-white font-black">Monthly Pro</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Status</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${user?.subscriptionStatus === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {user?.subscriptionStatus}
                </span>
              </div>
            </div>

            {user?.subscriptionStatus !== "active" ? (
              <div className="space-y-4">
                <button 
                  onClick={() => handleSubscribe("monthly")}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 transform hover:-translate-y-1"
                >
                  Activate Pro ($10/mo)
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase font-black tracking-widest">Secure Stripe Payouts</p>
              </div>
            ) : (
              <button className="w-full bg-white/5 text-slate-300 font-bold py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                Manage Billing
              </button>
            )}
          </motion.div>

          {/* Charity Impact Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
            <h2 className="text-xl font-black mb-6 text-white flex items-center gap-3">
              <Heart className="w-6 h-6 text-amber-500" /> Social Impact
            </h2>
            {user?.selectedCharity ? (
              <div className="space-y-4">
                <div className="bg-slate-950/50 rounded-2xl p-6 border border-white/5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Partner Organization</p>
                  <p className="text-xl font-black text-amber-400">{user.selectedCharity.name}</p>
                </div>
                <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-xs font-bold">You are contributing <span className="font-black text-white">{user.donationPercentage}%</span> of your dues.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-slate-400 mb-6 text-sm font-medium leading-relaxed">No charity selected. Your contributions are currently going to the General Pool.</p>
                <a href="/charities" className="inline-flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
                  Choose Partner <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Winnings Registry */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl"
          >
            <h2 className="text-xl font-black mb-8 text-white flex items-center gap-3">
              <Trophy className="w-6 h-6 text-amber-400" /> Prize Registry
            </h2>
            <div className="space-y-4">
              {winnings.length === 0 ? (
                <div className="text-center py-10 opacity-40">
                  <Trophy className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">No prizes recorded</p>
                </div>
              ) : (
                winnings.map(w => (
                  <div key={w._id} className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 group hover:border-amber-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-black text-white text-lg">{w.prize}</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Draw Ref: {w.draw?.month}/{w.draw?.year}</p>
                      </div>
                      <p className="text-amber-400 font-black text-lg">${w.prizeAmount?.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border ${w.verificationStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                        {w.verificationStatus}
                      </span>
                      {w.verificationStatus === 'Pending' && !w.verificationProof && (
                        <button onClick={() => handleUploadProof(w._id)} className="text-[10px] bg-white text-slate-950 px-4 py-2 rounded-xl font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg">
                          <Upload className="w-3 h-3" /> Claim
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Score Engine */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl h-full flex flex-col"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-black text-white flex items-center gap-4">
                  <Flag className="w-10 h-10 text-emerald-400" /> Score Terminal
                </h2>
                <p className="text-slate-500 mt-2 text-sm font-medium">Log your rounds to enter the upcoming global draw.</p>
              </div>
              <div className="px-5 py-2.5 glass-emerald rounded-full border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" /> Valid Series: {scores.length}/5
              </div>
            </div>

            {/* Score Entry Field */}
            <form onSubmit={handleAddScore} className="flex gap-4 mb-16 bg-slate-950/50 p-3 rounded-[2rem] border border-white/10 focus-within:border-emerald-500/50 transition-all">
              <div className="flex-grow relative">
                <Flag className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="number" min="1" max="45" required
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  placeholder="Enter score (1-45)"
                  className="w-full bg-transparent border-none rounded-2xl pl-16 pr-6 py-4 text-white font-black text-xl placeholder:text-slate-600 focus:outline-none"
                />
              </div>
              <button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-10 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3 transform hover:scale-105 active:scale-95"
              >
                <Plus className="w-6 h-6" /> <span className="hidden sm:inline">Commit</span>
              </button>
            </form>

            {/* Scores List Section */}
            <div className="flex-1">
              <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.3em] mb-6 px-2">Active Sequence Log</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence>
                  {scores.length === 0 ? (
                    <div className="col-span-full py-20 text-center opacity-30">
                      <Activity className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-sm font-black uppercase tracking-widest">No rounds logged in current series</p>
                    </div>
                  ) : (
                    scores.map((score, idx) => (
                      <motion.div 
                        key={score._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-slate-900/50 p-6 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-2xl font-black text-emerald-400 shadow-inner">
                            {score.score}
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Authenticated On</p>
                            <p className="font-bold text-white">{new Date(score.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => {
                              setEditingScoreId(score._id);
                              setEditScoreValue(score.score);
                            }}
                            className="p-2 text-slate-600 hover:text-white transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteScore(score._id)}
                            className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
      
      {/* Overlay for Editing Score */}
      <AnimatePresence>
        {editingScoreId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass p-10 rounded-[3rem] border border-white/10 w-full max-w-md shadow-2xl"
            >
              <h3 className="text-2xl font-black text-white mb-8">Edit Score Entry</h3>
              <form onSubmit={handleEditScore} className="space-y-8">
                <div className="relative">
                  <input 
                    type="number" min="1" max="45" required
                    value={editScoreValue}
                    onChange={(e) => setEditScoreValue(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 text-3xl font-black text-center text-emerald-400 focus:outline-none focus:border-emerald-500 transition-all"
                  />
                  <div className="text-[10px] text-center text-slate-500 uppercase font-black tracking-widest mt-4">Range: 01 - 45 Only</div>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all">Update Entry</button>
                  <button type="button" onClick={() => setEditingScoreId(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl transition-all">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;