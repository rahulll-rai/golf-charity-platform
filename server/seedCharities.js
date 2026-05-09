const mongoose = require('mongoose');
const Charity = require('./models/Charity');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB, seeding charities...");
    await Charity.deleteMany(); // clear existing
    await Charity.create([
      {
        name: "Golf Fore Africa",
        description: "Bringing clean water to children and families in Africa.",
        image: "https://picsum.photos/seed/africa/600/400",
        upcomingEvents: [
          { title: "Annual Clean Water Gala", date: "June 15, 2026", location: "New York, NY" },
          { title: "Sahara Charity Golf Tournament", date: "August 10, 2026", location: "Phoenix, AZ" }
        ]
      },
      {
        name: "First Tee",
        description: "Impacting the lives of young people by providing educational programs that build character.",
        image: "https://picsum.photos/seed/firsttee/600/400",
        upcomingEvents: [
          { title: "Youth Golf Clinic", date: "May 20, 2026", location: "Local Courses Nationwide" },
          { title: "First Tee National Championship", date: "July 5, 2026", location: "Augusta, GA" }
        ]
      },
      {
        name: "St. Jude Children's Research Hospital",
        description: "Finding cures. Saving children. Support pediatric cancer research.",
        image: "https://picsum.photos/seed/stjude/600/400",
        upcomingEvents: [
          { title: "Drive for a Cure Golf Day", date: "September 12, 2026", location: "Memphis, TN" }
        ]
      }
    ]);
    console.log("Successfully seeded charities.");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
