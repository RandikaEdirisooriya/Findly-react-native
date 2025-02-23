

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getAIResponse } from "../services/GeminiService";
import BottomNavigation from "@/components/BottomNavigation";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { getAddressFromCoords } from "../services/geocodingService"; 
export default function Chat() {
  const [items, setItems] = useState<Item[]>([]);

  interface Item {
    id: string;
    itemName: string;
    location: { latitude: number; longitude: number }; // Location as object
    contact: string;
    imageBase64: string;
    address: string;
  }

 useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "findly-items"));
        const fetchedItems: Item[] = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data() as Item;

            if (
              !data.location ||
              typeof data.location.latitude !== "number" ||
              typeof data.location.longitude !== "number"
            ) {
              console.warn(`Missing or invalid location data for item ID: ${doc.id}`);
              return { ...data, id: doc.id, address: "Location not available" };
            }

            const address = await getAddressFromCoords(data.location.latitude, data.location.longitude);
            return { ...data, id: doc.id, address };
          })
        );

        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  interface MessageProps {
    text: string;
    isUser: boolean;
  }

  const Message: React.FC<MessageProps> = ({ text, isUser }) => (
    <View
      style={[styles.message, isUser ? styles.userMessage : styles.botMessage]}
    >
      <Text
        style={[
          styles.messageText,
          isUser ? styles.userMessageText : styles.botMessageText,
        ]}
      >
        {text}
      </Text>
    </View>
  );

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      text: "Hello! I'm your AI assistant. How can I help you?",
      isUser: false,
    },
  ]);

  const sendMessage = async () => {
    if (message.trim()) {
      const userMessage = { text: message, isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage("");
      Keyboard.dismiss();
  
      try {
        // Filter items based on message
        const matchedItems = items.filter(item =>
          message.toLowerCase().includes(item.itemName.toLowerCase())
        );
  
        let additionalInfo = "";
        if (matchedItems.length > 0) {
          additionalInfo = matchedItems.map(item => 
            `\n\n📌 *${item.itemName}*\n📍 Address: ${item.address}\n📞 Contact: ${item.contact}`
          ).join("\n");
        }
  
        const aiResponse = await getAIResponse(message);
        const responseText = aiResponse + additionalInfo;
  
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: responseText, isUser: false },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "AI is unavailable at the moment.", isUser: false },
        ]);
      }
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Findly AI Assistant</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((msg, index) => (
            <Message key={index} {...msg} />
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <BottomNavigation/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    padding: 20,
    textAlign: "center",
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  message: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#6c63ff",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#AEAEB0F2",
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#1a1a1a",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#27272AF2",
    borderTopWidth: 1,
    borderColor: "#0000",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#36363AF2",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#6c63ff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
