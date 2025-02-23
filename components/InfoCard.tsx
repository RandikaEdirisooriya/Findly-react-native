import type React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface InfoCardProps {
  itemName: string;
  location: string;
  contact: string;
  imageBase64?: string; // Make image optional to prevent crashes
}

const InfoCard: React.FC<InfoCardProps> = ({ itemName, location, contact, imageBase64 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {imageBase64 ? (
          <Image source={{ uri: `data:image/png;base64,${imageBase64}` }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No Image</Text>
        )}
      </View>
      <Text style={styles.title}>{itemName}</Text>
      <Text style={styles.value}>
        📍 {location} {"\n"}
        📞 <Text style={styles.unit}>{contact}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#2c2c2e",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3a3a3c",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
     alignSelf: "center",
  },
  image: {

    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: "#00f", // ✅ Shadow color
    shadowOffset: { width: 30, height: 30 }, // ✅ Shadow direction
    shadowOpacity: 0.3, // ✅ Opacity of the shadow
    shadowRadius: 4, // ✅ Blur radius
    elevation: 5, // ✅ Shadow for Android
  },
  placeholderText: {
    color: "#8e8e93",
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    color: "#8e8e93",
    marginBottom: 5, alignSelf: "center"
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  unit: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#8e8e93",
  },
});

export default InfoCard;
