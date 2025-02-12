import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const PostItemScreen = () => {
  const [itemName, setItemName] = useState("");

  const postItem = async () => {
    await addDoc(collection(db, "lostItems"), {
      name: itemName,
      date: new Date(),
    });
    alert("Item Posted!");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Lost Item Name:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        onChangeText={setItemName}
      />
      <Button title="Post" onPress={postItem} />
    </View>
  );
};

export default PostItemScreen;
