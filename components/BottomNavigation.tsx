import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Home, Eye, PlusCircle, MessageCircle, User } from "lucide-react-native"; // Using suitable icons from lucide-react-native
import { useRouter } from "expo-router";

const BottomNavigation = () => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/Dashboard")}>
        <Home color="#fff" size={24} />
      </TouchableOpacity>

      {/* View Item Tab */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/Dashboard/ViewItem")}>
        <Eye color="#fff" size={24} />
      </TouchableOpacity>

      {/* Add Item Tab */}
      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/Dashboard/AddItems")}>
        <PlusCircle color="#fff" size={32} />
      </TouchableOpacity>

      {/* Chat with AI Tab */}
      <TouchableOpacity style={styles.tab} onPress={() => router.push("/Dashboard/chat")}>
        <MessageCircle color="#fff" size={24} />
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity style={styles.tab} >
        <User color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2c2c2e",
    paddingVertical: 10,
   
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#5856d6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
});

export default BottomNavigation;
