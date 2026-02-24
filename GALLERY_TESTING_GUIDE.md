# Gallery Feature - Testing Guide

## Quick Start

### For Admin Users
1. Login as Admin
2. Click "Gallery" button in Management Tools section
3. Click "Post New Album" button
4. Fill in the form:
   - Album Title: e.g., "Tech Fest 2025"
   - Date: e.g., "2025-05-20"
   - Category: Select from Cultural, Tech Fest, Sports, or Other
   - Number of Photos: Use +/- buttons to set (1-10)
5. Click "Publish Album"
6. Album appears in "Recent Albums" list
7. Click delete button (🗑️) to remove album

### For Student Users
1. Login as Student
2. Click "Gallery" button in Quick Access section
3. Browse albums with cover images
4. Use category filter buttons to filter albums
5. Click on any album to view full images
6. In album detail:
   - Click 💾 button to save image
   - Click 📤 button to share image
   - View saved count at bottom

## Test Scenarios

### Scenario 1: Admin Creates Album
**Expected Result**: Album appears in list with correct metadata
- Title displays correctly
- Category badge shows correct color
- Date displays correctly
- Photo count shows correct number

### Scenario 2: Student Views Albums
**Expected Result**: All albums visible with proper formatting
- Album covers load correctly
- Album titles are readable
- Category and date information visible
- Photo count accurate

### Scenario 3: Category Filtering
**Expected Result**: Only albums of selected category display
- "All" shows all albums
- "Cultural" shows only cultural albums
- "Tech Fest" shows only tech fest albums
- "Sports" shows only sports albums
- "Other" shows only other albums

### Scenario 4: Album Detail View
**Expected Result**: Images display in 2-column grid
- Images load correctly
- Grid layout is responsive
- Save/share buttons visible on each image
- Album title and metadata display at top

### Scenario 5: Save Image
**Expected Result**: Image is marked as saved
- Clicking 💾 changes to ✓
- Saved count increases at bottom
- Clicking again removes from saved
- Saved count decreases

### Scenario 6: Share Image
**Expected Result**: Native share dialog appears
- Share dialog opens with image
- Can select app to share to
- Message includes album title

### Scenario 7: Navigation
**Expected Result**: All navigation works smoothly
- Back button returns to previous screen
- Gallery button from dashboard navigates correctly
- Menu options work (Settings, Help, Logout)
- No errors in console

## Sample Test Data

### Album 1: Annual Cultural Fest 2025
- Category: Cultural
- Date: 2025-05-15
- Photos: 2

### Album 2: Tech Fest 2025
- Category: Tech Fest
- Date: 2025-06-01
- Photos: 3

### Album 3: Sports Day 2025
- Category: Sports
- Date: 2025-04-20
- Photos: 4

## Known Limitations

1. **Placeholder Images**: Currently uses placehold.co for images
   - Real image picker not implemented
   - Images are generated based on category colors
   - No actual file upload capability

2. **Local Storage Only**: 
   - Albums stored in React state only
   - Data lost on app refresh
   - No database persistence

3. **Save Functionality**:
   - Saves tracked locally in component state
   - Not persisted to device storage
   - No actual file download

## Future Enhancements

- [ ] Real image picker for admin uploads
- [ ] Firebase/cloud storage integration
- [ ] Persistent storage (AsyncStorage or database)
- [ ] Download to device functionality
- [ ] Image compression and optimization
- [ ] Comments and likes on images
- [ ] Album sharing with specific users
- [ ] Image editing capabilities

## Troubleshooting

### Images not loading
- Check internet connection (placehold.co requires internet)
- Verify image URLs are correct
- Check console for network errors

### Albums not appearing
- Verify albums state is populated
- Check navigation routing
- Ensure setAlbums is being called correctly

### Navigation not working
- Check onNavigate prop is passed correctly
- Verify routing cases in app/index.tsx
- Check console for errors

### Save/Share not working
- Verify Share API is available on device
- Check permissions are granted
- Verify image URLs are valid

## Performance Notes

- Grid layout uses FlatList for efficient rendering
- Category filtering is instant (no API calls)
- Image loading is handled by React Native Image component
- No heavy computations or animations

## Accessibility

- All buttons have clear labels
- Icons are supplemented with text
- Color contrast meets standards
- Touch targets are 44x44 minimum
- Navigation is logical and intuitive
