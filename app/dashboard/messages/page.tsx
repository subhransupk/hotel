'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
  PhoneIcon,
  VideoCameraIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  Title,
  Text,
  TextInput,
  Badge,
  Button,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@tremor/react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatar: string;
  role: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
  role: string;
  isOnline: boolean;
}

const chats: Chat[] = [
  {
    id: '1',
    name: 'John Smith',
    lastMessage: 'I have a question about my reservation...',
    timestamp: '2 min ago',
    unreadCount: 2,
    avatar: '/avatars/guest1.png',
    role: 'Guest',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    lastMessage: 'Room service request for Room 304',
    timestamp: '15 min ago',
    unreadCount: 0,
    avatar: '/avatars/staff1.png',
    role: 'Staff',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Michael Brown',
    lastMessage: 'Thank you for the excellent service!',
    timestamp: '1 hour ago',
    unreadCount: 1,
    avatar: '/avatars/guest2.png',
    role: 'Guest',
    isOnline: false,
  },
  // Add more sample chats as needed
];

const messages: Message[] = [
  {
    id: '1',
    sender: 'John Smith',
    content: 'Hello, I have a question about my reservation for next week.',
    timestamp: '2:30 PM',
    isRead: true,
    avatar: '/avatars/guest1.png',
    role: 'Guest',
  },
  {
    id: '2',
    sender: 'You',
    content: 'Of course! How can I help you with your reservation?',
    timestamp: '2:31 PM',
    isRead: true,
    avatar: '/avatars/staff.png',
    role: 'Staff',
  },
  {
    id: '3',
    sender: 'John Smith',
    content: 'I would like to request an early check-in if possible.',
    timestamp: '2:32 PM',
    isRead: true,
    avatar: '/avatars/guest1.png',
    role: 'Guest',
  },
  // Add more sample messages as needed
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string>(chats[0].id);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmojiCategory, setSelectedEmojiCategory] = useState('smileys');
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Emoji categories
  const emojiCategories = {
    smileys: {
      label: 'Smileys',
      icon: '😀',
      emojis: ['😊', '😄', '😅', '😂', '🤣', '😇', '😉', '😍', '🥰', '😘', '😋', '😎', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😏', '😒', '🙄', '😬', '🤐', '😌', '😔']
    },
    gestures: {
      label: 'Gestures',
      icon: '👋',
      emojis: ['👋', '👍', '👎', '👏', '🙌', '🤝', '✌️', '🤞', '🤟', '🤘', '👌', '🤌', '👈', '👉', '👆', '👇', '✋', '🤚', '🖐️', '🖖', '💅', '🤙', '💪', '🖕', '✍️']
    },
    symbols: {
      label: 'Symbols',
      icon: '❤️',
      emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💔', '✨', '⭐', '🌟', '💫', '💯', '💢', '💥', '💦', '💨', '🕳️', '💣', '💬', '💭', '💤', '💝', '💞', '💕']
    },
    objects: {
      label: 'Objects',
      icon: '🎮',
      emojis: ['🎮', '🎲', '🎭', '🎨', '🎤', '🎧', '🎵', '🎶', '🎼', '🎹', '🎷', '🎺', '🎸', '🎻', '🎬', '🎪', '🎟️', '🎯', '🎳', '🎱', '📱', '💻', '⌚', '📸', '💾']
    },
    food: {
      label: 'Food',
      icon: '🍔',
      emojis: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥨', '🥪', '🌮', '🌯', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🥣', '🥗', '🍖', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗']
    },
    travel: {
      label: 'Travel',
      icon: '✈️',
      emojis: ['✈️', '🚗', '🚕', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🛵', '🏍️', '🛺', '🚲', '🛴', '🛹', '⛵', '🚤', '🛥️', '🛳️', '🚢']
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: messageInput.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
        avatar: '/avatars/staff.png',
        role: 'Staff',
      };

      setLocalMessages([...localMessages, newMessage]);
      setMessageInput('');
      scrollToBottom();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Create a message for each uploaded file
      Array.from(files).forEach(file => {
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: 'You',
          content: `📎 File: ${file.name}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: true,
          avatar: '/avatars/staff.png',
          role: 'Staff',
        };
        setLocalMessages(prev => [...prev, newMessage]);
      });
      
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleClearChat = () => {
    setLocalMessages([]);
    setShowOptionsMenu(false);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title>Messages</Title>
          <Text>Manage your conversations with guests and staff</Text>
        </div>
      </div>

      <div className="flex h-[calc(100vh-12rem)] gap-6">
        {/* Left sidebar - Chat list */}
        <Card className="w-1/3 flex flex-col">
          <div className="mb-4">
            <TextInput
              icon={MagnifyingGlassIcon}
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TabGroup>
            <TabList>
              <Tab>All</Tab>
              <Tab>Guests</Tab>
              <Tab>Staff</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="overflow-y-auto flex-1">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat === chat.id
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                          {chat.isOnline && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <Text className="font-medium truncate">{chat.name}</Text>
                            <Text className="text-xs text-gray-500">{chat.timestamp}</Text>
                          </div>
                          <div className="flex items-center justify-between">
                            <Text className="text-sm text-gray-500 truncate">
                              {chat.lastMessage}
                            </Text>
                            {chat.unreadCount > 0 && (
                              <Badge size="xs" color="red">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="overflow-y-auto flex-1">
                  {filteredChats
                    .filter((chat) => chat.role === 'Guest')
                    .map((chat) => (
                      // Same chat item component as above
                      <div
                        key={chat.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat === chat.id
                            ? 'bg-blue-50 dark:bg-blue-900/30'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setSelectedChat(chat.id)}
                      >
                        {/* Chat item content */}
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                            {chat.isOnline && (
                              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <Text className="font-medium truncate">{chat.name}</Text>
                              <Text className="text-xs text-gray-500">{chat.timestamp}</Text>
                            </div>
                            <div className="flex items-center justify-between">
                              <Text className="text-sm text-gray-500 truncate">
                                {chat.lastMessage}
                              </Text>
                              {chat.unreadCount > 0 && (
                                <Badge size="xs" color="red">
                                  {chat.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="overflow-y-auto flex-1">
                  {filteredChats
                    .filter((chat) => chat.role === 'Staff')
                    .map((chat) => (
                      // Same chat item component as above
                      <div
                        key={chat.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat === chat.id
                            ? 'bg-blue-50 dark:bg-blue-900/30'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setSelectedChat(chat.id)}
                      >
                        {/* Chat item content */}
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                            {chat.isOnline && (
                              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <Text className="font-medium truncate">{chat.name}</Text>
                              <Text className="text-xs text-gray-500">{chat.timestamp}</Text>
                            </div>
                            <div className="flex items-center justify-between">
                              <Text className="text-sm text-gray-500 truncate">
                                {chat.lastMessage}
                              </Text>
                              {chat.unreadCount > 0 && (
                                <Badge size="xs" color="red">
                                  {chat.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>

        {/* Right side - Chat messages */}
        <Card className="flex-1 flex flex-col">
          {selectedChat && (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
                  </div>
                  <div>
                    <Text className="font-medium">
                      {chats.find((c) => c.id === selectedChat)?.name}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {chats.find((c) => c.id === selectedChat)?.role}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="light"
                    icon={PhoneIcon}
                    tooltip="Start voice call"
                    onClick={() => console.log('Voice call clicked')}
                  />
                  <Button
                    variant="light"
                    icon={VideoCameraIcon}
                    tooltip="Start video call"
                    onClick={() => console.log('Video call clicked')}
                  />
                  <div className="relative">
                    <Button
                      variant="light"
                      icon={EllipsisHorizontalIcon}
                      tooltip="More options"
                      onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                    />
                    {showOptionsMenu && (
                      <>
                        <div 
                          className="fixed inset-0 z-10"
                          onClick={() => setShowOptionsMenu(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20 border border-gray-200 dark:border-gray-700 py-1">
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              console.log('View contact info');
                              setShowOptionsMenu(false);
                            }}
                          >
                            View Contact Info
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={handleClearChat}
                          >
                            Clear Chat
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              console.log('Block contact');
                              setShowOptionsMenu(false);
                            }}
                          >
                            Block Contact
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {localMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.sender === 'You' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'You'
                          ? 'bg-blue-500'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      <p className={`text-sm ${
                        message.sender === 'You'
                          ? 'text-white'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {message.content}
                      </p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'You'
                          ? 'text-white/80'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                  />
                  <Button
                    variant="light"
                    icon={PaperClipIcon}
                    tooltip="Attach file"
                    onClick={handleAttachClick}
                  />
                  <TextInput
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <div className="relative">
                    <Button
                      variant="light"
                      icon={FaceSmileIcon}
                      tooltip="Add emoji"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                    {showEmojiPicker && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowEmojiPicker(false)}
                        />
                        <div className="absolute bottom-12 right-0 mb-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20 border border-gray-200 dark:border-gray-700">
                          {/* Category Tabs */}
                          <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-700">
                            {Object.entries(emojiCategories).map(([key, category]) => (
                              <button
                                key={key}
                                onClick={() => setSelectedEmojiCategory(key)}
                                className={`flex flex-col items-center p-2 text-xs ${
                                  selectedEmojiCategory === key
                                    ? 'text-blue-500 border-b-2 border-blue-500'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                                }`}
                              >
                                <span className="text-lg mb-1">{category.icon}</span>
                                <span>{category.label}</span>
                              </button>
                            ))}
                          </div>

                          {/* Emoji Grid */}
                          <div className="grid grid-cols-8 gap-1 w-[320px] h-[200px] overflow-y-auto">
                            {emojiCategories[selectedEmojiCategory as keyof typeof emojiCategories].emojis.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => handleEmojiClick(emoji)}
                                className="p-1 text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                title={emoji}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <Button
                    icon={PaperAirplaneIcon}
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
} 