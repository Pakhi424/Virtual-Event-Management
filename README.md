# Virtual Event Management Platform

A RESTful API built using Node.js and Express.js for managing virtual events with authentication and participant registration.

---

## 🚀 Features

- User Registration and Login (JWT Authentication)
- Password hashing using bcrypt
- Role-based access (Organizer / Attendee)
- Create, Update, Delete Events
- View All Events
- Register for Events
- Protected Routes using JWT Middleware
- In-memory data storage (No Database)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt
- dotenv

---

## 📂 Project Structure

src/
│
├── controllers/
├── routes/
├── middleware/
├── services/
├── utils/
├── data/
├── server.js
└── app.js

---

## ⚙️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Pakhi424/Virtual-Event-Management.git

2.Install dependencies
npm install

3.Create a .env file in root directory
JWT_SECRET=mysecretkey123
PORT=5000

4.Start the server
node src/server.js

Server will run on:
http://localhost:5000

📌 API Endpoints

🔐 Authentication
	•	POST /api/auth/register
	•	POST /api/auth/login

⸻

🎟️ Event Management
	•	GET /api/events
	•	POST /api/events (Protected)
	•	PUT /api/events/:id (Protected)
	•	DELETE /api/events/:id (Protected)

⸻

👥 Participant Management
	•	POST /api/events/:id/register (Protected)

⸻

🧪 Testing

Use Postman to test:
	1.	Register User
	2.	Login → Copy JWT Token
	3.	Add Token in Authorization (Bearer Token)
	4.	Create Event
	5.	Register for Event

⸻

📌 Notes
	•	Data is stored in-memory (resets when server restarts)
	•	JWT is required for protected routes
	•	No database is used as per assignment requirement
