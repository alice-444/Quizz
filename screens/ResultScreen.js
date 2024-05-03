import { useAppContext } from "../appContext.js";
import { View, Text, TouchableOpacity } from "react-native";

export default function ResultScreen({ navigation }) {
  const { score, totalQuestions } = useAppContext();

  const Restart = () => {
    navigation.navigate("Home");
  };

  let encouragementMessage = "";
  if (score === totalQuestions) {
    encouragementMessage = "Amazing! You got all the questions right!";
  } else if (score >= totalQuestions / 2) {
    encouragementMessage = "Good job! Keep up the good work!";
  } else {
    encouragementMessage = "Don't worry! You'll do better next time!";
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-semibold mb-4 text-red-300">Result</Text>
      <Text className="text-2xl font-semibold">Score</Text>
      <Text className="text-xl mb-4">
        {score}/{totalQuestions}
      </Text>
      <Text className="text-lg mb-4">{encouragementMessage}</Text>
      <TouchableOpacity
        onPress={Restart}
        className="mt-4 bg-blue-300 px-4 py-2 rounded"
      >
        <Text className="text-white text-lg">Retry</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={Restart}
        className="mt-4 bg-blue-400 px-4 py-2 rounded"
      >
        <Text className="text-white text-lg">Home</Text>
      </TouchableOpacity>
    </View>
  );
}
