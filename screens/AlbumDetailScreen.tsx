import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, Alert, Share } from 'react-native';

interface AlbumDetailScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  album?: any;
  currentUser?: any;
}

export default function AlbumDetailScreen({ onLogout, onNavigate, album, currentUser }: AlbumDetailScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedImages, setSavedImages] = useState<number[]>([]);

  if (!album) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate('studentGallery')}>
            <Text style={styles.backBtn}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Album</Text>
          <View style={{ width: 44 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Album not found</Text>
        </View>
      </View>
    );
  }

  const handleSaveImage = (index: number) => {
    if (savedImages.includes(index)) {
      setSavedImages(savedImages.filter((i) => i !== index));
      Alert.alert('Removed', 'Image removed from saved');
    } else {
      setSavedImages([...savedImages, index]);
      Alert.alert('Saved', 'Image saved to device');
    }
  };

  const handleShareImage = async (imageUrl: string) => {
    try {
      await Share.share({
        message: `Check out this photo from ${album.title}!`,
        url: imageUrl,
        title: album.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share image');
    }
  };

  const renderImageCard = ({ item, index }: any) => (
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item }} style={styles.image} />
      <View style={styles.imageOverlay}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => handleSaveImage(index)}
        >
          <Text style={styles.actionBtnText}>{savedImages.includes(index) ? '✓' : '💾'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => handleShareImage(item)}
        >
          <Text style={styles.actionBtnText}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('studentGallery')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{album.title}</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => setMenuOpen(!menuOpen)}>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
          {menuOpen && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); }}>
                <Text style={styles.menuItemIcon}>⚙️</Text>
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); }}>
                <Text style={styles.menuItemIcon}>❓</Text>
                <Text style={styles.menuItemText}>Help</Text>
              </TouchableOpacity>
              <View style={styles.menuDivider} />
              <TouchableOpacity style={[styles.menuItem, styles.logoutMenuItem]} onPress={() => { setMenuOpen(false); onLogout(); }}>
                <Text style={styles.menuItemIcon}>🚪</Text>
                <Text style={[styles.menuItemText, styles.logoutMenuText]}>Log Out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Album Info */}
      <View style={styles.albumInfoSection}>
        <View style={styles.albumInfoContent}>
          <Text style={styles.albumTitle}>{album.title}</Text>
          <View style={styles.albumMeta}>
            <Text style={styles.category}>{album.category}</Text>
            <Text style={styles.date}>{album.date}</Text>
            <Text style={styles.photoCount}>{album.images?.length || 0} photos</Text>
          </View>
        </View>
      </View>

      {/* Images Grid */}
      {album.images && album.images.length > 0 ? (
        <FlatList
          data={album.images}
          renderItem={renderImageCard}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.gridContent}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📸</Text>
          <Text style={styles.emptyText}>No images in this album</Text>
        </View>
      )}

      {/* Saved Count Footer */}
      {savedImages.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {savedImages.length} image{savedImages.length !== 1 ? 's' : ''} saved
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backBtn: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    flex: 1,
    marginHorizontal: 12,
  },
  menuContainer: {
    position: 'relative',
  },
  menuBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#1a1a2e',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  logoutMenuItem: {
    backgroundColor: '#fff5f5',
  },
  menuItemIcon: {
    fontSize: 18,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a2e',
  },
  logoutMenuText: {
    color: '#ff3b30',
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  albumInfoSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  albumInfoContent: {
    gap: 8,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  albumMeta: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  category: {
    fontSize: 11,
    color: '#3b82f6',
    fontWeight: '600',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  date: {
    fontSize: 11,
    color: '#999',
  },
  photoCount: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  gridContent: {
    padding: 8,
    paddingBottom: 100,
  },
  columnWrapper: {
    gap: 8,
    marginBottom: 8,
  },
  imageWrapper: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 8,
    flexDirection: 'row',
    gap: 6,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  actionBtnText: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3b82f6',
  },
});
