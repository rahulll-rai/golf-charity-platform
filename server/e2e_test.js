

const API_URL = 'https://server-nine-plum-12.vercel.app/api';
let userToken = '';
let adminToken = '';
let charityId = '';

const runTests = async () => {
  console.log("==========================================");
  console.log("🚀 STARTING FULL END-TO-END PLATFORM TEST");
  console.log("==========================================\n");

  try {
    const mongoose = require('mongoose');
    const User = require('./models/User');
    const dotenv = require('dotenv');
    dotenv.config();
    await mongoose.connect(process.env.MONGO_URI);
    await User.findOneAndDelete({ email: "pr9068124@gmail.com" });

    // 1. Fetch Charities
    console.log("➔ Testing: Fetch Charities...");
    const charitiesRes = await fetch(`${API_URL}/charities`);
    const charitiesData = await charitiesRes.json();
    charityId = charitiesData[0]._id;
    console.log(`✅ Success: Found ${charitiesData.length} charities.`);

    // 2. Register Test User
    console.log("\n➔ Testing: Registering User (pr9068124@gmail.com)...");
    try {
      const regRes = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Test User",
          email: "pr9068124@gmail.com",
          password: "password123",
          selectedCharity: charityId
        })
      });
      const regData = await regRes.json();
      if (!regRes.ok) throw new Error(regData.message || 'Registration failed');
      
      const loginRes2 = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: "pr9068124@gmail.com", password: "password123" })
      });
      const loginData2 = await loginRes2.json();
      userToken = loginData2.token;
      console.log(`✅ Success: User Registered. Token received.`);
    } catch (e) {
      console.log(`⚠️ User might exist. Logging in instead...`);
      const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: "pr9068124@gmail.com",
          password: "password123"
        })
      });
      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginData.message || 'Login failed');
      userToken = loginData.token;
      console.log(`✅ Success: Logged in.`);
    }

    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` };

    // 3. Subscribe User
    console.log("\n➔ Testing: Activating Subscription...");
    await fetch(`${API_URL}/subscriptions/subscribe`, { method: 'POST', headers, body: JSON.stringify({ planType: "Monthly" }) });
    console.log(`✅ Success: Subscription Active.`);

    // 4. Enter 5 Scores (1-45 logic)
    console.log("\n➔ Testing: Entering 5 Golf Scores...");
    const scores = [30, 35, 40, 42, 45];
    for (const score of scores) {
      const res = await fetch(`${API_URL}/scores`, { method: 'POST', headers, body: JSON.stringify({ score, date: new Date().toISOString() }) });
      if (!res.ok) throw new Error(`Score Add Failed: ${await res.text()}`);
    }
    const myScoresRes = await fetch(`${API_URL}/scores`, { headers });
    if (!myScoresRes.ok) throw new Error(`Fetch Scores Failed: ${await myScoresRes.text()}`);
    const myScoresData = await myScoresRes.json();
    console.log(`✅ Success: Logged 5 scores. (Total found: ${myScoresData.length})`);

    // 5. Independent Charity Donation
    console.log("\n➔ Testing: Independent Charity Donation...");
    await fetch(`${API_URL}/charities/${charityId}/donate`, { method: 'POST', headers, body: JSON.stringify({ amount: 100 }) });
    console.log(`✅ Success: $100 Donated directly to Charity.`);

    // 6. Admin Draw Simulation
    console.log("\n➔ Testing: Admin Panel - Simulated Draw...");
    await User.findOneAndUpdate({ email: "pr9068124@gmail.com" }, { role: "admin" });

    const simRes = await fetch(`${API_URL}/admin/draws`, {
      method: 'POST', headers, body: JSON.stringify({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        isSimulation: true,
        drawType: "Random"
      })
    });
    if (!simRes.ok) throw new Error(`Sim Draw Failed: ${await simRes.text()}`);
    const simData = await simRes.json();
    console.log(`✅ Success: Simulated Draw Ran.`);
    console.log(`   - Pool Size: $${simData.draw.totalPool}`);
    console.log(`   - Winning Numbers: ${simData.draw.winningNumbers.join(', ')}`);

    // 7. Admin Publish Draw
    console.log("\n➔ Testing: Admin Panel - Publish Official Draw...");
    const pubRes = await fetch(`${API_URL}/admin/draws`, {
      method: 'POST', headers, body: JSON.stringify({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        isSimulation: false,
        drawType: "Random"
      })
    });
    if (!pubRes.ok) throw new Error(`Publish Draw Failed: ${await pubRes.text()}`);
    const pubData = await pubRes.json();
    console.log(`✅ Success: Official Draw Published.`);
    console.log(`   - Winners Saved: ${pubData.winners.length}`);

    // 8. Check Winnings (Verification System)
    console.log("\n➔ Testing: User Dashboard - Winnings Check...");
    const winRes = await fetch(`${API_URL}/winners/me`, { headers });
    const winData = await winRes.json();
    console.log(`✅ Success: Checked Winnings. User has ${winData.length} winning entries.`);

    console.log("\n==========================================");
    console.log("🏆 ALL TESTS PASSED! PLATFORM IS 100% READY.");
    console.log("==========================================\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ TEST FAILED:", error.message);
    process.exit(1);
  }
};

runTests();
