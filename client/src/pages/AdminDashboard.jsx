import React, { useState, useEffect } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [charities, setCharities] = useState([]);
  const [scores, setScores] = useState([]);
  const [winners, setWinners] = useState([]);
  const [reports, setReports] = useState(null);
  
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Analytics Reports */}
      {reports && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass p-4 rounded-xl border border-white/5">
            <p className="text-sm text-slate-400">Active Users</p>
            <p className="text-2xl font-bold text-white">{reports.activeUsers}</p>
          </div>
          <div className="glass p-4 rounded-xl border border-white/5">
            <p className="text-sm text-slate-400">Total Charity</p>
            <p className="text-2xl font-bold text-green-400">${reports.totalCharityContributions}</p>
          </div>
          <div className="glass p-4 rounded-xl border border-white/5">
            <p className="text-sm text-slate-400">Prize Pool Awarded</p>
            <p className="text-2xl font-bold text-purple-400">${reports.totalPrizePoolAwarded.toFixed(2)}</p>
          </div>
          <div className="glass p-4 rounded-xl border border-white/5">
            <p className="text-sm text-slate-400">Total Draws</p>
            <p className="text-2xl font-bold text-white">{reports.totalDraws}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Run Draw Section */}
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-6 text-purple-400">Run Monthly Draw</h2>
          <form onSubmit={handleRunDraw} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-slate-400 mb-1">Month (1-12)</label>
                <input 
                  type="number" min="1" max="12" required
                  value={month} onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-slate-400 mb-1">Year</label>
                <input 
                  type="number" required
                  value={year} onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <label className="block text-sm text-slate-400 mb-1">Draw Type</label>
                <select 
                  value={drawType} onChange={(e) => setDrawType(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white"
                >
                  <option value="Random">Random</option>
                  <option value="Algorithmic">Algorithmic (Frequent Scores)</option>
                </select>
              </div>
              <div className="flex-1 flex items-center gap-2 mt-6">
                <input 
                  type="checkbox" id="sim"
                  checked={isSimulation} onChange={(e) => setIsSimulation(e.target.checked)}
                  className="w-4 h-4 accent-purple-500"
                />
                <label htmlFor="sim" className="text-sm text-slate-300">Simulation Mode</label>
              </div>
            </div>

            <button type="submit" className={`w-full py-3 rounded-lg font-bold transition-colors ${isSimulation ? 'bg-orange-600 hover:bg-orange-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
              {isSimulation ? 'Run Simulation' : 'Publish Official Draw'}
            </button>
          </form>

          {drawResult && (
            <div className="mt-8 p-4 bg-slate-900/60 rounded-xl border border-white/10">
              <h3 className="font-bold mb-2 text-green-400">Draw Results!</h3>
              <p className="text-sm mb-4">Winning Numbers: <span className="font-mono bg-white/10 px-2 py-1 rounded">{drawResult.draw.winningNumbers.join(', ')}</span></p>
              
              <h4 className="font-semibold text-sm text-slate-400 mb-2">Winners ({drawResult.winners.length})</h4>
              <ul className="space-y-2 max-h-40 overflow-y-auto text-sm">
                {drawResult.winners.map((w, i) => (
                  <li key={i} className="flex justify-between bg-white/5 p-2 rounded">
                    <span>User ID: {w.user}</span>
                    <span className="text-pink-400 font-medium">{w.prize}</span>
                  </li>
                ))}
                {drawResult.winners.length === 0 && <li className="text-slate-500">No winners this month.</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Users Section */}
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-6 text-purple-400">Manage Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3">{u.name}</td>
                    <td className="py-3 text-slate-400">{u.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs ${u.subscriptionStatus === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300'}`}>
                        {u.subscriptionStatus}
                      </span>
                    </td>
                    <td className="py-3 text-xs">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Charities Section */}
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-6 text-purple-400">Manage Charities</h2>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Donations</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {charities.map(c => (
                  <tr key={c._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3">{c.name}</td>
                    <td className="py-3 text-green-400 font-bold">${c.totalDonations}</td>
                    <td className="py-3">
                      <button onClick={() => handleDeleteCharity(c._id)} className="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scores Section */}
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-6 text-purple-400">Manage Scores</h2>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scores.map(s => (
                  <tr key={s._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3">{s.user?.name || "Unknown"}</td>
                    <td className="py-3 font-bold text-purple-300">{s.score}</td>
                    <td className="py-3 text-slate-400">{new Date(s.date).toLocaleDateString()}</td>
                    <td className="py-3">
                      <button onClick={() => handleDeleteScore(s._id)} className="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-8 glass p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-6 text-purple-400">Verify Winners & Payouts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3">User</th>
                <th className="pb-3">Draw</th>
                <th className="pb-3">Prize</th>
                <th className="pb-3">Proof</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {winners.map(w => (
                <tr key={w._id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3">{w.user?.name}</td>
                  <td className="py-3 text-slate-400">{w.draw?.month}/{w.draw?.year}</td>
                  <td className="py-3">
                    <p className="font-bold text-pink-400">{w.prize}</p>
                    <p className="text-xs text-slate-400">${w.prizeAmount?.toFixed(2)}</p>
                  </td>
                  <td className="py-3">
                    {w.verificationProof ? (
                      <a href={w.verificationProof} target="_blank" rel="noreferrer" className="text-blue-400 underline text-xs">View Proof</a>
                    ) : (
                      <span className="text-xs text-slate-500">No Proof</span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] w-fit ${w.verificationStatus === 'Verified' ? 'bg-green-500/20 text-green-400' : w.verificationStatus === 'Rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {w.verificationStatus}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] w-fit ${w.payoutStatus === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300'}`}>
                        Payout: {w.payoutStatus}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      {w.verificationStatus !== 'Verified' && (
                        <button onClick={() => handleVerify(w._id, 'Verified', w.payoutStatus)} className="text-xs bg-green-600/30 text-green-300 px-2 py-1 rounded hover:bg-green-600/50">Approve</button>
                      )}
                      {w.verificationStatus !== 'Rejected' && (
                        <button onClick={() => handleVerify(w._id, 'Rejected', w.payoutStatus)} className="text-xs bg-red-600/30 text-red-300 px-2 py-1 rounded hover:bg-red-600/50">Reject</button>
                      )}
                      {w.verificationStatus === 'Verified' && w.payoutStatus === 'Pending' && (
                        <button onClick={() => handleVerify(w._id, 'Verified', 'Paid')} className="text-xs bg-purple-600/30 text-purple-300 px-2 py-1 rounded hover:bg-purple-600/50">Mark Paid</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {winners.length === 0 && (
                <tr><td colSpan="6" className="py-4 text-center text-slate-500">No winners to verify yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;