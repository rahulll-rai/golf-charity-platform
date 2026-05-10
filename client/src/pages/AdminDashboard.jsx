import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Dices, Settings, FlaskConical, Rocket, Users, Handshake, Flag, Trophy, FileText, History, CheckCircle, Activity, DollarSign, List, ShieldCheck, Search, ChevronRight, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [charities, setCharities] = useState([]);
  const [scores, setScores] = useState([]);
  const [winners, setWinners] = useState([]);
  const [reports, setReports] = useState(null);
  const [draws, setDraws] = useState([]);
  
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [drawType, setDrawType] = useState("Random");
  const [isSimulation, setIsSimulation] = useState(false);
  const [drawResult, setDrawResult] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchCharities();
    fetchScores();
    fetchWinners();
    fetchReports();
    fetchDraws();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCharities = async () => {
    try {
      const res = await api.get("/charities");
      setCharities(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchScores = async () => {
    try {
      const res = await api.get("/admin/scores");
      setScores(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWinners = async () => {
    try {
      const res = await api.get("/admin/winners");
      setWinners(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await api.get("/admin/reports");
      setReports(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDraws = async () => {
    try {
      const res = await api.get("/admin/draws");
      setDraws(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCharity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this charity?")) return;
    try {
      await api.delete(`/admin/charities/${id}`);
      fetchCharities();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteScore = async (id) => {
    if (!window.confirm("Are you sure you want to delete this score?")) return;
    try {
      await api.delete(`/admin/scores/${id}`);
      fetchScores();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRunDraw = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/draws", { month, year, drawType, isSimulation });
      setDrawResult(res.data);
      if (!isSimulation) {
        alert("Draw published successfully!");
        fetchWinners();
        fetchReports();
        fetchDraws();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to run draw");
    }
  };

  const handleVerify = async (winnerId, status, payout) => {
    try {
      await api.put(`/admin/winners/${winnerId}/verify`, { verificationStatus: status, payoutStatus: payout });
      fetchWinners();
      fetchReports();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-2">Admin <span className="text-emerald-400">Terminal</span></h1>
          <p className="text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Authorized access only • Secure Session Active
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-5 py-2.5 glass-emerald rounded-full text-emerald-400 text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/10">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            System Live
          </div>
          <button onClick={() => window.location.reload()} className="p-2.5 glass hover:bg-white/10 rounded-full transition-all">
            <History className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      {reports && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Active Users", value: reports.activeUsers, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
            { label: "Total Contributions", value: `$${reports.totalCharityContributions.toLocaleString()}`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { label: "Prizes Awarded", value: `$${reports.totalPrizePoolAwarded.toLocaleString(undefined, {minimumFractionDigits: 2})}`, icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/10" },
            { label: "Completed Draws", value: reports.totalDraws, icon: Activity, color: "text-purple-400", bg: "bg-purple-400/10" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all"
            >
              <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500`} />
              <div className="relative z-10 flex flex-col gap-4">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Draw Controls */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass p-8 rounded-[2.5rem] border border-emerald-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
            <h2 className="text-2xl font-black mb-8 text-white flex items-center gap-3">
              <Dices className="w-8 h-8 text-emerald-400" /> Execute Draw
            </h2>
            
            <form onSubmit={handleRunDraw} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Month</label>
                  <input 
                    type="number" min="1" max="12" required
                    value={month} onChange={(e) => setMonth(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Year</label>
                  <input 
                    type="number" required
                    value={year} onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Algorithm Strategy</label>
                <select 
                  value={drawType} onChange={(e) => setDrawType(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="Random">Secure Random</option>
                  <option value="Algorithmic">Verifiable Algorithmic</option>
                </select>
              </div>

              <label className="flex items-center gap-4 bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 cursor-pointer hover:border-white/20 transition-all">
                <input 
                  type="checkbox" 
                  checked={isSimulation} onChange={(e) => setIsSimulation(e.target.checked)}
                  className="w-6 h-6 rounded-lg accent-emerald-500 cursor-pointer"
                />
                <span className="text-sm font-bold text-slate-200">Simulation Mode</span>
              </label>

              <button type="submit" className={`w-full py-5 rounded-2xl font-black text-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 shadow-xl ${isSimulation ? 'bg-amber-500 text-slate-950 shadow-amber-500/20' : 'bg-emerald-600 text-white shadow-emerald-500/20'}`}>
                {isSimulation ? <><FlaskConical className="w-6 h-6" /> Test Simulation</> : <><Rocket className="w-6 h-6" /> Publish Official Draw</>}
              </button>
            </form>

            <AnimatePresence>
              {drawResult && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 pt-8 border-t border-white/5"
                >
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6">
                    <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" /> Draw Sequence Generated
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {drawResult.draw.winningNumbers.map((num, i) => (
                        <div key={i} className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-amber-400 font-black">
                          {num}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Winners List</p>
                      {drawResult.winners.length > 0 ? (
                        <div className="max-h-40 overflow-y-auto custom-scrollbar space-y-2">
                          {drawResult.winners.map((w, i) => (
                            <div key={i} className="flex justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-white/5">
                              <span className="text-sm text-slate-300 font-medium">{w.user}</span>
                              <span className="text-xs font-black text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg">{w.prize}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 italic">No winners in this sequence.</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* User Management */}
        <div className="lg:col-span-8">
          <div className="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" /> Registered Users
              </h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" placeholder="Search golfers..."
                  className="bg-slate-900/50 border border-white/10 rounded-full pl-10 pr-6 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-all w-64"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-auto custom-scrollbar rounded-3xl">
              <table className="admin-table">
                <thead>
                  <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] text-left">
                    <th className="px-6 py-4">Identity</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Privileges</th>
                    <th className="px-6 py-4 text-right">Metrics</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="admin-table-row group">
                      <td className="admin-table-cell">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center font-bold text-blue-400">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-white group-hover:text-blue-400 transition-colors">{u.name}</p>
                            <p className="text-[10px] font-bold text-slate-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="admin-table-cell text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${u.subscriptionStatus === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                          {u.subscriptionStatus}
                        </span>
                      </td>
                      <td className="admin-table-cell">
                        <div className="flex items-center gap-2">
                          <Settings className="w-3 h-3 text-slate-500" />
                          <span className="text-xs font-bold text-slate-400">{u.role}</span>
                        </div>
                      </td>
                      <td className="admin-table-cell text-right">
                        <button className="text-slate-600 hover:text-white p-2">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Charities */}
        <div className="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl h-[600px] flex flex-col">
          <h2 className="text-2xl font-black mb-8 text-white flex items-center gap-3">
            <Handshake className="w-8 h-8 text-amber-500" /> Charity Management
          </h2>
          <div className="flex-1 overflow-auto custom-scrollbar rounded-3xl pr-2">
            <table className="admin-table">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] text-left">
                  <th className="px-6 py-4">Organization</th>
                  <th className="px-6 py-4">Impact</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {charities.map(c => (
                  <tr key={c._id} className="admin-table-row">
                    <td className="admin-table-cell">
                      <div className="flex items-center gap-3">
                        <img src={c.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                        <span className="font-black text-white">{c.name}</span>
                      </div>
                    </td>
                    <td className="admin-table-cell">
                      <span className="text-emerald-400 font-black tracking-wider text-lg">${c.totalDonations.toLocaleString()}</span>
                    </td>
                    <td className="admin-table-cell text-right">
                      <button onClick={() => handleDeleteCharity(c._id)} className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scores Activity */}
        <div className="glass p-8 rounded-[2.5rem] border border-white/5 shadow-2xl h-[600px] flex flex-col">
          <h2 className="text-2xl font-black mb-8 text-white flex items-center gap-3">
            <Flag className="w-8 h-8 text-emerald-400" /> Score Logs
          </h2>
          <div className="flex-1 overflow-auto custom-scrollbar rounded-3xl pr-2">
            <table className="admin-table">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] text-left">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {scores.map(s => (
                  <tr key={s._id} className="admin-table-row">
                    <td className="admin-table-cell">
                      <p className="font-black text-white">{s.user?.name || "Anonymous"}</p>
                      <p className="text-[10px] text-slate-500">{s.user?.email}</p>
                    </td>
                    <td className="admin-table-cell">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-black text-emerald-400">
                        {s.score}
                      </div>
                    </td>
                    <td className="admin-table-cell text-slate-400 text-xs font-bold">
                      {new Date(s.date).toLocaleDateString()}
                    </td>
                    <td className="admin-table-cell text-right">
                      <button onClick={() => handleDeleteScore(s._id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payouts Section */}
      <div className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl mb-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-white flex items-center gap-4">
            <Trophy className="w-10 h-10 text-amber-500" /> Winner Verification Pipeline
          </h2>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar pb-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5">
                <th className="px-6 py-6">Champion</th>
                <th className="px-6 py-6">Draw Ref</th>
                <th className="px-6 py-6">Reward</th>
                <th className="px-6 py-6 text-center">Verification</th>
                <th className="px-6 py-6 text-right">Governance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {winners.map(w => (
                <tr key={w._id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-6">
                    <p className="font-black text-white group-hover:text-amber-400 transition-colors">{w.user?.name}</p>
                    <p className="text-[10px] text-slate-500">{w.user?.email}</p>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-bold text-slate-400">{w.draw?.month}/{w.draw?.year}</span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-black text-amber-500">{w.prize}</p>
                    <p className="text-xs font-bold text-emerald-500">${w.prizeAmount?.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${w.verificationStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : w.verificationStatus === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                          {w.verificationStatus}
                        </span>
                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${w.payoutStatus === 'Paid' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                          {w.payoutStatus}
                        </span>
                      </div>
                      {w.verificationProof && (
                        <a href={w.verificationProof} target="_blank" rel="noreferrer" className="text-[10px] font-black text-blue-400 hover:underline flex items-center gap-1 uppercase tracking-widest">
                          <FileText className="w-3 h-3" /> Proof Attached
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {w.verificationStatus !== 'Verified' && (
                        <button onClick={() => handleVerify(w._id, 'Verified', w.payoutStatus)} className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-110">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {w.verificationStatus !== 'Rejected' && (
                        <button onClick={() => handleVerify(w._id, 'Rejected', w.payoutStatus)} className="p-3 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all">
                          <X className="w-5 h-5" />
                        </button>
                      )}
                      {w.verificationStatus === 'Verified' && w.payoutStatus === 'Pending' && (
                        <button onClick={() => handleVerify(w._id, 'Verified', 'Paid')} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105">
                          Release
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* History Log */}
      <div className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
          <History className="w-10 h-10 text-emerald-400" /> Historic Draw Registry
        </h2>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5">
                <th className="px-6 py-6">Period</th>
                <th className="px-6 py-6">Sequence</th>
                <th className="px-6 py-6">Capital Pool</th>
                <th className="px-6 py-6">Strategy</th>
                <th className="px-6 py-6 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {draws.map(d => (
                <tr key={d._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg font-black text-white">
                      {d.month}/{d.year}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex gap-1.5">
                      {d.winningNumbers?.map((num, i) => (
                        <div key={i} className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-500 font-black text-xs">
                          {num}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-black text-emerald-400">${d.totalPool?.toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-slate-500">Rollover: ${d.jackpotRollover?.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-6 text-xs font-bold text-slate-400">
                    {d.drawType || 'Random'}
                  </td>
                  <td className="px-6 py-6 text-right text-slate-500 text-xs font-bold">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;