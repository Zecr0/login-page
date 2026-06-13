# Minimal Login Page

A clean, minimal login page built with Node.js/Express, HTML, CSS, and JavaScript.

## Features

- ✨ Minimal and clean design
- 🔐 User registration and login
- 🛡️ Password hashing with bcryptjs
- 🎫 JWT authentication
- 💾 Local storage for session persistence
- 📱 Responsive mobile design
- 🎨 Modern gradient UI

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   ```
   http://localhost:3000
   ```

## Usage

- **Sign Up**: Click "Sign up" to create a new account
- **Login**: Enter your email and password to login
- **Logout**: Click the logout button when logged in

## Environment Variables

Edit `.env` to configure:
- `PORT` - Server port (default: 3000)
- `JWT_SECRET` - Secret key for JWT tokens (change in production!)
- `NODE_ENV` - Environment mode

## Note

⚠️ This is a demo with in-memory storage. For production:
- Use a real database (MongoDB, PostgreSQL, etc.)
- Implement proper password reset
- Use HTTPS
- Add rate limiting
- Implement CSRF protection
- Store JWT securely (HttpOnly cookies)
