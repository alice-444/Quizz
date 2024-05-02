import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AskScreen({ route, navigation }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    const { questions } = route.params;
    setQuestions(questions);
  }, [route.params]);

  const HandleAnswer = (answer) => {
    setUserAnswer(answer);
  };

  const HandleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer(null);
  };

  if (questions.length === 0) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text>{currentQuestion.question}</Text>
      {currentQuestion.incorrect_answers
        .concat(currentQuestion.correct_answer)
        .sort(() => Math.random() - 0.5)
        .map((answer, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => HandleAnswer(answer)}
            disabled={userAnswer !== null}
          >
            <Text>{answer}</Text>
          </TouchableOpacity>
        ))}

      {userAnswer !== null && (
        <TouchableOpacity onPress={HandleNext}>
          <Text>Next Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
