# task_manager

A complete production-quality Task Tracker web application built using the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **CRUD Operations**: Create, Read, Update, Delete tasks.
- **Filtering**: Filter tasks by All, Pending, or Completed status.
- **Sorting**: Sort tasks by Newest, Oldest, or Priority.
- **Search**: Search tasks by title or description.
- **Modern UI**: Built with React, Tailwind CSS, and Lucide React icons for a responsive, accessible, and polished interface.
- **Validation**: Frontend and backend validation.

## Folder Structure
```
.
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── taskController.js
│   ├── middleware
│   │   └── errorHandler.js
│   ├── models
│   │   └── Task.js
│   ├── routes
│   │   └── taskRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── DeleteConfirmModal.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskFormModal.jsx
│   │   ├── hooks
│   │   │   └── useTasks.js
│   │   ├── pages
│   │   │   └── Dashboard.jsx
│   │   ├── services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://rishibankar16_db_user:<YOUR_PASSWORD>@cluster0.prdl184.mongodb.net/tasktracker?retryWrites=true&w=majority&appName=Cluster0
```
*Note: Replace `<YOUR_PASSWORD>` with your actual MongoDB password.*

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000/api
```

## Installation & Run Commands

### Backend
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on `http://localhost:5000`):
   ```bash
   npm run dev
   ```

### Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment Instructions

### Backend (Render)
1. Push the `backend` code to a GitHub repository.
2. Go to Render.com and create a new "Web Service".
3. Connect your GitHub repository.
4. Set the Build Command to `npm install` and the Start Command to `npm start`.
5. Add the Environment Variables (`PORT`, `MONGODB_URI`).
6. Deploy.

### Frontend (Vercel)
1. Push the `frontend` code to a GitHub repository.
2. Go to Vercel.com and create a new Project.
3. Import your GitHub repository.
4. In the Build and Output Settings, the framework preset will automatically detect Vite.
5. Add the Environment Variable `VITE_API_URL` pointing to your deployed backend URL (e.g., `https://your-backend.onrender.com/api`).
6. Deploy.

### Database (MongoDB Atlas)
1. The provided connection string is already configured for MongoDB Atlas. Ensure the IP Access List in Atlas allows connections from your deployment server (allow IP `0.0.0.0/0` for universal access).
