import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { TEAL, NAVY, LIGHT, cafes } from '@/constants/data';

type CafeType = typeof cafes[number];

export default function CafeScreen() {
  const [filter, setFilter] = useState<'all' | 'partner' | 'non-partner'>('all');
  const [selected, setSelected] = useState<CafeType | null>(null);
  const [myCheckIn, setMyCheckIn] = useState<number | null>(null);

  const displayed =
    filter === 'partner'
      ? cafes.filter((c) => c.partner)
      : filter === 'non-partner'
      ? cafes.filter((c) => !c.partner)
      : cafes;

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1B3A5C', NAVY]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <Text style={styles.headerTitle}>Hangout Cafe ☕</Text>
        <Text style={styles.headerSubtitle}>Temukan tempat nongkrong terbaik di Jakarta</Text>

        {/* Filter tabs */}
        <View style={styles.filterTabsContainer}>
          {([
            { key: 'all' as const, label: 'Semua' },
            { key: 'partner' as const, label: '🤝 Mitra HJP' },
            { key: 'non-partner' as const, label: 'Umum' },
          ]).map((opt) => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => setFilter(opt.key)}
              style={[
                styles.filterTab,
                filter === opt.key
                  ? styles.filterTabActive
                  : styles.filterTabInactive,
              ]}
            >
              <Text
                style={[
                  styles.filterTabText,
                  { color: filter === opt.key ? NAVY : '#ffffff99' },
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: TEAL }]} />
          <Text style={styles.legendText}>Mitra Resmi HJP</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#D1D5DB' }]} />
          <Text style={styles.legendText}>Cafe Umum</Text>
        </View>
        <Text style={styles.legendCount}>{displayed.length} tempat</Text>
      </View>

      {/* Cafe list */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {displayed.map((cafe) => (
          <TouchableOpacity
            key={cafe.id}
            onPress={() => setSelected(cafe)}
            activeOpacity={0.8}
            style={[
              styles.cafeCard,
              {
                borderColor: cafe.partner ? TEAL + '44' : '#E5E7EB',
              },
            ]}
          >
            {/* Image area */}
            <View style={styles.cafeImageContainer}>
              <Image
                source={{ uri: cafe.img }}
                style={styles.cafeImage}
                contentFit="cover"
              />
              {cafe.partner ? (
                <View style={styles.partnerBadge}>
                  <Text style={styles.partnerBadgeText}>🤝 MITRA RESMI HJP</Text>
                </View>
              ) : (
                <View style={styles.umumBadge}>
                  <Text style={styles.umumBadgeText}>CAFE UMUM</Text>
                </View>
              )}
              <View style={styles.ratingPill}>
                <Text style={styles.ratingPillText}>⭐ {cafe.rating}</Text>
              </View>
            </View>

            {/* Body */}
            <View style={styles.cafeBody}>
              <View style={styles.cafeBodyTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cafeName}>{cafe.name}</Text>
                  <Text style={styles.cafeType}>{cafe.type} · {cafe.area}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.cafeDistance}>{cafe.distance}</Text>
                  <Text style={styles.cafeHours}>{cafe.hours}</Text>
                </View>
              </View>

              {/* Members Count */}
              <View style={styles.memberCountRow}>
                <Text style={styles.memberCountText}>
                  👤 {(cafe.membersHere ? cafe.membersHere.length : 0) + (myCheckIn === cafe.id ? 1 : 0)} Member di sini
                </Text>
              </View>

              {/* Tags */}
              <View style={styles.tagsRow}>
                {cafe.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Discount banner */}
              {cafe.partner && cafe.discount && (
                <View style={styles.discountBanner}>
                  <Text style={{ fontSize: 14 }}>🎁</Text>
                  <View>
                    <Text style={styles.discountText}>{cafe.discount}</Text>
                    <Text style={styles.discountSubtext}>Tunjukkan member card HJP</Text>
                  </View>
                </View>
              )}

              {/* Events hosted */}
              {cafe.partner && cafe.events.length > 0 && (
                <View style={styles.eventsHosted}>
                  <Text style={{ fontSize: 10 }}>📅</Text>
                  <Text style={styles.eventsHostedText}>
                    Host: {cafe.events.join(', ')}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Become a partner CTA */}
        <LinearGradient
          colors={[NAVY, '#1B3A5C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>Punya Cafe? Jadi Mitra HJP! 🚀</Text>
            <Text style={styles.ctaSubtitle}>Jangkau 10.000+ member komunitas Jakarta</Text>
          </View>
          <TouchableOpacity style={styles.ctaBtn}>
            <Text style={styles.ctaBtnText}>Daftar</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Cafe detail modal */}
      <Modal visible={selected !== null} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelected(null)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <View style={styles.sheetHandle} />

            {selected && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Detail header */}
                <View style={styles.detailHeader}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.detailNameRow}>
                      <Text style={styles.detailName}>{selected.name}</Text>
                      {selected.partner && (
                        <View style={styles.mitraBadge}>
                          <Text style={styles.mitraBadgeText}>MITRA ✓</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.detailType}>{selected.type} · {selected.area}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.detailRating}>⭐ {selected.rating}</Text>
                    <Text style={styles.detailReviews}>{selected.reviews} ulasan</Text>
                  </View>
                </View>

                {/* Members Here Section */}
                <View style={styles.membersSection}>
                  <Text style={styles.membersSectionTitle}>Member di Sini</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.membersScroll}>
                    {myCheckIn === selected.id && (
                      <View style={styles.memberAvatarWrapper}>
                        <View style={[styles.memberAvatar, { borderColor: TEAL, borderWidth: 2 }]}>
                          <Text style={{ fontSize: 18 }}>🧑‍💻</Text>
                        </View>
                        <Text style={styles.memberName}>Kamu</Text>
                      </View>
                    )}
                    {selected.membersHere?.map((m) => (
                      <View key={m.id} style={styles.memberAvatarWrapper}>
                        <View style={styles.memberAvatar}>
                          <Text style={{ fontSize: 18 }}>{m.emoji}</Text>
                        </View>
                        <Text style={styles.memberName}>{m.name}</Text>
                      </View>
                    ))}
                    {(!selected.membersHere?.length && myCheckIn !== selected.id) && (
                      <Text style={styles.emptyMembersText}>Belum ada member di sini.</Text>
                    )}
                  </ScrollView>
                  <TouchableOpacity
                    style={[
                      styles.checkInBtn,
                      myCheckIn === selected.id ? styles.checkInBtnActive : styles.checkInBtnInactive
                    ]}
                    onPress={() => setMyCheckIn(myCheckIn === selected.id ? null : selected.id)}
                  >
                    <Text style={[
                      styles.checkInBtnText,
                      { color: myCheckIn === selected.id ? TEAL : '#fff' }
                    ]}>
                      {myCheckIn === selected.id ? 'Keluar dari Sini' : '📍 Check-in di Sini'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Info grid */}
                <View style={styles.infoGrid}>
                  {[
                    { icon: '🕒', label: 'Jam Buka', val: selected.hours },
                    { icon: '📍', label: 'Jarak', val: selected.distance },
                    { icon: '🪑', label: 'Kapasitas', val: `${selected.capacity} kursi` },
                    { icon: '⭐', label: 'Rating', val: `${selected.rating} (${selected.reviews})` },
                  ].map((info) => (
                    <View key={info.label} style={styles.infoCard}>
                      <Text style={{ fontSize: 12, marginBottom: 2 }}>{info.icon}</Text>
                      <Text style={styles.infoLabel}>{info.label}</Text>
                      <Text style={styles.infoVal}>{info.val}</Text>
                    </View>
                  ))}
                </View>

                {/* Partner benefit */}
                {selected.partner && selected.discount && (
                  <View style={styles.benefitCard}>
                    <Text style={styles.benefitTitle}>🎁 Benefit Member HJP</Text>
                    <Text style={styles.benefitDiscount}>{selected.discount}</Text>
                    <Text style={styles.benefitNote}>
                      Tunjukkan Digital Member Card kamu saat checkout
                    </Text>
                  </View>
                )}

                {/* Non-partner note */}
                {!selected.partner && (
                  <View style={styles.nonPartnerNote}>
                    <Text style={styles.nonPartnerText}>
                      ⚠️ Cafe ini belum bermitra dengan komunitas HJP. Tidak ada diskon eksklusif yang tersedia.
                    </Text>
                  </View>
                )}

                {/* Tags */}
                <View style={styles.detailTags}>
                  {selected.tags.map((tag) => (
                    <View key={tag} style={styles.detailTag}>
                      <Text style={styles.detailTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[
                    styles.mapsBtn,
                    { backgroundColor: selected.partner ? TEAL : '#6B7280' },
                  ]}
                >
                  <Text style={styles.mapsBtnText}>
                    {selected.partner ? '🗺️ Buka di Maps' : '🗺️ Lihat Lokasi'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT },
  header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  headerSubtitle: { color: '#ffffff88', fontSize: 12 },
  filterTabsContainer: {
    flexDirection: 'row', gap: 6, marginTop: 14,
    backgroundColor: '#ffffff14', borderRadius: 12, padding: 4,
  },
  filterTab: { flex: 1, paddingVertical: 7, borderRadius: 9, alignItems: 'center' },
  filterTabActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  filterTabInactive: { backgroundColor: 'transparent' },
  filterTabText: { fontSize: 11, fontWeight: '700' },
  legend: {
    flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EAF3EF',
    alignItems: 'center',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 10, fontWeight: '600', color: '#4B5563' },
  legendCount: { marginLeft: 'auto', fontSize: 10, color: '#9CA3AF' },
  list: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  cafeCard: {
    backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
    borderWidth: 1.5, marginBottom: 10,
  },
  cafeImageContainer: { height: 180, backgroundColor: '#B2E8DF', overflow: 'hidden' },
  cafeImage: { width: '100%', height: '100%' },
  partnerBadge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: TEAL, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
    flexDirection: 'row', alignItems: 'center', gap: 3,
    shadowColor: TEAL, shadowOpacity: 0.4, shadowRadius: 8, elevation: 3,
  },
  partnerBadgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },
  umumBadge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: '#6B7280CC', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  umumBadgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  ratingPill: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: '#000000AA', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8,
  },
  ratingPillText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  cafeBody: { padding: 10, paddingHorizontal: 14, paddingBottom: 12 },
  cafeBodyTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cafeName: { fontSize: 13, fontWeight: '800', color: NAVY },
  cafeType: { fontSize: 10, color: '#6B7F7A', marginTop: 1 },
  cafeDistance: { fontSize: 11, fontWeight: '700', color: TEAL },
  cafeHours: { fontSize: 9, color: '#9CA3AF', marginTop: 1 },
  tagsRow: { flexDirection: 'row', gap: 5, marginTop: 8, flexWrap: 'wrap' },
  tag: { backgroundColor: '#F3F4F6', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  tagText: { color: '#4B5563', fontSize: 9, fontWeight: '600' },
  discountBanner: {
    marginTop: 9, backgroundColor: '#E6FAF6', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: '#B2E8DF',
  },
  discountText: { fontSize: 10, fontWeight: '800', color: TEAL },
  discountSubtext: { fontSize: 9, color: '#6B9E96' },
  eventsHosted: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 5 },
  eventsHostedText: { fontSize: 9, color: '#4B5563', fontWeight: '600' },
  ctaCard: {
    borderRadius: 16, padding: 16, marginTop: 4, marginBottom: 16,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: TEAL + '55', borderStyle: 'dashed',
  },
  ctaTitle: { fontSize: 12, fontWeight: '800', color: '#fff' },
  ctaSubtitle: { fontSize: 10, color: '#ffffff77', marginTop: 3 },
  ctaBtn: {
    backgroundColor: TEAL, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  ctaBtnText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  modalOverlay: {
    flex: 1, backgroundColor: '#00000055',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22,
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32,
    maxHeight: '75%',
  },
  sheetHandle: {
    width: 36, height: 4, backgroundColor: '#E5E7EB',
    borderRadius: 2, alignSelf: 'center', marginBottom: 14,
  },
  detailHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 12,
  },
  detailNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailName: { fontSize: 18, fontWeight: '800', color: NAVY },
  mitraBadge: { backgroundColor: TEAL, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  mitraBadgeText: { color: '#fff', fontSize: 8, fontWeight: '800' },
  detailType: { fontSize: 12, color: '#6B7F7A', marginTop: 2 },
  detailRating: { fontSize: 14, fontWeight: '800', color: '#F59E0B' },
  detailReviews: { fontSize: 10, color: '#9CA3AF' },
  infoGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12,
  },
  infoCard: {
    width: '47%', backgroundColor: '#F9FAFB', borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 8,
  },
  infoLabel: { fontSize: 9, color: '#9CA3AF', fontWeight: '600' },
  infoVal: { fontSize: 11, fontWeight: '700', color: NAVY },
  benefitCard: {
    backgroundColor: '#E6FAF6', borderRadius: 12, padding: 12,
    borderWidth: 1.5, borderColor: '#B2E8DF', marginBottom: 12,
  },
  benefitTitle: { fontSize: 11, fontWeight: '800', color: TEAL, marginBottom: 4 },
  benefitDiscount: { fontSize: 13, fontWeight: '700', color: NAVY },
  benefitNote: { fontSize: 10, color: '#6B9E96', marginTop: 3 },
  nonPartnerNote: {
    backgroundColor: '#FFF8E1', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10,
    borderWidth: 1.5, borderColor: '#FBBF2444', marginBottom: 12,
  },
  nonPartnerText: { fontSize: 10, fontWeight: '700', color: '#92400E' },
  detailTags: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 16 },
  detailTag: { backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  detailTagText: { color: '#374151', fontSize: 11, fontWeight: '600' },
  mapsBtn: {
    width: '100%', padding: 13, borderRadius: 14, alignItems: 'center',
  },
  mapsBtnText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  memberCountRow: { marginTop: 8, flexDirection: 'row', alignItems: 'center' },
  memberCountText: { fontSize: 10, fontWeight: '700', color: NAVY },
  membersSection: { marginBottom: 16, backgroundColor: '#F9FAFB', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  membersSectionTitle: { fontSize: 12, fontWeight: '800', color: NAVY, marginBottom: 8 },
  membersScroll: { flexDirection: 'row', marginBottom: 12 },
  memberAvatarWrapper: { alignItems: 'center', marginRight: 12 },
  memberAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  memberName: { fontSize: 10, fontWeight: '600', color: '#4B5563' },
  emptyMembersText: { fontSize: 11, color: '#9CA3AF', fontStyle: 'italic' },
  checkInBtn: { paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1.5 },
  checkInBtnInactive: { backgroundColor: TEAL, borderColor: TEAL },
  checkInBtnActive: { backgroundColor: '#E6FAF6', borderColor: TEAL },
  checkInBtnText: { fontSize: 12, fontWeight: '800' },
});
