import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the navigation type
type RootStackParamList = {
  Home: undefined;
  PostItem: undefined;
  FoundItems: undefined;
};

// Define props type
type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Findly!</Text>
      <Button title="Post Lost Item" onPress={() => navigation.navigate("PostItem")} />
      <Button title="View Found Items" onPress={() => navigation.navigate("FoundItems")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default HomeScreen;
