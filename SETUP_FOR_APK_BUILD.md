# Setup Required for Local APK Build

Your system is missing Java and Android SDK. Here's how to set them up:

## Step 1: Install Java JDK 17

### Option A: Using Windows Installer (Recommended)
1. Download from: https://www.oracle.com/java/technologies/downloads/#java17
2. Click "Windows x64 Installer"
3. Run the installer and follow the steps
4. Note the installation path (usually `C:\Program Files\Java\jdk-17.x.x`)

### Option B: Using Microsoft Store
1. Open Microsoft Store
2. Search for "OpenJDK"
3. Install "OpenJDK 17"

### Option C: Using Chocolatey (if installed)
```powershell
choco install openjdk17 -y
```

---

## Step 2: Set JAVA_HOME Environment Variable

### Windows 10/11:
1. Press `Win + X` and select "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Click "New" under "System variables"
5. Variable name: `JAVA_HOME`
6. Variable value: `C:\Program Files\Java\jdk-17.x.x` (adjust version number)
7. Click OK and restart PowerShell

### Or via PowerShell (Temporary):
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17.x.x"
```

---

## Step 3: Install Android SDK

### Option A: Using Android Studio (Recommended)
1. Download from: https://developer.android.com/studio
2. Run the installer
3. Follow the setup wizard
4. Install Android SDK Platform 34 (or latest)
5. Note the SDK path (usually `C:\Users\YourUsername\AppData\Local\Android\Sdk`)

### Option B: Using Command Line
```powershell
npm install -g android-sdk
```

---

## Step 4: Set ANDROID_HOME Environment Variable

### Windows 10/11:
1. Press `Win + X` and select "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Click "New" under "System variables"
5. Variable name: `ANDROID_HOME`
6. Variable value: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
7. Click OK and restart PowerShell

### Or via PowerShell (Temporary):
```powershell
$env:ANDROID_HOME = "C:\Users\YourUsername\AppData\Local\Android\Sdk"
```

---

## Step 5: Verify Installation

```powershell
java -version
```

Should show something like:
```
openjdk version "17.0.x"
```

---

## Step 6: Build APK

Once Java and Android SDK are installed:

```powershell
cd CollegegramApp/android
./gradlew assembleDebug
```

APK will be at:
```
CollegegramApp/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Troubleshooting

### "JAVA_HOME is not set"
- Make sure you set the environment variable AND restarted PowerShell
- Verify with: `$env:JAVA_HOME`

### "Android SDK not found"
- Make sure Android Studio is installed
- Set ANDROID_HOME to the correct path
- Verify with: `$env:ANDROID_HOME`

### "Gradle build failed"
```powershell
cd CollegegramApp/android
./gradlew clean
./gradlew assembleDebug
```

### "Out of memory"
```powershell
$env:GRADLE_OPTS = "-Xmx4096m"
./gradlew assembleDebug
```

---

## Quick Setup Summary

1. Install Java JDK 17
2. Set `JAVA_HOME` environment variable
3. Install Android Studio
4. Set `ANDROID_HOME` environment variable
5. Restart PowerShell
6. Run: `cd CollegegramApp/android && ./gradlew assembleDebug`

---

## After Setup is Complete

Once you have Java and Android SDK installed, run:

```powershell
cd CollegegramApp
npx expo prebuild --clean
cd android
./gradlew assembleDebug
```

Your APK will be ready at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```
