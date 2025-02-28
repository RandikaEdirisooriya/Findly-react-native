import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import BottomNavigation from "../../components/BottomNavigation";
import InfoCard from "../../components/InfoCard";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAddressFromCoords } from "../services/geocodingService"; 

export default function ViewItem() {
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
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "findly-items")); // Replace with your actual collection

      const fetchedItems: Item[] = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data() as Item;
          const address = await getAddressFromCoords(data.location.latitude, data.location.longitude);
        
          return { ...data, id: doc.id, address };
        })
      );

      setItems(fetchedItems);
     
    //  console.log("Fetched Items:", fetchedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.infoCardsContainer}>
          {items.map((item) => (
            <InfoCard
              key={item.id}
              itemName={item.itemName}
              location={item.address} // Show the actual address
             
              contact={item.contact}
              imageBase64={item.imageBase64}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>View Items</Text>
      </TouchableOpacity>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    justifyContent: "space-between",
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  infoCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
