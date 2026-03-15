require('dotenv').config({ path: require('path').join(__dirname, '.env') });

console.log('=== ENVIRONMENT DEBUG ===');
console.log('__dirname:', __dirname);
console.log('Env path:', require('path').join(__dirname, '.env'));
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('========================');

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is undefined!');
  console.log('Checking if .env file exists...');
  
  const fs = require('fs');
  const envPath = require('path').join(__dirname, '.env');
  
  if (fs.existsSync(envPath)) {
    console.log('✅ .env file exists at:', envPath);
    console.log('File content:');
    console.log(fs.readFileSync(envPath, 'utf8'));
  } else {
    console.error('❌ .env file NOT found at:', envPath);
  }
}