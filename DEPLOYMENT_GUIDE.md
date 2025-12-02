# 🚀 Deployment Guide - Campus Lost & Found Portal

This guide covers deploying your application to production.

---

## 📋 **Table of Contents**

1. [Quick Deploy Options](#quick-deploy-options)
2. [Deploy to Vercel + MongoDB Atlas](#deploy-to-vercel--mongodb-atlas)
3. [Deploy to Render](#deploy-to-render)
4. [Deploy to Railway](#deploy-to-railway)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment Steps](#post-deployment-steps)

---

## 🎯 **Quick Deploy Options**

### **Recommended Stack:**
- **Frontend:** Vercel (Free)
- **Backend:** Render (Free)
- **Database:** MongoDB Atlas (Free)

### **Alternative Options:**
- Railway (All-in-one)
- Heroku
- DigitalOcean
- AWS

---

## 🌐 **Option 1: Deploy to Vercel + MongoDB Atlas + Render**

### **Step 1: Setup MongoDB Atlas (Database)**

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Create free account**
3. **Create a cluster:**
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

4. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Generate secure password
   - Save credentials!

5. **Whitelist IP:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

6. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/campus-lost-found`

---

### **Step 2: Deploy Backend to Render**

1. **Go to:** https://render.com
2. **Sign up** with GitHub
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure:**
   - **Name:** `campus-lost-found-api`
   - **Environment:** `Node`
   - **Build Command:** `cd server && npm install && npm run build`
   - **Start Command:** `cd server && npm start`
   - **Instance Type:** Free

6. **Add Environment Variables:**
   ```
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key-change-this
   CAMPUS_EMAIL_DOMAIN=klu.ac.in
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   CLIENT_URL=https://your-frontend-url.vercel.app
   GEMINI_API_KEY=AIzaSyBjOOsRc_HjDlPLAYGDl2vYK5E2lE0VD7M
   ```

7. **Click "Create Web Service"**
8. **Wait for deployment** (5-10 minutes)
9. **Copy your backend URL:** `https://campus-lost-found-api.onrender.com`

---

### **Step 3: Deploy Frontend to Vercel**

1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Click "Add New" → "Project"**
4. **Import your repository**
5. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

6. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

7. **Click "Deploy"**
8. **Wait for deployment** (2-3 minutes)
9. **Your app is live!** 🎉

---

## 🚂 **Option 2: Deploy to Railway (All-in-One)**

### **Step 1: Setup MongoDB Atlas**
(Same as Option 1, Step 1)

### **Step 2: Deploy to Railway**

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**

6. **Add Backend Service:**
   - Click "Add Service" → "GitHub Repo"
   - Root Directory: `server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

7. **Add Environment Variables:**
   (Same as Render variables above)

8. **Add Frontend Service:**
   - Click "Add Service" → "GitHub Repo"
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview`

9. **Generate Domains:**
   - Click on each service
   - Go to "Settings" → "Generate Domain"

10. **Update Environment Variables:**
    - Update `CLIENT_URL` in backend
    - Update `VITE_API_URL` in frontend

---

## 🔧 **Environment Variables Reference**

### **Backend (.env)**
```env
# Server
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campus-lost-found

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Email Domain
CAMPUS_EMAIL_DOMAIN=klu.ac.in

# Email Service (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Frontend URL
CLIENT_URL=https://your-frontend-domain.vercel.app

# AI Service
GEMINI_API_KEY=AIzaSyBjOOsRc_HjDlPLAYGDl2vYK5E2lE0VD7M
```

### **Frontend (.env)**
```env
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

---

## 📧 **Gmail App Password Setup**

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Select **Mail** and **Other (Custom name)**
5. Name it: "Campus Lost Found"
6. Click **Generate**
7. Copy the 16-character password
8. Use this in `SMTP_PASS` environment variable

---

## ✅ **Post-Deployment Steps**

### **1. Create Admin Account**

SSH into your backend server or use Railway/Render console:

```bash
cd server
npm run create-admin
```

Or manually in MongoDB:
```javascript
db.users.insertOne({
  email: "admin@klu.ac.in",
  password: "$2a$10$hashed_password", // Use bcrypt to hash
  displayName: "Admin",
  phoneNumber: "9876543210",
  role: "admin",
  isActive: true,
  createdAt: new Date()
})
```

### **2. Test Your Deployment**

1. ✅ Visit your frontend URL
2. ✅ Register a new account
3. ✅ Login successfully
4. ✅ Post an item with image
5. ✅ Test search and filters
6. ✅ Login as admin
7. ✅ Access admin panel

### **3. Update GitHub Repository**

```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### **4. Setup Custom Domain (Optional)**

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records

**Render:**
1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## 🔒 **Security Checklist**

- ✅ Change default admin password
- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ Enable HTTPS (automatic on Vercel/Render)
- ✅ Whitelist only necessary IPs in MongoDB
- ✅ Use environment variables (never commit .env)
- ✅ Enable CORS only for your frontend domain
- ✅ Use Gmail App Password (not regular password)
- ✅ Regular backups of MongoDB

---

## 📊 **Monitoring**

### **Render Dashboard:**
- View logs
- Monitor CPU/Memory
- Check deployment status

### **Vercel Dashboard:**
- View analytics
- Monitor performance
- Check build logs

### **MongoDB Atlas:**
- Monitor database usage
- View connection metrics
- Setup alerts

---

## 🐛 **Troubleshooting**

### **Backend not connecting to MongoDB:**
- Check connection string format
- Verify IP whitelist (0.0.0.0/0)
- Check username/password

### **Frontend can't reach backend:**
- Verify VITE_API_URL is correct
- Check CORS settings
- Ensure backend is running

### **Images not loading:**
- Check uploads directory exists
- Verify file permissions
- Check image URLs in database

### **Email not sending:**
- Verify Gmail App Password
- Check SMTP settings
- Enable "Less secure app access" if needed

---

## 💰 **Cost Breakdown**

### **Free Tier:**
- MongoDB Atlas: 512MB storage (Free forever)
- Vercel: Unlimited deployments (Free)
- Render: 750 hours/month (Free)
- **Total: $0/month** ✅

### **Paid Options (Optional):**
- MongoDB Atlas Pro: $9/month
- Vercel Pro: $20/month
- Render Standard: $7/month

---

## 🔄 **Continuous Deployment**

Both Vercel and Render support automatic deployments:

1. **Push to GitHub**
2. **Automatic build triggered**
3. **Automatic deployment**
4. **Live in minutes!**

---

## 📞 **Support**

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check service status pages

---

## 🎉 **You're Done!**

Your Campus Lost & Found Portal is now live and accessible worldwide!

**Share your deployment URL with your campus community!** 🚀
