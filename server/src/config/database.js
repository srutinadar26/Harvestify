const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if URI exists
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGODB_URI is not defined in .env file!');
      console.error('Please check your .env file location and content.');
      console.error('Expected path:', __dirname);
      process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB...');
    console.log('URI:', mongoURI); // Be careful with this in production

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('Please ensure MongoDB is running (mongod)');
    process.exit(1);
  }
};

module.exports = connectDB;