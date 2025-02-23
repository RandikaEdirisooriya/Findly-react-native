// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { StyleSheet } from "react-native";

// export default function DashboardLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: styles.tabBar, // Apply custom styles
//         tabBarActiveTintColor: "#8b75fc", // Gold color for active tab
//         tabBarInactiveTintColor: "#FFFFFF", // White color for inactive tab
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="AddItems"
//         options={{
//           title: "Add Items",
//           tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="ViewItem"
//         options={{
//           title: "View Items",
//           tabBarIcon: ({ color, size }) => <Ionicons name="eye" size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="chat"
//         options={{
//           title: "Chat",
//           tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }

// const styles = StyleSheet.create({
//    tabBar: {
     
//      backgroundColor: "#1E1E1E", // Dark gray background
//      borderTopWidth: 0, // Remove the top border
//      paddingBottom: 5, // Add some padding
//      height: 60, // Adjust height for better visibility
//      borderTopLeftRadius: 15, // Rounded corners on the left
//      borderTopRightRadius: 15, // Rounded corners on the right
//      overflow: "hidden", // Ensure the background doesn't leak outside the rounded corners
//    },
//    addButton: {
//       width: 60,
//       height: 60,
//       borderRadius: 30,
//       backgroundColor: "#5856d6",
//       justifyContent: "center",
//       alignItems: "center",
//       marginTop: -30,
//     },
//  });
 
// // import {Drawer} from "expo-router/drawer";
// // export default function DashboardLayout() {
// //   return (
// //     <Drawer  >
// //       <Drawer.Screen name="index" />
// //       <Drawer.Screen name="AddItems" />
// //       <Drawer.Screen name="ViewItem" />
// //       <Drawer.Screen name="chat" />
// //     </Drawer>
// //   );
// // }

