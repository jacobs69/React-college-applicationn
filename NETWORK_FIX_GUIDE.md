# Network Connection Fix Guide

## Issue
API error: "failed network request failed" when trying to login or access backend endpoints.

## Root Cause
The frontend was configured to connect to IP address `192.168.0.105`, but the actual machine IP is `10.73.234.184`. This mismatch prevented the app from reaching the backend server.

## Solution Applied

### 1. Updated API Configuration
**File**: `CollegegramApp/utils/api.ts`

Changed from:
```typescript
const API_URL = 'http://192.168.0.105:5000/api';
```

To:
```typescript
const API_URL = 'http://10.73.234.184:5000/api';
```

### 2. Updated Backend Server Configuration
**File**: `backend/server.js`

Changed from:
```javascript
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

To:
```javascript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Listening on all interfaces (0.0.0.0:${PORT})`);
});
```

This ensures the backend listens on all network interfaces, not just localhost.

## Current Network Setup

- **Machine IP**: 10.73.234.184
- **Backend Port**: 5000
- **Backend URL**: http://10.73.234.184:5000/api
- **Backend Status**: ✅ Running and listening on all interfaces

## How to Find Your IP Address

If you need to update the IP in the future:

**Windows (PowerShell)**:
```powershell
ipconfig | findstr /i "ipv4"
```

**Windows (CMD)**:
```cmd
ipconfig
```

Look for "IPv4 Address" under your active network adapter.

## Testing the Connection

### 1. Test Backend Health
Open in browser or use curl:
```
http://10.73.234.184:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-02-26T..."
}
```

### 2. Test Login Endpoint
Use Postman or curl:
```bash
curl -X POST http://10.73.234.184:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"B20232637","password":"password123"}'
```

## Test Credentials

### Student
- **ID**: B20232637
- **Password**: password123

### Teacher
- **Email**: sharma@college.edu
- **Password**: password123

### Admin
- **Email**: admin@college.edu
- **Password**: password123

## Troubleshooting Steps

If you still see network errors:

1. **Verify Backend is Running**
   - Check terminal 4 for backend process
   - Should see: "✅ MongoDB connected successfully"

2. **Verify Frontend is Running**
   - Check terminal 2 for frontend process
   - Should see Metro Bundler running

3. **Check Firewall**
   - Windows Firewall might block port 5000
   - Allow Node.js through firewall if needed

4. **Verify MongoDB Connection**
   - Backend logs should show: "✅ MongoDB connected successfully"
   - If not, check MongoDB is running locally

5. **Clear App Cache**
   - Restart the Expo app on your device
   - Clear AsyncStorage if needed

## Important Notes

- The IP address `10.73.234.184` is specific to your current network
- If you change networks or restart your machine, the IP might change
- Always verify the IP with `ipconfig` before troubleshooting
- Both backend and frontend must be running on the same network

## Next Steps

1. Reload the Expo app on your device
2. Try logging in with test credentials
3. If still having issues, check the browser console for specific error messages
