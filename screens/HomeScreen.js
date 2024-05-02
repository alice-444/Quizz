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
      <View style={styles.innerContainer}>
        <View style={styles.modeContainer}>
          <Text>Mode :</Text>
          <Picker
            selectedValue={mode}
            onValueChange={(itemValue) => setMode(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Easy" value="easy" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Difficult" value="difficult" />
          </Picker>
        </View>
        <View style={styles.modeContainer}>
          <Text>Categories :</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a category" value="" />
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
    paddingHorizontal: 20,
  },
  innerContainer: {
    alignItems: "center",
  },
  modeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 200,
    marginTop: 10,
  },
});
