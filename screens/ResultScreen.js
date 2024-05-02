import { useAppContext } from "../appContext.js";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ResultScreen({ navigation }) {
  const { score, totalQuestions } = useAppContext();

  const Restart = () => {
    navigation.navigate("Home");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Result</Text>
      <Text>Score</Text>
      <Text>
        {score}/{totalQuestions}
      </Text>
      <TouchableOpacity onPress={Restart}>
        <Text>Retry</Text>
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
    paddingHorizontal: 10,
  },
});
