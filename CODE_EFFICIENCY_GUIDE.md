# Code Efficiency Guide - Collegegram Project

## Overview
This guide optimizes performance and maintainability for the Collegegram React Native + TypeScript application with Express.js backend.

---

## 1. React Native Component Efficiency

### 1.1 Memoization & Re-render Prevention
```typescript
// ✅ GOOD: Memoize expensive components
import React, { memo } from 'react';

const StudentCard = memo(({ student, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{student.name}</Text>
  </TouchableOpacity>
));

export default StudentCard;

// ✅ GOOD: Use useMemo for expensive calculations
const ClassPerformanceReportScreen = ({ classData }: Props) => {
  const performanceMetrics = useMemo(() => {
    return calculateMetrics(classData);
  }, [classData]);

  return <View>{/* render metrics */}</View>;
};

// ❌ AVOID: Inline object creation (causes re-renders)
<FlatList
  data={students}
  renderItem={({ item }) => <StudentCard student={item} />}
  keyExtractor={(item) => item.id}
  style={{ flex: 1 }} // ❌ Creates new object each render
/>

// ✅ GOOD: Extract styles outside component
const styles = StyleSheet.create({
  container: { flex: 1 },
});
```

### 1.2 FlatList Optimization
```typescript
// ✅ GOOD: Optimize FlatList rendering
<FlatList
  data={assignments}
  renderItem={({ item }) => <AssignmentItem assignment={item} />}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={10}
  windowSize={10}
  onEndReachedThreshold={0.5}
  onEndReached={loadMoreAssignments}
/>

// ❌ AVOID: Rendering all items at once
<ScrollView>
  {assignments.map((item) => (
    <AssignmentItem key={item.id} assignment={item} />
  ))}
</ScrollView>
```

### 1.3 Lazy Loading & Code Splitting
```typescript
// ✅ GOOD: Lazy load screens
import { lazy, Suspense } from 'react';

const StudentDashboard = lazy(() => import('./screens/StudentDashboard'));
const AdminDashboard = lazy(() => import('./screens/AdminDashboard'));

// In App.js
<Suspense fallback={<LoadingScreen />}>
  {currentPage === 'studentDashboard' && <StudentDashboard {...props} />}
</Suspense>
```

---

## 2. TypeScript Efficiency

### 2.1 Type Reusability
```typescript
// ✅ GOOD: Define shared types once
// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  submittedBy: User[];
}

// ✅ GOOD: Use discriminated unions for role-specific logic
type UserRole = 
  | { role: 'student'; studentId: string }
  | { role: 'teacher'; teacherId: string }
  | { role: 'admin'; adminId: string };

// ❌ AVOID: Duplicate type definitions across files
```

### 2.2 Generic Types for Reusability
```typescript
// ✅ GOOD: Generic API response handler
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Reuse across all API calls
const fetchAssignments = async (): Promise<ApiResponse<Assignment[]>> => {
  // implementation
};

const fetchFees = async (): Promise<ApiResponse<Fee[]>> => {
  // implementation
};
```

---

## 3. API & Network Efficiency

### 3.1 Request Caching
```typescript
// ✅ GOOD: Cache API responses
// utils/api.ts
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchWithCache = async (url: string) => {
  const cached = cache.get(url);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
};
```

### 3.2 Batch Requests
```typescript
// ✅ GOOD: Batch multiple API calls
const fetchStudentDashboard = async (studentId: string) => {
  const [assignments, attendance, results] = await Promise.all([
    authAPI.getAssignments(studentId),
    authAPI.getAttendance(studentId),
    authAPI.getResults(studentId),
  ]);

  return { assignments, attendance, results };
};

// ❌ AVOID: Sequential requests
const assignments = await authAPI.getAssignments(studentId);
const attendance = await authAPI.getAttendance(studentId);
const results = await authAPI.getResults(studentId);
```

### 3.3 Pagination for Large Datasets
```typescript
// ✅ GOOD: Implement pagination
const StudentAssignmentScreen = () => {
  const [page, setPage] = useState(1);
  const [assignments, setAssignments] = useState([]);

  const loadMore = async () => {
    const newAssignments = await authAPI.getAssignments(studentId, page);
    setAssignments([...assignments, ...newAssignments]);
    setPage(page + 1);
  };

  return (
    <FlatList
      data={assignments}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <AssignmentItem assignment={item} />}
    />
  );
};
```

---

## 4. State Management Efficiency

### 4.1 Minimize State Updates
```typescript
// ✅ GOOD: Batch state updates
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
});

const handleChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

// ❌ AVOID: Multiple state variables
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
```

### 4.2 Context API Optimization
```typescript
// ✅ GOOD: Split contexts by concern
// contexts/AuthContext.tsx
export const AuthContext = createContext<AuthContextType | null>(null);

// contexts/ThemeContext.tsx
export const ThemeContext = createContext<ThemeContextType | null>(null);

// ✅ GOOD: Use useCallback to prevent unnecessary re-renders
const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);

  const login = useCallback(async (identifier: string, password: string) => {
    const response = await authAPI.login(identifier, password);
    setUser(response.user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 5. Styling Efficiency

### 5.1 Reusable Style Utilities
```typescript
// ✅ GOOD: Centralized responsive utilities
// utils/responsive.ts
export const scale = (size: number) => {
  const baseWidth = 375;
  return (Dimensions.get('window').width / baseWidth) * size;
};

export const fontSize = {
  xs: scale(12),
  sm: scale(14),
  base: scale(16),
  lg: scale(18),
  xl: scale(20),
};

// Reuse across all screens
const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
});
```

### 5.2 Avoid Inline Styles
```typescript
// ❌ AVOID: Inline styles
<View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
  <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>Title</Text>
</View>

// ✅ GOOD: Extract to StyleSheet
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 16, fontWeight: '700', color: '#000' },
});

<View style={styles.container}>
  <Text style={styles.title}>Title</Text>
</View>
```

---

## 6. Backend (Express.js) Efficiency

### 6.1 Query Optimization
```javascript
// ✅ GOOD: Select only needed fields
router.get('/students/:id/assignments', async (req, res) => {
  const assignments = await Assignment.find({ studentId: req.params.id })
    .select('id title dueDate status')
    .lean(); // Returns plain objects, not Mongoose documents
  res.json(assignments);
});

// ❌ AVOID: Fetching all fields
const assignments = await Assignment.find({ studentId: req.params.id });
```

### 6.2 Middleware Efficiency
```javascript
// ✅ GOOD: Cache middleware results
const authCache = new Map();

const cacheAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (authCache.has(token)) {
    req.user = authCache.get(token);
    return next();
  }
  next();
};

// ✅ GOOD: Batch database operations
router.post('/attendance/bulk', async (req, res) => {
  const { records } = req.body;
  await Attendance.insertMany(records);
  res.json({ success: true });
});
```

### 6.3 Error Handling
```javascript
// ✅ GOOD: Centralized error handler
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

app.use(errorHandler);

// ✅ GOOD: Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/assignments', asyncHandler(async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
}));
```

---

## 7. Asset & Bundle Optimization

### 7.1 Image Optimization
```typescript
// ✅ GOOD: Use appropriate image sizes
<Image
  source={require('../assets/images/CLGlogo.png')}
  style={{ width: 100, height: 100 }}
  resizeMode="contain"
/>

// ✅ GOOD: Lazy load images
<Image
  source={{ uri: 'https://api.example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  progressiveRenderingEnabled={true}
/>

// ❌ AVOID: Large unoptimized images
<Image
  source={require('../assets/images/large-unoptimized.png')}
  style={{ width: 50, height: 50 }}
/>
```

### 7.2 Bundle Size Reduction
```json
// ✅ GOOD: Use tree-shaking compatible imports
{
  "dependencies": {
    "react-native": "^0.72.0",
    "expo": "^49.0.0"
  }
}
```

```typescript
// ✅ GOOD: Import only what you need
import { View, Text, FlatList } from 'react-native';

// ❌ AVOID: Importing entire modules
import * as RN from 'react-native';
```

---

## 8. Performance Monitoring

### 8.1 Performance Metrics
```typescript
// ✅ GOOD: Track render performance
import { PerformanceObserver, performance } from 'perf_hooks';

const measureComponentRender = (componentName: string) => {
  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  
  performance.mark(startMark);
  
  return () => {
    performance.mark(endMark);
    performance.measure(componentName, startMark, endMark);
  };
};
```

### 8.2 Network Performance
```typescript
// ✅ GOOD: Log API response times
const logApiPerformance = (endpoint: string, duration: number) => {
  console.log(`[API] ${endpoint}: ${duration}ms`);
  if (duration > 1000) {
    console.warn(`[SLOW] ${endpoint} took ${duration}ms`);
  }
};
```

---

## 9. Best Practices Checklist

- [ ] Use `memo()` for expensive components
- [ ] Implement `useMemo()` for heavy calculations
- [ ] Optimize FlatList with `removeClippedSubviews` and `maxToRenderPerBatch`
- [ ] Cache API responses with appropriate TTL
- [ ] Use `Promise.all()` for parallel requests
- [ ] Implement pagination for large datasets
- [ ] Extract styles to `StyleSheet.create()`
- [ ] Use centralized type definitions
- [ ] Implement proper error handling
- [ ] Monitor bundle size and performance
- [ ] Use `.lean()` in MongoDB queries
- [ ] Batch database operations
- [ ] Implement request/response compression
- [ ] Use lazy loading for screens
- [ ] Optimize images before deployment

---

## 10. Quick Reference: Common Patterns

### Efficient Data Fetching
```typescript
const useAssignments = (studentId: string) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await authAPI.getAssignments(studentId);
        setAssignments(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  return { assignments, loading };
};
```

### Efficient Form Handling
```typescript
const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  return { values, handleChange };
};
```

---

## Resources
- React Native Performance: https://reactnative.dev/docs/performance
- TypeScript Best Practices: https://www.typescriptlang.org/docs/handbook/
- Express.js Optimization: https://expressjs.com/en/advanced/best-practice-performance.html
