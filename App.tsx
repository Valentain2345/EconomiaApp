import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MOCK_ROOMS = [
  { id: '1', name: 'Chill Vibes', creator: 'DJ Luna', listeners: 24, genre: 'Lo-Fi', track: 'Lofi Girl - Snowman' },
  { id: '2', name: 'Late Night Drive', creator: 'WaveRider', listeners: 18, genre: 'Synthwave', track: 'The Midnight - Los Angeles' },
  { id: '3', name: 'House Nation', creator: 'DeepSoul', listeners: 42, genre: 'Deep House', track: 'Lane 8 - Fingerprint' },
  { id: '4', name: 'Indie Corner', creator: 'MelodyMaker', listeners: 9, genre: 'Indie Pop', track: 'Men I Trust - Show Me How' },
  { id: '5', name: 'Hip Hop Heads', creator: 'BeatMaster', listeners: 31, genre: 'Hip Hop', track: 'Kendrick Lamar - PRIDE.' },
];

const MOCK_MESSAGES = [
  { id: '1', user: 'DJ Luna', text: 'Welcome to the room!', timestamp: '10:01', isLeader: true },
  { id: '2', user: 'MusicFan', text: 'Hey everyone!', timestamp: '10:02', isLeader: false },
  { id: '3', user: 'You', text: 'Love this track!', timestamp: '10:03', isSelf: true },
  { id: '4', user: 'BeatLover', text: 'Same here 🔥', timestamp: '10:03', isLeader: false },
  { id: '5', user: 'DJ Luna', text: 'Glad you like it! Next up is something special.', timestamp: '10:04', isLeader: true },
];

const CURRENT_USER = 'You';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('lobby');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  const enterRoom = (room) => {
    setSelectedRoom(room);
    setCurrentScreen('room');
  };

  const leaveRoom = () => {
    setSelectedRoom(null);
    setCurrentScreen('lobby');
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
    if (currentScreen === 'room') {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 100);
    }
  }, [currentScreen]);

  const renderLobbyItem = ({ item }) => (
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
  );

  const renderMessage = ({ item }) => {
    const isSelf = item.isSelf;
    return (
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
    );
  };

  return (
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
              <View style={styles.headerRoomInfo}>
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
              </View>
            </>
          ) : (
            <>
              <Text style={styles.headerTitle}>wavechat</Text>
              <TouchableOpacity style={styles.profileButton}>
                <Ionicons name="person-circle-outline" size={30} color="#fff" />
              </TouchableOpacity>
            </>
          )}
        </View>

        {currentScreen === 'lobby' ? (
          <View style={styles.lobbyContainer}>
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
          </View>
        ) : (
          <View style={styles.roomContainer}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={renderMessage}
              contentContainerStyle={styles.chatList}
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
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  headerTitle: {
    fontSize: 24,
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
    backdropFilter: 'blur(10px)',
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
