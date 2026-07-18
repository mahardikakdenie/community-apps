import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Rect, Ellipse, Defs, Pattern, Path } from 'react-native-svg';
import { NAVY, mapPins } from '@/constants/data';

export default function MapComponent() {
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const selected = mapPins.find((p) => p.id === selectedPin);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Text style={{ fontSize: 14 }}>🔍</Text>
        <Text style={styles.searchText}>Cari event di sekitar kamu (Web)...</Text>
      </View>

      <View style={styles.mapBg}>
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <Pattern id="grid" width={60} height={60} patternUnits="userSpaceOnUse">
              <Path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4E8D4" strokeWidth={8} />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grid)" />
          <Rect x="0" y="48%" width="100%" height={10} fill="#C8DCC8" />
          <Rect x="48%" y="0" width={10} height="100%" fill="#C8DCC8" />
          <Rect x="0" y="28%" width="100%" height={5} fill="#D4E4D4" />
          <Rect x="0" y="68%" width="100%" height={5} fill="#D4E4D4" />
          <Rect x="28%" y="0" width={5} height="100%" fill="#D4E4D4" />
          <Rect x="68%" y="0" width={5} height="100%" fill="#D4E4D4" />
          <Rect x="15%" y="38%" width="20%" height="18%" rx={8} fill="#B8D8B8" opacity={0.7} />
          <Rect x="55%" y="15%" width="18%" height="15%" rx={8} fill="#B8D8B8" opacity={0.7} />
          <Ellipse cx="80%" cy="75%" rx="12%" ry="8%" fill="#A8CCE0" opacity={0.6} />
        </Svg>

        {mapPins.map((pin) => {
          const isSelected = selectedPin === pin.id;
          const pinSize = isSelected ? 44 : 36;
          return (
            <TouchableOpacity
              key={pin.id}
              onPress={() => setSelectedPin(isSelected ? null : pin.id)}
              style={[
                styles.pin,
                {
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                  width: pinSize,
                  height: pinSize,
                  backgroundColor: pin.color,
                  zIndex: isSelected ? 20 : 10,
                  transform: [{ translateX: -pinSize / 2 }, { translateY: -pinSize }, { rotate: '-45deg' }],
                },
              ]}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: isSelected ? 20 : 16, transform: [{ rotate: '45deg' }] }}>
                {pin.emoji}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

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
    position: 'absolute',
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
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 14, paddingHorizontal: 20, paddingBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
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
