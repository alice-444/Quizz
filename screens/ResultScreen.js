import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ResultScreen({ navigation }) {
  const Restart = () => {};

  return (
    <View style={styles.container}>
      <Text>Result</Text>
      <TouchableOpacity onPress={Restart}>
        <Text>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
// });
