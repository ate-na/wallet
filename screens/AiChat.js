// app/ai-chat.js  OR  screens/AiChatScreen.js
import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const BACKEND_URL = "https://your-api.com";

export default function AiChatScreen({ route }) {
  const userId = route?.params?.userId || "guest";

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load chat history when screen opens
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const saved = await AsyncStorage.getItem(`chat_${userId}`);
      if (saved) setMessages(JSON.parse(saved));
    } catch (e) {
      console.log("Failed to load chat history");
    }
  };

  const saveHistory = async (msgs) => {
    try {
      await AsyncStorage.setItem(`chat_${userId}`, JSON.stringify(msgs));
    } catch (e) {
      // silently fail
    }
  };

  const onSend = useCallback(
    async (newMessages = []) => {
      const userMessage = newMessages[0];

      // Show user message immediately
      setMessages((prev) => GiftedChat.append(prev, userMessage));
      setIsLoading(true);

      try {
        const res = await fetch(`${BACKEND_URL}/api/ai/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            question: userMessage.text,
          }),
        });

        const data = await res.json();

        const botMessage = {
          _id: Math.random().toString(),
          text: data.answer || "Sorry, I couldn't process that right now.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "MoneyBot",
            avatar: "https://i.imgur.com/7k12Lzi.png", // optional cute robot
          },
        };

        const updated = GiftedChat.append(messages, [botMessage]);
        setMessages(updated);
        saveHistory(updated);
      } catch (err) {
        const errorMsg = {
          _id: Math.random().toString(),
          text: "No internet or server error. Try again later!",
          createdAt: new Date(),
          user: { _id: 2, name: "MoneyBot" },
        };
        setMessages((prev) => GiftedChat.append(prev, [errorMsg]));
      } finally {
        setIsLoading(false);
      }
    },
    [messages, userId]
  );

  const clearChat = () => {
    Alert.alert("Clear chat", "Are you sure you want to delete all messages?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          setMessages([]);
          await AsyncStorage.removeItem(`chat_${userId}`);
        },
      },
    ]);
  };

  // Welcome message shown only on first open
  const welcomeMessage = [
    {
      _id: "welcome",
      text: "Hey! I'm your personal money assistant. Ask me anything about your spending!",
      createdAt: new Date(),
      user: { _id: 2, name: "MoneyBot" },
    },
  ];

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages.length === 0 ? welcomeMessage : messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
        placeholder="Ask about your expenses..."
        renderLoading={() =>
          isLoading && <ActivityIndicator size="small" color="#007AFF" />
        }
        renderActions={() => (
          <TouchableOpacity style={styles.clearBtn} onPress={clearChat}>
            <Ionicons name="trash-outline" size={24} color="#ff3b30" />
          </TouchableOpacity>
        )}
        renderBubble={(props) => (
          <GiftedChat.Bubble
            {...props}
            wrapperStyle={{
              right: { backgroundColor: "#007AFF" },
              left: { backgroundColor: "#E5E5EA" },
            }}
            textStyle={{
              right: { color: "#fff" },
              left: { color: "#000" },
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  clearBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
});
