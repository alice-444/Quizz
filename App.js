import { AppProvider } from "./appContext.js";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AskScreen from "./screens/AskScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ResultScreen from "./screens/ResultScreen.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Home" }}
            />
            <Stack.Screen
              name="Quizz"
              component={AskScreen}
              options={{ title: "Quizz" }}
            />
            <Stack.Screen
              name="Result"
              component={ResultScreen}
              options={{ title: "Result Quizz" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    backgroundColor: "#fff",
  },
});
