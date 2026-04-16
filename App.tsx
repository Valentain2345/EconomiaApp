import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const MOCK_ROOMS = [
  { id: '1', name: 'Chill Vibes', creator: 'DJ Luna', listeners: 24, genre: 'Lo-Fi', track: 'Lofi Girl - Snowman' },
  { id: '2', name: 'Late Night Drive', creator: 'WaveRider', listeners: 18, genre: 'Synthwave', track: 'The Midnight - Los Angeles' },
  { id: '3', name: 'House Nation', creator: 'DeepSoul', listeners: 42, genre: 'Deep House', track: 'Lane 8 - Fingerprint' },
  { id: '4', name: 'Indie Corner', creator: 'MelodyMaker', listeners: 9, genre: 'Indie Pop', track: 'Men I Trust - Show Me How' },
  { id: '5', name: 'Hip Hop Heads', creator: 'BeatMaster', listeners: 31, genre: 'Hip Hop', track: 'Kendrick Lamar - PRIDE.' },
  { id: '6', name: 'Jazz & Rain', creator: 'SaxMaster', listeners: 15, genre: 'Jazz', track: 'Miles Davis - Blue in Green' },
  { id: '7', name: 'EDM Arena', creator: 'BassKing', listeners: 56, genre: 'Electronic', track: 'Martin Garrix - High on Life' },
];

const MOCK_PLAYLIST = [
  { id: 'p1', title: 'Snowman', artist: 'Lofi Girl', duration: '2:34', albumArt: null },
  { id: 'p2', title: 'Los Angeles', artist: 'The Midnight', duration: '4:18', albumArt: null },
  { id: 'p3', title: 'Fingerprint', artist: 'Lane 8', duration: '5:22', albumArt: null },
  { id: 'p4', title: 'Show Me How', artist: 'Men I Trust', duration: '3:35', albumArt: null },
  { id: 'p5', title: 'PRIDE.', artist: 'Kendrick Lamar', duration: '4:35', albumArt: null },
  { id: 'p6', title: 'Sunset Lover', artist: 'Petit Biscuit', duration: '3:58', albumArt: null },
  { id: 'p7', title: 'Nightcall', artist: 'Kavinsky', duration: '4:18', albumArt: null },
];

const MOCK_MESSAGES = [
  { id: '1', user: 'DJ Luna', text: 'Welcome to the room!', timestamp: '10:01', isLeader: true },
  { id: '2', user: 'MusicFan', text: 'Hey everyone!', timestamp: '10:02', isLeader: false },
  { id: '3', user: 'You', text: 'Love this track!', timestamp: '10:03', isSelf: true },
  { id: '4', user: 'BeatLover', text: 'Same here 🔥', timestamp: '10:03', isLeader: false },
  { id: '5', user: 'DJ Luna', text: 'Glad you like it! Next up is something special.', timestamp: '10:04', isLeader: true },
  { id: '6', user: 'SaxMaster', text: 'Welcome to Jazz & Rain. Grab a coffee and relax.', timestamp: '14:15', isLeader: true },
  { id: '7', user: 'JazzCat', text: 'Perfect for this rainy afternoon', timestamp: '14:17', isLeader: false },
  { id: '8', user: 'SmoothListener', text: 'Miles always hits different 🎷', timestamp: '14:20', isLeader: false },
  { id: '9', user: 'You', text: 'This is exactly what I needed', timestamp: '14:22', isSelf: true },
  { id: '10', user: 'SaxMaster', text: 'Next up is some Coltrane', timestamp: '14:25', isLeader: true },
  { id: '11', user: 'BassKing', text: 'EDM ARENA IS LIVE! Drop your energy in the chat 🔥', timestamp: '21:30', isLeader: true },
  { id: '12', user: 'RaveQueen', text: 'Let\'s gooooo! 🎧', timestamp: '21:31', isLeader: false },
  { id: '13', user: 'You', text: 'This drop is insane', timestamp: '21:34', isSelf: true },
  { id: '14', user: 'BassKing', text: 'Who\'s ready for the ID track?', timestamp: '21:36', isLeader: true },
  { id: '15', user: 'TranceFan', text: 'Best set I\'ve heard all week', timestamp: '21:38', isLeader: false },
  { id: '16', user: 'BassKing', text: 'Love this energy fam! Next track is a banger', timestamp: '21:40', isLeader: true },
];

const CURRENT_USER = 'You';

const Logo = () => (
  <View style={styles.logoContainer}>
    <Ionicons name="radio" size={28} color="#1DB954" />
    <Text style={styles.logoText}>wavechat</Text>
  </View>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('lobby');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const flatListRef = useRef(null);
  const playlistRef = useRef(null);

  const screenTransition = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const messageAnimations = useRef({}).current;

  const enterRoom = (room) => {
    Animated.timing(screenTransition, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedRoom(room);
      setCurrentScreen('room');
      screenTransition.setValue(0);
      Animated.timing(screenTransition, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const leaveRoom = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedRoom(null);
      setCurrentScreen('lobby');
      setActiveTab('chat');
      fadeAnim.setValue(1);
    });
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const message = {
      id: Date.now().toString(),
      user: CURRENT_USER,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };
    setMessages([...messages, message]);
    setNewMessage('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  useEffect(() => {
    if (currentScreen === 'room' && activeTab === 'chat') {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 100);
    }
  }, [currentScreen, activeTab]);

  const getMessageAnimation = (id) => {
    if (!messageAnimations[id]) {
      messageAnimations[id] = new Animated.Value(0);
      Animated.spring(messageAnimations[id], {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
    return messageAnimations[id];
  };

 const LobbyItem = ({ item, index }) => {
  const itemAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(itemAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 60,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: itemAnim, transform: [{ translateY: itemAnim.interpolate({ inputRange: [0,1], outputRange: [20,0] }) }] }}>
      <TouchableOpacity style={styles.roomCard} activeOpacity={0.8} onPress={() => enterRoom(item)}>
        <View style={styles.roomCardContent}>
          <View style={styles.roomHeader}>
            <Text style={styles.roomName}>{item.name}</Text>
            <View style={styles.listenersBadge}>
              <Ionicons name="headset-outline" size={14} color="#A0A0A0" />
              <Text style={styles.listenersText}>{item.listeners}</Text>
            </View>
          </View>
          <Text style={styles.roomCreator}>Hosted by {item.creator}</Text>
          <View style={styles.roomFooter}>
            <View style={styles.genreTag}>
              <Text style={styles.genreText}>{item.genre}</Text>
            </View>
            <View style={styles.nowPlaying}>
              <Ionicons name="musical-note" size={12} color="#1DB954" />
              <Text style={styles.nowPlayingText} numberOfLines={1}>{item.track}</Text>
            </View>
          </View>
        </View>
        <View style={styles.joinIndicator}>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const renderLobbyItem = ({ item, index }) => <LobbyItem item={item} index={index} />;

  const renderMessage = ({ item }) => {
    const isSelf = item.isSelf;
    const anim = getMessageAnimation(item.id);
    return (
      <Animated.View style={{ opacity: anim, transform: [{ scale: anim.interpolate({ inputRange: [0,1], outputRange: [0.9,1] }) }] }}>
        <View style={[styles.messageRow, isSelf ? styles.messageRowSelf : styles.messageRowOther]}>
          {!isSelf && (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{item.user.charAt(0)}</Text>
            </View>
          )}
          <View style={[styles.messageBubble, isSelf ? styles.messageBubbleSelf : styles.messageBubbleOther]}>
            {!isSelf && (
              <View style={styles.messageUserRow}>
                <Text style={styles.messageUser}>{item.user}</Text>
                {item.isLeader && (
                  <View style={styles.leaderChip}>
                    <Text style={styles.leaderChipText}>HOST</Text>
                  </View>
                )}
              </View>
            )}
            <Text style={[styles.messageText, isSelf && styles.messageTextSelf]}>{item.text}</Text>
            <Text style={[styles.messageTime, isSelf && styles.messageTimeSelf]}>{item.timestamp}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

const PlaylistItem = ({ item, index }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 300,
      delay: index * 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: anim, transform: [{ translateX: anim.interpolate({ inputRange: [0,1], outputRange: [30,0] }) }] }}>
      <TouchableOpacity style={styles.playlistItem} activeOpacity={0.7}>
        <View style={styles.playlistArt}>
          <Ionicons name="musical-notes" size={24} color="#1DB954" />
        </View>
        <View style={styles.playlistInfo}>
          <Text style={styles.playlistTitle}>{item.title}</Text>
          <Text style={styles.playlistArtist}>{item.artist}</Text>
        </View>
        <Text style={styles.playlistDuration}>{item.duration}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const renderPlaylistItem = ({ item, index }) => <PlaylistItem item={item} index={index} />;

  const screenAnimatedStyle = {
    opacity: screenTransition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.header}>
          {currentScreen === 'room' ? (
            <>
              <TouchableOpacity onPress={leaveRoom} style={styles.backButton}>
                <Ionicons name="chevron-back" size={28} color="#fff" />
              </TouchableOpacity>
              <Animated.View style={[styles.headerRoomInfo, screenAnimatedStyle]}>
                <Text style={styles.headerTitle}>{selectedRoom?.name}</Text>
                <View style={styles.headerSubRow}>
                  <View style={styles.leaderBadge}>
                    <Ionicons name="radio" size={12} color="#1DB954" />
                    <Text style={styles.leaderBadgeText}>{selectedRoom?.creator}</Text>
                  </View>
                  <View style={styles.listenersInline}>
                    <Ionicons name="people-outline" size={12} color="#AAA" />
                    <Text style={styles.listenersInlineText}>{selectedRoom?.listeners}</Text>
                  </View>
                </View>
              </Animated.View>
            </>
          ) : (
            <>
              <Logo />
              <TouchableOpacity style={styles.profileButton}>
                <Ionicons name="person-circle-outline" size={30} color="#fff" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {currentScreen === 'lobby' ? (
          <Animated.View style={[styles.lobbyContainer, { opacity: fadeAnim }]}>
            <View style={styles.searchSection}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#777" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Find a room..."
                  placeholderTextColor="#777"
                />
              </View>
            </View>
            <FlatList
              data={MOCK_ROOMS}
              keyExtractor={(item) => item.id}
              renderItem={renderLobbyItem}
              contentContainerStyle={styles.lobbyList}
              showsVerticalScrollIndicator={false}
            />
          </Animated.View>
        ) : (
          <Animated.View style={[styles.roomContainer, screenAnimatedStyle]}>
            <View style={styles.tabBar}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
                onPress={() => setActiveTab('chat')}
              >
                <Ionicons name="chatbubble-ellipses" size={20} color={activeTab === 'chat' ? '#1DB954' : '#888'} />
                <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'playlist' && styles.activeTab]}
                onPress={() => setActiveTab('playlist')}
              >
                <Ionicons name="list" size={20} color={activeTab === 'playlist' ? '#1DB954' : '#888'} />
                <Text style={[styles.tabText, activeTab === 'playlist' && styles.activeTabText]}>Playlist</Text>
              </TouchableOpacity>
            </View>

            {activeTab === 'chat' ? (
              <>
                <FlatList
                  ref={flatListRef}
                  data={messages}
                  keyExtractor={(item) => item.id}
                  renderItem={renderMessage}
                  contentContainerStyle={styles.chatList}
                  showsVerticalScrollIndicator={false}
                />
                <View style={styles.playerBar}>
                  <Animated.View style={[styles.playerArtwork, { transform: [{ rotate: '0deg' }] }]}>
                    <Ionicons name="disc" size={40} color="#1DB954" />
                  </Animated.View>
                  <View style={styles.playerInfo}>
                    <Text style={styles.playerTrack} numberOfLines={1}>{selectedRoom?.track || 'No track playing'}</Text>
                    <Text style={styles.playerArtist}>{selectedRoom?.creator}</Text>
                  </View>
                  <View style={styles.playerControls}>
                    <TouchableOpacity style={styles.playerButton}>
                      <Ionicons name="play-skip-back" size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.playerButton, styles.playButton]}>
                      <Ionicons name="pause" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playerButton}>
                      <Ionicons name="play-skip-forward" size={22} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.inputBar}>
                  <TextInput
                    style={styles.messageInput}
                    placeholder="Say something..."
                    placeholderTextColor="#888"
                    value={newMessage}
                    onChangeText={setNewMessage}
                    onSubmitEditing={sendMessage}
                    returnKeyType="send"
                  />
                  <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Ionicons name="send" size={20} color="#1DB954" />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <FlatList
                  ref={playlistRef}
                  data={MOCK_PLAYLIST}
                  keyExtractor={(item) => item.id}
                  renderItem={renderPlaylistItem}
                  contentContainerStyle={styles.playlistContainer}
                  showsVerticalScrollIndicator={false}
                />
                <View style={styles.playerBar}>
                  <View style={styles.playerArtwork}>
                    <Ionicons name="disc" size={40} color="#1DB954" />
                  </View>
                  <View style={styles.playerInfo}>
                    <Text style={styles.playerTrack} numberOfLines={1}>{selectedRoom?.track || 'No track playing'}</Text>
                    <Text style={styles.playerArtist}>{selectedRoom?.creator}</Text>
                  </View>
                  <View style={styles.playerControls}>
                    <TouchableOpacity style={styles.playerButton}>
                      <Ionicons name="play-skip-back" size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.playerButton, styles.playButton]}>
                      <Ionicons name="pause" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playerButton}>
                      <Ionicons name="play-skip-forward" size={22} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Animated.View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0B0E',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#0B0B0E',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
  },
  profileButton: {
    padding: 4,
  },
  backButton: {
    paddingRight: 12,
  },
  headerRoomInfo: {
    flex: 1,
    marginLeft: 8,
  },
  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  leaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 185, 84, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    marginRight: 12,
  },
  leaderBadgeText: {
    color: '#1DB954',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  listenersInline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listenersInlineText: {
    color: '#AAA',
    fontSize: 12,
    marginLeft: 4,
  },
  lobbyContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchSection: {
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  lobbyList: {
    paddingBottom: 20,
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 25, 0.8)',
    borderRadius: 24,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  roomCardContent: {
    flex: 1,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  listenersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  listenersText: {
    color: '#A0A0A0',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  roomCreator: {
    color: '#AAA',
    fontSize: 14,
    marginBottom: 12,
  },
  roomFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  genreTag: {
    backgroundColor: 'rgba(29, 185, 84, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  genreText: {
    color: '#1DB954',
    fontSize: 12,
    fontWeight: '500',
  },
  nowPlaying: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
  },
  nowPlayingText: {
    color: '#CCC',
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  joinIndicator: {
    marginLeft: 8,
  },
  roomContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
  },
  tabText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#1DB954',
  },
  chatList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  messageRowSelf: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2A2A35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  messageBubble: {
    maxWidth: width * 0.7,
    padding: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    backgroundColor: '#1E1E24',
  },
  messageBubbleSelf: {
    backgroundColor: '#1DB954',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 20,
  },
  messageBubbleOther: {
    borderBottomLeftRadius: 4,
  },
  messageUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageUser: {
    color: '#1DB954',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 6,
  },
  leaderChip: {
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  leaderChipText: {
    color: '#1DB954',
    fontSize: 9,
    fontWeight: '700',
  },
  messageText: {
    color: '#E0E0E0',
    fontSize: 15,
    lineHeight: 20,
  },
  messageTextSelf: {
    color: '#fff',
  },
  messageTime: {
    color: '#888',
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  messageTimeSelf: {
    color: 'rgba(255,255,255,0.7)',
  },
  playlistContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,30,35,0.8)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  playlistArt: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(29,185,84,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  playlistArtist: {
    color: '#AAA',
    fontSize: 13,
    marginTop: 2,
  },
  playlistDuration: {
    color: '#888',
    fontSize: 14,
    marginLeft: 10,
  },
  playerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 22, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  playerArtwork: {
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
    marginRight: 8,
  },
  playerTrack: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  playerArtist: {
    color: '#AAA',
    fontSize: 13,
    marginTop: 2,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerButton: {
    padding: 6,
  },
  playButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#0B0B0E',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  messageInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: '#fff',
    fontSize: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(29, 185, 84, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
