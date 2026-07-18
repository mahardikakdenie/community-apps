import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NAVY, mapPins } from '@/constants/data';

export default function MapComponent() {
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const selected = mapPins.find((p) => p.id === selectedPin);

  const initialRegion = {
    latitude: -6.1944,
    longitude: 106.8229,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Text style={{ fontSize: 14 }}>🔍</Text>
        <Text style={styles.searchText}>Cari event di sekitar kamu...</Text>
      </View>

      {/* Expo Go Native Map */}
      <MapView
        style={styles.mapBg}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {mapPins.map((pin) => {
          const isSelected = selectedPin === pin.id;
          const pinSize = isSelected ? 44 : 36;
          
          const lng = 106.75 + (pin.x / 100) * 0.15;
          const lat = -6.25 + (pin.y / 100) * 0.15;

          return (
            <Marker
              key={`pin-${pin.id}`}
              coordinate={{ latitude: lat, longitude: lng }}
              onPress={() => setSelectedPin(pin.id)}
            >
              <View
                style={[
                  styles.pin,
                  {
                    width: pinSize,
                    height: pinSize,
                    backgroundColor: pin.color,
                    zIndex: isSelected ? 20 : 10,
                    transform: [{ rotate: '-45deg' }],
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: isSelected ? 20 : 16,
                    transform: [{ rotate: '45deg' }],
                  }}
                >
                  {pin.emoji}
                </Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* Bottom sheet */}
      {selected && (
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetContent}>
            <View style={[styles.sheetIcon, { backgroundColor: selected.color + '22' }]}>
              <Text style={{ fontSize: 22 }}>{selected.emoji}</Text>
            </View>
            <View>
              <Text style={styles.sheetTitle}>{selected.label} Event</Text>
              <Text style={styles.sheetSubtitle}>📍 Jakarta • 1.2 km dari kamu</Text>
            </View>
          </View>
          <View style={styles.sheetButtons}>
            <TouchableOpacity onPress={() => setSelectedPin(null)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>Tutup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.viewBtn, { backgroundColor: selected.color }]}>
              <Text style={styles.viewBtnText}>Lihat Event →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F4EF' },
  searchBar: {
    position: 'absolute', top: 50, left: 16, right: 16, zIndex: 10,
    backgroundColor: '#fff', borderRadius: 16,
    paddingHorizontal: 14, paddingVertical: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 20, elevation: 5,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  searchText: { fontSize: 13, color: '#9CA3AF' },
  mapBg: { flex: 1, backgroundColor: '#E8F0E8' },
  pin: {
    borderWidth: 2, borderColor: '#fff',
    borderTopLeftRadius: 9999,
    borderTopRightRadius: 9999,
    borderBottomLeftRadius: 9999,
    borderBottomRightRadius: 0,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 14, elevation: 6,
  },
  bottomSheet: {
    position: 'absolute', bottom: 110, left: 16, right: 16,
    backgroundColor: '#fff', borderRadius: 24,
    padding: 16, paddingHorizontal: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 24, elevation: 10, zIndex: 30,
  },
  sheetHandle: { width: 36, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginBottom: 12 },
  sheetContent: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  sheetIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sheetTitle: { fontSize: 15, fontWeight: '800', color: NAVY },
  sheetSubtitle: { fontSize: 11, color: '#6B7F7A' },
  sheetButtons: { flexDirection: 'row', gap: 10 },
  closeBtn: { flex: 1, padding: 10, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center' },
  closeBtnText: { fontSize: 12, fontWeight: '700', color: '#6B7280' },
  viewBtn: { flex: 2, padding: 10, borderRadius: 12, alignItems: 'center' },
  viewBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },
});
