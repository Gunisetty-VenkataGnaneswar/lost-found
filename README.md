# Campus Lost & Found Portal

A web-based system for managing lost and found items on campus.

## Features

- User authentication with campus email
- Post lost/found items with images
- Advanced search and filtering
- Claim verification with security questions
- Admin moderation panel
- Email notifications
- Responsive design

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, Vite
**Backend:** Node.js, Express, TypeScript
**Database:** MongoDB with Mongoose
**Authentication:** JWT

## Setup

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

## Default Admin Account

Email: admin@university.edu
Password: Admin123!

## Project Structure

See individual README files in `client/` and `server/` directories for detailed documentation.
