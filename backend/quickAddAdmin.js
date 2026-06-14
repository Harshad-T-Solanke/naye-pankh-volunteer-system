const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function addAdmin() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/nayepankh');
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const result = await mongoose.connection.db.collection('users').insertOne({
      email: 'admin@nayepankh.org',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date()
    });
    
    console.log('Admin added with ID:', result.insertedId);
    console.log('Email: admin@nayepankh.org');
    console.log('Password: admin123');
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addAdmin();