# Local APK Build Guide (No EAS Required)

## Method 1: Using Expo Prebuild + Android Studio (Recommended)

### Step 1: Generate Native Android Files
```bash
cd CollegegramApp
npx expo prebuild --clean
```
When prompted, answer **YES** to continue with uncommitted changes.

### Step 2: Build APK with Gradle
```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## Method 2: Using Expo Run (Fastest for Testing)

### Step 1: Install Android SDK
Make sure you have Android SDK installed. If not:
- Download Android Studio from https://developer.android.com/studio
- Install it and set up Android SDK

### Step 2: Run on Android Device/Emulator
```bash
cd CollegegramApp
npx expo run:android
```

This will:
- Generate native files
- Build the APK
- Install it on your connected device or emulator
- Start the dev server

---

## Method 3: Using Gradle Directly (Advanced)

### Step 1: Prebuild
```bash
cd CollegegramApp
npx expo prebuild --clean
```

### Step 2: Build Release APK
```bash
cd android
./gradlew assembleRelease
```

### Step 3: Build Debug APK (Faster)
```bash
./gradlew assembleDebug
```

Debug APK location:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Installing the APK

### On Physical Device (via ADB)
```bash
adb install path/to/app-release.apk
```

### On Android Emulator
```bash
adb install path/to/app-release.apk
```

Or drag and drop the APK into the emulator window.

---

## Troubleshooting

### Issue: "gradlew not found"
**Solution:** Make sure you're in the `android` folder:
```bash
cd CollegegramApp/android
./gradlew assembleRelease
```

### Issue: "JAVA_HOME not set"
**Solution:** Set Java path:
```bash
set JAVA_HOME=C:\Program Files\Java\jdk-17
```

### Issue: Build fails with Gradle error
**Solution:** Clean and rebuild:
```bash
./gradlew clean
./gradlew assembleRelease
```

### Issue: Out of memory
**Solution:** Increase Gradle memory:
```bash
set GRADLE_OPTS=-Xmx4096m
./gradlew assembleRelease
```

---

## Quick Commands Summary

| Task | Command |
|------|---------|
| Generate native files | `npx expo prebuild --clean` |
| Build release APK | `cd android && ./gradlew assembleRelease` |
| Build debug APK | `cd android && ./gradlew assembleDebug` |
| Run on device | `npx expo run:android` |
| Install APK | `adb install app-release.apk` |
| Clean build | `cd android && ./gradlew clean` |

---

## Recommended Workflow

1. **First time setup:**
   ```bash
   npx expo prebuild --clean
   ```

2. **Build APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Find APK:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

4. **Install on device:**
   ```bash
   adb install android/app/build/outputs/apk/release/app-release.apk
   ```

---

## Notes

- **Release APK**: Optimized, smaller size, for production
- **Debug APK**: Larger, includes debug info, faster to build
- **First build takes longer** (5-15 minutes depending on your machine)
- **Subsequent builds are faster** (2-5 minutes)
- Make sure Android SDK is installed before starting
