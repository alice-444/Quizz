import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  const [mode, setMode] = useState("");
  const [category, setCategory] = useState("");

  const Start = () => {
    navigation.navigate("Quizz");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Mode :</Text>
        <TouchableOpacity onPress={() => setMode("")}></TouchableOpacity>
        <Text>Categories : </Text>
      </View>
      <TouchableOpacity onPress={Start}>
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
