# 🎓 Campus Lost & Found Portal

A modern, AI-powered web application for managing lost and found items on campus with beautiful UI and smart features.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Gunisetty-VenkataGnaneswar/lost-found)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## ✨ Features

### 🔐 **Authentication & Security**
- KLU campus email authentication (@klu.ac.in)
- JWT-based secure sessions
- Role-based access control (User/Admin)
- Password encryption with bcrypt

### 📱 **Core Features**
- Post lost/found items with up to 5 images
- Advanced search and filtering
- Security questions for claim verification
- Real-time notifications
- Mobile-responsive design
- Beautiful animations and transitions

### 🤖 **AI-Powered Features**
- Google Gemini AI integration
- Automatic image analysis
- Smart item matching
- Auto-fill item details from images

### 👨‍💼 **Admin Panel**
- User management (suspend/activate/delete)
- Item moderation
- System statistics and analytics
- View all contact information

### 🎨 **Modern UI/UX**
- Gradient designs
- Glass morphism effects
- Smooth animations
- Custom scrollbar
- Responsive layout

## 🚀 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for blazing fast builds
- Tailwind CSS for styling
- Zustand for state management
- React Router for navigation
- Axios for API calls

**Backend:**
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- Nodemailer for emails

**AI & Services:**
- Google Gemini AI
- MongoDB Atlas
- Gmail SMTP

## 📦 Quick Setup

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Configure environment variables:

**server/.env:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus-lost-found
JWT_SECRET=your-secret-key
CAMPUS_EMAIL_DOMAIN=university.edu
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

**client/.env:**
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the application:

```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

5. Access the application at `http://localhost:5173`

## 🔐 Default Admin Account

After deployment, create admin account:

```bash
cd server
npm run create-admin
```

**Credentials:**
- Email: `admin@klu.ac.in`
- Password: `Admin@123`

⚠️ **Change password after first login!**

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy Options:

**Option 1: Vercel + Render (Recommended)**
- Frontend: Deploy to Vercel
- Backend: Deploy to Render
- Database: MongoDB Atlas

**Option 2: Railway (All-in-One)**
- Deploy entire stack to Railway

**Option 3: Manual Deployment**
- Any VPS (DigitalOcean, AWS, etc.)

## 📊 Project Structure

```
campus-lost-found/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utilities
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & validation
│   │   └── utils/         # Utilities
│   └── package.json
└── README.md
```

## 🎯 Key Features Breakdown

### For Students/Faculty:
- ✅ Register with KLU email
- ✅ Post lost items with security questions
- ✅ Post found items with current location
- ✅ Upload up to 5 images per item
- ✅ Search and filter items
- ✅ Claim items with verification
- ✅ Manage personal dashboard
- ✅ Get email notifications

### For Admins:
- ✅ View all users and items
- ✅ Suspend/activate users
- ✅ Delete inappropriate content
- ✅ View contact information
- ✅ Monitor system statistics
- ✅ Access analytics dashboard

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation
- ✅ File upload restrictions
- ✅ Rate limiting ready
- ✅ Environment variables

## 📱 Mobile Responsive

Fully responsive design works on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktops

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Gunisetty Venkata Gnaneswar**
- GitHub: [@Gunisetty-VenkataGnaneswar](https://github.com/Gunisetty-VenkataGnaneswar)
- Repository: [lost-found](https://github.com/Gunisetty-VenkataGnaneswar/lost-found)

## 🙏 Acknowledgments

- KLU for the opportunity
- Google Gemini AI for smart features
- MongoDB Atlas for database hosting
- Vercel & Render for deployment

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Review [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

**Made with ❤️ for KLU Campus Community**
