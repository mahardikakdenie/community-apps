import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { TEAL } from '@/constants/data';

export default function TabLayout() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: TEAL,
          tabBarInactiveTintColor: '#9CA3AF',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
            paddingBottom: 8,
            paddingTop: 8,
            height: 64,
            marginHorizontal: 16,
            marginBottom: Platform.OS === 'ios' ? 24 : 16,
            borderRadius: 32,
            position: 'absolute',
            elevation: 8,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
            paddingBottom: 4,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Beranda',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Peta',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map-marker" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cafe"
          options={{
            title: 'Hangout',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="coffee" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tickets"
          options={{
            title: 'Tiket',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="ticket-confirmation" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
