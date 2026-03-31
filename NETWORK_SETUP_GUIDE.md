# Network Setup Guide - Backend Connection

## Problem
When running the app on a physical device or emulator, it can't reach `localhost:5000` because the device/emulator is on a different network interface.

## Solution
Use your computer's IP address instead of localhost.

## Your Computer IP
**IPv4 Address: 192.168.0.102**

This is already configured in `utils/api.ts`:
```typescript
const API_URL = 'http://192.168.0.102:5000/api';
```

## Setup Steps

### 1. Ensure Backend is Running
```bash
cd backend
npm run dev
```

Backend should be running on `http://192.168.0.102:5000`

### 2. Ensure Backend Allows CORS
Check `backend/server.js` has CORS enabled:
```javascript
app.use(cors());
```

### 3. Test Backend Connection
From your computer, test the backend:
```bash
curl -X POST http://192.168.0.102:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jai@college.edu","password":"password123"}'
```

Should return:
```json
{
  "success": true,
  "token": "...",
  "user": {...}
}
```

### 4. Start Frontend
```bash
cd CollegegramApp
npm start
```

### 5. Test Login
- Email: `jai@college.edu`
- Password: `password123`

## Troubleshooting

### Still Getting "Network Request Failed"?

1. **Check if backend is running:**
   ```bash
   netstat -an | findstr :5000
   ```
   Should show LISTENING on port 5000

2. **Check firewall:**
   - Windows Firewall might be blocking port 5000
   - Allow Node.js through firewall

3. **Check network connectivity:**
   - Ensure device/emulator is on same WiFi network
   - Ping your computer from device:
     ```bash
     ping 192.168.0.102
     ```

4. **Check backend logs:**
   - Look for CORS errors
   - Look for connection errors

### For Android Emulator
If using Android emulator instead of physical device, use:
```typescript
const API_URL = 'http://10.0.2.2:5000/api';
```

### For iOS Simulator
Use:
```typescript
const API_URL = 'http://localhost:5000/api';
```

## Network Debugging

The API now logs all requests. Check console for:
```
[API] POST /api/auth/login
[API Success] POST /api/auth/login
```

Or errors:
```
[API Exception] Network request failed
[API Error] 401: Invalid credentials
```

## Files Modified
- `CollegegramApp/utils/api.ts` - Updated API_URL to 192.168.0.102

## Next Steps
Once login works, you can:
1. Test other API endpoints
2. Add more backend features
3. Deploy to production with proper domain
