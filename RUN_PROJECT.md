# 🚀 How to Run the Campus Lost & Found Portal

## Quick Start (3 Steps)

### Step 1: Install Dependencies

Open PowerShell/CMD in the project folder and run:

```powershell
# Install server dependencies
cd server
npm install

# Install client dependencies  
cd ../client
npm install
```

### Step 2: Start MongoDB

**Option A - Local MongoDB:**
- Download and install MongoDB from: https://www.mongodb.com/try/download/community
- Start MongoDB service (it usually starts automatically)

**Option B - MongoDB Atlas (Cloud - Recommended for beginners):**
- Go to: https://www.mongodb.com/cloud/atlas/register
- Create free account and cluster
- Get connection string and update `server/.env` file

### Step 3: Run the Application

Open TWO terminal windows:

**Terminal 1 - Backend:**
```powershell
cd server
npm run dev
```

Wait for: `Connected to MongoDB` and `Server running on port 5000`

**Terminal 2 - Frontend:**
```powershell
cd client
npm run dev
```

Wait for: `Local: http://localhost:5173/`

### Step 4: Open Browser

Go to: **http://localhost:5173**

## ✨ AI Features Included

The Gemini API is now integrated with these features:

1. **AI Image Analysis** - Upload an image when posting an item, and AI will:
   - Suggest a title
   - Detect the category
   - Generate a detailed description
   - Extract visible text (brands, labels)

2. **Smart Matching** - AI automatically finds similar items:
   - Matches lost items with found items
   - Shows similarity percentage
   - Explains why items might match

3. **How to Use AI:**
   - When posting an item, click "Show AI Helper"
   - Upload an image
   - AI will auto-fill the form
   - View AI-suggested matches on item detail pages

## 📧 Email Setup (Optional)

For email notifications, edit `server/.env`:

```
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
```

**Get Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Create App Password
4. Use that password in .env

## 🎓 Campus Email Domain

Change in `server/.env`:
```
CAMPUS_EMAIL_DOMAIN=your-university.edu
```

For testing, you can use any domain like `gmail.com`

## 🔧 Troubleshooting

**Port 5000 already in use?**
- Change PORT in `server/.env` to 5001
- Update `client/.env` to match

**MongoDB connection failed?**
- Make sure MongoDB is running
- Check MONGODB_URI in `server/.env`

**AI features not working?**
- Gemini API key is already configured
- Make sure you have internet connection
- Check server console for errors

## 📱 First Time Setup

1. Register with any email (e.g., `student@university.edu`)
2. Create password (min 8 characters)
3. Try posting a lost or found item
4. Test the AI image analyzer
5. View AI-suggested matches

## 🎯 Key Features to Test

- ✅ Register/Login with campus email
- ✅ Post lost items with security questions
- ✅ Post found items
- ✅ AI image analysis (click "Show AI Helper")
- ✅ Search and filter items
- ✅ Claim items with verification
- ✅ View AI-powered similar items
- ✅ Dashboard to manage your items

## Need Help?

Check SETUP_GUIDE.md for detailed instructions.
