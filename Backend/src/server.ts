import dotenv from 'dotenv';
// Load environment variables before anything else
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = parseInt(process.env.PORT || '5000', 10);

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Portfolio Backend running on http://localhost:${PORT}`);
    console.log(`📡 Healthcheck available at: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Admin Key enabled: ${process.env.ADMIN_SECRET_KEY ? 'Yes' : 'No'}`);
  });
};

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
