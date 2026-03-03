import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BenePicker</Text>
      <Text style={styles.subtitle}>나에게 맞는 복지 혜택을 찾아보세요</Text>
      {/* TODO: 혜택 목록 추가 */}
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F9FAFB' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#3B82F6', marginTop: 48 },
  subtitle: { fontSize: 16, color: '#6B7280', marginTop: 8 },
  logoutButton: {
    position: 'absolute', bottom: 32, right: 24,
    backgroundColor: '#EF4444', padding: 12, borderRadius: 8,
  },
  logoutText: { color: '#fff', fontWeight: '600' },
});
