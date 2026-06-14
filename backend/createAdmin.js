const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model(
  'User',
  userSchema
);

const createAdmin = async () => {
  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    const existingAdmin =
      await User.findOne({
        email:
          'admin@nayepankh.org'
      });

    if (existingAdmin) {
      console.log(
        'Admin already exists'
      );

      process.exit(0);
    }

    const hashed =
      await bcrypt.hash(
        'admin123',
        10
      );

    await User.create({
      email:
        'admin@nayepankh.org',

      password:
        hashed,

      role:
        'admin'
    });

    console.log(
      'Admin created'
    );

    process.exit(0);

  } catch (error) {

    console.error(
      error.message
    );

    process.exit(1);

  }
};

createAdmin();