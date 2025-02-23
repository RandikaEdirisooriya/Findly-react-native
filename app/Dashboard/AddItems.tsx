import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView,Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import MapView, { Marker } from "react-native-maps";
import BottomNavigation from "../../components/BottomNavigation";
import { db, storage } from "../firebaseConfig";
 import { collection, addDoc } from "firebase/firestore";
export default function AddItem() {
  const [itemName, setItemName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(false);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);

      // Convert Image to Base64
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      setBase64Image(base64);
    }
  };
  const handleSubmit = async () => {
    if (!itemName || !contact || !base64Image|| !location) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "findly-items"), {
        itemName,
        contact,
        imageBase64: base64Image, 
        location,
        timestamp: new Date(),
      });

      Alert.alert("Success", "Item added successfully!");
      setItemName("");
      setContact("");

      setBase64Image(null);
    } catch (error) {
      console.error("Error adding document:", error);
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Enter Lost Item Name:</Text>
        <TextInput 
          value={itemName} 
          onChangeText={setItemName} 
          placeholder="Item name" 
          placeholderTextColor="#bbb" 
          style={styles.input} 
        />

        <Text style={styles.label}>Enter  Contact Number:</Text>
        <TextInput 
          value={contact} 
          onChangeText={setContact} 
          placeholder="Contact Number" 
          placeholderTextColor="#bbb" 
          style={styles.input} 
        />

        <Text style={styles.label}>Select Lost Location:</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 6.7132, // Panadura, Sri Lanka
            longitude: 79.9022,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={(e) => setLocation(e.nativeEvent.coordinate)}
        >
          {location && <Marker coordinate={location} />}
        </MapView>

        <Text style={styles.label}>Upload Item Image:</Text>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>

        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <BottomNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    padding: 20,
    justifyContent: "space-between",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

// // });import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import { db, storage } from "../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";
// import { ref, uploadString, getDownloadURL } from "firebase/storage";
// import MapView, { Marker } from "react-native-maps";
// import { useState } from "react";
// export default function AddItem() {
//   const [itemName, setItemName] = useState<string>("");
//   const [address, setAddress] = useState<string>("");
//   const [image, setImage] = useState<string | null>(null);
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [loading, setLoading] = useState(false);

//   // **📌 Select Image**
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       base64: true, // ✅ Enable Base64 conversion
//     });

//     if (!result.canceled && result.assets[0].base64) {
//       setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
//     }
//   };

//   // **📌 Select Location on Map**
//   const handleMapPress = (e: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => {
//     setLocation(e.nativeEvent.coordinate);
//   };

//   // **📌 Upload Base64 Image to Firebase**
//   const uploadImage = async (base64Image: string) => {
//     try {
//       const imageName = `images/${new Date().getTime()}.jpg`;
//       const imageRef = ref(storage, imageName);

//       // Upload Base64 String
//       await uploadString(imageRef, base64Image.split(",")[1], "base64"); // ✅ Remove "data:image/jpeg;base64," before uploading

//       // Get Download URL
//       return await getDownloadURL(imageRef);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       return null;
//     }
//   };

//   // **📌 Submit Data to Firestore**
//   const handleSubmit = async () => {
//     if (!itemName || !address || !location) {
//       Alert.alert("Error", "Please fill all fields!");
//       return;
//     }

//     setLoading(true);
//     let imageUrl = null;

//     if (image) {
//       imageUrl = await uploadImage(image);
//     }

//     try {
//       await addDoc(collection(db, "lost_items"), {
//         itemName,
//         address,
//         location,
//         imageUrl,
//         timestamp: new Date(),
//       });

//       Alert.alert("Success", "Item added successfully!");
//       setItemName("");
//       setAddress("");
//       setImage(null);
//       setLocation(null);
//     } catch (error) {
//       console.error("Error adding document:", error);
//       Alert.alert("Error", "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.label}>Enter Lost Item Name:</Text>
//       <TextInput
//         value={itemName}
//         onChangeText={setItemName}
//         placeholder="Item name"
//         placeholderTextColor="#bbb"
//         style={styles.input}
//       />

//       <Text style={styles.label}>Enter Address:</Text>
//       <TextInput
//         value={address}
//         onChangeText={setAddress}
//         placeholder="Address"
//         placeholderTextColor="#bbb"
//         style={styles.input}
//       />

//       <Text style={styles.label}>Select Lost Location:</Text>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 6.7132, // Panadura, Sri Lanka
//           longitude: 79.9022,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//         onPress={handleMapPress}
//       >
//         {location && <Marker coordinate={location} />}
//       </MapView>

//       <Text style={styles.label}>Upload Item Image:</Text>
//       <TouchableOpacity onPress={pickImage} style={styles.button}>
//         <Text style={styles.buttonText}>Select Image</Text>
//       </TouchableOpacity>

//       {image && <Image source={{ uri: image }} style={styles.image} />}

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
//         <Text style={styles.submitButtonText}>{loading ? "Submitting..." : "Submit"}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// // **📌 Styles**
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1c1c1e",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   label: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: "#333",
//     padding: 12,
//     borderRadius: 8,
//     color: "#fff",
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   map: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: "#007AFF",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   submitButton: {
//     backgroundColor: "#28a745",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });
