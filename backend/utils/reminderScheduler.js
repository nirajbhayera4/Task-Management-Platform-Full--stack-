const cron = require('node-cron');
const pool = require('../config/db');
const sendReminderEmail = require('./mailer');

function startReminderScheduler() {
  cron.schedule('* * * * *', async () => {
    try {
      const result = await pool.query(
        `SELECT tasks.id, tasks.title, users.email
         FROM tasks
         JOIN users ON tasks.user_id = users.id
         WHERE tasks.reminder_time <= NOW()
           AND tasks.reminder_sent = FALSE`
      );

      for (const task of result.rows) {
        await sendReminderEmail(task.email, task.title);
        await pool.query('UPDATE tasks SET reminder_sent = TRUE WHERE id = $1', [task.id]);
        console.log(`Reminder sent for task ${task.id} to ${task.email}`);
      }
    } catch (err) {
      console.error('Reminder scheduler error:', err.message);
    }
  });
}

module.exports = startReminderScheduler;