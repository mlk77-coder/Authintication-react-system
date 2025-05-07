# Modern Authentication System

This project includes a complete authentication system with login, registration, and a protected dashboard.

## Features

- User registration with form validation
- Login with secure authentication
- Protected routes and dashboard access control
- Responsive design for all devices
- Toast notifications for user feedback
- Persistent authentication using localStorage

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Setup and Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to the provided URL

## Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components for routes
- `/src/context` - Auth context provider
- `/src/services` - API services and utilities
- `/src/types` - TypeScript type definitions

## Authentication Flow

The application uses a token-based authentication system:

1. **Register**: User creates an account, which generates a token
2. **Login**: User authenticates to receive a token
3. **Protected Routes**: Routes check for valid token before allowing access
4. **Logout**: Removes token and authentication state

## Default Test User

The application includes a mock API with a pre-configured test user:

- Email: `test@example.com`
- Password: `123456`

You can also register a new user through the registration form.

## Technologies Used

- React 18
- TypeScript
- React Router v6
- React Hot Toast
- TailwindCSS
- Lucide React for icons