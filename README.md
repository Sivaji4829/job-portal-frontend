HireSync Enterprise CMS - Employer Job Portal

HireSync is a professional, high-density corporate recruitment management system. It allows employers to manage the full lifecycle of job vacancies through a secure, administrative interface built on the MERN stack with TypeScript.

🚀 Tech Stack

Frontend: Next.js 14 (App Router), React, Tailwind CSS v4, Framer Motion, Lucide Icons.

Backend: Node.js, Express.js, TypeScript.

Database: MongoDB Atlas (via Mongoose).

Communication: Axios for RESTful API synchronization.

🔐 Strict Authentication Rules

This system implements a strict administrative gateway. Access to the management cluster is restricted to a single master identity:

Corporate Email: admin@hiresync.com

Security Key: admin123

Any other credentials will be rejected by both the client-side gateway and the server-side Node partition.

🛠️ Setup Instructions

1. Prerequisite: MongoDB Atlas

Create a cluster on MongoDB Atlas.

In Network Access, add IP 0.0.0.0/0 (Allow access from anywhere) for development.

Create a database user and copy the Connection String.

2. Backend Configuration (Node.js/Express)

Navigate to the backend/ directory.

Install dependencies:

npm install


Create a .env file in the backend/ root:

PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development


Run the development server (auto-restarts on changes):

npm run dev


3. Frontend Configuration (Next.js)

Navigate to the frontend/ directory.

Install dependencies:

npm install


Create a .env.local file in the frontend/ root:

NEXT_PUBLIC_API_URL=http://localhost:5000/api


Run the development application:

npm run dev


Open http://localhost:3000 in your browser.

📂 Key Features

High-Density Dashboard: Optimized for scanning large volumes of recruitment data with real-time KPI tracking.

Full CRUD Engine: Standardized forms for defining (creating), optimizing (editing), and purging (deleting) job records.

Geography & Budget Consistency: Enforced dropdown selections for Location and Salary to ensure data integrity, with "Other..." support for custom entries.

Responsive CMS Shell: Professional sidebar layout with collapsible states for optimized screen real estate.

Indian Rupee Integration: System-wide support for ₹ (LPA) compensation bands.

🏗️ Project Architecture

├── backend/
│   ├── config/          # MongoDB connection logic
│   ├── controllers/     # Business logic for Auth and Jobs
│   ├── models/          # Mongoose Schemas (Job, User)
│   ├── routes/          # API Endpoint definitions
│   └── server.ts        # Express entry point
└── frontend/
    ├── app/             # Next.js App Router (Pages & Layout)
    ├── components/      # Reusable UI (Navbar, Card, Form, Loader)
    ├── lib/             # Shared TypeScript constants
    └── services/        # Axios API instance


🌐 Deployment Note

Backend: Hosted on Render/Railway. Set Root Directory to backend.

Frontend: Hosted on Vercel. Set Root Directory to frontend.

Database: Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0 for production reachability.
