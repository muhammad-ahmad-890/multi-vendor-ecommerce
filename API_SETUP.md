# API Setup Instructions

## Configuration

To use the login API, you need to set the `VITE_API_BASE_URL` environment variable. Create a `.env` file in the root directory with:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

Replace `http://localhost:3000` with your actual API server URL.

## API Endpoint

The login endpoint is: `POST /api/admin/login`

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "message": "Admin LoggedIn successfully",
  "data": {
    "user": {
      "id": "4b9e6260-281a-44fe-a0d7-42cd05764a81",
      "firstName": "Admin",
      "lastName": "New",
      "phone": "03491797803",
      "role": "ADMIN",
      "status": "PENDING"
      // ... other user fields
    },
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Features Implemented

1. **Login API Integration**: Uses the `/api/admin/login` endpoint
2. **Protected Routes**: All pages except login/forgot-password require authentication
3. **Token Storage**: JWT tokens are stored in localStorage
4. **User State Management**: Redux store manages user authentication state
5. **Automatic Redirects**: Unauthenticated users are redirected to login
6. **Logout Functionality**: Clears tokens and redirects to login

## How It Works

1. User enters credentials on the login page
2. Credentials are sent to the API endpoint
3. On successful login, user data and token are stored
4. User is redirected to the dashboard or intended page
5. Protected routes check authentication status
6. Unauthenticated users are redirected to login
