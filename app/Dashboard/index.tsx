import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavigation from "../../components/BottomNavigation";
import InfoCard from "../../components/InfoCard";
import { Svg, Circle } from "react-native-svg";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getAddressFromCoords } from "../services/geocodingService";

export default function Dashboard() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);

  interface Item {
    id: string;
    itemName: string;
    location: { latitude: number; longitude: number };
    contact: string;
    imageBase64: string;
    address: string;
  }

  const chatNavigation = () => {
    router.push("/Dashboard/chat");
  };

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/findlylogo2.png")} style={styles.logo} />
        <Text style={styles.title}>Findly</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="menu" size={30} color="#280269" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.progressCard}>
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressTitle}>Lost Items</Text>
            <Text style={styles.progressValue}>24 Found</Text>
            <Text style={styles.progressRemaining}>40 Remaining</Text>
          </View>
          <View style={styles.progressChartContainer}>
            <Svg height="100" width="100" viewBox="0 0 100 100">
              <Circle cx="50" cy="50" r="45" stroke="#3a3a3a" strokeWidth="10" fill="transparent" />
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#4cd964"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={`${36 * 2.83} ${100 * 2.83}`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </Svg>
            <Text style={styles.progressPercentage}>36%</Text>
          </View>
        </View>

        <View style={styles.section}>
  <Text style={styles.label}>Recent Items</Text>
  {items.length > 0 ? (
    <View style={styles.infoCardsContainer}>
      {items.slice(0, 2).map((item) => ( // Ensure only 2 items are displayed
        <InfoCard
          key={item.id}
          itemName={item.itemName}
          location={item.address}
          contact={item.contact}
          imageBase64={item.imageBase64}
        />
      ))}
    </View>
  ) : (
    <TouchableOpacity style={styles.addItemButton} onPress={() => router.push("/Dashboard/AddItems")}>
      <Ionicons name="add-circle" size={24} color="#fff" />
      <Text style={styles.addItemText}>Add Lost Item</Text>
    </TouchableOpacity>
  )}
</View>


        <TouchableOpacity style={styles.chatButton} onPress={chatNavigation}>
          <View style={styles.chatButtonContent}>
            <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
            <Text style={styles.chatButtonText}>Chat with AI Assistant</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
  },
  section: {
    marginBottom: 24,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1c1c1e",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    zIndex: 10,
  },
  logo: {
    width: 40,
    height: 53,
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#dff5ef",
  },
  profileButton: {
    padding: 8,
    borderRadius: 30,
    backgroundColor: "#3a393b",
    elevation: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80, // Ensures content starts below the fixed header
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  progressCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2c2c2e",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  progressTextContainer: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  progressValue: {
    fontSize: 16,
    color: "#8e8e93",
    marginBottom: 5,
  },
  progressRemaining: {
    fontSize: 14,
    color: "#8e8e93",
  },
  progressChartContainer: {
    position: "relative",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  progressPercentage: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  chatButton: {
    backgroundColor: "#6c63ff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 6,
  },
  chatButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  addItemButton: {
    backgroundColor: "#4cd964",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 6,
    marginTop: 10,
  },
  addItemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  
});
