import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { TEAL, ORANGE, YELLOW, NAVY, LIGHT } from '@/constants/data';

export default function ProfileScreen() {
  const [notifOn, setNotifOn] = useState(true);

  const badges = [
    { emoji: '🥅', label: 'Futsal Pro', color: ORANGE },
    { emoji: '🎮', label: 'MLBB MVP', color: TEAL },
    { emoji: '☕', label: 'Cafe Hopper', color: '#C77A00' },
    { emoji: '🌟', label: 'Event 10x', color: '#7B5EA7' },
  ];

  const settingsItems = [
    { icon: '🔔', label: 'Notifikasi Event', toggle: true },
    { icon: '🌍', label: 'Bahasa', value: 'Indonesia' },
    { icon: '🔐', label: 'Keamanan Akun', value: '' },
    { icon: '📋', label: 'Riwayat Event', value: '' },
    { icon: '❓', label: 'Bantuan & FAQ', value: '' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={[NAVY, '#1B3A5C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerBgCircle} />

        <View style={styles.profileRow}>
          <View style={styles.avatarLarge}>
            <Text style={{ fontSize: 28 }}>🧑‍💻</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>Budi Santoso</Text>
              <View style={styles.devBadge}>
                <Text style={styles.devBadgeText}>DEV ✓</Text>
              </View>
            </View>
            <Text style={styles.handle}>@budi_jakarta · Software Engineer</Text>
            <Text style={styles.location}>📍 Jakarta Selatan</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { val: '12', label: 'Event' },
            { val: '847', label: 'Poin' },
            { val: '24', label: 'Teman' },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.body}>
        {/* Member card */}
        <LinearGradient
          colors={[TEAL, '#00A882', NAVY]}
          locations={[0, 0.6, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.memberCard}
        >
          <View style={styles.memberCardBgCircle} />
          <View style={styles.memberCardTop}>
            <View>
              <Text style={styles.memberCardOrg}>HAPPY JAKARTA PLAY</Text>
              <Text style={styles.memberCardTitle}>Digital Member Card</Text>
            </View>
            <Text style={{ fontSize: 24 }}>🃏</Text>
          </View>
          <Text style={styles.memberCardNumber}>HJP-2025-0847</Text>
          <View style={styles.memberCardBottom}>
            <View>
              <Text style={styles.memberCardLabel}>NAMA</Text>
              <Text style={styles.memberCardName}>BUDI SANTOSO</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedBadgeText}>VERIFIED DEV ✓</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Badges */}
        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>Badge Prestasi</Text>
          <View style={styles.badgesGrid}>
            {badges.map((b) => (
              <View
                key={b.label}
                style={[styles.badgeCard, { borderColor: b.color + '22' }]}
              >
                <Text style={{ fontSize: 16 }}>{b.emoji}</Text>
                <Text style={[styles.badgeLabel, { color: b.color }]}>
                  {b.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Pengaturan</Text>
          {settingsItems.map((item) => (
            <View key={item.label} style={styles.settingItem}>
              <Text style={{ fontSize: 16 }}>{item.icon}</Text>
              <Text style={styles.settingLabel}>{item.label}</Text>
              {item.toggle ? (
                <Switch
                  value={notifOn}
                  onValueChange={setNotifOn}
                  trackColor={{ false: '#D1D5DB', true: TEAL + '66' }}
                  thumbColor={notifOn ? TEAL : '#f4f3f4'}
                />
              ) : (
                <Text style={styles.settingValue}>
                  {item.value || '→'}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Version & Logout */}
        <Text style={styles.version}>Happy Jakarta Play v2.1.0</Text>
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Keluar dari Akun</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT },
  header: {
    paddingTop: 56, paddingHorizontal: 20, paddingBottom: 28,
    position: 'relative', overflow: 'hidden',
  },
  headerBgCircle: {
    position: 'absolute', bottom: -30, right: -30,
    width: 120, height: 120, borderRadius: 60, backgroundColor: TEAL + '22',
  },
  profileRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, marginBottom: 16 },
  avatarLarge: {
    width: 62, height: 62, borderRadius: 31,
    backgroundColor: TEAL + '33', borderWidth: 3, borderColor: TEAL,
    alignItems: 'center', justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontSize: 17, fontWeight: '800', color: '#fff' },
  devBadge: { backgroundColor: TEAL, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 7 },
  devBadgeText: { color: '#fff', fontSize: 8, fontWeight: '800' },
  handle: { color: '#ffffff88', fontSize: 11, marginTop: 2 },
  location: { color: '#ffffffCC', fontSize: 10, marginTop: 3 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1, backgroundColor: '#ffffff14', borderRadius: 10, padding: 8,
    alignItems: 'center', borderWidth: 1, borderColor: '#ffffff10',
  },
  statVal: { color: YELLOW, fontSize: 15, fontWeight: '800' },
  statLabel: { color: '#ffffff77', fontSize: 9, fontWeight: '600' },
  body: { padding: 16, paddingTop: 14, gap: 14 },
  memberCard: {
    borderRadius: 16, padding: 14, position: 'relative', overflow: 'hidden',
  },
  memberCardBgCircle: {
    position: 'absolute', top: -20, right: -20,
    width: 90, height: 90, borderRadius: 45, backgroundColor: '#ffffff11',
  },
  memberCardTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 10,
  },
  memberCardOrg: { fontSize: 9, color: '#ffffffAA', fontWeight: '700', letterSpacing: 1 },
  memberCardTitle: { fontSize: 14, fontWeight: '800', color: '#fff', marginTop: 2 },
  memberCardNumber: { color: '#ffffffCC', fontSize: 12, fontWeight: '700', letterSpacing: 3 },
  memberCardBottom: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-end', marginTop: 8,
  },
  memberCardLabel: { fontSize: 8, color: '#ffffff77' },
  memberCardName: { fontSize: 11, fontWeight: '700', color: '#fff' },
  verifiedBadge: {
    backgroundColor: YELLOW, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  verifiedBadgeText: { color: NAVY, fontSize: 9, fontWeight: '800' },
  badgesSection: {},
  sectionTitle: { fontSize: 13, fontWeight: '800', color: NAVY, marginBottom: 8 },
  badgesGrid: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  badgeCard: {
    backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7,
    flexDirection: 'row', alignItems: 'center', gap: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 5, elevation: 2,
    borderWidth: 1.5,
  },
  badgeLabel: { fontSize: 10, fontWeight: '700' },
  settingsSection: {},
  settingItem: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10, marginBottom: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  settingLabel: { flex: 1, fontSize: 12, fontWeight: '600', color: NAVY },
  settingValue: { fontSize: 12, color: '#9CA3AF', fontWeight: '500' },
  version: {
    textAlign: 'center', fontSize: 10, color: '#9CA3AF', marginTop: 10,
  },
  logoutBtn: {
    backgroundColor: '#FEE2E2', borderRadius: 12,
    padding: 12, alignItems: 'center',
  },
  logoutText: { color: '#DC2626', fontSize: 13, fontWeight: '700' },
});
