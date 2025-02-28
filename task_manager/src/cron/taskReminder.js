const cron = require("node-cron");
const Task = require("../models/task.model");
const User = require("../models/auth.model");

// Schedule job to run every day at 12:48 PM
cron.schedule("06 13 * * *", async () => {
  console.log("⏰ Sending daily task reminders...");

  try {
    // Fetch all users
    const users = await User.find({}, "_id");

    if (!users.length) {
      console.log("⚠️ No users found!");
      return;
    }

    for (const user of users) {
      const pendingTasks = await Task.find({
        status: "pending",
        user: user._id, // Filter tasks by user ID
      });

      if (pendingTasks.length > 0) {
        console.log(
          `📌 User ${user._id} has ${pendingTasks.length} pending tasks!`
        );
        // Here you can send an email/SMS notification to the user
        // Example: sendEmailNotification(user.email, pendingTasks);
      }
    }
  } catch (error) {
    console.error("❌ Error fetching pending tasks:", error.message);
  }
});

module.exports = cron;
