const cron = require('node-cron');
const axios = require('axios');

// Schedule cron job to run every hour (at minute 0)
cron.schedule('0 * * * *', async () => {
  console.log('Running cache revalidation cron job...', new Date().toISOString());
  try {
    const response = await axios.get(
      `${process.env.APP_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`
    );
    console.log('Revalidation successful:', response.data);
  } catch (error) {
    console.error('Cron job error:', error.message);
  }
});

console.log('Cron job scheduled to run every hour.');