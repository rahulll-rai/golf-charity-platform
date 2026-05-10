import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Dices, Settings, FlaskConical, Rocket, Users, Handshake, Flag, Trophy, FileText, History, CheckCircle, Activity, DollarSign, List } from "lucide-react";

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
    try {
      await api.delete(`/admin/charities/${id}`);
      fetchCharities();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteScore = async (id) => {
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
      } else {
        alert("Simulation run successfully. Nothing saved.");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#022c22] min-h-screen text-slate-100 font-sans">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Admin <span className="text-emerald-400">Command Center</span></h1>
        <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-bold shadow-[0_0_15px_rgba(251,191,36,0.2)]">
          System Online
        </div>
      </div>

      {/* Analytics Reports */}
      {reports && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#011c16] p-6 rounded-2xl border border-emerald-500/20 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <p className="text-sm font-semibold text-emerald-200/60 uppercase tracking-widest">Active Users</p>
            </div>
            <p className="text-4xl font-black text-white">{reports.activeUsers}</p>
          </div>
          <div className="bg-[#011c16] p-6 rounded-2xl border border-emerald-500/20 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all" />
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <p className="text-sm font-semibold text-emerald-200/60 uppercase tracking-widest">Total Charity</p>
            </div>
            <p className="text-4xl font-black text-green-400">${reports.totalCharityContributions}</p>
          </div>
          <div className="bg-[#011c16] p-6 rounded-2xl border border-emerald-500/20 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <p className="text-sm font-semibold text-emerald-200/60 uppercase tracking-widest">Prizes Awarded</p>
            </div>
            <p className="text-4xl font-black text-amber-400">${reports.totalPrizePoolAwarded.toFixed(2)}</p>
          </div>
          <div className="bg-[#011c16] p-6 rounded-2xl border border-emerald-500/20 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <p className="text-sm font-semibold text-emerald-200/60 uppercase tracking-widest">Total Draws</p>
            </div>
            <p className="text-4xl font-black text-white">{reports.totalDraws}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Run Draw Section */}
        <div className="lg:col-span-5 bg-[#011c16]/80 p-8 rounded-3xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <h2 className="text-2xl font-black mb-8 text-white flex items-center gap-3">
            <Dices className="w-8 h-8 text-amber-400" /> Run Monthly Draw
          </h2>
          
          <form onSubmit={handleRunDraw} className="space-y-6 relative z-10">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-emerald-200/60 uppercase tracking-wider mb-2">Month (1-12)</label>
                <input 
                  type="number" min="1" max="12" required
                  value={month} onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-[#022c22] border border-emerald-500/30 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-200/60 uppercase tracking-wider mb-2">Year</label>
                <input 
                  type="number" required
                  value={year} onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-[#022c22] border border-emerald-500/30 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 items-end">
              <div>
                <label className="block text-xs font-bold text-emerald-200/60 uppercase tracking-wider mb-2">Draw Type</label>
                <select 
                  value={drawType} onChange={(e) => setDrawType(e.target.value)}
                  className="w-full bg-[#022c22] border border-emerald-500/30 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                >
                  <option value="Random">Random</option>
                  <option value="Algorithmic">Algorithmic</option>
                </select>
              </div>
              <div className="flex items-center gap-3 bg-[#022c22] border border-emerald-500/30 rounded-xl px-4 py-3">
                <input 
                  type="checkbox" id="sim"
                  checked={isSimulation} onChange={(e) => setIsSimulation(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 cursor-pointer"
                />
                <label htmlFor="sim" className="text-sm font-semibold text-emerald-100 cursor-pointer">Simulation Mode</label>
              </div>
            </div>

            <button type="submit" className={`w-full py-4 rounded-xl font-black text-xl transition-all transform hover:-translate-y-1 shadow-lg mt-4 flex items-center justify-center gap-3 ${isSimulation ? 'bg-amber-500 hover:bg-amber-400 text-emerald-950 shadow-[0_0_20px_rgba(251,191,36,0.4)]' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'}`}>
              {isSimulation ? <><FlaskConical className="w-6 h-6" /> Run Simulation</> : <><Rocket className="w-6 h-6" /> Publish Official Draw</>}
            </button>
          </form>

          {drawResult && (
            <div className="mt-8 p-6 bg-[#022c22] rounded-2xl border border-emerald-500/30 shadow-inner">
              <h3 className="font-bold mb-4 text-emerald-400 text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Draw Executed
              </h3>
              <p className="text-sm mb-6 text-emerald-100/70">Winning Numbers: <span className="font-mono bg-emerald-900/50 text-amber-400 font-bold px-3 py-1.5 rounded-lg border border-emerald-500/20 ml-2 tracking-widest">{drawResult.draw.winningNumbers.join(' - ')}</span></p>
              
              <h4 className="font-bold text-xs text-emerald-200/60 uppercase tracking-widest mb-3">Winners Detected ({drawResult.winners.length})</h4>
              <ul className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {drawResult.winners.map((w, i) => (
                  <li key={i} className="flex justify-between items-center bg-[#011c16] border border-white/5 p-3 rounded-lg">
                    <span className="text-sm font-medium text-emerald-100/90">{w.user}</span>
                    <span className="text-amber-400 font-black text-sm bg-amber-500/10 px-2 py-1 rounded">{w.prize}</span>
                  </li>
                ))}
                {drawResult.winners.length === 0 && <li className="text-emerald-500/50 italic text-sm py-2">No winners matched the criteria.</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Users Section */}
        <div className="lg:col-span-7 bg-[#011c16]/80 p-8 rounded-3xl border border-emerald-500/20 shadow-2xl flex flex-col">
          <h2 className="text-2xl font-black mb-6 text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-500" /> Manage Users
          </h2>
          <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-[#022c22]">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-[#011c16] sticky top-0 z-10">
                <tr className="text-emerald-200/60 text-xs uppercase tracking-widest">
                  <th className="py-4 px-6 font-semibold">User</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map(u => (
                  <tr key={u._id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-6">
                      <p className="font-bold text-white mb-0.5 group-hover:text-amber-400 transition-colors">{u.name}</p>
                      <p className="text-xs text-emerald-100/50">{u.email}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${u.subscriptionStatus === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                        {u.subscriptionStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs font-medium text-emerald-100/70">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Charities Section */}
        <div className="bg-[#011c16]/80 p-8 rounded-3xl border border-emerald-500/20 shadow-2xl flex flex-col h-[500px]">
          <h2 className="text-2xl font-black mb-6 text-white flex items-center gap-3">
            <Handshake className="w-8 h-8 text-amber-400" /> Manage Charities
          </h2>
          <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-[#022c22] custom-scrollbar">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-[#011c16] sticky top-0 z-10">
                <tr className="text-emerald-200/60 text-xs uppercase tracking-widest">
                  <th className="py-4 px-6 font-semibold">Organization</th>
                  <th className="py-4 px-6 font-semibold">Raised</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {charities.map(c => (
                  <tr key={c._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-bold text-emerald-100/90">{c.name}</td>
                    <td className="py-4 px-6 text-amber-400 font-black tracking-wide">\${c.totalDonations.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => handleDeleteCharity(c._id)} className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg transition-colors font-semibold">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scores Section */}
        <div className="bg-[#011c16]/80 p-8 rounded-3xl border border-emerald-500/20 shadow-2xl flex flex-col h-[500px]">
          <h2 className="text-2xl font-black mb-6 text-white flex items-center gap-3">
            <Flag className="w-8 h-8 text-emerald-400" /> Score Activity
          </h2>
          <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-[#022c22] custom-scrollbar">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-[#011c16] sticky top-0 z-10">
                <tr className="text-emerald-200/60 text-xs uppercase tracking-widest">
                  <th className="py-4 px-6 font-semibold">Golfer</th>
                  <th className="py-4 px-6 font-semibold">Score</th>
                  <th className="py-4 px-6 font-semibold">Date</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {scores.map(s => (
                  <tr key={s._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-medium text-emerald-100/90">{s.user?.name || "Unknown"}</td>
                    <td className="py-4 px-6"><span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-black px-2 py-1 rounded-md">{s.score}</span></td>
                    <td className="py-4 px-6 text-emerald-100/50 text-xs font-medium">{new Date(s.date).toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => handleDeleteScore(s._id)} className="text-red-400 hover:text-red-300 font-medium text-xs px-2 py-1">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Verification Section */}
      <div className="bg-[#011c16]/80 p-8 rounded-3xl border border-emerald-500/30 shadow-2xl mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[800px] h-full bg-emerald-900/5 rounded-full blur-[100px] pointer-events-none" />
        
        <h2 className="text-2xl font-black mb-8 text-white flex items-center gap-3 relative z-10">
          <Trophy className="w-8 h-8 text-amber-400" /> Verify Winners & Payouts
        </h2>
        
        <div className="overflow-x-auto rounded-xl border border-emerald-500/20 bg-[#022c22] relative z-10">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-[#011c16] border-b border-emerald-500/20">
              <tr className="text-emerald-200/60 text-xs uppercase tracking-widest">
                <th className="py-5 px-6 font-semibold">Champion</th>
                <th className="py-5 px-6 font-semibold">Draw</th>
                <th className="py-5 px-6 font-semibold">Prize Status</th>
                <th className="py-5 px-6 font-semibold">Verification</th>
                <th className="py-5 px-6 font-semibold">Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {winners.map(w => (
                <tr key={w._id} className="hover:bg-emerald-900/20 transition-colors">
                  <td className="py-5 px-6 font-bold text-white">{w.user?.name}</td>
                  <td className="py-5 px-6 font-medium text-emerald-100/60">{w.draw?.month}/{w.draw?.year}</td>
                  <td className="py-5 px-6">
                    <p className="font-black text-amber-400 mb-1 tracking-wide">{w.prize}</p>
                    <p className="text-xs font-bold text-emerald-400">\${w.prizeAmount?.toFixed(2)}</p>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col gap-2 items-start">
                      {w.verificationProof ? (
                        <a href={w.verificationProof} target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300 hover:underline text-xs font-bold flex items-center gap-1">
                          <FileText className="w-3 h-3" /> View Proof
                        </a>
                      ) : (
                        <span className="text-xs font-medium text-emerald-100/30">No Proof Submitted</span>
                      )}
                      
                      <div className="flex gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${w.verificationStatus === 'Verified' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : w.verificationStatus === 'Rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                          {w.verificationStatus}
                        </span>
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${w.payoutStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                          Payout: {w.payoutStatus}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-wrap gap-2">
                      {w.verificationStatus !== 'Verified' && (
                        <button onClick={() => handleVerify(w._id, 'Verified', w.payoutStatus)} className="text-xs font-bold tracking-wide uppercase bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 px-3 py-2 rounded-lg transition-all transform hover:scale-105">Approve</button>
                      )}
                      {w.verificationStatus !== 'Rejected' && (
                        <button onClick={() => handleVerify(w._id, 'Rejected', w.payoutStatus)} className="text-xs font-bold tracking-wide uppercase bg-red-600/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 px-3 py-2 rounded-lg transition-all">Reject</button>
                      )}
                      {w.verificationStatus === 'Verified' && w.payoutStatus === 'Pending' && (
                        <button onClick={() => handleVerify(w._id, 'Verified', 'Paid')} className="text-xs font-bold tracking-wide uppercase bg-amber-500 hover:bg-amber-400 text-emerald-950 shadow-lg shadow-amber-500/20 px-3 py-2 rounded-lg transition-all transform hover:scale-105">Release Payout</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {winners.length === 0 && (
                <tr><td colSpan="5" className="py-12 text-center text-emerald-200/40 font-medium">No winners waiting for verification.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Draw History Section */}
      <div className="bg-[#011c16]/80 p-8 rounded-3xl border border-emerald-500/30 shadow-2xl mt-8 relative overflow-hidden">
        <h2 className="text-2xl font-black mb-8 text-white flex items-center gap-3 relative z-10">
          <History className="w-8 h-8 text-emerald-400" /> Draw History
        </h2>
        
        <div className="overflow-x-auto rounded-xl border border-emerald-500/20 bg-[#022c22] relative z-10 max-h-[400px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-[#011c16] border-b border-emerald-500/20 sticky top-0">
              <tr className="text-emerald-200/60 text-xs uppercase tracking-widest">
                <th className="py-5 px-6 font-semibold">Month/Year</th>
                <th className="py-5 px-6 font-semibold">Winning Numbers</th>
                <th className="py-5 px-6 font-semibold">Total Pool</th>
                <th className="py-5 px-6 font-semibold">Rollover</th>
                <th className="py-5 px-6 font-semibold">Type</th>
                <th className="py-5 px-6 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {draws.map(d => (
                <tr key={d._id} className="hover:bg-emerald-900/20 transition-colors">
                  <td className="py-5 px-6 font-bold text-white">{d.month}/{d.year}</td>
                  <td className="py-5 px-6 font-mono text-amber-400 font-bold tracking-widest">{d.winningNumbers?.join(' - ')}</td>
                  <td className="py-5 px-6 text-emerald-400 font-bold">\${d.totalPool?.toFixed(2)}</td>
                  <td className="py-5 px-6 text-emerald-400 font-bold">\${d.jackpotRollover?.toFixed(2)}</td>
                  <td className="py-5 px-6"><span className="bg-emerald-500/10 text-emerald-300 px-2 py-1 rounded text-xs">{d.drawType || 'Random'}</span></td>
                  <td className="py-5 px-6 text-emerald-100/50 text-xs">{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {draws.length === 0 && (
                <tr><td colSpan="6" className="py-12 text-center text-emerald-200/40 font-medium">No previous draws found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;