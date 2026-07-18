import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { TEAL, ORANGE, YELLOW, NAVY, LIGHT, events, cafes } from '@/constants/data';

export default function HomeScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);
  const filters = ['Semua', 'Futsal', 'MLBB', 'Congklak', 'Free'];

  const filtered =
    activeFilter === 'Free'
      ? events.filter((e) => e.price === 'Gratis')
      : activeFilter === 'Semua'
      ? events
      : events.filter((e) => e.category === activeFilter);

  const partnerCafes = cafes.filter((c) => c.partner);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ── Header ── */}
      <LinearGradient
        colors={[NAVY, '#163352']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerCircle1} />
        <View style={styles.headerCircle2} />

        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>SELAMAT PAGI ☀️</Text>
            <Text style={styles.headerTitle}>Ayo Main, Budi!</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 18 }}>🧑‍💻</Text>
          </View>
        </View>

        {/* Quick stats */}
        <View style={styles.statsRow}>
          {[
            { val: '12', label: 'Event Diikuti', color: TEAL },
            { val: '847', label: 'Poin Main', color: YELLOW },
            { val: 'Dev ✓', label: 'Status Verified', color: ORANGE },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* ── Quick actions ── */}
      <View style={styles.quickActions}>
        {[
          { icon: '🗺️', label: 'Cari Event', tab: '/map' as const, color: TEAL },
          { icon: '☕', label: 'Hangout Cafe', tab: '/cafe' as const, color: ORANGE },
          { icon: '🎫', label: 'Tiket Saya', tab: '/tickets' as const, color: '#7B5EA7' },
        ].map((q) => (
          <TouchableOpacity
            key={q.label}
            onPress={() => router.push(q.tab)}
            style={[styles.quickBtn, { borderColor: q.color + '22' }]}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 20 }}>{q.icon}</Text>
            <Text style={[styles.quickLabel, { color: q.color }]}>{q.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Partner cafes strip ── */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Cafe Partner Terdekat</Text>
          <Text style={styles.sectionSubtitle}>Diskon eksklusif untuk member HJP</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/cafe')}>
          <Text style={styles.seeAll}>Lihat Semua →</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cafeStrip}
      >
        {partnerCafes.map((cafe) => (
          <View key={cafe.id} style={styles.cafeCard}>
            <View style={styles.cafeCardImage}>
              <Text style={{ fontSize: 30 }}>{cafe.emoji}</Text>
              <View style={styles.partnerBadgeSmall}>
                <Text style={styles.partnerBadgeSmallText}>PARTNER</Text>
              </View>
            </View>
            <View style={styles.cafeCardBody}>
              <Text style={styles.cafeCardName}>{cafe.name}</Text>
              <Text style={styles.cafeCardInfo}>
                {cafe.distance} • ⭐ {cafe.rating}
              </Text>
              <View style={styles.cafeCardDiscount}>
                <Text style={styles.cafeCardDiscountText}>{cafe.discount}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ── Events ── */}
      <View style={styles.eventsSection}>
        <Text style={styles.sectionTitle}>Event Minggu Ini</Text>

        {/* Filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersRow}
        >
          {filters.map((f) => {
            const active = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setActiveFilter(f)}
                style={[
                  styles.filterPill,
                  active
                    ? { backgroundColor: TEAL, borderWidth: 0 }
                    : { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#D1E8E2' },
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    { color: active ? '#fff' : '#5C7A74' },
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Event list */}
        {filtered.map((ev) => {
          const joined = joinedEvents.includes(ev.id);
          const pct = Math.round(((ev.total - ev.slots) / ev.total) * 100);
          return (
            <View key={ev.id} style={[styles.eventCard, { borderColor: ev.color + '18' }]}>
              {/* Left accent */}
              <View
                style={[
                  styles.eventAccent,
                  { backgroundColor: ev.bg, borderRightColor: ev.color + '22' },
                ]}
              >
                <Text style={{ fontSize: 24 }}>{ev.emoji}</Text>
              </View>
              {/* Content */}
              <View style={styles.eventContent}>
                <View style={styles.eventTopRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventTitle}>{ev.title}</Text>
                    <Text style={styles.eventTime}>{ev.time}</Text>
                  </View>
                  <View
                    style={[
                      styles.priceBadge,
                      {
                        backgroundColor:
                          ev.price === 'Gratis' ? '#E6FAF6' : '#F9FAFB',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.priceText,
                        { color: ev.price === 'Gratis' ? TEAL : NAVY },
                      ]}
                    >
                      {ev.price}
                    </Text>
                  </View>
                </View>
                <View style={styles.eventBottomRow}>
                  <View style={styles.capacityRow}>
                    <View style={styles.dotsRow}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <View
                          key={i}
                          style={[
                            styles.dot,
                            {
                              backgroundColor:
                                i < Math.round(pct / 20) ? ev.color : '#E5E7EB',
                            },
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={styles.slotText}>{ev.slots} slot</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setJoinedEvents(
                        joined
                          ? joinedEvents.filter((x) => x !== ev.id)
                          : [...joinedEvents, ev.id]
                      )
                    }
                    style={[
                      styles.joinBtn,
                      joined
                        ? {
                            backgroundColor: '#EEF9F5',
                            borderWidth: 1.5,
                            borderColor: ev.color,
                          }
                        : { backgroundColor: ev.color },
                    ]}
                  >
                    <Text
                      style={[
                        styles.joinBtnText,
                        { color: joined ? ev.color : '#fff' },
                      ]}
                    >
                      {joined ? '✓ Daftar' : 'Daftar'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT },
  header: { padding: 18, paddingBottom: 24, position: 'relative', overflow: 'hidden' },
  headerCircle1: {
    position: 'absolute', top: -50, right: -50,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: TEAL + '18',
  },
  headerCircle2: {
    position: 'absolute', top: 30, right: 10,
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: YELLOW + '28',
  },
  headerTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 14,
  },
  greeting: { color: TEAL + 'CC', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800', lineHeight: 24 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: TEAL + '28', borderWidth: 2, borderColor: TEAL,
    alignItems: 'center', justifyContent: 'center',
  },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1, backgroundColor: '#ffffff14',
    borderRadius: 10, padding: 8,
    borderWidth: 1, borderColor: '#ffffff12', alignItems: 'center',
  },
  statVal: { fontSize: 14, fontWeight: '800' },
  statLabel: { color: '#ffffff77', fontSize: 9, fontWeight: '500', marginTop: 1 },
  quickActions: { padding: 16, paddingBottom: 0, flexDirection: 'row', gap: 10 },
  quickBtn: {
    flex: 1, backgroundColor: '#fff',
    borderWidth: 1.5, borderRadius: 14, padding: 10,
    alignItems: 'center', gap: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  quickLabel: { fontSize: 10, fontWeight: '700' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16, marginTop: 18, marginBottom: 10,
  },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: NAVY },
  sectionSubtitle: { fontSize: 11, color: '#6B7F7A', marginTop: 1 },
  seeAll: { fontSize: 11, color: TEAL, fontWeight: '700' },
  cafeStrip: { paddingLeft: 16, paddingRight: 16, gap: 10 },
  cafeCard: {
    width: 140, backgroundColor: '#fff', borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 10, elevation: 3,
    borderWidth: 1.5, borderColor: TEAL + '22',
  },
  cafeCardImage: {
    height: 72, backgroundColor: '#B2E8DF',
    alignItems: 'center', justifyContent: 'center',
  },
  partnerBadgeSmall: {
    position: 'absolute', top: 6, right: 6,
    backgroundColor: TEAL, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6,
  },
  partnerBadgeSmallText: { color: '#fff', fontSize: 8, fontWeight: '800' },
  cafeCardBody: { padding: 8, paddingHorizontal: 10 },
  cafeCardName: { fontSize: 11, fontWeight: '800', color: NAVY },
  cafeCardInfo: { fontSize: 9, color: '#6B7F7A', marginTop: 1 },
  cafeCardDiscount: {
    marginTop: 6, backgroundColor: '#E6FAF6',
    borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3,
  },
  cafeCardDiscountText: { fontSize: 8, fontWeight: '700', color: TEAL },
  eventsSection: { paddingHorizontal: 16, marginTop: 18 },
  filtersRow: { marginBottom: 12 },
  filterPill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, marginRight: 6 },
  filterText: { fontSize: 11, fontWeight: '700' },
  eventCard: {
    backgroundColor: '#fff', borderRadius: 16,
    flexDirection: 'row', overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
    borderWidth: 1.5, marginBottom: 10,
  },
  eventAccent: {
    width: 52, alignItems: 'center', justifyContent: 'center',
    borderRightWidth: 2,
  },
  eventContent: { flex: 1, padding: 10, paddingHorizontal: 12 },
  eventTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  eventTitle: { fontSize: 12, fontWeight: '800', color: NAVY },
  eventTime: { fontSize: 10, color: '#6B7F7A', marginTop: 1 },
  priceBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 8 },
  priceText: { fontSize: 10, fontWeight: '800' },
  eventBottomRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: 8,
  },
  capacityRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dotsRow: { flexDirection: 'row', gap: 2 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  slotText: { fontSize: 9, color: '#9CA3AF' },
  joinBtn: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  joinBtnText: { fontSize: 10, fontWeight: '700' },
});
