import axios from "axios";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  const [mode, setMode] = useState("easy");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

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

  return (
    <View style={styles.container}>
      <View>
        <Text>Welcome to the Quiz App</Text>
        <View>
          <Text>Select Difficulty:</Text>
          <Picker
            selectedValue={mode}
            onValueChange={(itemValue) => setMode(itemValue)}
          >
            <Picker.Item label="Easy" value="easy" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Difficult" value="difficult" />
            <Picker.Item label="Any Difficulty" value="Any Difficulty" />
          </Picker>
        </View>
        <View>
          <Text>Select Category:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
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
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginLeft: 10,
  },
});
