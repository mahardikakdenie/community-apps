import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { TEAL, NAVY, LIGHT, ticketsData } from '@/constants/data';

export default function TicketsScreen() {
  const [activeTicket, setActiveTicket] = useState<number | null>(null);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerSection}>
        <Text style={styles.pageTitle}>Tiket Saya</Text>
        <Text style={styles.pageSubtitle}>2 event aktif minggu ini</Text>
      </View>

      <View style={styles.ticketsList}>
        {ticketsData.map((t) => {
          const open = activeTicket === t.id;
          return (
            <View
              key={t.id}
              style={[
                styles.ticketCard,
                { borderColor: open ? t.color : 'transparent' },
              ]}
            >
              {/* Ticket header */}
              <TouchableOpacity
                onPress={() => setActiveTicket(open ? null : t.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[t.color, t.color]}
                  style={styles.ticketHeader}
                >
                  <View style={styles.ticketHeaderContent}>
                    <View style={styles.ticketHeaderLeft}>
                      <Text style={{ fontSize: 26 }}>{t.emoji}</Text>
                      <View>
                        <Text style={styles.ticketTitle}>{t.title}</Text>
                        <Text style={styles.ticketDate}>{t.date}</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            t.status === 'Confirmed' ? '#fff' : '#ffffff44',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color:
                              t.status === 'Confirmed' ? t.color : '#fff',
                          },
                        ]}
                      >
                        {t.status === 'Confirmed' ? '✓ Confirmed' : '⏳ Pending'}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Ticket body */}
              <View style={styles.ticketBody}>
                <View style={styles.ticketInfoRow}>
                  <View>
                    <Text style={styles.ticketInfoLabel}>Waktu</Text>
                    <Text style={styles.ticketInfoVal}>{t.time}</Text>
                  </View>
                  <View>
                    <Text style={styles.ticketInfoLabel}>Venue</Text>
                    <Text style={styles.ticketInfoVal}>{t.venue}</Text>
                  </View>
                </View>

                {/* QR section (expanded) */}
                {open && (
                  <View style={styles.qrSection}>
                    <View style={styles.qrContainer}>
                      <View style={styles.qrGrid}>
                        {Array.from({ length: 49 }).map((_, i) => (
                          <View
                            key={i}
                            style={[
                              styles.qrCell,
                              {
                                backgroundColor: [
                                  0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 20, 21, 27,
                                  28, 34, 35, 41, 42, 43, 44, 45, 46, 47, 48,
                                ].includes(i)
                                  ? t.color
                                  : i % 3 === 0
                                  ? '#1F2937'
                                  : 'transparent',
                              },
                            ]}
                          />
                        ))}
                      </View>
                      <Text style={styles.qrCode}>{t.code}</Text>
                      <Text style={styles.qrHint}>
                        Tunjukkan QR ini saat check-in
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          );
        })}

        {/* Member benefit card */}
        <LinearGradient
          colors={[TEAL, '#00967A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.benefitCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.benefitLabel}>MEMBER BENEFIT</Text>
            <Text style={styles.benefitTitle}>Diskon di Cafe Partner 🤝</Text>
            <Text style={styles.benefitSubtitle}>24 cafe mitra se-Jakarta</Text>
          </View>
          <Text style={{ fontSize: 28 }}>☕</Text>
        </LinearGradient>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT },
  headerSection: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 8 },
  pageTitle: { fontSize: 22, fontWeight: '800', color: NAVY },
  pageSubtitle: { fontSize: 13, color: '#6B7F7A', marginTop: 2 },
  ticketsList: { paddingHorizontal: 16, gap: 10, paddingBottom: 24 },
  ticketCard: {
    backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 12, elevation: 3,
    borderWidth: 2,
  },
  ticketHeader: { padding: 14, paddingHorizontal: 16 },
  ticketHeaderContent: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
  },
  ticketHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ticketTitle: { fontSize: 14, fontWeight: '800', color: '#fff' },
  ticketDate: { fontSize: 11, color: '#ffffff99', marginTop: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  statusText: { fontSize: 10, fontWeight: '700' },
  ticketBody: { padding: 10, paddingHorizontal: 16 },
  ticketInfoRow: { flexDirection: 'row', gap: 20, marginBottom: 6 },
  ticketInfoLabel: { fontSize: 9, color: '#9CA3AF' },
  ticketInfoVal: { fontSize: 12, fontWeight: '700', color: NAVY },
  qrSection: { marginTop: 10 },
  qrContainer: {
    backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12,
    alignItems: 'center', gap: 6,
  },
  qrGrid: {
    width: 90, height: 90,
    flexDirection: 'row', flexWrap: 'wrap', gap: 1.5,
    padding: 4, backgroundColor: '#fff', borderRadius: 8,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  qrCell: { width: 10, height: 10, borderRadius: 1 },
  qrCode: { fontSize: 10, fontWeight: '700', color: '#4B5563', letterSpacing: 2 },
  qrHint: { fontSize: 9, color: '#9CA3AF' },
  benefitCard: {
    borderRadius: 16, padding: 14, paddingHorizontal: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  benefitLabel: { fontSize: 9, color: '#ffffff99', fontWeight: '700', letterSpacing: 1 },
  benefitTitle: { fontSize: 13, fontWeight: '800', color: '#fff', marginTop: 2 },
  benefitSubtitle: { fontSize: 10, color: '#ffffffCC', marginTop: 3 },
});
