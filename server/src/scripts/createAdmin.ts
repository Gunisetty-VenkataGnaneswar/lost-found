import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@klu.ac.in' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@klu.ac.in');
      console.log('You can reset the password by deleting and running this script again.');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      email: 'admin@klu.ac.in',
      password: 'Admin@123',
      displayName: 'System Administrator',
      role: 'admin',
      isActive: true
    });

    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('=================================');
    console.log('📧 Email: admin@klu.ac.in');
    console.log('🔑 Password: Admin@123');
    console.log('=================================');
    console.log('');
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
