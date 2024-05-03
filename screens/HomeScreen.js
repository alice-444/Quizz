import axios from "axios";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../appContext.js";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  const {
    mode,
    setMode,
    category,
    setCategory,
    categories,
    setCategories,
    setScore,
  } = useAppContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api_category.php"
        );
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error("Error when retrieving of categories :", error);
      }
    };

    fetchCategories();
  }, []);

  const Start = async () => {
    setScore(0);
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${mode}&category=${category}&encode=url3986`
      );
      const questions = response.data.results;
      console.log("Retrieved questions :", questions);
      navigation.navigate("Quizz", { questions });
    } catch (error) {
      console.error("Error when retrieving questions : ", error);
    }
  };

  const ResetSettings = () => {
    setMode("easy");
    setCategory("");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <View>
        <Text className="text-3xl font-semibold mb-4 text-red-400">
          Welcome to the Quiz App
        </Text>
        <Text className="text-base font-semibold mb-4 text-red-300 text-center">
          Test your knowledge with the Quiz App!
        </Text>
        <View className="mb-4">
          <Text className="text-xl mb-2 text-gray-700 text-center">
            Select Difficulty :
          </Text>
          <Picker
            selectedValue={mode}
            onValueChange={(itemValue) => setMode(itemValue)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <Picker.Item label="Easy" value="easy" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Difficult" value="difficult" />
            <Picker.Item label="Any Difficulty" value="Any Difficulty" />
          </Picker>
        </View>
        <View className="mb-4">
          <Text className="text-xl mb-2 text-gray-700 text-center">
            Select Category:
          </Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            {categories.map((categoryItem) => (
              <Picker.Item
                key={categoryItem.id}
                label={categoryItem.name}
                value={categoryItem.id.toString()}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View className="flex flex-row justify-between">
        <TouchableOpacity
          onPress={Start}
          className="bg-red-300 px-4 py-2 rounded-md flex items-center justify-center text-white mb-2 mx-2"
        >
          <Ionicons
            name="play-outline"
            size={24}
            color="white"
            className="mr-2"
          />
          <Text className="text-white text-xl ml-2 text-center">Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ResetSettings}
          className="bg-gray-400 px-4 py-2 rounded-md flex items-center justify-center text-gray-700 mb-2 mx-2"
        >
          <Ionicons
            name="refresh-outline"
            size={24}
            color="white"
            className="mr-2"
          />
          <Text className="text-xl text-white ml-2">Reset Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
