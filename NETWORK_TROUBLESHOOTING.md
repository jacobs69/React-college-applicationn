# Network Connection Troubleshooting

## Error: "Failed network request failed"

This means the app cannot reach the backend server.

## Step 1: Verify Backend is Running

### On Windows (Backend Terminal)
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-02-25T..."
}
```

## Step 2: Find Your Computer's IP Address

### On Windows (Command Prompt)
```bash
ipconfig
```

Look for "IPv4 Address" under your network adapter. Example: `192.168.0.102`

### On Mac/Linux
```bash
ifconfig
```

Look for `inet` address (not 127.0.0.1)

## Step 3: Update API URL

Edit `CollegegramApp/utils/api.ts` and replace the IP address:

```typescript
// Replace 192.168.0.102 with YOUR computer's IP
const API_URL = 'http://YOUR_IP_ADDRESS:5000/api';
```

## Step 4: Verify Network Connection

### From Your Mobile Device/Emulator
1. Make sure phone/emulator is on **same WiFi network** as your computer
2. Test connectivity by opening browser on phone:
   ```
   http://YOUR_IP_ADDRESS:5000/api/health
   ```
   Should show JSON response

### For Android Emulator
If using Android Emulator, use special IP:
```typescript
const API_URL = 'http://10.0.2.2:5000/api';
```

### For Physical Android Device
Use your computer's actual IP address:
```typescript
const API_URL = 'http://192.168.X.X:5000/api';
```

## Step 5: Check Firewall

Windows Firewall might block the connection:
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Find Node.js and allow it
4. Or temporarily disable firewall for testing

## Step 6: Restart Everything

1. Stop backend: `Ctrl+C`
2. Stop app: Close Expo app
3. Start backend: `npm run dev`
4. Restart app: Reload in Expo

## Common Issues

| Issue | Solution |
|-------|----------|
| "Failed network request" | Backend not running or wrong IP |
| "Connection refused" | Backend not listening on port 5000 |
| "Timeout" | Firewall blocking connection |
| "Cannot find host" | Wrong IP address or not on same network |

## Quick Checklist

- [ ] Backend running on port 5000
- [ ] MongoDB connected
- [ ] Found correct IP address (ipconfig)
- [ ] Updated API_URL in api.ts
- [ ] Phone/emulator on same WiFi
- [ ] Firewall allows Node.js
- [ ] Restarted backend and app
