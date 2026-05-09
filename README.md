# Golf Charity Subscription Platform

A modern SaaS-style MERN stack application where golfers can subscribe, track their scores (1-45), participate in monthly prize draws, and support charities.

## Live Demo
- **Frontend**: [https://client-tawny-six-64.vercel.app](https://client-tawny-six-64.vercel.app)
- **Backend API**: `https://server-nine-plum-12.vercel.app/api`

## Features

- **Authentication**: JWT-based secure login and registration with bcrypt password hashing.
- **Subscriptions**: Failsafe Mock payment flow bypassing Stripe for seamless evaluator testing of the Subscription logic.
- **Score Tracking**: Track the latest 5 scores. Automatically removes the oldest when adding a 6th ("Rolling 5" algorithm).
- **Charity Support**: Browse and select charities to support with a portion of your subscription.
- **Admin Dashboard**: Manage users, view statistics, and run the monthly algorithmic draw.
- **Premium UI**: Modern dark theme, glassmorphism, and Framer Motion micro-animations.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router DOM, Axios, Framer Motion
- **Backend**: Node.js, Express, MongoDB Atlas, Mongoose, JWT
- **Hosting**: Vercel (Frontend & Serverless Backend)

---

## Testing as an Admin

A pre-configured admin account is available for evaluators to test the Admin Dashboard and Prize Draw Engine.

**Email:** `pr9068124@gmail.com`  
**Password:** `admin123`

1. Log in using the credentials above.
2. Navigate to the **Admin** tab in the navigation bar.
3. Review users or click **Run Monthly Draw** to test the algorithmic winner selection.

---

## Local Setup Instructions

If you wish to run the project locally rather than using the live Vercel links:

### 1. Clone & Install
```bash
git clone https://github.com/rahulll-rai/golf-charity-platform.git
cd golf-charity-platform
```

### 2. Backend Setup
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_mock123
STRIPE_WEBHOOK_SECRET=whsec_mock123
```
Start the backend:
```bash
node server.js
```

### 3. Frontend Setup
Open a new terminal, navigate to the `client` directory:
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the Vite development server:
```bash
npm run dev
```

---
*Developed for Internship Evaluation.*
