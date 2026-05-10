import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

const Home = () => {
  const [featuredCharity, setFeaturedCharity] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/charities");
        if (res.data.length > 0) {
          // Sort by highest donations to make it "Featured"
          const sorted = res.data.sort((a, b) => b.totalDonations - a.totalDonations);
          setFeaturedCharity(sorted[0]);
        }
      } catch (error) {
        console.error("Failed to fetch featured charity:", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[#022c22] text-slate-100">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-[#022c22] to-[#022c22]" />
          {/* Decorative glowing orbs - Green & Gold */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-block"
          >
            <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-semibold tracking-wide uppercase">
              Play For A Purpose
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Master the Green. <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-amber-300">Empower the World.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl text-emerald-100/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            The premium subscription platform for golfers. Track your scores, enter exclusive monthly draws, and support your favorite charities.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <Link 
              to="/register" 
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] w-full sm:w-auto"
            >
              Start Your Journey
            </Link>
            <a 
              href="#how-to-play" 
              className="px-8 py-4 glass glass-hover text-white rounded-full font-bold text-xl transition-all w-full sm:w-auto flex justify-center items-center gap-2"
            >
              📖 How to Play
            </a>
            <Link 
              to="/charities" 
              className="px-8 py-4 border border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-100 rounded-full font-bold text-xl transition-all w-full sm:w-auto"
            >
              Explore Charities
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How to Play Section */}
      <section id="how-to-play" className="py-24 relative z-10 bg-[#022c22]/80 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">How It Works</h2>
            <p className="text-xl text-emerald-200/60 max-w-2xl mx-auto">Three simple steps to transform your golf game into a charitable engine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 -z-10" />

            {[
              { step: "1", title: "Play & Track", desc: "Play your regular rounds of golf. Log your scores (between 1-45) on our platform after each game.", icon: "🏌️‍♂️" },
              { step: "2", title: "Match & Win", desc: "Every month, an algorithm draws 5 numbers. Match 3, 4, or 5 of your recent scores to win premium prizes.", icon: "🎯" },
              { step: "3", title: "Give Back", desc: "A significant portion of your subscription fee is directly donated to the charity of your choice.", icon: "🤝" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="glass p-10 rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-emerald-900/50 rounded-full flex items-center justify-center text-4xl mb-6 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-amber-400 font-bold mb-2">Step {item.step}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-emerald-100/70 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithm Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-[3rem] p-8 md:p-16 border border-emerald-500/20 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <span className="text-amber-400 font-bold tracking-wider uppercase text-sm mb-4 block">Fairness Guaranteed</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">The Game Algorithm Explained</h2>
                <p className="text-emerald-100/80 text-xl mb-8 leading-relaxed">
                  We believe in total transparency. Our monthly draw algorithm is built on verifiable randomness to ensure every subscriber has a fair chance to win.
                </p>
                <ul className="space-y-6">
                  {[
                    "Takes your 5 most recent golf scores (1-45).",
                    "A secure random number generator selects 5 winning numbers monthly.",
                    "If you match 3 numbers, you win Tier 3 prizes.",
                    "Match 4 for Tier 2, and all 5 for the Grand Prize.",
                    "Fully automated, untamperable, and transparently verified."
                  ].map((point, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1">✓</div>
                      <span className="text-lg text-emerald-100/90">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-[#011c16] rounded-2xl p-6 font-mono text-sm md:text-base text-emerald-400 border border-emerald-500/30 shadow-inner overflow-x-auto">
                  <pre className="whitespace-pre-wrap">
{`function executeMonthlyDraw(users) {
  // Generate 5 unique random winning numbers between 1-45
  const winningNumbers = generateRandomDraw(5, 1, 45);
  
  users.forEach(user => {
    const userScores = user.latestFiveScores;
    let matchCount = 0;
    
    userScores.forEach(score => {
      if(winningNumbers.includes(score)) {
        matchCount++;
      }
    });

    if(matchCount >= 3) {
      awardPrize(user, matchCount);
    }
  });
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Charity Section */}
      {featuredCharity && (
        <section className="py-24 relative z-10 bg-emerald-950/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#022c22]"
                >
                  <img src={featuredCharity.image} alt="Featured Charity" className="w-full h-[500px] object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-sm mb-6">
                  🌟 Featured Charity of the Month
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">{featuredCharity.name}</h2>
                <p className="text-emerald-100/70 text-xl mb-10 leading-relaxed">{featuredCharity.description}</p>
                
                <div className="flex flex-wrap gap-6 mb-10">
                  <div className="glass p-6 rounded-2xl border border-emerald-500/20 flex-1 min-w-[200px]">
                    <p className="text-sm text-emerald-200/60 mb-2 font-medium uppercase tracking-wider">Total Community Impact</p>
                    <p className="text-4xl font-black text-amber-400">\${featuredCharity.totalDonations.toLocaleString()}</p>
                  </div>
                  <div className="glass p-6 rounded-2xl border border-emerald-500/20 flex-1 min-w-[200px]">
                    <p className="text-sm text-emerald-200/60 mb-2 font-medium uppercase tracking-wider">Active Supporters</p>
                    <p className="text-4xl font-black text-white">{(featuredCharity.totalDonations / 10).toFixed(0)}+</p>
                  </div>
                </div>

                <Link to="/charities" className="inline-flex items-center gap-3 text-white bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-emerald-500/25">
                  Support {featuredCharity.name} <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Live Impact Stats (The "More Stuff" user requested) */}
      <section className="py-20 relative z-10 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            {[
              { label: "Global Subscribers", value: "5,402" },
              { label: "Scores Logged", value: "142k+" },
              { label: "Total Donations", value: "$89,200" },
              { label: "Prizes Awarded", value: "342" }
            ].map((stat, idx) => (
              <div key={idx} className="px-4">
                <div className="text-3xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-emerald-200/60 text-sm md:text-base font-medium uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#022c22] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Elevate Your Game</h2>
            <p className="text-xl text-emerald-200/60 max-w-2xl mx-auto">Everything you need to make your golf rounds more meaningful and rewarding.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Track Scores", desc: "Log your 1-45 scores. We keep your latest 5 rounds to determine your draw entries.", icon: "⛳" },
              { title: "Monthly Draws", desc: "Win premium prizes. Match 3, 4, or 5 of your recent scores with our monthly draw.", icon: "🏆" },
              { title: "Support Charities", desc: "A portion of your subscription goes directly to the charity of your choice.", icon: "❤️" }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass p-10 rounded-3xl border border-white/5 hover:border-amber-500/40 transition-colors"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-emerald-100/70 text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/60 to-[#022c22] z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white">Ready to make every swing count?</h2>
          <p className="text-2xl text-emerald-100/80 mb-12 max-w-3xl mx-auto">Join thousands of golfers who are winning prizes and supporting great causes globally.</p>
          <Link 
            to="/register" 
            className="px-12 py-5 bg-amber-500 hover:bg-amber-400 text-emerald-950 rounded-full font-black text-2xl transition-all shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:shadow-[0_0_60px_rgba(251,191,36,0.5)] inline-block transform hover:-translate-y-1"
          >
            Become a Member Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;