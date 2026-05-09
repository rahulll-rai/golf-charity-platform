const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB, promoting all users to admin...");
    const result = await User.updateMany({}, { $set: { role: 'admin' } });
    console.log(`Successfully updated ${result.modifiedCount} users to Admin.`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
