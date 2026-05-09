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
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-slate-900 to-slate-900" />
          {/* Decorative glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Play Golf. <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Make an Impact.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            The premium subscription platform for golfers. Track your scores, enter exclusive monthly draws, and support your favorite charities.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link 
              to="/register" 
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] w-full sm:w-auto"
            >
              Start Your Journey
            </Link>
            <Link 
              to="/charities" 
              className="px-8 py-4 glass glass-hover text-white rounded-full font-semibold text-lg transition-all w-full sm:w-auto"
            >
              Explore Charities
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Charity Section */}
      {featuredCharity && (
        <section className="py-20 relative z-10 border-y border-white/5 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.3)] border border-white/10"
                >
                  <img src={featuredCharity.image} alt="Featured Charity" className="w-full h-auto object-cover" />
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <span className="text-purple-400 font-bold tracking-wider uppercase text-sm mb-2 block">Featured Charity of the Month</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{featuredCharity.name}</h2>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">{featuredCharity.description}</p>
                <div className="bg-slate-900/80 p-6 rounded-xl border border-white/5 mb-8 inline-block">
                  <p className="text-sm text-slate-400 mb-1">Total Community Impact</p>
                  <p className="text-3xl font-extrabold text-green-400">${featuredCharity.totalDonations}</p>
                </div>
                <br/>
                <Link to="/charities" className="inline-flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-medium transition-all">
                  Support {featuredCharity.name} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 bg-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elevate Your Game</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to make your golf rounds more meaningful and rewarding.</p>
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
                className="glass p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 z-0" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to make every swing count?</h2>
          <p className="text-xl text-slate-300 mb-10">Join thousands of golfers who are winning prizes and supporting great causes.</p>
          <Link 
            to="/register" 
            className="px-10 py-4 bg-white text-purple-900 hover:bg-slate-100 rounded-full font-bold text-lg transition-all shadow-lg inline-block"
          >
            Become a Member Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;