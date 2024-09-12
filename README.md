# Login System with React, Tailwind CSS, Material UI, Node.js, and MongoDB

This project is a login system built with React.js on the frontend and Node.js with Express on the backend. It uses MongoDB with Mongoose for database operations and JSON Web Tokens (JWT) for authentication. The frontend incorporates Tailwind CSS and Material UI for styling and UI components.

## Project Structure

- **Frontend (React)**
  - `loginform.jsx`: The login page where users can enter their credentials.
  - `dashboard.jsx`: The dashboard page where users can see their profile information, update their data in real-time, and log out.
  - `login.jsx`: Page for users who already have an account to log in.
  - Dark mode functionality is implemented.

- **Backend (Node.js & Express)**
  - Uses JWT for authentication and Mongoose for MongoDB operations.

## Dependencies
```bash
npm install @emotion/react@^11.13.3 @emotion/styled@^11.13.0 @mui/icons-material@^6.0.2 @mui/material@^6.0.2 axios@^1.7.7 jwt-decode@^4.0.0 notistack@^3.0.1 react@^18.3.1 react-dom@^18.3.1 react-router-dom@^6.26.2

### Backend
```bash
npm install bcrypt@^5.1.1 cors@^2.8.5 express@^4.19.2 jsonwebtoken@^9.0.2 mongoose@^8.6.1

To install the backend dependencies, use:

```bash
npm install
