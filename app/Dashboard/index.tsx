// import { View, Text, Button, Dimensions } from "react-native";
// import { useRouter } from "expo-router";
// import { LineChart } from "react-native-chart-kit";

// export default function Dashboard() {
//     const router = useRouter();

//     const handleAdd = () => {
//         router.push("/Dashboard/item");
//     };

//     const data = {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//         datasets: [
//             {
//                 data: [20, 45, 28, 80, 99, 43],
//                 color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Neon Dark Blue
//                 strokeWidth: 2
//             }
//         ]
//     };

//     return (
     
//         <View style={styles.container}>
//              <Button title="Adding Lost Items" onPress={handleAdd} />
//              <Button title="View Found Items" />
           
//             <Text style={styles.chartTitle}>Lost Items Found per Month</Text>
//             <View style={styles.chartContainer}>
//                 <LineChart
//                     data={data}
//                     width={Dimensions.get('window').width - 40}
//                     height={220}
//                     yAxisLabel=""
//                     yAxisSuffix=""
//                     yAxisInterval={1}
//                     chartConfig={{
//                         backgroundColor: '#000033',  // Dark Blue Background
//                         backgroundGradientFrom: '#000044', // Neon Dark Blue Gradient
//                         backgroundGradientTo: '#000099',
//                         decimalPlaces: 0,
//                         color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`, // Neon Blue Line
//                         labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                         style: {
//                             borderRadius: 16,
//                         },
//                         propsForDots: {
//                             r: '6',
//                             strokeWidth: '2',
//                             stroke: '#00FFFF', // Cyan Dots
//                         }
//                     }}
//                     bezier
//                     style={{
//                         borderRadius: 16,
//                         alignSelf: "center", // Center the chart
//                     }}
//                 />
//             </View>
           
//         </View>
//     );
// }

// const styles = {
//     container: {
       
//         justifyContent: 'center',
//         alignItems: 'center',
       
//         backgroundColor: '#f5fcff',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     chartTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         textAlign: "center",
//     },
//     chartContainer: {
//         width: "100%",
//         alignItems: "center",
//     }
// };
import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
interface RecentItemProps {
  title: string;
  location: string;
  date: string;
}
const RecentItem = ({ title, location, date } : RecentItemProps) => (
    <View style={styles.itemCard}>
      <View style={styles.itemIcon}>
        <Ionicons name="search" size={24} color="#6c63ff" />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{location}</Text>
        <Text style={styles.itemDate}>{date}</Text>
      </View>
    </View>
  );
  

export default function Dashboard() {
    const router = useRouter();
    const chatNavigation = () => {
      // Navigate to the chat screen
      router.push("/Dashboard/chat");
    }
    ;
    const recentItems = [
      {
        title: 'Blue Backpack',
        location: 'Central Park',
        date: '2 hours ago',
      },
      {
        title: 'iPhone 13',
        location: 'Coffee Shop',
        date: '5 hours ago',
      },
      {
        title: 'Keys',
        location: 'Gym',
        date: '1 day ago',
      },
    ];
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>Lost Items Tracker</Text>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle" size={32} color="#6c63ff" />
            </TouchableOpacity>
          </View>
  
          <TouchableOpacity style={styles.findButton}>
            <Text style={styles.findButtonText}>Find My Lost Item</Text>
          </TouchableOpacity>
  
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recently Added Items</Text>
            {recentItems.map((item, index) => (
              <RecentItem key={index} {...item} />
            ))}
          </View>
  
          <TouchableOpacity style={styles.chatButton}>
            <View style={styles.chatButtonContent}>
              <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
              <Text style={styles.chatButtonText} onPress={chatNavigation}>Chat with AI Assistant</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f3',
    },
    scrollView: {
      flex: 1,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
    profileButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    findButton: {
      backgroundColor: '#6c63ff',
      padding: 20,
      borderRadius: 15,
      alignItems: 'center',
      marginBottom: 24,
      shadowColor: '#6c63ff',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    findButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#1a1a1a',
    },
    itemCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    itemIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#f0f0f3',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    itemInfo: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
    itemSubtitle: {
      fontSize: 14,
      color: '#666',
      marginTop: 4,
    },
    itemDate: {
      fontSize: 12,
      color: '#999',
      marginTop: 4,
    },
    chatButton: {
      backgroundColor: '#6c63ff',
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
      shadowColor: '#6c63ff',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    chatButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chatButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
  });