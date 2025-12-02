# Quick Start Guide

## Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Choose one option:
   - Install locally: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
   - Use MongoDB Atlas (free cloud): [Sign up here](https://www.mongodb.com/cloud/atlas/register)

## Step-by-Step Setup

### 1. Install Dependencies

Open two terminals in the project root directory.

**Terminal 1 - Install Server Dependencies:**
```bash
cd server
npm install
```

**Terminal 2 - Install Client Dependencies:**
```bash
cd client
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB and start the service
- Default connection: `mongodb://localhost:27017/campus-lost-found`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at mongodb.com/cloud/atlas
- Create a cluster
- Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/campus-lost-found`)

### 3. Configure Environment Variables

**Server Configuration:**

Create `server/.env` file:
```bash
cd server
copy .env.example .env
```

Edit `server/.env` with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus-lost-found
JWT_SECRET=your-super-secret-key-change-this-in-production
CAMPUS_EMAIL_DOMAIN=university.edu
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CLIENT_URL=http://localhost:5173
```

**Client Configuration:**

Create `client/.env` file:
```bash
cd client
copy .env.example .env
```

The default settings should work:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Application

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```

You should see:
```
Connected to MongoDB
Server running on port 5000
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 5. Access the Application

Open your browser and go to: **http://localhost:5173**

### 6. Create Your First Account

1. Click "Register"
2. Use an email with your campus domain (e.g., `student@university.edu`)
3. Create a password (min 8 characters)
4. Start posting lost/found items!

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `server/.env`
- For Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change `PORT` in `server/.env` to another port (e.g., 5001)
- Change `VITE_API_URL` in `client/.env` accordingly

### Email Notifications Not Working
- For Gmail, you need an "App Password" (not your regular password)
- Go to Google Account → Security → 2-Step Verification → App Passwords
- Or skip email setup for testing (app will still work)

### Campus Email Domain
- Change `CAMPUS_EMAIL_DOMAIN` in `server/.env` to match your institution
- Or use any domain for testing (e.g., `gmail.com`)

## Default Test Account

You can create an admin account by manually updating the database or registering normally and changing the role to 'admin' in MongoDB.

## Need Help?

Check the main README.md for more detailed information.
