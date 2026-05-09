const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB, dropping index...");
    try {
        await mongoose.connection.collection('users').dropIndex('phone_1');
        console.log("Successfully dropped phone_1 index.");
    } catch (err) {
        console.log("Index not found or could not be dropped:", err.message);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
