import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const { width: SW } = Dimensions.get('window');
const CARD_W = SW * 0.50;
const PURPLE = '#7C3AED';
const CARD_BG = '#3730A3';
const SAVINGS = 13700;
const GOAL = 25000;

// ── Mock Data ──────────────────────────────────────────────
const NEARBY_STORES = [
  {
    id: 1,
    name: '공차 인하대후문점',
    category: '카페',
    bgColor: '#2A1F3D',
    brandText: 'Gong cha',
    brandTextColor: '#FFFFFF',
    walkTime: 5,
    rating: 4.7,
    benefit: '인기메뉴 6종 50% 할인',
    badges: [{ label: 'kt', bg: '#FF5000', color: '#fff' }],
    liked: false,
  },
  {
    id: 2,
    name: '스타벅스 인하대점',
    category: '카페',
    bgColor: '#1E3932',
    brandText: 'STARBUCKS',
    brandTextColor: '#FFFFFF',
    walkTime: 3,
    rating: 4.6,
    benefit: '1,800원에 아메리카노 1+1',
    badges: [
      { label: '삼성Pay', bg: '#1428A0', color: '#fff' },
      { label: 'kt', bg: '#FF5000', color: '#fff' },
    ],
    liked: true,
  },
  {
    id: 3,
    name: '한솔도시락',
    category: '도시락',
    bgColor: '#1A3A5C',
    brandText: '한솔도시락',
    brandTextColor: '#FFFFFF',
    walkTime: 4,
    rating: 4.3,
    benefit: '국민e혜택 10% 할인',
    badges: [{ label: '국민e혜택', bg: '#00A651', color: '#fff' }],
    liked: false,
  },
  {
    id: 4,
    name: '메가MGC커피',
    category: '카페',
    bgColor: '#1B1B2F',
    brandText: 'MEGA COFFEE',
    brandTextColor: '#FFD700',
    walkTime: 2,
    rating: 4.5,
    benefit: '아이스 아메리카노 2+1',
    badges: [{ label: 'kt', bg: '#FF5000', color: '#fff' }],
    liked: false,
  },
];

const TDAY_STORES = [
  {
    id: 1,
    name: '배스킨라빈스',
    tag: 'T 데이',
    category: '카페',
    benefit: 'T 멤버십 고객님이라면, 누구나 레디팩 1+1',
    rating: 4.8,
  },
];

// ── StoreCard ──────────────────────────────────────────────
function StoreCard({
  store,
  isLiked,
  onToggleLike,
}: {
  store: (typeof NEARBY_STORES)[0];
  isLiked: boolean;
  onToggleLike: () => void;
}) {
  const pressScale = useRef(new Animated.Value(1)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(pressScale, { toValue: 0.95, useNativeDriver: true, speed: 50 }).start();
  const onPressOut = () =>
    Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();

  const handleHeart = () => {
    Animated.sequence([
      Animated.spring(heartScale, { toValue: 1.5, useNativeDriver: true, speed: 60 }),
      Animated.spring(heartScale, { toValue: 1, useNativeDriver: true, speed: 40 }),
    ]).start();
    onToggleLike();
  };

  return (
    <Animated.View style={[styles.storeCard, { transform: [{ scale: pressScale }] }]}>
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
        {/* 매장 이미지 영역 */}
        <View style={[styles.storeImgArea, { backgroundColor: store.bgColor }]}>
          <View style={styles.storeImgOverlay} />
          <Text style={[styles.storeBrandText, { color: store.brandTextColor }]}>
            {store.brandText}
          </Text>
          <TouchableOpacity style={styles.heartBtn} onPress={handleHeart}>
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={20}
                color={isLiked ? '#EF4444' : 'rgba(255,255,255,0.85)'}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* 매장 정보 */}
        <View style={styles.storeInfo}>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>🚶 {store.walkTime}분</Text>
            <Text style={styles.metaText}>⭐ {store.rating}</Text>
          </View>
          <Text style={styles.storeName} numberOfLines={1}>
            {store.name}
          </Text>
          <Text style={styles.storeCategory}>{store.category}</Text>
          <Text style={styles.storeBenefit} numberOfLines={2}>
            {store.benefit}
          </Text>
          <View style={styles.badgeRow}>
            {store.badges.map(b => (
              <View key={b.label} style={[styles.badge, { backgroundColor: b.bg }]}>
                <Text style={[styles.badgeText, { color: b.color }]}>{b.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// ── TDayCard ───────────────────────────────────────────────
function TDayCard({ store }: { store: (typeof TDAY_STORES)[0] }) {
  const pressScale = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={[styles.tdayCard, { transform: [{ scale: pressScale }] }]}>
      <Pressable
        style={styles.tdayInner}
        onPressIn={() =>
          Animated.spring(pressScale, { toValue: 0.97, useNativeDriver: true, speed: 50 }).start()
        }
        onPressOut={() =>
          Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start()
        }
      >
        {/* 좌측 T데이 이미지 영역 */}
        <View style={styles.tdayImgArea}>
          <View style={styles.tdayLogoRow}>
            <Text style={styles.tdayLogoText}>T day</Text>
            <Text style={styles.tdayHeart}> ♥</Text>
          </View>
          <Text style={styles.tdaySubLabel}>레디팩 1+1</Text>
          <Text style={styles.tdayEmoji}>🍦</Text>
        </View>

        {/* 우측 정보 */}
        <View style={styles.tdayInfo}>
          <View style={styles.tdayNameRow}>
            <Text style={styles.tdayName}>{store.name} </Text>
            <Text style={styles.tdayTag}>[{store.tag}]</Text>
            <Text style={styles.tdayCategory}> {store.category}</Text>
          </View>
          <Text style={styles.tdayBenefit} numberOfLines={3}>
            {store.benefit}
          </Text>
          <Text style={styles.tdayRating}>⭐ {store.rating}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// ── HomeScreen ─────────────────────────────────────────────
export default function HomeScreen() {
  const { signOut } = useAuth();

  const mascotY     = useRef(new Animated.Value(0)).current;
  const mascotRot   = useRef(new Animated.Value(0)).current;
  const headerFade  = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-14)).current;
  const cardFade    = useRef(new Animated.Value(0)).current;
  const cardScale   = useRef(new Animated.Value(0.93)).current;
  const progressAnim= useRef(new Animated.Value(0)).current;
  const savingsAnim = useRef(new Animated.Value(0)).current;
  const sec1Fade    = useRef(new Animated.Value(0)).current;
  const sec1Slide   = useRef(new Animated.Value(20)).current;
  const sec2Fade    = useRef(new Animated.Value(0)).current;
  const sec2Slide   = useRef(new Animated.Value(20)).current;

  const [displayAmt, setDisplayAmt] = useState(0);
  const [likedIds, setLikedIds] = useState<Set<number>>(
    () => new Set(NEARBY_STORES.filter(s => s.liked).map(s => s.id)),
  );

  useEffect(() => {
    // 마스코트 떠다니기
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotY,  { toValue: -10, duration: 1600, useNativeDriver: true }),
        Animated.timing(mascotY,  { toValue: 0,   duration: 1600, useNativeDriver: true }),
      ]),
    ).start();

    // 마스코트 흔들기
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotRot, { toValue:  1, duration: 2200, useNativeDriver: true }),
        Animated.timing(mascotRot, { toValue: -1, duration: 2200, useNativeDriver: true }),
        Animated.timing(mascotRot, { toValue:  0, duration: 2200, useNativeDriver: true }),
      ]),
    ).start();

    // 헤더 슬라이드인
    Animated.parallel([
      Animated.timing(headerFade,  { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();

    // 절약 카드 팝인
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(cardFade,  { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, tension: 70, friction: 8 }),
      ]).start();
    }, 200);

    // 카운트업 + 프로그레스바
    const lid = savingsAnim.addListener(({ value }) => setDisplayAmt(Math.floor(value)));
    setTimeout(() => {
      Animated.timing(savingsAnim,   { toValue: SAVINGS, duration: 2000, useNativeDriver: false }).start();
      Animated.timing(progressAnim,  { toValue: 1,       duration: 1800, useNativeDriver: false }).start();
    }, 350);

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(sec1Fade,  { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(sec1Slide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start();
    }, 550);

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(sec2Fade,  { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(sec2Slide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start();
    }, 750);

    return () => savingsAnim.removeListener(lid);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: ['0%', `${Math.round((SAVINGS / GOAL) * 100)}%`],
  });

  const rotateDeg = mascotRot.interpolate({
    inputRange:  [-1, 0, 1],
    outputRange: ['-4deg', '0deg', '4deg'],
  });

  const toggleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false} bounces>

        {/* ── 헤더 ── */}
        <Animated.View
          style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}
        >
          {/* 왼쪽: 인사 + 위치 */}
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>안녕하세요,</Text>
            <Text style={styles.userName}>김인하님</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={13} color={PURPLE} />
              <Text style={styles.locationText} numberOfLines={1}>
                인천광역시 미추홀구 인하로 100
              </Text>
            </View>
          </View>

          {/* 오른쪽: 아이콘 + 마스코트 */}
          <View style={styles.headerRight}>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.bellWrap}>
                <Ionicons name="notifications" size={23} color="#374151" />
                <View style={styles.notiBadge} />
              </TouchableOpacity>
              <View style={styles.avatar} />
            </View>
            <Animated.Image
              source={require('../../../assets/캐릭터.png')}
              style={[
                styles.mascot,
                { transform: [{ translateY: mascotY }, { rotate: rotateDeg }] },
              ]}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* ── 검색바 ── */}
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.85}>
          <Ionicons name="search" size={15} color="#9CA3AF" />
          <Text style={styles.searchText}>나에게 딱맞는 혜택 정보 검색</Text>
        </TouchableOpacity>

        {/* ── 절약 카드 ── */}
        <Animated.View
          style={[styles.savingsCard, { opacity: cardFade, transform: [{ scale: cardScale }] }]}
        >
          <View style={[styles.bubble, styles.bubble1]} />
          <View style={[styles.bubble, styles.bubble2]} />

          <Text style={styles.savingsQ}>
            <Text style={styles.savingsName}>김인하</Text>
            <Text style={styles.savingsQText}> 님이 지금까지 절약한 금액은?</Text>
          </Text>

          <View style={styles.savingsBody}>
            <Text style={styles.moneyBag}>💰</Text>
            <View style={styles.savingsRight}>
              <View style={styles.progressTrack}>
                <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
              </View>
              <Text style={styles.savingsAmt}>
                {displayAmt.toLocaleString()}원
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* ── 주변 혜택 ── */}
        <Animated.View style={{ opacity: sec1Fade, transform: [{ translateY: sec1Slide }] }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>지금 당장! 내 근처 혜택 찾기</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storeScroll}
          >
            {NEARBY_STORES.map(store => (
              <StoreCard
                key={store.id}
                store={store}
                isLiked={likedIds.has(store.id)}
                onToggleLike={() => toggleLike(store.id)}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* ── T데이 ── */}
        <Animated.View style={{ opacity: sec2Fade, transform: [{ translateY: sec2Slide }] }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>오늘은 T 데이! 당신을 위한 혜택</Text>
          </View>
          {TDAY_STORES.map(store => (
            <TDayCard key={store.id} store={store} />
          ))}
        </Animated.View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // 헤더
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  headerLeft: { flex: 1, paddingRight: 8, paddingBottom: 4 },
  greeting:   { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  userName:   {
    fontSize: 28, fontWeight: '800', color: '#111827',
    marginTop: 2, letterSpacing: -0.5,
  },
  locationRow:  { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  locationText: { fontSize: 12, color: '#6B7280', marginLeft: 3, flex: 1 },

  // 헤더 우측
  headerRight: {
    alignItems: 'center',
    marginBottom: -24, // 마스코트가 검색바 위로 살짝 겹치도록
  },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 2 },
  bellWrap: { position: 'relative', padding: 2 },
  notiBadge: {
    position: 'absolute', top: 2, right: 2,
    width: 9, height: 9, borderRadius: 5,
    backgroundColor: '#EF4444', borderWidth: 1.5, borderColor: '#fff',
  },
  avatar: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#D1D5DB',
  },
  mascot: { width: 108, height: 108 },

  // 검색바
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, marginTop: 12, marginBottom: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 13,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  searchText: { color: '#9CA3AF', fontSize: 14, marginLeft: 8 },

  // 절약 카드
  savingsCard: {
    marginHorizontal: 16, marginBottom: 24,
    backgroundColor: CARD_BG,
    borderRadius: 16, padding: 18,
    overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
    shadowColor: CARD_BG,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  bubble:  { position: 'absolute', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.07)' },
  bubble1: { width: 150, height: 150, top: -55, right: -35 },
  bubble2: { width: 90,  height: 90,  bottom: -40, left: 20 },
  savingsQ:     { marginBottom: 16, zIndex: 1 },
  savingsName:  { color: '#FCD34D', fontWeight: '800', fontSize: 15 },
  savingsQText: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '500' },
  savingsBody:  { flexDirection: 'row', alignItems: 'center', zIndex: 1 },
  moneyBag:     { fontSize: 52, marginRight: 14 },
  savingsRight: { flex: 1 },
  progressTrack: {
    height: 12, backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 6, overflow: 'hidden',
  },
  progressFill:  { height: 12, backgroundColor: '#EF4444', borderRadius: 6 },
  savingsAmt: {
    color: '#fff', fontSize: 28, fontWeight: '800',
    textAlign: 'right', marginTop: 10, letterSpacing: -0.5,
  },

  // 섹션 헤더
  sectionHeader: { paddingHorizontal: 20, marginBottom: 12, marginTop: 4 },
  sectionTitle:  { fontSize: 15, fontWeight: '700', color: '#111827' },

  // 가게 카드
  storeScroll: { paddingLeft: 20, paddingRight: 8, gap: 10 },
  storeCard: {
    width: CARD_W, backgroundColor: '#fff', borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 4,
  },
  storeImgArea: {
    height: 115, justifyContent: 'flex-end',
    alignItems: 'flex-start', padding: 10,
    position: 'relative',
  },
  storeImgOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 55,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  storeBrandText: { fontSize: 17, fontWeight: '800', letterSpacing: 0.3, zIndex: 1 },
  heartBtn: { position: 'absolute', top: 8, right: 8, padding: 4, zIndex: 2 },
  storeInfo:     { padding: 10 },
  metaRow:       { flexDirection: 'row', gap: 8 },
  metaText:      { fontSize: 11, color: '#6B7280' },
  storeName:     { fontSize: 13, fontWeight: '700', color: '#111827', marginTop: 5 },
  storeCategory: { fontSize: 10, color: '#9CA3AF', marginTop: 1 },
  storeBenefit:  { fontSize: 11, color: '#374151', marginTop: 4, lineHeight: 16 },
  badgeRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 7 },
  badge:         { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText:     { fontSize: 10, fontWeight: '700' },

  // T데이 카드
  tdayCard: {
    marginHorizontal: 16, marginBottom: 14,
    backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tdayInner:    { flexDirection: 'row', minHeight: 110 },
  tdayImgArea:  {
    width: 110, backgroundColor: '#FFE4E8',
    justifyContent: 'center', alignItems: 'center', padding: 10,
  },
  tdayLogoRow:  { flexDirection: 'row', alignItems: 'center' },
  tdayLogoText: { fontSize: 13, fontWeight: '900', color: '#E60012' },
  tdayHeart:    { fontSize: 13, color: '#E60012' },
  tdaySubLabel: { fontSize: 10, fontWeight: '700', color: '#E60012', marginTop: 3, marginBottom: 8 },
  tdayEmoji:    { fontSize: 36 },
  tdayInfo:     { flex: 1, padding: 12, justifyContent: 'center' },
  tdayNameRow:  { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 },
  tdayName:     { fontSize: 14, fontWeight: '700', color: '#111827' },
  tdayTag:      { fontSize: 13, fontWeight: '700', color: '#E60012' },
  tdayCategory: { fontSize: 11, color: '#6B7280' },
  tdayBenefit:  { fontSize: 12, color: '#374151', lineHeight: 17, marginBottom: 6 },
  tdayRating:   { fontSize: 12, color: '#6B7280' },
});
