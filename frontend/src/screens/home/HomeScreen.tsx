import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  StatusBar,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const { width: SW } = Dimensions.get('window');
const CARD_W = SW * 0.54;

const PURPLE = '#7C3AED';
const PURPLE_DARK = '#5B21B6';
const BG = '#FAF9FF';

// ── Mock Data ──────────────────────────────────────────────
const NEARBY_STORES = [
  {
    id: 1, name: '공차 인하대후문점', category: '카페',
    bgColor: '#E8F5E9', emoji: '🧋', walkTime: 5, rating: 4.7,
    benefit: '인기메뉴 6종 50% 할인', badges: ['kt'], liked: false,
  },
  {
    id: 2, name: '스타벅스 인하대점', category: '카페',
    bgColor: '#E8F0E8', emoji: '☕', walkTime: 3, rating: 4.6,
    benefit: '1,800원에 아메리카노 1+1', badges: ['삼성Pay', 'kt'], liked: true,
  },
  {
    id: 3, name: '한솔도시락', category: '도시락',
    bgColor: '#FFF8E1', emoji: '🍱', walkTime: 4, rating: 4.3,
    benefit: '국민e혜택 10% 할인', badges: ['국민e혜택'], liked: false,
  },
  {
    id: 4, name: '메가MGC커피', category: '카페',
    bgColor: '#F3E5F5', emoji: '☕', walkTime: 2, rating: 4.5,
    benefit: '아이스 아메리카노 2+1', badges: ['kt'], liked: false,
  },
];

const TDAY_STORES = [
  {
    id: 1, name: '배스킨라빈스', tag: 'T 데이', category: '디저트',
    benefit: 'T 멤버십 고객님이라면, 누구나 레디팩 1+1', rating: 4.8,
    emoji: '🍦', bgColor: '#FCE4EC',
  },
];

const BADGE_STYLE: Record<string, { bg: string; color: string }> = {
  kt:       { bg: '#FF5000', color: '#fff' },
  '삼성Pay': { bg: '#1A73E8', color: '#fff' },
  '국민e혜택':{ bg: '#00A651', color: '#fff' },
};

const SAVINGS = 13700;
const GOAL    = 25000;

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
      Animated.spring(heartScale, { toValue: 1.4, useNativeDriver: true, speed: 60 }),
      Animated.spring(heartScale, { toValue: 1, useNativeDriver: true, speed: 40 }),
    ]).start();
    onToggleLike();
  };

  return (
    <Animated.View style={[styles.storeCard, { transform: [{ scale: pressScale }] }]}>
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
        <View style={[styles.storeImgArea, { backgroundColor: store.bgColor }]}>
          <Text style={styles.storeEmoji}>{store.emoji}</Text>
          <TouchableOpacity style={styles.heartBtn} onPress={handleHeart}>
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={20}
                color={isLiked ? '#EF4444' : '#9CA3AF'}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={styles.storeInfo}>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>🚶 {store.walkTime}분</Text>
            <Text style={styles.metaText}>⭐ {store.rating}</Text>
          </View>
          <Text style={styles.storeName} numberOfLines={1}>{store.name}</Text>
          <Text style={styles.storeCategory}>{store.category}</Text>
          <Text style={styles.storeBenefit} numberOfLines={2}>{store.benefit}</Text>
          <View style={styles.badgeRow}>
            {store.badges.map(b => (
              <View key={b} style={[styles.badge, { backgroundColor: BADGE_STYLE[b]?.bg ?? '#888' }]}>
                <Text style={[styles.badgeText, { color: BADGE_STYLE[b]?.color ?? '#fff' }]}>{b}</Text>
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

  const onPressIn = () =>
    Animated.spring(pressScale, { toValue: 0.97, useNativeDriver: true, speed: 50 }).start();
  const onPressOut = () =>
    Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();

  return (
    <Animated.View style={[styles.tdayCard, { transform: [{ scale: pressScale }] }]}>
      <Pressable style={styles.tdayInner} onPressIn={onPressIn} onPressOut={onPressOut}>
        <View style={[styles.tdayImgArea, { backgroundColor: store.bgColor }]}>
          <View style={styles.tdayLabel}>
            <Text style={styles.tdayLabelTop}>T day</Text>
            <Text style={styles.tdayLabelBot}>레디팩 1+1</Text>
          </View>
          <Text style={styles.tdayEmoji}>{store.emoji}</Text>
        </View>
        <View style={styles.tdayInfo}>
          <View style={styles.tdayNameRow}>
            <Text style={styles.tdayName}>{store.name}</Text>
            <View style={styles.tdayTag}>
              <Text style={styles.tdayTagText}>{store.tag}</Text>
            </View>
          </View>
          <Text style={styles.tdayCategory}>{store.category}</Text>
          <Text style={styles.tdayBenefit} numberOfLines={3}>{store.benefit}</Text>
          <View style={styles.tdayRatingRow}>
            <Text style={styles.tdayRating}>⭐ {store.rating}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// ── HomeScreen ─────────────────────────────────────────────
export default function HomeScreen() {
  const { signOut } = useAuth();

  // Animated values
  const mascotY      = useRef(new Animated.Value(0)).current;
  const mascotRot    = useRef(new Animated.Value(0)).current;
  const headerFade   = useRef(new Animated.Value(0)).current;
  const headerSlide  = useRef(new Animated.Value(-16)).current;
  const cardFade     = useRef(new Animated.Value(0)).current;
  const cardScale    = useRef(new Animated.Value(0.93)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const savingsAnim  = useRef(new Animated.Value(0)).current;
  const sec1Fade     = useRef(new Animated.Value(0)).current;
  const sec1Slide    = useRef(new Animated.Value(24)).current;
  const sec2Fade     = useRef(new Animated.Value(0)).current;
  const sec2Slide    = useRef(new Animated.Value(24)).current;

  const [displayAmt, setDisplayAmt] = useState(0);
  const [likedIds, setLikedIds]     = useState<Set<number>>(
    () => new Set(NEARBY_STORES.filter(s => s.liked).map(s => s.id)),
  );

  useEffect(() => {
    // Mascot float
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotY,   { toValue: -10, duration: 1600, useNativeDriver: true }),
        Animated.timing(mascotY,   { toValue: 0,   duration: 1600, useNativeDriver: true }),
      ]),
    ).start();
    // Mascot sway
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotRot, { toValue:  1, duration: 2200, useNativeDriver: true }),
        Animated.timing(mascotRot, { toValue: -1, duration: 2200, useNativeDriver: true }),
        Animated.timing(mascotRot, { toValue:  0, duration: 2200, useNativeDriver: true }),
      ]),
    ).start();

    // Header slide-in
    Animated.parallel([
      Animated.timing(headerFade,  { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();

    // Savings card pop-in
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(cardFade,  { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, tension: 70, friction: 8 }),
      ]).start();
    }, 200);

    // Count-up + progress bar
    const lid = savingsAnim.addListener(({ value }) => setDisplayAmt(Math.floor(value)));
    setTimeout(() => {
      Animated.timing(savingsAnim,  { toValue: SAVINGS, duration: 2000, useNativeDriver: false }).start();
      Animated.timing(progressAnim, { toValue: 1, duration: 1800, useNativeDriver: false }).start();
    }, 350);

    // Section 1
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(sec1Fade,  { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(sec1Slide, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start();
    }, 550);

    // Section 2
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

        {/* ── Header ── */}
        <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>안녕하세요,</Text>
            <Text style={styles.userName}>김인하님</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={13} color={PURPLE} />
              <Text style={styles.locationText} numberOfLines={1}>인천광역시 미추홀구 인하로 100</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="notifications" size={22} color="#374151" />
                <View style={styles.notiBadge} />
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={16} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
            <Animated.Image
              source={require('../../../assets/수빈.png')}
              style={[styles.mascot, { transform: [{ translateY: mascotY }, { rotate: rotateDeg }] }]}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* ── Search Bar ── */}
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.85}>
          <Ionicons name="search" size={16} color="#9CA3AF" />
          <Text style={styles.searchText}>나에게 딱맞는 혜택 정보 검색</Text>
        </TouchableOpacity>

        {/* ── Savings Card ── */}
        <Animated.View style={[styles.savingsCard, { opacity: cardFade, transform: [{ scale: cardScale }] }]}>
          {/* Decorative bubbles */}
          <View style={[styles.bubble, styles.bubble1]} />
          <View style={[styles.bubble, styles.bubble2]} />
          <View style={[styles.bubble, styles.bubble3]} />

          <Text style={styles.savingsQ}>
            <Text style={styles.savingsName}>김인하</Text>님이 지금까지 절약한 금액은?
          </Text>

          <View style={styles.savingsBody}>
            <Text style={styles.moneyBag}>💰</Text>
            <View style={styles.savingsRight}>
              <View style={styles.progressTrack}>
                <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
              </View>
              <Text style={styles.savingsAmt}>{displayAmt.toLocaleString()}원</Text>
            </View>
          </View>
        </Animated.View>

        {/* ── Nearby Benefits ── */}
        <Animated.View style={{ opacity: sec1Fade, transform: [{ translateY: sec1Slide }] }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>지금 당장! 내 근처 혜택 찾기</Text>
            <TouchableOpacity>
              <Text style={styles.moreBtn}>더보기</Text>
            </TouchableOpacity>
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

        {/* ── T-Day Section ── */}
        <Animated.View style={{ opacity: sec2Fade, transform: [{ translateY: sec2Slide }] }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>오늘은 T 데이! 당신을 위한 혜택</Text>
            <TouchableOpacity>
              <Text style={styles.moreBtn}>더보기</Text>
            </TouchableOpacity>
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
  container: { flex: 1, backgroundColor: BG },

  // Header
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  headerLeft:  { flex: 1, paddingRight: 8 },
  greeting:    { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  userName:    { fontSize: 26, fontWeight: '800', color: '#111827', marginTop: 2, letterSpacing: -0.5 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  locationText:{ fontSize: 12, color: '#6B7280', marginLeft: 3, flex: 1 },
  headerRight: { alignItems: 'flex-end' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  iconBtn:     { position: 'relative', padding: 4 },
  notiBadge:   {
    position: 'absolute', top: 4, right: 4,
    width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444',
    borderWidth: 1.5, borderColor: '#fff',
  },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: PURPLE,
    justifyContent: 'center', alignItems: 'center',
  },
  mascot: { width: 92, height: 92, marginTop: -4 },

  // Search
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20, marginTop: 12, marginBottom: 16,
    borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  searchText: { color: '#9CA3AF', fontSize: 14, marginLeft: 8 },

  // Savings Card
  savingsCard: {
    marginHorizontal: 20, marginBottom: 24,
    backgroundColor: PURPLE_DARK,
    borderRadius: 22, padding: 20, overflow: 'hidden',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  bubble:  { position: 'absolute', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.09)' },
  bubble1: { width: 120, height: 120, top: -40, left: -30 },
  bubble2: { width: 80,  height: 80,  top: 30,  left: 20 },
  bubble3: { width: 160, height: 160, bottom: -70, right: -50 },
  savingsQ:    { color: 'rgba(255,255,255,0.88)', fontSize: 14, fontWeight: '500', zIndex: 1 },
  savingsName: { color: '#FCD34D', fontWeight: '800' },
  savingsBody: { flexDirection: 'row', alignItems: 'center', marginTop: 16, zIndex: 1 },
  moneyBag:    { fontSize: 46 },
  savingsRight:{ flex: 1, marginLeft: 14 },
  progressTrack: {
    height: 8, backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 4, overflow: 'hidden',
  },
  progressFill: { height: 8, backgroundColor: '#F97316', borderRadius: 4 },
  savingsAmt:  {
    color: '#fff', fontSize: 30, fontWeight: '800',
    textAlign: 'right', marginTop: 10, letterSpacing: -0.5,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 14, marginTop: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  moreBtn:      { fontSize: 13, color: PURPLE, fontWeight: '600' },

  // Store Card
  storeScroll: { paddingLeft: 20, paddingRight: 8, gap: 12 },
  storeCard:   {
    width: CARD_W, backgroundColor: '#fff', borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 4,
  },
  storeImgArea: { height: 118, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  storeEmoji:   { fontSize: 50 },
  heartBtn:     { position: 'absolute', top: 10, right: 10, padding: 4 },
  storeInfo:    { padding: 12 },
  metaRow:      { flexDirection: 'row', gap: 8 },
  metaText:     { fontSize: 11, color: '#6B7280' },
  storeName:    { fontSize: 14, fontWeight: '700', color: '#111827', marginTop: 5 },
  storeCategory:{ fontSize: 11, color: '#9CA3AF', marginTop: 1 },
  storeBenefit: { fontSize: 12, color: '#374151', marginTop: 5, lineHeight: 17 },
  badgeRow:     { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 },
  badge:        { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5 },
  badgeText:    { fontSize: 10, fontWeight: '700' },

  // T-Day Card
  tdayCard: {
    marginHorizontal: 20, marginBottom: 14, backgroundColor: '#fff',
    borderRadius: 18, overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  tdayInner:    { flexDirection: 'row' },
  tdayImgArea:  {
    width: 110, justifyContent: 'center', alignItems: 'center', position: 'relative',
  },
  tdayLabel:    {
    position: 'absolute', top: 10, left: 8,
    backgroundColor: '#E60012', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2,
  },
  tdayLabelTop: { color: '#fff', fontSize: 9, fontWeight: '800' },
  tdayLabelBot: { color: '#fff', fontSize: 8, fontWeight: '600' },
  tdayEmoji:    { fontSize: 44, marginTop: 16 },
  tdayInfo:     { flex: 1, padding: 14 },
  tdayNameRow:  { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  tdayName:     { fontSize: 15, fontWeight: '700', color: '#111827' },
  tdayTag:      { backgroundColor: '#FEE2E2', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 5 },
  tdayTagText:  { fontSize: 10, color: '#EF4444', fontWeight: '700' },
  tdayCategory: { fontSize: 11, color: '#9CA3AF', marginTop: 3 },
  tdayBenefit:  { fontSize: 12, color: '#374151', marginTop: 6, lineHeight: 17 },
  tdayRatingRow:{ marginTop: 8 },
  tdayRating:   { fontSize: 12, color: '#6B7280' },
});
