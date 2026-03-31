# Login Troubleshooting - Network Request Failed

## Status Check ✅
- Backend is running on port 5000 ✅
- Backend is responding to requests ✅
- API URL updated to 192.168.0.102 ✅

## What Was Fixed
The app was trying to connect to `localhost:5000` which doesn't work on physical devices or emulators.

**Updated in `CollegegramApp/utils/api.ts`:**
```typescript
const API_URL = 'http://192.168.0.102:5000/api';
```

## How to Test

### Step 1: Verify Backend is Running
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

### Step 2: Clear App Cache (Important!)
Since you changed the API URL, clear the app cache:

**For Expo:**
```bash
cd CollegegramApp
npm start
# Press 'c' to clear cache
```

### Step 3: Restart Frontend
```bash
cd CollegegramApp
npm start
```

### Step 4: Test Login
- Email: `jai@college.edu`
- Password: `password123`

## Expected Flow
1. Enter credentials
2. Click "Sign In"
3. Loading spinner appears
4. Console shows: `[API] POST /api/auth/login`
5. Backend processes request
6. Console shows: `[API Success] POST /api/auth/login`
7. User logged in and navigated to dashboard

## If Still Getting Error

### Check Console Logs
Look for messages like:
- `[API] POST /api/auth/login` - Request sent
- `[API Exception] Network request failed` - Network issue
- `[API Error] 401: Invalid credentials` - Wrong password

### Common Issues

**1. Backend not running**
- Check if `npm run dev` is still running in backend folder
- Verify port 5000 is listening

**2. Firewall blocking**
- Windows Firewall might block port 5000
- Add Node.js to firewall exceptions

**3. Wrong IP address**
- Your IP is: `192.168.0.102`
- If it changed, update `utils/api.ts`
- Get current IP: `ipconfig`

**4. Device not on same network**
- Ensure phone/emulator is on same WiFi as computer
- Check if you can ping: `ping 192.168.0.102`

**5. Backend CORS issue**
- Check `backend/server.js` has `app.use(cors())`
- Restart backend after any changes

## Debug Mode
To see detailed network logs, check browser/app console for:
```
[API] POST /api/auth/login
[API Success] POST /api/auth/login
```

## Files Changed
- `CollegegramApp/utils/api.ts` - API_URL updated to 192.168.0.102

## Next Steps
Once login works:
1. Test auto-login (close and reopen app)
2. Test logout
3. Add more API endpoints
4. Test with different user roles
